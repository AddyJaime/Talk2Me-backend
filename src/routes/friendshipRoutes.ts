
import express, { Router } from "express";
import validateSchema from "../middleware/validateSchema";
import { getFriendsList, sendFriendRequest } from "@src/controllers/friendshipController";
import { friendshipSchema } from "@src/Schemas";
import { acceptFriendRequest } from "@src/controllers/friendshipController";
import { requireAuth } from "@src/middleware/authMiddleware";
import { acceptFriendshipSchema } from "@src/Schemas/acceptFriendshipSchema";
import getFriendsListSchema from "@src/Schemas/getFriendsListSchema";




const router: Router = express.Router()


router.post("/send-friend-request", requireAuth, validateSchema(friendshipSchema), sendFriendRequest)

router.post("/accept-friend-request", requireAuth, validateSchema(acceptFriendshipSchema), acceptFriendRequest)

router.get("/allFriends", requireAuth, validateSchema(getFriendsListSchema), getFriendsList)


export const friendshipRoutes = router