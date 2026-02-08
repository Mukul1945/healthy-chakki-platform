"use client";

import { useRouter } from "next/navigation";

export default function CartSummary({ items }) {
  const router = useRouter();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm sticky top-24">
      <h3 className="font-semibold text-stone-900 text-lg mb-4">Order Summary</h3>

      <div className="flex justify-between text-stone-600 mb-2">
        <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
        <span>₹{total}</span>
      </div>

      <div className="border-t border-stone-200 pt-4 mt-4">
        <div className="flex justify-between font-semibold text-stone-900 text-lg">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => router.push("/checkout")}
        className="w-full btn-primary mt-6"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
