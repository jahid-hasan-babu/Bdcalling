import { Router } from "express";
import {
  createTrainer,
  loginTrainer,
  getAllTrainers,
  getTrainerById,
  updateTrainer,
  deleteTrainer,
} from "./trainers.controller";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

// Admin-only route to create a trainer

router.post("/register-trainer", protect, adminOnly, createTrainer);
// login
router.post("/login", loginTrainer);
// Get all trainers
router.get("/", protect, adminOnly, getAllTrainers);

// Get one trainer by ID
router.get("/:id", protect, adminOnly, getTrainerById);

// Update a trainer by ID
router.put("/update/:id", protect, adminOnly, updateTrainer);

// Delete a trainer by ID
router.delete("/delete/:id", protect, adminOnly, deleteTrainer);

export default router;
