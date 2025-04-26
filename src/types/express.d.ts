import { JwtPayload } from "jsonwebtoken";

// utilizamos esto para aseguranso que Request el objecto aparte de otras cosas tambien tenga un user id
declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload
  }
}