import Link from "next/link";
import HomeProducts from "@/components/home/HomeProducts";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#faf7f2] min-h-[85vh] flex items-center border-b border-[#e6e0d4]">
        {/* Decorative Particles */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-10 left-[10%] text-4xl animate-float-slow">🌾</div>
          <div className="absolute top-[40%] right-[15%] text-5xl animate-float-fast">🌾</div>
          <div className="absolute bottom-20 left-[20%] text-3xl animate-float-slow">✨</div>
          <div className="absolute top-20 right-[30%] text-2xl animate-float-fast">🍃</div>
        </div>

        <div className="container-wide relative z-10 pt-10 pb-20 md:py-32">
          <div className="max-w-3xl text-center mx-auto">
            <span className="inline-block py-1 px-3 rounded-full bg-amber-100 text-amber-800 text-xs md:text-sm font-bold mb-6 tracking-widest uppercase">
              100% Organic & Pure
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#292524] tracking-tight leading-tight">
              Fresh Chakki Atta <br />
              <span className="text-[#c27803]">Ground Daily for Your Family</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-[#57534e] max-w-2xl mx-auto leading-relaxed">
              Pure, stone-ground wheat delivered fresh to your doorstep. Experience the real taste and health benefits of unadulterated grains.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/products" className="px-8 py-4 rounded-xl bg-[#c27803] text-white font-bold text-lg hover:bg-[#8c5400] transition-all hover:scale-105 shadow-md">
                Shop Now
              </Link>
              <Link href="/about" className="px-8 py-4 rounded-xl bg-white border-2 border-[#c27803] text-[#c27803] font-bold text-lg hover:bg-[#c27803] hover:text-white transition-all">
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Subtle bottom curve */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-[30px] sm:h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.5,193.3,109.81Z" fill="#ffffff"></path>
          </svg>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="py-16 bg-white relative z-10 -mt-2">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: '🌾', title: '100% Stone Ground', desc: 'Traditional milling keeps nutrients intact' },
              { icon: '🚫', title: 'No Preservatives', desc: 'Zero chemicals, zero adulteration' },
              { icon: '⏱️', title: 'Freshly Ground Daily', desc: 'We grind after you place your order' },
              { icon: '🛵', title: 'Farm to Home', desc: 'Direct delivery to your doorstep' }
            ].map((feat, i) => (
              <div key={i} className="bg-[#faf7f2] rounded-3xl p-6 md:p-8 text-center border border-[#e6e0d4] hover:-translate-y-2 transition-transform duration-300 shadow-sm hover:shadow-md">
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center text-2xl md:text-3xl mb-4 text-[#c27803]">
                  {feat.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#292524] mb-2">{feat.title}</h3>
                <p className="text-[#57534e] text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Product Section */}
      <section className="py-16 md:py-20 bg-[#f1ede1] border-y border-[#e6e0d4]">
        <div className="container-wide">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-[#2c7a2c] font-bold text-xs md:text-sm tracking-widest uppercase">Our Bestsellers</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#292524] mt-2">Fresh From The Chakki</h2>
          </div>
          <HomeProducts />
        </div>
      </section>

      {/* 4. Process Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="container-wide">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#292524]">How We Do It</h2>
            <p className="mt-3 md:mt-4 text-[#57534e] max-w-2xl mx-auto text-sm md:text-base px-4">From the golden fields to your kitchen mat, we ensure purity at every single step.</p>
          </div>

          <div className="relative">
            {/* Connecting Line (Hidden on Mobile) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-[#e6e0d4] -translate-y-1/2 overflow-hidden">
              <div className="w-full h-full bg-[#2c7a2c] origin-left"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
              {[
                { step: 1, title: 'Farm Sourcing', icon: '🚜' },
                { step: 2, title: 'Triple Cleaning', icon: '🚿' },
                { step: 3, title: 'Stone Grinding', icon: '⚙️' },
                { step: 4, title: 'Eco Packaging', icon: '📦' },
                { step: 5, title: 'Door Delivery', icon: '🚚' }
              ].map((process) => (
                <div key={process.step} className="text-center relative group">
                  <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 mx-auto bg-[#faf7f2] border-4 border-white shadow-md rounded-full flex items-center justify-center text-2xl md:text-3xl lg:text-4xl relative z-10 transition-transform group-hover:scale-110 group-hover:bg-[#2c7a2c] group-hover:text-white group-hover:border-[#2c7a2c]">
                    {process.icon}
                  </div>
                  <div className="mt-3 md:mt-4">
                    <span className="bg-[#c27803] text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full mb-1 md:mb-2 inline-block">Step {process.step}</span>
                    <h3 className="font-bold text-[#292524] text-sm md:text-lg">{process.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Benefits Section */}
      <section className="py-16 md:py-20 bg-[#5c4033] text-white">
        <div className="container-wide flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 md:mb-6">Why Choose Traditional Stone Grinding?</h2>
            <p className="text-[#f1ede1] opacity-90 mb-8 text-base md:text-lg leading-relaxed">
              Modern high-speed roller mills generate excessive heat that destroys the natural vitamins and fiber in wheat.
              Our traditional slow-grinding Chakki ensures your family gets 100% of the nutrition.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-left max-w-sm sm:max-w-none mx-auto lg:mx-0">
              {[
                { icon: '🌾', text: 'Rich in Dietary Fiber' },
                { icon: '🫓', text: 'Stays Soft for Hours' },
                { icon: '❤️', text: 'Better Digestion' },
                { icon: '🛡️', text: '100% Chemical Free' }
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-xl">
                    {benefit.icon}
                  </div>
                  <span className="font-medium text-sm md:text-base">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 w-full relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden bg-white/5 flex items-center justify-center border border-white/10 shadow-inner">
            <div className="text-center p-6">
              <div className="text-6xl md:text-8xl mb-4 animate-pulse">⚙️</div>
              <div className="text-xl md:text-2xl font-bold tracking-widest text-[#f1ede1] uppercase">Cold Pressed Grinding</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-16 md:py-24 bg-[#faf7f2]">
        <div className="container-wide">
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#c27803] font-bold text-xs md:text-sm tracking-widest uppercase">Community</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#292524] mt-2">Loved By Families</h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* 7. CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#c27803] to-[#8c5400] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl transform rotate-45 translate-x-1/4 -translate-y-1/4 pointer-events-none hidden md:block">🌾</div>

        <div className="container-wide relative z-10 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">Experience the Taste of Fresh Atta</h2>
          <p className="text-amber-100 text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto">
            Order before 2 PM for same-day evening delivery across Greater Noida.
          </p>
          <Link href="/products" className="inline-block px-8 py-4 md:px-10 md:py-4 rounded-xl bg-white text-[#c27803] font-bold text-lg md:text-xl hover:bg-[#faf7f2] transition-colors shadow-xl hover:scale-105 duration-300 w-full sm:w-auto">
            Order Fresh Atta Now
          </Link>
        </div>
      </section>
    </>
  );
}
