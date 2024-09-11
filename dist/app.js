"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the 'express' module along with 'Request' and 'Response' types from express
const express_1 = __importDefault(require("express"));
// Create an Express application
const app = (0, express_1.default)();
//This is middleware function in Express.js that parses incoming requests with JSON payloads and makes the parsed data available in req.body.
app.use(express_1.default.json());
// Route import
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use("/api/v1", userRoute_1.default);
exports.default = app;
