"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trainers_model_1 = __importDefault(require("../trainers/trainers.model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TrainerService {
    static async createTrainer(data) {
        try {
            const trainer = new trainers_model_1.default(data);
            return await trainer.save();
        }
        catch (error) {
            if (error.code === 11000 && error.keyPattern?.email) {
                throw new Error("Email already exists.");
            }
            throw error;
        }
    }
    static async login(email, password) {
        const trainer = await trainers_model_1.default.findOne({ email });
        if (trainer && trainer.password === password) {
            // Directly compare the password
            const token = jsonwebtoken_1.default.sign({ id: trainer._id, role: "trainer" }, process.env.JWT_SECRET, {
                expiresIn: "12h", // Token expiry time
            });
            return token;
        }
        return null; // Return null if login fails
    }
    // Get all trainers
    static async getAllTrainers() {
        return await trainers_model_1.default.find(); // You can add .select() to exclude fields if needed
    }
    // Get one trainer by ID
    static async getTrainerById(id) {
        return await trainers_model_1.default.findById(id);
    }
    // Update a trainer by ID
    static async updateTrainer(id, data) {
        return await trainers_model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    // Delete a trainer by ID
    static async deleteTrainer(id) {
        return await trainers_model_1.default.findByIdAndDelete(id);
    }
}
exports.default = TrainerService;
