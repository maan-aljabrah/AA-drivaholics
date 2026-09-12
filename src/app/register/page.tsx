import { Asterisk } from '@/components/ui';
import RegisterForm from '@/components/RegisterForm';
import { getCurrentEvent } from '@/db/queries';

export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  const event = await getCurrentEvent();
  const isOpen = Boolean(event?.isOpen);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-10 border-b border-bone/10 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
          <a href="/" className="group flex items-center">
            <img
              src="/media/dh/Drivaholics.png"
              alt="Drivaholics"
              className="h-10 w-10 object-contain transition-transform duration-500 group-hover:rotate-[135deg]"
            />
          </a>
          <a href="/" className="swipe tag text-bone/70 hover:text-white">
            ← Back to site
          </a>
        </div>
      </header>

      {/* Photo band */}
      <div className="relative h-[42vh] min-h-[280px] overflow-hidden bg-black md:h-[50vh]">
        <img
          src="/media/dh/dh-branded-m4.jpg"
          alt="Drivaholics M4 mid-drift"
          className="ken-layer absolute inset-0 h-full w-full object-cover"
          style={{ filter: 'grayscale(1) contrast(1.15) brightness(0.55)' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />
        <div className="dotgrid pointer-events-none absolute inset-0 opacity-40" />
        <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
          <p className="tag text-bone/70">EVENT REGISTRATION</p>
          <h1 className="mega mt-4 text-[14vw] leading-[0.85] sm:text-[10vw] md:text-[6rem]">
            RESERVE YOUR <span className="outline-type">SPOT</span>
          </h1>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="dotgrid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
          {isOpen && event ? (
            <RegisterForm event={event} />
          ) : (
            <div className="mx-auto max-w-lg border border-bone/15 bg-carbon-2 p-10 text-center">
              <Asterisk className="mx-auto h-10 w-10 text-white" />
              <h2 className="stencil mt-6 text-2xl font-bold">No event open for registration right now</h2>
              <p className="mt-4 text-sm leading-relaxed text-bone/60">
                We&apos;re between events at the moment. Get on the list and we&apos;ll notify you the second
                registration opens.
              </p>
              <a
                href="/#join"
                className="pill mt-8 inline-block border border-white bg-white px-8 py-4 tag font-bold text-carbon"
              >
                Get on the list →
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
