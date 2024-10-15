"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a One-Time Password (OTP) of the specified length.
 *
 * @param {number} length - The length of the OTP to be generated.
 * @returns {string} The generated OTP as a string of digits.
 */
const generateOTP = (length) => {
    let otp = "";
    const digits = "0123456789";
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * digits.length)];
    }
    return otp;
};
exports.default = generateOTP;
