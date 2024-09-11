import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import SendMessage from "../utilities/aws/sendMessage";
import ErrorHandler from "../utilities/others/errorHandler";

// register user
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, mobile } = req.body;
  const user = await User.create({ name, mobile });

  if (!user) return new ErrorHandler("User creation failed", 400);

  await SendMessage({
    mobile: mobile,
    message: "you are welcome!",
  });
};
