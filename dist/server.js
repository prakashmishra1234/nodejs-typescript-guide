"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import app module
const app_1 = __importDefault(require("./app"));
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
