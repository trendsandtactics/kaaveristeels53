import React from "react";
import Link from "next/link";
import { Settings, CheckCircle, Users, Truck } from "lucide-react";

export const metadata = {
    title: "Infrastructure | KAAVERI TMT Bars & Structural",
    description: "Discover KAAVERI's advanced manufacturing facilities that power high-capacity, high-quality steel production.",
};

export default function InfrastructurePage() {
    const highlights = [
        {
            icon: Settings,
            title: "Modern Manufacturing Units",
            description: "Equipped with advanced equipment for efficient and consistent steel production.",
        },
        {
            icon: CheckCircle,
            title: "Quality Control Systems",
            description: "Comprehensive testing and inspection processes at every stage of production.",
        },
        {
            icon: Users,
            title: "Skilled Workforce",
            description: "Experienced teams managing production, safety, and technical excellence.",
        },
        {
            icon: Truck,
            title: "Efficient Logistics Support",
            description: "Strong dispatch and handling systems for timely delivery and smooth operations.",
        }
    ];

    return (
        <main className="flex min-h-screen flex-col w-full relative pt-24 bg-background">
            {/* Hero Section */}
            <div className="w-full py-24 md:py-32 bg-gradient-to-r from-accent-yellow via-[#FFD700] to-accent-yellow text-black relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_60%)] pointer-events-none mix-blend-overlay" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-overlay opacity-30" />

                <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="w-12 h-[2px] bg-black" />
                        <h1 className="font-body uppercase tracking-[0.2em] font-bold text-sm text-black">
                            Infrastructure
                        </h1>
                        <div className="w-12 h-[2px] bg-black" />
                    </div>
                    <h2 className="font-heading text-5xl md:text-7xl mb-6 text-black font-extrabold drop-shadow-md">
                        Advanced Facilities That Power <span className="text-black/70">Quality Steel</span>
                    </h2>
                </div>
            </div>

            {/* Main Content Section */}
            <section className="max-w-5xl mx-auto px-6 md:px-12 py-20 text-center">
                <h3 className="font-heading text-4xl md:text-5xl text-black font-extrabold mb-8">
                    Built for Precision. Driven by Technology.
                </h3>
                <div className="font-body text-black/70 text-lg leading-relaxed space-y-6">
                    <p>
                        KAAVERI’s manufacturing infrastructure is designed to support high-capacity, high-quality steel production with complete operational efficiency. Our facilities combine advanced machinery, modern process controls, and skilled manpower to deliver products that meet strict performance standards.
                    </p>
                    <p>
                        With a focus on consistency and precision, we continuously invest in technology and systems that strengthen our production capabilities and ensure reliable output across our product range.
                    </p>
                </div>
            </section>

            {/* Highlights Grid */}
            <section className="w-full bg-[#f8f9fa] py-24 px-6 md:px-12 border-t border-black/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {highlights.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="bg-white p-10 border border-gray-100 shadow-xl rounded-sm hover:shadow-2xl transition-shadow duration-300 group">
                                    <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-sm mb-6 group-hover:bg-accent-red transition-colors duration-300">
                                        <Icon className="w-8 h-8 text-black group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h4 className="font-heading text-2xl text-black font-bold mb-4">{item.title}</h4>
                                    <p className="font-body text-black/70 leading-relaxed font-medium">{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-accent-yellow py-16 px-6 md:px-12 text-center">
                <div className="max-w-3xl mx-auto">
                    <h3 className="font-heading text-3xl md:text-5xl text-black font-extrabold mb-8">
                        Partner with Excellence
                    </h3>
                    <Link href="/request-quote">
                        <button className="px-10 py-4 bg-black text-white font-body text-sm uppercase tracking-[0.2em] font-bold hover:bg-accent-red transition-colors duration-300 shadow-xl rounded-sm">
                            Request Quote
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
