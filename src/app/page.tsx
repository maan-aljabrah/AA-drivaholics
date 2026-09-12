import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import Manifesto from '@/components/Manifesto';
import Experiences from '@/components/Experiences';
import Split from '@/components/Split';
import Numbers from '@/components/Numbers';
import Tiers from '@/components/Tiers';
import Reel from '@/components/Reel';
import Partners from '@/components/Partners';
import Join from '@/components/Join';
import Footer from '@/components/Footer';
import { getCurrentEvent } from '@/db/queries';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const event = await getCurrentEvent();

  return (
    <>
      <Preloader />
      <Cursor />
      <Nav />
      <main className="relative bg-carbon">
        <Hero />
        {event?.countdownAt && (
          <Countdown targetIso={new Date(event.countdownAt).toISOString()} title={event.title} eventDate={event.eventDate} />
        )}
        <Manifesto />
        <Experiences />
        <Split />
        <Numbers />
        <Tiers />
        <Reel />
        <Partners />
        <Join />
      </main>
      <Footer />
    </>
  );
}
