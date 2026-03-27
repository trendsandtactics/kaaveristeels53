"use client";

import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";

export default function PopupModulesPage() {
  return (
    <GenericPlaceholderPage
      title="Popup Modules"
      subtitle="Certificates • Wishes • Events"
      description="Manage popup modules for certificates, greetings, event planners, and campaign announcements."
      icon="🔔"
      color="accent-yellow"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          "Certificate Popups",
          "Festival / Wishes Popups",
          "Event Planner Popups",
        ].map((item) => (
          <div key={item} className="p-6 border border-gray-200 bg-white shadow-sm">
            <h3 className="font-heading text-2xl text-black mb-2">{item}</h3>
            <p className="font-body text-black/70">Placeholder module ready for CMS/API integration.</p>
          </div>
        ))}
      </div>
    </GenericPlaceholderPage>
  );
}
