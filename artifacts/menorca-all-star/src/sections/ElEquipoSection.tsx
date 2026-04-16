import { SectionHeader } from '@/components/SectionHeader';
import { StaffCard } from '@/components/StaffCard';

export function ElEquipoSection() {
  return (
    <section className="relative py-24 px-4 z-10 bg-black/40">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,18,18,0.04),transparent_70%)]" />
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="EL EQUIPO" subtitle="Los arquitectos del evento" />

        <p className="text-center text-xs text-white/25 uppercase tracking-[0.4em] -mt-6 mb-12">
          Identidades por revelar
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <StaffCard role="Árbitros" count={3} delay={0} multiple />
          <StaffCard role="Mesa" count={3} delay={0} multiple />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <StaffCard role="DJ" count={1} delay={0} compact />
          <StaffCard role="Speaker" count={1} delay={0} compact />
        </div>
      </div>
    </section>
  );
}
