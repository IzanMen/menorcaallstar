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
  note?: string;
}

const FAST_FADE = { duration: 0.2 } as const;
const FAST_FADE_VIEWPORT = { once: true, margin: '-40px' } as const;

const MORNING: ScheduleBlock[] = [
  { time: '07:00', endTime: '08:00', title: 'MONTAJE DE INSTALACIONES Y LOGÍSTICA', type: 'compact' },
  { time: '08:00', endTime: '08:30', title: 'REUNIÓN TÉCNICA DEL STAFF', type: 'compact' },
  { time: '08:30', endTime: '09:40', title: 'APERTURA DE PUERTAS Y CHECK-IN', type: 'compact' },
  { time: '09:40', endTime: '09:50', title: 'DISCURSO DE BIENVENIDA', type: 'compact' },
  { time: '09:50', endTime: '10:00', title: 'CALENTAMIENTO Y PREPARACIÓN DE PISTA', type: 'compact' },
  {
    time: '10:00', endTime: '12:55',
    title: '3X3 — FASE DE GRUPOS', type: 'featured', image: img3x3,
    categories: [
      { time: '10:00 – 10:40', name: 'Mini' },
      { time: '10:45 – 11:25', name: 'Infantil' },
      { time: '11:30 – 12:10', name: 'Cadete' },
      { time: '12:15 – 12:55', name: 'Junior + Adultos' },
    ],
  },
  {
    time: '13:00', endTime: '14:15',
    title: 'CONCURSO DE TIRO TWOBALL', type: 'featured', image: imgTwoball,
    note: 'Todas las categorías',
  },
  { time: '14:15', endTime: '14:30', title: 'ENTREGA DE PREMIOS — TIRO', type: 'compact' },
  { time: '14:30', endTime: '15:30', title: 'PAUSA PARA COMIDA Y DESCANSO', type: 'break' },
];

const AFTERNOON: ScheduleBlock[] = [
  {
    time: '15:30', endTime: '17:30',
    title: 'CIRCUITO DE HABILIDADES', type: 'featured', image: imgSkills,
  },
  { time: '17:30', endTime: '18:00', title: 'ENTREGA DE PREMIOS — HABILIDADES', type: 'compact' },
  {
    time: '18:00', endTime: '18:40',
    title: '3X3 — SEMIFINALES', type: 'featured', image: img3x3,
    categories: [
      { time: '18:00 – 18:10', name: 'Mini' },
      { time: '18:10 – 18:20', name: 'Infantil' },
      { time: '18:20 – 18:30', name: 'Cadete' },
      { time: '18:30 – 18:40', name: 'Junior + Adultos' },
    ],
  },
  {
    time: '18:40', endTime: '19:40',
    title: '3X3 — FINALES', type: 'featured', image: img3x3,
    note: 'Partidos finales · Todas las categorías',
  },
  { time: '19:40', endTime: '20:30', title: 'ENTREGA DE PREMIOS 3X3', type: 'compact' },
  {
    time: '20:30', endTime: '22:00',
    title: 'CIERRE DEL EVENTO Y MÚSICA FINAL', type: 'finale',
  },
];

function TimelineDot({ accent = false }: { accent?: boolean }) {
  return (
    <div className="relative flex-shrink-0">
      <div className={`w-3.5 h-3.5 rounded-full border-2 ${accent ? 'border-primary bg-primary/40' : 'border-white/30 bg-white/10'} relative z-10`} />
      {accent && (
        <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-primary/40 animate-ping" />
      )}
    </div>
  );
}

function CompactEvent({ block }: { block: ScheduleBlock }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={FAST_FADE_VIEWPORT}
      transition={FAST_FADE}
      className="flex items-center gap-5"
    >
      <TimelineDot />
      <div className="flex items-baseline gap-4 py-4 flex-wrap">
        <span className="text-primary font-black text-lg tabular-nums tracking-tight">
          {block.time}{block.endTime ? ` – ${block.endTime}` : ''}
        </span>
        <span className="text-white/70 font-bold text-sm uppercase tracking-wider">{block.title}</span>
      </div>
    </motion.div>
  );
}

function BreakEvent({ block }: { block: ScheduleBlock }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={FAST_FADE_VIEWPORT}
      transition={FAST_FADE}
      className="flex items-center gap-5"
    >
      <TimelineDot />
      <div className="flex-1 py-6">
        <div className="relative rounded-lg border border-dashed border-white/10 px-6 py-5 bg-white/[0.02]">
          <div className="flex items-baseline gap-4 flex-wrap">
            <span className="text-white/25 font-black text-lg tabular-nums">{block.time} – {block.endTime}</span>
            <span className="text-white/25 font-bold text-sm uppercase tracking-[0.3em]">{block.title}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FeaturedEvent({ block }: { block: ScheduleBlock }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={FAST_FADE_VIEWPORT}
      transition={FAST_FADE}
      className="flex items-start gap-5"
    >
      <div className="pt-6">
        <TimelineDot accent />
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

            {block.note && (
              <p className="mt-3 text-xs text-primary/70 font-bold uppercase tracking-[0.3em]">
                {block.note}
              </p>
            )}

            {block.categories && (
              <div className="mt-5 space-y-0">
                {block.categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-3 py-2.5 border-t border-white/[0.04] first:border-t-0"
                  >
                    <span className="text-xs text-white/25 font-bold tabular-nums tracking-tight min-w-[6.5rem]">
                      {cat.time}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/[0.07] border border-primary/15 text-primary/80 text-xs font-bold uppercase tracking-wider">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FinaleEvent({ block }: { block: ScheduleBlock }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={FAST_FADE_VIEWPORT}
      transition={FAST_FADE}
      className="flex items-start gap-5"
    >
      <div className="pt-8">
        <TimelineDot accent />
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
              El broche final del evento con música, premios especiales y la clausura oficial
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PeriodHeader({ title }: { title: string }) {
  return (
    <div className="relative mb-8 mt-4 h-10">
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
    </div>
  );
}

function renderBlock(block: ScheduleBlock) {
  switch (block.type) {
    case 'featured':
      return <FeaturedEvent key={block.title} block={block} />;
    case 'compact':
      return <CompactEvent key={block.title} block={block} />;
    case 'break':
      return <BreakEvent key={block.title} block={block} />;
    case 'finale':
      return <FinaleEvent key={block.title} block={block} />;
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
          {MORNING.map((block) => renderBlock(block))}
        </div>

        <PeriodHeader title="TARDE" />

        <div className="space-y-2">
          {AFTERNOON.map((block) => renderBlock(block))}
        </div>
      </div>
    </section>
  );
}
