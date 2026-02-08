import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export const generateInvoicePDF = (invoiceData) => {
  const invoicesDir = path.join("invoices");

  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir);
  }

  const filePath = path.join(
    invoicesDir,
    `${invoiceData.invoiceNumber}.pdf`
  );

  const doc = new PDFDocument({ margin: 50 });
  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(18).text("GST INVOICE", { align: "center" });
  doc.moveDown();

  doc.fontSize(12).text(`Invoice No: ${invoiceData.invoiceNumber}`);
  doc.text(`Order ID: ${invoiceData.orderId}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  doc.text(`Total Amount: ₹${invoiceData.totalAmount}`);
  doc.text(`GST (${invoiceData.gstPercent}%): ₹${invoiceData.gstAmount}`);
  doc.moveDown();

  doc.text("Thank you for shopping with Healthy Chakki");
  doc.end();

  return filePath;
};
