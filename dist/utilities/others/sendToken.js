"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Generates a JWT token for the user and sends it as a cookie in the response.
 *
 * @param user - The user object, which should include the method to generate the JWT token.
 * @param statusCode - The HTTP status code to be sent in the response.
 * @param res - The Express response object used to send the response.
 */
const SendToken = (user, statusCode, res) => {
    // Generate JWT token for the user
    const token = user.getJWTToken();
    // Options for the cookie
    const options = {
        expires: new Date(Date.now() +
            parseInt(process.env.COOKIE_EXPIRE || "1") * 24 * 60 * 60 * 1000 // Default to 7 days if not set
        ),
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    };
    // Send response with the token set as a cookie
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
    });
};
exports.default = SendToken;
