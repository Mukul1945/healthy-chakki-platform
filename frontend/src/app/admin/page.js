"use client";

import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/redux/authSlice";
import { login as loginApi } from "@/services/auth.service";
import { createProduct } from "@/services/product.service";

const CATEGORIES = ["ATTA", "MASALA", "HALDI", "SERVICE"];
const DEFAULT_VARIANTS = '[{"label":"1kg","price":60},{"label":"2kg","price":110}]';

function AdminLoginForm({ onSuccess }) {
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
      if (user?.role !== "ADMIN") {
        setError("This account is not an admin. Use admin credentials.");
        setLoading(false);
        return;
      }
      onSuccess({ token, user });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Login failed";
      const is503 = err.response?.status === 503;
      const hint = is503
        ? " Backend DB is down — check MongoDB connection and IP whitelist in Atlas."
        : !err.response
        ? " Check NEXT_PUBLIC_API_URL (e.g. http://localhost:5000/api) and that backend is running."
        : "";
      setError(msg + hint);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-stone-900 text-center">Admin Login</h1>
        <p className="text-stone-600 text-center mt-1 text-sm">Access the admin dashboard.</p>
        <form onSubmit={handleSubmit} className="mt-6 p-6 rounded-xl bg-white border border-stone-200 shadow-sm space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm border border-red-200">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-stone-700 mb-1">Email</label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-stone-700 mb-1">Password</label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-70">
            {loading ? "Signing in..." : "Login to Admin"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-stone-500">
          <Link href="/" className="hover:underline">Back to website</Link>
        </p>
      </div>
    </div>
  );
}

function AddProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("ATTA");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState(DEFAULT_VARIANTS);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("variants", variants);
      formData.append("image", image);
      await createProduct(formData);
      setMessage({ type: "success", text: "Product created! It will appear on the products page." });
      setName("");
      setDescription("");
      setVariants(DEFAULT_VARIANTS);
      setCategory("ATTA");
      setImage(null);
      e.target.reset();
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Failed to create product";
      const status = err.response?.status;
      let hint = "";
      if (status === 401) hint = " Log in again as admin.";
      else if (status === 403) hint = " This account is not admin.";
      else if (status === 503) hint = " Backend DB is down — check MongoDB.";
      else if (msg.toLowerCase().includes("cloudinary") || msg.toLowerCase().includes("upload"))
        hint = " Check CLOUDINARY_* in backend .env.";
      else if (!err.response) hint = " Check NEXT_PUBLIC_API_URL and that backend is running.";
      setMessage({ type: "error", text: msg + hint });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-stone-900">Add new product</h2>
        <p className="text-sm text-stone-600 mt-0.5">Upload with image (Cloudinary).</p>
      </section>
      <section>
        <div className="max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4 p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
            {message.text && (
              <div
                className={`p-3 rounded-lg text-sm ${
                  message.type === "error"
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-800 border border-green-200"
                }`}
              >
                {message.text}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1">Product Name *</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="e.g. Wheat Atta"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-stone-700 mb-1">Category *</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-stone-700 mb-1">Description</label>
              <textarea
                id="description"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                placeholder="Short description"
              />
            </div>
            <div>
              <label htmlFor="variants" className="block text-sm font-medium text-stone-700 mb-1">Variants (JSON) *</label>
              <textarea
                id="variants"
                required
                rows={3}
                value={variants}
                onChange={(e) => setVariants(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono text-sm resize-none"
                placeholder='[{"label":"1kg","price":60}]'
              />
              <p className="text-xs text-stone-500 mt-1">Array of {"{ label, price }"}. e.g. [{`{"label":"1kg","price":60}`}]</p>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-stone-700 mb-1">Product Image (optional)</label>
              <input
                id="image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full text-sm text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:bg-amber-100 file:text-amber-800"
              />
              <p className="text-xs text-stone-500 mt-1">If Cloudinary is not set up, product will use a placeholder image.</p>
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-70 disabled:cursor-not-allowed">
              {loading ? "Uploading..." : "Add Product"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default function AdminPage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleAdminLoginSuccess = (payload) => {
    dispatch(loginSuccess(payload));
  };

  // Not logged in: show admin login only (no main navbar in admin flow for clarity - but layout still has navbar)
  if (!token || !user) {
    return <AdminLoginForm onSuccess={handleAdminLoginSuccess} />;
  }

  // Logged in but not admin
  if (user.role !== "ADMIN") {
    return (
      <div className="section text-center">
        <div className="container-wide max-w-md mx-auto">
          <h1 className="text-xl font-bold text-stone-900">Access denied</h1>
          <p className="mt-2 text-stone-600">You need admin access to view this page.</p>
          <button
            type="button"
            onClick={() => dispatch(logout())}
            className="btn-secondary mt-4"
          >
            Logout
          </button>
          <p className="mt-4">
            <Link href="/" className="text-amber-700 hover:underline">Back to website</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-wide py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900">Dashboard</h1>
        <p className="text-stone-600 mt-1">Add a new product below, or manage existing products and orders.</p>
        <div className="flex flex-wrap gap-4 mt-4">
          <Link
            href="/admin/products"
            className="px-4 py-2 rounded-lg bg-stone-700 text-white text-sm font-medium hover:bg-stone-600"
          >
            Manage Products
          </Link>
          <Link
            href="/admin/orders"
            className="px-4 py-2 rounded-lg bg-stone-700 text-white text-sm font-medium hover:bg-stone-600"
          >
            View Orders
          </Link>
        </div>
      </div>
      <AddProductForm />
    </div>
  );
}
