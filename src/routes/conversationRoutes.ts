import express, { Router } from "express";
import { ConversationsController } from "@src/controllers/conversationController";


const router: Router = express.Router()

router.get("/", ConversationsController.userConversations)
router.get("/:search", ConversationsController.searchUsers)
router.post("/", ConversationsController.createConversation)
router.post("/newMessage", ConversationsController.createMessage)


export const conversationRoutes = router

