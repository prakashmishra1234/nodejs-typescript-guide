"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const roleEnum_1 = __importDefault(require("../enum/roleEnum"));
const router = express_1.default.Router();
router.route("/register").post(userController_1.registerUser);
router.route("/verifyOtp").post(userController_1.verifyOtp);
router.route("/sendOtp").post(userController_1.sendOtp);
router
    .route("/users")
    .get(auth_1.isAuthenticatedUser, (0, auth_1.authorizeRoles)(roleEnum_1.default.Admin), userController_1.getAllUsers);
exports.default = router;
