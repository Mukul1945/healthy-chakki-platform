"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeMultipleFromWishlist } from "@/redux/wishlistSlice";
import Link from "next/link";
import ProductCard from "@/components/product/ProductCard";
import { getProductsByIds } from "@/services/product.service";
import Loading from "@/components/common/Loading";

export default function WishlistPage() {
    const { items } = useSelector((state) => state.wishlist);
    const dispatch = useDispatch();
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
                // Fetch only the products in the wishlist by their IDs
                const res = await getProductsByIds(items);
                if (res.success) {
                    const fetchedProducts = res.data;
                    setProducts(fetchedProducts);

                    // Sync/Cleanup: If some IDs from "items" weren't returned by the backend,
                    // they might be deleted or inactive.
                    const fetchedIds = fetchedProducts.map(p => p._id);
                    const missingIds = items.filter(id => !fetchedIds.includes(id));
                    
                    if (missingIds.length > 0) {
                        console.log("Cleaning up missing wishlist items:", missingIds);
                        dispatch(removeMultipleFromWishlist(missingIds));
                    }
                }
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchWishlistProducts();
    }, [items, dispatch]);

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
