"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [loading, setLoading] = useState(true);

  const isPdf = useMemo(() => {
    return imageSrc.toLowerCase().includes(".pdf");
  }, [imageSrc]);

  useEffect(() => {
    const loadPopup = async () => {
      try {
        const res = await fetch("/api/public/content/popups?limit=1", {
          cache: "no-store",
        });
        const data = await res.json();
        const item = (data.data ?? [])[0];

        if (item) {
          setPopup(item);
          setImageSrc(
            resolveMediaUrl(
              item.file_url ?? item.cover_image,
              "/image/certificate.jpg"
            )
          );
          setOpen(true);
        }
      } catch {
        // ignore fetch errors
      } finally {
        setLoading(false);
      }
    };

    loadPopup();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (loading || !popup || !open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md"
        onClick={() => setOpen(false)}
      />

      {/* Modal */}
      <div className="relative z-[101] flex min-h-screen items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="relative w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-white shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          {/* Close Button */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close popup"
            className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white shadow-lg transition hover:scale-105 sm:right-4 sm:top-4"
          >
            <span className="text-xl leading-none">✕</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_380px]">
            {/* Preview Area */}
            <div className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 p-3 sm:p-5 md:p-6 lg:p-8">
              <div className="mx-auto flex w-full max-w-4xl items-center justify-center rounded-[24px] border border-white/10 bg-white/5 p-2 sm:p-3 md:p-4 shadow-inner">
                <div
                  className="
                    w-full
                    max-w-[760px]
                    overflow-hidden
                    rounded-[20px]
                    bg-white
                    shadow-[0_12px_40px_rgba(0,0,0,0.18)]
                  "
                  style={{ aspectRatio: "210 / 297" }}
                >
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
                      className="h-full w-full object-contain bg-white"
                      onError={() => setImageSrc("/image/certificate.jpg")}
                    />
                  )}
                </div>
              </div>

              {/* Small label */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide text-white/90">
                  OFFICIAL CERTIFICATE
                </span>
                <span className="rounded-full bg-green-500/15 px-3 py-1 text-xs font-medium tracking-wide text-green-300">
                  VERIFIED DOCUMENT
                </span>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex flex-col justify-between bg-gradient-to-b from-white to-neutral-50 p-5 sm:p-6 md:p-8">
              <div>
                <div className="mb-4 inline-flex rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/70">
                  Certificate Details
                </div>

                <h3 className="font-heading text-2xl leading-tight text-black sm:text-3xl md:text-4xl">
                  {popup.title}
                </h3>

                <div className="mt-4 h-px w-full bg-black/10" />

                <p className="mt-4 text-sm leading-7 text-black/70 sm:text-base">
                  {popup.short_description ?? popup.content ?? "Official certificate document."}
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {popup.file_url ? (
                  <a
                    href={popup.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Open Full Certificate
                  </a>
                ) : null}

                <button
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-black/5"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
