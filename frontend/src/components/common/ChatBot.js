"use client";

import { useState, useRef, useEffect } from "react";
import api from "@/services/api";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Hi! I'm your Healthy Chakki assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = input;
        setInput("");
        setMessages(prev => [...prev, { role: "user", content: userMessage }]);
        setLoading(true);

        try {
            const { data } = await api.post("/ai/chat", {
                message: userMessage,
                history: messages.slice(-5)
            });
            setMessages(prev => [...prev, { role: "assistant", content: data.data.reply }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Oops, I disconnected for a second. Can you try again?"
            }]);
        } finally {
            setLoading(false);
        }
    };

    const suggestedQuestions = [
        "Best flour for weight loss?",
        "High protein flour?",
        "Delivery time?",
        "Is your flour fresh?"
    ];

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[9999]">
            {/* Chat Bubble Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${isOpen ? "bg-stone-800 rotate-90" : "bg-amber-600"
                    }`}
            >
                {isOpen ? (
                    <span className="text-white text-xl md:text-2xl">✕</span>
                ) : (
                    <span className="text-white text-xl md:text-2xl">💬</span>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-[85vw] sm:w-80 md:w-96 max-h-[70vh] md:max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300">
                    {/* Header */}
                    <div className="bg-amber-600 p-4 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">🤖</div>
                            <div>
                                <h3 className="font-bold text-sm">Healthy Chakki Bot</h3>
                                <p className="text-[10px] opacity-80 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Online & ready to help
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 bg-stone-50">
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${m.role === "user"
                                        ? "bg-amber-600 text-white rounded-tr-none"
                                        : "bg-white text-stone-800 border border-stone-200 shadow-sm rounded-tl-none"
                                        }`}
                                >
                                    {m.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-stone-200 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Questions */}
                    {messages.length === 1 && (
                        <div className="px-4 pb-4 bg-stone-50 flex flex-wrap gap-2">
                            {suggestedQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setInput(q);
                                        // Trigger handle submit manually or via effect? Easier to just set text and let user click.
                                        // Or call it here:
                                    }}
                                    className="text-[11px] bg-white border border-stone-200 text-stone-600 px-3 py-1.5 rounded-full hover:border-amber-500 hover:text-amber-700 transition-colors shadow-sm"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-3 bg-white border-t border-stone-200 flex gap-2"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 px-4 py-2 bg-stone-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 border-transparent focus:border-amber-500 transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="w-10 h-10 bg-amber-600 text-white rounded-xl flex items-center justify-center hover:bg-amber-700 transition-colors disabled:opacity-50"
                        >
                            ➤
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
