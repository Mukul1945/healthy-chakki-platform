import User from "./user.model.js";
import Product from "../products/product.model.js";

// Toggle product in wishlist
export const toggleWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const index = user.wishlist.indexOf(productId);
        if (index === -1) {
            // Add to wishlist
            user.wishlist.push(productId);
            await user.save();
            return res.json({
                success: true,
                message: "Added to wishlist",
                wishlist: user.wishlist,
            });
        } else {
            // Remove from wishlist
            user.wishlist.splice(index, 1);
            await user.save();
            return res.json({
                success: true,
                message: "Removed from wishlist",
                wishlist: user.wishlist,
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get user's populated wishlist
export const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("wishlist");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({
            success: true,
            data: user.wishlist,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
