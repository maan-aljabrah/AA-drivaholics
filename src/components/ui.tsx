'use client';

import { useInView } from '@/lib/hooks';
import type { ReactNode } from 'react';

/* ---------- spinning logo mark ---------- */
export function Asterisk({ className = '', invert = false }: { className?: string; invert?: boolean }) {
  return (
    <img
      src="/media/dh/Drivaholics.png"
      alt=""
      aria-hidden
      className={`anim-spin-slow object-contain ${className}`}
      style={invert ? { filter: 'invert(1)' } : undefined}
    />
  );
}

/* ---------- marquee ---------- */
export function Ticker({
  items,
  reverse = false,
  duration = 30,
  className = '',
  separator = '✦',
  onDark = true,
  textClass = 'text-[clamp(1.6rem,4.4vw,3.4rem)]',
  gapClass = 'gap-8 px-8',
}: {
  items: ReactNode[];
  reverse?: boolean;
  duration?: number;
  className?: string;
  separator?: ReactNode;
  onDark?: boolean;
  textClass?: string;
  gapClass?: string;
}) {
  const seq = [...items, ...items];
  return (
    <div className={`marquee-host relative overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${reverse ? 'anim-marquee-right' : 'anim-marquee-left'}`}
        style={{ ['--dur' as string]: `${duration}s` }}
      >
        {seq.map((item, i) => (
          <span
            key={i}
            className={`stencil flex shrink-0 items-center font-extrabold ${gapClass} ${textClass} ${
              onDark ? 'text-carbon' : 'text-bone'
            }`}
          >
            <span>{item}</span>
            <span className={`flex items-center ${onDark ? 'opacity-45' : 'text-acid'}`}>{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- scroll reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'p' | 'h2' | 'h3';
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  return (
    <Tag
      ref={ref as never}
      className={`rv ${inView ? 'in' : ''} ${className}`}
      style={{ ['--d' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ---------- section eyebrow ---------- */
export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-4 tag text-ash">
      <span className="text-acid">[{index}]</span>
      <span className="h-px w-10 bg-ash/40" />
      <span>{children}</span>
    </div>
  );
}
