"use client";

export default function SteelScroll() {
  return (
    <section
      id="steel-scroll-section"
      className="relative w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero2.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 z-[1]" />

      {/* Center Content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">

        <h2 className="font-heading text-4xl md:text-7xl text-white font-bold leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
          Building India&apos;s Future.
        </h2>

        <button className="mt-10 px-8 py-4 bg-accent-yellow text-black font-bold text-sm md:text-lg uppercase tracking-wider rounded-sm shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:scale-105 transition duration-300">
          Explore Our Products
        </button>

      </div>
    </section>
  );
}
