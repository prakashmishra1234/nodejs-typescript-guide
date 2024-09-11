"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxlength: [30, "Name can not exceed 30 characters"],
        minlength: [4, "Name should have more than 4 characters"],
    },
    Mobile: {
        type: String,
        required: [true, "Mobile number is required."],
        maxlength: [10, "Please enter valid mobile number."],
        minlength: [10, "Please enter valid mobile number."],
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
exports.default = mongoose_1.default.model("User", userSchema);
