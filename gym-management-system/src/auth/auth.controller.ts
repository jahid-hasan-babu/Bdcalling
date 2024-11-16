// src/auth/auth.controller.ts
import { Request, Response } from "express";
import AuthService from "./auth.service";

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const token = await AuthService.login(email, password);

    if (token) {
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
