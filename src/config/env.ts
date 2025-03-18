// aqui convertimos todos los valores de .env en valores seguros, los valores de .env siempre son strings pero en este caso convertimos los puertos en numeros

const env = {
  DB_NAME: process.env.DB_NAME as string,
  DB_USER: process.env.DB_USER as string,
  DB_PASS: process.env.DB_PASS as string,
  DB_HOST: process.env.DB_HOST as string,
  DB_PORT: Number(process.env.DB_PORT) || 5432,
  PORT: Number(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET as string,
};

export default env;
