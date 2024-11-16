import { Router } from "express";
import {
  createClassSchedule,
  updateClassSchedule,
  deleteClassSchedule,
  getClasses,
  getClassScheduleById,
} from "./class.controller";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = Router();

router.get("/classes", protect, getClasses);
router.post("/create-class", protect, adminOnly, createClassSchedule);
router.patch("/update-class/:id", protect, adminOnly, updateClassSchedule);
router.delete("/delete-class/:id", protect, adminOnly, deleteClassSchedule);
router.get("/single-class/:id", protect, adminOnly, getClassScheduleById);

export default router;
