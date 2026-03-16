"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SteelScroll() {
  const images = ["/1.png", "/2.png"]; // your images

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="steel-scroll-section"
      className="relative w-full h-screen overflow-hidden -mt-20 md:-mt-24"
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="Hero Background"
            fill
            priority
            className={`object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-[1]" />

      {/* Content Wrapper */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-24">
          <h2 className="font-heading text-3xl md:text-6xl text-white font-bold leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] max-w-xl">
            Building India&apos;s Future
          </h2>

          <button className="mt-8 px-8 py-4 bg-accent-yellow text-black font-bold text-sm md:text-lg uppercase tracking-wider rounded-sm shadow-[0_0_30px_rgba(234,179,8,0.35)] hover:scale-105 transition duration-300">
            Explore Our Products
          </button>
        </div>
      </div>
    </section>
  );
}
