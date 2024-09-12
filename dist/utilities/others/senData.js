"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sends a response with a status code, message, and data.
 *
 * @template T - The type of data being sent in the response.
 * @param {T} data - The data to be sent in the response.
 * @param {number} statuscode - The HTTP status code for the response.
 * @param {Response} res - The Express response object.
 * @param {string} message - A custom message to be included in the response.
 */
const SendData = (statuscode, res, message, data) => {
    res.status(statuscode).json({
        success: true,
        message: message,
        data: data !== null && data !== void 0 ? data : null,
    });
};
exports.default = SendData;
