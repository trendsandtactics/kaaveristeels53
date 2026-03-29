import { NextRequest, NextResponse } from "next/server";
import { ensureDynamicCmsTables } from "@/lib/dynamic-cms";
import { getPool } from "@/lib/mysql";

export async function GET() {
  await ensureDynamicCmsTables();
  const [rows] = await getPool().query("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500");
  return NextResponse.json({ data: rows });
}

export async function POST(request: NextRequest) {
  try {
    await ensureDynamicCmsTables();
    const body = await request.json();
    if (!body.name || !body.email || !body.enquiry_type) {
      return NextResponse.json({ error: "name, email, and enquiry_type are required." }, { status: 400 });
    }

    await getPool().query(
      "INSERT INTO enquiries (name, email, phone, enquiry_type, product_name, message) VALUES (?, ?, ?, ?, ?, ?)",
      [body.name, body.email, body.phone ?? null, body.enquiry_type, body.product_name ?? null, body.message ?? null],
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to save enquiry.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
