'use client';

import { Eyebrow } from './ui';

const SHOTS = [
  {
    src: '/media/dh/dh-e63.jpg',
    cap: 'Full send, first run',
    loc: 'DRIFT 2025',
    rot: -7,
  },
  {
    src: '/media/dh/dh-m4-slide.jpg',
    cap: 'Smoking tyres, warm hearts',
    loc: 'DRIFT 2025',
    rot: 4,
  },
  {
    src: '/media/dh/dh-gr86.jpg',
    cap: 'The airfield is ours',
    loc: 'SEASON 01',
    rot: -3,
  },
  {
    src: '/media/dh/dh-gr86-navy.jpg',
    cap: 'GR86, locked sideways',
    loc: 'DRIFT 2025',
    rot: 8,
  },
  {
    src: '/media/dh/dh-supra.jpg',
    cap: 'Cone lines, no limits',
    loc: 'AUTOCROSS',
    rot: -5,
  },
  {
    src: '/media/dh/dh-supra-2.jpg',
    cap: 'Every run a new angle',
    loc: 'DRIFT 2025',
    rot: 6,
  },
];

export default function Reel() {
  return (
    <section id="gallery" className="relative overflow-hidden bg-carbon py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="07">From the members</Eyebrow>
            <h2 className="mega mt-5 text-[16vw] leading-[0.82] sm:text-[9vw] md:text-[6rem]">
              <span className="text-white">GALLERY</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-bone/55">
            Every session gets shot, every shot gets shared. Tag <span className="text-acid">#Drivaholics</span> and
            your frame ends up on this wall — or in the season film.
          </p>
        </div>
      </div>

      {/* scattered board */}
      <div className="mt-14 flex flex-wrap justify-center gap-6 px-5 [perspective:1200px] md:mt-20 md:gap-10 md:px-10">
        {SHOTS.map((s, i) => (
          <figure
            key={s.cap}
            className="polaroid group relative w-[42vw] max-w-[22rem] shrink-0 border-[10px] border-bone bg-bone md:w-[20rem]"
            style={{
              ['--rot' as string]: `${s.rot}deg`,
              ['--dy' as string]: i % 2 === 0 ? '0px' : '28px',
            }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-carbon">
              <img
                src={s.src}
                alt={s.cap}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-[filter,transform] duration-[1.2s] group-hover:scale-110 group-hover:grayscale-0"
              />
              <span className="absolute left-2 top-2 bg-carbon/80 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-acid">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-papaya opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <figcaption className="px-1 pb-1 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-carbon/60">#{String(i + 1).padStart(2, '0')}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-[1600px] px-5 text-center md:px-10">
        <p className="tag text-ash">EVERY SHOT ABOVE IS FROM OUR OWN EVENTS — NOTHING STOCK, NOTHING BORROWED</p>
        <a
          href="#join"
          data-cursor="JOIN"
          className="pill mx-auto mt-8 inline-block border border-white px-8 py-4 tag font-bold text-white"
        >
          Put your car in the next gallery →
        </a>
      </div>
    </section>
  );
}
