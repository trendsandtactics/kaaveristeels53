"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomeAbout() {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <section className="relative w-full py-16 px-6 md:px-12 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/aboutbackground.png"
          alt="Background Pattern"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          onViewportEnter={() => setPlayVideo(true)}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 relative"
        >
          <div className="relative w-full pb-[65%] bg-black rounded-sm overflow-hidden shadow-2xl">

          {playVideo && (
            <iframe
              src="https://www.youtube.com/embed/OFUDOvewAG8?autoplay=1&mute=0&controls=0&rel=0"
              title="KAAVERI TMT Video"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          )}

            <div className="absolute inset-0 border-8 border-white/20 pointer-events-none z-20" />

          </div>

          {/* Glow Effects */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent-yellow/30 blur-2xl rounded-full z-0" />
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-accent-red/30 blur-2xl rounded-full z-0" />

          <div className="hidden md:block absolute -right-6 -bottom-6 w-full h-full border-2 border-accent-red/20 -z-10 rounded-sm" />
        </motion.div>


        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2 flex flex-col items-start"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-accent-red" />
            <h2 className="font-body text-accent-red uppercase tracking-[0.2em] font-bold text-sm">
              About KAAVERI
            </h2>
          </div>

          <h3 className="font-heading text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            Strength That <br />
            <span className="text-accent-red">Supports The Future</span>
          </h3>

          <p className="font-body text-foreground/80 text-lg leading-relaxed mb-6 font-medium">
            At KAAVERI, we are passionate about steel and dedicated to excellence.
            As a leading manufacturer of TMT bars and structural steel products,
            we are committed to providing the construction industry with the
            highest quality materials that ensure strength, safety, and sustainability.
          </p>

          <p className="font-body text-foreground/80 text-lg leading-relaxed mb-10 font-medium">
            Our state-of-the-art manufacturing processes and rigorous quality control
            ensure that every product leaving our facility meets the highest global
            standards, empowering builders to create structures that stand the test of time.
          </p>

          <Link href="/about-us">
            <button className="relative px-8 py-4 bg-accent-red text-white font-body text-xs md:text-sm uppercase tracking-[0.2em] font-bold overflow-hidden group border-2 border-accent-red shadow-lg">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-accent-red">
                Discover Our Story
              </span>
              <div className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
            </button>
          </Link>

        </motion.div>
      </div>
    </section>
  );
}
