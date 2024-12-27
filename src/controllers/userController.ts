import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import ErrorHandler from "../utilities/others/errorHandler";
import SendData from "../utilities/others/sendData";
import SendMessage from "../utilities/Twilio/sendMessage";
import SendToken from "../utilities/others/sendToken";
import crypto from "crypto";
import asyncHandler from "../middlewares/asyncHandler";

// Register user
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Create user in the database
    const user = await User.create({ ...req.body });

    // Return error if user is not created
    if (!user) return next(new ErrorHandler("User creation failed", 400));

    // Generate OTP
    const otp = await user.generateOTP(6);
    await SendMessage({
      mobile: req.body.mobile,
      message: `Your OTP is for signing up is: ${otp}`,
    });

    // Send response to user
    SendData(201, res, "Otp has been sent successfully.");
  }
);

// Verify OTP
export const verifyOtp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobile, otp } = req.body;

    // Check if mobile and OTP are provided
    if (!mobile || !otp) {
      return next(
        new ErrorHandler("Please provide both mobile number and OTP", 400)
      );
    }

    // Find the user based on the mobile number
    const user = await User.findOne({ mobile });

    // Check if the user exists
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Hash the entered OTP to compare it with the stored hashed OTP
    const hashedEnteredOtp = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    // Check if the hashed entered OTP matches the stored OTP
    if (user.otp !== hashedEnteredOtp) {
      return next(new ErrorHandler("Invalid OTP.", 401));
    }

    // Check if the OTP has expired
    if (user.otpExpire && user.otpExpire < new Date()) {
      return next(new ErrorHandler("OTP has expired.", 401));
    }

    // Clear the OTP fields after successful verification
    user.otp = undefined;
    user.otpExpire = undefined;
    // add the last login activity of user
    user.lastLogin = new Date();
    user.lastLoginIP = req.ip;
    await user.save();

    // Generate a token and send it as a response
    SendToken(user, 200, res);
  }
);

// send otp
export const sendOtp = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { mobile } = req.body;

    if (!mobile) return next(new ErrorHandler("Please provide mobile", 400));

    // Find the user based on the mobile number
    const user = await User.findOne({ mobile });

    // Return error if user is not created
    if (!user) return next(new ErrorHandler("User not found", 400));

    // Generate OTP
    const otp = await user.generateOTP(6);
    await SendMessage({
      mobile: mobile,
      message: `Your OTP is for signing up is: ${otp}`,
    });

    // Send response to user
    SendData(201, res, "Otp has been sent successfully.");
  }
);

// get all users (Admin)
export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();
    SendData(200, res, "User fetched successfully.", users);
  }
);
