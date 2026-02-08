"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery (COD)", description: "Pay when you receive your order" },
  { id: "online", label: "Pay Online", description: "Razorpay (card, UPI, netbanking)" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    landmark: "",
    paymentMethod: "cod",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Redirect if cart is empty (and we haven't just placed an order)
  useEffect(() => {
    if (items.length === 0 && !orderPlaced) {
      router.replace("/cart");
    }
  }, [items.length, orderPlaced, router]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      return;
    }
    setIsSubmitting(true);

    // TODO: Call order API (Razorpay flow for online, or create order for COD)
    await new Promise((r) => setTimeout(r, 800));

    setIsSubmitting(false);
    setOrderPlaced(true);
    dispatch(clearCart());
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <section className="section">
        <div className="container-wide text-center py-16">
          <p className="text-stone-600">Loading...</p>
          <Link href="/cart" className="btn-primary mt-4 inline-block">
            Back to Cart
          </Link>
        </div>
      </section>
    );
  }

  if (orderPlaced) {
    return (
      <section className="section">
        <div className="container-wide max-w-lg mx-auto text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-3xl mb-6">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-stone-900">Order Placed!</h1>
          <p className="mt-2 text-stone-600">
            Thank you for your order. We&apos;ll deliver within 2–3 hours. We may call you on the number you provided.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-primary">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white border-b border-stone-200">
        <div className="container-wide section">
          <h1 className="page-title">Checkout</h1>
          <p className="page-subtitle">
            Enter your delivery details and choose payment method.
          </p>
        </div>
      </section>

      <section className="section">
        <form onSubmit={handleSubmit} className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Delivery details + Payment */}
            <div className="lg:col-span-2 space-y-8">
              <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  Delivery Details
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1">
                      Phone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-stone-700 mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      required
                      rows={3}
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House no., sector, landmark, Greater Noida"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="landmark" className="block text-sm font-medium text-stone-700 mb-1">
                      Landmark (optional)
                    </label>
                    <input
                      id="landmark"
                      name="landmark"
                      type="text"
                      value={form.landmark}
                      onChange={handleChange}
                      placeholder="e.g. Near sector 62 market"
                      className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
                <h2 className="text-lg font-semibold text-stone-900 mb-4">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                        form.paymentMethod === method.id
                          ? "border-amber-500 bg-amber-50"
                          : "border-stone-200 hover:border-stone-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={form.paymentMethod === method.id}
                        onChange={handleChange}
                        className="mt-1 text-amber-600 focus:ring-amber-500"
                      />
                      <div>
                        <span className="font-medium text-stone-900">{method.label}</span>
                        <p className="text-sm text-stone-500 mt-0.5">{method.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm sticky top-24">
                <h3 className="font-semibold text-stone-900 text-lg mb-4">
                  Order Summary
                </h3>
                <ul className="space-y-2 border-b border-stone-200 pb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <li
                      key={item.productId}
                      className="flex justify-between text-sm text-stone-600"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{item.price * item.quantity}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between font-semibold text-stone-900 text-lg pt-4">
                  <span>Total ({itemCount} items)</span>
                  <span>₹{total}</span>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Placing Order..." : "Place Order"}
                </button>
                <Link
                  href="/cart"
                  className="block text-center text-sm text-amber-700 hover:underline mt-3"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
