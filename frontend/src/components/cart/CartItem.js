"use client";

import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const subtotal = item.price * item.quantity;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-stone-200 shadow-sm">
      <div>
        <h3 className="font-semibold text-stone-900">{item.name}</h3>
        <p className="text-sm text-stone-500">{item.variant}</p>
        <p className="text-amber-700 font-medium mt-1">₹{item.price} each</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 border border-stone-300 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() =>
              dispatch(
                updateQuantity({
                  productId: item.productId,
                  quantity: Math.max(1, item.quantity - 1),
                })
              )
            }
            disabled={item.quantity <= 1}
            className="w-10 h-10 flex items-center justify-center bg-stone-100 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed text-stone-700 font-medium"
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-stone-900">{item.quantity}</span>
          <button
            type="button"
            onClick={() =>
              dispatch(
                updateQuantity({
                  productId: item.productId,
                  quantity: item.quantity + 1,
                })
              )
            }
            className="w-10 h-10 flex items-center justify-center bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
          >
            +
          </button>
        </div>
        <span className="font-semibold text-stone-900 w-16 text-right">₹{subtotal}</span>
        <button
          type="button"
          onClick={() => dispatch(removeFromCart(item.productId))}
          className="text-red-600 hover:text-red-700 text-sm font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
