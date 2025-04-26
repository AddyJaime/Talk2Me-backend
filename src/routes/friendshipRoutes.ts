
import express, { Router } from "express";
import validateSchema from "../middleware/validateSchema";
import { sendFriendRequest } from "@src/controllers/friendshipController";
import { friendshipSchema } from "@src/Schemas";
import { acceptFriendRequest } from "@src/controllers/friendshipController";
import { requireAuth } from "@src/middleware/authMiddleware";



const router: Router = express.Router()


router.post("/send-friend-request", requireAuth, validateSchema(friendshipSchema), sendFriendRequest)
router.post("/accept-friend-request", requireAuth, validateSchema(friendshipSchema), acceptFriendRequest)


export const friendshipRoutes = router