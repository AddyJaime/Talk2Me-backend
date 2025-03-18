import { z } from "zod";

// aqui definimos como queremos que se vea mi esquema
const registerSchema = z.object({
  fullname: z.string().nonempty(),
  email: z.string().email("Email is required").nonempty(),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters")
    .nonempty(),
});

export default registerSchema;
