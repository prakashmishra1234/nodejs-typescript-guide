import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import SendMessage from "../utilities/aws/sendMessage";
import ErrorHandler from "../utilities/others/errorHandler";
import SendData from "../utilities/others/sendData";

// register user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, mobile } = req.body;

  // create user in db
  const user = await User.create({ name, mobile });

  // return error if user not created
  if (!user) return next(new ErrorHandler("User creation failed", 400));

  // sent OTP to mobile number via SMS
  try {
    await SendMessage({
      mobile: mobile,
      message: "you are welcome!",
    });
  } catch (error: any) {
    if (error.message && error.code) {
      return next(new ErrorHandler(error.message, parseInt(error?.code)));
    }
    return next(new ErrorHandler("User creation failed", 400));
  }

  // send response to user
  SendData(201, res, "User created successfully");
};
