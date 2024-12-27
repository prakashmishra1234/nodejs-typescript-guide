import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import ErrorHandler from "../utilities/others/errorHandler";
import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";

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
    req: Request & { user?: typeof User | null },
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

// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new ErrorHandler(
//           `Role: ${req.user.role} is not allowed to access this resouce `,
//           403
//         )
//       );
//     }
//     next();
//   };
// };
