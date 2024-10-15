import express, { Router } from "express";
import { registerUser, verifyOtp } from "../controllers/userController";
import asyncHandler from "../middlewares/asyncHandler";

const router: Router = express.Router();

router.route("/register").post(asyncHandler(registerUser));
router.route("/verifyOtp").post(asyncHandler(verifyOtp));

export default router;
