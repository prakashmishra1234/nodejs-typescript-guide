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
const mongoose_1 = __importDefault(require("mongoose"));
const generateOtp_1 = __importDefault(require("../utilities/others/generateOtp"));
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
        required: [true, "Please enter your mobile number."],
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
// Method to generate OTP and set expiration
userSchema.methods.generateOTP = function (length) {
    return __awaiter(this, void 0, void 0, function* () {
        const otp = (0, generateOtp_1.default)(length);
        const expirationTime = Date.now() + parseInt(process.env.OTP_EXPIRE || "300000", 10); // Default to 5 minutes if not set
        this.otp = otp;
        this.otpExpire = new Date(expirationTime);
        yield this.save();
        return otp;
    });
};
// Export the mongoose model
exports.default = mongoose_1.default.model("User", userSchema);
