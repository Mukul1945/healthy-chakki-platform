import api from "./api";

/**
 * Place order (requires auth). Saves to DB.
 * @param {{ items: Array, deliveryAddress: Object, paymentMethod: string }} payload
 * @returns {Promise<{ order }>}
 */
export async function placeOrder(payload) {
  const res = await api.post("/orders", payload);
  return res.data?.data ?? res.data;
}

/**
 * Get current user's orders (requires auth). Sorted by newest first.
 * @returns {Promise<Array>}
 */
export async function getMyOrders() {
  const res = await api.get("/orders/my");
  return res.data?.data ?? [];
}

/**
 * Get all orders (admin only).
 * @returns {Promise<Array>}
 */
export async function getAllOrders() {
  const res = await api.get("/orders");
  return res.data?.data ?? [];
}

/**
 * Update order status (admin only). status: PLACED | PACKED | OUT_FOR_DELIVERY | DELIVERED
 */
export async function updateOrderStatus(orderId, status) {
  const res = await api.put(`/orders/${orderId}/status`, { status });
  return res.data?.data;
}
