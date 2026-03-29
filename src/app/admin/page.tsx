"use client";

import { FormEvent, useMemo, useState } from "react";
import AdminCertificationsPanel from "@/components/AdminCertificationsPanel";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isConfigured = useMemo(() => Boolean(ADMIN_EMAIL && ADMIN_PASSWORD), []);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isConfigured) {
      setLoginError("Admin credentials are missing. Set NEXT_PUBLIC_ADMIN_EMAIL and NEXT_PUBLIC_ADMIN_PASSWORD in .env.local.");
      return;
    }

    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
      return;
    }

    setLoginError("Invalid email or password.");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-32 pb-12 md:px-12">
      {!isLoggedIn ? (
        <section className="mx-auto max-w-md bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h1 className="font-heading text-3xl text-black mb-2">Admin Login</h1>
          <p className="text-sm text-black/65 mb-6">Use your admin credentials to access the certifications panel.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />

            <button type="submit" className="w-full rounded-lg bg-black text-white px-4 py-2 text-sm font-semibold">
              Sign In
            </button>
          </form>

          {loginError ? <p className="mt-4 text-sm text-red-700">{loginError}</p> : null}
        </section>
      ) : (
        <AdminCertificationsPanel />
      )}
    </div>
  );
}
