"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// User Schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name."],
        maxlength: [30, "Name cannot exceed 30 characters."],
        minlength: [4, "Name should have more than 4 characters."],
    },
    mobile: {
        type: String,
        unique: true,
        required: [true, "Mobile number is required."],
        maxlength: [15, "Please enter a valid mobile number."],
    },
    otp: {
        type: String,
        required: false,
    },
    otpExpire: {
        type: Date,
        required: false,
    },
});
// Export the mongoose model
exports.default = mongoose_1.default.model("User", userSchema);
