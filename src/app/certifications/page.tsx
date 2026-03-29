import React from "react";
import Image from "next/image";
import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";
import { listCertifications } from "@/lib/certifications";

export const dynamic = "force-dynamic";

function formatDate(value: string | null): string {
  if (!value) {
    return "Date not specified";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });
}

function CertificatePreview({ id, mimeType, title }: { id: number; mimeType: string; title: string }) {
  const fileUrl = `/api/certifications/${id}/file`;

  if (mimeType.startsWith("image/")) {
    return (
      <Image
        src={fileUrl}
        alt={title}
        width={900}
        height={560}
        className="w-full h-56 object-contain rounded-xl border border-gray-200 bg-gray-50"
        loading="lazy"
        unoptimized
      />
    );
  }

  if (mimeType === "application/pdf") {
    return (
      <iframe
        src={fileUrl}
        title={`${title} preview`}
        className="w-full h-56 rounded-xl border border-gray-200 bg-gray-50"
      />
    );
  }

  return (
    <div className="w-full h-56 rounded-xl border border-dashed border-gray-300 bg-gray-50 text-sm text-black/60 flex items-center justify-center px-4 text-center">
      Preview is not available for this file type.
    </div>
  );
}

export default async function CertificationsPage() {
  let certifications = [] as Awaited<ReturnType<typeof listCertifications>>;

  try {
    certifications = await listCertifications();
  } catch (error) {
    console.error(error);
  }

  return (
    <GenericPlaceholderPage
      title="Quality & Standards"
      subtitle="Certifications"
      description="Browse KAAVERI's latest quality certifications uploaded by our team."
      icon="🏆"
      color="accent-red"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 bg-white">
        <div className="text-center mb-14">
          <h3 className="font-heading text-3xl md:text-5xl text-black mb-5">Verified Certificates</h3>
          <p className="font-body text-black/70 max-w-2xl mx-auto text-lg font-medium">
            Each certification below is published from the KAAVERI admin panel and is visible publicly for full transparency.
          </p>
        </div>

        {certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert) => (
              <article
                key={cert.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.06)] p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-heading text-2xl text-black">{cert.title}</h4>
                  <span className="text-xs uppercase tracking-[0.12em] font-semibold text-black/60">{formatDate(cert.issueDate)}</span>
                </div>
                <p className="mt-3 text-black/75 text-sm leading-6">{cert.description}</p>
                <p className="mt-4 text-sm text-black/70">
                  <span className="font-semibold text-black">Issued by:</span> {cert.issuedBy}
                </p>
                <div className="mt-5">
                  <CertificatePreview id={cert.id} mimeType={cert.mimeType} title={cert.title} />
                </div>
                <a
                  href={`/api/certifications/${cert.id}/file`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-fit items-center rounded-lg bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white hover:bg-accent-red transition-colors"
                >
                  View Certificate
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 px-6 py-14 text-center bg-gray-50">
            <p className="text-black/70">No certificates uploaded yet. Please check back soon.</p>
          </div>
        )}
      </div>
    </GenericPlaceholderPage>
  );
}
