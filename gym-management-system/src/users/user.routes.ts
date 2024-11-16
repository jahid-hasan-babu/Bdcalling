import { Router } from "express";
import {
  registerUser,
  getProfile,
  listUsers,
  deleteUser,
} from "./user.controller";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

// User registration
router.post("/register", registerUser);

// Get logged-in user's profile
router.get("/profile", protect, getProfile);

// Admin: List all users
router.get("/all-users", protect, adminOnly, listUsers);

// Admin: Delete a user
router.delete("/delete-users/:id", protect, adminOnly, deleteUser);

export default router;
