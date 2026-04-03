import { useEffect, useRef, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const RULES: Record<string, {
  title: string;
  code: string;
  subtitle: string;
  sections: { label: string; items: (string | { bold: string; sub?: string[] })[] }[];
}> = {
  '3X3': {
    title: '3X3',
    code: 'PROTOCOLO·A1',
    subtitle: 'Reglas oficiales FIBA 3x3',
    sections: [
      {
        label: 'Equipos',
        items: [
          '8 equipos por categoría',
          'Máximo 5 jugadores por plantilla',
          'Mínimo 4 jugadores (por confirmar)',
        ],
      },
      {
        label: 'Categorías',
        items: ['Mini', 'Infantil', 'Cadete', 'Junior + Adultos'],
      },
      {
        label: 'Fase de Grupos',
        items: [
          '2 grupos de 4 equipos',
          'Partidos simultáneos con emparejamientos aleatorios',
          { bold: 'Primera ronda:', sub: ['2 partidos simultáneos (2 vs 2 equipos)'] },
          { bold: 'Segunda ronda:', sub: ['Ganadores vs Ganadores', 'Perdedores vs Perdedores'] },
          'Todos los equipos juegan mínimo 2 partidos',
        ],
      },
      {
        label: 'Clasificación a Semifinales',
        items: [
          'El equipo que gana sus 2 partidos pasa directamente',
          'En caso de empate: pasa el de mayor diferencia de puntos',
          'El mismo sistema aplica en ambos grupos',
        ],
      },
      {
        label: 'Fase Final',
        items: ['Semifinales', 'Final'],
      },
    ],
  },
  'TWOBALL': {
    title: 'CONCURSO DE TIRO',
    code: 'PROTOCOLO·B2',
    subtitle: 'Modalidad twoball · Competición por parejas',
    sections: [
      {
        label: 'Formato',
        items: [
          'Competición por parejas',
          'Modalidad twoball (tiro continuo y dinámico)',
          'Uno tira, recoge el rebote y pasa al compañero',
          'Cada pareja elige dónde tirar en cada momento',
        ],
      },
      {
        label: 'Duración',
        items: ['1 minuto por pareja para realizar todos los lanzamientos'],
      },
      {
        label: 'Puntuación',
        items: [
          'Diversas posiciones de tiro disponibles',
          'Cada posición tiene una puntuación distinta',
        ],
      },
      {
        label: 'Rondas',
        items: [
          { bold: 'Primera ronda:', sub: ['Participan todas las parejas'] },
          { bold: 'Clasificación:', sub: ['Las 3 mejores parejas de cada categoría'] },
          { bold: 'Final:', sub: ['Las 3 clasificadas realizan un segundo intento'] },
        ],
      },
      {
        label: 'Categorías',
        items: ['Mini', 'Infantil + Cadete', 'Junior + Adultos'],
      },
    ],
  },
  'SKILLS CHALLENGE': {
    title: 'CONCURSO DE HABILIDADES',
    code: 'PROTOCOLO·C3',
    subtitle: 'Circuito individual · Toda la pista',
    sections: [
      {
        label: 'Formato',
        items: [
          'Competición individual',
          'Circuito que recorre toda la pista',
        ],
      },
      {
        label: 'Duración',
        items: ['Máximo 1 minuto para completar el circuito'],
      },
      {
        label: 'Sistema de Puntuación',
        items: [
          { bold: 'Clasificación por tiempo:', sub: ['Menos segundos = mejor posición'] },
          { bold: 'Penalizaciones:', sub: ['Los fallos en el circuito añaden segundos al tiempo final'] },
          {
            bold: 'Bonus tiro final:',
            sub: [
              'Hay un lanzamiento final al finalizar el circuito',
              'Si se anota → se reducen segundos del tiempo total',
            ],
          },
        ],
      },
      {
        label: 'Categorías',
        items: ['Mini', 'Infantil + Cadete', 'Junior + Adultos'],
      },
    ],
  },
};

interface RulesModalProps {
  prueba: string | null;
  onClose: () => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.3, delay: 0.15 } },
};

const scanVariants = (delay: number) => ({
  hidden: { x: '-110vw', opacity: 1 },
  visible: {
    x: '110vw',
    opacity: [1, 1, 0],
    transition: { duration: 0.55, delay, ease: [0.4, 0, 0.6, 1] as [number,number,number,number] },
  },
});

const panelVariants = {
  hidden: { y: -80, opacity: 0, scale: 0.92, rotateX: 8, filter: 'blur(8px)' },
  visible: {
    y: 0, opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 180, damping: 22, mass: 1, delay: 0.25 },
  },
  exit: {
    y: 50, opacity: 0, scale: 0.95,
    transition: { duration: 0.28, ease: 'easeIn' },
  },
};

const bracketVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (d: number) => ({
    opacity: 1, scale: 1,
    transition: { type: 'spring', stiffness: 350, damping: 20, delay: 0.55 + d * 0.05 },
  }),
};

const statusVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.6 } },
};

const titleVariants = {
  hidden: { clipPath: 'inset(0 100% 0 0)', opacity: 0.5 },
  visible: {
    clipPath: 'inset(0 0% 0 0)', opacity: 1,
    transition: { duration: 0.55, delay: 0.68, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
  },
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.5, delay: 0.8, ease: 'easeOut' } },
};

const contentVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.85 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: 'easeOut' } },
};

export function RulesModal({ prueba, onClose }: RulesModalProps) {
  const data = prueba ? RULES[prueba] : null;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prueba) {
      document.body.style.overflow = 'hidden';
      scrollRef.current?.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [prueba]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {prueba && data && (
        <motion.div
          key="backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ backdropFilter: 'blur(18px)', background: 'rgba(0,0,0,0.82)' }}
          onClick={onClose}
        >
          {[0, 0.1, 0.2].map((delay, i) => (
            <motion.div
              key={i}
              variants={scanVariants(delay)}
              initial="hidden"
              animate="visible"
              className="absolute left-0 w-full pointer-events-none"
              style={{
                height: i === 1 ? '2px' : '1px',
                top: `${25 + i * 25}%`,
                background: `linear-gradient(90deg, transparent 0%, rgba(226,18,18,${i === 1 ? 0.9 : 0.5}) 50%, transparent 100%)`,
                boxShadow: `0 0 ${i === 1 ? 20 : 10}px rgba(226,18,18,${i === 1 ? 0.7 : 0.4})`,
              }}
            />
          ))}

          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[88vh] flex flex-col"
            style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
          >
            {([
              { top: -2, left: -2, borderTop: '2px solid', borderLeft: '2px solid', borderRadius: '6px 0 0 0' },
              { top: -2, right: -2, borderTop: '2px solid', borderRight: '2px solid', borderRadius: '0 6px 0 0' },
              { bottom: -2, left: -2, borderBottom: '2px solid', borderLeft: '2px solid', borderRadius: '0 0 0 6px' },
              { bottom: -2, right: -2, borderBottom: '2px solid', borderRight: '2px solid', borderRadius: '0 0 6px 0' },
            ] as CSSProperties[]).map((style, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={bracketVariants}
                initial="hidden"
                animate="visible"
                className="absolute w-7 h-7 pointer-events-none"
                style={{ ...style, borderColor: 'rgba(226,18,18,0.7)' }}
              />
            ))}

            <div
              className="rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: 'linear-gradient(160deg, #0d0d0d 0%, #080808 100%)',
                border: '1px solid rgba(226,18,18,0.12)',
                boxShadow: '0 0 80px rgba(226,18,18,0.12), 0 40px 120px rgba(0,0,0,0.8)',
              }}
            >
              <div className="flex-shrink-0 p-6 sm:p-8 pb-0">
                <motion.div
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-between mb-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[0.6rem] text-primary/60 font-black tracking-[0.55em] uppercase tabular-nums">
                      ACCESO CONCEDIDO · {data.code}
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="group flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                    aria-label="Cerrar"
                  >
                    <X className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors duration-200" />
                  </button>
                </motion.div>

                <div className="overflow-hidden mb-2">
                  <motion.h2
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none uppercase"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {data.title}
                  </motion.h2>
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.78, duration: 0.4 } }}
                  className="text-white/35 text-sm font-sans mb-5"
                >
                  {data.subtitle}
                </motion.p>

                <motion.div
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="h-px origin-left mb-6"
                  style={{ background: 'linear-gradient(90deg, rgba(226,18,18,0.7) 0%, rgba(226,18,18,0.1) 60%, transparent 100%)' }}
                />
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 sm:px-8 pb-8 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {data.sections.map((section) => (
                    <motion.div key={section.label} variants={itemVariants}>
                      <p className="text-[0.6rem] text-primary/55 font-black tracking-[0.5em] uppercase mb-3">
                        {section.label}
                      </p>
                      <ul className="space-y-2">
                        {section.items.map((item, ii) =>
                          typeof item === 'string' ? (
                            <li key={ii} className="flex items-start gap-3 text-white/80 font-sans text-sm leading-relaxed">
                              <span className="text-primary/50 mt-1.5 flex-shrink-0 text-[8px]">◆</span>
                              {item}
                            </li>
                          ) : (
                            <li key={ii} className="pl-0">
                              <div className="flex items-start gap-3 text-white font-bold text-sm">
                                <span className="text-primary/50 mt-1.5 flex-shrink-0 text-[8px]">◆</span>
                                {item.bold}
                              </div>
                              {item.sub && (
                                <ul className="mt-1.5 pl-6 space-y-1.5">
                                  {item.sub.map((s, si) => (
                                    <li key={si} className="flex items-start gap-2 text-white/55 font-sans text-sm">
                                      <span className="text-white/20 mt-1.5 flex-shrink-0 text-[6px]">—</span>
                                      {s}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <div className="flex-shrink-0 border-t border-white/[0.04] px-6 sm:px-8 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-[0.55rem] text-white/15 font-black tracking-[0.4em] tabular-nums">
                    MENORCA ALL STAR · {new Date().getFullYear()}
                  </span>
                  <button
                    onClick={onClose}
                    className="text-[0.6rem] text-primary/50 font-black tracking-[0.4em] uppercase hover:text-primary transition-colors duration-200"
                  >
                    CERRAR
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
