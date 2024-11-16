"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../users/user.model"));
class AuthService {
    static async login(email, password) {
        // Find the user by email
        const user = await user_model_1.default.findOne({ email });
        // If the user exists, compare the password
        if (user && (await bcrypt_1.default.compare(password, user.password))) {
            // Generate JWT token
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: "12h", // Token expiry time
            });
            return token;
        }
        return null;
    }
    static generateToken(user) {
        return jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
    }
}
exports.default = AuthService;
