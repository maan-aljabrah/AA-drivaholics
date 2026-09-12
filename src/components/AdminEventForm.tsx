'use client';

import { useState } from 'react';
import type { CurrentEvent } from '@/db/queries';

function toLocalInputValue(d: Date | string | null | undefined) {
  if (!d) return '';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return '';
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function AdminEventForm({ event }: { event: CurrentEvent | null }) {
  const [form, setForm] = useState({
    isOpen: event?.isOpen ?? false,
    title: event?.title ?? '',
    eventDate: event?.eventDate ?? '',
    countdownAt: toLocalInputValue(event?.countdownAt),
    location: event?.location ?? '',
    priceDrift: event?.priceDrift ?? 'TBA',
    priceGymkhana: event?.priceGymkhana ?? 'TBA',
    spots: event?.spots ?? 0,
    description: event?.description ?? '',
    formats: event?.formats ?? '',
  });
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/admin/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          countdownAt: form.countdownAt ? new Date(form.countdownAt).toISOString() : null,
        }),
      });
      setState(res.ok ? 'ok' : 'err');
    } catch {
      setState('err');
    }
  };

  return (
    <form onSubmit={submit} className="mt-8 space-y-6 border border-bone/15 bg-carbon-2 p-6 md:p-9">
      <label className="flex items-center gap-3 tag text-white">
        <input
          type="checkbox"
          checked={form.isOpen}
          onChange={(e) => setForm({ ...form, isOpen: e.target.checked })}
          className="h-4 w-4"
        />
        Registration is open for this event
      </label>
      <p className="text-xs text-bone/50">
        Leave this unchecked between events — the site will show &quot;get on the list&quot; instead of a
        registration form until you switch this on.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="tag text-ash">Event title</label>
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Drift & Gymkhana 2027"
            className="field field--dark"
          />
        </div>
        <div>
          <label className="tag text-ash">Date (shown on the page)</label>
          <input
            value={form.eventDate}
            onChange={(e) => setForm({ ...form, eventDate: e.target.value })}
            placeholder="January 1, 2027"
            className="field field--dark"
          />
        </div>
        <div>
          <label className="tag text-ash">Countdown target (date + time)</label>
          <input
            type="datetime-local"
            value={form.countdownAt}
            onChange={(e) => setForm({ ...form, countdownAt: e.target.value })}
            className="field field--dark"
          />
          <p className="mt-1 text-xs text-bone/40">Leave blank to hide the homepage countdown.</p>
        </div>
        <div>
          <label className="tag text-ash">Location</label>
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            placeholder="Khobar, Saudi Arabia"
            className="field field--dark"
          />
        </div>
        <div>
          <label className="tag text-ash">Price — Drift</label>
          <input
            value={form.priceDrift}
            onChange={(e) => setForm({ ...form, priceDrift: e.target.value })}
            placeholder="TBA, or e.g. 350 SAR"
            className="field field--dark"
          />
        </div>
        <div>
          <label className="tag text-ash">Price — Gymkhana</label>
          <input
            value={form.priceGymkhana}
            onChange={(e) => setForm({ ...form, priceGymkhana: e.target.value })}
            placeholder="TBA, or e.g. 250 SAR"
            className="field field--dark"
          />
        </div>
        <div>
          <label className="tag text-ash">Available spots</label>
          <input
            type="number"
            min={0}
            value={form.spots}
            onChange={(e) => setForm({ ...form, spots: Number(e.target.value) })}
            className="field field--dark"
          />
        </div>
        <div>
          <label className="tag text-ash">Formats (comma separated)</label>
          <input
            value={form.formats}
            onChange={(e) => setForm({ ...form, formats: e.target.value })}
            placeholder="Drift, Gymkhana, Timed runs"
            className="field field--dark"
          />
        </div>
      </div>

      <div>
        <label className="tag text-ash">Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          placeholder="Start the new year with full throttle. Combined drift sessions and gymkhana competition."
          className="field field--dark"
        />
      </div>

      <button
        type="submit"
        disabled={state === 'loading'}
        className="bg-white px-8 py-4 stencil text-lg font-bold text-carbon transition-colors hover:bg-bone disabled:opacity-60"
      >
        {state === 'loading' ? 'SAVING…' : 'SAVE EVENT'}
      </button>

      {state === 'ok' && <p className="text-sm text-white">Saved — the site is now showing this.</p>}
      {state === 'err' && <p className="text-sm text-papaya">Something went wrong — try again.</p>}
    </form>
  );
}
