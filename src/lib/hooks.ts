'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Fires once when the element scrolls into view. */
export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/** 0 → 1 progress of an element travelling through the viewport. */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // start when the top hits the bottom of viewport, end when the bottom hits top
      const total = rect.height + vh * 0.55;
      const start = rect.top - vh * 0.85;
      const p = Math.min(1, Math.max(0, (start / (total - vh * 0.35)) * -1 + 0));
      const value = 1 - Math.min(1, Math.max(0, (rect.top - vh * 0.8) / (total * 0.62)));
      void p;
      setProgress(value);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { ref, progress };
}

/** Normalised pointer position (-1 → 1) for parallax layers. */
export function usePointer() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return pos;
}

/** Counts up to `to` once visible. */
export function useCountUp(to: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, active, duration]);
  return value;
}

/** Drag-to-scroll for horizontal rails. */
export function useDragScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef({ down: false, startX: 0, startScroll: 0 });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    state.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
    el.classList.add('dragging');
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !state.current.down) return;
    el.scrollLeft = state.current.startScroll - (e.clientX - state.current.startX);
  }, []);

  const stop = useCallback(() => {
    state.current.down = false;
    ref.current?.classList.remove('dragging');
  }, []);

  useEffect(() => {
    window.addEventListener('pointerup', stop);
    return () => window.removeEventListener('pointerup', stop);
  }, [stop]);

  return { ref, handlers: { onPointerDown, onPointerMove, onPointerLeave: stop, onPointerUp: stop } };
}
