"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClassScheduleById = exports.getClasses = exports.deleteClassSchedule = exports.updateClassSchedule = exports.createClassSchedule = void 0;
const class_service_1 = __importDefault(require("./class.service"));
// Create a class schedule
const createClassSchedule = async (req, res) => {
    try {
        const schedule = await class_service_1.default.createSchedule(req.body);
        res.status(201).json({ success: true, schedule });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.createClassSchedule = createClassSchedule;
// Update a class schedule
const updateClassSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedSchedule = await class_service_1.default.updateSchedule(id, req.body);
        if (!updatedSchedule) {
            return res
                .status(404)
                .json({ success: false, message: "Schedule not found." });
        }
        res.status(200).json({ success: true, updatedSchedule });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.updateClassSchedule = updateClassSchedule;
// Delete a class schedule
const deleteClassSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSchedule = await class_service_1.default.deleteSchedule(id);
        if (!deletedSchedule) {
            return res
                .status(404)
                .json({ success: false, message: "Schedule not found." });
        }
        res
            .status(200)
            .json({ success: true, message: "Schedule deleted successfully." });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.deleteClassSchedule = deleteClassSchedule;
// Get all class schedules
const getClasses = async (req, res) => {
    try {
        const userId = req.user?._id;
        const userRole = req.user?.role;
        const classes = await class_service_1.default.getClassesByUser(userId, userRole);
        res.status(200).json({ success: true, classes });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.getClasses = getClasses;
// Get a single class schedule by ID
const getClassScheduleById = async (req, res) => {
    const { id } = req.params;
    try {
        const schedule = await class_service_1.default.getScheduleById(id);
        if (!schedule) {
            return res
                .status(404)
                .json({ success: false, message: "Schedule not found." });
        }
        res.status(200).json({ success: true, schedule });
    }
    catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.getClassScheduleById = getClassScheduleById;
