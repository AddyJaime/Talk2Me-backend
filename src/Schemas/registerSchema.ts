import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().nonempty(),
  email: z.string().email("Email is required").nonempty(),
  password: z
    .string()
    .min(6, "The password must be at least 6 characters")
    .nonempty(),
});

export default registerSchema;
