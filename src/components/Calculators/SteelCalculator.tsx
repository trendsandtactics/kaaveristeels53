"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SteelCalculator() {
    const [activeTab, setActiveTab] = useState<"construction" | "weight">("construction");

    // Construction State
    const [structureType, setStructureType] = useState("residential");
    const [area, setArea] = useState("");
    const [floors, setFloors] = useState("1");
    const [estimatedSteel, setEstimatedSteel] = useState<number | null>(null);

    // Weight State
    const [diameter, setDiameter] = useState("8");
    const [length, setLength] = useState("12"); // Standard 12m
    const [quantity, setQuantity] = useState("");
    const [estimatedWeight, setEstimatedWeight] = useState<number | null>(null);
    const [bundleCount, setBundleCount] = useState<number | null>(null);

    const calculateConstruction = () => {
        const multiplier = structureType === "residential" ? 4 : 5;
        const totalArea = Number(area) * Number(floors);
        if (totalArea > 0) {
            setEstimatedSteel(totalArea * multiplier);
        }
    };

    const calculateWeight = () => {
        const d = Number(diameter);
        const l = Number(length);
        const q = Number(quantity);
        if (d > 0 && l > 0 && q > 0) {
            const weightPerBar = (d * d) / 162 * l;
            const totalWeight = weightPerBar * q;
            setEstimatedWeight(totalWeight);

            const barsPerBundle = d <= 10 ? 10 : d <= 16 ? 5 : 3;
            setBundleCount(Math.ceil(q / barsPerBundle));
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-primary border border-white/10 rounded-xl overflow-hidden shadow-2xl relative z-10">
            <div className="flex w-full border-b border-white/10">
                <button
                    className={`flex-1 py-4 text-center font-heading text-[15px] sm:text-lg transition-colors duration-300 ${activeTab === 'construction' ? 'bg-accent-blue/20 text-accent-orange border-b-2 border-accent-orange' : 'text-white/50 hover:text-white/80'}`}
                    onClick={() => setActiveTab("construction")}
                >
                    Construction Steel
                </button>
                <button
                    className={`flex-1 py-4 text-center font-heading text-[15px] sm:text-lg transition-colors duration-300 ${activeTab === 'weight' ? 'bg-accent-blue/20 text-accent-orange border-b-2 border-accent-orange' : 'text-white/50 hover:text-white/80'}`}
                    onClick={() => setActiveTab("weight")}
                >
                    Weight & Bundle
                </button>
            </div>

            <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                    {activeTab === "construction" && (
                        <motion.div key="construction" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 text-white/80">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-xs uppercase tracking-wider mb-2 text-accent-grey font-semibold">Structure Type</label>
                                    <select
                                        className="bg-background border border-white/10 rounded p-4 text-white focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all"
                                        value={structureType} onChange={(e) => setStructureType(e.target.value)}
                                    >
                                        <option value="residential">Residential Building</option>
                                        <option value="commercial">Commercial Complex</option>
                                        <option value="infrastructure">Infrastructure</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs uppercase tracking-wider mb-2 text-accent-grey font-semibold">Built-up Area (sq. ft)</label>
                                    <input
                                        type="number" className="bg-background border border-white/10 rounded p-4 text-white focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all"
                                        placeholder="e.g. 1500" value={area} onChange={(e) => setArea(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col md:col-span-2">
                                    <label className="text-xs uppercase tracking-wider mb-2 text-accent-grey font-semibold">Number of Floors</label>
                                    <input
                                        type="number" className="bg-background border border-white/10 rounded p-4 text-white focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all"
                                        placeholder="e.g. 2" value={floors} onChange={(e) => setFloors(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={calculateConstruction}
                                className="w-full bg-accent-blue text-white py-4 mt-4 rounded-sm font-bold tracking-[0.2em] hover:bg-accent-blue/80 transition-colors uppercase text-sm shadow-lg hover:shadow-xl"
                            >
                                Calculate Requirement
                            </button>

                            {estimatedSteel !== null && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 p-8 bg-background rounded-sm border-l-4 border-accent-orange shadow-inner flex flex-col items-center justify-center">
                                    <div className="text-xs md:text-sm text-accent-grey uppercase tracking-widest mb-3">Estimated Steel Required</div>
                                    <div className="text-5xl font-heading text-white font-semibold">{estimatedSteel.toLocaleString()} <span className="text-2xl text-accent-orange font-body font-normal">kg</span></div>
                                    <div className="text-xs text-white/30 mt-4 max-w-md text-center">*This is an approximate value based on industry standards. Consult a structural engineer for exact requirements.</div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === "weight" && (
                        <motion.div key="weight" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6 text-white/80">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col">
                                    <label className="text-xs uppercase tracking-wider mb-2 text-accent-grey font-semibold">Diameter (mm)</label>
                                    <select
                                        className="bg-background border border-white/10 rounded p-4 text-white focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all"
                                        value={diameter} onChange={(e) => setDiameter(e.target.value)}
                                    >
                                        {[8, 10, 12, 16, 20, 25, 32].map(d => (
                                            <option key={d} value={d}>{d} mm</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs uppercase tracking-wider mb-2 text-accent-grey font-semibold">Length (m)</label>
                                    <input
                                        type="number" className="bg-background border border-white/10 rounded p-4 text-white focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all"
                                        value={length} onChange={(e) => setLength(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-xs uppercase tracking-wider mb-2 text-accent-grey font-semibold">Quantity (Bars)</label>
                                    <input
                                        type="number" className="bg-background border border-white/10 rounded p-4 text-white focus:border-accent-orange focus:ring-1 focus:ring-accent-orange outline-none transition-all"
                                        placeholder="e.g. 100" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={calculateWeight}
                                className="w-full bg-accent-blue text-white py-4 mt-4 rounded-sm font-bold tracking-[0.2em] hover:bg-accent-blue/80 transition-colors uppercase text-sm shadow-lg hover:shadow-xl"
                            >
                                Calculate Weight & Bundles
                            </button>

                            {estimatedWeight !== null && bundleCount !== null && (
                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="p-6 md:p-8 bg-background rounded-sm border-t-2 border-accent-orange/50 text-center shadow-inner">
                                        <div className="text-xs md:text-sm text-accent-grey uppercase tracking-widest mb-3">Total Weight</div>
                                        <div className="text-4xl font-heading text-white font-semibold">{estimatedWeight.toFixed(2)} <span className="text-xl text-accent-orange font-body font-normal">kg</span></div>
                                    </div>
                                    <div className="p-6 md:p-8 bg-background rounded-sm border-t-2 border-accent-blue/50 text-center shadow-inner">
                                        <div className="text-xs md:text-sm text-accent-grey uppercase tracking-widest mb-3">Estimated Bundles</div>
                                        <div className="text-4xl font-heading text-white font-semibold">{bundleCount} <span className="text-xl text-accent-blue font-body font-normal">units</span></div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
