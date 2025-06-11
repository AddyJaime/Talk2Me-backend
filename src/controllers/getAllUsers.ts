import { User } from "@src/models";
import { Request, Response } from "express";
import { Op } from "sequelize";



export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      limit: 5,
      where: {
        id: { [Op.ne]: 1 }
      },
    })

    res.json(users)
  } catch (error) {
    console.log({ getAllUsers: error })
  }
}