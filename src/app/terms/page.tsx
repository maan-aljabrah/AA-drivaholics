import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — DRIVAHOLICS',
  description: 'The terms for joining Drivaholics and attending our events.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-carbon text-bone">
      <header className="border-b border-bone/10 bg-carbon/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-5 py-4 md:px-10">
          <a href="/" className="stencil text-lg font-extrabold tracking-tight">
            DRIVA<span className="text-white">HOLICS</span>
          </a>
          <a href="/" className="swipe tag text-bone/70 hover:text-white">
            ← Back to site
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[800px] px-5 py-16 md:px-10 md:py-24">
        <p className="tag text-ash">LEGAL</p>
        <h1 className="mega mt-4 text-[13vw] leading-[0.85] sm:text-[7vw] md:text-[4rem]">
          TERMS OF <span className="outline-type">SERVICE</span>
        </h1>
        <p className="mt-6 tag text-ash">LAST UPDATED: 3 SEPTEMBER 2026</p>

        <div className="mt-12 space-y-10 text-[0.95rem] leading-relaxed text-bone/75">
          <p>
            By joining our list, registering for an event, or attending a Drivaholics event, you&apos;re agreeing
            to the following. It&apos;s written in plain language on purpose.
          </p>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Who we are</h2>
            <p className="mt-3">
              Drivaholics is a driving community based in Khobar, Saudi Arabia, running drift, gymkhana, and
              driver-coaching events across Saudi Arabia and Bahrain.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Eligibility</h2>
            <p className="mt-3">
              You must hold a valid driver&apos;s license to participate in any on-track activity, and meet any
              age or vehicle requirements we set for a specific event. We may refuse entry to anyone who
              doesn&apos;t meet an event&apos;s requirements.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Registration &amp; payment</h2>
            <p className="mt-3">
              Registering through this site reserves your spot — it isn&apos;t confirmed until payment is
              received. We&apos;ll send payment details and instructions by email or WhatsApp after you register.
              Refunds and cancellations are handled case-by-case — contact us if your plans change.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Driving is inherently risky</h2>
            <p className="mt-3">
              Drift, gymkhana, and any on-track driving carry a real risk of injury or vehicle damage, even with
              marshals, briefings, and padded cones in place. By attending an event, you accept that risk for
              yourself and your vehicle. At the event itself, you&apos;ll be asked to follow the marshals&apos;
              instructions and, for most events, sign a separate liability waiver before driving — that
              on-the-day waiver is the document that formally covers this, not this page.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">How we expect you to behave</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Follow the marshals&apos; instructions at all times</li>
              <li>No street racing, no public-road stunts in Drivaholics&apos; name</li>
              <li>Respect other drivers, their cars, and the venue</li>
              <li>Follow local traffic laws off the track</li>
            </ul>
            <p className="mt-3">
              We can remove anyone from an event, without a refund, for unsafe or disrespectful behaviour.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Photos &amp; video</h2>
            <p className="mt-3">
              We film and photograph our events for our Instagram, TikTok, and this site. Attending an event
              means you&apos;re okay with appearing in that content. If you&apos;d rather not be featured, email
              us and we&apos;ll leave you out.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Limitation of liability</h2>
            <p className="mt-3">
              To the extent allowed by law, Drivaholics isn&apos;t liable for injury, loss, or vehicle damage
              arising from participation in an event, except where caused by our own negligence.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Governing law</h2>
            <p className="mt-3">These terms are governed by the laws of the Kingdom of Saudi Arabia.</p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Changes to these terms</h2>
            <p className="mt-3">If these terms change, we&apos;ll update the date at the top of this page.</p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Contact</h2>
            <p className="mt-3">
              Questions? Reach us at{' '}
              <a href="mailto:info@drivaholics.com" className="swipe text-white">
                info@drivaholics.com
              </a>
              .
            </p>
          </section>
        </div>

        <a href="/privacy" className="swipe mt-16 inline-block tag text-white">
          Read our Privacy Policy →
        </a>
      </div>
    </main>
  );
}
