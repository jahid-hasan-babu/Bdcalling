"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.listUsers = exports.getProfile = exports.registerUser = void 0;
const user_service_1 = require("./user.service");
const userService = new user_service_1.UserService();
// export const registerUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { username, email, password, role } = req.body;
//   try {
//     const currentUserRole = req.user?.role;
//     const result = await userService.registerUser(
//       { username, email, password, role },
//       currentUserRole
//     );
//     res.status(201).json({ success: true, ...result });
//   } catch (error: any) {
//     const statusCode = error.message.includes("must be an admin")
//       ? 400
//       : error.message.includes("permission")
//       ? 403
//       : 500;
//     res.status(statusCode).json({ success: false, message: error.message });
//   }
// };
// Assuming userService is imported
const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const currentUserRole = req.user?.role;
        const result = await userService.registerUser({ username, email, password, role }, currentUserRole);
        res.status(201).json({ success: true, ...result });
    }
    catch (error) {
        if (error.name === "ValidationError") {
            const errorDetails = Object.keys(error.errors).map((field) => ({
                field,
                message: error.errors[field].message,
            }));
            return res.status(400).json({
                success: false,
                message: "Validation error occurred.",
                errorDetails,
            });
        }
        // Handle other types of errors
        const statusCode = error.message.includes("must be an admin")
            ? 400
            : error.message.includes("permission")
                ? 403
                : 500;
        res.status(statusCode).json({ success: false, message: error.message });
    }
};
exports.registerUser = registerUser;
const getProfile = async (req, res) => {
    try {
        const user = await userService.getProfile(req.user?.id);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found." });
            return;
        }
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.getProfile = getProfile;
const listUsers = async (req, res) => {
    try {
        const users = await userService.listUsers(); // No page and limit
        res.status(200).json({ success: true, users });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.listUsers = listUsers;
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const currentUserRole = req.user?.role;
        const result = await userService.deleteUser(id, currentUserRole);
        if (!result) {
            res.status(404).json({ success: false, message: "User not found." });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "User deleted successfully." });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
exports.deleteUser = deleteUser;
