import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-white to-stone-50 border-b border-stone-200">
        <div className="container-wide section">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              Fresh Chakki Atta,{" "}
              <span className="text-amber-700">Ground Daily</span>
            </h1>
            <p className="mt-4 text-lg text-stone-600">
              Pure wheat, bajra & jowar atta freshly ground in our local chakki.
              Serving Greater Noida with purity and trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/products" className="btn-primary">
                View Products
              </Link>
              <Link href="/about" className="btn-secondary">
                Our Process
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="section bg-white border-b border-stone-200">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700 text-xl mb-3">
                🌾
              </div>
              <h3 className="font-semibold text-stone-900">Bring Your Grains</h3>
              <p className="mt-1 text-stone-600 text-sm">
                Bring your own wheat, bajra or jowar and we grind it fresh in front of you.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700 text-xl mb-3">
                ✨
              </div>
              <h3 className="font-semibold text-stone-900">No Mixing, No Additives</h3>
              <p className="mt-1 text-stone-600 text-sm">
                100% pure atta. No preservatives, no blending—just what you see.
              </p>
            </div>
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 text-amber-700 text-xl mb-3">
                🚚
              </div>
              <h3 className="font-semibold text-stone-900">Quick Delivery</h3>
              <p className="mt-1 text-stone-600 text-sm">
                Delivery in 2–3 hours across Greater Noida. Order online or via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA + Product teaser */}
      <section className="section bg-[#fef3c7]/40">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
              Ready to Order?
            </h2>
            <p className="mt-2 text-stone-600">
              Browse our fresh atta and place your order. We&apos;ll deliver to your doorstep.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/products" className="btn-primary">
                Shop Atta
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
