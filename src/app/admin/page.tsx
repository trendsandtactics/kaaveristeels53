import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminCertificationsPanel from "@/components/AdminCertificationsPanel";
import { adminLogout } from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const session = cookies().get("admin_session");

  if (!session || session.value !== "authenticated") {
    redirect("/admin/login");
  }

  return (
    <div>
      <div className="fixed top-24 right-6 z-30">
        <form action={adminLogout}>
          <button
            type="submit"
            className="rounded-lg bg-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white hover:bg-accent-red transition-colors"
          >
            Logout
          </button>
        </form>
      </div>
      <AdminCertificationsPanel />
    </div>
  );
}
