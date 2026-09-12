import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { registrationsTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

function isAuthed(request: NextRequest) {
  return request.cookies.get('dh_admin')?.value === process.env.ADMIN_PASSWORD;
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(request)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 });
  }

  const { id } = await params;
  await db.delete(registrationsTable).where(eq(registrationsTable.id, Number(id)));

  return NextResponse.json({ success: true });
}
