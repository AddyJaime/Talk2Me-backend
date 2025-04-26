import { Request, Response } from "express";
import { Friendship } from "@models";
import { User } from "@models";
import { JwtPayload } from "jsonwebtoken";



export const sendFriendRequest = async (req: Request, res: Response) => {
  try {

    // aqui recibimos el email de la persona a la cual se le quiere enviar el friend request 
    const { email } = req.body

    const payload = req.user as JwtPayload
    const currentUserId = payload.id

    // Buscar al usuario por email y si el usuario no existe manda un error, evita mandar solicutuedes a usuario que no existan en la base de dato, tienen que exisiter para mandarle request
    const existingUser = await User.findOne({ where: { email } })
    if (!existingUser) {
      res.status(400).json({ message: "User not found, the user needs to be register in order to be sent a friend request" })
      return
    }

    // evitar enviar solicituedes a uno mismo
    if (existingUser.id === currentUserId) {
      res.status(400).json({ message: "You cannot add yourself" })
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

    const payload = req.user as JwtPayload
    const currentUserId = payload.id

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
    }

    if (friendRequestExist) {
      friendRequestExist.status = "accepted"
      await friendRequestExist.save()
    } else {
      res.status(400).json({ message: "Friend request not found or already accepted." })
      return
    }

    res.status(200).json({ message: "friend request accepted succefullyt", friendRequest: friendRequestExist })

  } catch (error) {
    console.error("❌ Error accepting friend request:", error)
    res.status(500).json({ message: "Something went wrong while accepting the request." })
  }


}