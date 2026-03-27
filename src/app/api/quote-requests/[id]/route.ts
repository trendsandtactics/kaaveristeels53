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

function parseId(value: string): number {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error('Invalid id.');
  }

  return id;
}

function sanitizeBody(body: QuoteRequestBody): Record<string, string | null> {
  const fields = ['name', 'company', 'email', 'phone', 'product_type', 'quantity', 'location', 'notes'] as const;

  const sanitized: Record<string, string | null> = {};

  for (const field of fields) {
    const value = body[field];

    if (value === undefined) {
      continue;
    }

    if (typeof value !== 'string') {
      throw new Error(`Field \"${field}\" must be text.`);
    }

    const trimmed = value.trim();

    if (['name', 'email', 'phone', 'product_type', 'quantity'].includes(field) && trimmed.length === 0) {
      throw new Error(`Field \"${field}\" cannot be empty.`);
    }

    sanitized[field] = trimmed.length > 0 ? trimmed : null;
  }

  return sanitized;
}

async function getQuoteRequest(id: number): Promise<QuoteRequestRow | null> {
  const [rows] = await getPool().query<QuoteRequestRow[]>(
    'SELECT * FROM quote_requests WHERE id = ?',
    [id],
  );

  return rows[0] ?? null;
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await ensureQuoteRequestsTable();
    const id = parseId(params.id);
    const record = await getQuoteRequest(id);

    if (!record) {
      return NextResponse.json({ error: 'Quote request not found.' }, { status: 404 });
    }

    return NextResponse.json({ data: record });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch quote request.';
    const status = message.includes('Invalid id') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await ensureQuoteRequestsTable();
    const id = parseId(params.id);
    const body = (await request.json()) as QuoteRequestBody;
    const sanitized = sanitizeBody(body);

    const entries = Object.entries(sanitized);
    if (entries.length === 0) {
      return NextResponse.json({ error: 'At least one field is required for update.' }, { status: 400 });
    }

    const columns = entries.map(([key]) => `${key} = ?`).join(', ');
    const values = entries.map(([, value]) => value);

    const [result] = await getPool().query(
      `UPDATE quote_requests SET ${columns} WHERE id = ?`,
      [...values, id],
    );

    if ((result as { affectedRows: number }).affectedRows === 0) {
      return NextResponse.json({ error: 'Quote request not found.' }, { status: 404 });
    }

    const record = await getQuoteRequest(id);
    return NextResponse.json({ data: record });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update quote request.';
    const status = message.includes('Invalid id') || message.includes('Field') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await ensureQuoteRequestsTable();
    const id = parseId(params.id);

    const [result] = await getPool().query('DELETE FROM quote_requests WHERE id = ?', [id]);

    if ((result as { affectedRows: number }).affectedRows === 0) {
      return NextResponse.json({ error: 'Quote request not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete quote request.';
    const status = message.includes('Invalid id') ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
