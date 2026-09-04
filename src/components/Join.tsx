'use client';

import { useState } from 'react';
import { Asterisk } from './ui';

export default function Join() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('loading');
    setMsg('');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setState('ok');
        setMsg('You are on the list. We will notify you when the next event opens.');
        setForm({ name: '', email: '', phone: '' });
      } else if (res.status === 409) {
        setState('ok');
        setMsg('Already on the list — you are good to go. We will ping you before the next event.');
      } else {
        setState('err');
        setMsg(data.error || 'Something went sideways. Try again.');
      }
    } catch {
      setState('err');
      setMsg('Network issue — check the connection and retry.');
    }
  };

  return (
    <section id="join" className="relative overflow-hidden bg-white text-carbon">
      <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto grid max-w-[1600px] gap-12 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
        <div className="md:col-span-6">
          <div className="flex items-center gap-3 tag">
            <span className="anim-blink">●</span> EVENT SIGNUPS
          </div>

          <h2 className="mega mt-6 text-[16vw] leading-[0.8] sm:text-[11vw] md:text-[5.6rem] xl:text-[6.6rem]">
            WILL YOU
            <br />
            <span className="[-webkit-text-stroke:2px_#000000] text-transparent">BE ON</span>
            <br />
            THE LIST?
          </h2>

          <p className="mt-8 max-w-md text-[0.95rem] font-medium leading-relaxed text-carbon/70">
            Get notified when the next event opens. We will send you the details, pricing, and registration link —
            no spam, no resale group, just the call-out.
          </p>

          <div className="mt-10 hidden gap-8 md:flex">
            {[
              ['150+', 'MEMBERS'],
              ['4', 'EVENTS RUN'],
              ['0', 'SPAM EMAILS'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="mega text-4xl">{n}</div>
                <div className="tag mt-1 text-carbon/60">{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 md:pl-8">
          <div className="border border-carbon/20 bg-carbon p-6 text-bone shadow-[18px_18px_0_rgba(0,0,0,0.25)] md:p-9">
            <div className="flex items-center justify-between">
              <h3 className="stencil text-2xl font-extrabold md:text-3xl">BECOME A DRIVAHOLIC</h3>
              <Asterisk className="h-7 w-7 text-white" />
            </div>

            <form onSubmit={submit} className="mt-8 space-y-7">
              <div>
                <label className="tag text-ash" htmlFor="dh-name">
                  01 — Name
                </label>
                <input
                  id="dh-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Abdullah Al-Harbi"
                  className="field field--dark"
                />
              </div>

              <div>
                <label className="tag text-ash" htmlFor="dh-email">
                  02 — Email
                </label>
                <input
                  id="dh-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@drivaholics.com"
                  className="field field--dark"
                />
              </div>

              <div>
                <label className="tag text-ash" htmlFor="dh-phone">
                  03 — WhatsApp (optional)
                </label>
                <input
                  id="dh-phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+966 5X XXX XXXX"
                  className="field field--dark"
                />
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  data-cursor={state === 'loading' ? 'WAIT' : 'GO'}
                  disabled={state === 'loading'}
                  className="group flex w-full items-center justify-between gap-4 bg-white px-7 py-5 stencil text-lg font-extrabold text-carbon transition-all duration-300 hover:bg-bone disabled:opacity-60 sm:w-auto"
                >
                  {state === 'loading' ? 'SUBMITTING…' : 'NOTIFY ME'}
                  <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                </button>
                <p className="tag text-ash">WE REPLY BEFORE THE NEXT EVENT</p>
              </div>

              <p className="text-xs leading-relaxed text-bone/40">
                By submitting, you agree to our{' '}
                <a href="/privacy" className="swipe text-bone/60">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms" className="swipe text-bone/60">
                  Terms of Service
                </a>
                .
              </p>

              {msg && (
                <p
                  className={`border-l-2 py-2 pl-4 text-sm ${
                    state === 'ok' ? 'border-white text-white' : 'border-bone/50 text-bone/70'
                  }`}
                >
                  {msg}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
