"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const asyncHandler_1 = __importDefault(require("../middlewares/asyncHandler"));
const router = express_1.default.Router();
router.route("/register").post((0, asyncHandler_1.default)(userController_1.registerUser));
router.route("/verifyOtp").post((0, asyncHandler_1.default)(userController_1.verifyOtp));
exports.default = router;
