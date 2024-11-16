"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTrainer = exports.updateTrainer = exports.getTrainerById = exports.getAllTrainers = exports.loginTrainer = exports.createTrainer = void 0;
const trainers_service_1 = __importDefault(require("./trainers.service"));
const createTrainer = async (req, res) => {
    try {
        const trainer = await trainers_service_1.default.createTrainer(req.body);
        res.status(201).json({ success: true, trainer });
    }
    catch (err) {
        if (err.message === "Email already exists.") {
            return res.status(400).json({
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
            return res.status(400).json({
                success: false,
                message: "Validation error occurred.",
                errorDetails,
            });
        }
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.createTrainer = createTrainer;
const loginTrainer = async (req, res) => {
    const { email, password } = req.body;
    const token = await trainers_service_1.default.login(email, password);
    if (token) {
        res.status(200).json({ success: true, token });
    }
    else {
        res
            .status(401)
            .json({ success: false, message: "Invalid email or password." });
    }
};
exports.loginTrainer = loginTrainer;
// Get all trainers
const getAllTrainers = async (req, res) => {
    try {
        const trainers = await trainers_service_1.default.getAllTrainers();
        res.status(200).json({ success: true, trainers });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getAllTrainers = getAllTrainers;
// Get one trainer by ID
const getTrainerById = async (req, res) => {
    try {
        const trainer = await trainers_service_1.default.getTrainerById(req.params.id);
        if (!trainer) {
            res.status(404).json({ success: false, message: "Trainer not found." });
            return;
        }
        res.status(200).json({ success: true, trainer });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getTrainerById = getTrainerById;
// Update a trainer by ID
const updateTrainer = async (req, res) => {
    try {
        const trainer = await trainers_service_1.default.updateTrainer(req.params.id, req.body);
        if (!trainer) {
            res.status(404).json({ success: false, message: "Trainer not found." });
            return;
        }
        res.status(200).json({ success: true, trainer });
    }
    catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.updateTrainer = updateTrainer;
// Delete a trainer by ID
const deleteTrainer = async (req, res) => {
    try {
        const trainer = await trainers_service_1.default.deleteTrainer(req.params.id);
        if (!trainer) {
            res.status(404).json({ success: false, message: "Trainer not found." });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Trainer deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteTrainer = deleteTrainer;
