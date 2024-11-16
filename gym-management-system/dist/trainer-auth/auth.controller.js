"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginTrainer = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
const loginTrainer = async (req, res) => {
    const { email, password } = req.body;
    const token = await auth_service_1.default.login(email, password);
    if (token) {
        res.status(200).json({ success: true, token });
    }
    else {
        res
            .status(401)
            .json({ success: false, message: "Invalid email or password." });
    }
};
exports.loginTrainer = loginTrainer;
