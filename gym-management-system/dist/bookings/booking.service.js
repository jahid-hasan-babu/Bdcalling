"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const booking_model_1 = require("./booking.model");
const mongoose_1 = __importDefault(require("mongoose"));
class BookingService {
    // Book a class
    async bookClass(className, date, userId) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // Step 1: Check the total number of classes booked by the user on the given date
            const userBookingsCount = await booking_model_1.Schedule.countDocuments({
                trainees: userId,
                date,
            }).session(session);
            if (userBookingsCount >= 5) {
                throw new Error("No available slots for the selected class and date. User can only book up to 5 classes per day.");
            }
            // Step 2: Find an existing schedule with available slots
            let schedule = await booking_model_1.Schedule.findOne({
                className,
                date,
                $expr: { $lt: ["$bookedSlots", "$maxSlots"] }, // Ensure there's an available slot
            }).session(session);
            if (!schedule) {
                // If no schedule exists, create a new one with a single slot available
                schedule = new booking_model_1.Schedule({
                    className,
                    date,
                    timeSlot: "10:00 AM", // Default time slot
                    maxSlots: 1, // Only one slot per class
                    bookedSlots: 0,
                    trainees: [],
                });
            }
            // Step 3: Check if the user has already booked this class
            const hasBooking = schedule.trainees.some((traineeId) => traineeId.toString() === userId);
            if (hasBooking) {
                throw new Error("User has already booked this class.");
            }
            // Step 4: Add the user to the schedule and increment bookedSlots
            schedule.trainees.push(new mongoose_1.default.Types.ObjectId(userId));
            schedule.bookedSlots += 1;
            await schedule.save({ session });
            // Step 5: Commit the transaction
            await session.commitTransaction();
            return schedule._id;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    // Cancel a booking
    async cancelBooking(bookingId, userId) {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // Validate ObjectId formats
            if (!mongoose_1.default.Types.ObjectId.isValid(bookingId) ||
                !mongoose_1.default.Types.ObjectId.isValid(userId)) {
                throw new Error("Invalid scheduleId or userId.");
            }
            // Fetch the schedule document
            const schedule = await booking_model_1.Schedule.findById(bookingId).session(session);
            if (!schedule) {
                console.error(`Schedule with id ${bookingId} not found.`);
                throw new Error("Schedule not found");
            }
            // Remove all instances of the user from trainees
            const originalLength = schedule.trainees.length;
            schedule.trainees = schedule.trainees.filter((traineeId) => traineeId.toString() !== userId);
            const removedCount = originalLength - schedule.trainees.length;
            if (removedCount === 0) {
                console.error(`User with id ${userId} not found in schedule ${bookingId}.`);
                throw new Error("User has no booking for this class.");
            }
            // Update bookedSlots
            schedule.bookedSlots = Math.max(0, schedule.bookedSlots - removedCount);
            // Save the updated schedule
            await schedule.save({ session });
            // Commit the transaction
            await session.commitTransaction();
            return schedule;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
}
exports.default = new BookingService();
