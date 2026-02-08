"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/authSlice";
import { login as loginApi } from "@/services/auth.service";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/";
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <section className="section">
      <div className="container-wide max-w-md mx-auto">
        <h1 className="page-title text-center">Login</h1>
        <p className="text-stone-600 text-center mt-1">
          Sign in to place orders and manage your account.
        </p>
        <form onSubmit={handleSubmit} className="mt-8 p-6 rounded-xl bg-white border border-stone-200 shadow-sm space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-stone-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-70">
            {loading ? "Signing in..." : "Login"}
          </button>
          <p className="text-center text-sm text-stone-600">
            Don&apos;t have an account?{" "}
            <Link href={`/signup${returnUrl !== "/" ? `?returnUrl=${encodeURIComponent(returnUrl)}` : ""}`} className="text-amber-700 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </form>
        <p className="text-center mt-4">
          <Link href="/" className="text-stone-500 text-sm hover:underline">Back to home</Link>
        </p>
      </div>
    </section>
  );
}
