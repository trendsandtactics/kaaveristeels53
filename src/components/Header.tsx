"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

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
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;
      if (!dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const transparent = pathname === "/" && !scrolled;
  const headerClass = transparent
    ? "bg-transparent py-6"
    : "bg-white shadow-sm py-4 border-b border-gray-200";

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${headerClass}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center z-50 transition-transform hover:scale-105">
          <Image
            src="/logo3.png"
            alt="Kaaveri TMT Bars & Structural"
            width={200}
            height={56}
            className="h-10 md:h-14 w-auto object-contain transition-all duration-500"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-body text-[10px] uppercase tracking-[0.18em] font-semibold pb-1 border-b-2 border-transparent transition-colors ${
                transparent
                  ? "text-white/90 hover:text-white hover:border-white"
                  : "text-black hover:text-accent-red hover:border-accent-red"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              className={`font-body text-[10px] uppercase tracking-[0.18em] font-semibold transition-colors ${
                transparent ? "text-white/90 hover:text-white" : "text-black hover:text-accent-red"
              }`}
            >
              MEDIA & SUPPORT <span className={dropdownOpen ? "inline-block rotate-180" : "inline-block"}>▾</span>
            </button>

            <div
              role="menu"
              className={`absolute right-0 top-full mt-1 w-[360px] max-h-[65vh] overflow-y-auto scroll-smooth bg-white border border-gray-200 shadow-[0_18px_40px_rgba(0,0,0,0.14)] p-4 rounded-md transition-all duration-200 ${
                dropdownOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <p className="mb-3 px-1 text-[11px] font-bold tracking-[0.25em] uppercase text-black/50">Media & Support Pages</p>
              <div className="flex flex-col">
                {mediaSupportLinks.map((page, index) => (
                  <Link
                    key={`${page.href}-${page.name}`}
                    href={page.href}
                    onClick={() => setDropdownOpen(false)}
                    className={`px-2 py-2 text-[15px] text-black hover:text-accent-red transition-colors ${
                      index < mediaSupportLinks.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    {page.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/careers"
            className={`font-body text-[10px] uppercase tracking-[0.18em] font-semibold pb-1 border-b-2 border-transparent transition-colors ${
              transparent
                ? "text-white/90 hover:text-white hover:border-white"
                : "text-black hover:text-accent-red hover:border-accent-red"
            }`}
          >
            Careers
          </Link>

          <Link
            href="/product-enquiry"
            className="ml-2 relative px-5 py-2.5 bg-accent-red text-white font-body text-[10px] uppercase tracking-[0.2em] font-bold overflow-hidden group border-2 border-accent-red"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-accent-red">Request Quote</span>
            <span className="absolute inset-0 bg-white transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 z-0" />
          </Link>
        </nav>

        <button
          className={`lg:hidden z-50 w-8 h-8 flex flex-col justify-center items-end gap-1 ${transparent ? "text-white" : "text-black"}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block h-[2px] ${transparent ? "bg-white" : "bg-black"} ${mobileMenuOpen ? "w-5 rotate-45 translate-y-[6px]" : "w-6"}`} />
          <span className={`block h-[2px] ${transparent ? "bg-white" : "bg-black"} ${mobileMenuOpen ? "opacity-0 w-5" : "w-5"}`} />
          <span className={`block h-[2px] ${transparent ? "bg-white" : "bg-black"} ${mobileMenuOpen ? "w-5 -rotate-45 -translate-y-[6px]" : "w-3"}`} />
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
                {[{ title: "Main Pages", links: [...navLinks, { name: "Careers", href: "/careers" }] }, { title: "Media & Support", links: mediaSupportLinks }].map((category) => (
                  <div key={category.title} className="bg-white p-2">
                    <p className="text-xs uppercase tracking-[0.2em] font-bold text-black/50 mb-3">{category.title}</p>
                    <div className="grid grid-cols-1 gap-3">
                      {category.links.map((link) => (
                        <Link
                          key={`${category.title}-${link.href}-${link.name}`}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-lg text-black"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/careers" className={desktopLinkClass}>
              Careers
            </Link>

            <Link
              href="/product-enquiry"
              className="ml-2 relative flex items-center justify-center h-[42px] px-6 bg-accent-red text-white font-body text-[11px] uppercase tracking-[0.15em] font-bold overflow-hidden group border-2 border-accent-red shrink-0"
            >
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
            type="button"
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
                  {[
                    {
                      title: "Main Pages",
                      links: [...navLinks, { name: "Careers", href: "/careers" }],
                    },
                    {
                      title: "Media & Support",
                      links: mediaSupportLinks,
                    },
                  ].map((category, groupIndex) => (
                    <motion.div
                      key={category.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + groupIndex * 0.1 }}
                      className="bg-white p-2"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] font-bold text-black/50 mb-3">
                        {category.title}
                      </p>
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
      </div>
    </header>
  );
}
