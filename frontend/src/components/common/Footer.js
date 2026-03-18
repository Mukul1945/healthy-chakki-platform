import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1c1917] text-[#fafaf9] mt-auto">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image
                src="/logo.png"
                alt="Healthy Chakki Logo"
                width={48}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-3 text-sm text-stone-400 max-w-xs">
              Fresh atta & pure foods, ground daily in Greater Noida. No mixing, no preservatives
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-stone-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-stone-400 hover:text-amber-200 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-stone-400 hover:text-amber-200 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-stone-400 hover:text-amber-200 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-stone-400 hover:text-amber-200 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-stone-400 hover:text-amber-200 transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-stone-100 mb-4">Contact</h3>
            <ul className="space-y-2 text-stone-400 text-sm">
              <li>📍 Sector 62, Greater Noida</li>
              <li>
                <a href="tel:7351061751" className="hover:text-amber-200 transition-colors">
                  📞 7351061751
                </a>
              </li>
              <li>⏱️ Delivery in 2–3 hours</li>
            </ul>
          </div>

          {/* Timing / CTA */}
          <div>
            <h3 className="font-semibold text-stone-100 mb-4">We&apos;re Here</h3>
            <p className="text-stone-400 text-sm mb-4">
              Order online or visit us. Fresh grinding daily.
            </p>
            <Link
              href="/contact"
              className="inline-block px-4 py-2 rounded-lg bg-amber-600 text-white text-sm font-medium hover:bg-amber-500 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-700 text-center text-stone-500 text-sm">
          © {currentYear} AnantaLabs. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
