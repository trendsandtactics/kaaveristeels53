import { NextRequest, NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';
import { ensureQuoteRequestsTable, getPool } from '@/lib/mysql';

type QuoteRequestBody = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  product_type?: string;
  quantity?: string;
  location?: string;
  notes?: string;
};

type QuoteRequestRow = RowDataPacket & {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string;
  product_type: string;
  quantity: string;
  location: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

function validateRequiredText(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Field \"${field}\" is required.`);
  }

  return value.trim();
}

function optionalText(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export async function GET(request: NextRequest) {
  try {
    await ensureQuoteRequestsTable();

    const searchParams = request.nextUrl.searchParams;
    const page = Math.max(Number(searchParams.get('page') ?? '1') || 1, 1);
    const pageSize = Math.min(Math.max(Number(searchParams.get('pageSize') ?? '10') || 10, 1), 100);
    const offset = (page - 1) * pageSize;

    const pool = getPool();

    const [countRows] = await pool.query<RowDataPacket[]>(
      'SELECT COUNT(*) as total FROM quote_requests',
    );
    const total = Number(countRows[0]?.total ?? 0);

    const [rows] = await pool.query<QuoteRequestRow[]>(
      'SELECT * FROM quote_requests ORDER BY id DESC LIMIT ? OFFSET ?',
      [pageSize, offset],
    );

    return NextResponse.json({
      data: rows,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.max(Math.ceil(total / pageSize), 1),
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch quote requests.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await ensureQuoteRequestsTable();

    const body = (await request.json()) as QuoteRequestBody;

    const name = validateRequiredText(body.name, 'name');
    const email = validateRequiredText(body.email, 'email');
    const phone = validateRequiredText(body.phone, 'phone');
    const productType = validateRequiredText(body.product_type, 'product_type');
    const quantity = validateRequiredText(body.quantity, 'quantity');

    const company = optionalText(body.company);
    const location = optionalText(body.location);
    const notes = optionalText(body.notes);

    const pool = getPool();

    const [result] = await pool.query(
      `INSERT INTO quote_requests
       (name, company, email, phone, product_type, quantity, location, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, company, email, phone, productType, quantity, location, notes],
    );

    const insertId = (result as { insertId: number }).insertId;

    const [rows] = await pool.query<QuoteRequestRow[]>(
      'SELECT * FROM quote_requests WHERE id = ?',
      [insertId],
    );

    return NextResponse.json({ data: rows[0] }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to create quote request.';
    const status = message.includes('required') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
