import bcrypt from "bcryptjs";
import User from "../users/user.model.js";
import { OAuth2Client } from "google-auth-library";
import { generateOTP } from "../../utils/otp.js";
import { successResponse } from "../../utils/response.js";
import { generateToken } from "./auth.service.js";

function sanitizeUser(user) {
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  delete obj.otp;
  delete obj.otpExpires;
  return obj;
}

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
    const userData = sanitizeUser(user);
    return successResponse(res, { token, user: userData }, "Login successful");
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// LOGIN (email + password)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    const token = generateToken(user);
    const userData = sanitizeUser(user);
    return successResponse(res, { token, user: userData }, "Login successful");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// REGISTER (name, email, password)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }
    const user = await User.create({ name: name || email.split("@")[0], email, password });
    const token = generateToken(user);
    const userData = sanitizeUser(user);
    return res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: { token, user: userData },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// GOOGLE LOGIN
export const googleLogin = async (req, res) => {
  try {
    const { token: idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ success: false, message: "Google ID Token is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      // Create new user if not found
      user = await User.create({
        name,
        email,
        image: picture,
        isVerified: true,
        // We don't set a password for Google-only accounts
      });
    } else {
      // If user exists, update their name/image if they were missing
      if (!user.name) user.name = name;
      if (!user.image) user.image = picture;
      user.isVerified = true;
      await user.save();
    }

    const token = generateToken(user);
    const userData = sanitizeUser(user);

    return successResponse(res, { token, user: userData }, "Google login successful");
  } catch (error) {
    console.error("Google Login Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid Google token or verification failed",
    });
  }
};

// Request Password Reset OTP
export const forgotPasswordOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Return 200 even if user doesn't exist to prevent email enumeration
      return successResponse(res, {}, "If the email is registered, an OTP has been sent.");
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins
    await user.save();

    console.log(`Password Reset OTP for ${email} (DEV ONLY):`, otp);
    // In production, integrate email service here (e.g., Nodemailer, SendGrid)

    return successResponse(res, {}, "If the email is registered, an OTP has been sent.");
  } catch (error) {
    console.error("Forgot Password OTP Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: "Email, OTP, and new password are required" });
    }

    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Set new password (the model's pre-save hook will hash it)
    user.password = newPassword;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return successResponse(res, {}, "Password has been reset successfully. You can now login.");
  } catch (error) {
    console.error("Reset Password Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
