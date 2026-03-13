"use client";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] w-full">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-amber-100 border-t-amber-600 rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">
                    🌾
                </div>
            </div>
            <p className="mt-4 text-stone-500 font-medium animate-pulse">
                Preparing your favorites...
            </p>
        </div>
    );
}
