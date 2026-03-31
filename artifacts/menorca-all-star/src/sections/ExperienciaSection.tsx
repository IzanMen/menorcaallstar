import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';

const EXPERIENCIA = [
  { num: '01', title: 'ESPECTÁCULOS', desc: 'Actuaciones y shows en vivo durante todo el evento' },
  { num: '02', title: 'SPEAKER', desc: 'Narración y animación profesional en directo' },
  { num: '03', title: 'SORTEOS', desc: 'Premios exclusivos y regalos para el público' },
  { num: '04', title: 'FOOD & DRINKS', desc: 'Zona de restauración con las mejores opciones' },
];

export function ExperienciaSection() {
  return (
    <section className="relative py-32 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(226,18,18,0.04),transparent)]" />
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="LA EXPERIENCIA" subtitle="Más que baloncesto" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6">
        {EXPERIENCIA.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative py-12 md:py-16 border-b border-white/[0.06] last:border-b-0 overflow-hidden cursor-default"
            data-testid={`item-experiencia-${i}`}
          >
            <span
              aria-hidden="true"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[8rem] sm:text-[11rem] md:text-[14rem] font-black leading-none text-white/[0.025] group-hover:text-primary/[0.07] transition-colors duration-700 select-none pointer-events-none tracking-tighter pr-2"
            >
              {item.num}
            </span>

            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 pl-6 md:pl-8">
              <p className="text-[0.65rem] text-primary font-bold tracking-[0.55em] mb-3 uppercase">{item.num}</p>
              <h4 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4 group-hover:text-primary transition-colors duration-300 uppercase">
                {item.title}
              </h4>
              <p className="text-muted-foreground font-sans text-sm md:text-base max-w-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
