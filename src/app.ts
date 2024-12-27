// Import the 'express' module along with 'Request' and 'Response' types from express
import express from "express";

// Create an Express application
const app = express();

// Import dotenv to load environment variables
import dotenv from "dotenv";
if (process.env.ENV != "production")
  dotenv.config({ path: "src/config/config.env" }); // Load variables from .env file, specify path to your env file

//This is middleware function in Express.js that parses incoming requests with JSON payloads and makes the parsed data available in req.body.
app.use(express.json());

app.set("trust proxy", true);

// enable cors option to access from different origin
import cors, { CorsOptions } from "cors";
const corsOptions: CorsOptions = {
  origin: "*",
  credentials: true,
};
app.use(cors(corsOptions));
import cookieParser from "cookie-parser";
app.use(cookieParser());

//update  aws config
import AWS from "aws-sdk";
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// remove after installing v3
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

// Route import
import user from "./routes/userRoute";
app.use("/api/v1", user);

//Middleware for error
import ErrorMiddleware from "./middlewares/error";
app.use(ErrorMiddleware);

export default app;
