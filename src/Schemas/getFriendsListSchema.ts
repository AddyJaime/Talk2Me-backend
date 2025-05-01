import { z } from "zod";



const friendSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string()

})

const getFriendsListSchema = z.array(friendSchema)
export default getFriendsListSchema