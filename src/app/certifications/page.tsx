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
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string;
    fileUrl: string;
  } | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/certifications", {
        cache: "force-cache",
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to fetch certificates.");
      }

      setItems(data.certifications ?? []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to fetch certificates."
      );
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
        setSelectedCertificate(null);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <main className="min-h-screen bg-[#f6f6f6]">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-r from-accent-yellow via-[#FFD700] to-accent-yellow py-24 text-black shadow-2xl md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_60%)] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 mix-blend-overlay" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="h-[2px] w-12 bg-black" />
            <h1 className="font-body text-sm font-bold uppercase tracking-[0.2em] text-black">
              Verified Certificates
            </h1>
            <div className="h-[2px] w-12 bg-black" />
          </div>

          <h2 className="font-heading text-4xl leading-tight md:text-6xl">
            Trusted Quality.
            <br />
            Proven Standards.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-black/75 md:text-lg">
            Explore KAAVERI certifications published directly from the admin
            panel for complete public transparency, trust, and quality
            assurance.
          </p>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="px-4 py-14 md:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto max-w-[1600px]">
          {loading ? (
            <p className="py-20 text-center text-base text-black/60">
              Loading certificates...
            </p>
          ) : error ? (
            <p className="py-20 text-center text-base text-red-600">{error}</p>
          ) : items.length === 0 ? (
            <p className="py-20 text-center text-base text-black/60">
              No certificates available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => {
                const fileUrl = `/api/certifications/${item.id}/file`;

                return (
                  <article
                    key={item.id}
                    className="flex h-full flex-col rounded-[30px] border border-black/10 bg-white p-6 shadow-[0_12px_35px_rgba(0,0,0,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.10)]"
                  >
                    <div className="mb-4 flex items-start justify-between gap-4">
                      <h3 className="font-heading text-xl leading-snug text-black md:text-2xl">
                        {item.title}
                      </h3>

                      {item.issueDate ? (
                        <span className="shrink-0 pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-black/55 md:text-sm">
                          {formatDate(item.issueDate)}
                        </span>
                      ) : null}
                    </div>

                    <p className="mb-3 text-sm leading-7 text-black/72 md:text-base">
                      {item.description}
                    </p>

                    <p className="mb-5 text-sm text-black/72">
                      <span className="font-semibold text-black">Issued by:</span>{" "}
                      {item.issuedBy}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCertificate({
                          title: item.title,
                          fileUrl,
                        })
                      }
                      className="flex flex-1 items-center justify-center rounded-[24px] border border-black/10 bg-[#fafafa] p-4 text-left transition hover:border-black/20 hover:shadow-md md:p-5"
                    >
                      <img
                        src={fileUrl}
                        alt={item.title}
                        className="block h-auto max-h-[620px] w-full rounded-2xl object-contain"
                      />
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {selectedCertificate && (
        <div className="fixed inset-0 z-[9999] bg-black/85 p-4 backdrop-blur-sm md:p-8">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-center">
            <div className="relative w-full rounded-[28px] bg-white p-4 shadow-2xl md:p-6">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-heading text-lg text-black md:text-2xl">
                  {selectedCertificate.title}
                </h3>

                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="rounded-lg border border-black px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                >
                  Close
                </button>
              </div>

              <div className="flex max-h-[82vh] items-center justify-center overflow-auto rounded-2xl bg-[#f8f8f8] p-3 md:p-6">
                <img
                  src={selectedCertificate.fileUrl}
                  alt={selectedCertificate.title}
                  className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close certificate preview"
            onClick={() => setSelectedCertificate(null)}
            className="absolute inset-0 -z-10"
          />
        </div>
      )}
    </main>
  );
}
