import mongoose, { Mongoose } from "mongoose";

const connectDataBase = (): Promise<Mongoose> => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.DB_URI as string)
      .then((data: Mongoose) => {
        console.log(`Mongodb connected with server ${data.connection.host}`);
        resolve(data);
      })
      .catch((error: unknown) => {
        if (error instanceof Error) {
          console.log(`Database connection Error: ${error.message}`);
          reject(error);
        } else {
          console.log("Unknown error occurred during database connection");
          reject(
            new Error("Unknown error occurred during database connection")
          );
        }
      });
  });
};

export default connectDataBase;
