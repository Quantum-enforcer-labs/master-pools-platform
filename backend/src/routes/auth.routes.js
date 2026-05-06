// auth.routes.js
import { Router } from "express";
import {
  changePassword,
  getMe,
  login,
  register,
  requestPasswordReset,
  resetPassword,
  sendOtp,
  updateProfile,
  verifyOtp,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);
router.get("/me", protect, getMe);
router.put("/profile", protect, updateProfile);
router.put("/password", protect, changePassword);

export default router;
