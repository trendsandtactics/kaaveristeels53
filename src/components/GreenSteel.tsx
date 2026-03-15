"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function GreenSteel() {
    return (
        <section className="relative w-full bg-[#f8f9fa] py-16 md:py-20 overflow-hidden flex items-center justify-center min-h-[60vh]">
            {/* Content Container */}
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">

                {/* Left Side: Typography and Info */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full md:w-[60%] flex flex-col items-start relative z-20 pr-8"
                >
                    <div className="flex items-center gap-6 mb-8">
                        {/* Ministry of Steel Logo */}
                        <div className="relative w-24 h-16 md:w-32 md:h-20">
                            <Image
                                src="/Green.jpg"
                                alt="Ministry of Steel India"
                                fill
                                className="object-contain"
                            />
                        </div>

                        <div className="h-8 md:h-12 w-[2px] bg-gray-300" />

                        {/* KAAVERI Logo */}
                        <div className="relative w-40 h-12 md:w-56 md:h-16">
                            <Image
                                src="/image/kaaveriwbg.png"
                                alt="KAAVERI TMT Bars & Structural"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Main Headline */}
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[0.9] font-black uppercase text-gray-800 mb-2">
                        Officially
                    </h2>
                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[0.9] font-black uppercase text-[#3b8226] mb-6">
                        Certified
                    </h2>

                    <h3 className="font-body text-xl md:text-2xl font-medium text-gray-800 mb-4 leading-tight w-full">
                        Kaaveri Tmt Bars Officially Certified As<br /> Green Steel
                    </h3>

                    {/* 5 Stars */}
                    <div className="flex gap-1 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} className="w-5 h-5 text-[#caa74a]" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>

                    {/* Description Paragraph */}
                    <p className="font-body text-gray-600 text-sm md:text-base leading-relaxed w-full mb-6">
                        5-Star Rated Green TMT Bars with verified low carbon emissions. Committed to building eco-friendly structures and a sustainable future for India.
                    </p>

                    <p className="font-body text-gray-800 text-sm md:text-base leading-relaxed w-full mb-8">
                        Thank you for trusting Kaaveri Together,<br /> we build responsibly.
                    </p>

                    {/* Removed Website Address */}

                </motion.div>

                {/* Right Side: Tree Imagery */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="w-full md:w-[40%] relative h-[500px] z-10 hidden md:flex items-center justify-center overflow-hidden rounded-l-[100px]"
                >
                    {/* Placeholder for actual tree image */}
                    <div className="absolute inset-0 bg-[#2d6a1b]/10 mix-blend-multiply z-10"></div>
                    <Image
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000"
                        alt="Green Sustainability Trees"
                        fill
                        className="object-cover"
                        unoptimized
                    />
                </motion.div>

            </div>
        </section>
    );
}
