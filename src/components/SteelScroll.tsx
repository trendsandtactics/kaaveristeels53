"use client";

export default function SteelScroll() {
  return (
    <section
      id="steel-scroll-section"
      className="relative w-full h-screen overflow-hidden -mt-20 md:-mt-24"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/downloadhero1.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-[1]" />

      {/* Content Wrapper */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-12 md:pb-16">

          {/* Bottom Row */}
          <div className="flex items-end justify-between gap-6">

            {/* Heading - SINGLE LINE */}
            <h2 className="font-heading text-2xl md:text-5xl lg:text-6xl text-white font-bold leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] whitespace-nowrap">
              Building India&apos;s Future
            </h2>

            {/* Button */}
            <button className="px-6 py-3 md:px-8 md:py-4 bg-accent-yellow text-black font-bold text-xs md:text-lg uppercase tracking-wider rounded-sm shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:scale-105 transition duration-300 whitespace-nowrap">
              Explore Our Products
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
