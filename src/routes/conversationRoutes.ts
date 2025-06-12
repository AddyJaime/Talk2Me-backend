import express, { Router } from "express";
import { userConversations, getConversationById, createConversation, createMessage } from "@src/controllers/conversationController";


const router: Router = express.Router()

router.get("/", userConversations)
router.get("/:id", getConversationById)
router.post("/", createConversation)
router.post("/newMessage", createMessage)


export const conversationRoutes = router

