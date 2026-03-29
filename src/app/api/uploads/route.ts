import { NextResponse } from "next/server";
import { ensureDynamicCmsTables } from "@/lib/dynamic-cms";
import { getPool } from "@/lib/mysql";
import { ResultSetHeader } from "mysql2";

export async function POST(request: Request) {
  try {
    await ensureDynamicCmsTables();
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const [result] = await getPool().execute<ResultSetHeader>(
      "INSERT INTO cms_uploads (file_name, mime_type, file_data) VALUES (?, ?, ?)",
      [file.name || "upload.bin", file.type || "application/octet-stream", buffer],
    );

    return NextResponse.json({ url: `/api/uploads/${result.insertId}` }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
