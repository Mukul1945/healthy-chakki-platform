"use client";

import { useState, useEffect } from "react";

const testimonials = [
    {
        id: 1,
        name: "Rahul Sharma",
        role: "Regular Customer",
        text: "The quality of the atta is unmatched. You can literally smell the freshness when you open the bag. Softest rotis my family has ever had!",
        rating: 5,
    },
    {
        id: 2,
        name: "Priya Singh",
        role: "Fitness Enthusiast",
        text: "I moved to their Gym Diet Mix a month ago. No bloating, great digestion, and I feel much lighter. The farm-to-home concept is amazing.",
        rating: 5,
    },
    {
        id: 3,
        name: "Amit Patel",
        role: "Health Conscious",
        text: "Finally a place where I can trust the purity. No mixing, no cheap additives. The stone grinding preserves the real taste of wheat.",
        rating: 4,
    },
];

export default function TestimonialCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Auto slide every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative max-w-4xl mx-auto overflow-hidden rounded-3xl bg-[var(--color-surface-alt)] p-8 md:p-12 shadow-sm border border-[var(--color-border)]">
            <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {testimonials.map((test) => (
                    <div key={test.id} className="min-w-full px-4 text-center">
                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-6 text-yellow-500 text-xl">
                            {[...Array(5)].map((_, i) => (
                                <span key={i}>{i < test.rating ? "★" : "☆"}</span>
                            ))}
                        </div>
                        {/* Text */}
                        <p className="text-lg md:text-xl lg:text-2xl text-[var(--color-earthy-brown)] font-medium leading-relaxed italic mb-8">
                            "{test.text}"
                        </p>
                        {/* Author */}
                        <div>
                            <div className="w-14 h-14 mx-auto bg-amber-100 rounded-full flex items-center justify-center text-amber-800 font-bold text-xl mb-3 shadow-inner">
                                {test.name.charAt(0)}
                            </div>
                            <h4 className="font-bold text-[var(--color-text)]">{test.name}</h4>
                            <p className="text-sm text-[var(--color-text-muted)]">{test.role}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentIndex === i ? "bg-[var(--color-primary)] w-8" : "bg-stone-300 hover:bg-stone-400"
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
