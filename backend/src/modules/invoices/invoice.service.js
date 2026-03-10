import PDFDocument from "pdfkit";

/**
 * Streams a PDF invoice directly into an HTTP response.
 * No file storage needed — generates on-the-fly every time.
 */
export const streamInvoicePDF = (invoiceData, res) => {
  const doc = new PDFDocument({ margin: 50 });

  // Set response headers so browser opens/downloads as PDF
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${invoiceData.invoiceNumber}.pdf"`
  );

  // Pipe directly to response
  doc.pipe(res);

  // ---- Header ----
  doc.fontSize(22).font("Helvetica-Bold").text("HEALTHY CHAKKI", { align: "center" });
  doc.fontSize(10).font("Helvetica").fillColor("#555")
    .text("Fresh Wheat, Bajra & Jowar Atta | Greater Noida", { align: "center" });
  doc.moveDown(0.5);
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#d6a84e").lineWidth(2).stroke();
  doc.moveDown(0.5);

  // ---- Title ----
  doc.fillColor("#000").fontSize(16).font("Helvetica-Bold")
    .text("TAX INVOICE", { align: "center" });
  doc.moveDown();

  // ---- Invoice Details ----
  doc.fontSize(11).font("Helvetica");
  doc.text(`Invoice No:   ${invoiceData.invoiceNumber}`);
  doc.text(`Order ID:     #${invoiceData.orderId.toString().slice(-8).toUpperCase()}`);
  doc.text(`Date:         ${new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`);
  if (invoiceData.customerName) {
    doc.text(`Customer:     ${invoiceData.customerName}`);
  }
  doc.moveDown();

  // ---- Items ----
  if (invoiceData.items && invoiceData.items.length > 0) {
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#eee").lineWidth(1).stroke();
    doc.moveDown(0.5);
    doc.font("Helvetica-Bold").fontSize(11);
    doc.text("Item", 50, doc.y, { continued: true, width: 250 });
    doc.text("Qty", 300, doc.y - doc.currentLineHeight(), { continued: true, width: 80, align: "center" });
    doc.text("Price", 380, doc.y - doc.currentLineHeight(), { continued: true, width: 80, align: "right" });
    doc.text("Total", 460, doc.y - doc.currentLineHeight(), { width: 85, align: "right" });
    doc.moveDown(0.5);
    doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#ddd").lineWidth(1).stroke();
    doc.moveDown(0.5);

    doc.font("Helvetica").fontSize(10);
    for (const item of invoiceData.items) {
      const lineTotal = item.price * item.quantity;
      const y = doc.y;
      doc.text(`${item.name} (${item.variant || ""})`, 50, y, { width: 250 });
      doc.text(String(item.quantity), 300, y, { width: 80, align: "center" });
      doc.text(`Rs.${item.price}`, 380, y, { width: 80, align: "right" });
      doc.text(`Rs.${lineTotal}`, 460, y, { width: 85, align: "right" });
      doc.moveDown(0.3);
    }
    doc.moveDown(0.5);
  }

  // ---- Amounts ----
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#ddd").lineWidth(1).stroke();
  doc.moveDown();

  const subtotal = invoiceData.totalAmount - invoiceData.gstAmount;
  doc.font("Helvetica").fontSize(11);
  doc.text(`Subtotal:`, { continued: true }).text(`Rs. ${subtotal.toFixed(2)}`, { align: "right" });
  doc.text(`GST (${invoiceData.gstPercent}%):`, { continued: true }).text(`Rs. ${invoiceData.gstAmount.toFixed(2)}`, { align: "right" });
  doc.font("Helvetica-Bold").fontSize(13);
  doc.text(`Total Payable:`, { continued: true }).text(`Rs. ${invoiceData.totalAmount.toFixed(2)}`, { align: "right" });
  doc.moveDown();

  // ---- Footer ----
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor("#ddd").lineWidth(1).stroke();
  doc.moveDown(0.5);
  doc.fontSize(9).font("Helvetica").fillColor("#888")
    .text("Thank you for shopping with Healthy Chakki. This is a computer-generated invoice.", { align: "center" });

  doc.end();
};
