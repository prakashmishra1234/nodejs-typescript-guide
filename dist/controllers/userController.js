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
exports.getAllUsers = exports.sendOtp = exports.verifyOtp = exports.registerUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const errorHandler_1 = __importDefault(require("../utilities/others/errorHandler"));
const sendData_1 = __importDefault(require("../utilities/others/sendData"));
const sendMessage_1 = __importDefault(require("../utilities/Twilio/sendMessage"));
const sendToken_1 = __importDefault(require("../utilities/others/sendToken"));
const crypto_1 = __importDefault(require("crypto"));
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
// Register user
exports.registerUser = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Create user in the database
    const user = yield userModel_1.default.create(Object.assign({}, req.body));
    // Return error if user is not created
    if (!user)
        return next(new errorHandler_1.default("User creation failed", 400));
    // Generate OTP
    const otp = yield user.generateOTP(6);
    yield (0, sendMessage_1.default)({
        mobile: req.body.mobile,
        message: `Your OTP is for signing up is: ${otp}`,
    });
    // Send response to user
    (0, sendData_1.default)(201, res, "Otp has been sent successfully");
}));
// Verify OTP
exports.verifyOtp = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.ip);
    const { mobile, otp } = req.body;
    // Check if mobile and OTP are provided
    if (!mobile || !otp) {
        return next(new errorHandler_1.default("Please provide both mobile number and OTP", 400));
    }
    // Find the user based on the mobile number
    const user = yield userModel_1.default.findOne({ mobile });
    // Check if the user exists
    if (!user) {
        return next(new errorHandler_1.default("User not found", 404));
    }
    // Hash the entered OTP to compare it with the stored hashed OTP
    const hashedEnteredOtp = crypto_1.default
        .createHash("sha256")
        .update(otp)
        .digest("hex");
    // Check if the hashed entered OTP matches the stored OTP
    if (user.otp !== hashedEnteredOtp) {
        return next(new errorHandler_1.default("Invalid OTP", 401));
    }
    // Check if the OTP has expired
    if (user.otpExpire && user.otpExpire < new Date()) {
        return next(new errorHandler_1.default("OTP has expired", 401));
    }
    // Clear the OTP fields after successful verification
    user.otp = undefined;
    user.otpExpire = undefined;
    yield user.save();
    // Generate a token and send it as a response
    (0, sendToken_1.default)(user, 200, res);
}));
// send otp
exports.sendOtp = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { mobile } = req.body;
    if (!mobile)
        return next(new errorHandler_1.default("Please provide mobile", 400));
    // Find the user based on the mobile number
    const user = yield userModel_1.default.findOne({ mobile });
    // Return error if user is not created
    if (!user)
        return next(new errorHandler_1.default("User not found", 400));
    // Generate OTP
    const otp = yield user.generateOTP(6);
    yield (0, sendMessage_1.default)({
        mobile: mobile,
        message: `Your OTP is for signing up is: ${otp}`,
    });
    // Send response to user
    (0, sendData_1.default)(201, res, "Otp has been sent successfully");
}));
// get all users (Admin)
exports.getAllUsers = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, sendData_1.default)(200, res, "Otp has been sent successfully", []);
}));
