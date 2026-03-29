import { NextRequest, NextResponse } from "next/server";
import { ensureDynamicCmsTables } from "@/lib/dynamic-cms";
import { getPool } from "@/lib/mysql";

export async function GET() {
  await ensureDynamicCmsTables();
  const [rows] = await getPool().query("SELECT * FROM job_applications ORDER BY created_at DESC LIMIT 500");
  return NextResponse.json({ data: rows });
}

export async function POST(request: NextRequest) {
  try {
    await ensureDynamicCmsTables();
    const body = await request.json();
    if (!body.name || !body.email) {
      return NextResponse.json({ error: "name and email are required." }, { status: 400 });
    }

    await getPool().query(
      "INSERT INTO job_applications (career_id, name, email, phone, resume_url, cover_letter) VALUES (?, ?, ?, ?, ?, ?)",
      [body.career_id ?? null, body.name, body.email, body.phone ?? null, body.resume_url ?? null, body.cover_letter ?? null],
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save job application.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
