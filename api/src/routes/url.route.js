import {Router} from 'express';
import { deleteShortUrl, generateShortUrl } from '../controllers/url.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { rateLimiter } from '../middlewares/rateLimiter.middleware.js';

const route = Router();

route.use(verifyJWT);
route.route("/shorten").post(rateLimiter,generateShortUrl);
route.route("/:short_code").delete(deleteShortUrl);

export default route;