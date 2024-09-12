"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
const connectDataBase = (DB_URI) => {
    return new Promise((resolve, reject) => {
        mongoose_1.default
            .connect(DB_URI)
            .then((data) => {
            console.log(`Mongodb connected with server ${data.connection.host}`);
            resolve(data);
        })
            .catch((error) => {
            if (error instanceof Error) {
                console.log(`Database connection Error: ${error.message}`);
                reject(error);
            }
            else {
                console.log("Unknown error occurred during database connection");
                reject(new Error("Unknown error occurred during database connection"));
            }
        });
    });
};
exports.default = connectDataBase;
