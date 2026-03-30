"use client";

import { useEffect, useState } from "react";
import { resolveMediaUrl } from "@/lib/media";

type PopupItem = {
  id: number;
  title: string;
  short_description?: string | null;
  content?: string | null;
  cover_image?: string | null;
  file_url?: string | null;
};

export default function PopupRenderer() {
  const [popup, setPopup] = useState<PopupItem | null>(null);
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState("/image/certificate.jpg");
  const isPdf = imageSrc.toLowerCase().includes(".pdf");

  useEffect(() => {
    fetch("/api/public/content/popups?limit=1", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        const item = (data.data ?? [])[0];
        if (item) {
          setPopup(item);
          setImageSrc(resolveMediaUrl(item.file_url ?? item.cover_image, "/image/certificate.jpg"));
          setOpen(true);
        }
      })
      .catch(() => undefined);
  }, []);

  if (!popup || !open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 p-4 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <div className="relative h-52 w-full">
          {isPdf ? (
            <iframe
              src={imageSrc}
              title={popup.title}
              className="h-full w-full bg-white"
            />
          ) : (
            <img
              src={imageSrc}
              alt={popup.title}
              className="h-full w-full object-cover"
              onError={() => setImageSrc("/image/certificate.jpg")}
            />
          )}
        </div>
        <div className="p-6">
          <h3 className="font-heading text-3xl text-black">{popup.title}</h3>
          <p className="text-sm text-black/70 mt-2">{popup.short_description ?? popup.content ?? ""}</p>
          <div className="mt-4 flex items-center gap-3">
            {popup.file_url ? <a href={popup.file_url} target="_blank" rel="noreferrer" className="rounded-lg bg-black text-white px-4 py-2 text-sm">Learn More</a> : null}
            <button onClick={() => setOpen(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}
