import { Document } from "mongoose";

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
 * @method generateOTP - Method to generate an OTP of specified length.
 * @method getJWTToken - Method to generate a JSON Web Token for the user.
 *
 * @example
 * const user: IUser = {
 *   name: "John Doe",
 *   mobile: "+1234567890",
 *   otp: "123456",
 *   otpExpire: new Date(),
 *   generateOTP(length: number): Promise<string>;
 *   getJWTToken(): string;
 * };
 */
export interface IUser extends Document {
  name: string;
  mobile: string;
  otp?: string;
  otpExpire?: Date;
  generateOTP(length: number): Promise<string>;
  getJWTToken(): string;
}
