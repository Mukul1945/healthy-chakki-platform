import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
      unique: true,
    },

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
    },

    gstPercent: Number,
    gstAmount: Number,
    totalAmount: Number,

    pdfPath: String,
  },
  { timestamps: true }
);

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
