import { Router } from "express";
import { bookClass, cancelBooking } from "./booking.controller";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/book", protect, bookClass);
router.delete("/cancel/:bookingId", protect, cancelBooking);

export default router;
