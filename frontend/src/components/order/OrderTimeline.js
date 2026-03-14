"use client";

import React from "react";
import { Check, Clock, Truck, Package, Activity, Droplets } from "lucide-react";

const STATUS_STEPS = [
    { id: "PLACED", label: "Order Placed", icon: Check },
    { id: "GRAINS_CLEANED", label: "Grains Cleaned", icon: Droplets },
    { id: "GRINDING", label: "Grinding", icon: Activity },
    { id: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Truck },
    { id: "DELIVERED", label: "Delivered", icon: Package },
];

const OrderTimeline = ({ currentStatus }) => {
    const currentIndex = STATUS_STEPS.findIndex((step) => step.id === currentStatus);

    return (
        <div className="w-full py-6 px-2">
            <div className="relative flex items-center justify-between">
                {/* Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -translate-y-1/2 z-0"></div>
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-amber-500 -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out"
                    style={{ width: `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                ></div>

                {/* Steps */}
                {STATUS_STEPS.map((step, index) => {
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    const StepIcon = step.icon;

                    return (
                        <div key={step.id} className="relative z-10 flex flex-col items-center">
                            {/* Icon Circle */}
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 scale-100 ${isCompleted
                                        ? "bg-amber-500 border-amber-500 text-white shadow-lg shadow-amber-200"
                                        : "bg-white border-stone-300 text-stone-400"
                                    } ${isCurrent ? "scale-125 ring-4 ring-amber-100" : ""}`}
                            >
                                {isCompleted && index < currentIndex ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <StepIcon className={`w-5 h-5 ${isCurrent ? "animate-pulse" : ""}`} />
                                )}
                            </div>

                            {/* Label */}
                            <div className="absolute -bottom-8 w-max text-center">
                                <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isCompleted ? "text-amber-700" : "text-stone-400"
                                    }`}>
                                    {step.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default OrderTimeline;
