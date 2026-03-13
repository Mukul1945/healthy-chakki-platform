import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

// Helper to save wishlist to the correct local storage key
const saveWishlistToStorage = (items) => {
    if (typeof window !== "undefined") {
        const userStr = localStorage.getItem("user");
        let storageKey = "wishlistItems";
        if (userStr) {
            try {
                const userObj = JSON.parse(userStr);
                if (userObj?._id) {
                    storageKey = `wishlistItems_${userObj._id}`;
                }
            } catch (e) { }
        }
        localStorage.setItem(storageKey, JSON.stringify(items));
    }
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        rehydrateWishlist(state, action) {
            state.items = action.payload || [];
        },
        toggleWishlistItem(state, action) {
            const productId = action.payload;
            const index = state.items.indexOf(productId);

            if (index === -1) {
                state.items.push(productId);
            } else {
                state.items.splice(index, 1);
            }

            saveWishlistToStorage(state.items);
        },
        clearWishlist(state) {
            state.items = [];
            if (typeof window !== "undefined") {
                const userStr = localStorage.getItem("user");
                let storageKey = "wishlistItems";
                if (userStr) {
                    try {
                        const userObj = JSON.parse(userStr);
                        if (userObj?._id) {
                            storageKey = `wishlistItems_${userObj._id}`;
                        }
                    } catch (e) { }
                }
                localStorage.removeItem(storageKey);
            }
        },
    },
});

export const {
    rehydrateWishlist,
    toggleWishlistItem,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
