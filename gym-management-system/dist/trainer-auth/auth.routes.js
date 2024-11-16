"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/auth/auth.routes.ts
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
router.post("/trainer-login", auth_controller_1.loginTrainer);
exports.default = router;
