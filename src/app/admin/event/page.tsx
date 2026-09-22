import { getCurrentEvent } from '@/db/queries';
import AdminEventForm from '@/components/AdminEventForm';
import DiscountCodesManager from '@/components/DiscountCodesManager';
import { db } from '@/db';
import { discountCodesTable } from '@/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function AdminEventPage() {
  const event = await getCurrentEvent();
  const codes = await db.select().from(discountCodesTable).orderBy(desc(discountCodesTable.createdAt));

  return (
    <main className="min-h-screen bg-carbon text-bone">
      <div className="mx-auto max-w-[900px] px-5 py-12 md:px-10">
        <p className="tag text-ash">INTERNAL — DO NOT SHARE</p>
        <h1 className="mega mt-4 text-[10vw] leading-[0.85] sm:text-[6vw] md:text-[3.5rem]">
          CURRENT <span className="text-white">EVENT</span>
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-bone/60">
          This is the one event shown on the homepage and on /register. Toggle it open when you&apos;re ready to
          take registrations, and fill in the details below.
        </p>

        <AdminEventForm event={event} />

        <DiscountCodesManager codes={codes} />

        <a href="/admin" className="pill mt-10 inline-flex border border-white px-6 py-4 tag font-bold text-white">
          ← Back to signups
        </a>
      </div>
    </main>
  );
}
