import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/users/User";

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

// Export the mongoose model
export default mongoose.model<IUser>("User", userSchema);
