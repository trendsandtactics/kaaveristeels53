"use client";

import { useEffect, useMemo, useState } from "react";

type ModuleName = "products" | "mediaEvents" | "blogs" | "projects" | "careers" | "dealers" | "galleries" | "brochures" | "popups";

type Item = {
  id: number;
  title: string;
  slug: string;
  short_description?: string | null;
  content?: string | null;
  status: "draft" | "published";
  featured: number | boolean;
  sort_order: number;
  cover_image?: string | null;
  file_url?: string | null;
  video_url?: string | null;
  updated_at: string;
};

const MODULES: Array<{ key: ModuleName; label: string }> = [
  { key: "products", label: "Products" },
  { key: "mediaEvents", label: "Media & Events" },
  { key: "blogs", label: "Blogs" },
  { key: "projects", label: "Projects" },
  { key: "careers", label: "Careers" },
  { key: "dealers", label: "Dealers" },
  { key: "galleries", label: "Photo/Video/Project Gallery" },
  { key: "brochures", label: "Product Brochures" },
  { key: "popups", label: "Popup Management" },
];

const INITIAL_FORM = {
  title: "",
  short_description: "",
  content: "",
  status: "draft" as "draft" | "published",
  featured: false,
  sort_order: 0,
  cover_image: "",
  file_url: "",
  video_url: "",
};

export default function AdminContentManager() {
  const [activeModule, setActiveModule] = useState<ModuleName>("products");
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/content/${activeModule}?q=${encodeURIComponent(search)}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to load records.");
      }
      setItems(data.data ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load records.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch("/api/admin/bootstrap", { method: "POST" }).finally(fetchItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeModule]);

  const sortedItems = useMemo(() => items, [items]);

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
  };

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    try {
      const payload = { ...form, sort_order: Number(form.sort_order) || 0, featured: Boolean(form.featured) };
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/admin/content/${activeModule}/${editingId}` : `/api/admin/content/${activeModule}`;
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to save item.");
      }

      setMessage(editingId ? "Record updated successfully." : "Record created successfully.");
      resetForm();
      fetchItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save item.");
    }
  };

  const editRow = (row: Item) => {
    setEditingId(row.id);
    setForm({
      title: row.title,
      short_description: row.short_description ?? "",
      content: row.content ?? "",
      status: row.status,
      featured: Boolean(row.featured),
      sort_order: row.sort_order,
      cover_image: row.cover_image ?? "",
      file_url: row.file_url ?? "",
      video_url: row.video_url ?? "",
    });
  };

  const deleteRow = async (id: number) => {
    if (!confirm("Delete this record?")) return;
    const response = await fetch(`/api/admin/content/${activeModule}/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Unable to delete item.");
      return;
    }
    setMessage("Deleted successfully.");
    fetchItems();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {MODULES.map((module) => (
            <button
              key={module.key}
              type="button"
              onClick={() => {
                setActiveModule(module.key);
                setSearch("");
                setMessage("");
                resetForm();
              }}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] ${
                module.key === activeModule ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              {module.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <section className="xl:col-span-1 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-2xl mb-4">{editingId ? "Edit Record" : "Create Record"}</h2>
          <form onSubmit={submitForm} className="space-y-3">
            <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} required />
            <textarea className="w-full border rounded-lg px-3 py-2 text-sm min-h-20" placeholder="Short description" value={form.short_description} onChange={(e) => setForm((s) => ({ ...s, short_description: e.target.value }))} />
            <textarea className="w-full border rounded-lg px-3 py-2 text-sm min-h-32" placeholder="Full content" value={form.content} onChange={(e) => setForm((s) => ({ ...s, content: e.target.value }))} />
            <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Cover image URL" value={form.cover_image} onChange={(e) => setForm((s) => ({ ...s, cover_image: e.target.value }))} />
            <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="File / Brochure URL" value={form.file_url} onChange={(e) => setForm((s) => ({ ...s, file_url: e.target.value }))} />
            <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Video URL" value={form.video_url} onChange={(e) => setForm((s) => ({ ...s, video_url: e.target.value }))} />
            <div className="grid grid-cols-2 gap-3">
              <select className="border rounded-lg px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value as "draft" | "published" }))}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              <input type="number" className="border rounded-lg px-3 py-2 text-sm" value={form.sort_order} onChange={(e) => setForm((s) => ({ ...s, sort_order: Number(e.target.value) }))} placeholder="Sort order" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm((s) => ({ ...s, featured: e.target.checked }))} /> Featured
            </label>
            <div className="flex gap-2">
              <button className="flex-1 rounded-lg bg-black text-white py-2 text-sm font-semibold">{editingId ? "Update" : "Create"}</button>
              {editingId ? (
                <button type="button" onClick={resetForm} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">Cancel</button>
              ) : null}
            </div>
          </form>
          {message ? <p className="mt-3 text-sm text-black/70">{message}</p> : null}
        </section>

        <section className="xl:col-span-2 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
            <h3 className="font-heading text-2xl">{MODULES.find((m) => m.key === activeModule)?.label} Records</h3>
            <div className="flex gap-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="border rounded-lg px-3 py-2 text-sm"
              />
              <button type="button" onClick={fetchItems} className="rounded-lg bg-gray-900 text-white px-3 py-2 text-sm">Apply</button>
            </div>
          </div>

          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-black/60 border-b">
                  <th className="py-2 pr-3">Title</th>
                  <th className="py-2 pr-3">Status</th>
                  <th className="py-2 pr-3">Featured</th>
                  <th className="py-2 pr-3">Updated</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map((row) => (
                  <tr key={row.id} className="border-b last:border-b-0">
                    <td className="py-3 pr-3">
                      <p className="font-semibold">{row.title}</p>
                      <p className="text-xs text-black/50">/{row.slug}</p>
                    </td>
                    <td className="py-3 pr-3">{row.status}</td>
                    <td className="py-3 pr-3">{row.featured ? "Yes" : "No"}</td>
                    <td className="py-3 pr-3">{new Date(row.updated_at).toLocaleDateString()}</td>
                    <td className="py-3 space-x-3">
                      <button onClick={() => editRow(row)} className="text-blue-700 font-semibold">Edit</button>
                      <button onClick={() => deleteRow(row.id)} className="text-red-700 font-semibold">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!loading && !sortedItems.length ? <p className="text-sm text-black/50 mt-4">No records found.</p> : null}
          {loading ? <p className="text-sm text-black/50 mt-4">Loading records...</p> : null}
        </section>
      </div>
    </div>
  );
}
