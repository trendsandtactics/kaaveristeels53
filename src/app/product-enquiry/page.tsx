"use client";

import { FormEvent, useState } from "react";

export default function ProductEnquiryPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", enquiry_type: "product", product_name: "", message: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/enquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Submission failed.");
      setLoading(false);
      return;
    }
    setMessage("Enquiry submitted successfully.");
    setForm({ name: "", email: "", phone: "", enquiry_type: "product", product_name: "", message: "" });
    setLoading(false);
  };

  return (
    <main className="min-h-screen pt-24 bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <h1 className="font-heading text-4xl text-black">Product / Other Enquiry</h1>
        <p className="text-sm text-black/60 mt-2">Share your requirement and our team will respond quickly.</p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input required placeholder="Name" className="border rounded-lg px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
            <input required type="email" placeholder="Email" className="border rounded-lg px-3 py-2 text-sm" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
            <input placeholder="Phone" className="border rounded-lg px-3 py-2 text-sm" value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
            <select className="border rounded-lg px-3 py-2 text-sm" value={form.enquiry_type} onChange={(e) => setForm((s) => ({ ...s, enquiry_type: e.target.value }))}>
              <option value="product">Product Enquiry</option>
              <option value="other">Other Enquiry</option>
            </select>
          </div>
          <input placeholder="Product name (optional)" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.product_name} onChange={(e) => setForm((s) => ({ ...s, product_name: e.target.value }))} />
          <textarea placeholder="Message" className="w-full border rounded-lg px-3 py-2 text-sm min-h-28" value={form.message} onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))} />
          <button disabled={loading} className="rounded-lg bg-black text-white px-5 py-2 text-sm font-semibold">{loading ? "Submitting..." : "Submit Enquiry"}</button>
        </form>

        {message ? <p className="text-sm mt-4 text-black/70">{message}</p> : null}
      </div>
    </main>
  );
}
