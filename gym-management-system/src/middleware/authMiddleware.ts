import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../users/user.model";

// Middleware to authenticate users
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed." });
    }
  } else {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided." });
  }
};

// Middleware for admin-only access
export const adminOnly = (req: any, res: any, next: any) => {
  if (req.user?.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Unauthorized access.",
      errorDetails: "You must be an admin to perform this action.",
    });
  }
};
