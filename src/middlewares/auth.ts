import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import ErrorHandler from "../utilities/others/errorHandler";
import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import RoleEnum from "../enum/roleEnum";
import { IUser } from "../types/users/User";

/**
 * Middleware to check if the user is authenticated.
 * Validates the JWT token from the cookies and retrieves user details.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 * @returns Calls `next` with an error if the user is not authenticated, or proceeds if authenticated.
 */
export const isAuthenticatedUser = asyncHandler(
  async (
    req: Request & { user?: IUser | null },
    res: Response,
    next: NextFunction
  ) => {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }

    try {
      // Decode the JWT token
      const decodedData = jwt.verify(
        token,
        process.env.JWT_SECRET || ""
      ) as JwtPayload;

      // Attach the user object to the request
      req.user = await User.findById(decodedData.id);
      next();
    } catch (error) {
      console.log(error);
      return next(new ErrorHandler("Invalid or expired token", 401));
    }
  }
);

/**
 * Middleware to authorize access to specific roles.
 *
 * @param role - The role that is allowed to access the resource. Must match a value in the RoleEnum.
 * @returns An Express middleware function that checks if the user has the correct role.
 *
 * @example
 * // Allow access to only admin users
 * app.use('/admin', authorizeRoles(RoleEnum.Admin));
 *
 * @throws {ErrorHandler} If the user's role does not match the required role, an error with a 403 status code is thrown.
 */
export const authorizeRoles = (role: RoleEnum) => {
  return (
    req: Request & { user?: IUser | null },
    res: Response,
    next: NextFunction
  ) => {
    if (req.user && role !== req.user.role) {
      return next(
        new ErrorHandler(
          `${RoleEnum[req.user.role]} is not allowed to access this resouce.`,
          403
        )
      );
    }
    next();
  };
};
