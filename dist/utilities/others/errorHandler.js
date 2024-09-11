"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom error handler class for handling application-specific errors.
 * Extends the built-in Error class to include an HTTP status code.
 *
 * @class ErrorHandler
 * @extends {Error}
 */
class ErrorHandler extends Error {
    /**
     * Creates an instance of ErrorHandler.
     *
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code to return with the error.
     */
    constructor(message, statusCode) {
        super(message); // Call the base class constructor with the message
        this.statusCode = statusCode;
        // Captures the stack trace to show where the error originated
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = ErrorHandler;
