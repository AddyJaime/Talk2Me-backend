import { User } from "@src/models";
import { Request, Response } from "express";
import { Op } from "sequelize";



export const getAllUsers = async (_req: Request, res: Response) => {
  // todo later buscar en el re.user.id para excluider al usuario lofguaedo 
  try {
    const users = await User.findAll({
      limit: 12,
      where: {
        id: { [Op.ne]: 1 }
      },
      attributes: {
        exclude: ["email", "password", "createdAt", "updatedAt"]
      }
    })

    res.json(users)
  } catch (error) {
    console.log({ getAllUsers: error })
  }
}