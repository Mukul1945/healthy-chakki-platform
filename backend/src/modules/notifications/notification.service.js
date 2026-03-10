import Notification from "./notification.model.js";
import { sendNotification } from "../../config/socket.js";
import { sendEmail, getOrderEmailTemplate } from "../../services/email.service.js";
import User from "../users/user.model.js";

export const createNotification = async ({
    recipient,
    type,
    title,
    message,
    link,
    shouldEmail = false,
    orderData = null,
}) => {
    try {
        // 1. Save to Database
        const notification = await Notification.create({
            recipient,
            type,
            title,
            message,
            link,
        });

        // 2. Emit via Socket.io (Real-time)
        sendNotification(recipient, "notification", {
            id: notification._id,
            title,
            message,
            type,
            link,
            createdAt: notification.createdAt,
        });

        // 3. Send Email (Optional)
        if (shouldEmail) {
            const user = await User.findById(recipient);
            if (user && user.email) {
                let htmlBody = `<p>${message}</p>`;

                if (type === "ORDER" && orderData) {
                    htmlBody = getOrderEmailTemplate(orderData, user);
                }

                await sendEmail({
                    to: user.email,
                    subject: title,
                    html: htmlBody,
                });
                console.log(`Email sent to ${user.email}`);
            }
        }

        return notification;
    } catch (error) {
        console.error("Error creating notification:", error);
    }
};
