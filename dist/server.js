"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
// import app module
const app_1 = __importDefault(require("./app"));
// Import dotenv to load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.ENV != "production")
  dotenv_1.default.config({ path: "src/config/config.env" }); // Load variables from .env file, specify path to your env file
//update  aws config
const aws_sdk_1 = __importDefault(require("aws-sdk"));
aws_sdk_1.default.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

// Specify the port number for the server
const port = parseInt(process.env.PORT, 10);
// handling uncaught error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
});
// Start the server and listen on the specified port
const server = app_1.default.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
// Connect to the database
const database_1 = __importDefault(require("./config/database"));
(0, database_1.default)(process.env.DB_URI).catch((err) => {
  console.log(`Shutting down the server due to database connection failure`);
  server.close(() => {
    process.exit(1);
  });
});
//Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
