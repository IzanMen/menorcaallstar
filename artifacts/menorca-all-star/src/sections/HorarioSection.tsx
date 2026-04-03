import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import img3x3 from '@/assets/3x3.webp';
import imgSkills from '@/assets/skills.webp';
import imgTwoball from '@/assets/twoball.webp';

interface Category {
  time: string;
  name: string;
}

interface ScheduleBlock {
  time: string;
  endTime?: string;
  title: string;
  type: 'featured' | 'compact' | 'break' | 'finale';
  image?: string;
  categories?: Category[];
}

interface Finale {
  time: string;
  name: string;
}

const MORNING: ScheduleBlock[] = [
  { time: '09:00', title: 'APERTURA DE PUERTAS', type: 'compact' },
  { time: '09:45', title: 'DISCURSO INICIAL', type: 'compact' },
  {
    time: '10:00', endTime: '12:40',
    title: '3X3 — FASE DE GRUPOS', type: 'featured', image: img3x3,
    categories: [
      { time: '10:00 – 10:40', name: 'Mini' },
      { time: '10:40 – 11:20', name: 'Infantil' },
      { time: '11:20 – 12:00', name: 'Cadete' },
      { time: '12:00 – 12:40', name: 'Junior + Adultos' },
    ],
  },
  {
    time: '12:45', endTime: '14:15',
    title: 'CONCURSO DE HABILIDADES', type: 'featured', image: imgSkills,
    categories: [
      { time: '12:45 – 13:08', name: 'Junior + Adultos' },
      { time: '13:08 – 13:31', name: 'Infantil + Cadete' },
      { time: '13:31 – 13:54', name: 'Mini' },
    ],
  },
  { time: '14:15', endTime: '14:30', title: 'ENTREGA DE PREMIOS', type: 'compact' },
  { time: '14:30', endTime: '15:30', title: 'DESCANSO', type: 'break' },
];

const AFTERNOON: ScheduleBlock[] = [
  {
    time: '15:30', endTime: '17:30',
    title: '3X3 — ELIMINATORIAS', type: 'featured', image: img3x3,
    categories: [
      { time: '15:30 – 16:00', name: 'Mini' },
      { time: '16:00 – 16:30', name: 'Infantil' },
      { time: '16:30 – 17:00', name: 'Cadete' },
      { time: '17:00 – 17:30', name: 'Junior + Adultos' },
    ],
  },
  { time: '17:30', endTime: '18:00', title: 'PREMIOS 3X3', type: 'compact' },
  {
    time: '18:00', endTime: '19:30',
    title: 'CONCURSO DE TIRO', type: 'featured', image: imgTwoball,
    categories: [
      { time: '18:00 – 18:23', name: 'Junior + Adultos' },
      { time: '18:23 – 18:46', name: 'Infantil + Cadete' },
      { time: '18:46 – 19:09', name: 'Mini' },
    ],
  },
  { time: '19:30', endTime: '20:00', title: 'PREMIOS TIRO', type: 'compact' },
  {
    time: '20:00', endTime: '22:00',
    title: 'ESPECTÁCULOS Y CIERRE', type: 'finale',
  },
];

function TimelineDot({ delay = 0, accent = false }: { delay?: number; accent?: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay, type: 'spring', stiffness: 300 }}
      className="relative flex-shrink-0"
    >
      <div className={`w-3.5 h-3.5 rounded-full border-2 ${accent ? 'border-primary bg-primary/40' : 'border-white/30 bg-white/10'} relative z-10`} />
      {accent && (
        <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-primary/40 animate-ping" />
      )}
    </motion.div>
  );
}

function CompactEvent({ block, index }: { block: ScheduleBlock; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="flex items-center gap-5"
    >
      <TimelineDot delay={index * 0.05} />
      <div className="flex items-baseline gap-4 py-4">
        <span className="text-primary font-black text-lg tabular-nums tracking-tight">{block.time}</span>
        <span className="text-white/70 font-bold text-sm uppercase tracking-wider">{block.title}</span>
      </div>
    </motion.div>
  );
}

function BreakEvent({ block, index }: { block: ScheduleBlock; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      className="flex items-center gap-5"
    >
      <TimelineDot delay={index * 0.05} />
      <div className="flex-1 py-6">
        <div className="relative rounded-lg border border-dashed border-white/10 px-6 py-5 bg-white/[0.02]">
          <div className="flex items-baseline gap-4">
            <span className="text-white/25 font-black text-lg tabular-nums">{block.time} – {block.endTime}</span>
            <span className="text-white/25 font-bold text-sm uppercase tracking-[0.3em]">{block.title}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedEvent({ block, index }: { block: ScheduleBlock; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-5"
    >
      <div className="pt-6">
        <TimelineDot delay={index * 0.05} accent />
      </div>

      <div className="flex-1 group">
        <div
          className="relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-primary/20 transition-all duration-500 hover:shadow-[0_0_60px_rgba(226,18,18,0.12)]"
          style={{ background: 'linear-gradient(160deg, #0f0f0f 0%, #080808 100%)' }}
        >
          {block.image && (
            <>
              <img
                src={block.image}
                alt={block.title}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover opacity-[0.12] group-hover:opacity-[0.20] group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            </>
          )}

          <div className="relative z-10 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-primary font-black text-xl sm:text-2xl tabular-nums tracking-tight">
                {block.time}
              </span>
              {block.endTime && (
                <>
                  <span className="text-white/20">→</span>
                  <span className="text-primary/50 font-black text-xl sm:text-2xl tabular-nums tracking-tight">
                    {block.endTime}
                  </span>
                </>
              )}
            </div>

            <h4 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none mb-1 uppercase group-hover:text-primary/90 transition-colors duration-300">
              {block.title}
            </h4>

            {block.categories && (
              <div className="mt-5 space-y-0">
                {block.categories.map((cat, ci) => (
                  <motion.div
                    key={cat.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + ci * 0.06 }}
                    className="flex items-center gap-3 py-2.5 border-t border-white/[0.04] first:border-t-0"
                  >
                    <span className="text-xs text-white/25 font-bold tabular-nums tracking-tight min-w-[6.5rem]">
                      {cat.time}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/[0.07] border border-primary/15 text-primary/80 text-xs font-bold uppercase tracking-wider">
                      {cat.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}
            {block.title.includes('CONCURSO DE HABILIDADES') && (
              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <span className="text-[0.65rem] text-primary/60 font-bold tracking-[0.4em] uppercase">Finales</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { time: '14:00 – 14:05', name: 'Junior + Adultos' },
                    { time: '14:05 – 14:10', name: 'Infantil + Cadete' },
                    { time: '14:10 – 14:15', name: 'Mini' },
                  ].map((finale: { time: string; name: string }) => (
                    <div
                      key={finale.name}
                      className="rounded-xl border border-primary/10 bg-black/30 px-3 py-3 text-left hover:border-primary/25 transition-colors duration-300"
                    >
                      <div className="text-[0.65rem] text-white/35 font-black tracking-tight tabular-nums">{finale.time}</div>
                      <div className="text-sm font-bold text-primary/85 uppercase tracking-wider mt-1">{finale.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {block.title.includes('CONCURSO DE TIRO') && (
              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <span className="text-[0.65rem] text-primary/60 font-bold tracking-[0.4em] uppercase">Finales</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-primary/30 to-transparent" />
                </div>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { time: '19:15 – 19:20', name: 'Junior + Adultos' },
                    { time: '19:20 – 19:25', name: 'Infantil + Cadete' },
                    { time: '19:25 – 19:30', name: 'Mini' },
                  ].map((finale: { time: string; name: string }) => (
                    <div
                      key={finale.name}
                      className="rounded-xl border border-primary/10 bg-black/30 px-3 py-3 text-left hover:border-primary/25 transition-colors duration-300"
                    >
                      <div className="text-[0.65rem] text-white/35 font-black tracking-tight tabular-nums">{finale.time}</div>
                      <div className="text-sm font-bold text-primary/85 uppercase tracking-wider mt-1">{finale.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FinaleEvent({ block, index }: { block: ScheduleBlock; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-5"
    >
      <div className="pt-8">
        <TimelineDot delay={index * 0.05} accent />
      </div>

      <div className="flex-1">
        <div className="relative rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/40 transition-all duration-500 group">
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(226,18,18,0.20) 0%, rgba(226,18,18,0.04) 50%, transparent 80%)' }}
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(226,18,18,0.15) 0%, transparent 60%)' }}
          />

          <div className="relative z-10 p-8 sm:p-10 text-center">
            <p className="text-[0.6rem] text-primary/50 font-bold tracking-[0.6em] uppercase mb-4">Gran finale</p>

            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-primary font-black text-2xl sm:text-3xl tabular-nums">{block.time}</span>
              <span className="text-white/20">→</span>
              <span className="text-primary/50 font-black text-2xl sm:text-3xl tabular-nums">{block.endTime}</span>
            </div>

            <h4
              className="font-black tracking-tight leading-none uppercase mb-4 group-hover:text-primary transition-colors duration-500"
              style={{ fontSize: 'clamp(2rem, 8vw, 4rem)' }}
            >
              {block.title}
            </h4>

            <p className="text-white/30 font-sans text-sm max-w-md mx-auto">
              El broche final del evento con actuaciones en vivo, premios especiales y la clausura oficial
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PeriodHeader({ title, delay = 0 }: { title: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-8 mt-4 h-10"
    >
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-black leading-none text-white/[0.02] select-none pointer-events-none tracking-tighter text-center whitespace-nowrap"
        style={{ fontSize: 'clamp(5rem, 20vw, 12rem)' }}
      >
        {title}
      </span>
      <div className="relative flex items-center gap-4 ml-8">
        <div className="w-8 h-[2px] bg-primary" />
        <h3 className="text-xs font-black tracking-[0.55em] text-primary uppercase">{title}</h3>
      </div>
    </motion.div>
  );
}

function renderBlock(block: ScheduleBlock, index: number) {
  switch (block.type) {
    case 'featured':
      return <FeaturedEvent key={block.title} block={block} index={index} />;
    case 'compact':
      return <CompactEvent key={block.title} block={block} index={index} />;
    case 'break':
      return <BreakEvent key={block.title} block={block} index={index} />;
    case 'finale':
      return <FinaleEvent key={block.title} block={block} index={index} />;
  }
}

export function HorarioSection() {
  return (
    <section className="relative py-32 z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_30%,rgba(226,18,18,0.05),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 mb-16">
        <SectionHeader title="EL HORARIO" subtitle="Un día. 3 pruebas." />
      </div>

      <div className="relative max-w-3xl mx-auto px-6">
        <div className="absolute left-[1.05rem] sm:left-[1.55rem] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.07] to-transparent" />

        <PeriodHeader title="MAÑANA" />

        <div className="space-y-2">
          {MORNING.map((block, i) => renderBlock(block, i))}
        </div>

        <PeriodHeader title="TARDE" delay={0.1} />

        <div className="space-y-2">
          {AFTERNOON.map((block, i) => renderBlock(block, i))}
        </div>
      </div>
    </section>
  );
}
