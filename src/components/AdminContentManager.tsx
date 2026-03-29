"use client";

import AdminCertificationsPanel from "@/components/AdminCertificationsPanel";
import { useEffect, useMemo, useRef, useState } from "react";

type ContentModuleName = "products" | "mediaEvents" | "blogs" | "projects" | "careers" | "dealers" | "galleries" | "brochures" | "popups";
type SupportModuleName = "enquiries" | "contact_messages" | "job_applications";
type ModuleName = ContentModuleName | SupportModuleName | "certifications";

type ModuleDef = { key: ModuleName; label: string; kind: "content" | "support" | "certifications"; description: string };
type Item = Record<string, unknown> & { id: number; title?: string; slug?: string; status?: string; updated_at?: string };

type FormState = {
  title: string;
  short_description: string;
  content: string;
  status: string;
  featured: boolean;
  sort_order: number;
  cover_image: string;
  file_url: string;
  video_url: string;
  extra_data: Record<string, string>;
};

const MODULES: ModuleDef[] = [
  { key: "certifications", label: "Certifications", kind: "certifications", description: "Upload and manage certification files" },
  { key: "products", label: "Products", kind: "content", description: "Product catalog, specs, brochure links" },
  { key: "mediaEvents", label: "Media & Events", kind: "content", description: "Event highlights and company news" },
  { key: "blogs", label: "Blogs", kind: "content", description: "Rich blog content with SEO-ready publishing" },
  { key: "projects", label: "Projects", kind: "content", description: "Project case studies and outcomes" },
  { key: "careers", label: "Careers", kind: "content", description: "Job listings and vacancy details" },
  { key: "dealers", label: "Dealers", kind: "content", description: "Dealer directory with city/state filters" },
  { key: "galleries", label: "Photo/Video Gallery", kind: "content", description: "Visual media and showcase assets" },
  { key: "brochures", label: "Brochures", kind: "content", description: "Downloadable product brochures/PDFs" },
  { key: "popups", label: "Popups", kind: "content", description: "Homepage event/offer popup controls" },
  { key: "enquiries", label: "Enquiries", kind: "support", description: "Incoming product and generic enquiries" },
  { key: "contact_messages", label: "Contact Messages", kind: "support", description: "Website contact and feedback queue" },
  { key: "job_applications", label: "Job Applications", kind: "support", description: "Candidate applications and resumes" },
];

const initialForm = (): FormState => ({
  title: "",
  short_description: "",
  content: "",
  status: "draft",
  featured: false,
  sort_order: 0,
  cover_image: "",
  file_url: "",
  video_url: "",
  extra_data: {},
});

function endpointForSupportModule(module: SupportModuleName): string {
  if (module === "enquiries") return "/api/enquiries";
  if (module === "contact_messages") return "/api/contact-messages";
  return "/api/job-applications";
}

export default function AdminContentManager() {
  const [activeModule, setActiveModule] = useState<ModuleName>("products");
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<FormState>(initialForm());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const richEditorRef = useRef<HTMLDivElement | null>(null);

  const activeDef = MODULES.find((module) => module.key === activeModule)!;

  const fetchItems = async () => {
    setLoading(true);
    setMessage("");
    try {
      if (activeDef.kind === "support") {
        const response = await fetch(endpointForSupportModule(activeModule as SupportModuleName), { cache: "no-store" });
        const data = await response.json();
        setItems(data.data ?? []);
      } else {
        const response = await fetch(`/api/admin/content/${activeModule}?q=${encodeURIComponent(search)}`, { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error ?? "Unable to load records.");
        setItems(data.data ?? []);
      }
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

  useEffect(() => {
    if (activeModule === "blogs" && richEditorRef.current) {
      richEditorRef.current.innerHTML = form.content || "";
    }
  }, [activeModule, form.content]);

  const resetForm = () => {
    setForm(initialForm());
    setEditingId(null);
    if (richEditorRef.current) richEditorRef.current.innerHTML = "";
  };

  const payload = useMemo(() => {
    const base = {
      ...form,
      sort_order: Number(form.sort_order) || 0,
      extra_data: form.extra_data,
    };

    if (activeModule === "dealers") {
      return {
        ...base,
        extra_data: {
          city: form.extra_data.city || "",
          state: form.extra_data.state || "",
          phone: form.extra_data.phone || "",
          email: form.extra_data.email || "",
          map_url: form.extra_data.map_url || "",
        },
      };
    }

    return base;
  }, [activeModule, form]);

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (activeDef.kind !== "content") return;

    try {
      const url = editingId ? `/api/admin/content/${activeModule}/${editingId}` : `/api/admin/content/${activeModule}`;
      const method = editingId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Save failed.");
      setMessage(editingId ? "Updated successfully." : "Created successfully.");
      resetForm();
      fetchItems();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Save failed.");
    }
  };

  const deleteRow = async (id: number) => {
    if (activeDef.kind !== "content") return;
    if (!confirm("Delete this record?")) return;
    const response = await fetch(`/api/admin/content/${activeModule}/${id}`, { method: "DELETE" });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Delete failed.");
      return;
    }
    setMessage("Deleted.");
    fetchItems();
  };

  const editRow = (row: Item) => {
    if (activeDef.kind !== "content") return;
    const extra = (typeof row.extra_data === "string" && row.extra_data ? JSON.parse(String(row.extra_data)) : row.extra_data) as Record<string, string> | null;
    setEditingId(row.id);
    setForm({
      title: String(row.title ?? ""),
      short_description: String(row.short_description ?? ""),
      content: String(row.content ?? ""),
      status: String(row.status ?? "draft"),
      featured: Boolean(row.featured),
      sort_order: Number(row.sort_order ?? 0),
      cover_image: String(row.cover_image ?? ""),
      file_url: String(row.file_url ?? ""),
      video_url: String(row.video_url ?? ""),
      extra_data: extra ?? {},
    });
  };

  const applyRich = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    setForm((state) => ({ ...state, content: richEditorRef.current?.innerHTML ?? "" }));
  };

  const uploadFromDevice = async (file: File, target: "cover_image" | "file_url" | "video_url") => {
    const body = new FormData();
    body.append("file", file);

    const response = await fetch("/api/uploads", { method: "POST", body });
    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Upload failed.");
      return;
    }

    setForm((state) => ({ ...state, [target]: data.url }));
    setMessage("File uploaded successfully.");
  };

  const renderModuleSpecificFields = () => {
    switch (activeModule) {
      case "products":
        return <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Specification sheet URL" value={form.file_url} onChange={(e) => setForm((s) => ({ ...s, file_url: e.target.value }))} />;
      case "blogs":
        return (
          <div className="md:col-span-2 space-y-2">
            <div className="flex gap-2 flex-wrap">
              <button type="button" className="border rounded px-2 py-1 text-xs" onClick={() => applyRich("bold")}>Bold</button>
              <button type="button" className="border rounded px-2 py-1 text-xs" onClick={() => applyRich("italic")}>Italic</button>
              <button type="button" className="border rounded px-2 py-1 text-xs" onClick={() => applyRich("formatBlock", "h2")}>H2</button>
              <button type="button" className="border rounded px-2 py-1 text-xs" onClick={() => applyRich("insertUnorderedList")}>List</button>
            </div>
            <div
              ref={richEditorRef}
              contentEditable
              className="min-h-40 rounded-lg border px-3 py-2 text-sm"
              onInput={() => setForm((s) => ({ ...s, content: richEditorRef.current?.innerHTML ?? "" }))}
              suppressContentEditableWarning
            />
            <p className="text-xs text-black/50">Rich editor for blog content.</p>
          </div>
        );
      case "dealers":
        return (
          <>
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="City" value={form.extra_data.city ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, city: e.target.value } }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="State" value={form.extra_data.state ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, state: e.target.value } }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Dealer Phone" value={form.extra_data.phone ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, phone: e.target.value } }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Dealer Email" value={form.extra_data.email ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, email: e.target.value } }))} />
            <input className="md:col-span-2 border rounded-lg px-3 py-2 text-sm" placeholder="Google Map URL" value={form.extra_data.map_url ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, map_url: e.target.value } }))} />
          </>
        );
      case "careers":
        return (
          <>
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Location" value={form.extra_data.location ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, location: e.target.value } }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Employment Type" value={form.extra_data.employment_type ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, employment_type: e.target.value } }))} />
          </>
        );
      case "mediaEvents":
        return <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Event Date (YYYY-MM-DD)" value={form.extra_data.event_date ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, event_date: e.target.value } }))} />;
      case "projects":
        return <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Project Scope" value={form.extra_data.scope ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, scope: e.target.value } }))} />;
      case "popups":
        return (
          <>
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Start DateTime" value={form.extra_data.starts_at ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, starts_at: e.target.value } }))} />
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="End DateTime" value={form.extra_data.ends_at ?? ""} onChange={(e) => setForm((s) => ({ ...s, extra_data: { ...s.extra_data, ends_at: e.target.value } }))} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <aside className="lg:col-span-3 rounded-2xl border border-black/10 bg-white p-4 shadow-sm h-fit lg:sticky lg:top-28">
        <h2 className="font-heading text-xl mb-3">Modules</h2>
        <div className="space-y-2">
          {MODULES.map((module) => (
            <button
              key={module.key}
              onClick={() => {
                setActiveModule(module.key);
                setSearch("");
                resetForm();
              }}
              className={`w-full text-left rounded-xl px-3 py-2 text-sm font-semibold ${activeModule === module.key ? "bg-black text-white" : "bg-gray-100 text-black hover:bg-gray-200"}`}
            >
              {module.label}
            </button>
          ))}
        </div>
      </aside>

      <section className="lg:col-span-9 space-y-6">
        {activeDef.kind === "certifications" ? <AdminCertificationsPanel /> : null}

        {activeDef.kind === "content" ? (
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <h3 className="font-heading text-2xl mb-1">{editingId ? "Edit" : "Create"} {activeDef.label}</h3>
            <p className="text-sm text-black/60 mb-4">{activeDef.description}</p>

            <form onSubmit={submitForm} className="grid md:grid-cols-2 gap-3">
              <input required className="border rounded-lg px-3 py-2 text-sm" placeholder="Title" value={form.title} onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))} />
              <select className="border rounded-lg px-3 py-2 text-sm" value={form.status} onChange={(e) => setForm((s) => ({ ...s, status: e.target.value }))}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>

              <textarea className="md:col-span-2 border rounded-lg px-3 py-2 text-sm min-h-20" placeholder="Short description" value={form.short_description} onChange={(e) => setForm((s) => ({ ...s, short_description: e.target.value }))} />

              {activeModule !== "blogs" ? (
                <textarea className="md:col-span-2 border rounded-lg px-3 py-2 text-sm min-h-32" placeholder="Content" value={form.content} onChange={(e) => setForm((s) => ({ ...s, content: e.target.value }))} />
              ) : null}

              <div className="space-y-2">
                <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Cover image URL" value={form.cover_image} onChange={(e) => setForm((s) => ({ ...s, cover_image: e.target.value }))} />
                <input type="file" accept="image/*" className="w-full border rounded-lg px-3 py-2 text-sm" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFromDevice(file, "cover_image");
                }} />
              </div>
              <div className="space-y-2">
                <input className="w-full border rounded-lg px-3 py-2 text-sm" placeholder="Video URL" value={form.video_url} onChange={(e) => setForm((s) => ({ ...s, video_url: e.target.value }))} />
                <input type="file" accept="video/*,application/pdf" className="w-full border rounded-lg px-3 py-2 text-sm" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFromDevice(file, "file_url");
                }} />
              </div>

              {renderModuleSpecificFields()}

              <input type="number" className="border rounded-lg px-3 py-2 text-sm" placeholder="Sort order" value={form.sort_order} onChange={(e) => setForm((s) => ({ ...s, sort_order: Number(e.target.value) }))} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.featured} onChange={(e) => setForm((s) => ({ ...s, featured: e.target.checked }))} /> Featured</label>

              <div className="md:col-span-2 flex gap-2">
                <button className="rounded-lg bg-black text-white px-4 py-2 text-sm font-semibold">{editingId ? "Update" : "Create"}</button>
                {editingId ? <button type="button" onClick={resetForm} className="rounded-lg border border-gray-300 px-4 py-2 text-sm">Cancel</button> : null}
              </div>
            </form>
          </div>
        ) : null}

        {activeDef.kind !== "certifications" ? (
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 className="font-heading text-2xl">{activeDef.label}</h3>
              {activeDef.kind === "content" ? (
                <div className="flex gap-2">
                  <input value={search} onChange={(e) => setSearch(e.target.value)} className="border rounded-lg px-3 py-2 text-sm" placeholder="Search" />
                  <button onClick={fetchItems} className="rounded-lg bg-gray-900 text-white px-3 py-2 text-sm" type="button">Apply</button>
                </div>
              ) : null}
            </div>

            <div className="overflow-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b text-black/60">
                    <th className="py-2 pr-3">Title / Name</th>
                    <th className="py-2 pr-3">Status</th>
                    <th className="py-2 pr-3">Updated</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((row) => (
                    <tr key={row.id} className="border-b last:border-b-0">
                      <td className="py-3 pr-3">
                        <div className="font-semibold">{String(row.title ?? row.name ?? `#${row.id}`)}</div>
                        {row.slug ? <div className="text-xs text-black/50">/{String(row.slug)}</div> : null}
                      </td>
                      <td className="py-3 pr-3">{String(row.status ?? "-")}</td>
                      <td className="py-3 pr-3">{row.updated_at ? new Date(String(row.updated_at)).toLocaleDateString() : "-"}</td>
                      <td className="py-3">
                        {activeDef.kind === "content" ? (
                          <div className="space-x-3">
                            <button onClick={() => editRow(row)} className="text-blue-700 font-semibold">Edit</button>
                            <button onClick={() => deleteRow(row.id)} className="text-red-700 font-semibold">Delete</button>
                          </div>
                        ) : (
                          <span className="text-xs text-black/50">Read only</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!loading && !items.length ? <p className="mt-4 text-sm text-black/50">No records found.</p> : null}
            {loading ? <p className="mt-4 text-sm text-black/50">Loading...</p> : null}
            {message ? <p className="mt-3 text-sm text-black/70">{message}</p> : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
