'use client';

import { useState } from 'react';
import { Asterisk } from '@/components/ui';
import type { CurrentEvent } from '@/db/queries';

export default function RegisterForm({ event }: { event: CurrentEvent }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    carMake: '',
    carModel: '',
    format: '' as '' | 'drift' | 'gymkhana' | 'both',
    groupAffiliation: '',
    wantsTires: false,
    tireSize: '',
    tireSizeRear: '',
    tireQuantity: 4,
  });
  const [state, setState] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState('');

  const formats = event.formats
    .split(',')
    .map((f) => f.trim())
    .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.format) {
      setState('err');
      setMsg('Please select an event format.');
      return;
    }

    setState('loading');
    setMsg('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, eventId: String(event.id) }),
      });

      const data = await res.json();

      if (res.ok) {
        setState('ok');
        setMsg('Registration received! We will send you confirmation and payment details via WhatsApp.');
        setForm({ name: '', email: '', phone: '', carMake: '', carModel: '', format: '', groupAffiliation: '', wantsTires: false, tireSize: '', tireSizeRear: '', tireQuantity: 4 });
      } else if (res.status === 409) {
        setState('ok');
        setMsg('You are already registered for this event. Check WhatsApp for details.');
      } else {
        setState('err');
        setMsg(data.error || 'Registration failed. Please try again.');
      }
    } catch {
      setState('err');
      setMsg('Network error. Please try again.');
    }
  };

  return (
    <div className="grid gap-12 md:grid-cols-12">
      {/* Event Info */}
      <div className="md:col-span-5">
        <div className="sticky top-24">
          <div className="overflow-hidden border border-bone/15 bg-carbon-2">
            <div className="bg-white p-8">
              <div className="flex items-center justify-between">
                <span className="stencil text-3xl font-bold text-carbon">{event.title}</span>
                <Asterisk className="h-8 w-8" invert />
              </div>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <p className="tag text-ash">DATE</p>
                  <p className="stencil mt-2 text-2xl font-bold">{event.eventDate}</p>
                </div>
                <div>
                  <p className="tag text-ash">LOCATION</p>
                  <p className="stencil mt-2 text-xl">{event.location}</p>
                </div>
                <div>
                  <p className="tag text-ash">PRICE</p>
                  <div className="mt-2 space-y-1">
                    <p
                      className={`stencil text-xl font-bold ${
                        form.format === 'gymkhana' ? 'text-bone/30' : 'text-white'
                      }`}
                    >
                      Drift — {event.priceDrift}
                    </p>
                    <p
                      className={`stencil text-xl font-bold ${
                        form.format === 'drift' ? 'text-bone/30' : 'text-white'
                      }`}
                    >
                      Gymkhana — {event.priceGymkhana}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="tag text-ash">AVAILABLE SPOTS</p>
                  <p className="stencil mt-2 text-2xl font-bold">{event.spots} drivers</p>
                </div>
              </div>

              {event.description && (
                <div className="mt-8 border-t border-bone/12 pt-8">
                  <p className="mb-4 text-sm leading-relaxed text-bone/70">{event.description}</p>
                  {formats.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formats.map((f) => (
                        <span key={f} className="border border-white/20 px-3 py-1 tag text-white">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div className="md:col-span-7">
        <div className="border border-bone/15 bg-carbon p-6 md:p-10">
          <h2 className="stencil mb-8 text-3xl font-bold">Registration Form</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="tag text-ash" htmlFor="reg-name">
                01 — FULL NAME
              </label>
              <input
                id="reg-name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Abdullah Al-Harbi"
                className="field field--dark"
              />
            </div>

            <div>
              <label className="tag text-ash" htmlFor="reg-email">
                02 — EMAIL
              </label>
              <input
                id="reg-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="field field--dark"
              />
            </div>

            <div>
              <label className="tag text-ash" htmlFor="reg-phone">
                03 — WHATSAPP NUMBER
              </label>
              <input
                id="reg-phone"
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+966 5X XXX XXXX"
                className="field field--dark"
              />
            </div>

            <div>
              <label className="tag text-ash">04 — EVENT FORMAT</label>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {(['drift', 'gymkhana', 'both'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setForm({ ...form, format: f })}
                    className={`border px-4 py-3 tag font-bold transition-colors ${
                      form.format === f
                        ? 'border-white bg-white text-carbon'
                        : 'border-bone/20 text-bone/60 hover:border-bone/40'
                    }`}
                  >
                    {f === 'both' ? 'Both' : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="tag text-ash" htmlFor="reg-make">
                  05 — CAR MAKE
                </label>
                <input
                  id="reg-make"
                  required
                  value={form.carMake}
                  onChange={(e) => setForm({ ...form, carMake: e.target.value })}
                  placeholder="BMW"
                  className="field field--dark"
                />
              </div>
              <div>
                <label className="tag text-ash" htmlFor="reg-model">
                  06 — CAR MODEL
                </label>
                <input
                  id="reg-model"
                  required
                  value={form.carModel}
                  onChange={(e) => setForm({ ...form, carModel: e.target.value })}
                  placeholder="M4"
                  className="field field--dark"
                />
              </div>
            </div>

            <div>
              <label className="tag text-ash" htmlFor="reg-group">
                07 — GROUP / CLUB AFFILIATION (OPTIONAL)
              </label>
              <input
                id="reg-group"
                value={form.groupAffiliation}
                onChange={(e) => setForm({ ...form, groupAffiliation: e.target.value })}
                placeholder="e.g. a car club, team, or community you ride with"
                className="field field--dark"
              />
              <p className="mt-2 text-xs leading-relaxed text-bone/40">
                If we&apos;re partnered with your group, this is how you get the discount — leave blank if not
                applicable.
              </p>
            </div>

            <div className="border-t border-bone/12 pt-8">
              <label className="flex items-center gap-3 tag text-white">
                <input
                  type="checkbox"
                  checked={form.wantsTires}
                  onChange={(e) => setForm({ ...form, wantsTires: e.target.checked })}
                  className="h-4 w-4"
                />
                08 — ADD DRIFT TIRES (OPTIONAL)
              </label>

              {form.wantsTires && (
                <div className="mt-6 space-y-6 border-l-2 border-acid/40 pl-5">
                  <div>
                    <label className="tag text-ash" htmlFor="reg-tire-size">
                      TIRE SIZE (FRONT)
                    </label>
                    <input
                      id="reg-tire-size"
                      required={form.wantsTires}
                      value={form.tireSize}
                      onChange={(e) => setForm({ ...form, tireSize: e.target.value })}
                      placeholder="225/45R17"
                      className="field field--dark"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="tag text-ash" htmlFor="reg-tire-size-rear">
                        TIRE SIZE (REAR) — IF STAGGERED
                      </label>
                      <input
                        id="reg-tire-size-rear"
                        value={form.tireSizeRear}
                        onChange={(e) => setForm({ ...form, tireSizeRear: e.target.value })}
                        placeholder="Optional, e.g. 235/40R18"
                        className="field field--dark"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label className="tag text-ash" htmlFor="reg-tire-qty">
                          QUANTITY
                        </label>
                        <span className="stencil text-xl font-bold text-white">{form.tireQuantity}</span>
                      </div>
                      <input
                        id="reg-tire-qty"
                        type="range"
                        min={1}
                        max={8}
                        step={1}
                        value={form.tireQuantity}
                        onChange={(e) => setForm({ ...form, tireQuantity: Number(e.target.value) })}
                        className="mt-3 w-full accent-acid"
                      />
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-bone/50">
                    Expected price: ~300 SAR per tire*
                    <br />
                    Tire change team available in the event area.
                  </p>
                  <p className="text-xs leading-relaxed text-bone/40">
                    *Tire prices are separate from your event registration fee. Payment for tires is made on-site
                    during the tire change — ordering an extra size costs nothing if you don&apos;t end up needing
                    it.
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-bone/12 pt-8">
              <button
                type="submit"
                disabled={state === 'loading'}
                className="group flex w-full items-center justify-between gap-4 bg-white px-8 py-5 stencil text-lg font-bold text-carbon transition-all duration-300 hover:bg-bone disabled:opacity-60"
              >
                {state === 'loading' ? 'SUBMITTING...' : 'REGISTER NOW'}
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </button>
              <p className="mt-4 text-center tag text-ash">YOU WILL RECEIVE PAYMENT DETAILS VIA WHATSAPP</p>
              <p className="mt-4 text-center text-xs leading-relaxed text-bone/40">
                By registering, you agree to our{' '}
                <a href="/privacy" className="swipe text-bone/60">
                  Privacy Policy
                </a>{' '}
                and{' '}
                <a href="/terms" className="swipe text-bone/60">
                  Terms of Service
                </a>
                .
              </p>
            </div>

            {msg && (
              <div
                className={`border-l-2 py-3 pl-4 ${
                  state === 'ok' ? 'border-white text-white' : 'border-bone/50 text-bone/70'
                }`}
              >
                {msg}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
