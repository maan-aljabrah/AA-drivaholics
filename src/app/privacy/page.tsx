import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — DRIVAHOLICS',
  description: 'How Drivaholics collects, uses, and protects your information.',
};

export default function PrivacyPage() {
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
          PRIVACY <span className="outline-type">POLICY</span>
        </h1>
        <p className="mt-6 tag text-ash">LAST UPDATED: 3 SEPTEMBER 2026</p>

        <div className="mt-12 space-y-10 text-[0.95rem] leading-relaxed text-bone/75">
          <p>
            Drivaholics (&quot;we&quot;, &quot;us&quot;) runs driving events and a driving community based in
            Khobar, Saudi Arabia. This page explains what information we collect when you sign up or register
            for an event, and what we do with it. Short version: we only use it to run our events and keep you
            posted — we don&apos;t sell it, rent it, or hand it to advertisers.
          </p>

          <section>
            <h2 className="stencil text-xl font-bold text-white">What we collect</h2>
            <p className="mt-3">When you join our list or register for an event, we collect:</p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your WhatsApp/phone number</li>
              <li>Your car&apos;s make and model (event registration only)</li>
            </ul>
            <p className="mt-3">We don&apos;t collect payment details through this site — payment is arranged directly with you by email or WhatsApp.</p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">How we use it</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              <li>To let you know when a new event opens up</li>
              <li>To process and confirm your event registration</li>
              <li>To contact you about an event you&apos;ve registered for (schedule changes, payment details, briefing info)</li>
              <li>Occasional updates about Drivaholics — nothing spammy</li>
            </ul>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">What we don&apos;t do</h2>
            <p className="mt-3">
              We do not sell, rent, or trade your information to anyone. We don&apos;t share it with advertisers,
              marketing companies, or data brokers. It stays with us, used only for the reasons above.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Photos &amp; video</h2>
            <p className="mt-3">
              We shoot photos and video at our events and share them on our Instagram/TikTok and on this site. If
              you attend an event, your car (and possibly you) may appear in that content. If you&apos;d rather
              not be featured, just email us and we&apos;ll take care of it.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">How long we keep it</h2>
            <p className="mt-3">
              We keep your information for as long as you&apos;re active with us. If you want it deleted at any
              point, email us and we&apos;ll remove it.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Your rights</h2>
            <p className="mt-3">
              You can ask us at any time to see what we have on you, correct it, or delete it entirely. Just
              email{' '}
              <a href="mailto:info@drivaholics.com" className="swipe text-white">
                info@drivaholics.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Cookies</h2>
            <p className="mt-3">
              This site doesn&apos;t use advertising or tracking cookies. It only stores what&apos;s needed for
              the site itself to work.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Changes to this policy</h2>
            <p className="mt-3">
              If this policy changes, we&apos;ll update the date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="stencil text-xl font-bold text-white">Contact</h2>
            <p className="mt-3">
              Questions about your data? Reach us at{' '}
              <a href="mailto:info@drivaholics.com" className="swipe text-white">
                info@drivaholics.com
              </a>{' '}
              or{' '}
              <a
                href="https://api.whatsapp.com/send/?phone=966567399225&text=Hi%20Drivaholics&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="swipe text-white"
              >
                WhatsApp
              </a>
              .
            </p>
          </section>
        </div>

        <a href="/terms" className="swipe mt-16 inline-block tag text-white">
          Read our Terms →
        </a>
      </div>
    </main>
  );
}
