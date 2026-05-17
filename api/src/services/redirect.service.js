import { Url } from "../models/url.model.js";
import { Click } from "../models/click.model.js";
import { ApiError } from "../utils/ApiError.js";
import { redisClient } from "../redis/index.js";
import { isExpired } from "../utils/urlUtils.js";

export class RedirectService {
    static async redirectUserUrl(short_code, referrer, user_agent) {
        let redisHit = true;
        let url = JSON.parse(await redisClient.get(`url:${short_code}`));
        if (!url) {
            redisHit = false;
            url = await Url.findOne({
                where: {
                    short_code: short_code
                }
            });
        }

        if (!url) {
            throw new ApiError(404, `No url found for ${short_code}`);
        }

        if (!redisHit) {
            const urlStr = JSON.stringify({
                id: url.id,
                original_url: url.original_url,
                expire_at: url.expire_at,
                is_active: url.is_active
            });

            await redisClient.set(`url:${short_code}`, urlStr);
            await redisClient.expire(`url:${short_code}`,3600);
        }

        const currentDate = new Date();

        if (isExpired(url.expire_at, currentDate)) {
            throw new ApiError(410, "Url is expired");
        }
        
        if (!url.is_active) {
            throw new ApiError(404, "URL existed but has expired");
        }

        Click.create({
            url_id: url.id,
            referrer,
            user_agent,
        }).then((user_click) => {
            console.log("Created Click!!");
        }).catch((err) => {
            console.error(err);
        });

        return url.original_url;
    }
}