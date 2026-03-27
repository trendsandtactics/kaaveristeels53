import SteelCalculator from "@/components/Calculators/SteelCalculator";

export const metadata = {
  title: "Weight & Bundle Calculator | KAAVERI",
};

export default function WeightBundleCalculatorPage() {
  return (
    <main className="flex min-h-screen flex-col w-full relative pt-24 bg-background">
      <div className="w-full py-24 md:py-32 bg-gradient-to-r from-accent-yellow via-[#FFD700] to-accent-yellow text-black relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_60%)] pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none mix-blend-overlay opacity-30" />
        <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
          <h1 className="font-heading text-5xl md:text-7xl mb-4 text-black font-extrabold">Weight & Bundle Calculator</h1>
          <p className="font-body text-black/80 text-lg">Calculate total bar weight and approximate bundle count for your order.</p>
        </div>
      </div>
      <section className="max-w-6xl mx-auto w-full px-6 md:px-12 py-16">
        <SteelCalculator />
      </section>
    </main>
  );
}
