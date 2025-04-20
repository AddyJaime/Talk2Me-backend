import { z } from "zod";


const friendshipSchema = z.object({
  email: z.string().email("Email is required").nonempty(),
  status: z.enum(["pending", "accepted", "rejected"]).optional()
})

export default friendshipSchema