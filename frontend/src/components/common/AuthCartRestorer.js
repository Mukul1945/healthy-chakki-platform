"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";
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
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        dispatch(loginSuccess({ token, user }));
      } catch {}
    }
    const cartStr = localStorage.getItem("cartItems");
    if (cartStr) {
      try {
        const items = JSON.parse(cartStr);
        if (Array.isArray(items)) dispatch(rehydrateCart(items));
      } catch {}
    }
  }, [dispatch]);

  return null;
}
