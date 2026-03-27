"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Products", href: "/products" },
  { name: "Projects", href: "/projects" },
  { name: "Contact Us", href: "/contact-us" },
];

const mediaSupportLinks = [
  { name: "Photo Gallery", href: "/photo-gallery" },
  { name: "Photo / Video / Project Gallery", href: "/photo-video-project-gallery" },
  { name: "Construction Steel Calculator", href: "/construction-steel-calculator" },
  { name: "Weight & Bundle Calculator", href: "/weight-bundle-calculator" },
  { name: "Media & Events", href: "/media-events" },
  { name: "Find Dealers", href: "/dealers" },
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Certifications", href: "/certifications" },
  { name: "Product Brochure", href: "/product-brochure" },
  { name: "Product Other Enquiry", href: "/product-enquiry" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pagesMenuOpen, setPagesMenuOpen] = useState(false);
  const pagesMenuRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      // Header becomes solid after scrolling down 50px
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!pagesMenuRef.current) return;

      if (!pagesMenuRef.current.contains(event.target as Node)) {
        setPagesMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isTransparentHeader = isHomePage && !scrolled;

  const headerBg = isTransparentHeader
    ? "bg-transparent py-6"
    : "bg-white shadow-sm py-4 border-b border-gray-200";

  const currentLogo = isTransparentHeader ? "/logo3.png" : "/logo3.png";

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center z-50 transition-transform hover:scale-105"
        >
          <Image
            src={currentLogo}
            alt="Kaaveri TMT Bars & Structural"
            width={200}
            height={56}
            className="h-10 md:h-14 w-auto object-contain transition-all duration-500"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-body text-[10px] uppercase tracking-[0.18em] transition-colors font-semibold pb-1 border-b-2 border-transparent ${
                isTransparentHeader
                  ? "text-white/90 hover:text-white hover:border-white"
                  : "text-black hover:text-accent-red hover:border-accent-red"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="relative" ref={pagesMenuRef}>
            <button
              className={`relative font-body text-[10px] uppercase tracking-[0.18em] font-semibold transition-colors ${
                isTransparentHeader ? "text-white/90 hover:text-white" : "text-black hover:text-accent-red"
              }`}
              onClick={() => setPagesMenuOpen((prev) => !prev)}
              aria-expanded={pagesMenuOpen}
              aria-haspopup="menu"
              type="button"
            >
              MEDIA & SUPPORT{" "}
              <span className={`${pagesMenuOpen ? "inline-block rotate-180" : "inline-block"} transition-transform`}>▾</span>
            </button>
            <div
              className={`absolute right-0 top-full mt-1 w-[360px] max-h-[65vh] overflow-y-auto scroll-smooth bg-white border border-gray-200 shadow-[0_18px_40px_rgba(0,0,0,0.14)] p-4 z-50 rounded-md transition-all duration-200 ${
                pagesMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
              role="menu"
            >
              <div className="mb-3 px-1">
                <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-black/50">Media & Support Pages</p>
              </div>
              <div className="flex flex-col">
                {mediaSupportLinks.map((page, index) => (
                  <Link
                      key={page.href + page.name}
                      href={page.href}
                      onClick={() => setPagesMenuOpen(false)}
                      className={`px-2 py-2 text-[15px] text-black hover:text-accent-red transition-colors ${index < mediaSupportLinks.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/careers"
            className={`font-body text-[10px] uppercase tracking-[0.18em] transition-colors font-semibold pb-1 border-b-2 border-transparent ${
              isTransparentHeader
                ? "text-white/90 hover:text-white hover:border-white"
                : "text-black hover:text-accent-red hover:border-accent-red"
            }`}
          >
            Careers
          </Link>

          <Link href="/product-enquiry" className="ml-2 relative px-5 py-2.5 bg-accent-red text-white font-body text-[10px] uppercase tracking-[0.2em] font-bold overflow-hidden group border-2 border-accent-red">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-accent-red">
              Request Quote
            </span>
            <div className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
          </Link>
        </nav>

        <button
          className={`lg:hidden z-50 w-8 h-8 flex flex-col justify-center items-end gap-1 ${
            isTransparentHeader ? "text-white" : "text-black"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[2px] transition-all duration-300 ${
              isTransparentHeader ? "bg-white" : "bg-black"
            } ${mobileMenuOpen ? "w-5 rotate-45 translate-y-[6px]" : "w-6"}`}
          />
          <span
            className={`block h-[2px] transition-all duration-300 ${
              isTransparentHeader ? "bg-white" : "bg-black"
            } ${mobileMenuOpen ? "opacity-0 w-5" : "w-5"}`}
          />
          <span
            className={`block h-[2px] transition-all duration-300 ${
              isTransparentHeader ? "bg-white" : "bg-black"
            } ${mobileMenuOpen ? "w-5 -rotate-45 -translate-y-[6px]" : "w-3"}`}
          />
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
              animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center p-8"
            >
              <div className="w-full max-w-md space-y-6 max-h-[78vh] overflow-y-auto px-2">
                {[{ title: "Main Pages", links: [...navLinks, { name: "Careers", href: "/careers" }] }, { title: "Media & Support", links: mediaSupportLinks }].map((category, groupIndex) => (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + groupIndex * 0.1 }}
                    className="bg-white p-2"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-black/50 mb-3">{category.title}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {category.links.map((link) => (
                        <Link
                          key={`${category.title}-${link.href}`}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg text-black"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
