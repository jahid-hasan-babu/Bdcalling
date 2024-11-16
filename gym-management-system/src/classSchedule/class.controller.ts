import { Request, Response } from "express";
import ClassService from "./class.service";

// Create a class schedule
export const createClassSchedule = async (req: Request, res: Response) => {
  try {
    const schedule = await ClassService.createSchedule(req.body);
    res.status(201).json({ success: true, schedule });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Update a class schedule
export const updateClassSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedSchedule = await ClassService.updateSchedule(id, req.body);
    if (!updatedSchedule) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found." });
    }
    res.status(200).json({ success: true, updatedSchedule });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a class schedule
export const deleteClassSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedSchedule = await ClassService.deleteSchedule(id);
    if (!deletedSchedule) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found." });
    }
    res
      .status(200)
      .json({ success: true, message: "Schedule deleted successfully." });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all class schedules
export const getClasses = async (req: Request, res: Response) => {
  try {
    const userId = req.user?._id;
    const userRole = req.user?.role;
    const classes = await ClassService.getClassesByUser(userId, userRole);
    res.status(200).json({ success: true, classes });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get a single class schedule by ID
export const getClassScheduleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const schedule = await ClassService.getScheduleById(id);
    if (!schedule) {
      return res
        .status(404)
        .json({ success: false, message: "Schedule not found." });
    }
    res.status(200).json({ success: true, schedule });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};
