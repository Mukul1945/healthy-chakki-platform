import api from "./api";

/**
 * Create Razorpay Order
 * @param {{ orderId: string }} payload
 * @returns {Promise<Object>}
 */
export async function createRazorpayOrder(payload) {
    const res = await api.post("/payments/create-order", payload);
    return res.data;
}

/**
 * Verify Razorpay Payment
 * @param {{ razorpay_order_id: string, razorpay_payment_id: string, razorpay_signature: string }} payload
 * @returns {Promise<Object>}
 */
export async function verifyRazorpayPayment(payload) {
    const res = await api.post("/payments/verify", payload);
    return res.data;
}
