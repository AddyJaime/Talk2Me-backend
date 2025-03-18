// Este archivo configura la conexión a la base de datos usando Sequelize.

import { Sequelize } from "sequelize";
import env from "./env";

const sequelize = new Sequelize({
  database: env.DB_NAME,
  username: env.DB_USER,
  password: env.DB_PASS,
  host: "postgres",
  port: 5432,
  dialect: "postgres",
  logging: false,
});

export default sequelize;
