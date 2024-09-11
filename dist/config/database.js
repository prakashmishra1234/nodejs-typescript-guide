"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDataBase = () => {
    return new Promise((resolve, reject) => {
        mongoose_1.default
            .connect(process.env.DB_URI)
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
