import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import ErrorHandler from "../utilities/others/errorHandler";
import SendData from "../utilities/others/sendData";
import SendMessage from "../utilities/Twilio/sendMessage";

// Register user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, mobile } = req.body;

  // Create user in the database
  const user = await User.create({ name, mobile });

  // Return error if user is not created
  if (!user) return next(new ErrorHandler("User creation failed", 400));

  // Send OTP to mobile number via SMS
  try {
    // Generate OTP
    const otp = await user.generateOTP(6);
    await SendMessage({
      mobile: mobile,
      message: `Your OTP is for signing up is: ${otp}`,
    });
  } catch (error: any) {
    if (error.message && error.code) {
      return next(new ErrorHandler(error.message, parseInt(error.code)));
    }
    return next(new ErrorHandler("User creation failed", 400));
  }

  // Send response to user
  SendData(201, res, "User created successfully");
};
