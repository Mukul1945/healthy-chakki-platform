import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "";
  const isPlaceholder =
    !uri ||
    uri === "your_mongodb_atlas_url" ||
    (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"));

  if (isPlaceholder) {
    console.warn(
      "MongoDB: No valid MONGO_URI. Server running without DB. Set MONGO_URI for full functionality."
    );
    return;
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    if (process.env.NODE_ENV === "production") process.exit(1);
    console.warn("Server continuing without database.");
  }
};

export default connectDB;
