import { Response } from "express";

/**
 * Sends a JSON response with the given status code, message, and optional data.
 *
 * @template T - The type of the data being sent in the response.
 *
 * @param {number} statuscode - The HTTP status code to be sent in the response.
 * @param {Response} res - The Express.js `Response` object used to send the response.
 * @param {string} message - A message providing information about the response.
 * @param {T} [data] - Optional data to be included in the response. Defaults to `null` if not provided.
 *
 * @returns {void} This function does not return anything, it directly sends the response using the `res` object.
 *
 * @example
 *
 * SendData(200, res, "Request successful", { id: 123, name: "John Doe" });
 *
 * // Output:
 * // {
 * //   success: true,
 * //   message: "Request successful",
 * //   data: { id: 123, name: "John Doe" }
 * // }
 *
 * @example
 *
 * SendData(404, res, "Resource not found");
 *
 * // Output:
 * // {
 * //   success: false,
 * //   message: "Resource not found",
 * //   data: null
 * // }
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
