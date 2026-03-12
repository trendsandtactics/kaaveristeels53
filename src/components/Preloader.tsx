import { motion } from "framer-motion";

interface PreloaderProps {
    progress: number;
}

export default function Preloader({ progress }: PreloaderProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b1220] text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(185,28,28,0.2),transparent_60%)] pointer-events-none" />
            <div className="flex flex-col items-center w-full max-w-sm px-6">
                <h1 className="font-heading text-2xl mb-8 tracking-wider text-white uppercase text-center flex gap-2">
                    Igniting the <span className="text-accent-orange">Forge</span>
                </h1>
                <div className="w-full h-1 bg-accent-blue/30 relative overflow-hidden rounded-full shadow-[0_0_15px_rgba(255,107,0,0.1)]">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-accent-orange to-yellow-500 shadow-[0_0_10px_rgba(255,107,0,0.5)]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear", duration: 0.1 }}
                    />
                </div>
                <div className="mt-6 flex justify-between w-full font-body text-xs text-white/50 font-medium tracking-widest uppercase">
                    <span>Loading Sequence</span>
                    <span className="text-white/80">{Math.round(progress)}%</span>
                </div>
            </div>
        </motion.div>
    );
}
