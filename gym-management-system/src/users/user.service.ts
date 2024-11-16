import User, { IUser } from "./user.model";
import AuthService from "../auth/auth.service";

export class UserService {
  async registerUser(
    data: { username: string; email: string; password: string; role: string },
    currentUserRole?: string
  ) {
    // Check if there are no users in the system (allow the first admin registration)
    const existingUsers = await User.countDocuments();

    // Ensure that the first user is an admin
    if (existingUsers === 0 && data.role !== "admin") {
      throw new Error("The first registered user must be an admin.");
    }

    // Only admins can register trainers, and admins can't register trainees
    if (
      (existingUsers > 0 &&
        data.role === "trainer" &&
        currentUserRole !== "admin") ||
      (data.role === "trainee" && currentUserRole === "admin")
    ) {
      throw new Error("You do not have permission to perform this action.");
    }

    // Create a new user and save to the database
    const user: IUser = new User(data);
    await user.save();

    // Generate a JWT token for the newly created user
    const token = AuthService.generateToken(user);

    return { user, token };
  }

  // Get the profile of a user by ID
  async getProfile(userId?: string): Promise<IUser | null> {
    if (!userId) return null;
    const user = await User.findById(userId).select("-password");
    return user;
  }

  // List all users (admin only)
  async listUsers(): Promise<IUser[]> {
    const users = await User.find().select("-password");
    return users;
  }

  // Delete a user by ID (admin only)
  async deleteUser(userId: string, currentUserRole?: string): Promise<boolean> {
    const user = await User.findById(userId);
    if (!user) {
      return false;
    }

    // Only admins can delete users
    if (currentUserRole !== "admin") {
      throw new Error("Unauthorized to delete users.");
    }

    await User.deleteOne({ _id: userId }); // Replaced with deleteOne
    return true;
  }
}
