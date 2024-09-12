import AWS from "aws-sdk";
import { ISendMessage } from "../../types/users/SendMessage";

// Initialize SNS service
AWS.config.update({ region: process.env.AWS_REGION });
const sns = new AWS.SNS();

/**
 * Sends an SMS message using AWS SNS to a specified mobile number.
 *
 * @function SendMessage
 * @param {ISendMessage} params - The parameters for sending the message.
 * @param {string} params.mobile - The mobile number to send the message to. Must include the country code (e.g., +1234567890).
 * @param {string} params.message - The message content to be sent.
 * @returns {Promise<any>} - A promise that resolves with the result of the SNS publish action or rejects with an error.
 *
 * @example
 * SendMessage({ mobile: '1234567890', message: 'Your OTP is 123456' })
 *   .then(result => {
 *     console.log('Message sent successfully:', result);
 *   })
 *   .catch(error => {
 *     console.error('Error sending message:', error);
 *   });
 *
 * @throws {Error} Throws an error if the SMS sending process fails.
 */
const SendMessage = ({ mobile, message }: ISendMessage): Promise<any> => {
  console.log(process.env.AWS_REGION);
  // Return a new Promise
  return new Promise((resolve, reject) => {
    const params = {
      Message: message,
      PhoneNumber: mobile,
    };

    // Publish the message via SNS
    sns.publish(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

export default SendMessage;
