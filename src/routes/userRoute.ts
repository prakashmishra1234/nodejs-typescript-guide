import express, { Router } from "express";
import {
  registerUser,
  verifyOtp,
  sendOtp,
  getAllUsers,
} from "../controllers/userController";
import { isAuthenticatedUser } from "../middlewares/auth";

const router: Router = express.Router();

router.route("/register").post(registerUser);
router.route("/verifyOtp").post(verifyOtp);
router.route("/sendOtp").post(sendOtp);
router.route("/users").get(isAuthenticatedUser, getAllUsers);

export default router;
