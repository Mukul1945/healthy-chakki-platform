"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/services/product.service";
import { debounce, throttle } from "lodash";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pages: 1 });

  const loadingRef = useRef(false);

  // 1. Fetch initial products or on search change
  const fetchProducts = async (search = "", page = 1, isLoadMore = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    if (isLoadMore) setMoreLoading(true);
    else {
      setLoading(true);
      setError(null);
    }

    try {
      const response = await getProducts({ search, page, limit: 9 });
      if (response.success) {
        setProducts(prev => isLoadMore ? [...prev, ...response.data] : response.data);
        setPagination(response.pagination);
      }
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
      setMoreLoading(false);
      loadingRef.current = false;
    }
  };

  // 🔎 DEBOUNCED SEARCH: Only trigger 500ms after user stops typing
  const debouncedSearch = useCallback(
    debounce((term) => {
      fetchProducts(term, 1);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSearch(val); // This is debounced! 🚀
  };

  // 📜 THROTTLED INFINITE SCROLL: Only check scroll position once every 500ms
  const handleScroll = useCallback(
    throttle(() => {
      if (loadingRef.current) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      // If we are 100px from the bottom, load more
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (pagination.page < pagination.pages) {
          fetchProducts(searchTerm, pagination.page + 1, true);
        }
      }
    }, 500),
    [pagination, searchTerm]
  );

  useEffect(() => {
    fetchProducts(); // Initial load
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <section className="bg-white border-b border-stone-200">
        <div className="container-wide section">
          <h1 className="page-title text-3xl font-bold text-stone-900">Our Products</h1>
          <p className="page-subtitle text-stone-600 mt-2">
            Fresh atta ground daily. Choose your favorite and order for delivery.
          </p>

          {/* Debounced Search Bar */}
          <div className="mt-8 max-w-md relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
            <input
              type="text"
              placeholder="Search products (e.g. Wheat, Bajra)..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm"
            />
          </div>
        </div>
      </section>

      <section className="section py-12">
        <div className="container-wide">
          {error && (
            <div className="rounded-2xl bg-red-50 border border-red-200 text-red-700 p-5 mb-8 animate-in fade-in duration-500">
              <p className="font-semibold">Oops! {error}</p>
              <button
                onClick={() => fetchProducts(searchTerm, 1)}
                className="mt-2 text-sm underline hover:text-red-900 font-medium"
              >
                Try refreshing
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-stone-100 rounded-3xl animate-pulse"></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-24 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
              <span className="text-4xl">🌾</span>
              <h3 className="mt-4 text-lg font-bold text-stone-800">No products found</h3>
              <p className="text-stone-500 mt-1">Try searching for something else like "Atta" or "Masala".</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {moreLoading && (
                <div className="mt-12 flex justify-center">
                  <div className="flex gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              {!moreLoading && pagination.page >= pagination.pages && (
                <p className="mt-12 text-center text-sm text-stone-400 font-medium italic">
                  — You've reached the end of our grain collection —
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
