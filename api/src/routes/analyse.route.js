import { Router } from "express";
import { analyseController } from "../controllers/analyse.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const route = Router();

route.use(verifyJWT);
route.route("/:short_code").get(analyseController);

export default route;