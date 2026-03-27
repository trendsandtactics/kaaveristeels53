"use client";

import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";
import MapEmbed from "@/components/MapEmbed";

export default function MapFeedbackPage() {
  return (
    <GenericPlaceholderPage
      title="G-MAP with Contact / Feedback"
      subtitle="Location & Feedback"
      description="Locate us on map and send feedback from a single unified page."
      icon="🗺️"
      color="accent-yellow"
    >
      <MapEmbed />
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-16">
        <form className="space-y-4 border border-gray-200 bg-white p-6 shadow-sm">
          <input className="w-full border border-gray-300 p-3" placeholder="Name" />
          <input className="w-full border border-gray-300 p-3" placeholder="Email" />
          <textarea className="w-full border border-gray-300 p-3 min-h-32" placeholder="Feedback" />
          <button type="button" className="px-8 py-3 bg-black text-white text-xs tracking-widest uppercase font-bold">Send Feedback</button>
        </form>
      </div>
    </GenericPlaceholderPage>
  );
}
