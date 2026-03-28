import { NextRequest, NextResponse } from "next/server";
import { insertCertification, listCertifications } from "@/lib/certifications";

const DEFAULT_ADMIN_PANEL_KEY = "KaaveriAdmin@2026";

function configuredAdminSecret(): string {
  return (
    process.env.ADMIN_PANEL_KEY?.trim() ||
    process.env.ADMIN_KEY?.trim() ||
    process.env.MYSQL_PASSWORD?.trim() ||
    DEFAULT_ADMIN_PANEL_KEY
  );
}

function getAdminKey(request: NextRequest, formData?: FormData): string {
  const headerKey = request.headers.get("x-admin-key")?.trim();

  if (headerKey) {
    return headerKey;
  }

  const authHeader = request.headers.get("authorization")?.trim();
  if (authHeader?.toLowerCase().startsWith("bearer ")) {
    return authHeader.slice(7).trim();
  }

  const formKey = formData?.get("adminKey");
  if (typeof formKey === "string") {
    return formKey.trim();
  }

  return "";
}

function isAuthorized(request: NextRequest, formData?: FormData): boolean {
  const expectedKey = configuredAdminSecret();

  if (!expectedKey) {
    return false;
  }

  return getAdminKey(request, formData) === expectedKey;
}

export async function GET() {
  try {
    const certifications = await listCertifications();
    return NextResponse.json({ certifications });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch certifications." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    if (!isAuthorized(request, formData)) {
      return NextResponse.json({ error: "Unauthorized. Check ADMIN_PANEL_KEY (or ADMIN_KEY) in environment." }, { status: 401 });
    }

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const issuedBy = String(formData.get("issuedBy") ?? "").trim();
    const issueDate = String(formData.get("issueDate") ?? "").trim() || null;
    const file = formData.get("file");

    if (!title || !description || !issuedBy || !(file instanceof File)) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    if (file.size === 0) {
      return NextResponse.json({ error: "Please choose a certificate file." }, { status: 400 });
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be 10 MB or smaller." }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const id = await insertCertification({
      title,
      description,
      issuedBy,
      issueDate,
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      fileData: fileBuffer,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to upload certificate." }, { status: 500 });
  }
}
