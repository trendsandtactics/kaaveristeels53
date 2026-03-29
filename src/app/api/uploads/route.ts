import { NextResponse } from "next/server";
import { ensureDynamicCmsTables } from "@/lib/dynamic-cms";
import { getPool } from "@/lib/mysql";
import { ResultSetHeader } from "mysql2";

type UploadLike = {
  arrayBuffer: () => Promise<ArrayBuffer>;
  name?: string;
  type?: string;
  size?: number;
};

function isUploadLike(value: unknown): value is UploadLike {
  return typeof value === "object" && value !== null && "arrayBuffer" in value;
}

export async function POST(request: Request) {
  try {
    await ensureDynamicCmsTables();
    const formData = await request.formData();
    const payload = formData.get("file");

    if (!isUploadLike(payload)) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    if ((payload.size ?? 0) <= 0) {
      return NextResponse.json({ error: "Uploaded file is empty." }, { status: 400 });
    }

    const bytes = await payload.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const [result] = await getPool().execute<ResultSetHeader>(
      "INSERT INTO cms_uploads (file_name, mime_type, file_data) VALUES (?, ?, ?)",
      [payload.name || `upload-${Date.now()}.bin`, payload.type || "application/octet-stream", buffer],
    );

    return NextResponse.json({ id: result.insertId, url: `/api/uploads/${result.insertId}` }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
