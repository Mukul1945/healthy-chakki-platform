import mongoose from "mongoose";

/**
 * Respond with 503 if MongoDB is not connected.
 * Use on routes that need the database (auth, products, orders).
 */
export const requireDb = (req, res, next) => {
  if (mongoose.connection.readyState === 1) {
    return next();
  }
  return res.status(503).json({
    success: false,
    message:
      "Database unavailable. Check MongoDB connection and IP whitelist in Atlas.",
  });
};
