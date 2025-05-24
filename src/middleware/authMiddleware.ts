import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Userpayload } from "@src/types/express";


export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if (!authHeader) {
      res.status(401).json({ message: "token not provided" });
      return;
    }

    const token = authHeader.split(" ")[1]
    console.log("token recivido", token)
    if (!token) {
      res.status(401).json({ message: "token missing" })
      return

    }

    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in env variable")
      res.status(501).json({ message: "internal server error" })
      return


    }
    const decoded = jwt.verify(token, jwtSecret) as Userpayload
    if (typeof decoded === "string") {
      res.status(401).json({ message: "Invalid token format" })
      return

    }

    req.user = decoded

    next()
  } catch (error) {
    console.error("❌ Error verifying token:", error)
    res.status(401).json({ message: "invalid token" })
    return
  }


}


