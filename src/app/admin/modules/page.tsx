"use client";

import AdminContentManager from "@/components/AdminContentManager";

export default function AdminModulesPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-32 pb-12 md:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-red">Admin CMS</p>
          <h1 className="font-heading text-4xl text-black mt-2">Dynamic Modules Management</h1>
          <p className="text-sm text-black/60 mt-2">Manage products, media/events, blogs, projects, careers, dealers, galleries, brochures and popup content.</p>
        </header>

        <AdminContentManager />
      </div>
    </div>
  );
}
