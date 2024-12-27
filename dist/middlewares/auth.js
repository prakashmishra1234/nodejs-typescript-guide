"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = exports.isAuthenticatedUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const errorHandler_1 = __importDefault(require("../utilities/others/errorHandler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const roleEnum_1 = __importDefault(require("../enum/roleEnum"));
/**
 * Middleware to check if the user is authenticated.
 * Validates the JWT token from the cookies and retrieves user details.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns Calls `next` with an error if the user is not authenticated, or proceeds if authenticated.
 */
exports.isAuthenticatedUser = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token) {
        return next(new errorHandler_1.default("Please login to access this resource", 401));
    }
    try {
        // Decode the JWT token
        const decodedData = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "");
        // Attach the user object to the request
        req.user = yield userModel_1.default.findById(decodedData.id);
        next();
    }
    catch (error) {
        console.log(error);
        return next(new errorHandler_1.default("Invalid or expired token", 401));
    }
}));
/**
 * Middleware to authorize access to specific roles.
 *
 * @param role - The role that is allowed to access the resource. Must match a value in the RoleEnum.
 * @returns An Express middleware function that checks if the user has the correct role.
 *
 * @example
 * // Allow access to only admin users
 * app.use('/admin', authorizeRoles(RoleEnum.Admin));
 *
 * @throws {ErrorHandler} If the user's role does not match the required role, an error with a 403 status code is thrown.
 */
const authorizeRoles = (role) => {
    return (req, res, next) => {
        if (req.user && role !== req.user.role) {
            return next(new errorHandler_1.default(`${roleEnum_1.default[req.user.role]} is not allowed to access this resouce.`, 403));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
