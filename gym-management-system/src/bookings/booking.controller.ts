import { Request, Response } from "express";
import BookingService from "./booking.service";

// Assuming `req.user` contains the user information
export const bookClass = async (req: Request, res: Response): Promise<void> => {
  const { className, date } = req.body;
  const traineeId = req.user?._id;

  if (!className || !date || !traineeId) {
    res.status(400).json({ success: false, message: "Invalid request data" });
    return;
  }

  try {
    const bookingId = await BookingService.bookClass(
      className,
      new Date(date),
      traineeId
    );
    res.status(201).json({
      success: true,
      message: "Class booked successfully",
      bookingId,
    });
  } catch (error: any) {
    res.status(error.message.includes("No available slots") ? 400 : 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const cancelBooking = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { bookingId } = req.params;
  const traineeId = req.user?._id;

  // Validate request data
  if (!bookingId || !traineeId) {
    res.status(400).json({ success: false, message: "Invalid request data" });
    return;
  }

  try {
    // Call the service to cancel the booking
    const updatedSchedule = await BookingService.cancelBooking(
      bookingId,
      traineeId
    );

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      data: updatedSchedule,
    });
  } catch (error: any) {
    const statusCode = error.message.includes("not found") ? 404 : 500;
    res.status(statusCode).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
