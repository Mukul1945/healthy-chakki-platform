import Invoice from "./invoice.model.js";
import Order from "../orders/order.model.js";
import { generateInvoicePDF } from "./invoice.service.js";
import path from "path";

export const createInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const existing = await Invoice.findOne({ orderId });
    if (existing) {
      return res.json({ success: true, data: existing });
    }

    const gstPercent = 5; // can be dynamic later
    const gstAmount = (order.totalAmount * gstPercent) / 100;

    const invoiceNumber = `INV-${Date.now()}`;

    const pdfPath = generateInvoicePDF({
      invoiceNumber,
      orderId,
      gstPercent,
      gstAmount,
      totalAmount: order.totalAmount,
    });

    const invoice = await Invoice.create({
      orderId,
      invoiceNumber,
      gstPercent,
      gstAmount,
      totalAmount: order.totalAmount,
      pdfPath,
    });

    res.json({
      success: true,
      message: "Invoice generated",
      data: invoice,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const downloadInvoice = async (req, res) => {
  try {
    const { invoiceNumber } = req.params;

    const filePath = path.join(
      process.cwd(),
      "invoices",
      `${invoiceNumber}.pdf`
    );

    return res.download(filePath);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to download invoice",
    });
  }
};
