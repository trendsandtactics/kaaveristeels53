"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SteelCalculatorSection() {
  const [activeTab, setActiveTab] = useState<"construction" | "weight">("weight");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [structureType, setStructureType] = useState("residential");
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState("1");
  const [estimatedSteel, setEstimatedSteel] = useState<number | null>(null);

  const [diameter, setDiameter] = useState("8");
  const [length, setLength] = useState("12");
  const [quantity, setQuantity] = useState("");
  const [estimatedWeight, setEstimatedWeight] = useState<number | null>(null);
  const [bundleCount, setBundleCount] = useState<number | null>(null);

  const validateLead = () => {
    if (!name.trim() || !phone.trim()) {
      alert("Please enter your name and phone number");
      return false;
    }
    return true;
  };

  const calculateConstruction = () => {
    if (!validateLead()) return;

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
    if (!validateLead()) return;

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
    <section className="w-full bg-[linear-gradient(90deg,#f5f2eb_0%,#f7f6f7_100%)] py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {/* Heading */}
        <div className="mx-auto mb-8 max-w-4xl text-center md:mb-10">
          <h2 className="font-heading text-4xl leading-none text-[#0f172a] md:text-6xl">
            Beyond the <span className="text-[#c62828]">Forge</span>
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-xl">
            Our premium TMT bars and structural steel products form the backbone of iconic
            infrastructure projects. Built with precision, trusted by engineers, empowering the future.
          </p>

          <div className="mt-8 md:mt-10">
            <h3 className="font-heading text-2xl text-[#0f172a] md:text-4xl">
              Engineering Suite
            </h3>
            <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-[#c62828]" />
          </div>
        </div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
        >
          <div className="border-b border-gray-200 px-4 py-4 text-center md:px-6">
            <h4 className="text-2xl font-bold text-[#0f172a]">
              Steel <span className="text-[#d32f2f]">Calculator</span>
            </h4>
          </div>

          <div className="grid grid-cols-1 gap-3 border-b border-gray-200 p-4 md:grid-cols-2 md:p-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl border border-gray-300 px-4 text-base outline-none placeholder:text-gray-400 focus:border-gray-500"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 rounded-xl border border-gray-300 px-4 text-base outline-none placeholder:text-gray-400 focus:border-gray-500"
            />
          </div>

          <div className="flex border-b border-gray-200 bg-[#f3f4f6]">
            <button
              onClick={() => setActiveTab("construction")}
              className={`flex-1 py-3 text-sm font-semibold md:text-lg ${
                activeTab === "construction"
                  ? "bg-black text-white"
                  : "text-slate-700"
              }`}
            >
              Construction Steel
            </button>
            <button
              onClick={() => setActiveTab("weight")}
              className={`flex-1 py-3 text-sm font-semibold md:text-lg ${
                activeTab === "weight"
                  ? "bg-black text-white"
                  : "text-slate-700"
              }`}
            >
              Weight & Bundle
            </button>
          </div>

          <div className="p-4 md:p-5">
            <AnimatePresence mode="wait">
              {activeTab === "construction" && (
                <motion.div
                  key="construction"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <select
                      value={structureType}
                      onChange={(e) => setStructureType(e.target.value)}
                      className="h-12 rounded-xl border border-gray-300 px-4 outline-none"
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="infrastructure">Infrastructure</option>
                    </select>

                    <input
                      type="number"
                      placeholder="Area (sq.ft)"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="h-12 rounded-xl border border-gray-300 px-4 outline-none"
                    />

                    <input
                      type="number"
                      placeholder="Floors"
                      value={floors}
                      onChange={(e) => setFloors(e.target.value)}
                      className="h-12 rounded-xl border border-gray-300 px-4 outline-none"
                    />

                    <button
                      onClick={calculateConstruction}
                      className="h-12 rounded-xl bg-black px-6 text-base font-semibold text-white"
                    >
                      Calculate
                    </button>
                  </div>

                  {estimatedSteel !== null && (
                    <div className="rounded-2xl bg-[#f6f6f6] p-5 text-center">
                      <p className="text-sm text-gray-500">Estimated Steel</p>
                      <p className="mt-1 text-3xl font-bold text-[#0f172a] md:text-4xl">
                        {estimatedSteel.toLocaleString()} kg
                      </p>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "weight" && (
                <motion.div
                  key="weight"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                    <select
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      className="h-12 rounded-xl border border-gray-300 px-4 outline-none"
                    >
                      {[8, 10, 12, 16, 20, 25, 32].map((d) => (
                        <option key={d} value={d}>
                          {d} mm
                        </option>
                      ))}
                    </select>

                    <input
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="h-12 rounded-xl border border-gray-300 px-4 outline-none"
                    />

                    <input
                      type="number"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-12 rounded-xl border border-gray-300 px-4 outline-none"
                    />

                    <button
                      onClick={calculateWeight}
                      className="h-12 rounded-xl bg-black px-6 text-base font-semibold text-white"
                    >
                      Calculate
                    </button>
                  </div>

                  {(estimatedWeight !== null || bundleCount !== null) && (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                      <div className="rounded-2xl bg-[#f6f6f6] p-5 text-center">
                        <p className="text-sm text-gray-500">Total Weight</p>
                        <p className="mt-1 text-3xl font-bold text-[#0f172a] md:text-4xl">
                          {estimatedWeight?.toFixed(2)} kg
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#f6f6f6] p-5 text-center">
                        <p className="text-sm text-gray-500">Bundles</p>
                        <p className="mt-1 text-3xl font-bold text-[#0f172a] md:text-4xl">
                          {bundleCount}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
