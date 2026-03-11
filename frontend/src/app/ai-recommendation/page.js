"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import Link from "next/link";

export default function AIRecommendationPage() {
    const router = useRouter();
    const { token, hydrated } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        age: "",
        weight: "",
        goal: "Weight Loss",
        activityLevel: "Moderate",
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (hydrated && !token) {
            router.replace("/login?returnUrl=/ai-recommendation");
        }
    }, [hydrated, token, router]);

    if (!hydrated || !token) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);

        try {
            const { data } = await api.post("/ai/recommend-flour", formData);
            setResult(data.data);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="container-wide max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-stone-900 mb-4">AI Diet Recommendation 🤖</h1>
                    <p className="text-stone-600 max-w-2xl mx-auto">
                        Get a personalized flour blend based on your health goals and lifestyle,
                        calculated by our advanced AI nutrition expert.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
                        <h2 className="text-xl font-bold text-stone-800 mb-6 border-b border-stone-100 pb-4">
                            Your Health Profile
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-stone-700">Age</label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="e.g. 30"
                                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-semibold text-stone-700">Weight (kg)</label>
                                    <input
                                        type="number"
                                        required
                                        placeholder="e.g. 70"
                                        className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none"
                                        value={formData.weight}
                                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-stone-700">Health Goal</label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 outline-none"
                                    value={formData.goal}
                                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                                >
                                    <option>Weight Loss</option>
                                    <option>Muscle Gain</option>
                                    <option>Diabetes Management</option>
                                    <option>General Fitness</option>
                                    <option>Digestive Health</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-semibold text-stone-700">Activity Level</label>
                                <select
                                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-amber-500 outline-none"
                                    value={formData.activityLevel}
                                    onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                                >
                                    <option>Sedentary (Little/no exercise)</option>
                                    <option>Light (1-3 days/week)</option>
                                    <option>Moderate (3-5 days/week)</option>
                                    <option>Active (6-7 days/week)</option>
                                    <option>Extra Active (Athlete)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 text-lg disabled:opacity-70"
                            >
                                {loading ? (
                                    <>
                                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Analyzing...
                                    </>
                                ) : (
                                    "Generate Recommendation ✨"
                                )}
                            </button>
                        </form>
                        {error && <p className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
                    </div>

                    {/* Results Section */}
                    <div className="flex flex-col">
                        {!result && !loading && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-stone-100/50 rounded-2xl border-2 border-dashed border-stone-300">
                                <div className="text-5xl mb-4 opacity-40">🥗</div>
                                <h3 className="text-xl font-bold text-stone-400">No Result Yet</h3>
                                <p className="text-stone-400 mt-2">Fill the form to see your specialized mix.</p>
                            </div>
                        )}

                        {loading && (
                            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
                                <p className="text-amber-800 font-medium animate-pulse">Our AI is calculating your perfect blend...</p>
                            </div>
                        )}

                        {result && (
                            <div className="bg-amber-50 p-8 rounded-2xl border border-amber-200 shadow-md animate-in fade-in zoom-in duration-500">
                                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                                    AI Recommendation
                                </span>
                                <h2 className="text-2xl font-black text-stone-900 mb-2">{result.title}</h2>
                                <p className="text-stone-700 leading-relaxed mb-6">{result.description}</p>

                                <h4 className="font-bold text-stone-800 mb-4 flex items-center gap-2">
                                    <span>🥣</span> Recommended Blend:
                                </h4>
                                <div className="space-y-3 mb-8">
                                    {result.blend.map((item, idx) => (
                                        <div key={idx} className="space-y-1">
                                            <div className="flex justify-between text-sm font-medium">
                                                <span className="text-stone-700">{item.grain}</span>
                                                <span className="text-amber-800">{item.percentage}%</span>
                                            </div>
                                            <div className="h-2 bg-white rounded-full overflow-hidden border border-amber-100">
                                                <div
                                                    className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                                                    style={{ width: `${item.percentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-white/60 p-4 rounded-xl border border-amber-100">
                                    <h4 className="font-bold text-stone-800 text-sm mb-2 uppercase tracking-tight">Key Benefits:</h4>
                                    <ul className="space-y-1.5">
                                        {result.benefits.map((benefit, i) => (
                                            <li key={i} className="text-stone-600 text-sm flex items-start gap-2">
                                                <span className="text-green-500">✓</span> {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link
                                    href="/products"
                                    className="mt-8 w-full btn-primary py-3 flex items-center justify-center gap-2"
                                >
                                    Shop Now 🛒
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
