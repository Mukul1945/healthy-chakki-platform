import { createSlice } from "@reduxjs/toolkit";

// Always start with empty array so server and client first paint match (avoids hydration error).
// Cart is restored from localStorage in AuthCartRestorer after mount.
const initialState = { items: [] };

// Helper to save cart to the correct local storage key
const saveCartToStorage = (items) => {
  if (typeof window !== "undefined") {
    const userStr = localStorage.getItem("user");
    let storageKey = "cartItems";
    if (userStr) {
      try {
        const userObj = JSON.parse(userStr);
        if (userObj?._id) {
          storageKey = `cartItems_${userObj._id}`;
        }
      } catch (e) { }
    }
    localStorage.setItem(storageKey, JSON.stringify(items));
  }
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    rehydrateCart(state, action) {
      state.items = action.payload || [];
    },
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find(i => i.productId === item.productId);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push(item);
      }

      saveCartToStorage(state.items);
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        item => item.productId !== action.payload
      );
      saveCartToStorage(state.items);
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find(i => i.productId === productId);
      if (item) item.quantity = quantity;

      saveCartToStorage(state.items);
    },

    clearCart(state) {
      state.items = [];
      if (typeof window !== "undefined") {
        const userStr = localStorage.getItem("user");
        let storageKey = "cartItems";
        if (userStr) {
          try {
            const userObj = JSON.parse(userStr);
            if (userObj?._id) {
              storageKey = `cartItems_${userObj._id}`;
            }
          } catch (e) { }
        }
        localStorage.removeItem(storageKey);
      }
    },
  },
});

export const {
  rehydrateCart,
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
