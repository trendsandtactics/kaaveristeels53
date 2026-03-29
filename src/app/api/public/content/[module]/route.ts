import { NextRequest, NextResponse } from "next/server";
import { listModuleItems } from "@/lib/dynamic-cms";

export async function GET(request: NextRequest, { params }: { params: Promise<{ module: string }> }) {
  try {
    const { module } = await params;
    const q = request.nextUrl.searchParams.get("q") ?? undefined;
    const rows = await listModuleItems(module, { q, status: "published" });
    return NextResponse.json({ data: rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch content.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
