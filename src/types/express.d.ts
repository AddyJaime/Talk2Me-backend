import { User } from "@src/models";
import { JwtPayload } from "jsonwebtoken";

// Para decirle a TS qué tiene tu token

export interface Userpayload extends JwtPayload {
  id: number,

}
// para decrile a typscripqe que req.user si exsite 
declare global {
  namespace Express {
    interface Request {
      user?: Userpayload
    }
  }
}
// esto le indca  atypescript quee este archivo es un modulo y no un archivo globa 
export { }