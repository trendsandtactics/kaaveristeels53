import { NextRequest, NextResponse } from "next/server";
import { MODULE_TABLES, ensureDynamicCmsTables } from "@/lib/dynamic-cms";
import { getPool } from "@/lib/mysql";
import { RowDataPacket } from "mysql2";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ module: string; slug: string }> }) {
  try {
    const { module, slug } = await params;
    await ensureDynamicCmsTables();

    if (!(module in MODULE_TABLES) && module !== "dealers") {
      return NextResponse.json({ error: "Invalid module" }, { status: 400 });
    }

    const table = module === "dealers" ? "dealers" : MODULE_TABLES[module as keyof typeof MODULE_TABLES];
    const [rows] = await getPool().query<RowDataPacket[]>(`SELECT * FROM ${table} WHERE slug = ? AND status = 'published' LIMIT 1`, [slug]);

    if (!rows.length) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ data: rows[0] });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch detail.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
