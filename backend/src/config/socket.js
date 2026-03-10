import { Server } from "socket.io";

let io;
const userSockets = new Map(); // Store userId -> socketId mapping

export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        // User identifies themselves upon joining
        socket.on("join", (userId) => {
            if (userId) {
                userSockets.set(userId, socket.id);
                console.log(`User ${userId} associated with socket ${socket.id}`);
            }
        });

        socket.on("disconnect", () => {
            // Remove socket mapping on disconnect
            for (const [userId, socketId] of userSockets.entries()) {
                if (socketId === socket.id) {
                    userSockets.delete(userId);
                    console.log(`User ${userId} disconnected (socket ${socket.id})`);
                    break;
                }
            }
        });
    });

    return io;
};

export const sendNotification = (userId, type, data) => {
    if (!io) return;

    const socketId = userSockets.get(userId.toString());
    if (socketId) {
        io.to(socketId).emit("notification", { type, ...data });
        console.log(`Sent real-time notification to user ${userId}`);
        return true;
    }
    return false; // User not online
};

export const getIO = () => io;
