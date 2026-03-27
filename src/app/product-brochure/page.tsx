"use client";

import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";

export default function ProductBrochurePage() {
  return (
    <GenericPlaceholderPage
      title="Product Brochure"
      subtitle="Downloads"
      description="Download brochure modules for TMT bars, structural steel, and product specifications."
      icon="📘"
      color="accent-yellow"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20 text-center">
        <p className="font-body text-black/70 mb-8">Connect this section to brochure PDF assets or CMS-managed download modules.</p>
        <button className="px-8 py-3 bg-black text-white font-bold uppercase text-xs tracking-widest">Download Main Brochure</button>
      </div>
    </GenericPlaceholderPage>
  );
}
