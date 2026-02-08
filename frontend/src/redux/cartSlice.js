import { createSlice } from "@reduxjs/toolkit";

// Always start with empty array so server and client first paint match (avoids hydration error).
// Cart is restored from localStorage in AuthCartRestorer after mount.
const initialState = { items: [] };

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

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        item => item.productId !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    updateQuantity(state, action) {
      const { productId, quantity } = action.payload;
      const item = state.items.find(i => i.productId === productId);
      if (item) item.quantity = quantity;

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cartItems");
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
