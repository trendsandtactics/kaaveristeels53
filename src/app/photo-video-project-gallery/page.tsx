"use client";

import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";
import Image from "next/image";

export default function PhotoVideoProjectGalleryPage() {
  const items = [
    { title: "Plant Photo", image: "/image/about1.png" },
    { title: "Project Snapshot", image: "/image/kaaveriabout.png" },
    { title: "Product Showcase", image: "/image/tmtbars.png" },
    { title: "Video Thumb", image: "/image/about2.png" },
    { title: "Construction Site", image: "/image/structuralbeams.png" },
    { title: "Billet Unit", image: "/image/billets.png" },
  ];

  return (
    <GenericPlaceholderPage
      title="Photo / Video / Project Gallery"
      subtitle="Gallery"
      description="Unified gallery for media assets across products, events, and project references."
      icon="🎬"
      color="accent-yellow"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.title} className="border border-gray-200 bg-white shadow-sm overflow-hidden">
            <div className="relative h-44">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <p className="p-4 font-body text-black/80 font-medium">{item.title}</p>
          </div>
        ))}
      </div>
    </GenericPlaceholderPage>
  );
}
