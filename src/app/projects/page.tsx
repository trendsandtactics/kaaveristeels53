import React from "react";
import Link from "next/link";
import { Home, Building2, Factory, Compass } from "lucide-react";

export const metadata = {
    title: "Projects | KAAVERI TMT Bars & Structural",
    description: "Explore how KAAVERI supports landmark constructions across residential, commercial, industrial, and infrastructure sectors.",
};

export default function ProjectsPage() {
    const segments = [
        { icon: Home, title: "Residential Construction" },
        { icon: Building2, title: "Commercial Buildings" },
        { icon: Factory, title: "Industrial Projects" },
        { icon: Compass, title: "Infrastructure Projects" }
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
                            Projects
                        </h1>
                        <div className="w-12 h-[2px] bg-black" />
                    </div>
                    <h2 className="font-heading text-5xl md:text-7xl mb-6 text-black font-extrabold drop-shadow-md">
                        Supporting Landmark Construction with <span className="text-black/70">Trusted Steel</span>
                    </h2>
                </div>
            </div>

            {/* Main Content Section */}
            <section className="max-w-4xl mx-auto px-6 md:px-12 py-24 text-center">
                <h2 className="font-body text-accent-red uppercase tracking-[0.2em] font-bold text-sm mb-4">
                    Proven Legacy
                </h2>
                <h3 className="font-heading text-4xl md:text-5xl text-black font-extrabold mb-8">
                    Steel That Powers Progress
                </h3>
                <p className="font-body text-black/70 text-xl leading-relaxed font-medium">
                    KAAVERI products are trusted across residential, commercial, industrial, and infrastructure projects for their uncompromising strength, durability, and consistency. We are the backbone of structures that shape tomorrow.
                </p>
            </section>

            {/* Segments Grid */}
            <section className="w-full bg-[#f8f9fa] py-24 px-6 md:px-12 border-t border-black/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {segments.map((segment, i) => {
                            const Icon = segment.icon;
                            return (
                                <div key={i} className="flex flex-col items-center text-center p-10 bg-white border border-gray-100 rounded-sm shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-accent-red transition-colors duration-300">
                                        <Icon className="w-10 h-10 text-black group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h4 className="font-heading text-xl font-bold text-black group-hover:text-accent-red transition-colors">
                                        {segment.title}
                                    </h4>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-black py-20 px-6 md:px-12 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-red/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h3 className="font-heading text-4xl md:text-5xl font-extrabold mb-6">
                        Start Your Next Project
                    </h3>
                    <p className="font-body text-white/70 text-lg mb-10">
                        Let our experts provide the perfect steel foundation for your vision.
                    </p>
                    <Link href="/contact-us">
                        <button className="px-10 py-4 bg-accent-red text-white font-body text-sm uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-colors duration-300 shadow-xl rounded-sm">
                            Contact Us
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
