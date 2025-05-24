import express, { Router } from "express";
import { UsersController } from "@src/controllers/conversationController";


const router: Router = express.Router()

router.get("/", UsersController.UserConversations)


export const conversationRoutes = router

