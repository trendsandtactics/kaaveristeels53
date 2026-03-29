import React from "react";
import { adminLogin } from "@/app/admin/actions";

export const metadata = {
  title: "Admin Login | KAAVERI TMT",
};

export default function AdminLoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="font-heading text-3xl text-black mb-2">Admin Login</h1>
        <p className="text-sm text-black/65 mb-6">Use your admin credentials to open the certifications panel.</p>

        <form action={adminLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            required
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-black text-white px-4 py-2 text-sm font-semibold hover:bg-accent-red transition-colors"
          >
            Login
          </button>
        </form>

        {searchParams.error ? <p className="mt-4 text-sm text-red-700">{searchParams.error}</p> : null}
      </div>
    </div>
  );
}
