import rateLimit from "express-rate-limit";

export const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message: "Too many OTP requests. Please try again later.",
});
