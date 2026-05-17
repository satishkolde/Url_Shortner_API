import { app } from "./app.js";
import {connectDB } from './db/index.js';
import { connectRedis } from "./redis/index.js";

const PORT = process.env.PORT || 4000;

connectDB().then(async () => {
    console.log("Database connection was successfull");
    await connectRedis();
    console.log("Redis connection successfull");
}).catch((err) => {
    console.log("Error while connecting database",err);
}).then(() => {
    app.on("error", (err) => {
        console.log("Error Encountered: ",err);
    });
    app.listen(PORT, () => {
        console.log("Server is listening on port: ", PORT);
    });
}).catch((err) => {
    console.log("Error while connecting redis",err);
})