import { Hero } from '@/components/marketing/hero';
import { Features } from '@/components/marketing/features';
import { Navbar } from '@/components/marketing/navbar';

export function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
    </main>
  );
}