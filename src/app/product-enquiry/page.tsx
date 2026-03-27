"use client";

import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";

export default function ProductEnquiryPage() {
  return (
    <GenericPlaceholderPage
      title="Product / Other Enquiry"
      subtitle="Enquiry"
      description="Send your product requirements, custom specifications, and business enquiries to our sales team."
      icon="📝"
      color="accent-yellow"
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-20">
        <form className="space-y-4 bg-white border border-gray-200 p-6 shadow-sm">
          <input className="w-full border border-gray-300 p-3" placeholder="Name" />
          <input className="w-full border border-gray-300 p-3" placeholder="Email" />
          <input className="w-full border border-gray-300 p-3" placeholder="Phone" />
          <textarea className="w-full border border-gray-300 p-3 min-h-32" placeholder="Your enquiry" />
          <button type="button" className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase font-bold">Submit Enquiry</button>
        </form>
      </div>
    </GenericPlaceholderPage>
  );
}
