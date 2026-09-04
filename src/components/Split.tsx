'use client';

import { useState } from 'react';
import { Eyebrow } from './ui';

const PANELS = [
  {
    key: 'on',
    label: 'ON TRACK',
    note: 'Drift · Autocross · Gymkhana',
    img: '/media/dh/dh-branded-m4.jpg',
    accent: '#ffffff',
    href: '#experiences',
  },
  {
    key: 'off',
    label: 'OFF TRACK',
    note: 'Meets, shows, long roads',
    img: '/media/dh/dh-off-track.jpg',
    accent: '#ffffff',
    href: '#gallery',
  },
];

export default function Split() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative bg-carbon py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <Eyebrow index="04">Two halves of the same obsession</Eyebrow>
      </div>

      <div className="mx-auto mt-10 flex max-w-[1600px] flex-col gap-3 px-5 md:h-[76vh] md:flex-row md:px-10">
        {PANELS.map((p) => {
          const isActive = active === p.key;
          const isDim = active !== null && !isActive;
          return (
            <a
              key={p.key}
              href={p.href}
              data-cursor="SEE"
              onMouseEnter={() => setActive(p.key)}
              onFocus={() => setActive(p.key)}
              onMouseLeave={() => setActive(null)}
              onBlur={() => setActive(null)}
              className="group relative block h-[52vh] overflow-hidden border border-bone/12 text-left md:h-full"
              style={{
                flex: isActive ? 1.45 : isDim ? 0.72 : 1,
                transition: 'flex 900ms cubic-bezier(.16,1,.3,1)',
              }}
            >
              <img
                src={p.img}
                alt={p.label}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-[filter,transform] duration-1000 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                style={{
                  filter: isActive ? 'grayscale(0) brightness(0.92)' : 'grayscale(1) brightness(0.45)',
                }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  background: `linear-gradient(0deg, ${p.accent}22, transparent 60%), linear-gradient(180deg, rgba(10,10,11,.15), rgba(10,10,11,.9))`,
                  opacity: isActive ? 1 : 0.55,
                }}
              />

              <div className="relative flex h-full flex-col justify-between p-6 md:p-9">
                <div className="flex items-start justify-between">
                  <span className="tag" style={{ color: p.accent }}>
                    {p.note}
                  </span>
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full border text-xs transition-[transform,background-color,border-color] duration-700"
                    style={{
                      borderColor: isActive ? p.accent : 'rgba(236,233,226,.25)',
                      color: isActive ? '#0a0a0b' : '#ece9e2',
                      background: isActive ? p.accent : 'transparent',
                      transform: isActive ? 'translateX(2px)' : 'none',
                    }}
                  >
                    →
                  </span>
                </div>

                <div>
                  <h3
                    className="mega text-[12vw] leading-[0.85] transition-[transform,color] duration-700 md:text-[4.6rem] xl:text-[6rem]"
                    style={{
                      color: isActive ? p.accent : '#ece9e2',
                      transform: isActive ? 'translateY(-6px)' : 'none',
                    }}
                  >
                    {p.label.split(' ')[0]}
                    <br />
                    {p.label.split(' ')[1]}
                  </h3>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
