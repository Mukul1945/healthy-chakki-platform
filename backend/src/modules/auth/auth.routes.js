import express from "express";
import { sendOTP, verifyOTP, login, register } from "./auth.controller.js";
import { otpLimiter } from "../../middlewares/rateLimit.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/send-otp", otpLimiter, sendOTP);
router.post("/verify-otp", otpLimiter, verifyOTP);

export default router;
