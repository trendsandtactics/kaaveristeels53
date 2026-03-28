"use client";

import React, { FormEvent, useEffect, useState } from "react";

type Certification = {
  id: number;
  title: string;
  description: string;
  issuedBy: string;
  issueDate: string | null;
  createdAt: string;
};

export default function AdminCertificationsPage() {
  const [adminKey, setAdminKey] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Certification[]>([]);

  const loadItems = async () => {
    const response = await fetch("/api/certifications", { cache: "no-store" });
    const data = await response.json();
    setItems(data.certifications ?? []);
  };

  useEffect(() => {
    loadItems().catch(() => {
      setMessage("Unable to fetch certificates.");
    });
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!adminKey.trim()) {
      setMessage("Enter admin key.");
      return;
    }

    if (!file) {
      setMessage("Select certificate file.");
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
    formData.append("adminKey", adminKey);

    try {
      const response = await fetch("/api/certifications", {
        method: "POST",
        headers: {
          "x-admin-key": adminKey,
        },
        body: formData,
      });

      const data = await response.json();

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
      setMessage("Upload failed due to network/server issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 md:px-12">
      <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-8">
        <section className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h1 className="font-heading text-3xl text-black mb-2">Certifications Admin</h1>
          <p className="text-sm text-black/65 mb-6">Upload certificate files to MySQL and publish on the public certifications page.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="password"
              value={adminKey}
              onChange={(event) => setAdminKey(event.target.value)}
              placeholder="Admin key"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />
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
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
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
                    <a
                      href={`/api/certifications/${item.id}/file`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs uppercase tracking-[0.12em] font-semibold text-accent-red"
                    >
                      View File
                    </a>
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
    </div>
  );
}
