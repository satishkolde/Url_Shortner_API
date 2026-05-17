import { Router } from "express";
import { redirectController } from "../controllers/redirect.controller.js";


const route = Router();

route.route("/:short_code").get(redirectController);

export default route;