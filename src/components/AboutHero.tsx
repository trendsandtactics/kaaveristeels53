"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function AboutHero() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const heroRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const video = videoRef.current;
        const hero = heroRef.current;

        if (!video || !hero) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                            observer.disconnect();
                }
            },
            {
                threshold: 0.7,
            }
        );

        observer.observe(hero);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className="w-full bg-white">

            {/* ================= HERO VIDEO SECTION ================= */}
            <section
                ref={heroRef}
                className="relative w-full min-h-[90vh] overflow-hidden shadow-sm"
            >
                {/* VIDEO */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src="/video/about.mp4"
                    muted
                    playsInline
                    preload="metadata"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/45 z-[1]" />

                {/* Gradient + grid */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_60%)] pointer-events-none z-[2]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-[2] opacity-30" />

                {/* Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20 text-center">
                    <h2 className="font-body text-white uppercase tracking-[0.2em] font-bold text-sm mb-4">
                        About Us
                    </h2>

                    <h1 className="font-heading text-5xl md:text-7xl text-white mb-8 leading-tight font-extrabold">
                        Welcome to <span className="font-extrabold">KAAVERI</span>
                        <br />
                        <span className="text-white font-extrabold text-4xl md:text-5xl block mt-2">
                            TMT & STRUCTURAL
                        </span>
                    </h1>

                    <p className="font-body text-white/90 text-lg md:text-xl leading-relaxed font-medium max-w-3xl mx-auto">
                        At KAAVERI, we are passionate about steel and dedicated to excellence. 
                        Our company is a leading manufacturer of TMT bars and structural steel products, 
                        committed to providing the construction industry with the highest quality materials 
                        that ensure strength, safety, and sustainability.
                    </p>
                </div>
            </section>

            {/* ================= CONTENT SECTION ================= */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10 bg-white">

                {/* ================= MISSION ================= */}
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-24">
                    
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] rounded-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-accent-red/10 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
                        <Image
                            src="/image/about1.png"
                            alt="Industrial Teamwork"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <h2 className="font-body text-black uppercase tracking-[0.2em] font-bold text-sm mb-4">
                            Our Mission
                        </h2>

                        <h3 className="font-heading text-4xl md:text-5xl text-black mb-6 leading-tight drop-shadow-sm font-extrabold">
                            Building a Stronger, Sustainable Future
                        </h3>

                        <p className="font-body text-black/80 text-lg leading-relaxed mix-blend-multiply font-medium">
                            At KAAVERI, our mission is to manufacture and supply superior TMT bars 
                            and structural steel products that contribute to the safety, durability, 
                            and sustainability of construction projects worldwide. We are dedicated 
                            to maintaining the highest standards of quality in all our products, ensuring 
                            they meet the rigorous demands of the construction industry. By leveraging 
                            advanced technology and innovative manufacturing processes, we strive to 
                            provide cost-effective and reliable steel solutions that support the growth 
                            and development of communities, ensuring that every structure built with 
                            our products stands strong and secure.
                        </p>
                    </div>
                </div>

                {/* ================= VISION ================= */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                    
                    <div className="w-full md:w-1/2 relative h-[400px] md:h-[500px] rounded-sm overflow-hidden group">
                        <div className="absolute inset-0 bg-accent-yellow/20 z-10 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500"></div>
                        <Image
                            src="/image/about2.png"
                            alt="Industrial Factory"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <h2 className="font-body text-black uppercase tracking-[0.2em] font-bold text-sm mb-4">
                            Vision
                        </h2>

                        <h3 className="font-heading text-4xl md:text-5xl text-black mb-6 leading-tight drop-shadow-sm font-extrabold">
                            Leading the Steel Industry with Quality, Innovation, and Trust
                        </h3>

                        <p className="font-body text-black/80 text-lg leading-relaxed font-medium">
                            Our vision is to be the most trusted and respected manufacturer in the 
                            steel industry, renowned for our unwavering commitment to quality, 
                            innovation, and customer satisfaction. We aim to set new standards in 
                            steel manufacturing by embracing cutting-edge technology, promoting 
                            sustainable practices, and continuously exceeding the expectations of 
                            our customers, thereby contributing to the construction of a safer, 
                            more sustainable world.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}
