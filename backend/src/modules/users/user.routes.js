import express from "express";
import { protect } from "../../middlewares/auth.middleware.js";
import { getWishlist, toggleWishlist } from "./user.controller.js";

const router = express.Router();

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected route working",
    user: req.user,
  });
});

// Wishlist routes
router.get("/wishlist", protect, getWishlist);
router.post("/wishlist/:productId", protect, toggleWishlist);

export default router;
