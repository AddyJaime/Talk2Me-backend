// * 🌎 Environment Variables Configuration File (env.ts)
//  Loads environment variables from the `.env` file and exports them  as a single object for use throughout the application.
import dotenv from "dotenv";

dotenv.config();

export const env = {
  DB_NAME: process.env.DB_NAME as string,
  DB_USER:
  DB_PASS:
  DB_HOST:
  DB_PORT:
  JWT_SECRET:
};
