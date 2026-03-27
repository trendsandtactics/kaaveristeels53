"use client";

import GenericPlaceholderPage from "@/components/GenericPlaceholderPage";

export default function SetupLinkingVendorPage() {
  return (
    <GenericPlaceholderPage
      title="Setup / Linking to Vendor"
      subtitle="Optional"
      description="Optional vendor pages setup for integrations, partner catalogs, and external linking workflows."
      icon="🔗"
      color="accent-yellow"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">
        <div className="border border-gray-200 p-6 bg-white shadow-sm">
          <h3 className="font-heading text-3xl text-black mb-4">Vendor Setup Checklist</h3>
          <ul className="list-disc pl-6 space-y-2 font-body text-black/70">
            <li>Partner onboarding form</li>
            <li>Catalog sync endpoints</li>
            <li>External landing link mappings</li>
            <li>Approval and go-live workflow</li>
          </ul>
        </div>
      </div>
    </GenericPlaceholderPage>
  );
}
