import twilio from "twilio";
import { ISendMessage } from "../../types/users/SendMessage";
import { MessageInstance } from "twilio/lib/rest/api/v2010/account/message";

// Initialize Twilio Client
const TwilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const SendMessage = ({
  mobile,
  message,
}: ISendMessage): Promise<MessageInstance> => {
  return new Promise((resolve, reject) => {
    TwilioClient.messages
      .create({
        body: message,
        from: "+919507041006",
        to: mobile,
      })
      .then((mes: MessageInstance) => resolve(mes))
      .catch((error: Error) => reject(error));
  });
};

export default SendMessage;
