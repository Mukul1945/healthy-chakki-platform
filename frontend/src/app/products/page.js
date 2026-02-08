"use client";

import ProductCard from "@/components/product/ProductCard";

const mockProducts = [
  {
    _id: "1",
    name: "Wheat Atta",
    price: 60,
    variant: "1kg",
    description: "Fresh chakki-ground wheat flour.",
  },
  {
    _id: "2",
    name: "Bajra Atta",
    price: 80,
    variant: "1kg",
    description: "Pure bajra (pearl millet) flour.",
  },
  {
    _id: "3",
    name: "Jowar Atta",
    price: 75,
    variant: "1kg",
    description: "Fresh jowar (sorghum) flour.",
  },
];

export default function ProductsPage() {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
