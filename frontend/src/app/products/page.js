"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/services/product.service";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    getProducts()
      .then((data) => {
        if (!cancelled) setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        if (!cancelled) {
          const msg = err.response?.data?.message || err.message || "Failed to load products";
          const is503 = err.response?.status === 503;
          const hint = !err.response
            ? " Set NEXT_PUBLIC_API_URL in .env.local (e.g. http://localhost:5000/api) and ensure backend is running."
            : is503
            ? " Fix MongoDB connection (e.g. whitelist your IP in Atlas) and restart the backend."
            : "";
          setError(msg + hint);
          setProducts([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <section className="bg-white border-b border-stone-200">
        <div className="container-wide section">
          <h1 className="page-title">Our Products</h1>
          <p className="page-subtitle">
            Fresh atta ground daily. Choose your favourite and order for delivery.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-wide">
          {loading && (
            <div className="text-center py-12 text-stone-500">
              Loading products...
            </div>
          )}
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-4 mb-6">
              {error}
              <p className="text-sm mt-1">
                Ensure backend is running and NEXT_PUBLIC_API_URL is set (e.g. http://localhost:5000/api).
              </p>
            </div>
          )}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-12 text-stone-500">
              No products yet. Add some from the admin panel.
            </div>
          )}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
