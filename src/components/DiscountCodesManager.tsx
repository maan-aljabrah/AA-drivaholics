'use client';

import { useState } from 'react';

type DiscountCode = {
  id: number;
  code: string;
  label: string;
  priceDrift: number | null;
  priceGymkhana: number | null;
};

export default function DiscountCodesManager({ codes: initialCodes }: { codes: DiscountCode[] }) {
  const [codes, setCodes] = useState(initialCodes);
  const [form, setForm] = useState({ code: '', label: '', priceDrift: '', priceGymkhana: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'err'>('idle');
  const [error, setError] = useState('');

  const addCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setError('');
    try {
      const res = await fetch('/api/admin/discount-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setCodes([data.code, ...codes]);
        setForm({ code: '', label: '', priceDrift: '', priceGymkhana: '' });
        setState('idle');
      } else {
        setError(data.error || 'Failed to add code');
        setState('err');
      }
    } catch {
      setError('Network error');
      setState('err');
    }
  };

  const removeCode = async (id: number) => {
    if (!confirm('Delete this discount code? It will stop working immediately.')) return;
    const res = await fetch(`/api/admin/discount-codes/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setCodes(codes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="mt-10 border border-bone/15 bg-carbon-2 p-6 md:p-9">
      <p className="tag text-white">Discount codes</p>
      <p className="mt-1 text-xs leading-relaxed text-bone/50">
        Anyone who enters one of these codes at registration gets this flat price instead of the standard tier — the
        &quot;Both&quot; total is Drift + Gymkhana, calculated automatically. Every registration records which code
        (if any) was used, visible on the signups page.
      </p>

      {codes.length > 0 && (
        <div className="mt-6 overflow-x-auto border border-bone/12">
          <table className="w-full min-w-[560px] text-left">
            <thead className="bg-carbon">
              <tr className="tag text-ash">
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Label</th>
                <th className="px-4 py-3">Drift</th>
                <th className="px-4 py-3">Gymkhana</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-bone/10">
              {codes.map((c) => (
                <tr key={c.id}>
                  <td className="stencil px-4 py-3 text-sm font-bold text-white">{c.code}</td>
                  <td className="px-4 py-3 text-sm text-bone/70">{c.label || '—'}</td>
                  <td className="px-4 py-3 text-sm text-bone/70">{c.priceDrift ?? '—'}</td>
                  <td className="px-4 py-3 text-sm text-bone/70">{c.priceGymkhana ?? '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => removeCode(c.id)}
                      className="font-mono text-xs text-bone/40 transition-colors hover:text-papaya"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form onSubmit={addCode} className="mt-6 grid gap-4 sm:grid-cols-4">
        <input
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
          placeholder="CODE"
          required
          className="field field--dark"
        />
        <input
          value={form.label}
          onChange={(e) => setForm({ ...form, label: e.target.value })}
          placeholder="Label (e.g. Returning drivers)"
          className="field field--dark"
        />
        <input
          type="number"
          min={0}
          value={form.priceDrift}
          onChange={(e) => setForm({ ...form, priceDrift: e.target.value })}
          placeholder="Drift SAR"
          className="field field--dark"
        />
        <input
          type="number"
          min={0}
          value={form.priceGymkhana}
          onChange={(e) => setForm({ ...form, priceGymkhana: e.target.value })}
          placeholder="Gymkhana SAR"
          className="field field--dark"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="sm:col-span-4 bg-white px-8 py-4 stencil text-lg font-bold text-carbon transition-colors hover:bg-bone disabled:opacity-60"
        >
          {state === 'loading' ? 'ADDING…' : 'ADD CODE'}
        </button>
      </form>
      {state === 'err' && <p className="mt-3 text-sm text-papaya">{error}</p>}
    </div>
  );
}
