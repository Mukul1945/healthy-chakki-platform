"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAdmin = user?.role === "ADMIN";

  const handleLogout = () => {
    dispatch(logout());
    router.push("/admin");
  };

  const nav = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/products", label: "Manage Products" },
    { href: "/admin/orders", label: "Orders" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-stone-100">
      <header className="bg-stone-800 text-white sticky top-0 z-40 shadow">
        <div className="container-wide flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-bold text-amber-300">
              Admin
            </Link>
            {isAdmin && (
              <nav className="hidden sm:flex items-center gap-1">
                {nav.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-2 rounded text-sm font-medium ${
                      pathname === href
                        ? "bg-stone-700 text-white"
                        : "text-stone-300 hover:bg-stone-700 hover:text-white"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <>
                <span className="text-sm text-stone-400 truncate max-w-[160px]">
                  {user.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm text-stone-400 hover:text-white"
                >
                  Logout
                </button>
              </>
            )}
            <Link
              href="/"
              className="text-sm text-stone-400 hover:text-white"
            >
              View site
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}
