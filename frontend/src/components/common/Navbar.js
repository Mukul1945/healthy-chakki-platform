"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-200 shadow-sm">
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-amber-800 hover:text-amber-700 transition-colors"
          >
            Healthy Chakki
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-stone-700 font-medium hover:text-amber-700 transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/cart"
              className="flex items-center gap-2 text-stone-700 font-medium hover:text-amber-700 transition-colors"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-amber-600 text-white text-xs font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-3">
            <Link href="/" className="text-sm font-medium text-stone-700">Home</Link>
            <Link href="/about" className="text-sm font-medium text-stone-700">About</Link>
            <Link href="/products" className="text-sm font-medium text-stone-700">Products</Link>
            <Link href="/contact" className="text-sm font-medium text-stone-700">Contact</Link>
            <Link href="/cart" className="relative p-2">
              <span className="sr-only">Cart</span>
              <span className="text-lg">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
