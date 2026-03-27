"use client";

import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";
import Image from "next/image";

export default function PhotoGalleryPage() {
  const galleryImages = [
    "/image/about1.png",
    "/image/about2.png",
    "/image/kaaveriabout.png",
    "/image/tmtbars.png",
    "/image/structuralbeams.png",
    "/image/billets.png",
  ];

  return (
    <GenericPlaceholderPage
      title="Photo Gallery"
      subtitle="Gallery"
      description="Browse photos and visual highlights from plants, products, and project applications."
      icon="🖼️"
      color="accent-yellow"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((image, idx) => (
          <div key={image} className="relative h-52 border border-gray-200 overflow-hidden">
            <Image src={image} alt={`Gallery image ${idx + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </GenericPlaceholderPage>
  );
}
