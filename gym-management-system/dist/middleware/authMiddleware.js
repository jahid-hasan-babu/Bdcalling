"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../users/user.model"));
// Middleware to authenticate users
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = await user_model_1.default.findById(decoded.id).select("-password");
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed." });
        }
    }
    else {
        return res
            .status(401)
            .json({ message: "Not authorized, no token provided." });
    }
};
exports.protect = protect;
// Middleware for admin-only access
const adminOnly = (req, res, next) => {
    if (req.user?.role === "admin") {
        next();
    }
    else {
        return res.status(403).json({
            success: false,
            message: "Unauthorized access.",
            errorDetails: "You must be an admin to perform this action.",
        });
    }
};
exports.adminOnly = adminOnly;
