"use client";

import React, { useCallback, useEffect, useState } from "react";

type Certification = {
  id: number;
  title: string;
  description: string;
  issuedBy: string;
  issueDate: string | null;
  createdAt: string;
};

async function readApiResponse(
  response: Response
): Promise<{ error?: string; certifications?: Certification[] }> {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { error: text || "Unexpected server response." };
}

function formatDate(date: string | null) {
  if (!date) return "";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function CertificationsPage() {
  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>("");

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/certifications", {
        cache: "no-store",
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to fetch certificates.");
      }

      setItems(data.certifications ?? []);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to fetch certificates.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
        setSelectedTitle("");
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <section className="min-h-screen bg-[#f8f8f8] px-4 pt-28 pb-16 md:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl leading-tight text-black md:text-6xl">
              Verified Certificates
            </h1>
            <p className="mt-5 text-base leading-7 text-black/70 md:text-xl">
              Each certification below is published from the KAAVERI admin panel
              and is visible publicly for full transparency.
            </p>
          </div>

          {loading ? (
            <div className="mt-16 text-center text-base text-black/60">
              Loading certificates...
            </div>
          ) : error ? (
            <div className="mt-16 text-center text-base text-red-600">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="mt-16 text-center text-base text-black/60">
              No certificates available yet.
            </div>
          ) : (
            <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => {
                const fileUrl = `/api/certifications/${item.id}/file`;

                return (
                  <article
                    key={item.id}
                    className="rounded-[28px] border border-black/10 bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] md:p-6"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h2 className="font-heading text-2xl leading-tight text-black md:text-3xl">
                        {item.title}
                      </h2>

                      {item.issueDate ? (
                        <span className="shrink-0 pt-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/55 md:text-sm">
                          {formatDate(item.issueDate)}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-4 text-sm leading-7 text-black/75 md:text-base">
                      {item.description}
                    </p>

                    <p className="mt-4 text-sm text-black/75">
                      <span className="font-semibold text-black">Issued by:</span>{" "}
                      {item.issuedBy}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(fileUrl);
                        setSelectedTitle(item.title);
                      }}
                      className="group mt-6 block w-full overflow-hidden rounded-[22px] border border-black/10 bg-[#fafafa] p-3"
                    >
                      <img
                        src={fileUrl}
                        alt={item.title}
                        className="h-auto max-h-[520px] w-full rounded-xl object-contain transition duration-300 group-hover:scale-[1.02]"
                      />
                    </button>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(fileUrl);
                          setSelectedTitle(item.title);
                        }}
                        className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
                      >
                        View Full Certificate
                      </button>

                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-xl border border-black px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
                      >
                        Open in New Tab
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedImage ? (
        <div className="fixed inset-0 z-[9999] bg-black/85 px-4 py-6 backdrop-blur-sm">
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative w-full max-w-6xl">
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setSelectedTitle("");
                }}
                className="absolute -top-14 right-0 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-black"
              >
                Close
              </button>

              <div className="rounded-2xl bg-white p-3 shadow-2xl md:p-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold text-black md:text-2xl">
                    {selectedTitle}
                  </h3>

                  <a
                    href={selectedImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
                  >
                    Open Original
                  </a>
                </div>

                <div className="flex max-h-[82vh] items-center justify-center overflow-auto rounded-xl bg-[#f7f7f7] p-3 md:p-6">
                  <img
                    src={selectedImage}
                    alt={selectedTitle}
                    className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close preview"
            onClick={() => {
              setSelectedImage(null);
              setSelectedTitle("");
            }}
            className="absolute inset-0 -z-10"
          />
        </div>
      ) : null}
    </>
  );
}
