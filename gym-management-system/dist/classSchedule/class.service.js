"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_model_1 = __importDefault(require("./class.model"));
class ClassService {
    async createSchedule(data) {
        const { date, startTime, endTime, trainerId, trainees } = data;
        // Check if the provided timespan is exactly 2 hours
        const durationInMs = new Date(endTime).getTime() - new Date(startTime).getTime();
        const durationInHours = durationInMs / (1000 * 60 * 60);
        if (durationInHours !== 2) {
            throw new Error("Class schedule duration must be exactly 2 hours.");
        }
        // Count the number of classes already scheduled for this date
        const dateStart = new Date(date);
        dateStart.setHours(0, 0, 0, 0);
        const dateEnd = new Date(date);
        dateEnd.setHours(23, 59, 59, 999);
        const schedulesCount = await class_model_1.default.countDocuments({
            date: { $gte: dateStart, $lte: dateEnd },
        });
        if (schedulesCount >= 5) {
            throw new Error("The maximum number of schedules (5) for this date has been reached.");
        }
        // Enforce maximum trainee limit
        if (trainees && trainees.length > 10) {
            throw new Error("A class cannot have more than 10 trainees.");
        }
        // Proceed to create the schedule
        const schedule = new class_model_1.default(data);
        return await schedule.save();
    }
    async updateSchedule(id, data) {
        const { startTime, endTime, trainees } = data;
        // Check if duration is exactly 2 hours if startTime or endTime is being updated
        if (startTime && endTime) {
            const durationInMs = new Date(endTime).getTime() - new Date(startTime).getTime();
            const durationInHours = durationInMs / (1000 * 60 * 60);
            if (durationInHours !== 2) {
                throw new Error("Class schedule duration must be exactly 2 hours.");
            }
        }
        // Enforce maximum trainee limit if trainees are being updated
        if (trainees && trainees.length > 10) {
            throw new Error("A class cannot have more than 10 trainees.");
        }
        // Proceed to update the schedule
        return await class_model_1.default.findByIdAndUpdate(id, data, { new: true });
    }
    async deleteSchedule(id) {
        return await class_model_1.default.findByIdAndDelete(id);
    }
    async getClassesByUser(userId, userRole) {
        if (!userId) {
            throw new Error("User is not authenticated");
        }
        if (userRole === "admin") {
            return await class_model_1.default.find();
        }
        return await class_model_1.default.find({
            $or: [{ trainerId: userId }, { trainees: userId }],
        });
    }
    async getScheduleById(id) {
        return await class_model_1.default.findById(id);
    }
}
exports.default = new ClassService();
