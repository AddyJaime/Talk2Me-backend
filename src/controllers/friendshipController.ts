import { Request, Response } from "express";
import { Friendship } from "@models";
import { User } from "@models";
import { Op } from "sequelize";





export const sendFriendRequest = async (req: Request, res: Response) => {
  try {

    // aqui recibimos el email de la persona a la cual se le quiere enviar el friend request 
    const { email } = req.body

    const currentUserId = (req as any).user.id


    // Buscar al usuario por email y si el usuario no existe manda un error, evita mandar solicutuedes a usuario que no existan en la base de dato, tienen que exisiter para mandarle request
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      res.status(400).json({ message: "User not found, the user needs to be register in order to be sent a friend request" })
      return
    }

    // evitar enviar solicituedes a uno mismo
    if (existingUser.id === currentUserId) {
      res.status(400).json({ message: "You cannot add yourself" })
      return
    }

    // buscar en la tabla de friendship una relacio nentre el usuario actual y ese a quien se le va a mandarla solitud y si existe esa relacion enotnces no se la envies 
    const alreadyExists = await Friendship.findOne({
      // aqui esta la base de daro la tabla Friendship tiene userId y friendID 
      where: {
        userId: currentUserId,
        friendId: existingUser.id
      }
    })

    if (alreadyExists) {
      res.status(400).json({ message: "Friend request already sent ot you are already friends" })
    }

    // si no existe entonces se crea aqui
    const newFriendRequest = await Friendship.create({
      userId: currentUserId,
      friendId: existingUser.id,
      status: "pending"
    })

    res.status(201).json({ message: "Friend request sent", friendRequest: newFriendRequest })

  } catch (error) {
    console.error("❌ Error sending new friend resquest", error)
    res.status(500).json({ message: "Error sending new friend request" })

  }
}


export const acceptFriendRequest = async (req: Request, res: Response) => {
  try {

    const currentUserId = (req as any).user.id


    const senderId = req.body.id
    const friendRequestExist = await Friendship.findOne({
      where: {
        userId: senderId,
        // aqui estoy yo como friendId
        friendId: currentUserId,
        status: "pending"

      }
    })
    if (!friendRequestExist) {
      res.status(400).json({ message: "Friend request not found or already accepted." })
      return
    }

    if (friendRequestExist) {
      friendRequestExist.status = "accepted"
      await friendRequestExist.save()
    } else {
      res.status(400).json({ message: "Friend request not found or already accepted." })
      return
    }

    res.status(200).json({ message: "friend request accepted succefullyt", friendRequest: friendRequestExist })
    return

  } catch (error) {
    console.error("❌ Error accepting friend request:", error)
    res.status(500).json({ message: "Something went wrong while accepting the request." })
  }


}

export const getFriendsList = async (req: Request, res: Response) => {
  try {
    // este es el usuario actual ya validado 
    // se pone en parentesis y a esto se le llama  precedecia de operadores primero convertimos req osea el objecto req a any y luego accedemos a user
    // lo que pasa es que explicitame hay qyue decirle de que tipo es 
    // any es como no te quejes yo se lo que tiene req 
    // Cállate y déjame programar! Sé que esto existe.
    const currentUserId = (req as any).user.id


    // aqui buscamos en la tabla friendship solo donde el estado sea aceptado
    // Y donde el usuario actual sea userId o friendId (porque pudo enviar o recibir la solicitud).
    const friendships = await Friendship.findAll({
      // aqui es como un filtro de filtras solo los amigosa donde el status en la base de dato diga accepted 
      where: {
        status: "accepted",
        // bidireccionales las amistades puedes enviar o puedes recivir 
        // es un operador de sequilize el cual dice uno o el otro 
        [Op.or]: [
          { userId: currentUserId },
          { friendId: currentUserId }
        ],
      },
      // include hace un join trae las tablas 
      include: [
        {
          model: User,
          as: "sender",
          attributes: ["id", "name", "email"],
        },
        {
          model: User,
          as: "receiver",
          attributes: ["id", "name", "email"],
        }
      ]
    })


    const friends = friendships.map((friendship) => {
      const sender = friendship.get("sender") as User
      const receiver = friendship.get("receiver") as User

      let friend
      // el usuario logueado fue quien envio la solicitud
      if (sender.id === currentUserId) {
        // osea quien la recibio fue el amigo mio si yo soy verderadero
        friend = receiver
        // si no fui yo que laq envio mi amigo fue que la envio 
      } else {
        friend = sender
      }

      return {
        id: friend.id,
        name: friend.fullName,
        email: friend.email
      }



    })


    res.status(200).json({ friends })

  } catch (error) {
    console.error("❌ error getting friends list:", error)
    res.status(500).json({ message: "Something went wrong retrieving friends." })
  }

}

