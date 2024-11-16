"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.bookClass = void 0;
const booking_service_1 = __importDefault(require("./booking.service"));
// Assuming `req.user` contains the user information
const bookClass = async (req, res) => {
    const { className, date } = req.body;
    const traineeId = req.user?._id;
    if (!className || !date || !traineeId) {
        res.status(400).json({ success: false, message: "Invalid request data" });
        return;
    }
    try {
        const bookingId = await booking_service_1.default.bookClass(className, new Date(date), traineeId);
        res.status(201).json({
            success: true,
            message: "Class booked successfully",
            bookingId,
        });
    }
    catch (error) {
        res.status(error.message.includes("No available slots") ? 400 : 500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};
exports.bookClass = bookClass;
const cancelBooking = async (req, res) => {
    const { bookingId } = req.params;
    const traineeId = req.user?._id;
    // Validate request data
    if (!bookingId || !traineeId) {
        res.status(400).json({ success: false, message: "Invalid request data" });
        return;
    }
    try {
        // Call the service to cancel the booking
        const updatedSchedule = await booking_service_1.default.cancelBooking(bookingId, traineeId);
        // Respond with success
        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: updatedSchedule,
        });
    }
    catch (error) {
        const statusCode = error.message.includes("not found") ? 404 : 500;
        res.status(statusCode).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};
exports.cancelBooking = cancelBooking;
