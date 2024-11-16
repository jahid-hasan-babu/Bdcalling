import { Request, Response, NextFunction } from "express";

// Global error handler middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") {
    const errorDetails = Object.keys(err.errors).map((field) => ({
      field,
      message: err.errors[field].message,
    }));

    return res.status(400).json({
      success: false,
      message: "Validation error occurred.",
      errorDetails: errorDetails[0],
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
};

export default errorHandler;
