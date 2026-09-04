import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Experiences from '@/components/Experiences';
import Split from '@/components/Split';
import Numbers from '@/components/Numbers';
import Tiers from '@/components/Tiers';
import Reel from '@/components/Reel';
import Join from '@/components/Join';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Nav />
      <main className="relative bg-carbon">
        <Hero />
        <Manifesto />
        <Experiences />
        <Split />
        <Numbers />
        <Tiers />
        <Reel />
        <Join />
      </main>
      <Footer />
    </>
  );
}
