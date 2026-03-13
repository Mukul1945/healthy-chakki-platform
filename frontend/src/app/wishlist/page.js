"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/services/product.service";
import Loading from "@/components/common/Loading";

export default function WishlistPage() {
    const { items } = useSelector((state) => state.wishlist);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlistProducts() {
            if (items.length === 0) {
                setProducts([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                // Fetch all products and filter locally for simplicity since we have product IDs
                // in a real large app, we would have an API endpoint /api/products/batch
                const res = await getProducts({ limit: 100 });
                if (res.success) {
                    const filtered = res.data.filter((p) => items.includes(p._id));
                    setProducts(filtered);
                }
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchWishlistProducts();
    }, [items]);

    if (loading) return <Loading />;

    return (
        <main className="min-h-screen bg-stone-50 py-12 md:py-20">
            <div className="container-wide">
                <div className="mb-10 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-stone-900">Your Favorites</h1>
                    <p className="text-stone-600 mt-2">Saved items you love</p>
                </div>

                {products.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm max-w-lg mx-auto">
                        <div className="text-6xl mb-6">🏜️</div>
                        <h2 className="text-xl font-semibold text-stone-800">Your wishlist is empty</h2>
                        <p className="text-stone-500 mt-2 mb-8">
                            Looks like you haven&apos;t saved anything yet. Explore our fresh chakki flours!
                        </p>
                        <Link
                            href="/products"
                            className="inline-block px-8 py-3 bg-amber-600 text-white font-semibold rounded-full hover:bg-amber-700 transition-all"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
