import { NextResponse } from "next/server";
import { getCertificationFile } from "@/lib/certifications";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id);

  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "Invalid certification id." }, { status: 400 });
  }

  try {
    const file = await getCertificationFile(id);

    if (!file) {
      return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
    }

    const fileBytes = new Uint8Array(file.fileData);

    return new NextResponse(fileBytes, {
      headers: {
        "Content-Type": file.mimeType,
        "Content-Disposition": `inline; filename="${encodeURIComponent(file.fileName)}"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to load certificate file." }, { status: 500 });
  }
}
