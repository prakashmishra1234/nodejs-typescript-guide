// import app module
import app from "./app";

// Import dotenv to load environment variables
import dotenv from "dotenv";
dotenv.config({ path: "src/config/config.env" }); // Load variables from .env file, specify path to your env file

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
connectDataBase().catch((err: Error) => {
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
