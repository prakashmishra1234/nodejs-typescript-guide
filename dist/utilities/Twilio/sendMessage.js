"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twilio_1 = __importDefault(require("twilio"));
// Initialize Twilio Client
const TwilioClient = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const SendMessage = ({ mobile, message, }) => {
    return new Promise((resolve, reject) => {
        TwilioClient.messages
            .create({
            body: message,
            from: "+919507041006",
            to: mobile,
        })
            .then((mes) => resolve(mes))
            .catch((error) => reject(error));
    });
};
exports.default = SendMessage;
