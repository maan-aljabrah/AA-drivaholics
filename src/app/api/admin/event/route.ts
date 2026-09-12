import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { eventTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

function isAuthed(request: NextRequest) {
  return request.cookies.get('dh_admin')?.value === process.env.ADMIN_PASSWORD;
}

export async function POST(request: NextRequest) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const body = await request.json();
  const values = {
    isOpen: Boolean(body.isOpen),
    title: String(body.title ?? '').trim(),
    eventDate: String(body.eventDate ?? '').trim(),
    countdownAt: body.countdownAt ? new Date(body.countdownAt) : null,
    location: String(body.location ?? '').trim(),
    priceDrift: String(body.priceDrift ?? '').trim() || 'TBA',
    priceGymkhana: String(body.priceGymkhana ?? '').trim() || 'TBA',
    spots: Number.isFinite(Number(body.spots)) ? Number(body.spots) : 0,
    description: String(body.description ?? '').trim(),
    formats: String(body.formats ?? '').trim(),
    updatedAt: new Date(),
  };

  const [updated] = await db
    .update(eventTable)
    .set(values)
    .where(eq(eventTable.id, 1))
    .returning();

  if (updated) {
    return NextResponse.json({ success: true, event: updated });
  }

  const [inserted] = await db
    .insert(eventTable)
    .values({ id: 1, ...values })
    .returning();

  return NextResponse.json({ success: true, event: inserted });
}
