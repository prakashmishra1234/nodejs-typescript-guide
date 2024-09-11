import express, { Router } from "express";
import { registerUser } from "../controllers/userController";
import asyncHandler from "../middlewares/asyncHandler";

const router: Router = express.Router();

router.route("/register").post(asyncHandler(registerUser));

export default router;
