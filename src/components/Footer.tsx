'use client';

import { Asterisk } from './ui';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/drivaholics' },
  { label: 'TikTok', href: 'https://tiktok.com/@drivaholics' },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-carbon pt-20">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 border-b border-bone/12 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="tag text-ash">For questions or support, contact us</p>
          <h2 className="mega mt-5 text-[11vw] leading-[0.85] sm:text-[7vw] md:text-[3.3rem]">
            LET&apos;S
            <br />
            <span className="text-white">TALK</span>
          </h2>
            <a
              href="https://api.whatsapp.com/send/?phone=966567399225&text=Hi%20Drivaholics&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="CHAT"
              className="pill mt-8 inline-flex items-center gap-3 border border-white px-6 py-4 tag font-bold text-white"
            >
              WhatsApp +966 56 739 9225
            </a>
          </div>

          <div className="md:col-span-3">
            <p className="tag text-ash">Direct</p>
            <ul className="mt-6 space-y-4">
              <li>
                <a href="mailto:info@drivaholics.com" data-cursor="MAIL" className="swipe stencil text-xl font-bold hover:text-white md:text-2xl">
                  info@DRIVAHOLICS.com
                </a>
              </li>
              <li className="text-sm text-bone/50">
                Khobar · Saudi Arabia
                <br />
                Events across Saudi Arabia & Bahrain
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="tag text-ash">Follow</p>
            <ul className="mt-6 space-y-3">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" data-cursor="OPEN" className="swipe flex items-center gap-2 text-sm text-bone/70 hover:text-white">
                    <span className="text-white">↗</span>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="tag text-ash">Index</p>
            <ul className="mt-6 space-y-3">
              {[
                ['The Club', '#manifesto'],
                ['Experiences', '#experiences'],
                ['How to Join', '#tiers'],
                ['Numbers', '#numbers'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} data-cursor="GO" className="swipe text-sm text-bone/70 hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* giant stroked wordmark */}
      <div className="group relative select-none px-2 pt-10 md:px-6">
        <div className="mega whitespace-nowrap text-center text-[19.5vw] leading-[0.78] text-transparent [-webkit-text-stroke:1.5px_rgba(236,233,226,0.35)] transition-[color,-webkit-text-stroke] duration-700 hover:text-acid hover:[-webkit-text-stroke:0px]">
          DRIVAHOLICS
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="tag translate-y-[6.5vw] text-carbon opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            MAKING EVERLASTING MEMORIES
          </span>
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-bone/12 px-5 py-6 tag text-ash md:flex-row md:px-10">
        <span className="flex items-center gap-2">
          <Asterisk className="h-3.5 w-3.5 text-white" /> © {new Date().getFullYear()} DRIVAHOLICS — ALL RIGHTS RESERVED
        </span>
        <span className="hidden md:inline">DRIVE IT. CARE FOR IT. RESPECT THE ROAD.</span>
        <a href="#top" data-cursor="TOP" className="swipe flex items-center gap-2 text-bone hover:text-white">
          BACK TO TOP <span className="anim-bob inline-block">↑</span>
        </a>
      </div>
    </footer>
  );
}
