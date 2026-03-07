import SteelScroll from "@/components/SteelScroll";
import SteelCalculator from "@/components/Calculators/SteelCalculator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full relative">
      {/* Scrollytelling Hero Area */}
      <SteelScroll />

      {/* Rest of the homepage content will go below the scrollytelling */}
      <section className="min-h-screen w-full bg-background relative flex flex-col items-center justify-center py-32 px-4 overflow-hidden">

        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-orange/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl text-center relative z-10 mb-20">
          <h2 className="font-heading text-5xl md:text-7xl mb-8 text-white">Beyond the <span className="text-accent-orange">Forge</span></h2>
          <p className="font-body text-white/70 text-lg md:text-xl leading-relaxed">
            Our premium TMT bars and structural steel products form the backbone of iconic infrastructure projects. Built with precision, trusted by engineers, empowering the future.
          </p>
        </div>

        {/* Interactive Modules */}
        <div className="w-full max-w-6xl mx-auto z-10">
          <div className="mb-12 text-center">
            <h3 className="font-heading text-3xl text-white mb-4">Engineering Suite</h3>
            <div className="w-16 h-1 bg-accent-blue mx-auto rounded-full" />
          </div>
          <SteelCalculator />
        </div>

      </section>
    </main>
  );
}
