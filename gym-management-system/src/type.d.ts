// src/types.d.ts (or in your middleware file)
import { IUser } from "../users/user.model"; // Import your user interface

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Now req.user will have type IUser
    }
  }
}
