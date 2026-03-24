"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Product, ProductCategory } from "../types/pocketbase";
import { getPbImageUrl } from "../utils/pocketbase";
import { Shield, Settings, CheckCircle, Leaf, Truck } from "lucide-react";

interface ProductsClientProps {
    categories: ProductCategory[];
    products: Product[];
}

export default function ProductsClient({ categories, products }: ProductsClientProps) {
    const [activeTab, setActiveTab] = useState<string>(categories[0]?.id || "all");

    const filteredProducts = activeTab === "all" 
        ? products 
        : products.filter(p => p.category === activeTab);

    const structuralTypes = [
        "Round Bars", "Square Bars", "Flats", "Angles", "C Channels", 
        "I Beams", "Pipes", "Rectangular Tubes", "Square Tubes"
    ];

    const tmtSizes = ["8mm", "10mm", "12mm", "16mm", "20mm", "25mm", "32mm"];
    const tmtGrades = ["Fe 500", "Fe 500D", "Fe 550", "Fe 550D", "Fe 600", "CRS"];

    return (
        <div className="w-full bg-white">
            
            {/* 1. Category Overview Tabs */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
                <div className="flex flex-col items-center text-center mb-12">
                    <h2 className="font-body text-accent-red uppercase tracking-[0.2em] font-bold text-sm mb-4">
                        Our Portfolio
                    </h2>
                    <h3 className="font-heading text-4xl md:text-5xl text-black font-extrabold mb-8">
                        Explore Our Categories
                    </h3>
                    
                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`px-6 py-3 rounded-sm font-body text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
                                activeTab === "all"
                                    ? "bg-accent-red text-white border-accent-red"
                                    : "bg-white text-black/60 border-black/10 hover:border-accent-red hover:text-accent-red"
                            }`}
                        >
                            All Products
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveTab(cat.id)}
                                className={`px-6 py-3 rounded-sm font-body text-sm font-bold uppercase tracking-widest transition-all duration-300 border ${
                                    activeTab === cat.id
                                        ? "bg-accent-red text-white border-accent-red"
                                        : "bg-white text-black/60 border-black/10 hover:border-accent-red hover:text-accent-red"
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Dynamic Product Listing */}
                <div className="min-h-[400px]">
                    {filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-black/10 bg-black/5 rounded-sm">
                            <Settings className="w-12 h-12 text-black/30 mb-4 animate-spin-slow" />
                            <p className="font-body text-black/60 font-medium text-lg">
                                Products for this category are being updated.
                            </p>
                        </div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4 }}
                                        className="group flex flex-col bg-white border border-gray-100 shadow-xl overflow-hidden rounded-sm hover:shadow-2xl transition-shadow duration-300"
                                    >
                                        <div className="relative w-full h-64 bg-gray-50 overflow-hidden">
                                            {product.image ? (
                                                <Image
                                                    src={getPbImageUrl(product.collectionId, product.id, product.image)}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Settings className="w-10 h-10 text-black/20" />
                                                </div>
                                            )}
                                            {product.isFeatured && (
                                                <div className="absolute top-4 right-4 bg-accent-yellow text-black text-xs font-bold uppercase tracking-widest px-3 py-1 shadow-sm">
                                                    Featured
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-8 flex flex-col flex-grow">
                                            <span className="text-accent-red text-xs font-bold uppercase tracking-widest mb-2 block">
                                                {product.expand?.category?.name || "Product"}
                                            </span>
                                            <h4 className="font-heading text-2xl text-black font-bold mb-3">
                                                {product.title}
                                            </h4>
                                            <p className="font-body text-black/70 mb-6 flex-grow font-medium text-sm leading-relaxed">
                                                {product.shortDescription}
                                            </p>
                                            
                                            <Link href={`/contact-us?product=${product.slug}`} className="inline-flex items-center gap-2 text-accent-red font-bold text-sm uppercase tracking-widest group-hover:text-black transition-colors">
                                                Enquire Now
                                                <span className="transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300">→</span>
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* 3. TMT Bars Detailed Section */}
            <section className="w-full bg-[#f8f9fa] py-20 px-6 md:px-12 border-t border-black/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-20 items-center">
                    <div className="w-full md:w-1/2">
                        <h2 className="font-body text-accent-red uppercase tracking-[0.2em] font-bold text-sm mb-4">
                            Flagship Product
                        </h2>
                        <h3 className="font-heading text-4xl md:text-5xl text-black font-extrabold mb-6">
                            KAAVERI TMT Bars
                        </h3>
                        <p className="font-body text-black/70 text-lg leading-relaxed mb-8 font-medium">
                            Engineered with advanced quenching and self-tempering technology, KAAVERI TMT Bars deliver unmatched ductility, bendability, and earthquake resistance. Built to secure your legacy.
                        </p>
                        
                        <div className="mb-8">
                            <h4 className="font-heading text-xl text-black font-bold mb-4">Available Sizes</h4>
                            <div className="flex flex-wrap gap-2">
                                {tmtSizes.map(size => (
                                    <span key={size} className="bg-white border border-black/10 text-black px-4 py-2 text-sm font-bold shadow-sm rounded-sm">{size}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="font-heading text-xl text-black font-bold mb-4">Available Grades</h4>
                            <div className="flex flex-wrap gap-2">
                                {tmtGrades.map(grade => (
                                    <span key={grade} className="bg-black text-white px-4 py-2 text-sm font-bold shadow-sm rounded-sm">{grade}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 relative h-[500px] rounded-sm overflow-hidden shadow-2xl">
                        <Image src="/tmtbar1.png" alt="TMT Bars" fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="absolute bottom-8 left-8 right-8">
                            <p className="text-white text-xl font-heading font-bold">The Backbone of Modern Construction</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Structural Steel Detailed Section */}
            <section className="w-full bg-white py-20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="font-body text-accent-red uppercase tracking-[0.2em] font-bold text-sm mb-4">
                        Versatile Solutions
                    </h2>
                    <h3 className="font-heading text-4xl md:text-5xl text-black font-extrabold mb-12">
                        Structural Steel Range
                    </h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {structuralTypes.map((type, i) => (
                            <div key={i} className="flex flex-col items-center justify-center p-6 bg-gray-50 border border-gray-100 rounded-sm hover:border-accent-red transition-colors duration-300 group">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:bg-accent-red group-hover:text-white transition-colors duration-300">
                                    <Settings size={20} />
                                </div>
                                <span className="font-body font-bold text-black/80 text-sm">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Why Choose KAAVERI Section */}
            <section className="w-full bg-black py-20 px-6 md:px-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-red/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h3 className="font-heading text-4xl md:text-5xl font-extrabold mb-4">Why Choose KAAVERI?</h3>
                        <p className="font-body text-white/70 max-w-2xl mx-auto text-lg">Uncompromising standards at every step of the manufacturing process.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Shield, title: "Maximum Strength", desc: "Highest load-bearing capacity for heavy-duty mega structures." },
                            { icon: CheckCircle, title: "Quality Control", desc: "Rigorous testing protocols ensuring BIS and international standards." },
                            { icon: Truck, title: "Reliable Supply", desc: "Vast distribution network for timely deliveries across the nation." },
                            { icon: Leaf, title: "Green Steel", desc: "Officially certified eco-friendly manufacturing practices." },
                        ].map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-sm hover:bg-white/10 transition-colors">
                                    <Icon className="w-10 h-10 text-accent-red mb-6" />
                                    <h4 className="font-heading text-xl font-bold mb-3">{feature.title}</h4>
                                    <p className="font-body text-white/60 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 6. Enquiry CTA */}
            <section className="w-full bg-accent-yellow py-16 px-6 md:px-12">
                <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
                    <h3 className="font-heading text-3xl md:text-5xl text-black font-extrabold mb-6">
                        Ready to Build the Future?
                    </h3>
                    <p className="font-body text-black/80 font-medium text-lg mb-8 max-w-2xl">
                        Get in touch with our experts to find the right steel solutions for your specific project requirements.
                    </p>
                    <Link href="/contact-us">
                        <button className="px-10 py-4 bg-black text-white font-body text-sm uppercase tracking-[0.2em] font-bold hover:bg-accent-red transition-colors duration-300 shadow-xl rounded-sm">
                            Request a Quote
                        </button>
                    </Link>
                </div>
            </section>

        </div>
    );
}