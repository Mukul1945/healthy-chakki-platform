"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container-wide text-center py-16">
          <h2 className="text-2xl font-bold text-stone-900">Your cart is empty</h2>
          <p className="mt-2 text-stone-600">Add some fresh atta from our products.</p>
          <Link href="/products" className="btn-primary mt-6 inline-block">
            View Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white border-b border-stone-200">
        <div className="container-wide section">
          <h1 className="page-title">Cart</h1>
          <p className="page-subtitle">Review your order before checkout.</p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.productId} item={item} />
              ))}
            </div>
            <div className="lg:col-span-1">
              <CartSummary items={items} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
