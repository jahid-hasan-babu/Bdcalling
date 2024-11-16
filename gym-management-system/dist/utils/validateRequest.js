"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Global error handler middleware
const errorHandler = (err, req, res, next) => {
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
exports.errorHandler = errorHandler;
exports.default = exports.errorHandler;
