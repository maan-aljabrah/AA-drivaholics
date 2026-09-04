import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { signupsTable } from '@/db/schema';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    const [signup] = await db
      .insert(signupsTable)
      .values({
        name: String(name).trim(),
        email: cleanEmail,
        phone: phone ? String(phone).trim() : null,
      })
      .onConflictDoNothing()
      .returning();

    if (!signup) {
      return NextResponse.json(
        { error: 'That email is already on the list — see you at the track.' },
        { status: 409 }
      );
    }

    return NextResponse.json({ success: true, signup }, { status: 201 });
  } catch (error: unknown) {
    const err = error as { code?: string; cause?: { code?: string } };
    const code = err?.code ?? err?.cause?.code;
    if (code === '23505') {
      return NextResponse.json({ error: 'That email is already on the list.' }, { status: 409 });
    }
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Could not save your spot. Try again.' }, { status: 500 });
  }
}
