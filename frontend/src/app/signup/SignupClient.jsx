"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";
import { register as registerApi } from "@/services/auth.service";
import Image from "next/image";

export default function SignupClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await registerApi(name, email, password);
      dispatch(loginSuccess({ token, user }));
      router.push(returnUrl);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Sign up failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-600 rounded-full blur-3xl"></div>
      </div>

      {/* Wheat Pattern Overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L32 15 L30 20 L28 15 Z M30 20 L32 25 L30 30 L28 25 Z M30 30 L32 35 L30 40 L28 35 Z M30 40 L32 45 L30 50 L28 45 Z' fill='%23d97706' fill-opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-4rem)]">
            
            {/* Left Side - Branding & Image */}
            <div className="hidden lg:flex flex-col justify-center items-center text-center space-y-8 p-8">
              {/* Decorative Chakki Illustration */}
              <div className="relative w-full max-w-md">
                <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-3xl p-12 shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  {/* Traditional Chakki SVG Illustration */}
                  <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                    {/* Chakki Base */}
                    <ellipse cx="200" cy="320" rx="150" ry="40" fill="#8B4513" opacity="0.3"/>
                    
                    {/* Bottom Stone */}
                    <circle cx="200" cy="280" r="120" fill="#A0826D" stroke="#6B4423" strokeWidth="4"/>
                    <circle cx="200" cy="280" r="110" fill="#C9B7A3" opacity="0.7"/>
                    <circle cx="200" cy="280" r="90" fill="#A0826D" opacity="0.5"/>
                    
                    {/* Grains scattered */}
                    <circle cx="150" cy="260" r="4" fill="#F59E0B"/>
                    <circle cx="170" cy="270" r="3" fill="#F59E0B"/>
                    <circle cx="230" cy="265" r="4" fill="#F59E0B"/>
                    <circle cx="250" cy="275" r="3" fill="#F59E0B"/>
                    <circle cx="190" cy="255" r="3" fill="#F59E0B"/>
                    
                    {/* Top Stone */}
                    <circle cx="200" cy="220" r="115" fill="#8B7355" stroke="#6B4423" strokeWidth="4"/>
                    <circle cx="200" cy="220" r="105" fill="#B8977D" opacity="0.8"/>
                    <circle cx="200" cy="220" r="85" fill="#8B7355" opacity="0.6"/>
                    
                    {/* Center hole */}
                    <circle cx="200" cy="220" r="25" fill="#4A3728"/>
                    <circle cx="200" cy="220" r="20" fill="#2D1F16"/>
                    
                    {/* Handle */}
                    <rect x="185" y="120" width="30" height="100" rx="15" fill="#8B4513" stroke="#6B4423" strokeWidth="3"/>
                    <ellipse cx="200" cy="120" rx="20" ry="10" fill="#6B4423"/>
                    <ellipse cx="200" cy="115" rx="18" ry="8" fill="#A0826D"/>
                    
                    {/* Decorative patterns on stone */}
                    <path d="M 200 220 L 285 220 A 85 85 0 0 1 200 305 Z" fill="#6B5744" opacity="0.3"/>
                    <path d="M 200 220 L 200 135 A 85 85 0 0 1 285 220 Z" fill="#9D8568" opacity="0.2"/>
                    
                    {/* Wheat grains around */}
                    <g opacity="0.8">
                      <path d="M 100 180 Q 95 170 100 160 Q 105 170 100 180 M 98 175 L 102 175 M 98 170 L 102 170 M 98 165 L 102 165" 
                            fill="none" stroke="#F59E0B" strokeWidth="2"/>
                      <path d="M 300 180 Q 295 170 300 160 Q 305 170 300 180 M 298 175 L 302 175 M 298 170 L 302 170 M 298 165 L 302 165" 
                            fill="none" stroke="#F59E0B" strokeWidth="2"/>
                      <path d="M 120 320 Q 115 310 120 300 Q 125 310 120 320 M 118 315 L 122 315 M 118 310 L 122 310 M 118 305 L 122 305" 
                            fill="none" stroke="#F59E0B" strokeWidth="2"/>
                      <path d="M 280 320 Q 275 310 280 300 Q 285 310 280 320 M 278 315 L 282 315 M 278 310 L 282 310 M 278 305 L 282 305" 
                            fill="none" stroke="#F59E0B" strokeWidth="2"/>
                    </g>
                  </svg>
                </div>
                
                {/* Floating wheat grains animation */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-400 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-orange-400 rounded-full blur-xl animate-pulse delay-100"></div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800">
                  Pure & Fresh Atta
                </h2>
                <p className="text-lg text-amber-900 max-w-md mx-auto leading-relaxed">
                  From golden wheat fields to your home. Experience the traditional taste of freshly ground atta - <span className="font-semibold">Wheat, Jowar, Bajra</span> and more!
                </p>
                
                {/* Feature badges */}
                <div className="flex flex-wrap gap-3 justify-center mt-6">
                  <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-amber-800 shadow-md border border-amber-200">
                    🌾 100% Natural
                  </span>
                  <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-amber-800 shadow-md border border-amber-200">
                    ⚙️ Fresh Ground
                  </span>
                  <span className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-amber-800 shadow-md border border-amber-200">
                    ✨ Premium Quality
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="flex items-center justify-center p-4">
              <div className="w-full max-w-md">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-8">
                  <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-700">
                    🌾 Fresh Atta
                  </h1>
                  <p className="text-amber-800 mt-2">Traditional Quality, Modern Convenience</p>
                </div>

                <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-amber-100/50 overflow-hidden">
                  {/* Decorative header */}
                  <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-6 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                      <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
                    </div>
                    <h1 className="text-3xl font-bold text-white relative z-10">Create Account</h1>
                    <p className="text-amber-50 mt-2 relative z-10">Join us for fresh, quality atta</p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    {error && (
                      <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border-l-4 border-red-500 shadow-sm animate-shake">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span>{error}</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-amber-900">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition-all outline-none bg-amber-50/50"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-amber-900">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition-all outline-none bg-amber-50/50"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-amber-900">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition-all outline-none bg-amber-50/50"
                          placeholder="Create a strong password"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-6 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating your account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-amber-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-amber-600 font-medium">Already a member?</span>
                      </div>
                    </div>

                    <Link
                      href={`/login${
                        returnUrl !== "/"
                          ? `?returnUrl=${encodeURIComponent(returnUrl)}`
                          : ""
                      }`}
                      className="block w-full text-center py-3 px-4 border-2 border-amber-600 text-amber-700 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-200"
                    >
                      Login to your account
                    </Link>

                    <p className="text-center mt-6">
                      <Link
                        href="/"
                        className="text-amber-600 text-sm hover:text-amber-800 font-medium inline-flex items-center gap-1 group"
                      >
                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to home
                      </Link>
                    </p>
                  </form>
                </div>

                {/* Trust badges */}
                <div className="mt-6 flex items-center justify-center gap-6 text-xs text-amber-700">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Secure Checkout
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                    </svg>
                    Fast Delivery
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}