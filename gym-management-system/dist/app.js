"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const user_routes_1 = __importDefault(require("./users/user.routes"));
const trainers_routes_1 = __importDefault(require("./trainers/trainers.routes"));
const class_routes_1 = __importDefault(require("./classSchedule/class.routes"));
const booking_routes_1 = __importDefault(require("./bookings/booking.routes"));
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/auth", auth_routes_1.default);
app.use("/users", user_routes_1.default);
app.use("/trainer", trainers_routes_1.default);
app.use("/class", class_routes_1.default);
app.use("/booking", booking_routes_1.default);
// Sample route
app.get("/", (req, res) => {
    res.send("Welcome to the Gym Management System API!");
});
exports.default = app;
