import mongoose from "mongoose";
import User from "../modules/users/user.model.js";

const ADMIN_EMAIL = "mukulchauhan1256@gmail.com";
const ADMIN_PASSWORD = "mukul1256";

export async function ensureAdminUser() {
  if (mongoose.connection.readyState !== 1) return;
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    if (existing.role !== "ADMIN") {
      existing.role = "ADMIN";
      await existing.save();
    }
    return;
  }
  await User.create({
    name: "Admin",
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: "ADMIN",
    isVerified: true,
  });
  console.log("Admin user created:", ADMIN_EMAIL);
}
