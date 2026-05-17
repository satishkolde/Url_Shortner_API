import { UrlService } from "../services/url.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const generateShortUrl = asyncHandler(async (req,res) => {
    const {original_url, custom_alias, expires_at} = req.body;
    const responseData = await UrlService.generateShortUrlService(req.user.username,original_url,custom_alias,expires_at);
    res.status(200).send(new ApiResponse(200,"Got Short code",responseData));
})

export const deleteShortUrl = asyncHandler(async (req, res) => {
    const {short_code} = req.params;
    await UrlService.deleteUrl(req.user.username,short_code);
    res.status(204).send();
})