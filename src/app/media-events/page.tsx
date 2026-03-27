"use client";

import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";
import Image from "next/image";

export default function MediaEventsPage() {
  const events = [
    { title: "Plant Expansion Update", image: "/image/about1.png" },
    { title: "Dealer Meet 2026", image: "/image/about2.png" },
    { title: "Industry Expo Highlights", image: "/image/kaaveriabout.png" },
  ];

  return (
    <GenericPlaceholderPage
      title="Media & Events"
      subtitle="Updates"
      description="Discover company announcements, event highlights, and industry participation from KAAVERI."
      icon="📣"
      color="accent-yellow"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <article key={event.title} className="border border-gray-200 p-4 shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative h-44 mb-4 overflow-hidden">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
              </div>
              <p className="text-xs uppercase tracking-widest text-black/50 font-bold mb-3">Media & Events</p>
              <h3 className="font-heading text-2xl text-black mb-3">{event.title}</h3>
              <p className="text-black/70 font-body">Content module ready. Connect this page to dynamic CMS/API data.</p>
            </article>
          ))}
        </div>
      </div>
    </GenericPlaceholderPage>
  );
}
