import Link from "next/link";

export default function AboutPage() {
  const points = [
    "You can bring your own grains",
    "Fresh grinding in front of you",
    "No mixing, no preservatives",
    "Trusted by hundreds of families in Greater Noida",
  ];

  const steps = [
    { title: "Choose your grain", desc: "Wheat, bajra, jowar—we grind what you bring or sell our own." },
    { title: "Watch it grind", desc: "Traditional chakki grinding while you wait. Transparent process." },
    { title: "Take it home", desc: "Fresh atta packed the same day. Or get it delivered in 2–3 hours." },
  ];

  return (
    <>
      {/* Page header */}
      <section className="bg-white border-b border-stone-200">
        <div className="container-wide section">
          <h1 className="page-title">About Healthy Chakki</h1>
          <p className="page-subtitle">
            A local chakki in Greater Noida, grinding fresh atta daily using traditional methods.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-[#fffbeb]">
        <div className="container-wide">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Our Story</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              We are a local chakki based in Greater Noida, grinding fresh atta daily using traditional methods.
              Our goal is simple: give families access to pure, freshly ground flour—the way it used to be—with no
              mixing, no preservatives, and complete transparency.
            </p>
            <ul className="list-none space-y-2">
              {points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-stone-600">
                  <span className="text-amber-600 mt-0.5">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-white border-y border-stone-200">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-stone-900 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="p-6 rounded-xl bg-stone-50 border border-stone-200">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold text-lg">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-stone-900">{step.title}</h3>
                <p className="mt-2 text-stone-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-amber-50">
        <div className="container-wide text-center">
          <p className="text-stone-700 font-medium">Ready to try our fresh atta?</p>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-primary">
              View Products
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
