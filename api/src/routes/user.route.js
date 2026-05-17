import { Router } from "express";
import {loginUserController, logoutUserController, registerUserController} from '../controllers/user.controller.js'
import { verifyJWT } from "../middlewares/auth.middleware.js";

const route = Router();

route.route("/register").post(registerUserController);
route.route("/login").post(loginUserController);
route.route("/logout").post(verifyJWT, logoutUserController);

export default route;
