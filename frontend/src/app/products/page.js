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

  // New Filter & Sort States
  const [category, setCategory] = useState("ALL");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [sortOrder, setSortOrder] = useState("newest");

  const [pagination, setPagination] = useState({ page: 1, pages: 1 });
  const loadingRef = useRef(false);

  // Categories based on model enum + ALL
  const categories = ["ALL", "ATTA", "MASALA", "HALDI", "SERVICE"];

  // 1. Fetch products with full filter set
  const fetchProducts = async (page = 1, isLoadMore = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    if (isLoadMore) setMoreLoading(true);
    else {
      setLoading(true);
      setError(null);
    }

    try {
      const response = await getProducts({
        search: searchTerm,
        category,
        minPrice: priceRange.min,
        maxPrice: priceRange.max,
        sort: sortOrder,
        page,
        limit: 9
      });

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

  // 🔎 DEBOUNCED SEARCH
  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    debouncedSearch(val);
  };

  // Trigger refetch when filters/search change (reset to page 1)
  useEffect(() => {
    fetchProducts(1, false);
  }, [searchTerm, category, priceRange, sortOrder]);

  // 📜 THROTTLED INFINITE SCROLL
  const handleScroll = useCallback(
    throttle(() => {
      if (loadingRef.current) return;

      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 100) {
        if (pagination.page < pagination.pages) {
          fetchProducts(pagination.page + 1, true);
        }
      }
    }, 500),
    [pagination, searchTerm, category, priceRange, sortOrder]
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-stone-50/30">
      <div className="bg-red-600 text-white text-center py-2 font-bold text-sm uppercase tracking-widest">
        --- DEBUG: Filter UI Active ---
      </div>
      <section className="bg-white border-b border-stone-200">
        <div className="container-wide py-10">
          <h1 className="text-3xl font-bold text-stone-900">Health & Tradition</h1>
          <p className="text-stone-600 mt-2">
            Explore our collection of freshly ground grains and house-made spices.
          </p>
        </div>
      </section>

      <div className="container-wide py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-8">
            {/* Search */}
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Search</h3>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
                <input
                  type="text"
                  placeholder="Find products..."
                  onChange={handleSearchChange}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 transition-all text-sm"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Categories</h3>
              <div className="flex flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategory(cat)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${category === cat
                      ? "bg-amber-600 text-white font-medium"
                      : "text-stone-600 hover:bg-stone-100"
                      }`}
                  >
                    <span>{cat.charAt(0) + cat.slice(1).toLowerCase()}</span>
                    {category === cat && <span className="text-[10px]">●</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range - Simplified for now with inputs */}
            <div>
              <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-4">Price Range</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
                />
                <span className="text-stone-400">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
                />
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="flex-1">
            {/* Top Bar (Count + Sort) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <p className="text-sm text-stone-500">
                Found <span className="font-bold text-stone-900">{pagination.total || 0}</span> products
              </p>

              <div className="flex items-center gap-2">
                <span className="text-sm text-stone-400">Sort by:</span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="bg-white border border-stone-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-2xl bg-red-50 border border-red-200 text-red-700 p-5 mb-8">
                <p className="font-semibold">Error: {error}</p>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-80 bg-white rounded-3xl border border-stone-100 shadow-sm animate-pulse"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-stone-200">
                <span className="text-4xl opacity-50">🌾</span>
                <h3 className="mt-4 text-lg font-bold text-stone-800">No products match your filters</h3>
                <p className="text-stone-500 mt-1 max-w-xs mx-auto">Try adjusting your filters or search keywords to find what you're looking for.</p>
                <button
                  onClick={() => {
                    setCategory("ALL");
                    setPriceRange({ min: 0, max: 2000 });
                    setSearchTerm("");
                  }}
                  className="mt-6 text-amber-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                    — You've seen all products in this category —
                  </p>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
