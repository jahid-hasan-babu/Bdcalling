"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TrainerSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
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
    specialization: { type: String, enum: ["trainer"], required: true },
}, { timestamps: true, versionKey: false });
TrainerSchema.index({ email: 1 }, { unique: true });
exports.default = (0, mongoose_1.model)("Trainer", TrainerSchema);
