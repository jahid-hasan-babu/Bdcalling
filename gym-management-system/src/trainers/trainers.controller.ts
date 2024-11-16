import { Request, Response } from "express";
import TrainerService from "./trainers.service";

export const createTrainer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trainer = await TrainerService.createTrainer(req.body);
    res.status(201).json({ success: true, trainer });
  } catch (err: any) {
    if (err.message === "Email already exists.") {
      return <any>res.status(400).json({
        success: false,
        message: "Validation error occurred.",
        errorDetails: {
          field: "email",
          message: "Email already exists.",
        },
      });
    }
    if (err.name === "ValidationError") {
      const errorDetails = Object.keys(err.errors).map((field) => ({
        field,
        message: err.errors[field].message,
      }));

      return <any>res.status(400).json({
        success: false,
        message: "Validation error occurred.",
        errorDetails,
      });
    }
    res.status(400).json({ success: false, message: err.message });
  }
};

export const loginTrainer = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await TrainerService.login(email, password);

  if (token) {
    res.status(200).json({ success: true, token });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password." });
  }
};

// Get all trainers
export const getAllTrainers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trainers = await TrainerService.getAllTrainers();
    res.status(200).json({ success: true, trainers });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get one trainer by ID
export const getTrainerById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trainer = await TrainerService.getTrainerById(req.params.id);
    if (!trainer) {
      res.status(404).json({ success: false, message: "Trainer not found." });
      return;
    }
    res.status(200).json({ success: true, trainer });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a trainer by ID
export const updateTrainer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trainer = await TrainerService.updateTrainer(req.params.id, req.body);
    if (!trainer) {
      res.status(404).json({ success: false, message: "Trainer not found." });
      return;
    }
    res.status(200).json({ success: true, trainer });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a trainer by ID
export const deleteTrainer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const trainer = await TrainerService.deleteTrainer(req.params.id);
    if (!trainer) {
      res.status(404).json({ success: false, message: "Trainer not found." });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Trainer deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
