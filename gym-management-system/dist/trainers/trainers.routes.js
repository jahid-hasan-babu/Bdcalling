"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trainers_controller_1 = require("./trainers.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// Admin-only route to create a trainer
router.post("/register-trainer", authMiddleware_1.protect, authMiddleware_1.adminOnly, trainers_controller_1.createTrainer);
// login
router.post("/login", trainers_controller_1.loginTrainer);
// Get all trainers
router.get("/", authMiddleware_1.protect, authMiddleware_1.adminOnly, trainers_controller_1.getAllTrainers);
// Get one trainer by ID
router.get("/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, trainers_controller_1.getTrainerById);
// Update a trainer by ID
router.put("/update/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, trainers_controller_1.updateTrainer);
// Delete a trainer by ID
router.delete("/delete/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, trainers_controller_1.deleteTrainer);
exports.default = router;
