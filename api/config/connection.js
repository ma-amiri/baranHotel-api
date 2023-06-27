import { Sequelize } from "sequelize";
import  dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, "passsword", {
  host: 'localhost',
  dialect: 'mysql'
  });

export default sequelize;
