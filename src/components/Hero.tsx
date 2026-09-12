'use client';

import { useEffect, useRef, useState } from 'react';
import { usePointer } from '@/lib/hooks';
import { Asterisk, Ticker } from './ui';

const WORD = 'DRIVAHOLICS';

function Letters({ text, className = '' }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split('').map((c, i) => (
        <span key={i} className="ltr" style={{ transitionDelay: `${i * 8}ms` }}>
          {c}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { x, y } = usePointer();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [locked, setLocked] = useState(false);
  const [time, setTime] = useState('');
  const [ready, setReady] = useState(false);
  const [film, setFilm] = useState<'checking' | 'video' | 'photo'>('checking');
  const loadStart = useRef(0);

  useEffect(() => {
    const fmt = () =>
      setTime(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Asia/Riyadh',
        })
      );
    fmt();
    const id = setInterval(fmt, 1000);
    const intro = setTimeout(() => setReady(true), 1550);
    return () => {
      clearInterval(id);
      clearTimeout(intro);
    };
  }, []);

  // Skip the 10MB video on a slow/metered connection and keep the static photo instead.
  useEffect(() => {
    loadStart.current = performance.now();
    const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
    const conn = nav.connection;
    const reducedData = typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-data: reduce)').matches;
    if (reducedData || (conn && (conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType ?? '')))) {
      // navigator/matchMedia only exist client-side; reading them pre-mount would mismatch SSR output.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFilm('photo');
    }
  }, []);

  const handlePhotoLoad = () => {
    setFilm((current) => {
      if (current !== 'checking') return current;
      const elapsed = performance.now() - loadStart.current;
      return elapsed > 1200 ? 'photo' : 'video';
    });
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (locked) v.pause();
    else v.play().catch(() => undefined);
  }, [locked, film]);

  const px = locked ? 0 : x;
  const py = locked ? 0 : y;

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-black" id="top">
      {/* ---- full-bleed film ---- */}
      <button
        type="button"
        aria-label={film === 'video' ? (locked ? 'Release the film' : 'Tap to lock the film') : 'Drivaholics'}
        data-cursor={film === 'video' ? (locked ? 'UNLOCK' : 'LOCK') : undefined}
        onClick={() => film === 'video' && setLocked((v) => !v)}
        className={`absolute inset-0 block h-full w-full text-left ${film === 'video' ? 'cursor-pointer' : ''}`}
        style={{ transform: `translate3d(${px * -14}px, ${py * -10}px, 0) scale(1.06)`, transition: 'transform .7s cubic-bezier(.16,1,.3,1)' }}
      >
        {film === 'video' ? (
          <video
            ref={videoRef}
            className={`h-full w-full object-cover ${locked ? '' : 'ken-layer'}`}
            style={{ filter: 'grayscale(1) contrast(1.15) brightness(0.62)' }}
            src="/media/dh/dh-hero.mp4"
            poster="/media/dh/dh-hero.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <img
            src="/media/dh/dh-hero.jpg"
            alt="Drivaholics"
            onLoad={handlePhotoLoad}
            onError={() => setFilm('photo')}
            className={`h-full w-full object-cover ${film === 'checking' ? '' : 'ken-layer'}`}
            style={{ filter: 'grayscale(1) contrast(1.15) brightness(0.62)' }}
          />
        )}
      </button>

      {/* overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-40" />
      <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />

      {/* corner frame */}
      {['left-4 top-24 border-l border-t md:left-8', 'right-4 top-24 border-r border-t md:right-8', 'left-4 bottom-28 border-b border-l md:left-8', 'right-4 bottom-28 border-b border-r md:right-8'].map(
        (c) => (
          <span key={c} className={`pointer-events-none absolute z-10 h-6 w-6 border-bone/50 md:h-8 md:w-8 ${c}`} />
        )
      )}

      {/* content */}
      <div
        className={`pointer-events-none relative z-10 flex h-full flex-col justify-end px-5 pb-36 pt-32 md:px-10 md:pb-32 ${
          ready ? 'opacity-100 in' : 'opacity-0'
        }`}
      >
        <div className="pointer-events-auto flex flex-wrap items-center gap-x-5 gap-y-2 tag">
          <span className="flex items-center gap-2 text-white">
            <span className="anim-blink">●</span> LIVE FEED
          </span>
          <span className="text-bone/70">KHOBAR {time || '--:--:--'}</span>
          <span className="hidden text-bone/70 sm:inline">SINCE 2024</span>
          {film === 'video' && (
            <span className="hidden text-bone/40 md:inline">TAP THE FILM TO {locked ? 'RELEASE' : 'LOCK'}</span>
          )}
        </div>

        <h1 className="mt-5">
          <span className="line-mask">
            <span className="block" style={{ ['--d' as string]: '120ms' }}>
              <Letters
                text={WORD}
                className="mega block whitespace-nowrap text-[15vw] leading-[0.85] sm:text-[12.5vw] lg:text-[16.2vw]"
              />
            </span>
          </span>
          <span className="line-mask">
            <span
              className="block pt-3 tag text-bone/80"
              style={{ ['--d' as string]: '280ms', fontSize: 'clamp(0.7rem, 1.6vw, 1.05rem)' }}
            >
              MAKING EVERLASTING MEMORIES
            </span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-[0.95rem] leading-relaxed text-bone/75">
            We bring drivers together to enjoy their cars, improve skills, and be part of{' '}
            <span className="text-white">real car culture</span> — briefed, marshalled, and run properly.
          </p>
          <div className="pointer-events-auto flex flex-wrap items-center gap-3">
            <a
              href="/register"
              data-cursor="REGISTER"
              className="pill border border-white bg-white px-10 py-5 stencil text-base font-extrabold uppercase tracking-wide text-carbon transition-colors hover:bg-transparent hover:text-white sm:text-lg"
            >
              Register Now →
            </a>
            <a href="#experiences" data-cursor="SEE" className="swipe py-4 tag text-bone/60 transition-colors hover:text-white">
              What we run ↓
            </a>
          </div>
        </div>
      </div>



      {/* lock state chip */}
      {film === 'video' && (
        <div
          className={`pointer-events-none absolute left-5 top-28 z-10 transition-opacity duration-500 md:left-10 ${
            locked ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="flex items-center gap-2 border border-white bg-black/70 px-3 py-2 tag text-white backdrop-blur-sm">
            ◉ FILM LOCKED
          </span>
        </div>
      )}

      {/* bottom stack */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between border-y border-bone/15 bg-black/60 px-5 py-2 tag text-bone/60 backdrop-blur-sm md:px-10">
          <span className="hidden items-center gap-2 sm:flex">
            <Asterisk className="h-3 w-3 text-white" /> SCROLL — THE PADDOCK OPENS BELOW
          </span>
          <span className="flex items-center gap-2">
            <span className="anim-bob inline-block">↓</span>
            <span className="text-bone">Paddock</span>
          </span>
          <span className="text-bone">DRIVA · HOLICS</span>
        </div>
        <Ticker
          items={['MAKING EVERLASTING MEMORIES', 'DRIFT · GYMKHANA', 'REAL CAR CULTURE', 'KHOBAR · SAUDI ARABIA']}
          duration={34}
          className="bg-white py-2.5"
          separator={<Asterisk className="h-4 w-4" />}
        />
      </div>
    </section>
  );
}
