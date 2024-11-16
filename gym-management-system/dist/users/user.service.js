"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("./user.model"));
const auth_service_1 = __importDefault(require("../auth/auth.service"));
class UserService {
    async registerUser(data, currentUserRole) {
        // Check if there are no users in the system (allow the first admin registration)
        const existingUsers = await user_model_1.default.countDocuments();
        // Ensure that the first user is an admin
        if (existingUsers === 0 && data.role !== "admin") {
            throw new Error("The first registered user must be an admin.");
        }
        // Only admins can register trainers, and admins can't register trainees
        if ((existingUsers > 0 &&
            data.role === "trainer" &&
            currentUserRole !== "admin") ||
            (data.role === "trainee" && currentUserRole === "admin")) {
            throw new Error("You do not have permission to perform this action.");
        }
        // Create a new user and save to the database
        const user = new user_model_1.default(data);
        await user.save();
        // Generate a JWT token for the newly created user
        const token = auth_service_1.default.generateToken(user);
        return { user, token };
    }
    // Get the profile of a user by ID
    async getProfile(userId) {
        if (!userId)
            return null;
        const user = await user_model_1.default.findById(userId).select("-password");
        return user;
    }
    // List all users (admin only)
    async listUsers() {
        const users = await user_model_1.default.find().select("-password");
        return users;
    }
    // Delete a user by ID (admin only)
    async deleteUser(userId, currentUserRole) {
        const user = await user_model_1.default.findById(userId);
        if (!user) {
            return false;
        }
        // Only admins can delete users
        if (currentUserRole !== "admin") {
            throw new Error("Unauthorized to delete users.");
        }
        await user_model_1.default.deleteOne({ _id: userId }); // Replaced with deleteOne
        return true;
    }
}
exports.UserService = UserService;
