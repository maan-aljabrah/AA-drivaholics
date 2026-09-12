import { Eyebrow } from './ui';

const PERKS = [
  { n: '01', label: 'On-site branding', note: 'Signage, banners & activation space at every event' },
  { n: '02', label: 'Social reach', note: 'Featured across our Instagram, TikTok & event recap reels' },
  { n: '03', label: 'Direct access', note: 'In front of 150+ drivers who actually spend on their cars' },
];

export default function Partners() {
  return (
    <section id="partners" className="relative overflow-hidden bg-carbon-2 py-24 md:py-32">
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow index="08">Partner with us</Eyebrow>
            <h2 className="mega mt-5 text-[13vw] leading-[0.85] sm:text-[7vw] md:text-[4.6rem]">
              BECOME A <span className="outline-type">SPONSOR</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-bone/55">
            We put brands in front of drivers who care — on the tarmac, in the paddock, and across every recap that
            goes out after. Let&apos;s build something that fits your brand.
          </p>
        </div>

        <div className="mt-12 grid gap-px border border-bone/12 bg-bone/12 sm:grid-cols-3">
          {PERKS.map((p) => (
            <div key={p.n} className="group relative overflow-hidden bg-carbon-2 p-7 transition-colors duration-500 hover:bg-carbon-3 md:p-9">
              <span className="absolute right-4 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
                {p.n}
              </span>
              <p className="stencil text-lg font-bold text-white">{p.label}</p>
              <div className="mt-4 h-px w-full bg-bone/12">
                <div
                  className="h-full origin-left scale-x-0 bg-acid transition-transform duration-700 group-hover:scale-x-100"
                />
              </div>
              <p className="tag mt-4 text-ash">{p.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <a
            href="mailto:info@drivaholics.com?subject=Sponsorship%20Inquiry%20%E2%80%94%20DRIVAHOLICS"
            data-cursor="MAIL"
            className="group flex items-center gap-4 border border-acid bg-acid px-7 py-5 stencil text-lg font-extrabold text-carbon transition-colors duration-300 hover:bg-transparent hover:text-acid"
          >
            Become a Partner
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </a>
          <span className="tag text-bone/40">Future calendar (coming soon)</span>
        </div>
      </div>
    </section>
  );
}
