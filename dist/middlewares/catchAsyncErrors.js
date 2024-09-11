"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A higher-order function to wrap async route handlers and pass errors to Express error handlers.
 *
 * @param theFunc - An asynchronous Express route handler function.
 * @returns A new Express request handler that catches errors and passes them to `next`.
 */
const asyncHandler = (theFunc) => {
    return (req, res, next) => {
        Promise.resolve(theFunc(req, res, next)).catch(next);
    };
};
exports.default = asyncHandler;
