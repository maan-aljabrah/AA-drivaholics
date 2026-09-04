'use client';

import { Asterisk, Eyebrow, Reveal } from './ui';

export default function Tiers() {
  const scrollToJoin = () => {
    document.getElementById('join')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="tiers" className="relative overflow-hidden bg-carbon-2 py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-white/5 blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-[1600px] gap-14 px-5 md:grid-cols-12 md:px-10">
        {/* -------- product shot -------- */}
        <div className="md:col-span-5">
          <div className="sticky top-28">
            <Eyebrow index="06">No tiers, no hassle</Eyebrow>
            <Reveal>
              <h2 className="mega mt-6 text-[13.5vw] leading-[0.84] sm:text-[8vw] md:text-[4.4rem] xl:text-[5.2rem]">
                JOIN THE<br />
                <span className="text-white">NEXT</span>{' '}
                <span className="outline-type">EVENT</span>
              </h2>
            </Reveal>

            <div className="relative mt-10 aspect-square overflow-hidden bg-carbon-3">
              <img
                src="/media/dh/dh-cts-v.jpg"
                alt="Drivaholics event car in the middle of a run"
                loading="lazy"
                className="ken-layer h-full w-full object-cover grayscale brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-carbon/80 via-transparent to-carbon/30" />
              <div className="absolute inset-0 flex items-start justify-between p-5">
                <span className="bg-white px-3 py-1.5 tag text-carbon">DRIFT EVENT 2024</span>
                <Asterisk className="h-9 w-9 text-white" />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-carbon/85 px-5 py-3 backdrop-blur-sm">
                <p className="tag text-bone/70">
                  KHOBAR · SAUDI ARABIA <span className="text-white">· SINCE 2024</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* -------- info block -------- */}
        <div className="md:col-span-7">
          <div className="border border-bone/15 bg-carbon p-8 md:p-12">
            <h3 className="stencil text-3xl font-bold md:text-4xl">How to join</h3>
            <p className="mt-6 max-w-2xl text-[0.95rem] leading-relaxed text-bone/70">
              Drivaholics runs <span className="text-white">signup-per-event</span> — no memberships, no tiers. Each
              event has its own registration, pricing, and details. Follow us on{' '}
              <a
                href="https://instagram.com/drivaholics"
                target="_blank"
                rel="noopener noreferrer"
                className="swipe text-white"
              >
                Instagram
              </a>{' '}
              and the next one opens soon.
            </p>

            <div className="mt-10 grid gap-px border border-bone/12 bg-bone/12 sm:grid-cols-3">
              {[
                { n: '01', t: 'One big drift event', d: 'Yearly flagship + smaller sessions' },
                { n: '02', t: 'Gymkhana', d: 'Head-to-head mirror track' },
                { n: '03', t: 'Special events', d: 'Invite-only experiences' },
              ].map((e, i) => (
                <Reveal key={e.n} delay={i * 100} className="bg-carbon-3 p-6">
                  <span className="tag text-white">{e.n}</span>
                  <p className="stencil mt-3 text-xl font-bold">{e.t}</p>
                  <p className="tag mt-2 text-ash">{e.d}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="/register"
                  data-cursor="REGISTER"
                  className="pill border border-white bg-white px-8 py-4 tag font-bold text-carbon hover:bg-bone"
                >
                  Register for upcoming events
                </a>
                <button
                  type="button"
                  onClick={scrollToJoin}
                  data-cursor="NOTIFY"
                  className="pill border border-white px-8 py-4 tag font-bold text-white"
                >
                  Get notified
                </button>
              </div>
              <a
                href="https://instagram.com/drivaholics"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="FOLLOW"
                className="swipe py-4 tag text-bone/70 hover:text-white"
              >
                Follow on Instagram →
              </a>
            </div>

            <p className="mt-8 flex items-center gap-3 border-t border-bone/12 pt-8 tag text-ash">
              <Asterisk className="h-4 w-4 text-white" />
              EACH EVENT ANNOUNCED ON INSTAGRAM.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
