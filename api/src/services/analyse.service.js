import { Click } from "../models/click.model.js";
import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import sequelize from 'sequelize';

export class AnalyseService {
    static async analyseUrlClick(short_code) {
        const url = await Url.findOne({
            where: {
                short_code: short_code
            },
            attributes: {
                exclude: ['createdAt','updatedAt']
            }
        });

        if(!url) {
            throw new ApiError(404, "Short code not found");
        }

        const clicks = await Click.findAll({
            where: {
                url_id: url.id
            },
            attributes: [
                [sequelize.fn('DATE', sequelize.col('createdAt')) , 'click_time'],
                [sequelize.fn('COUNT', sequelize.col('id')), 'total_clicks']
            ],
            group: ["click_time"],
            limit: 7 
        });

        const responseData = {...(url.toJSON()), clicks_by_day: clicks};

        return responseData;
    }
}