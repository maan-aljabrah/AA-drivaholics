import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { registrationsTable, discountCodesTable, eventTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { basePrices, amountForFormat, type Format } from '@/lib/pricing';

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      phone,
      carMake,
      carModel,
      eventId,
      format,
      groupAffiliation,
      discountCode,
      wantsTires,
      tireSizeRear,
      tireSizeFront,
      tireQuantity,
    } = await request.json();

    if (!name || !email || !phone || !carMake || !carModel || !eventId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!['drift', 'gymkhana', 'both'].includes(format)) {
      return NextResponse.json({ error: 'Please select an event format' }, { status: 400 });
    }

    if (wantsTires && !tireSizeRear) {
      return NextResponse.json({ error: 'Rear tire size is required when ordering tires' }, { status: 400 });
    }

    const [event] = await db.select().from(eventTable).where(eq(eventTable.id, Number(eventId)));

    let appliedCode: string | null = null;
    let driftPrice: number | null = null;
    let gymkhanaPrice: number | null = null;

    if (discountCode) {
      const clean = String(discountCode).trim().toUpperCase();
      const [match] = await db.select().from(discountCodesTable).where(eq(discountCodesTable.code, clean));
      if (!match) {
        return NextResponse.json({ error: 'Invalid discount code' }, { status: 400 });
      }
      appliedCode = match.code;
      driftPrice = match.priceDrift;
      gymkhanaPrice = match.priceGymkhana;
    } else if (event) {
      const base = basePrices(event);
      driftPrice = base.drift;
      gymkhanaPrice = base.gymkhana;
    }

    const amountDue = event ? amountForFormat(format as Format, driftPrice, gymkhanaPrice) : null;

    const cleanEmail = String(email).trim().toLowerCase();

    const [registration] = await db
      .insert(registrationsTable)
      .values({
        name: String(name).trim(),
        email: cleanEmail,
        phone: String(phone).trim(),
        carMake: String(carMake).trim(),
        carModel: String(carModel).trim(),
        eventId: String(eventId).trim(),
        format: String(format),
        groupAffiliation: groupAffiliation ? String(groupAffiliation).trim() : null,
        discountCode: appliedCode,
        amountDue,
        wantsTires: Boolean(wantsTires),
        tireSizeRear: wantsTires ? String(tireSizeRear).trim() : null,
        tireSizeFront: wantsTires && tireSizeFront ? String(tireSizeFront).trim() : null,
        tireQuantity: wantsTires ? Number(tireQuantity) || 4 : null,
      })
      .onConflictDoNothing()
      .returning();

    if (!registration) {
      return NextResponse.json(
        { error: 'You are already registered for this event.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error: unknown) {
    const err = error as { code?: string; cause?: { code?: string } };
    const code = err?.code ?? err?.cause?.code;
    if (code === '23505') {
      return NextResponse.json({ error: 'Already registered for this event.' }, { status: 409 });
    }
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Registration failed. Try again.' }, { status: 500 });
  }
}
