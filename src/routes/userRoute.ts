import express, { Router } from "express";
import {
  registerUser,
  verifyOtp,
  sendOtp,
  getAllUsers,
} from "../controllers/userController";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth";
import RoleEnum from "../enum/roleEnum";

const router: Router = express.Router();

router.route("/register").post(registerUser);
router.route("/verifyOtp").post(verifyOtp);
router.route("/sendOtp").post(sendOtp);
router
  .route("/users")
  .get(isAuthenticatedUser, authorizeRoles(RoleEnum.Admin), getAllUsers);

export default router;
