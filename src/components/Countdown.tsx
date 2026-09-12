'use client';

import { useEffect, useState } from 'react';

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number; done: boolean };

function getTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    done: diff <= 0,
  };
}

export default function Countdown({ targetIso, title, eventDate }: { targetIso: string; title: string; eventDate: string }) {
  const target = new Date(targetIso).getTime();
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Date.now() is only meaningful client-side; computing it during render would mismatch SSR output.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (time?.done) return null;

  const units: { value: number; label: string }[] = [
    { value: time?.days ?? 0, label: 'Days' },
    { value: time?.hours ?? 0, label: 'Hours' },
    { value: time?.minutes ?? 0, label: 'Minutes' },
    { value: time?.seconds ?? 0, label: 'Seconds' },
  ];

  return (
    <section className="relative overflow-hidden border-y border-bone/12 bg-carbon py-16 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(216,255,62,0.08), transparent 70%)' }}
      />
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-[1600px] px-5 text-center md:px-10">
        <p className="flex items-center justify-center gap-2 tag text-acid">
          <span className="anim-blink">●</span> NEXT EVENT — {eventDate}
        </p>
        <h2 className="mega mt-4 text-[9vw] leading-[0.9] sm:text-[3.4rem] md:text-[4.6rem]">{title}</h2>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-4 gap-2 sm:gap-5">
          {units.map((u) => (
            <div key={u.label} className="border border-bone/15 bg-carbon-2 py-5 sm:py-10">
              <div className="mega text-[11vw] leading-none tabular-nums text-white sm:text-[3.6rem] md:text-[5rem]">
                {String(u.value).padStart(2, '0')}
              </div>
              <div className="tag mt-2 text-ash">{u.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-10 tag text-ash">COUNTING DOWN TO THE NEXT SEND</p>
      </div>
    </section>
  );
}
