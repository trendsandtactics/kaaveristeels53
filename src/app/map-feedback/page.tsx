"use client";

import { FormEvent, useState } from "react";

export default function MapFeedbackPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [feedback, setFeedback] = useState("");

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch("/api/contact-messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json();
    if (!response.ok) {
      setFeedback(data.error ?? "Failed to send message.");
      return;
    }
    setFeedback("Message sent successfully.");
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <main className="min-h-screen pt-24 bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-6">
        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h1 className="font-heading text-4xl">Visit Us</h1>
          <p className="text-sm text-black/60 mt-2">Our location and quick feedback form.</p>
          <div className="mt-5 overflow-hidden rounded-xl border border-black/10">
            <iframe title="Kaaveri Location" src="https://www.google.com/maps?q=Chennai&output=embed" className="w-full h-[420px]" loading="lazy" />
          </div>
        </section>

        <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <h2 className="font-heading text-3xl">Contact / Feedback</h2>
          <form onSubmit={submit} className="mt-4 space-y-3">
            <input required placeholder="Name" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
            <input required type="email" placeholder="Email" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
            <input placeholder="Phone" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
            <input placeholder="Subject" className="w-full border rounded-lg px-3 py-2 text-sm" value={form.subject} onChange={(e) => setForm((s) => ({ ...s, subject: e.target.value }))} />
            <textarea required placeholder="Message" className="w-full border rounded-lg px-3 py-2 text-sm min-h-28" value={form.message} onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))} />
            <button className="rounded-lg bg-black text-white px-5 py-2 text-sm font-semibold">Send</button>
          </form>
          {feedback ? <p className="text-sm mt-3 text-black/70">{feedback}</p> : null}
        </section>
      </div>
    </main>
  );
}
