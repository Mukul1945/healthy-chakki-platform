import User from "../users/user.model.js";
import { generateOTP } from "../../utils/otp.js";
import { successResponse } from "../../utils/response.js";
import { generateToken } from "./auth.service.js";

// SEND OTP
export const sendOTP = async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone && !email) {
      return res.status(400).json({
        success: false,
        message: "Phone or Email is required",
      });
    }

    const otp = generateOTP();

    let user = await User.findOne({
      $or: [{ phone }, { email }],
    });

    if (!user) {
      user = await User.create({ phone, email });
    }

    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    await user.save();

    console.log("OTP (DEV ONLY):", otp);

    return successResponse(res, {}, "OTP sent successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// VERIFY OTP
export const verifyOTP = async (req, res) => {
  try {
    const { phone, email, otp } = req.body;

    const user = await User.findOne({
      $or: [{ phone }, { email }],
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    user.isVerified = true;
    await user.save();

    const token = generateToken(user);

    return successResponse(res, { token }, "Login successful");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
