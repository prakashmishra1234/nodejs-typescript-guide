import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/users/User";
import generateOTP from "../utilities/others/generateOtp";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import RoleEnum from "../enum/roleEnum";

// configuring env file
if (process.env.ENV != "production")
  dotenv.config({ path: "src/config/config.env" });

// User Schema
const userSchema: Schema<IUser> = new mongoose.Schema({
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
  role: {
    type: Number,
    required: [true, "Please specify role."],
    validate: {
      validator: function (value: number) {
        return Object.values(RoleEnum).includes(value);
      },
      message: "Invalid role value.",
    },
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
userSchema.methods.generateOTP = async function (length: number) {
  const otp = generateOTP(length);
  const expirationTime =
    Date.now() + parseInt(process.env.OTP_EXPIRE || "300000", 10); // Default to 5 minutes if not set
  // Hash the OTP using SHA-256
  const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
  this.otp = hashedOtp;
  this.otpExpire = new Date(expirationTime);
  await this.save();
  return otp;
};

// generate json web token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET || "", {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Export the mongoose model
export default mongoose.model<IUser>("User", userSchema);
