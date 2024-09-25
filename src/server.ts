// import app module
import app from "./app";

// Import dotenv to load environment variables
import dotenv from "dotenv";
if (process.env.ENV != "production")
  dotenv.config({ path: "src/config/config.env" }); // Load variables from .env file, specify path to your env file

//update  aws config
import AWS from "aws-sdk";
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// remove after installing v3
require("aws-sdk/lib/maintenance_mode_message").suppress = true;

// Specify the port number for the server
const port: number = parseInt(process.env.PORT as string, 10);

// handling uncaught error
process.on("uncaughtException", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});

// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Connect to the database
import connectDataBase from "./config/database";
connectDataBase(process.env.DB_URI as string).catch((err: Error) => {
  console.log(`Shutting down the server due to database connection failure`);
  server.close(() => {
    process.exit(1);
  });
});

//Unhandled Promise Rejections
process.on("unhandledRejection", (err: Error) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
