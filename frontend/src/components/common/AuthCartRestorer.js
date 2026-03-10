"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, setHydrated } from "@/redux/authSlice";
import { rehydrateCart } from "@/redux/cartSlice";

/**
 * Restores auth and cart from localStorage after mount.
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

    const storageKey = userObj ? `cartItems_${userObj._id}` : "cartItems";
    const cartStr = localStorage.getItem(storageKey);

    if (cartStr) {
      try {
        const items = JSON.parse(cartStr);
        if (Array.isArray(items)) dispatch(rehydrateCart(items));
      } catch { }
    }
  }, [dispatch]);

  return null;
}

