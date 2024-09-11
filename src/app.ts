// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from "express";

// Create an Express application
const app = express();

//This is middleware function in Express.js that parses incoming requests with JSON payloads and makes the parsed data available in req.body.
app.use(express.json());

// Route import
import user from "./routes/userRoute";
app.use("/api/v1", user);

export default app;
