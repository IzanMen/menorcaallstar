import { lazy, Suspense, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { GlowButton } from '@/components/GlowButton';
import { SectionHeader } from '@/components/SectionHeader';
import img3x3 from '@/assets/3x3.webp';
import imgTwoball from '@/assets/twoball.webp';
import imgSkills from '@/assets/skills.webp';

const RulesModal = lazy(() =>
  import('@/components/RulesModal').then((m) => ({ default: m.RulesModal }))
);

const PRUEBAS = [
  { key: '3X3', title: '3X3', img: img3x3, color: 'primary' as const },
  { key: 'TWOBALL', title: 'TWOBALL', img: imgTwoball, color: 'secondary' as const },
  { key: 'SKILLS CHALLENGE', title: 'SKILLS CHALLENGE', img: imgSkills, color: 'accent' as const },
];

export function PruebasSection() {
  const [activeRules, setActiveRules] = useState<string | null>(null);

  return (
    <>
      <section className="relative py-32 px-4 max-w-7xl mx-auto z-10">
        <SectionHeader title="LAS PRUEBAS" subtitle="Categorias según tu edad" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {PRUEBAS.map((prueba, i) => (
            <motion.div
              key={prueba.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.25 }}
              className="group relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-panel cursor-pointer flex flex-col justify-end p-8"
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
                <span className="text-[0.55rem] text-primary/80 font-black tracking-[0.45em] uppercase">VER NORMAS</span>
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              </div>

              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-wide">
                  {prueba.title}
                </h3>
                <GlowButton
                  href="/inscripcion"
                  variant={prueba.color}
                  size="sm"
                  className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
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
