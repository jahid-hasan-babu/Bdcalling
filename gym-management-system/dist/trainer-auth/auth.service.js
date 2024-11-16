"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const trainers_model_1 = __importDefault(require("../trainers/trainers.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TrainerService {
    async createTrainer(data) {
        const trainer = new trainers_model_1.default(data);
        return await trainer.save();
    }
    async login(email, password) {
        const trainer = await trainers_model_1.default.findOne({ email });
        if (trainer && (await bcrypt_1.default.compare(password, trainer.password))) {
            const token = jsonwebtoken_1.default.sign({ id: trainer._id, role: "trainer" }, process.env.JWT_SECRET, {
                expiresIn: "12h",
            });
            return token;
        }
        return null; // Return null if login fails
    }
}
exports.default = new TrainerService();
