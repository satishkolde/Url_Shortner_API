import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../db/index.js";

export class Click extends Model {}

Click.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    url_id: {
        type: DataTypes.UUID,
        references: {
            model:"urls",
            key: "id"
        }
    },
    referrer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    user_agent: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelizeInstance,
    timestamps: true,
    tableName: "clicks"
});