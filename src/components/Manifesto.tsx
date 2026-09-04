'use client';

import { useScrollProgress } from '@/lib/hooks';
import { Eyebrow, Reveal } from './ui';

const COPY =
  "Drivaholics is a driving community for people who genuinely love cars and driving. We bring drivers together to enjoy their machines, sharpen their skills, and build real car culture in this region — with respect for the road, the cars, and each other.";

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative bg-carbon py-24 md:py-32">
      <div className="relative">
        <div className="flex items-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,rgba(216,255,62,0.09),transparent_70%)]" />

          <div className="relative mx-auto grid w-full max-w-[1600px] grid-cols-12 gap-6 px-5 py-24 md:px-10">
            <div className="hidden md:col-span-2 md:block">
              <div className="tag space-y-2 text-ash">
                {[
                  ['A', 'THE CLUB'],
                  ['B', 'MANIFESTO'],
                  ['C', '140 CHARS? NO.'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-center gap-2 border-b border-bone/10 pb-2">
                    <span className="text-acid">{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12">
              <p className="stencil text-[7.6vw] font-extrabold leading-[1.03] tracking-[-0.03em] text-bone sm:text-[5.4vw] lg:text-[3.35rem] xl:text-[4.05rem]">
                {COPY}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---- vision / mission ---- */}
      <div className="relative mx-auto max-w-[1600px] px-5 pb-24 md:px-10">
        <div className="mb-10">
          <Eyebrow index="02">Where we are going</Eyebrow>
        </div>
        <div className="grid gap-px overflow-hidden border border-bone/12 bg-bone/12 md:grid-cols-2">
          {[
            {
              n: 'V',
              t: 'Vision',
              b: "To shape the region's most respected driving community — where passion, skill and responsibility define the culture.",
            },
            {
              n: 'M',
              t: 'Mission',
              b: 'Premium driving experiences that improve skills, build confidence and unite enthusiasts through a shared passion.',
            },
          ].map((c, i) => (
            <Reveal key={c.n} delay={i * 110} className="group relative bg-carbon p-7 md:p-10">
              <div className="absolute inset-0 -translate-y-full bg-acid transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-y-0" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-baseline justify-between">
                  <span className="mega text-6xl text-bone/15 transition-colors duration-500 group-hover:text-carbon md:text-7xl">
                    {c.n}
                  </span>
                  <span className="tag text-ash transition-colors group-hover:text-carbon/70">0{i + 1}</span>
                </div>
                <h3 className="stencil mt-8 text-3xl font-extrabold transition-colors duration-500 group-hover:text-carbon md:text-4xl">
                  {c.t}
                </h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/60 transition-colors duration-500 group-hover:text-carbon/85">
                  {c.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
