import express from "express";
import { sendOTP, verifyOTP } from "./auth.controller.js";
import { otpLimiter } from "../../middlewares/rateLimit.middleware.js";

const router = express.Router();

router.post("/send-otp", otpLimiter, sendOTP);
router.post("/verify-otp", otpLimiter, verifyOTP);

export default router;
