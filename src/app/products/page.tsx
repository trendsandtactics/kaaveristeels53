import React from "react";
import { getProductCategories, getProducts, getProductsPageContent } from "@/components/pocketbase";
import ProductsClient from "@/components/ProductsClient";

// Generate Dynamic Metadata from PocketBase
export async function generateMetadata() {
    const content = await getProductsPageContent();
    return {
        title: content?.seoTitle || "Our Products | KAAVERI TMT Bars & Structural",
        description: content?.seoDescription || "Explore KAAVERI's range of premium TMT bars, structural steel, and billets.",
    };
}

export default async function ProductsPage() {
    // Fetch data asynchronously on the server
    const [categories, products] = await Promise.all([
        getProductCategories(),
        getProducts()
    ]);

    return (
        <main className="flex min-h-screen flex-col w-full relative pt-24 bg-background">
            
            {/* Hero Section */}
            <div className="w-full py-24 md:py-32 bg-[#0a0a0a] text-white relative overflow-hidden shadow-2xl">
                {/* Subtle Textures */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-30" />

                <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-accent-red" />
                        <h1 className="font-body uppercase tracking-[0.2em] font-bold text-sm text-white">
                            Our Products
                        </h1>
                        <div className="w-12 h-[2px] bg-accent-red" />
                    </div>

                    <h2 className="font-heading text-5xl md:text-7xl mb-6 text-white font-extrabold drop-shadow-md">
                        Masterpieces of <span className="text-accent-red">Steel</span>
                    </h2>
                    <p className="font-body text-white/70 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                        Engineered to perfection, our diverse range of high-quality TMT bars and structural steel products form the resilient core of iconic structures worldwide.
                    </p>
                </div>
            </div>

            {/* Interactive Products Section */}
            <ProductsClient categories={categories} products={products} />
        </main>
    );
}