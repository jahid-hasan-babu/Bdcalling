import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
const app = express();

import authRoutes from "./auth/auth.routes";
import userRoutes from "./users/user.routes";
import trainerRoutes from "./trainers/trainers.routes";
import classRoutes from "./classSchedule/class.routes";
import classBookingRoutes from "./bookings/booking.routes";

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/trainer", trainerRoutes);
app.use("/class", classRoutes);
app.use("/booking", classBookingRoutes);

// Sample route
app.get("/", (req, res) => {
  res.send("Welcome to the Gym Management System API!");
});

export default app;
