import express from "express";
import { sendOTP, verifyOTP, login, register, googleLogin, forgotPasswordOTP, resetPassword } from "./auth.controller.js";
import { otpLimiter } from "../../middlewares/rateLimit.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/send-otp", otpLimiter, sendOTP);
router.post("/verify-otp", otpLimiter, verifyOTP);
router.post("/google", googleLogin);
router.post("/forgot-password-otp", otpLimiter, forgotPasswordOTP);
router.post("/reset-password", resetPassword);

export default router;
