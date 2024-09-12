import mongoose, { Mongoose } from "mongoose";

/**
 * Connects to a MongoDB database using Mongoose.
 *
 * @param {string} DB_URI - The MongoDB connection string/URI.
 * @returns {Promise<Mongoose>} A promise that resolves to the Mongoose instance upon a successful connection or rejects with an error if the connection fails.
 *
 * @example
 * ```ts
 * const DB_URI = 'mongodb://localhost:27017/mydb';
 * connectDataBase(DB_URI)
 *   .then((mongooseInstance) => {
 *     console.log('Database connected successfully!');
 *   })
 *   .catch((error) => {
 *     console.error('Error connecting to the database:', error);
 *   });
 * ```
 */
const connectDataBase = (DB_URI: string): Promise<Mongoose> => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(DB_URI)
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
