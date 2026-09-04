'use client';

import { useRef, useState } from 'react';
import { useDragScroll } from '@/lib/hooks';
import { Asterisk, Eyebrow, Reveal } from './ui';

type Item = {
  n: string;
  title: string;
  kicker: string;
  body: string;
  meta: [string, string];
  img: string;
  tone: 'acid' | 'papaya';
};

const ITEMS: Item[] = [
  {
    n: '01',
    title: 'Drift Event',
    kicker: 'The flagship — yearly',
    body: 'One big drift event every year, plus a few smaller sessions. Padded cones, full smoke, marshals on-site. Bring the build, take the throttle, keep it legal.',
    meta: ['YEARLY EVENT', 'SMALL SESSIONS'],
    img: '/media/dh/dh-blue-m3.jpg',
    tone: 'acid',
  },
  {
    n: '02',
    title: 'Gymkhana',
    kicker: 'Head-to-head mirror track',
    body: 'Two cars on a small mirrored track — precision, pressure, and pace. Every apex counts, every run is judged.',
    meta: ['HEAD TO HEAD', 'MIRRORED'],
    img: '/media/dh/dh-gymkhana-sf90.jpg',
    tone: 'papaya',
  },
  {
    n: '03',
    title: 'Porsche Drift Experience',
    kicker: 'Teaching oversteer at BIC',
    body: 'An event dedicated to teaching Porsche drivers the art of controlled oversteer — held at Bahrain International Circuit.',
    meta: ['BIC BAHRAIN', 'PORSCHE ONLY'],
    img: '/media/dh/dh-porsche.jpg',
    tone: 'acid',
  },
];

export default function Experiences() {
  const { ref, handlers } = useDragScroll();
  const barRef = useRef<HTMLDivElement | null>(null);
  const [pct, setPct] = useState(0);

  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const p = max > 0 ? el.scrollLeft / max : 0;
    setPct(p);
    if (barRef.current) barRef.current.style.transform = `scaleX(${Math.max(0.04, p)})`;
  };

  return (
    <section id="experiences" className="relative overflow-hidden bg-carbon-2 py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-col justify-between gap-6 border-b border-bone/12 pb-8 md:flex-row md:items-end">
          <div>
            <Eyebrow index="03">The calendar</Eyebrow>
            <Reveal>
              <h2 className="mega mt-5 text-[15vw] leading-[0.82] sm:text-[10vw] md:text-[6.6rem]">
                <span className="line-mask">
                  <span className="block">SOMETHING</span>
                </span>
                <span className="line-mask">
                  <span className="block outline-type">IS ALWAYS</span>
                </span>
                <span className="line-mask">
                  <span className="block text-acid">RUNNING.</span>
                </span>
              </h2>
            </Reveal>
          </div>
          <Reveal className="max-w-xs">
            <p className="text-sm leading-relaxed text-bone/60">
              Drag the rail or use your trackpad. Every event is briefed and marshalled — run properly, and
              everybody gets home safe.
            </p>
            <span className="mt-4 flex items-center gap-2 tag text-white">
              DRAG <Asterisk className="h-3.5 w-3.5" /> {ITEMS.length} EXPERIENCES
            </span>
          </Reveal>
        </div>
      </div>

      {/* rail */}
      <div
        ref={ref}
        onScroll={onScroll}
        {...handlers}
        className="rail mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:px-10"
      >
        {ITEMS.map((it, i) => (
          <article
            key={it.n}
            className="group relative w-[82vw] shrink-0 snap-start border border-bone/12 bg-carbon p-4 transition-colors duration-500 hover:border-acid/60 sm:w-[58vw] lg:w-[30rem]"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-carbon-3">
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                className="h-full w-full object-cover grayscale brightness-[0.82] transition-[filter,transform] duration-[1.1s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07] group-hover:grayscale-0 group-hover:brightness-100"
              />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.14), transparent 55%)',
                }}
              />
              <span className="absolute left-3 top-3 bg-carbon/85 px-2.5 py-1 tag text-acid backdrop-blur-sm">
                {it.n}
              </span>
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                {it.meta.map((m) => (
                  <span key={m} className="border border-bone/25 bg-carbon/70 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-bone/80 backdrop-blur-sm">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-1 pb-2 pt-5">
              <p className="tag text-acid/80">{it.kicker}</p>
              <h3 className="stencil mt-3 text-4xl font-extrabold transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                {it.title}
              </h3>
              <p className="mt-4 min-h-[3.5rem] text-sm leading-relaxed text-bone/55">{it.body}</p>
              <a
                href="#join"
                data-cursor="JOIN"
                className="mt-6 flex items-center justify-between border-t border-bone/10 pt-4"
              >
                <span className="tag text-ash transition-colors group-hover:text-bone">Add to waitlist</span>
                <span className="grid h-9 w-9 place-items-center border border-bone/20 text-acid transition-all duration-500 group-hover:border-acid group-hover:bg-acid group-hover:text-carbon">
                  →
                </span>
              </a>
            </div>
          </article>
        ))}

        {/* end card */}
        <div className="flex w-[70vw] shrink-0 snap-start items-center justify-center border border-dashed border-bone/20 sm:w-[40vw] lg:w-[22rem]">
          <div className="text-center">
            <Asterisk className="mx-auto h-10 w-10 text-acid" />
            <p className="stencil mt-5 text-2xl font-extrabold">You reached<br />the chequered flag</p>
            <a href="#join" data-cursor="JOIN" className="swipe mt-5 inline-block tag text-acid">
              Get the schedule first →
            </a>
          </div>
        </div>
      </div>

      {/* progress */}
      <div className="mx-auto mt-8 max-w-[1600px] px-5 md:px-10">
        <div className="h-px w-full bg-bone/12">
          <div ref={barRef} className="h-full origin-left bg-acid transition-transform duration-150" style={{ transform: 'scaleX(0.04)' }} />
        </div>
        <div className="mt-3 flex justify-between tag text-ash">
          <span>{String(Math.round(pct * 100)).padStart(2, '0')}% ACROSS THE RAIL</span>
          <span className="hidden md:inline">HOLD · DRAG · RELEASE</span>
          <span>{String(ITEMS.length).padStart(2, '0')} SESSIONS</span>
        </div>
      </div>
    </section>
  );
}
