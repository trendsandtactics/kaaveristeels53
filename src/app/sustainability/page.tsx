import React from "react";
import Link from "next/link";
import { Leaf, Wind, Recycle, CheckSquare } from "lucide-react";

export const metadata = {
    title: "Sustainability | KAAVERI TMT Bars & Structural",
    description: "Learn about KAAVERI's commitment to building a greener future with responsible and eco-friendly steel production.",
};

export default function SustainabilityPage() {
    const keyPoints = [
        { icon: Wind, title: "Energy Efficiency", desc: "Optimizing power consumption across all major manufacturing units." },
        { icon: Leaf, title: "Low Carbon Emissions", desc: "Implementing advanced filtering to significantly reduce our carbon footprint." },
        { icon: Recycle, title: "Waste Management", desc: "Maximizing material reuse and safe disposal of industrial byproducts." },
        { icon: CheckSquare, title: "Responsible Sourcing", desc: "Ensuring our raw materials meet strict environmental and ethical standards." }
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
                            Sustainability
                        </h1>
                        <div className="w-12 h-[2px] bg-black" />
                    </div>
                    <h2 className="font-heading text-5xl md:text-7xl mb-6 text-black font-extrabold drop-shadow-md">
                        Building a Greener Future with <span className="text-black/70">Responsible Steel</span>
                    </h2>
                </div>
            </div>

            {/* Main Content Section */}
            <section className="max-w-4xl mx-auto px-6 md:px-12 py-24 text-center">
                <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-8">
                    <Leaf className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-heading text-4xl md:text-5xl text-black font-extrabold mb-8">
                    Our Green Steel Initiative
                </h3>
                <p className="font-body text-black/70 text-xl leading-relaxed font-medium">
                    At KAAVERI, sustainability is at the core of our manufacturing philosophy. We recognize our responsibility to the planet and continuously innovate to ensure reduced carbon emissions and eco-friendly production methods, securing the environment for future generations.
                </p>
            </section>

            {/* Key Points Grid */}
            <section className="w-full bg-[#f8f9fa] py-24 px-6 md:px-12 border-t border-black/5">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {keyPoints.map((point, i) => {
                            const Icon = point.icon;
                            return (
                                <div key={i} className="bg-white p-8 border-t-4 border-green-600 shadow-xl rounded-sm hover:shadow-2xl transition-shadow duration-300 group text-center">
                                    <div className="mx-auto w-16 h-16 flex items-center justify-center mb-6">
                                        <Icon className="w-12 h-12 text-green-600 group-hover:scale-110 transition-transform duration-300" />
                                    </div>
                                    <h4 className="font-heading text-xl text-black font-bold mb-3">{point.title}</h4>
                                    <p className="font-body text-black/70 text-sm leading-relaxed">{point.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-black py-20 px-6 md:px-12 text-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-green-600/20 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="max-w-3xl mx-auto text-center relative z-10">
                    <h3 className="font-heading text-4xl md:text-5xl font-extrabold mb-6">
                        Join Us in Building Sustainably
                    </h3>
                    <p className="font-body text-white/70 text-lg mb-10">
                        Discover how our materials can help your next project achieve its environmental goals.
                    </p>
                    <Link href="/about">
                        <button className="px-10 py-4 border-2 border-white text-white font-body text-sm uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-colors duration-300 rounded-sm">
                            Learn More
                        </button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
