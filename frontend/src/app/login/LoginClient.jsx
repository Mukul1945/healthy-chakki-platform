"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";
import { login as loginApi } from "@/services/auth.service";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await loginApi(email, password);
      dispatch(loginSuccess({ token, user }));
      router.push(returnUrl);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-amber-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-orange-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-600 rounded-full blur-3xl"></div>
      </div>

      {/* Wheat Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10 L32 15 L30 20 L28 15 Z M30 20 L32 25 L30 30 L28 25 Z M30 30 L32 35 L30 40 L28 35 Z M30 40 L32 45 L30 50 L28 45 Z' fill='%23d97706' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      ></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)]">
            
            {/* Left Side - Branding & Wheat Grains Illustration */}
            <div className="hidden lg:flex flex-col justify-center items-center text-center space-y-8 p-8">
              
              {/* Wheat Grains Bowl Illustration */}
              <div className="relative w-full max-w-lg">
                <div className="bg-gradient-to-br from-amber-600 to-orange-700 rounded-3xl p-16 shadow-2xl hover:scale-105 transition-transform duration-500">
                  
                  {/* Wheat Bowl SVG - Hardcoded */}
                  <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                    {/* Shadow */}
                    <ellipse cx="200" cy="340" rx="140" ry="30" fill="#000000" opacity="0.15"/>
                    
                    {/* Bowl Base */}
                    <ellipse cx="200" cy="280" rx="130" ry="35" fill="#8B4513" opacity="0.3"/>
                    
                    {/* Bowl Body */}
                    <path d="M 80 200 Q 70 240 90 270 Q 110 290 200 290 Q 290 290 310 270 Q 330 240 320 200 Z" fill="#A0826D" stroke="#6B4423" strokeWidth="4"/>
                    <path d="M 85 205 Q 75 240 95 268 Q 115 285 200 285 Q 285 285 305 268 Q 325 240 315 205 Z" fill="#C9B7A3" opacity="0.8"/>
                    
                    {/* Bowl Rim */}
                    <ellipse cx="200" cy="200" rx="120" ry="30" fill="#8B7355" stroke="#6B4423" strokeWidth="4"/>
                    <ellipse cx="200" cy="198" rx="115" ry="27" fill="#B8977D" opacity="0.9"/>
                    <ellipse cx="200" cy="196" rx="110" ry="24" fill="#C9B7A3" opacity="0.7"/>
                    
                    {/* Wheat Grains in Bowl - Multiple layers for depth */}
                    {/* Bottom layer */}
                    <ellipse cx="190" cy="210" rx="8" ry="12" fill="#D4A574" opacity="0.9" transform="rotate(-20 190 210)"/>
                    <ellipse cx="210" cy="215" rx="7" ry="11" fill="#C9A05E" opacity="0.9" transform="rotate(15 210 215)"/>
                    <ellipse cx="170" cy="220" rx="8" ry="12" fill="#D4A574" opacity="0.9" transform="rotate(-30 170 220)"/>
                    <ellipse cx="230" cy="225" rx="7" ry="11" fill="#C9A05E" opacity="0.9" transform="rotate(25 230 225)"/>
                    <ellipse cx="200" cy="230" rx="8" ry="12" fill="#D4A574" opacity="0.9" transform="rotate(-10 200 230)"/>
                    
                    {/* Middle layer */}
                    <ellipse cx="185" cy="200" rx="7" ry="11" fill="#E8C18A" opacity="0.95" transform="rotate(-15 185 200)"/>
                    <ellipse cx="215" cy="205" rx="8" ry="12" fill="#D4A574" opacity="0.95" transform="rotate(20 215 205)"/>
                    <ellipse cx="195" cy="210" rx="7" ry="11" fill="#E8C18A" opacity="0.95" transform="rotate(-25 195 210)"/>
                    <ellipse cx="220" cy="212" rx="8" ry="12" fill="#D4A574" opacity="0.95" transform="rotate(10 220 212)"/>
                    <ellipse cx="175" cy="215" rx="7" ry="11" fill="#E8C18A" opacity="0.95" transform="rotate(-35 175 215)"/>
                    <ellipse cx="225" cy="218" rx="8" ry="12" fill="#D4A574" opacity="0.95" transform="rotate(30 225 218)"/>
                    
                    {/* Top layer - brightest */}
                    <ellipse cx="180" cy="195" rx="8" ry="13" fill="#F5D9A8" opacity="1" transform="rotate(-12 180 195)"/>
                    <ellipse cx="200" cy="192" rx="9" ry="14" fill="#FBBF24" opacity="1" transform="rotate(5 200 192)"/>
                    <ellipse cx="220" cy="197" rx="8" ry="13" fill="#F5D9A8" opacity="1" transform="rotate(18 220 197)"/>
                    <ellipse cx="190" cy="198" rx="7" ry="12" fill="#F59E0B" opacity="1" transform="rotate(-20 190 198)"/>
                    <ellipse cx="210" cy="195" rx="8" ry="13" fill="#FBBF24" opacity="1" transform="rotate(22 210 195)"/>
                    <ellipse cx="205" cy="190" rx="7" ry="12" fill="#F59E0B" opacity="1" transform="rotate(-8 205 190)"/>
                    <ellipse cx="195" cy="188" rx="8" ry="13" fill="#F5D9A8" opacity="1" transform="rotate(12 195 188)"/>
                    
                    {/* Scattered grains on sides */}
                    <ellipse cx="150" cy="205" rx="6" ry="10" fill="#F59E0B" opacity="0.9" transform="rotate(-40 150 205)"/>
                    <ellipse cx="250" cy="210" rx="6" ry="10" fill="#FBBF24" opacity="0.9" transform="rotate(35 250 210)"/>
                    <ellipse cx="160" cy="195" rx="5" ry="9" fill="#F5D9A8" opacity="0.9" transform="rotate(-45 160 195)"/>
                    <ellipse cx="240" cy="200" rx="5" ry="9" fill="#F59E0B" opacity="0.9" transform="rotate(40 240 200)"/>
                    
                    {/* Decorative Wheat Stalks Around Bowl */}
                    <g opacity="0.9">
                      {/* Left stalks */}
                      <path d="M 60 240 Q 55 220 60 200 Q 65 220 60 240" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                      <line x1="57" y1="235" x2="63" y2="235" stroke="#F59E0B" strokeWidth="2.5"/>
                      <line x1="57" y1="228" x2="63" y2="228" stroke="#F59E0B" strokeWidth="2.5"/>
                      <line x1="57" y1="221" x2="63" y2="221" stroke="#F59E0B" strokeWidth="2.5"/>
                      <line x1="57" y1="214" x2="63" y2="214" stroke="#F59E0B" strokeWidth="2.5"/>
                      <line x1="57" y1="207" x2="63" y2="207" stroke="#F59E0B" strokeWidth="2.5"/>
                      
                      <path d="M 80 260 Q 75 240 80 220 Q 85 240 80 260" fill="none" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round"/>
                      <line x1="77" y1="255" x2="83" y2="255" stroke="#FBBF24" strokeWidth="2.5"/>
                      <line x1="77" y1="248" x2="83" y2="248" stroke="#FBBF24" strokeWidth="2.5"/>
                      <line x1="77" y1="241" x2="83" y2="241" stroke="#FBBF24" strokeWidth="2.5"/>
                      <line x1="77" y1="234" x2="83" y2="234" stroke="#FBBF24" strokeWidth="2.5"/>
                      <line x1="77" y1="227" x2="83" y2="227" stroke="#FBBF24" strokeWidth="2.5"/>
                      
                      {/* Right stalks */}
                      <path d="M 340 240 Q 335 220 340 200 Q 345 220 340 240" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
                      <line x1="337" y1="235" x2="343" y2="235" stroke="#F59E0B" strokeWidth="2.5"/>
                      <line x1="337" y1="228" x2="343" y2="228" stroke="#F59E0B" strokeWidth="2.5"/>
                      <line x1="337" y1="221" x2="343" y2="221" stroke="#F59E0B" strokeWidth="2.5"/>
                      <line x1="337" y1="214" x2="343" y2="214" stroke="#F59E0B" strokeWidth="2.5"/>
                      <line x1="337" y1="207" x2="343" y2="207" stroke="#F59E0B" strokeWidth="2.5"/>
                      
                      <path d="M 320 260 Q 315 240 320 220 Q 325 240 320 260" fill="none" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round"/>
                      <line x1="317" y1="255" x2="323" y2="255" stroke="#FBBF24" strokeWidth="2.5"/>
                      <line x1="317" y1="248" x2="323" y2="248" stroke="#FBBF24" strokeWidth="2.5"/>
                      <line x1="317" y1="241" x2="323" y2="241" stroke="#FBBF24" strokeWidth="2.5"/>
                      <line x1="317" y1="234" x2="323" y2="234" stroke="#FBBF24" strokeWidth="2.5"/>
                      <line x1="317" y1="227" x2="323" y2="227" stroke="#FBBF24" strokeWidth="2.5"/>
                      
                      {/* Center decorative stalks */}
                      <path d="M 200 140 Q 195 120 200 100 Q 205 120 200 140" fill="none" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round"/>
                      <line x1="196" y1="135" x2="204" y2="135" stroke="#F59E0B" strokeWidth="3"/>
                      <line x1="196" y1="127" x2="204" y2="127" stroke="#F59E0B" strokeWidth="3"/>
                      <line x1="196" y1="119" x2="204" y2="119" stroke="#F59E0B" strokeWidth="3"/>
                      <line x1="196" y1="111" x2="204" y2="111" stroke="#F59E0B" strokeWidth="3"/>
                      <line x1="196" y1="103" x2="204" y2="103" stroke="#F59E0B" strokeWidth="3"/>
                    </g>
                    
                    {/* Spoon/Scoop in bowl */}
                    <g opacity="0.8">
                      <ellipse cx="250" cy="200" rx="20" ry="12" fill="#8B7355" stroke="#6B4423" strokeWidth="2"/>
                      <rect x="248" y="175" width="4" height="30" rx="2" fill="#8B7355" stroke="#6B4423" strokeWidth="1.5"/>
                      <ellipse cx="250" cy="198" rx="18" ry="10" fill="#B8977D" opacity="0.7"/>
                    </g>
                  </svg>
                </div>
                
                {/* Animated floating elements */}
                <div className="absolute -top-6 -left-6 w-16 h-16 bg-amber-400 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-orange-400 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-yellow-400 rounded-full blur-xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
              </div>

              {/* Branding Content */}
              <div className="space-y-6">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 bg-clip-text text-transparent">
                  Welcome Back!
                </h2>
                <p className="text-xl text-amber-900 max-w-lg mx-auto leading-relaxed">
                  Continue your journey with pure, freshly ground atta. Quality you can trust, <span className="font-bold text-orange-800">tradition you can taste</span>!
                </p>
                
                {/* Feature Badges */}
                <div className="flex flex-wrap gap-4 justify-center pt-4">
                  <span className="px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-amber-800 shadow-lg border-2 border-amber-200 hover:scale-105 transition-transform">
                    🔒 Secure Login
                  </span>
                  <span className="px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-amber-800 shadow-lg border-2 border-amber-200 hover:scale-105 transition-transform">
                    ⚡ Quick Access
                  </span>
                  <span className="px-5 py-2.5 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-amber-800 shadow-lg border-2 border-amber-200 hover:scale-105 transition-transform">
                    🌾 Fresh Orders
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center p-4">
              <div className="w-full max-w-md">
                
                {/* Mobile Logo */}
                <div className="lg:hidden text-center mb-10">
                  <div className="inline-block text-6xl mb-3">🌾</div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent">
                    Fresh Atta
                  </h1>
                  <p className="text-amber-800 mt-2 font-medium">Welcome Back to Quality</p>
                </div>

                {/* Form Card */}
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-amber-100/60 overflow-hidden">
                  
                  {/* Decorative Header */}
                  <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white rounded-full translate-x-24 translate-y-24"></div>
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/40 rounded-full"></div>
                    </div>
                    <h1 className="text-3xl font-bold text-white relative z-10 mb-2">Welcome Back</h1>
                    <p className="text-amber-50 text-lg relative z-10">Sign in to your account</p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    
                    {/* Error Message */}
                    {error && (
                      <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border-l-4 border-red-500 shadow-md">
                        <div className="flex items-center gap-3">
                          <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{error}</span>
                        </div>
                      </div>
                    )}

                    {/* Email Field */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-bold text-amber-900">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-14 pr-4 py-3.5 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition-all outline-none bg-amber-50/50 text-gray-900 placeholder-amber-600/50 font-medium"
                          placeholder="you@example.com"
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <label htmlFor="password" className="block text-sm font-bold text-amber-900">
                        Password
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full pl-14 pr-14 py-3.5 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition-all outline-none bg-amber-50/50 text-gray-900 placeholder-amber-600/50 font-medium"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-4 flex items-center text-amber-600 hover:text-amber-800 transition-colors"
                        >
                          {showPassword ? (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between pt-2">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-2 border-amber-300 text-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="ml-2 text-sm text-amber-800 font-medium group-hover:text-amber-900">Remember me</span>
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-8 relative overflow-hidden group"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {loading ? (
                          <>
                            <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span className="text-lg">Signing you in...</span>
                          </>
                        ) : (
                          <>
                            <span className="text-lg">Sign In</span>
                            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-700 via-orange-700 to-amber-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </button>

                    {/* Divider */}
                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-amber-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-6 bg-white text-amber-700 font-bold text-base">New to Fresh Atta?</span>
                      </div>
                    </div>

                    {/* Signup Link */}
                    <Link
                      href={`/signup${returnUrl !== "/" ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`}
                      className="block w-full text-center py-3.5 px-4 border-2 border-amber-600 text-amber-700 font-bold text-lg rounded-xl hover:bg-amber-50 hover:border-amber-700 transition-all duration-200"
                    >
                      Create an account
                    </Link>

                    {/* Back to Home */}
                    <p className="text-center mt-8">
                      <Link
                        href="/"
                        className="text-amber-600 text-base hover:text-amber-800 font-semibold inline-flex items-center gap-2 group"
                      >
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to home
                      </Link>
                    </p>
                  </form>
                </div>

                {/* Security Badge */}
                <div className="mt-8 text-center">
                  <div className="inline-flex items-center gap-2 text-sm text-amber-800 font-medium bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md border border-amber-200">
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Protected by secure encryption</span>
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