"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";
import { rehydrateCart } from "@/redux/cartSlice";
import NotificationBell from "./NotificationBell";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/ai-recommendation", label: "AI Diet 🤖" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    dispatch(rehydrateCart([])); // Clear cart from UI
    setIsMenuOpen(false);
  };

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
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
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-amber-600 text-white text-xs font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>
            {token && user ? (
              <div className="flex items-center gap-3 pl-2 border-l border-stone-200">
                <NotificationBell />
                <Link href="/orders" className="text-stone-700 font-medium hover:text-amber-700 transition-colors">
                  My Orders
                </Link>
                <span className="text-sm text-stone-600 truncate max-w-[120px]" title={user.email}>
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-stone-600 hover:text-amber-700 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="text-stone-700 font-medium hover:text-amber-700 transition-colors">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Right Icons (Cart + Bell + Menu Toggle) */}
          <div className="flex md:hidden items-center gap-4">
            <Link href="/cart" className="relative p-1">
              <span className="text-xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-amber-600 text-white text-[10px] font-bold border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {token && <NotificationBell />}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 text-stone-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="text-2xl">{isMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-stone-100 py-4 bg-white animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-stone-700 font-medium hover:bg-amber-50 hover:text-amber-800 transition-colors"
                >
                  {label}
                </Link>
              ))}
              <div className="h-px bg-stone-100 my-2 mx-4" />
              {token && user ? (
                <>
                  <Link
                    href="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-stone-700 font-medium hover:bg-amber-50 hover:text-amber-800 transition-colors"
                  >
                    My Orders
                  </Link>
                  <div className="px-4 py-2 mt-2">
                    <p className="text-xs text-stone-500 mb-2">Logged in as: {user.email}</p>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-2 text-red-600 font-semibold"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-3 text-amber-700 font-bold hover:bg-amber-50 transition-colors"
                >
                  Login / Sign Up
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
