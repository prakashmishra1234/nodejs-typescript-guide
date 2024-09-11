import { Request, Response, NextFunction, RequestHandler } from "express";

/**
 * A higher-order function to wrap async route handlers and pass errors to Express error handlers.
 *
 * @param theFunc - An asynchronous Express route handler function.
 * @returns A new Express request handler that catches errors and passes them to `next`.
 */
const asyncHandler = (
  theFunc: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
};

export default asyncHandler;
