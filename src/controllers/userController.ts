import { Request, Response, NextFunction } from "express";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, mobile } = req.body;

  res.status(201).json({ name, mobile });
};
