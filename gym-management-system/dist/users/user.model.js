"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Create the User schema
const UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Simple email validation regex
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Invalid email format.",
        },
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["admin", "trainer", "trainee"],
        required: true,
    },
}, { timestamps: true, versionKey: false });
// Hash the password before saving the user document
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcrypt_1.default.hash(this.password, 10);
    next();
});
// Method to compare passwords
UserSchema.methods.comparePassword = function (password) {
    return bcrypt_1.default.compare(password, this.password);
};
// Export the model with the correct typing
exports.default = (0, mongoose_1.model)("User", UserSchema);
