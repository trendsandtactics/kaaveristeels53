import { NextRequest, NextResponse } from "next/server";
import { createModuleItem, listModuleItems } from "@/lib/dynamic-cms";

export async function GET(request: NextRequest, { params }: { params: Promise<{ module: string }> }) {
  try {
    const { module } = await params;
    const q = request.nextUrl.searchParams.get("q") ?? undefined;
    const status = request.nextUrl.searchParams.get("status") ?? undefined;
    const rows = await listModuleItems(module, { q, status });
    return NextResponse.json({ data: rows });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch items.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ module: string }> }) {
  try {
    const { module } = await params;
    const body = await request.json();
    if (!body?.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const id = await createModuleItem(module, body);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create item.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
