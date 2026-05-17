import express from 'express';
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { ApiResponse } from './utils/ApiResponse.js';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import urlRouter from './routes/url.route.js';
import redirectRouter from './routes/redirect.route.js';
import analyseRouter from './routes/analyse.route.js';

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/", redirectRouter);
app.use("/api/v1/analyse", analyseRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/url", urlRouter);

app.use(errorHandler);

export {app};
