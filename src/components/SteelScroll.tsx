"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SteelCalculator() {
  const [activeTab, setActiveTab] = useState<"construction" | "weight">(
    "construction"
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  // Construction State
  const [structureType, setStructureType] = useState("residential");
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState("1");
  const [estimatedSteel, setEstimatedSteel] = useState<number | null>(null);

  // Weight State
  const [diameter, setDiameter] = useState("8");
  const [length, setLength] = useState("12");
  const [quantity, setQuantity] = useState("");
  const [estimatedWeight, setEstimatedWeight] = useState<number | null>(null);
  const [bundleCount, setBundleCount] = useState<number | null>(null);

  const calculateConstruction = () => {
    let multiplier = 4;

    if (structureType === "commercial") multiplier = 5;
    if (structureType === "infrastructure") multiplier = 6;

    const totalArea = Number(area) * Number(floors);

    if (totalArea > 0) {
      setEstimatedSteel(totalArea * multiplier);
    } else {
      setEstimatedSteel(null);
    }
  };

  const calculateWeight = () => {
    const d = Number(diameter);
    const l = Number(length);
    const q = Number(quantity);

    if (d > 0 && l > 0 && q > 0) {
      const weightPerBar = ((d * d) / 162) * l;
      const totalWeight = weightPerBar * q;
      setEstimatedWeight(totalWeight);

      const barsPerBundle = d <= 10 ? 10 : d <= 16 ? 5 : 3;
      setBundleCount(Math.ceil(q / barsPerBundle));
    } else {
      setEstimatedWeight(null);
      setBundleCount(null);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-6xl overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-[0_18px_50px_-12px_rgba(0,0,0,0.08)]"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-accent-red via-accent-yellow to-accent-red" />

      {/* Header */}
      <div className="relative border-b border-gray-100 bg-gray-50 px-5 py-6 md:px-8 md:py-7">
        <div className="relative z-10 text-center">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
            Steel <span className="text-accent-red">Calculator</span>
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm md:text-base text-gray-500">
            Instantly estimate steel requirement, total weight, and bundle count.
          </p>
        </div>
      </div>

      {/* Name and Phone */}
      <div className="border-b border-gray-100 bg-white px-5 py-5 md:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col">
            <label className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-sm md:text-base font-medium text-foreground outline-none transition-all placeholder-gray-400 focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Enter your phone number"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-sm md:text-base font-medium text-foreground outline-none transition-all placeholder-gray-400 focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
            />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-100 bg-white p-2 md:p-3">
        <button
          type="button"
          className={`flex-1 rounded-xl px-4 py-3 text-center font-heading text-sm md:text-base font-bold transition-all duration-300 ${
            activeTab === "construction"
              ? "bg-gray-900 text-white shadow-sm"
              : "text-gray-500 hover:bg-gray-100 hover:text-foreground"
          }`}
          onClick={() => setActiveTab("construction")}
        >
          Construction Steel
        </button>

        <button
          type="button"
          className={`flex-1 rounded-xl px-4 py-3 text-center font-heading text-sm md:text-base font-bold transition-all duration-300 ${
            activeTab === "weight"
              ? "bg-gray-900 text-white shadow-sm"
              : "text-gray-500 hover:bg-gray-100 hover:text-foreground"
          }`}
          onClick={() => setActiveTab("weight")}
        >
          Weight & Bundle
        </button>
      </div>

      {/* Content */}
      <div className="p-5 md:p-8">
        <AnimatePresence mode="wait">
          {activeTab === "construction" && (
            <motion.div
              key="construction"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <h4 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                  Estimate TMT Requirement
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col">
                  <label className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    Structure Type
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-sm md:text-base font-medium text-foreground outline-none transition-all focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                      value={structureType}
                      onChange={(e) => setStructureType(e.target.value)}
                    >
                      <option value="residential">Residential Building</option>
                      <option value="commercial">Commercial Complex</option>
                      <option value="infrastructure">Infrastructure</option>
                    </select>
                    <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    Area (sq. ft)
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-sm md:text-base font-medium text-foreground outline-none transition-all placeholder-gray-400 focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                    placeholder="e.g. 1500"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    Floors
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-sm md:text-base font-medium text-foreground outline-none transition-all placeholder-gray-400 focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                    placeholder="e.g. 2"
                    value={floors}
                    onChange={(e) => setFloors(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[220px_1fr] items-stretch">
                <button
                  type="button"
                  onClick={calculateConstruction}
                  className="rounded-xl bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                >
                  Calculate
                </button>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6 min-h-[110px] flex items-center justify-center">
                  {estimatedSteel !== null ? (
                    <div className="text-center md:text-left w-full">
                      <div className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                        Estimated Requirement
                      </div>
                      <div className="mt-2 font-heading text-3xl md:text-4xl font-black text-foreground">
                        {estimatedSteel.toLocaleString()}
                        <span className="ml-2 text-lg md:text-xl font-medium text-gray-400">
                          kg
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-sm md:text-base text-gray-400">
                      Your result will appear here
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "weight" && (
            <motion.div
              key="weight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              <div>
                <h4 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                  Calculate Weight & Bundle
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="flex flex-col">
                  <label className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    Diameter
                  </label>
                  <div className="relative">
                    <select
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-sm md:text-base font-medium text-foreground outline-none transition-all focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                    >
                      {[8, 10, 12, 16, 20, 25, 32].map((d) => (
                        <option key={d} value={d}>
                          {d} mm
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    Length
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-sm md:text-base font-medium text-foreground outline-none transition-all focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 text-[11px] font-bold uppercase tracking-[0.15em] text-gray-500">
                    Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-sm md:text-base font-medium text-foreground outline-none transition-all placeholder-gray-400 focus:border-accent-yellow focus:bg-white focus:ring-4 focus:ring-accent-yellow/10"
                    placeholder="e.g. 100"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <button
                  type="button"
                  onClick={calculateWeight}
                  className="mt-[25px] md:mt-0 rounded-xl bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-[0.15em] text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                >
                  Calculate
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6 min-h-[120px] flex items-center justify-center">
                  {estimatedWeight !== null ? (
                    <div className="text-center w-full">
                      <div className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                        Total Weight
                      </div>
                      <div className="mt-2 font-heading text-3xl md:text-4xl font-black text-foreground">
                        {estimatedWeight.toFixed(2)}
                        <span className="ml-2 text-lg md:text-xl font-medium text-gray-400">
                          kg
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-sm md:text-base text-gray-400">
                      Weight result will appear here
                    </div>
                  )}
                </div>

                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 md:p-6 min-h-[120px] flex items-center justify-center">
                  {bundleCount !== null ? (
                    <div className="text-center w-full">
                      <div className="text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                        Estimated Bundles
                      </div>
                      <div className="mt-2 font-heading text-3xl md:text-4xl font-black text-foreground">
                        {bundleCount}
                        <span className="ml-2 text-lg md:text-xl font-medium text-gray-400">
                          units
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-sm md:text-base text-gray-400">
                      Bundle result will appear here
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
