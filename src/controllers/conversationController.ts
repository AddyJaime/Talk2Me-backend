import { Conversation, User } from "@src/models";
import MessageModel from "@src/models/messageModel";
import { Request, Response } from "express"
import { Op } from "sequelize";


export class ConversationsController {
	static userConversations = async (_: Request, res: Response) => {
		try {
			const conversations = await Conversation.findAll()
			res.json(conversations)

		} catch (error) {
			console.log({ UserConversations: error });
		}
	}

	static createConversation = async (req: Request, res: Response) => {
		const { senderId, receiverId } = req.body
		const include = [
			{
				model: User,
				as: "initiator",
				attributes: {
					exclude: ["password", "createdAt", "updatedAt"]
				}
			},
			{
				model: User,
				as: "participant",
				attributes: {
					exclude: ["password", "createdAt", "updatedAt"]
				}
			}
		]

		const existingConversation = await Conversation.findOne({
			include,
			where: {
				[Op.or]: [ // [Op.or] = Si una de las optiones es verdadera de llos items del array
					{
						[Op.and]: [
							{ senderId: senderId }, // user with id = 1
							{ receiverId: receiverId } // user with id = 3
						]
					},
					{
						[Op.and]: [
							{ senderId: receiverId }, // user is = 1
							{ receiverId: senderId } // user id = 3
						]
					}
				]
			}
		})

		if (existingConversation)
			res.json(existingConversation)
		else {
			const newConversation = await Conversation.create({
				senderId, receiverId
			})

			const reloadConversation = await newConversation.reload({ include })
			res.json(reloadConversation)
		}
	}

	static createMessage = async (req: Request, res: Response) => {
		try {
			const { text, senderId, receiverId, conversationId } = req.body
			const existingConversation = await Conversation.findByPk(conversationId)

			if (!existingConversation) {
				res.status(500).json({ error: "Conversation does exist" })
				return
			}

			const newMessage = await MessageModel.create({
				text,
				senderId,
				receiverId,
				conversationId: existingConversation.dataValues.id
			})

			res.json(newMessage)

		} catch (error) {
			console.log({ createMessage: error });
		}
	}
}
