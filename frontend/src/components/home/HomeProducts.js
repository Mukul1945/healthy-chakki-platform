"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/services/product.service";
import Link from "next/link";

export default function HomeProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        // Fetch only 3 products for the homepage
        getProducts({ limit: 3 })
            .then((res) => {
                if (isMounted && res.success) {
                    setProducts(res.data);
                }
            })
            .catch(() => {
                if (isMounted) setProducts([]);
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                    <div key={i} className="h-80 bg-stone-100 rounded-3xl animate-pulse"></div>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return null; // Silent fail on homepage if no products
    }

    return (
        <div className="flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            <div className="mt-12">
                <Link
                    href="/products"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold shadow-sm hover:bg-[var(--color-primary)] hover:text-white transition-all hover:scale-105"
                >
                    View All Products <span>→</span>
                </Link>
            </div>
        </div>
    );
}
