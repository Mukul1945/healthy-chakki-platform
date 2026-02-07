import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, lowercase: true, unique: true, sparse: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, select: false },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

export default mongoose.model("User", userSchema);
