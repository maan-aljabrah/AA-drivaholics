import { db } from '@/db';
import { signupsTable, registrationsTable } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { Ticker } from '@/components/ui';
import AdminLogout from '@/components/AdminLogout';
import DeleteButton from '@/components/DeleteButton';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const signups = await db.select().from(signupsTable).orderBy(desc(signupsTable.createdAt));
  const registrations = await db
    .select()
    .from(registrationsTable)
    .orderBy(desc(registrationsTable.createdAt));

  return (
    <main className="min-h-screen bg-carbon text-bone">
      <div className="mx-auto max-w-[1400px] px-5 py-12 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-bone/12 pb-8">
          <div>
            <p className="tag text-ash">INTERNAL — DO NOT SHARE</p>
            <h1 className="mega mt-4 text-[13vw] leading-[0.85] sm:text-[8vw] md:text-[5rem]">
              THE <span className="text-white">LIST</span>
            </h1>
          </div>
          <div className="flex items-end gap-10">
            <div>
              <div className="mega text-5xl text-white">{signups.length}</div>
              <p className="tag mt-1 text-ash">TOTAL SIGNUPS</p>
            </div>
            <AdminLogout />
          </div>
        </div>

        <div className="mt-8 overflow-x-auto border border-bone/12">
          <table className="w-full min-w-[720px] text-left">
            <thead className="bg-carbon-2">
              <tr className="tag text-ash">
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">WhatsApp</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone/10">
              {signups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-20 text-center">
                    <p className="stencil text-2xl font-bold text-ash">Nobody in the paddock yet</p>
                    <a href="/#join" className="swipe mt-3 inline-block tag text-white">
                      Share the join link →
                    </a>
                  </td>
                </tr>
              ) : (
                signups.map((s, i) => (
                  <tr key={s.id} className="transition-colors hover:bg-carbon-2">
                    <td className="px-5 py-4 font-mono text-xs text-ash">
                      {String(signups.length - i).padStart(3, '0')}
                    </td>
                    <td className="stencil px-5 py-4 text-sm font-bold">{s.name}</td>
                    <td className="px-5 py-4 font-mono text-sm text-bone/70">{s.email}</td>
                    <td className="px-5 py-4 font-mono text-sm text-bone/50">{s.phone || '—'}</td>
                    <td className="px-5 py-4 font-mono text-xs text-ash">
                      {new Date(s.createdAt).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <DeleteButton endpoint={`/api/admin/signups/${s.id}`} label={s.name} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-b border-bone/12 pb-8">
          <div>
            <p className="tag text-ash">EVENT REGISTRATIONS</p>
            <h2 className="mega mt-4 text-[10vw] leading-[0.85] sm:text-[6vw] md:text-[3.5rem]">
              THE <span className="text-white">GRID</span>
            </h2>
          </div>
          <div className="mega text-5xl text-white">{registrations.length}</div>
        </div>

        <div className="mt-8 overflow-x-auto border border-bone/12">
          <table className="w-full min-w-[880px] text-left">
            <thead className="bg-carbon-2">
              <tr className="tag text-ash">
                <th className="px-5 py-4">#</th>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">WhatsApp</th>
                <th className="px-5 py-4">Car</th>
                <th className="px-5 py-4">Format</th>
                <th className="px-5 py-4">Group</th>
                <th className="px-5 py-4">Tires</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone/10">
              {registrations.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-5 py-20 text-center">
                    <p className="stencil text-2xl font-bold text-ash">No registrations yet</p>
                  </td>
                </tr>
              ) : (
                registrations.map((r, i) => (
                  <tr key={r.id} className="transition-colors hover:bg-carbon-2">
                    <td className="px-5 py-4 font-mono text-xs text-ash">
                      {String(registrations.length - i).padStart(3, '0')}
                    </td>
                    <td className="stencil px-5 py-4 text-sm font-bold">{r.name}</td>
                    <td className="px-5 py-4 font-mono text-sm text-bone/70">{r.email}</td>
                    <td className="px-5 py-4 font-mono text-sm text-bone/50">{r.phone}</td>
                    <td className="px-5 py-4 text-sm text-bone/70">
                      {r.carMake} {r.carModel}
                    </td>
                    <td className="px-5 py-4 text-sm text-bone/70 capitalize">{r.format || '—'}</td>
                    <td className="px-5 py-4 text-sm text-bone/70">{r.groupAffiliation || '—'}</td>
                    <td className="px-5 py-4 text-sm text-acid">
                      {r.wantsTires
                        ? `${r.tireSize}${r.tireSizeRear ? ` (F) / ${r.tireSizeRear} (R)` : ''} × ${r.tireQuantity}`
                        : '—'}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-ash">
                      {new Date(r.createdAt).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <DeleteButton endpoint={`/api/admin/registrations/${r.id}`} label={r.name} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/admin/event"
            className="pill inline-flex border border-white bg-white px-6 py-4 tag font-bold text-carbon"
          >
            Edit current event →
          </a>
          <a
            href="/"
            className="pill inline-flex border border-white px-6 py-4 tag font-bold text-white"
          >
            ← Back to the site
          </a>
        </div>
      </div>

      <Ticker
        items={['EVENT SIGNUPS', 'KHOBAR · SAUDI ARABIA', 'NO STREET RACING', 'EVERYBODY HOME SAFE']}
        duration={38}
        className="mt-16 bg-white py-2.5"
        separator="✳"
      />
    </main>
  );
}
