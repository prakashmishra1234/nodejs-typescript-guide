import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  mobile: string;
  otp?: string;
  otpExpire?: Date;
}
