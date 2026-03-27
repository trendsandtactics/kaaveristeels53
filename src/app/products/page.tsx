import React from "react";
import ProductsClient from "@/components/ProductsClient";

// Generate Dynamic Metadata
export async function generateMetadata() {
    return {
        title: "Our Products | KAAVERI TMT Bars & Structural",
        description: "Explore KAAVERI's range of premium TMT bars, structural steel, and billets.",
    };
}

export default async function ProductsPage() {
    // Hardcoded initial data
    const categories = [
        {
            id: "tmt-bars",
            name: "TMT Bars",
        },
        {
            id: "structural-steel",
            name: "Structural Steel",
        },
        {
            id: "billets",
            name: "Billets",
        }
    ];

    const products = [
        {
            id: "1",
            title: "KAAVERI Fe 550D TMT Bars",
            slug: "kaaveri-fe-550d",
            category: "tmt-bars",
            shortDescription: "Premium grade TMT bars offering superior ductility and high tensile strength.",
            image: "/tmtbar1.png",
            isFeatured: true,
            expand: { category: categories[0] }
        },
        {
            id: "2",
            title: "KAAVERI Heavy I-Beams",
            slug: "kaaveri-i-beams",
            category: "structural-steel",
            shortDescription: "Exceptional load-bearing capacity for major infrastructural projects.",
            image: "/structuralbar 1.png",
            isFeatured: true,
            expand: { category: categories[1] }
        }
    ];

    return (
        <main className="flex min-h-screen flex-col w-full relative pt-24 bg-background">
            
            {/* Hero Section */}
            <div className="w-full py-24 md:py-32 bg-gradient-to-r from-accent-yellow via-[#FFD700] to-accent-yellow text-black relative overflow-hidden shadow-2xl">
                {/* Subtle Textures */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_60%)] pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-overlay opacity-30" />

                <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-black" />
                        <h1 className="font-body uppercase tracking-[0.2em] font-bold text-sm text-black">
                            Our Products
                        </h1>
                        <div className="w-12 h-[2px] bg-black" />
                    </div>

                    <h2 className="font-heading text-5xl md:text-7xl mb-6 text-black font-extrabold drop-shadow-md">
                        Masterpieces of <span className="text-black/70">Steel</span>
                    </h2>
                    <p className="font-body text-black/80 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        Engineered to perfection, our diverse range of high-quality TMT bars and structural steel products form the resilient core of iconic structures worldwide.
                    </p>
                </div>
            </div>

            {/* Interactive Products Section */}
            <ProductsClient categories={categories} products={products} />
        </main>
    );
}
