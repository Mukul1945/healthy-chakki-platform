"use client";

import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { useState } from "react";

// Normalize product: support both variants[] and simple { variant, price }
function getVariants(product) {
  if (product.variants && Array.isArray(product.variants) && product.variants.length > 0) {
    return product.variants;
  }
  return [{ label: product.variant || "1kg", price: product.price }];
}

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const variants = getVariants(product);
  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product._id,
        name: product.name,
        variant: selectedVariant.label,
        price: selectedVariant.price,
        quantity: 1,
      })
    );
  };

  const imageUrl = product.image?.url || null;
  const placeholderSvg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect fill='%23fef3c7' width='200' height='200'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23b45309' font-size='24' font-family='system-ui'%3E🌾%3C/text%3E%3C/svg%3E";

  return (
    <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] bg-amber-50 relative">
        <img
          src={imageUrl || placeholderSvg}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-stone-900">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-stone-500 mt-1 line-clamp-2">{product.description}</p>
        )}

        {variants.length > 1 ? (
          <select
            className="w-full mt-3 px-3 py-2 border border-stone-300 rounded-lg text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={selectedVariant.label}
            onChange={(e) =>
              setSelectedVariant(variants.find((v) => v.label === e.target.value))
            }
          >
            {variants.map((v) => (
              <option key={v.label} value={v.label}>
                {v.label} – ₹{v.price}
              </option>
            ))}
          </select>
        ) : (
          <p className="mt-2 text-stone-600 font-medium">₹{selectedVariant.price} · {selectedVariant.label}</p>
        )}

        <button
          onClick={handleAddToCart}
          className="w-full mt-4 py-2.5 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 active:scale-[0.98] transition-all"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
