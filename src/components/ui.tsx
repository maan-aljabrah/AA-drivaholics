'use client';

import { useInView } from '@/lib/hooks';
import type { ReactNode } from 'react';

/* ---------- spinning star ---------- */
export function Asterisk({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={`anim-spin-slow ${className}`} aria-hidden fill="currentColor">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <path key={deg} d="M50 50 L55.5 8 L44.5 8 Z" transform={`rotate(${deg} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="7.5" />
    </svg>
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
