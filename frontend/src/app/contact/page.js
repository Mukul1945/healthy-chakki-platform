import Link from "next/link";

export default function ContactPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-white border-b border-stone-200">
        <div className="container-wide section">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Visit us, call, or order online. We deliver across Greater Noida in 2–3 hours.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
            <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
              <span className="text-2xl mb-2 block">📍</span>
              <h3 className="font-semibold text-stone-900">Address</h3>
              <p className="mt-1 text-stone-600 text-sm">
                Sector 62, Greater Noida
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
              <span className="text-2xl mb-2 block">📞</span>
              <h3 className="font-semibold text-stone-900">Phone</h3>
              <a
                href="tel:7351061751"
                className="mt-1 text-amber-700 font-medium hover:underline block"
              >
                7351061751
              </a>
            </div>
            <div className="p-6 rounded-xl bg-white border border-stone-200 shadow-sm">
              <span className="text-2xl mb-2 block">⏱️</span>
              <h3 className="font-semibold text-stone-900">Delivery</h3>
              <p className="mt-1 text-stone-600 text-sm">
                2–3 hours in Greater Noida
              </p>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl bg-stone-50 border border-stone-200 max-w-2xl">
            <h3 className="font-semibold text-stone-900 mb-2">How to order</h3>
            <p className="text-stone-600 text-sm">
              You can place orders via WhatsApp, directly from our website, or visit us in person.
              Fresh grinding daily—we&apos;re here to help.
            </p>
            <div className="mt-4">
              <Link href="/products" className="btn-primary">
                Order Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
