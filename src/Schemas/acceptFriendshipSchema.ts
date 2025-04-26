import { z } from "zod"

export const acceptFriendshipSchema = z.object({
  id: z.number({ required_error: "Friendship ID is required" })
})