import {createClient} from 'redis';

export const redisClient = createClient();

export const connectRedis = async () => {
    try{
        await redisClient.connect();
    }catch(e){
        console.log("Error while connecting redis", e);
    }
}