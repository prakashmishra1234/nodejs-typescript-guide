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
app.set("trust proxy", true);
// enable cors option to access from different origin
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: "*",
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use((0, cookie_parser_1.default)());
//update  aws config
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
// remove after installing v3
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
// Route import
const userRoute_1 = __importDefault(require("./routes/userRoute"));
app.use("/api/v1", userRoute_1.default);
//Middleware for error
const error_1 = __importDefault(require("./middlewares/error"));
app.use(error_1.default);
exports.default = app;
