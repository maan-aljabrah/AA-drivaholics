'use client';

import { useEffect, useState } from 'react';

const DURATION = 1500;

/** Odometer counter intro that wipes upward into the hero. */
export default function Preloader() {
  const [n, setN] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      setN(Math.round(t * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const lock = setTimeout(() => {
      document.documentElement.classList.add('locked');
    }, 250);
    const done = setTimeout(() => {
      document.documentElement.classList.remove('locked');
      setGone(true);
    }, DURATION + 800);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(lock);
      clearTimeout(done);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-carbon px-5 py-6 md:px-10 md:py-8"
      style={{ animation: `preloader-out .8s cubic-bezier(.85,0,.15,1) ${DURATION}ms forwards` }}
      aria-hidden
    >
      <div className="flex items-start justify-between tag text-ash">
        <span>DRIVAHOLICS — SINCE 2024</span>
        <span className="hidden md:block">KHOBAR · SAUDI ARABIA</span>
        <span className="text-acid">
          <span className="anim-blink">●</span> IGNITION
        </span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <p className="max-w-xs text-sm leading-snug text-ash">
          Building the grid. Warm tyres, fuel pressure nominal — hold the line.
        </p>
        <div className="mega text-[24vw] leading-[0.72] text-bone md:text-[16vw]">
          {String(n).padStart(3, '0')}
        </div>
      </div>

      <div className="relative h-px w-full bg-bone/15">
        <div
          className="absolute inset-y-0 left-0 w-full origin-left bg-acid"
          style={{ animation: `bar-grow ${DURATION}ms cubic-bezier(.6,0,.2,1) forwards` }}
        />
        <div className="absolute -bottom-6 left-0 w-full flex justify-between tag text-ash">
          {['PIT', 'TRACK', 'MEET', 'MEMBERS'].map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
