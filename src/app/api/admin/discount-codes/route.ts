import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { discountCodesTable } from '@/db/schema';
import { desc } from 'drizzle-orm';

function isAuthed(request: NextRequest) {
  return request.cookies.get('dh_admin')?.value === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const codes = await db.select().from(discountCodesTable).orderBy(desc(discountCodesTable.createdAt));
  return NextResponse.json({ codes });
}

export async function POST(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const body = await request.json();
  const code = String(body.code ?? '').trim().toUpperCase();

  if (!code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 });
  }

  const [created] = await db
    .insert(discountCodesTable)
    .values({
      code,
      label: String(body.label ?? '').trim(),
      priceDrift: Number.isFinite(Number(body.priceDrift)) && body.priceDrift !== '' ? Number(body.priceDrift) : null,
      priceGymkhana:
        Number.isFinite(Number(body.priceGymkhana)) && body.priceGymkhana !== '' ? Number(body.priceGymkhana) : null,
    })
    .onConflictDoNothing()
    .returning();

  if (!created) {
    return NextResponse.json({ error: 'That code already exists' }, { status: 409 });
  }

  return NextResponse.json({ success: true, code: created }, { status: 201 });
}
