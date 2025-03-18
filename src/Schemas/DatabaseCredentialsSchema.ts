import { z } from "zod";

const DatabaseCredentialsSchema = z.object({
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.number(),
});

export default DatabaseCredentialsSchema;
