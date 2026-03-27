"use client";

import React from "react";
import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BlogsPage() {
    const blogItems = [
        { date: "Oct 12, 2024", title: "The Science behind Fe-550D TMT Bars", category: "Metallurgy", read: "5 Min Read", image: "/image/tmtbars.png" },
        { date: "Nov 02, 2024", title: "Why Ductility Matters in Earthquake Zones", category: "Civil Engineering", read: "8 Min Read", image: "/image/structuralbeams.png" },
        { date: "Dec 15, 2024", title: "KAAVERI Receives Global Green Steel Accreditation", category: "Company News", read: "4 Min Read", image: "/image/certificate.jpg" },
        { date: "Jan 10, 2025", title: "Exploring Next-Gen Quenching Technologies", category: "Technology", read: "6 Min Read", image: "/image/about1.png" },
        { date: "Feb 05, 2025", title: "Building Skyscraper Cores: Best Practices", category: "Construction", read: "7 Min Read", image: "/image/about2.png" },
        { date: "Mar 01, 2025", title: "How to identify Genuine TMT Bars on Site", category: "Quality Guide", read: "5 Min Read", image: "/image/kaaveriabout.png" }
    ];

    return (
        <GenericPlaceholderPage
            title="Latest Insights & News"
            subtitle="Engineering Blog"
            description="Stay updated with the latest technological developments, metallurgical innovations, and corporate news from KAAVERI."
            icon="📰"
            color="accent-yellow"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogItems.map((blog, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                        >
                            <div className="h-48 bg-gray-200 relative overflow-hidden">
                                <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 font-body text-xs font-bold text-white tracking-widest uppercase bg-accent-yellow text-black px-2 py-1">{blog.category}</div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-body text-sm font-bold text-gray-500">{blog.date}</span>
                                    <span className="font-body text-xs font-medium text-gray-400 uppercase tracking-wider">{blog.read}</span>
                                </div>
                                <h3 className="font-heading text-xl md:text-2xl text-black leading-snug group-hover:text-accent-yellow transition-colors mb-4">{blog.title}</h3>
                                <div className="w-8 h-[2px] bg-gray-300 group-hover:bg-accent-yellow transition-colors group-hover:w-16 duration-300" />
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </GenericPlaceholderPage>
    );
}
