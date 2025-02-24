// Setting up the connection in Sequelize, this is consider one of the first steps

import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  database: "Talk2Me",
  username: "postgres",
  password: "Tricomjgq301995",
  host: "localhost",
  port: 5433,
  dialect: "postgres",
  logging: false,
});

export default sequelize;
