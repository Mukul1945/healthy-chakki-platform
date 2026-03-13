import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, setHydrated } from "@/redux/authSlice";
import { rehydrateCart } from "@/redux/cartSlice";
import { rehydrateWishlist } from "@/redux/wishlistSlice";

/**
 * Restores auth, cart, and wishlist from localStorage after mount.
 * Runs only on client so server and first client render match (no hydration error).
 */
export default function AuthCartRestorer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    let userObj = null;

    if (token && userStr) {
      try {
        userObj = JSON.parse(userStr);
        dispatch(loginSuccess({ token, user: userObj }));
      } catch { }
    }

    // Always mark hydration as done, even if no token was found
    dispatch(setHydrated());

    // Restore Cart
    const cartKey = userObj ? `cartItems_${userObj._id}` : "cartItems";
    const cartStr = localStorage.getItem(cartKey);

    if (cartStr) {
      try {
        const items = JSON.parse(cartStr);
        if (Array.isArray(items)) dispatch(rehydrateCart(items));
      } catch { }
    }

    // Restore Wishlist
    const wishlistKey = userObj ? `wishlistItems_${userObj._id}` : "wishlistItems";
    const wishlistStr = localStorage.getItem(wishlistKey);

    if (wishlistStr) {
      try {
        const items = JSON.parse(wishlistStr);
        if (Array.isArray(items)) dispatch(rehydrateWishlist(items));
      } catch { }
    }
  }, [dispatch]);

  return null;
}

