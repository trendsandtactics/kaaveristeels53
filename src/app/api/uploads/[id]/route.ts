import { NextResponse } from "next/server";
import { ensureDynamicCmsTables } from "@/lib/dynamic-cms";
import { getPool } from "@/lib/mysql";
import { RowDataPacket } from "mysql2";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await ensureDynamicCmsTables();
    const { id } = await params;

    const [rows] = await getPool().query<(RowDataPacket & { file_name: string; mime_type: string; file_data: Buffer })[]>(
      "SELECT file_name, mime_type, file_data FROM cms_uploads WHERE id = ? LIMIT 1",
      [Number(id)],
    );

    if (!rows.length) {
      return new NextResponse("Not found", { status: 404 });
    }

    const row = rows[0];
    const body = new Uint8Array(row.file_data);

    return new NextResponse(body, {
      headers: {
        "Content-Type": row.mime_type,
        "Content-Disposition": `inline; filename=\"${row.file_name}\"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to fetch file.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
