import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../users/user.model";
import { IUser } from "../users/user.model";

class AuthService {
  static async login(email: string, password: string): Promise<string | null> {
    // Find the user by email
    const user: IUser | null = await User.findOne({ email });

    // If the user exists, compare the password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET!,
        {
          expiresIn: "12h", // Token expiry time
        }
      );
      return token;
    }

    return null;
  }

  static generateToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );
  }
}

export default AuthService;
