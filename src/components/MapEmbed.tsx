"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, Factory } from "lucide-react";

const locations = [
  {
    title: "Office Address",
    icon: Building2,
    label: "Corporate Office",
    address: [
      "No-1, Shyam’s Court,",
      "16/19 Judge Jambulingam Street,",
      "Mylapore, Chennai - 600004",
    ],
    map: "https://maps.google.com/maps?q=No-1%20Shyams%20Court%20Judge%20Jambulingam%20Street%20Mylapore%20Chennai%20600004&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  {
    title: "Unit 1",
    icon: Factory,
    label: "Manufacturing Facility",
    address: [
      "No.7/1 & 4/3, Komal Road, Maruthur Village,",
      "Therizhandur Post, Kuttalam Taluk,",
      "Mayiladuthurai District - 609 808",
    ],
    map: "https://maps.google.com/maps?q=Komal%20Road%20Maruthur%20Village%20Therizhandur%20Mayiladuthurai%20609808&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
  {
    title: "Unit 2",
    icon: Factory,
    label: "Manufacturing Facility",
    address: [
      "S.F.No: 22/1A, Musiri – Thuraiyur Main Road,",
      "Jambunathapuram Post, Musiri Taluk,",
      "Trichy – 621 205",
    ],
    map: "https://maps.google.com/maps?q=Musiri%20Thuraiyur%20Main%20Road%20Jambunathapuram%20Trichy%20621205&t=&z=14&ie=UTF8&iwloc=&output=embed",
  },
];

export default function MapEmbed() {
  return (
    <section className="relative w-full py-20 md:py-28 px-6 md:px-12 bg-gradient-to-b from-white to-[#f8f8f8] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-14 md:mb-20"
        >
          <p className="text-sm md:text-base uppercase tracking-[0.28em] text-accent-red font-semibold">
            Our Locations
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-heading font-bold text-black leading-tight">
            Visit Our Office & Manufacturing Units
          </h2>
          <p className="mt-5 text-base md:text-lg text-black/65 leading-relaxed">
            Explore our corporate office and production facilities across Tamil
            Nadu, built to serve clients with trusted steel solutions and strong
            infrastructure support.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-10 md:space-y-14">
          {locations.map((loc, index) => {
            const Icon = loc.icon;
            const isReverse = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`group grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] ${
                  isReverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Content */}
                <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-14 bg-white">
                  <div className="inline-flex items-center gap-3 mb-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-red/10 text-accent-red">
                      <Icon size={22} />
                    </div>
                    <span className="rounded-full bg-black/5 px-4 py-2 text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-black/60">
                      {loc.label}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-black mb-6">
                    {loc.title}
                  </h3>

                  <div className="space-y-3 text-black/70 text-lg leading-relaxed">
                    {loc.address.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-3 text-accent-red font-semibold">
                    <MapPin size={18} />
                    <span className="text-sm md:text-base">
                      Find us on Google Maps
                    </span>
                  </div>

                  <div className="mt-8 h-[3px] w-24 rounded-full bg-accent-yellow" />
                </div>

                {/* Map */}
                <div className="relative min-h-[320px] md:min-h-[420px] bg-[#f3f3f3]">
                  <div className="absolute inset-0">
                    <iframe
                      src={loc.map}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full"
                    />
                  </div>

                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/8" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
