"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-stone-200 shadow-sm">
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-18">
          <Link
            href="/"
            className="text-xl font-bold text-amber-800 hover:text-amber-700 transition-colors"
          >
            Healthy Chakki
          </Link>

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
                <Link href="/orders" className="text-stone-700 font-medium hover:text-amber-700 transition-colors">
                  My Orders
                </Link>
                <span className="text-sm text-stone-600 truncate max-w-[120px]" title={user.email}>
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-medium text-stone-600 hover:text-amber-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="text-stone-700 font-medium hover:text-amber-700 transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="text-stone-700 font-medium hover:text-amber-700 transition-colors">
                  Sign up
                </Link>
              </>
            )}
          </div>

          <div className="flex md:hidden items-center gap-3">
            <Link href="/" className="text-sm font-medium text-stone-700">Home</Link>
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
            {token && user ? (
              <>
                <Link href="/orders" className="text-sm font-medium text-stone-700">Orders</Link>
                <button type="button" onClick={handleLogout} className="text-sm font-medium text-stone-700">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-stone-700">Login</Link>
                <Link href="/signup" className="text-sm font-medium text-stone-700">Sign up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
