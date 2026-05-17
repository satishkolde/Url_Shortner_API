import { asyncHandler } from "../utils/AsyncHandler.js";
import { redisClient } from "../redis/index.js";
import { ApiError } from "../utils/ApiError.js";

export const rateLimiter = asyncHandler(async (req, res, next) => {
    let numberOfHits = Number(await redisClient.get(`user:${req.user.username}`));
    numberOfHits = numberOfHits + 1;
    if(numberOfHits >= 4){
        const retryAfter = await redisClient.ttl(`user:${req.user.username}`);
        throw new ApiError(429, `Too many requests. retry after ${retryAfter} seconds`);
    }
    await redisClient.incr(`user:${req.user.username}`);
    if(numberOfHits == 1){
        await redisClient.expire(`user:${req.user.username}`, 60);
    }
    next();
});