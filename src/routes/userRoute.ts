import express, { Router } from "express";
import {
  registerUser,
  verifyOtp,
  sendOtp,
} from "../controllers/userController";

const router: Router = express.Router();

router.route("/register").post(registerUser);
router.route("/verifyOtp").post(verifyOtp);
router.route("/sendOtp").post(sendOtp);

export default router;
