import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("cartItems")) || []
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
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
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
