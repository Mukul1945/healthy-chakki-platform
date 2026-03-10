import Invoice from "./invoice.model.js";
import { sendEmail } from "../../services/email.service.js";
import User from "../users/user.model.js";

/**
 * Auto-generates an invoice record for an order.
 * Sends email with a link to the "My Orders" page where the invoice can be downloaded.
 * Called automatically after successful COD or online payment.
 */
export const autoGenerateInvoice = async (order) => {
  try {
    // Don't regenerate if one already exists
    const existing = await Invoice.findOne({ orderId: order._id });
    if (existing) return existing;

    const gstPercent = 5;
    const gstAmount = parseFloat(((order.totalAmount * gstPercent) / 100).toFixed(2));
    const invoiceNumber = `INV-${Date.now()}`;

    // Create the invoice record in database
    // We no longer upload to Cloudinary because we generate the PDF on-the-fly for downloads
    const invoice = await Invoice.create({
      orderId: order._id,
      invoiceNumber,
      gstPercent,
      gstAmount,
      totalAmount: order.totalAmount,
    });

    // Send email to user
    const user = await User.findById(order.user);
    if (user && user.email) {
      const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
      const ordersLink = `${frontendUrl}/orders`;

      await sendEmail({
        to: user.email,
        subject: `Order Confirmation & Invoice — ${invoiceNumber}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 32px; border-radius: 12px; background-color: #ffffff;">
            <div style="text-align: center; margin-bottom: 24px;">
                <h1 style="color: #b45309; margin: 0; font-size: 28px;">HEALTHY CHAKKI</h1>
                <p style="color: #6b7280; font-size: 14px;">Pure & Fresh Daily Ground Atta</p>
            </div>
            
            <h2 style="color: #1f2937; border-bottom: 2px solid #f3f4f6; padding-bottom: 12px;">Order Confirmation</h2>
            
            <p style="color: #4b5563; line-height: 1.6;">Hi ${user.name || "Customer"},</p>
            <p style="color: #4b5563; line-height: 1.6;">Thank you for your order! Your invoice has been generated and is ready for download.</p>
            
            <div style="background-color: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 20px; margin: 24px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="color: #92400e; font-weight: bold; padding: 4px 0;">Invoice Number:</td>
                        <td style="text-align: right; color: #1f2937;">${invoiceNumber}</td>
                    </tr>
                    <tr>
                        <td style="color: #92400e; font-weight: bold; padding: 4px 0;">Order Total:</td>
                        <td style="text-align: right; color: #1f2937; font-size: 18px; font-weight: bold;">₹${order.totalAmount}</td>
                    </tr>
                </table>
            </div>

            <div style="text-align: center; margin: 32px 0;">
                <a href="${ordersLink}" 
                   style="display: inline-block; padding: 14px 28px; background-color: #d97706; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    📄 View & Download Invoice
                </a>
            </div>

            <p style="color: #6b7280; font-size: 12px; text-align: center; margin-top: 40px; border-top: 1px solid #f3f4f6; padding-top: 20px;">
                You can always view your full order history in your account dashboard.<br>
                For any queries, please contact our support.
            </p>
          </div>
        `,
      });
      console.log(`[Invoice] Email notification sent to ${user.email}`);
    }

    console.log(`[Invoice] Record created for order ${order._id}`);
    return invoice;
  } catch (err) {
    // Non-blocking error logging
    console.error("[Invoice] Auto-generation failed:", err.message);
  }
};
