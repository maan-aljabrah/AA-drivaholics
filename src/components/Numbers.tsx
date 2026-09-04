'use client';

import { useCountUp, useInView } from '@/lib/hooks';
import { Asterisk, Eyebrow, Ticker } from './ui';

const STATS: { value?: number; display?: string; suffix?: string; label: string; note: string }[] = [
  { value: 150, suffix: '+', label: 'Members', note: 'Drivers who genuinely love cars' },
  { value: 4, label: 'Events run', note: 'Drift, gymkhana, Porsche experience' },
  { value: 2, label: 'Cities', note: 'Saudi Arabia & Bahrain' },
];

function Counter({ to, active }: { to: number; active: boolean }) {
  const v = useCountUp(to, active, 1700);
  return <span className="tabular-nums">{v.toLocaleString()}</span>;
}

function StatValue({ stat }: { stat: (typeof STATS)[number] }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4);
  return (
    <span ref={ref} className="mega text-[13vw] leading-[0.8] text-bone transition-colors duration-500 group-hover:text-white sm:text-[4.4rem] lg:text-[5rem]">
      {typeof stat.value === 'number' ? <Counter to={stat.value} active={inView} /> : stat.display}
      {stat.suffix ?? ''}
    </span>
  );
}

export default function Numbers() {
  return (
    <section id="numbers" className="relative overflow-hidden bg-carbon">
      <Ticker
        items={['KHOBAR · SAUDI ARABIA', 'SMOKE LOGGED', 'TYRES WARMED', 'EVERYBODY HOME SAFE', 'SINCE 2024']}
        duration={40}
        reverse
        className="border-y border-bone/12 py-3"
        onDark={false}
        separator={<Asterisk className="h-4 w-4 text-white" />}
        textClass="text-[clamp(1rem,2.3vw,1.7rem)]"
        gapClass="gap-6 px-6"
      />

      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="05">By the numbers</Eyebrow>
            <h2 className="mega mt-5 text-[13vw] leading-[0.85] sm:text-[7vw] md:text-[4.6rem]">
              WHO <span className="outline-type">ARE WE</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-bone/55">
            Founded in 2024 in Khobar, Saudi Arabia. We run one big drift event yearly, plus smaller sessions
            across Saudi Arabia and Bahrain — full smoke, full send, everybody home safe.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-bone/12 bg-bone/12 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div key={s.label} className="group relative overflow-hidden bg-carbon p-7 transition-colors duration-500 hover:bg-carbon-3 md:p-9">
              <span className="absolute right-4 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
                0{i + 1}
              </span>
              <StatValue stat={s} />
              <div className="mt-6 h-px w-full bg-bone/12">
                <div
                  className="h-full origin-left scale-x-0 bg-white transition-transform duration-700 group-hover:scale-x-100"
                  style={{ transitionDelay: `${i * 40}ms` }}
                />
              </div>
              <p className="stencil mt-4 text-lg font-bold">{s.label}</p>
              <p className="tag mt-2 text-ash">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
