import { z } from "zod";

// // aqui definimos como queremos que se vea mi esquema
const loginSchema = z.object({
  email: z.string().email("Email is required").nonempty(),
  password: z
    .string()
    .min(6, "The password must has at least 6 characters")
    .nonempty(),
});

export default loginSchema;
