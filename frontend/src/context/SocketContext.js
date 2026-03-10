"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user, token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (token && user) {
            // Strip /api from the URL to hit the base server for WebSocket
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
            const socketUrl = apiUrl.replace("/api", "");

            const newSocket = io(socketUrl, {
                auth: { token },
            });

            newSocket.on("connect", () => {
                console.log("Connected to notification server");
                newSocket.emit("join", user._id);
            });

            newSocket.on("notification", (data) => {
                console.log("New notification received:", data);

                // Show Real-time Toast
                toast.custom((t) => (
                    <div
                        className={`${t.visible ? "animate-enter" : "animate-leave"
                            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                    >
                        <div className="flex-1 w-0 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <span className="text-2xl">🔔</span>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        {data.title}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {data.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex border-l border-gray-200">
                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-amber-600 hover:text-amber-500 focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                ));
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        }
    }, [token, user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
