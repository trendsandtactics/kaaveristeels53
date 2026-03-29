import { NextRequest, NextResponse } from "next/server";
import { insertCertification, listCertifications } from "@/lib/certifications";

export const dynamic = "force-dynamic";

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

    const title = String(formData.get("title") ?? "").trim();
    const description = String(formData.get("description") ?? "").trim();
    const issuedBy = String(formData.get("issuedBy") ?? "").trim();
    const issueDate = String(formData.get("issueDate") ?? "").trim() || null;
    const fileEntry = formData.get("file");

    if (!title || !description || !issuedBy || !fileEntry || typeof fileEntry === "string") {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const file = fileEntry as Blob & { name?: string };

    if (file.size === 0) {
      return NextResponse.json({ error: "Please choose a certificate file." }, { status: 400 });
    }

    if (file.size > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "File must be 4 MB or smaller." }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const id = await insertCertification({
      title,
      description,
      issuedBy,
      issueDate,
      fileName: file.name?.trim() || "certificate-upload",
      mimeType: file.type || "application/octet-stream",
      fileData: fileBuffer,
    });

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Failed to upload certificate.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
