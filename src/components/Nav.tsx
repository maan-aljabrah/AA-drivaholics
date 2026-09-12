'use client';

import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'The Club', href: '#manifesto' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'How to Join', href: '#tiers' },
  { label: 'Numbers', href: '#numbers' },
  { label: 'Partners', href: '#partners' },
  { label: 'Contact', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > 320 && y > last);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[65] transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${solid ? 'border-b border-bone/10 bg-carbon/85 backdrop-blur-xl' : 'border-b border-transparent'}`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-3.5 md:px-10">
          <a href="#top" data-cursor="TOP" className="group flex items-center">
            <img
              src="/media/dh/Drivaholics.png"
              alt="Drivaholics"
              className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-[135deg]"
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="GO"
                className="swipe tag text-bone/65 transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#join"
              data-cursor="SIGN"
              className="hidden border border-acid bg-acid px-5 py-2.5 tag font-bold text-carbon transition-colors hover:bg-transparent hover:text-acid sm:block"
            >
              Early access
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="grid h-10 w-10 place-items-center border border-bone/20 lg:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-px w-full bg-bone transition-all duration-300 ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-bone transition-all duration-300 ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* full screen menu */}
      <div
        className={`fixed inset-0 z-[64] flex flex-col justify-center bg-carbon transition-[clip-path,opacity] duration-700 lg:hidden ${
          open ? 'pointer-events-auto opacity-100 [clip-path:circle(150%_at_100%_0%)]' : 'pointer-events-none opacity-0 [clip-path:circle(0%_at_100%_0%)]'
        }`}
      >
        <div className="dotgrid absolute inset-0 opacity-50" />
        <nav className="relative flex flex-col gap-2 px-6">
          {[...LINKS, { label: 'Join now', href: '#join' }].map((l, i) => (
            <a
              key={l.href + i}
              href={l.href}
              onClick={() => setOpen(false)}
              className="mega border-b border-bone/10 py-4 text-[13vw] text-bone transition-colors hover:text-acid"
            >
              <span className="mr-3 font-mono text-xs text-acid align-super">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="relative mt-10 px-6 tag text-ash">
          info@drivaholics.com · +966 56 739 9225
        </div>
      </div>
    </>
  );
}
