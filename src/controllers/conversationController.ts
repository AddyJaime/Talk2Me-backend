import { Conversation, User } from "@src/models";
import MessageModel from "@src/models/messageModel";
import { Request, Response } from "express"
import { Op } from "sequelize";


export class ConversationsController {
	static userConversations = async (_: Request, res: Response) => {
		try {
			const conversations = await Conversation.findAll({
				include: [
					{
						model: MessageModel,
						as: "messages",
						limit: 1,
						order: [['createdAt', 'DESC']]
					},
					{
						model: User,
						as: "participant",
						attributes: {
							exclude: ["password", "createdAt", "updatedAt"]
						}
					}
				]
			})
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
				// excluye estos atributos cuando me traigas esta informacion del usuario
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

	static searchUsers = async (req: Request, res: Response) => {
		try {
			console.log(req.headers); // TODO: decode token to get user id of who is searching

			const id = 1
			const { search } = req.params
			const users = await User.findAll({
				limit: 10,
				where: {
					[Op.and]: [
						{
							[Op.or]: [ // aqui se esta haciendo un query que trae los usiarios si el usuario tiene el email igual al parametro search o si el fullName es parecido a search
								{ fullName: { [Op.iLike]: `%${search}%` } },
								{ email: search }
							]
						},
						{
							id: { [Op.ne]: id }
						}
					]
				},
				include: [
					{
						model: Conversation,
						as: "sentConversations",
						include: [
							{ model: MessageModel, as: "messages" }
						]
					},
					{
						model: Conversation,
						as: "receivedConversations",
						include: [
							{ model: MessageModel, as: "messages" }
						]
					}
				]
			})

			const mappedConversation = users.map(user => {
				const userJson = user.toJSON()
				const conversations = [...userJson.sentConversations, ...userJson.receivedConversations]

				delete userJson.sentConversations
				delete userJson.receivedConversations

				return {
					...userJson,
					conversations
				}
			})

			res.json(mappedConversation)
		} catch (error) {
			console.log({ searchUsers: error });
		}
	}
}
