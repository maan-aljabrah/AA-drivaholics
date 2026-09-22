import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { discountCodesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  const { code } = await request.json();
  const clean = String(code ?? '').trim().toUpperCase();

  if (!clean) {
    return NextResponse.json({ valid: false });
  }

  const [match] = await db.select().from(discountCodesTable).where(eq(discountCodesTable.code, clean));

  if (!match) {
    return NextResponse.json({ valid: false });
  }

  return NextResponse.json({
    valid: true,
    code: match.code,
    priceDrift: match.priceDrift,
    priceGymkhana: match.priceGymkhana,
  });
}
