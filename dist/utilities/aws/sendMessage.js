"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// Initialize SNS service
const sns = new aws_sdk_1.default.SNS({ apiVersion: "2010-03-31" });
/**
 * Sends an SMS message to a specified mobile number using AWS SNS.
 *
 * @param {ISendMessage} params - The parameters required to send the SMS message.
 * @param {string} params.mobile - The mobile number to which the SMS message will be sent.
 * @param {string} params.message - The content of the SMS message to be sent.
 *
 * @returns {Promise<PublishResponse>} A promise that resolves with the response from AWS SNS if the message is sent successfully, or rejects with an error if the message could not be sent.
 *
 * @throws {AWSError} Throws an error if there is a problem with sending the SMS message. The error object will contain details about the failure.
 *
 * @example
 *
 * const result = await SendMessage({ mobile: '+1234567890', message: 'Hello, world!' });
 * console.log('Message sent successfully:', result);
 *
 * @example
 *
 * SendMessage({ mobile: '+1234567890', message: 'Hello, world!' })
 *   .then(data => console.log('Message sent successfully:', data))
 *   .catch(err => console.error('Error sending message:', err));
 */
const SendMessage = ({ mobile, message }) => {
    return new Promise((resolve, reject) => {
        const params = {
            Message: message,
            PhoneNumber: mobile,
        };
        sns.publish(params, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
exports.default = SendMessage;
