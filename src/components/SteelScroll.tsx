"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SteelScroll() {
  const images = ["/1.png", "/2.png"];

  const certificates = [
    { src: "/bis.png", alt: "BIS Certificate" },
    { src: "/tvecert.png", alt: "TVE Certificate" },
    { src: "/NISST.png", alt: "NISST Certificate" },
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="steel-scroll-section"
      className="relative w-full min-h-screen overflow-hidden -mt-20 md:-mt-24"
    >
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full z-0">
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

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 min-h-screen flex flex-col justify-end">
        <div className="flex justify-center lg:justify-end items-center flex-1 pt-32 md:pt-36 pb-28">
          <div className="w-full max-w-xl text-left">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-[0.95] drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]">
              Building India&apos;s Future
            </h2>

            <p className="mt-5 text-white text-base md:text-lg leading-relaxed max-w-lg drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
              Premium TMT bars and structural steel solutions engineered for
              strength, durability, and trust in every project.
            </p>

            <button className="mt-8 px-8 py-4 bg-[#f4c400] text-black font-bold text-sm md:text-lg uppercase tracking-wider rounded-sm shadow-[0_0_20px_rgba(244,196,0,0.22)] hover:scale-105 transition duration-300">
              Explore Our Products
            </button>
          </div>
        </div>

        {/* Certificates Bottom */}
        <div className="absolute bottom-4 left-0 w-full z-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="w-full rounded-2xl border border-white/10 bg-black/50 backdrop-blur-sm px-4 md:px-6 py-4 md:py-5 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-[#f4c400] text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">
                    Certifications
                  </p>
                  <p className="text-white/80 text-xs md:text-sm mt-1">
                    Certified quality and trusted manufacturing standards
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  {certificates.map((certificate, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center bg-white rounded-xl px-4 py-3 min-w-[100px] md:min-w-[130px] h-[70px] md:h-[84px] shadow-lg"
                    >
                      <Image
                        src={certificate.src}
                        alt={certificate.alt}
                        width={110}
                        height={55}
                        className="object-contain max-h-[50px] md:max-h-[60px] w-auto"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
