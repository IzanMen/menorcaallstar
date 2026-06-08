import { HeroSection } from '@/sections/HeroSection';
import { PruebasSection } from '@/sections/PruebasSection';
import { HorarioSection } from '@/sections/HorarioSection';
import { PatrocinadoresSection } from '@/sections/PatrocinadoresSection';
import { FooterSection } from '@/sections/FooterSection';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">
      <HeroSection />
      <PruebasSection />
      <HorarioSection />
      <PatrocinadoresSection />
      <FooterSection />
    </div>
  );
}
