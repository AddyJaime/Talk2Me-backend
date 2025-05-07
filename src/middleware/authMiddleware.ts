// ✅ Aquí verificamos si el usuario está autenticado con un token JWT.
// later to do para asegurarno que el usaurio tiene un token valido y que tiene permisos para poder hacer lo que le de su gana dentro de la app
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


// import { AuthRequest } from "@src/types/AuthRequest";
// import { Request } from "express";
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization
    // aqui estamos verificando que existe el header
    if (!authHeader) {
      res.status(401).json({ message: "token not provided" });
      return;
    }
    // aqui removemos el bearer y solo nos quedamos con el token
    // aqui spit te da un array con dos cosas "bearer" y el token "dgdfggvfd" y solo tomas el token
    const token = authHeader.split(" ")[1]
    // verifivcamos que el token exista 
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

    interface Userpayload extends JwtPayload {
      id: string,
      email: string
    }

    // decodificamos el token y verificamos el cotneido dentro
    // el metodo jwt.verify puede retonrnr un string o un jwtpaylod 
    declare global {
      namespace Express {
        interface Request {
          user?: Userpayload
        }
      }
    }

    const decoded = jwt.verify(token, jwtSecret) as UserPayload

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


// el front end debe ahora enviar para el backend el token en el header 