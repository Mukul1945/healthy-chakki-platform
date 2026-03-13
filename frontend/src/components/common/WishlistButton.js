"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlistItem } from "@/redux/wishlistSlice";
import userService from "@/services/user.service";
import { toast } from "react-hot-toast";

export default function WishlistButton({ productId, className = "" }) {
    const dispatch = useDispatch();
    const { items } = useSelector((state) => state.wishlist);
    const { user } = useSelector((state) => state.auth);

    const isWishlisted = items.includes(productId);
    const [loading, setLoading] = useState(false);

    const handleToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Optimistically toggle in Redux/localStorage
        dispatch(toggleWishlistItem(productId));

        // If logged in, sync with backend
        if (user) {
            setLoading(true);
            try {
                const res = await userService.toggleWishlist(productId);
                if (res.success) {
                    toast.success(res.message);
                }
            } catch (error) {
                // Rollback on failure? For now just show error
                toast.error("Failed to sync wishlist");
                // Re-toggle to rollback local state
                dispatch(toggleWishlistItem(productId));
            } finally {
                setLoading(false);
            }
        } else {
            toast.success(isWishlisted ? "Removed from favorites" : "Saved to favorites");
        }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            className={`p-2 rounded-full bg-white/80 backdrop-blur-sm border border-stone-200 shadow-sm hover:bg-white transition-all group ${className}`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isWishlisted ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 transition-colors ${isWishlisted ? "text-red-500" : "text-stone-400 group-hover:text-red-400"
                    }`}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
            </svg>
        </button>
    );
}
