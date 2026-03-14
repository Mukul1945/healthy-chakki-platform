"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendResetOTP, resetPassword } from "@/services/auth.service";
import { Mail, Key, ShieldCheck, Loader2, Play, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function ForgotPasswordClient() {
  const router = useRouter();
  
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password, 3: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Send OTP to email
      await sendResetOTP(email);
      toast.success("OTP sent if email is registered.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword(email, otp, newPassword);
      toast.success("Password reset successfully!");
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP or failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  // STEP 1: Enter Email
  if (step === 1) {
    return (
      <form onSubmit={handleSendOTP} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start">
            <ShieldCheck className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !email}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 transition-all duration-200"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <span>Send Recovery OTP</span>
              <Play className="w-4 h-4 ml-2" />
            </>
          )}
        </button>

        <div className="text-center mt-4">
          <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
            Back to User Login
          </Link>
        </div>
      </form>
    );
  }

  // STEP 2: Enter OTP and New Password
  if (step === 2) {
    return (
      <form onSubmit={handleResetPassword} className="space-y-6">
        <div className="bg-orange-50 p-4 rounded-lg mb-4 border border-orange-100">
           <p className="text-sm text-orange-800">
             An OTP has been sent to <strong>{email}</strong>. Please enter it below.
           </p>
        </div>

        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
            6-Digit OTP
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ShieldCheck className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-center tracking-[0.5em] font-medium"
              placeholder="123456"
            />
          </div>
        </div>

        <div>
           <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Key className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-start">
            <ShieldCheck className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || otp.length < 6 || newPassword.length < 6}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 transition-all duration-200"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span>Reset Password</span>
          )}
        </button>

         <div className="text-center mt-4">
          <button 
            type="button" 
            onClick={() => setStep(1)}
            className="text-sm text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            Change Email Address
          </button>
        </div>
      </form>
    );
  }

  // STEP 3: Success
  return (
    <div className="text-center py-6">
        <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful!</h3>
        <p className="text-gray-600 mb-8">
            Your password has been changed securely. You can now log in with your new credentials.
        </p>
        <Link 
            href="/login"
            className="inline-flex justify-center items-center py-2.5 px-6 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
            Proceed to Login
        </Link>
    </div>
  );
}
