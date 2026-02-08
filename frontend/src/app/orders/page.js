"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getMyOrders } from "@/services/order.service";

const STATUS_LABELS = {
  PLACED: "Order Placed",
  PACKED: "Packed",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
};

const STATUS_STYLE = {
  PLACED: "bg-amber-100 text-amber-800",
  PACKED: "bg-blue-100 text-blue-800",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-800",
  DELIVERED: "bg-green-100 text-green-800",
};

function formatDate(dateStr) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MyOrdersPage() {
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      router.replace("/login?returnUrl=" + encodeURIComponent("/orders"));
      return;
    }
    setLoading(true);
    setError("");
    getMyOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Failed to load orders");
        setOrders([]);
      })
      .finally(() => setLoading(false));
  }, [token, router]);

  if (!token) return null;

  return (
    <>
      <section className="bg-white border-b border-stone-200">
        <div className="container-wide section">
          <h1 className="page-title">My Orders</h1>
          <p className="page-subtitle">
            View the status of your orders and delivery details.
          </p>
          <Link href="/products" className="text-amber-700 font-medium hover:underline mt-2 inline-block">
            ← Continue shopping
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container-wide max-w-3xl">
          {loading && (
            <div className="text-center py-12 text-stone-500">Loading your orders...</div>
          )}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 mb-6">
              {error}
            </div>
          )}
          {!loading && !error && orders.length === 0 && (
            <div className="text-center py-12 rounded-xl bg-stone-50 border border-stone-200">
              <p className="text-stone-600">You haven&apos;t placed any orders yet.</p>
              <Link href="/products" className="btn-primary mt-4 inline-block">
                Shop now
              </Link>
            </div>
          )}
          {!loading && orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <span className="text-sm text-stone-500">
                        Order #{order._id?.slice(-6).toUpperCase()}
                      </span>
                      <span className="mx-2 text-stone-300">·</span>
                      <span className="text-sm text-stone-600">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        STATUS_STYLE[order.orderStatus] || "bg-stone-100 text-stone-700"
                      }`}
                    >
                      {STATUS_LABELS[order.orderStatus] || order.orderStatus}
                    </span>
                  </div>
                  <ul className="space-y-1 mb-4">
                    {order.items?.map((item, i) => (
                      <li key={i} className="flex justify-between text-sm text-stone-700">
                        <span>
                          {item.name} {item.variant} × {item.quantity}
                        </span>
                        <span>₹{item.price * item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between font-semibold text-stone-900 border-t border-stone-200 pt-3">
                    <span>Total</span>
                    <span>₹{order.totalAmount}</span>
                  </div>
                  {order.deliveryAddress && (
                    <div className="mt-3 pt-3 border-t border-stone-100 text-sm text-stone-600">
                      <span className="font-medium text-stone-700">Delivery: </span>
                      {order.deliveryAddress.name}
                      {order.deliveryAddress.phone && ` · ${order.deliveryAddress.phone}`}
                      {order.deliveryAddress.address && ` · ${order.deliveryAddress.address}`}
                      {order.deliveryAddress.landmark && ` (${order.deliveryAddress.landmark})`}
                    </div>
                  )}
                  <p className="mt-2 text-xs text-stone-500">
                    Payment: {order.paymentMethod === "ONLINE" ? "Online" : "Cash on Delivery"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
