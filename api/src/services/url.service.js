import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateShortCode, isValidURL } from "../utils/urlUtils.js";
import { redisClient } from "../redis/index.js";

export class UrlService {
    static async generateShortUrlService(username,original_url,custom_alias,expire_at) {
        if(!isValidURL(original_url)){
            throw new ApiError(400, "Invalid Original Url");
        }   

        if(!expire_at) {
            expire_at = null;
        }

        if(custom_alias) {
            const url = await Url.findOne({
                where: {
                    short_code: custom_alias
                }
            });
            if(url){ 
                throw new ApiError(409, `${custom_alias} Custom alias is already taken`);
            }
        }

        let uniqueCode = (custom_alias && custom_alias.trim() !== "")? custom_alias: null;
        while(!uniqueCode){
            uniqueCode = generateShortCode(7);
            const url = await Url.findOne({
                where:{
                    short_code: uniqueCode
                }
            });
            if(url){
                uniqueCode = null;
            }
        }
        
        if(expire_at) {
            expire_at = new Date(expire_at);
        }
        const url = await Url.create({
            original_url,
            short_code:uniqueCode,
            author:username,
            expire_at
        });

        const createdUrl = await Url.findByPk(url.id);

        if(!createdUrl) {
            throw new ApiError(500, "Internal Server Error While creating url");
        }

        const responseData = {
            original_url,
            short_url: `http://${process.env.HOST_NAME}:${process.env.PORT}/${createdUrl.short_code}`
        }

        return responseData;
    }

    static async deleteUrl(username,short_code) {
        const url = await Url.findOne({
            where: {
                short_code: short_code,
                author: username
            }
        });

        if(!url) {
            throw new ApiError(404, "Url not found");
        }

        if(!url.is_active){
            throw new ApiError(404, "URL is already deleted");
        }

        url.is_active = false;
        const deletedUrl = await url.save();

        const redisDelete = await redisClient.del(`url:${url.short_code}`);
        if(typeof redisDelete !== 'number'){
            console.log("Error while clearing redis cache");
        }
    }
}