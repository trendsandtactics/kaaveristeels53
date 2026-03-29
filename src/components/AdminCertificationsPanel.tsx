"use client";

import React, { FormEvent, useCallback, useEffect, useState } from "react";

type Certification = {
  id: number;
  title: string;
  description: string;
  issuedBy: string;
  issueDate: string | null;
  createdAt: string;
};

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

async function readApiResponse(response: Response): Promise<{ error?: string; certifications?: Certification[] }> {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  return { error: text || "Unexpected server response." };
}

export default function AdminCertificationsPanel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [items, setItems] = useState<Certification[]>([]);

  const loadItems = useCallback(async () => {
    const response = await fetch("/api/certifications", { cache: "no-store" });
    const data = await readApiResponse(response);

    if (!response.ok) {
      throw new Error(data.error ?? "Unable to fetch certificates.");
    }

    setItems(data.certifications ?? []);
  }, []);

  useEffect(() => {
    loadItems().catch(() => {
      setMessage("Unable to fetch certificates.");
    });
  }, [loadItems]);

  const handleDelete = async (id: number) => {
    setMessage("");
    setDeletingId(id);

    try {
      const response = await fetch(`/api/certifications/${id}`, {
        method: "DELETE",
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        setMessage(data.error ?? "Unable to delete certificate.");
        return;
      }

      setItems((current) => current.filter((item) => item.id !== id));
      setMessage("Certificate deleted successfully.");
    } catch {
      setMessage("Delete failed due to network/server issue.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setMessage("Select certificate file.");
      return;
    }

    if (file.size > MAX_UPLOAD_BYTES) {
      setMessage("File is too large. Please upload a file smaller than 4 MB.");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("issuedBy", issuedBy);
    formData.append("issueDate", issueDate);
    formData.append("file", file);

    try {
      const response = await fetch("/api/certifications", {
        method: "POST",
        body: formData,
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        setMessage(data.error ?? "Upload failed.");
        return;
      }

      setMessage("Certificate uploaded successfully.");
      setTitle("");
      setDescription("");
      setIssuedBy("");
      setIssueDate("");
      setFile(null);
      await loadItems();
    } catch {
      setMessage("Upload failed. Please verify server/database connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-8">
      <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h1 className="font-heading text-3xl text-black mb-2">Certifications Admin</h1>
        <p className="text-sm text-black/65 mb-6">Upload certificate files to MySQL and publish on the public certifications page.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Certificate title"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            type="text"
            value={issuedBy}
            onChange={(event) => setIssuedBy(event.target.value)}
            placeholder="Issued by"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            type="date"
            value={issueDate}
            onChange={(event) => setIssueDate(event.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm min-h-24"
            required
          />
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.webp"
            onChange={(event) => {
              const nextFile = event.target.files?.[0] ?? null;
              setFile(nextFile);

              if (nextFile && nextFile.size > MAX_UPLOAD_BYTES) {
                setMessage("Selected file is larger than 4 MB. Please choose a smaller file.");
              } else {
                setMessage("");
              }
            }}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black text-white px-4 py-2 text-sm font-semibold disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload Certificate"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-black/75">{message}</p> : null}
      </section>

      <section className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="font-heading text-2xl text-black mb-4">Uploaded Certificates</h2>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {items.length > 0 ? (
            items.map((item) => (
              <article key={item.id} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-black">{item.title}</h3>
                  <div className="flex items-center gap-3">
                    <a
                      href={`/api/certifications/${item.id}/file`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-[0.12em] font-semibold text-accent-red"
                    >
                      View File
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="text-xs uppercase tracking-[0.12em] font-semibold text-red-700 disabled:opacity-60"
                    >
                      {deletingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
                <p className="text-sm text-black/70 mt-2">{item.description}</p>
                <p className="text-xs text-black/60 mt-3">Issued by: {item.issuedBy}</p>
              </article>
            ))
          ) : (
            <p className="text-sm text-black/60">No certificates uploaded yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
