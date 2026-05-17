import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../db/index.js";

export class Url extends Model {}

Url.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    short_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    original_url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    is_active: {
         type: DataTypes.BOOLEAN,
         defaultValue: true
    },
    expire_at: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    author: {
        type: DataTypes.STRING,
        references: {
            model: "users",
            key: "username"
        },
        onDelete: 'CASCADE',
        onUpdate:'CASCADE'
    }
},{
    sequelize: sequelizeInstance,
    timestamps: true,
    tableName: "urls"
});