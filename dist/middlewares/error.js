"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../utilities/others/errorHandler"));
/**
 * Middleware to handle application errors and send appropriate responses.
 * Handles specific MongoDB, Mongoose, and JWT errors.
 *
 * @function ErrorMiddleware
 * @param {Error} err - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
const ErrorMiddleware = (err, // Use 'any' for general error handling
req, res, next) => {
    // Set default status code to 500 if not provided
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    console.log(err);
    // MongoDB CastError: Invalid ObjectId or resource not found
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}.`;
        err = new errorHandler_1.default(message, 400);
    }
    // Mongodb dulicate field error
    if (err.code === 11000) {
        const message = `This ${Object.keys(err.keyValue)} already exist with us.`;
        err = new errorHandler_1.default(message, 400);
    }
    // Mongodb validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors).map((error) => error.message);
        const message = messages[0];
        err = new errorHandler_1.default(message, 400);
    }
    // JWT token invalid error
    if (err.name === "JsonWebTokenError") {
        const message = `Json web token is invalid, try again.`;
        err = new errorHandler_1.default(message, 400);
    }
    // JWT token expired error
    if (err.name === "TokenExpiredError") {
        const message = `Json web token is expired, try again.`;
        err = new errorHandler_1.default(message, 400);
    }
    // Send the error response
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.default = ErrorMiddleware;
