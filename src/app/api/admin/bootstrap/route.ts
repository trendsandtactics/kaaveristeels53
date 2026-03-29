import { NextResponse } from "next/server";
import { ensureDynamicCmsTables } from "@/lib/dynamic-cms";

export async function POST() {
  try {
    await ensureDynamicCmsTables();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bootstrap failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
