import { Response } from "express";

/**
 * Sends a response with a status code, message, and data.
 *
 * @template T - The type of data being sent in the response.
 * @param {T} data - The data to be sent in the response.
 * @param {number} statuscode - The HTTP status code for the response.
 * @param {Response} res - The Express response object.
 * @param {string} message - A custom message to be included in the response.
 */
const SendData = <T>(
  statuscode: number,
  res: Response,
  message: string,
  data?: T
): void => {
  res.status(statuscode).json({
    success: true,
    message: message,
    data: data ?? null,
  });
};

export default SendData;
