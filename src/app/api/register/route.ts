import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { registrationsTable } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, carMake, carModel, eventId, format, groupAffiliation, wantsTires, tireSize, tireSizeRear, tireQuantity } = await request.json();

    if (!name || !email || !phone || !carMake || !carModel || !eventId) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!['drift', 'gymkhana', 'both'].includes(format)) {
      return NextResponse.json({ error: 'Please select an event format' }, { status: 400 });
    }

    if (wantsTires && !tireSize) {
      return NextResponse.json({ error: 'Tire size is required when ordering tires' }, { status: 400 });
    }

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
        wantsTires: Boolean(wantsTires),
        tireSize: wantsTires ? String(tireSize).trim() : null,
        tireSizeRear: wantsTires && tireSizeRear ? String(tireSizeRear).trim() : null,
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
