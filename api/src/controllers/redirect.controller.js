import { Click } from "../models/click.model.js";
import { RedirectService } from "../services/redirect.service.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const redirectController = asyncHandler(async (req, res) => {
    const short_code = req.params.short_code;
    const reffer = req.headers['reffer'] || null;
    const user_agent = req.headers['user-agent'];
    const url = await RedirectService.redirectUserUrl(short_code, reffer, user_agent);
    res.status(302).redirect(url);
})