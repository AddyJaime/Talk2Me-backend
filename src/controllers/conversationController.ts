import { Conversation } from "@src/models";
import { Request, Response } from "express"


export class UsersController {
  static UserConversations = async (_: Request, res: Response) => {
    try {
      const conversations = await Conversation.findAll()
      res.json(conversations)

    } catch (error) {
      console.log({ UserConversations: error });
    }
  }

}

