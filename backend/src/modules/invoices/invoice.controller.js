import Invoice from "./invoice.model.js";
import Order from "../orders/order.model.js";
import User from "../users/user.model.js";
import { streamInvoicePDF } from "./invoice.service.js";

const GST_PERCENT = 5;

// =============================================================================
// USER: Download invoice — generates PDF on-the-fly and streams to browser
// =============================================================================
export const downloadInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Only allow the owner to download their invoice
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    let invoice = await Invoice.findOne({ orderId });

    // If no invoice record yet, create one now
    if (!invoice) {
      const gstAmount = parseFloat(((order.totalAmount * GST_PERCENT) / 100).toFixed(2));
      const invoiceNumber = `INV-${Date.now()}`;
      invoice = await Invoice.create({
        orderId: order._id,
        invoiceNumber,
        gstPercent: GST_PERCENT,
        gstAmount,
        totalAmount: order.totalAmount,
      });
    }

    const user = await User.findById(order.user);

    // Stream the PDF directly to browser
    streamInvoicePDF(
      {
        invoiceNumber: invoice.invoiceNumber,
        orderId: order._id,
        gstPercent: invoice.gstPercent,
        gstAmount: invoice.gstAmount,
        totalAmount: invoice.totalAmount,
        customerName: user?.name,
        items: order.items,
      },
      res
    );
  } catch (error) {
    console.error("Invoice download error:", error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
};

// =============================================================================
// USER: Check if invoice exists for an order (used to show/hide download button)
// =============================================================================
export const getInvoiceByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const invoice = await Invoice.findOne({ orderId });

    // Always return success — if no invoice yet, let frontend know
    res.json({
      success: true,
      data: invoice ? { _id: invoice._id, invoiceNumber: invoice.invoiceNumber, orderId } : null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =============================================================================
// ADMIN: Manually trigger invoice record creation (optional)
// =============================================================================
export const createInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    const existing = await Invoice.findOne({ orderId });
    if (existing) return res.json({ success: true, data: existing });

    const gstAmount = parseFloat(((order.totalAmount * GST_PERCENT) / 100).toFixed(2));
    const invoice = await Invoice.create({
      orderId: order._id,
      invoiceNumber: `INV-${Date.now()}`,
      gstPercent: GST_PERCENT,
      gstAmount,
      totalAmount: order.totalAmount,
    });

    res.json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
