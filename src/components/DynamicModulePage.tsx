"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type DynamicItem = {
  id: number;
  title: string;
  slug: string;
  short_description?: string | null;
  content?: string | null;
  cover_image?: string | null;
  file_url?: string | null;
  video_url?: string | null;
  featured?: number | boolean;
  created_at?: string;
};

export default function DynamicModulePage({ module, heading, subtitle }: { module: string; heading: string; subtitle: string }) {
  const [items, setItems] = useState<DynamicItem[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/public/content/${module}?q=${encodeURIComponent(q)}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setItems(data.data ?? []))
      .finally(() => setLoading(false));
  }, [module, q]);

  const featured = useMemo(() => items.filter((item) => item.featured).slice(0, 3), [items]);

  return (
    <main className="min-h-screen pt-24 bg-gray-50">
      <section className="bg-gradient-to-r from-accent-yellow to-[#ffe066] py-20 px-6 border-b border-black/10">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-black/60">Dynamic Module</p>
          <h1 className="font-heading text-5xl text-black mt-3">{heading}</h1>
          <p className="text-black/70 mt-3 max-w-2xl">{subtitle}</p>
          <div className="mt-6">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="w-full max-w-md rounded-xl border border-black/10 bg-white px-4 py-3 text-sm" />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {featured.length > 0 ? (
          <div className="mb-10">
            <h2 className="font-heading text-2xl text-black mb-4">Featured</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {featured.map((item) => (
                <article key={item.id} className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
                  <h3 className="font-heading text-xl">{item.title}</h3>
                  <p className="text-sm text-black/60 mt-2 line-clamp-3">{item.short_description ?? "No summary available."}</p>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {items.map((item) => (
            <article key={item.id} className="rounded-2xl border border-black/10 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              {item.cover_image ? <img src={item.cover_image} alt={item.title} className="h-48 w-full object-cover" /> : <div className="h-48 bg-gray-200" />}
              <div className="p-5">
                <h3 className="font-heading text-2xl text-black">{item.title}</h3>
                <p className="text-sm text-black/65 mt-2 line-clamp-3">{item.short_description ?? "Content will be updated soon."}</p>
                <div className="mt-4 flex gap-3">
                  <Link href={`/${module}/${item.slug}`} className="text-sm font-semibold text-accent-red">Read more</Link>
                  {item.file_url ? <a href={item.file_url} target="_blank" className="text-sm font-semibold text-black/70" rel="noreferrer">Download</a> : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        {!loading && !items.length ? <p className="text-black/50 text-sm">No published records yet.</p> : null}
        {loading ? <p className="text-black/50 text-sm">Loading...</p> : null}
      </section>
    </main>
  );
}
