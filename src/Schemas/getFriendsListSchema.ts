import { z } from "zod";



const friendSchema = z.object({
  id: z.number(),
  fullName: z.string(),
  email: z.string()

})

const getFriendsListSchema = friendSchema
export default getFriendsListSchema