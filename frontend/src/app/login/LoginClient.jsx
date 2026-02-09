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

        <form
          onSubmit={handleSubmit}
          className="mt-8 p-6 rounded-xl bg-white border border-stone-200 shadow-sm space-y-4"
        >
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}

          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />

          <button disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>

          <Link href={`/signup?returnUrl=${encodeURIComponent(returnUrl)}`}>
            Sign up
          </Link>
        </form>
      </div>
    </section>
  );
}
