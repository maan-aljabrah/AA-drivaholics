'use client';

import { useEffect, useRef, useState } from 'react';

/** Lerped dual-ring cursor with contextual labels. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const ring = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add('has-cursor');

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
      const hoverable = (e.target as HTMLElement)?.closest?.('[data-cursor]');
      if (hoverable) {
        setActive(true);
        setLabel(hoverable.getAttribute('data-cursor') || '');
      } else {
        setActive(false);
        setLabel('');
      }
    };

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.14;
      pos.y += (target.y - pos.y) * 0.14;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove);
    frame = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
      document.body.classList.remove('has-cursor');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[70] h-1.5 w-1.5 rounded-full bg-acid mix-blend-difference"
      />
      <div
        ref={ring}
        className={`pointer-events-none fixed left-0 top-0 z-[69] flex items-center justify-center rounded-full border transition-[width,height,background-color,border-color] duration-300 ${
          active
            ? 'h-20 w-20 border-transparent bg-acid text-carbon'
            : 'h-9 w-9 border-bone/40 bg-transparent text-acid'
        }`}
      >
        {label && <span className="tag font-bold">{label}</span>}
      </div>
    </>
  );
}
