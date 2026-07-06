import { lazy, Suspense, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { GlowButton } from '@/components/GlowButton';
import { SectionHeader } from '@/components/SectionHeader';
import img3x3 from '@/assets/3x3.webp';
import imgTwoball from '@/assets/twoball.webp';

const RulesModal = lazy(() =>
  import('@/components/RulesModal').then((m) => ({ default: m.RulesModal }))
);

const PRUEBAS = [
  { key: '3X3', title: '3X3', img: img3x3, color: 'primary' as const },
  { key: 'TWOBALL', title: 'TWOBALL', img: imgTwoball, color: 'secondary' as const },
];

export function PruebasSection() {
  const [activeRules, setActiveRules] = useState<string | null>(null);

  return (
    <>
      <section className="relative py-32 px-4 max-w-7xl mx-auto z-10">
        <SectionHeader title="LAS PRUEBAS" subtitle="Categorías según tu edad" />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto">
          {PRUEBAS.map((prueba, i) => (
            <motion.div
              key={prueba.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.25 }}
              className="group relative h-64 sm:h-80 md:h-[420px] rounded-xl overflow-hidden glass-panel cursor-pointer flex flex-col justify-end p-4 sm:p-6"
              whileHover={{ scale: 1.03 }}
              onClick={() => setActiveRules(prueba.key)}
              data-testid={`card-prueba-${i}`}
            >
              <img
                src={prueba.img}
                alt={prueba.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute top-5 right-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[0.5rem] sm:text-[0.55rem] text-primary/80 font-black tracking-[0.28em] sm:tracking-[0.45em] uppercase">VER NORMAS</span>
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              </div>

              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 tracking-wide">
                  {prueba.title}
                </h3>
                <GlowButton
                  href="/inscripcion"
                  variant={prueba.color}
                  size="sm"
                  className="w-full px-2 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                  data-testid={`btn-participar-${i}`}
                  onClick={(e: MouseEvent) => e.stopPropagation()}
                >
                  Participar
                </GlowButton>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {activeRules && (
        <Suspense fallback={null}>
          <RulesModal prueba={activeRules} onClose={() => setActiveRules(null)} />
        </Suspense>
      )}
    </>
  );
}
