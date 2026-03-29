import { NextRequest, NextResponse } from "next/server";
import { deleteCertification } from "@/lib/certifications";

function parseId(value: string): number {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("Invalid certification id.");
  }

  return id;
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseId(params.id);
    const deleted = await deleteCertification(id);

    if (!deleted) {
      return NextResponse.json({ error: "Certificate not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete certificate.";
    const status = message.includes("Invalid") ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
