import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "";
  const isPlaceholder =
    !uri ||
    uri === "your_mongodb_atlas_url" ||
    (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"));

  if (isPlaceholder) {
    console.warn(
      "MongoDB: No valid MONGO_URI in .env (use mongodb://... or mongodb+srv://...). Server running without DB."
    );
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    console.warn("Server continuing without database (development mode).");
  }
};

export default connectDB;
