"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@kaaveristeels.com";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "Admin@Kaaveri";

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASSWORD) {
      setLoginError("");
      router.push("/admin/modules");
      return;
    }

    setLoginError("Invalid email or password.");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-32 pb-12 md:px-12">
      <section className="mx-auto max-w-md bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h1 className="font-heading text-3xl text-black mb-2">Admin Login</h1>
        <p className="text-sm text-black/65 mb-6">Sign in to continue to Dynamic CMS panel.</p>

        <form onSubmit={onSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" required />
          <button type="submit" className="w-full rounded-lg bg-black text-white px-4 py-2 text-sm font-semibold">Sign In</button>
        </form>

        {loginError ? <p className="mt-4 text-sm text-red-700">{loginError}</p> : null}
      </section>
    </div>
  );
}
