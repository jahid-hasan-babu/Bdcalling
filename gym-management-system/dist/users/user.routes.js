"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// User registration
router.post("/register", user_controller_1.registerUser);
// Get logged-in user's profile
router.get("/profile", authMiddleware_1.protect, user_controller_1.getProfile);
// Admin: List all users
router.get("/all-users", authMiddleware_1.protect, authMiddleware_1.adminOnly, user_controller_1.listUsers);
// Admin: Delete a user
router.delete("/delete-users/:id", authMiddleware_1.protect, authMiddleware_1.adminOnly, user_controller_1.deleteUser);
exports.default = router;
