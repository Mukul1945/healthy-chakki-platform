"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { getAllOrders, updateOrderStatus } from "@/services/order.service";

const STATUS_OPTIONS = [
  "PLACED",
  "PACKED",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
];

const STATUS_LABELS = {
  PLACED: "Placed",
  PACKED: "Packed",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
};

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AdminOrdersContent() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = () => {
    setLoading(true);
    setError("");
    getAllOrders()
      .then((data) => setOrders(Array.isArray(data) ? data : []))
      .catch((err) => {
        setError(err.response?.data?.message || err.message || "Failed to load orders");
        setOrders([]);
      })
      .finally(() => setLoading(false));
  };

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.role === "ADMIN") loadOrders();
  }, [user?.role]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Update failed");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="container-wide py-8">
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Orders</h1>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
          {error}
        </div>
      )}

      {loading && (
        <div className="py-12 text-center text-stone-500">Loading orders...</div>
      )}

      {!loading && orders.length === 0 && (
        <div className="py-12 text-center text-stone-600 rounded-xl bg-white border border-stone-200">
          No orders yet.
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="p-5 rounded-xl bg-white border border-stone-200 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm text-stone-500">
                    Order #{order._id?.slice(-6).toUpperCase()} · {formatDate(order.createdAt)}
                  </p>
                  <p className="font-medium text-stone-900 mt-0.5">
                    {order.user?.name || order.user?.email || order.user?.phone || "—"}
                  </p>
                  <p className="text-sm text-stone-600">
                    {order.deliveryAddress?.phone && `📞 ${order.deliveryAddress.phone}`}
                    {order.deliveryAddress?.address && ` · ${order.deliveryAddress.address}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-stone-700">Status:</span>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    disabled={!!updatingId}
                    className="px-2 py-1.5 border border-stone-300 rounded text-sm bg-white disabled:opacity-70"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {STATUS_LABELS[s]}
                      </option>
                    ))}
                  </select>
                  {updatingId === order._id && (
                    <span className="text-xs text-stone-500">Updating...</span>
                  )}
                </div>
              </div>
              <ul className="text-sm text-stone-600 space-y-0.5">
                {order.items?.map((item, i) => (
                  <li key={i}>
                    {item.name} {item.variant} × {item.quantity} — ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold text-stone-900 mt-2">
                Total: ₹{order.totalAmount} · {order.paymentMethod === "ONLINE" ? "Online" : "COD"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user && user.role !== "ADMIN") router.replace("/admin");
  }, [user, router]);

  if (user && user.role !== "ADMIN") return null;

  return <AdminOrdersContent />;
}
