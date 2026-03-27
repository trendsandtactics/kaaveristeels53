"use client";

import React, { useState, useEffect } from "react";
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
              className={`relative font-body text-[10px] uppercase tracking-[0.18em] transition-colors group overflow-hidden font-semibold ${
                isTransparentHeader
                  ? "text-white/90 hover:text-white"
                  : "text-black hover:text-accent-red"
              }`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 w-full h-[2px] transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0 ${
                  isTransparentHeader ? "bg-white" : "bg-accent-red"
                }`}
              />
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setPagesMenuOpen(true)}
            onMouseLeave={() => setPagesMenuOpen(false)}
          >
            <button
              className={`font-body text-[10px] uppercase tracking-[0.18em] font-semibold ${
                isTransparentHeader ? "text-white/90 hover:text-white" : "text-black hover:text-accent-red"
              }`}
              type="button"
            >
              All Pages <span className={`${pagesMenuOpen ? "inline-block rotate-180" : "inline-block"} transition-transform`}>▾</span>
            </button>
            {pagesMenuOpen && (
              <div className="absolute right-0 top-full mt-3 w-[420px] max-h-[460px] overflow-y-auto bg-white border border-gray-200 shadow-2xl p-4 z-50 rounded-md">
                <p className="px-2 pb-2 text-[11px] font-bold tracking-[0.2em] uppercase text-black/50">Media & Support Pages</p>
                <div className="grid grid-cols-1 gap-1">
                  {mediaSupportLinks.map((page) => (
                    <Link
                      key={page.href + page.name}
                      href={page.href}
                      className="px-2 py-2 text-sm text-black hover:bg-accent-yellow/20 transition-colors rounded-sm"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link
            href="/careers"
            className={`relative font-body text-[10px] uppercase tracking-[0.18em] transition-colors group overflow-hidden font-semibold ${
              isTransparentHeader
                ? "text-white/90 hover:text-white"
                : "text-black hover:text-accent-red"
            }`}
          >
            Careers
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0 ${
                isTransparentHeader ? "bg-white" : "bg-accent-red"
              }`}
            />
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
                    className="border border-gray-200 bg-white p-4"
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
