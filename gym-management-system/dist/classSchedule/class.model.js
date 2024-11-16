"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Create the ClassSchedule schema
const ClassScheduleSchema = new mongoose_1.Schema({
    trainerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Trainer", required: true },
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    trainees: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    maxTrainees: { type: Number, default: 10 },
}, {
    timestamps: true,
    versionKey: false,
});
exports.default = (0, mongoose_1.model)("ClassSchedule", ClassScheduleSchema);
