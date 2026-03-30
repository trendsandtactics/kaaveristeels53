import { NextRequest, NextResponse } from "next/server";
import { MODULE_TABLES, getPublicModuleItemBySlug } from "@/lib/dynamic-cms";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ module: string; slug: string }> }) {
  try {
    const { module, slug } = await params;

    if (!(module in MODULE_TABLES) && module !== "dealers") {
      return NextResponse.json({ error: "Invalid module" }, { status: 400 });
    }

    const row = await getPublicModuleItemBySlug(module, slug);
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { data: row },
      {
        headers: {
          "Cache-Control": "public, s-maxage=600, stale-while-revalidate=1800",
        },
      },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch detail.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
