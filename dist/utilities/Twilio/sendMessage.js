"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
// configuring env file
if (process.env.ENV != "production")
    dotenv_1.default.config({ path: "src/config/config.env" });
// Initialize Twilio Client
const TwilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
/**
 * Sends an SMS message to a specified mobile number using Twilio.
 *
 * @param {ISendMessage} params - The parameters required to send the SMS message.
 * @param {string} params.mobile - The mobile number to which the SMS message will be sent.
 * @param {string} params.message - The content of the SMS message to be sent.
 *
 * @returns {Promise<MessageInstance>} A promise that resolves with the response from Twilio if the message is sent successfully, or rejects with an error if the message could not be sent.
 *
 * @throws {Error} Throws an error if there is a problem with sending the SMS message. The error object will contain details about the failure.
 */
const SendMessage = ({ mobile, message, }) => {
    return new Promise((resolve, reject) => {
        TwilioClient.messages
            .create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: mobile,
        })
            .then((mes) => resolve(mes))
            .catch((error) => reject(error));
    });
};
exports.default = SendMessage;
