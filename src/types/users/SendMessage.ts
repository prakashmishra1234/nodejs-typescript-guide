/**
 * Interface representing the structure for sending a message.
 *
 * @interface ISendMessage
 *
 * @property {string} mobile - The recipient's mobile number to which the message will be sent.
 * @property {string} message - The content of the message to be sent.
 *
 * @example
 * const sendMessageData: ISendMessage = {
 *   mobile: "+1234567890",
 *   message: "Your OTP is 123456"
 * };
 */
export interface ISendMessage {
  mobile: string;
  message: string;
}
