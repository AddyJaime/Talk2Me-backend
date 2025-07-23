import { User } from "@src/models";
import { JwtPayload } from "jsonwebtoken";
export interface Userpayload extends JwtPayload {
  id: number,

}
declare global {
  namespace Express {
    interface Request {
      user?: Userpayload
    }
  }
}

export { }