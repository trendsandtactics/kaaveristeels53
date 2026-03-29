"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isValidAdminLogin } from "@/lib/admin-auth";

export async function adminLogin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (isValidAdminLogin(email, password)) {
    cookies().set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    redirect("/admin");
  }

  redirect("/admin/login?error=Invalid email or password");
}

export async function adminLogout() {
  cookies().delete("admin_session");
  redirect("/admin/login");
}
