import { User } from "@src/models";
import { JwtPayload } from "jsonwebtoken";


interface Userpayload extends JwtPayload {
  id: string,
  email: string
}
declare global {
  namespace Express {
    interface Request {
      user?: Userpayload
    }
  }
}
// esto le indca  atypescript quee este archivo es un modulo y no un archivo globa 
export { }