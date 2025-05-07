import { User } from "@src/models";
import { JwtPayload } from "jsonwebtoken";


export interface Userpayload extends JwtPayload {
  id: number,
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