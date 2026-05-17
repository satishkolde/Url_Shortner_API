import { AnalyseService } from "../services/analyse.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const analyseController = asyncHandler(async (req,res) => {
    const short_code = req.params.short_code;
    const returnData = await AnalyseService.analyseUrlClick(short_code);
    res.status(200).send(new ApiResponse(200,"Analzed data", returnData));
})