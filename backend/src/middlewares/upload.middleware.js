import multer from "multer";

// Use memory storage so we can upload to Cloudinary in the controller
// and fall back to placeholder if Cloudinary fails
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
