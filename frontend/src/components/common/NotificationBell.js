"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import api from "../../services/api";
import { useSocket } from "../../context/SocketContext";

export default function NotificationBell() {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const fetchNotifications = async () => {
        try {
            const { data } = await api.get("/notifications");
            // Only show unread notifications in the bell dropdown
            const unreadOnly = data.data.filter((n) => !n.isRead);
            setNotifications(unreadOnly);
            setUnreadCount(unreadOnly.length);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const socket = useSocket();

    useEffect(() => {
        fetchNotifications();

        if (socket) {
            const handleNewNotification = (data) => {
                // Prepend new notifications and increment count
                setNotifications((prev) => [data, ...prev]);
                setUnreadCount((prev) => prev + 1);
            };

            socket.on("notification", handleNewNotification);

            return () => {
                socket.off("notification", handleNewNotification);
            };
        }
    }, [socket]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAllAsRead = async () => {
        // Optimistic update: clear UI immediately to feel responsive
        const previousNotifications = [...notifications];
        const previousCount = unreadCount;

        setNotifications([]);
        setUnreadCount(0);

        try {
            await api.put("/notifications/read-all");
        } catch (error) {
            console.error("Error marking all as read:", error);
            // Rollback if it failed (optional, but good for data integrity)
            // setNotifications(previousNotifications);
            // setUnreadCount(previousCount);
            alert("Could not update notifications on the server. Please check your internet connection.");
        }
    };

    const markAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);
            // Remove from local state to "clear" it from the list
            setNotifications((prev) => prev.filter((n) => (n._id || n.id) !== id));
            setUnreadCount((prev) => Math.max(0, prev - 1));
        } catch (error) {
            console.error("Error marking as read:", error);
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative p-2.5 flex items-center justify-center rounded-full hover:bg-stone-100 transition-all duration-200 group"
                aria-label="Notifications"
            >
                <span className="text-xl group-hover:scale-110 transition-transform">🔔</span>
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-600 border-2 border-white text-white text-[9px] font-bold">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="fixed inset-x-4 top-20 md:absolute md:inset-auto md:right-0 md:top-full md:mt-2 w-auto md:w-80 bg-white rounded-xl shadow-2xl border border-stone-200 z-50 overflow-hidden">
                    <div className="p-4 border-b border-stone-100 flex justify-between items-center">
                        <h3 className="font-bold text-stone-800">Notifications</h3>
                        {unreadCount > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-stone-500 text-sm">
                                No notifications yet
                            </div>
                        ) : (
                            notifications.map((notification) => (
                                <div
                                    key={notification._id || notification.id}
                                    onClick={() => markAsRead(notification._id || notification.id)}
                                    className="p-4 border-b border-stone-50 last:border-0 hover:bg-amber-50/50 transition-colors cursor-pointer group/item relative"
                                    title="Click to clear"
                                >
                                    <div className="absolute top-4 right-4 opacity-0 group-hover/item:opacity-100 transition-opacity">
                                        <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-500 italic">Clear</span>
                                    </div>
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-semibold text-sm text-stone-800">{notification.title}</span>
                                        <span className="text-[10px] text-stone-400">
                                            {new Date(notification.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-stone-600 line-clamp-2">{notification.message}</p>
                                </div>
                            ))
                        )}
                    </div>
                    {notifications.length > 0 && (
                        <div className="p-3 bg-stone-50 text-center border-t border-stone-100">
                            <Link href="/notifications" className="text-xs font-bold text-stone-600 hover:text-amber-700">
                                View all notifications
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
