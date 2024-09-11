import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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

export default mongoose.model("User", userSchema);
