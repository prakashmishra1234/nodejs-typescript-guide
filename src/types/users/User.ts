import { Document } from "mongoose";
import RoleEnum from "../../enum/roleEnum";

/**
 * Interface representing a User document in MongoDB.
 * Extends the Mongoose `Document` interface to include MongoDB document properties.
 *
 * @interface IUser
 * @extends {Document}
 *
 * @property {string} name - The name of the user.
 * @property {string} mobile - The mobile number of the user.
 * @property {string} [otp] - (Optional) The one-time password (OTP) for the user.
 * @property {Date} [otpExpire] - (Optional) The expiration time for the OTP.
 * @property {Date} [lastLogin] - (Optional) The last login time of the user.
 * @property {string} [lastLoginIP] - (Optional) The last login ip of the user.
 * @method generateOTP - Method to generate an OTP of specified length.
 * @method getJWTToken - Method to generate a JSON Web Token for the user.
 *
 * @example
 * const user: IUser = {
 *   name: "John Doe",
 *   mobile: "+1234567890",
 *   otp: "123456",
 *   otpExpire: new Date(),
 *   lastLogin?: new Date();
 *   lastLoginIP?: "127.0.0.1";
 *   generateOTP(length: number): Promise<string>;
 *   getJWTToken(): string;
 * };
 */
export interface IUser extends Document {
  name: string;
  mobile: string;
  role: RoleEnum;
  otp?: string;
  otpExpire?: Date;
  lastLogin?: Date;
  lastLoginIP?: string;
  generateOTP(length: number): Promise<string>;
  getJWTToken(): string;
}
