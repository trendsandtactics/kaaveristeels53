import { NextRequest, NextResponse } from "next/server";
import { deleteModuleItem, updateModuleItem } from "@/lib/dynamic-cms";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ module: string; id: string }> }) {
  try {
    const { module, id } = await params;
    const body = await request.json();
    if (!body?.title || typeof body.title !== "string") {
      return NextResponse.json({ error: "Title is required." }, { status: 400 });
    }

    const updated = await updateModuleItem(module, Number(id), body);
    return NextResponse.json({ updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update item.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ module: string; id: string }> }) {
  try {
    const { module, id } = await params;
    const deleted = await deleteModuleItem(module, Number(id));
    return NextResponse.json({ deleted });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to delete item.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
