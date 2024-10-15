import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/users/User";
import generateOTP from "../utilities/others/generateOtp";

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

  this.otp = otp;
  this.otpExpire = new Date(expirationTime);
  await this.save();
  return otp;
};

// Export the mongoose model
export default mongoose.model<IUser>("User", userSchema);
