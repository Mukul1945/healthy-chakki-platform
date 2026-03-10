import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.mailtrap.io",
    port: process.env.SMTP_PORT || 2525,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: '"Healthy Chakki" <noreply@healthychakki.com>',
            to,
            subject,
            html,
        });

        console.log("Email sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export const getOrderEmailTemplate = (order, user) => {
    const itemsHtml = order.items
        .map(
            (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name} (${item.variant})</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity} x ₹${item.price}</td>
    </tr>
  `
        )
        .join("");

    return `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
      <h2 style="color: #8b4513; text-align: center;">Order Confirmation</h2>
      <p>Hi ${user.name},</p>
      <p>Thank you for your order! We've received it and are getting it ready for you.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #fdf2f2;">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr style="font-weight: bold;">
            <td style="padding: 10px;">Total</td>
            <td style="padding: 10px; text-align: right;">₹${order.totalAmount}</td>
          </tr>
        </tfoot>
      </table>

      <p><strong>Delivery Address:</strong><br/>
      ${order.deliveryAddress.address}, ${order.deliveryAddress.city} - ${order.deliveryAddress.pincode}</p>
      
      <p style="text-align: center; color: #666; font-size: 12px; margin-top: 30px;">
        Healthy Chakki Platform - Pure, Fresh & Traditional
      </p>
    </div>
  `;
};
