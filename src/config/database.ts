// Setting up the connection in Sequelize, this is consider one of the first steps

import { Sequelize } from "sequelize";
import env from "./env";

const sequelize = new Sequelize({
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASS,
  host: env.DB_HOST,
  port: env.DB_PORT,
  dialect: "postgres",
  logging: true,
});

export default sequelize;
