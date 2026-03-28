import { NextRequest, NextResponse } from "next/server";
import { insertCertification, listCertifications } from "@/lib/certifications";

function isAuthorized(request: NextRequest): boolean {
  const adminKey = process.env.ADMIN_PANEL_KEY;

  if (!adminKey) {
    return false;
  }

  return request.headers.get("x-admin-key") === adminKey;
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
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
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
