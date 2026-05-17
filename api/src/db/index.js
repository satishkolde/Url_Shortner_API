import { Sequelize } from 'sequelize';
import { DB_NAME } from '../constants.js';
import dotenv from 'dotenv'

dotenv.config();

export const sequelizeInstance = new Sequelize(`${process.env.POSTGRES_CONNECTION_URI}/${DB_NAME}`, {
    dialect: 'postgres',
    logging: false
});

export const connectDB = async () => {
    await sequelizeInstance.authenticate();
    await sequelizeInstance.sync({ alter: true });
}
