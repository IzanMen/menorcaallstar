import { useEffect, useRef, type CSSProperties } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { X } from 'lucide-react';

const RULES: Record<string, {
  title: string;
  code: string;
  subtitle: string;
  sections: { label: string; items: (string | { bold: string; sub?: string[] })[] }[];
}> = {
  '3X3': {
    title: '3X3',
    code: 'PROTOCOL·A1',
    subtitle: 'Torneo 3x3 \u00b7 29 de agosto \u00b7 Pabell\u00f3n de Ferreries',
    sections: [
      {
        label: 'Presentaci\u00f3n',
        items: [
          'Prepara tu equipo y ven a vivir una jornada el 29 de agosto llena de puro baloncesto, competici\u00f3n y el mejor ambiente del verano en el Pabell\u00f3n de Ferreries. \u00a1Espect\u00e1culo garantizado!',
        ],
      },
      {
        label: 'Categor\u00edas y Composici\u00f3n del Equipo',
        items: [
          { bold: 'Categor\u00edas disponibles:', sub: ['Mini', 'Infantil', 'Cadete', 'J\u00fanior + Adulto (abiertas a todos)'] },
          { bold: 'Formato del equipo:', sub: ['Equipos cerrados de 5 jugadores exactos', '3 en pista y 2 suplentes para garantizar rotaciones, cambios r\u00e1pidos y el m\u00e1ximo ritmo'] },
        ],
      },
      {
        label: 'Din\u00e1mica y Puntuaci\u00f3n',
        items: [
          { bold: 'Partidos:', sub: ['7 minutos de juego a tiempo corregido (la Gran Final ser\u00e1 de 10 minutos)', 'Sin l\u00edmite de puntos'] },
          { bold: 'Valores de los tiros:', sub: ['Canastas dentro de la l\u00ednea: 1 punto', 'Lanzamientos desde m\u00e1s all\u00e1 de la l\u00ednea de triple: 2 puntos'] },
          { bold: 'Emoci\u00f3n hasta el final:', sub: ['En caso de empate, el ganador se decidir\u00e1 en tiros libres en una ronda de muerte s\u00fabita'] },
        ],
      },
      {
        label: 'Sistema de Competici\u00f3n',
        items: [
          { bold: 'Fase de Grupos:', sub: ['Primera fase de dos rondas explosivas', 'Si hay empates en la clasificaci\u00f3n, el basket-average decide qui\u00e9n pasa'] },
          { bold: 'Fase Final:', sub: ['Los mejores equipos se clasifican directamente para las Semifinales y la Gran Final por el t\u00edtulo de campeones'] },
        ],
      },
      {
        label: 'Precio de Inscripci\u00f3n',
        items: [
          '5 \u20ac por jugador (25 \u20ac por equipo completo de 5 integrantes)',
          'Las plazas se otorgar\u00e1n por estricto orden de pago hasta completar el cuadro de competici\u00f3n',
        ],
      },
    ],
  },
  'TWOBALL': {
    title: 'TWOBALL',
    code: 'PROTOCOL\u00b7B2',
    subtitle: 'Shooting Challenge \u00b7 Competici\u00f3n por parejas',
    sections: [
      {
        label: 'Presentaci\u00f3n',
        items: [
          'Pon a prueba tu punter\u00eda y la coordinaci\u00f3n con tu pareja en el concurso de tiro m\u00e1s espectacular del Menorca All Star',
        ],
      },
      {
        label: 'Categor\u00edas',
        items: ['Mini', 'Infantil + Cadete', 'J\u00fanior + Adulto'],
      },
      {
        label: 'Formato de Competici\u00f3n',
        items: [
          'El TwoBall se disputa por parejas',
          'Un jugador lanza, recoge su propio rebote y pasa la pelota al compa\u00f1ero, que tendr\u00e1 que tirar desde una zona',
          'Los lanzamientos se deben alternar obligatoriamente entre los dos miembros de la pareja',
          'El objetivo es conseguir la m\u00e1xima puntuaci\u00f3n posible antes de que acabe el tiempo',
        ],
      },
      {
        label: 'Zonas de Puntuaci\u00f3n',
        items: [
          { bold: 'Tiro libre:', sub: ['1 punto'] },
          { bold: 'Bandas laterales:', sub: ['2 puntos'] },
          { bold: 'Zona intermedia:', sub: ['3 puntos'] },
          { bold: 'Triple:', sub: ['4 puntos'] },
          { bold: 'Medio campo:', sub: ['8 puntos'] },
        ],
      },
      {
        label: 'Sistema de Competici\u00f3n',
        items: [
          { bold: 'Fase Clasificatoria:', sub: ['Cada pareja dispondr\u00e1 de 1 minuto para sumar el m\u00e1ximo n\u00famero de puntos posible'] },
          { bold: 'Repesca Rel\u00e1mpago:', sub: ['Las parejas no clasificadas directamente tendr\u00e1n una segunda oportunidad para acceder a la final'] },
          { bold: 'Gran Final:', sub: ['Las 3 mejores parejas competir\u00e1n en la pista principal ante todo el p\u00fablico'] },
        ],
      },
      {
        label: 'Inscripci\u00f3n',
        items: [
          '5 \u20ac por participante \u00b7 Participaci\u00f3n por parejas',
          'Las plazas son limitadas y se asignar\u00e1n por orden de inscripci\u00f3n y pago',
        ],
      },
    ],
  },
};

interface RulesModalProps {
  prueba: string | null;
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const scanVariants = (delay: number) => ({
  hidden: { x: '-110vw', opacity: 1 },
  visible: {
    x: '110vw',
    opacity: [1, 1, 0],
    transition: { duration: 0.3, delay, ease: [0.4, 0, 0.6, 1] as [number, number, number, number] },
  },
});

const panelVariants: Variants = {
  hidden: { y: -20, opacity: 0, scale: 0.97 },
  visible: {
    y: 0, opacity: 1, scale: 1,
    transition: { type: 'spring' as const, stiffness: 380, damping: 28, mass: 0.8 },
  },
  exit: {
    y: 20, opacity: 0, scale: 0.97,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
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
          style={{ backdropFilter: 'blur(18px)', background: 'rgba(0,0,0,0.82)', overscrollBehavior: 'contain' }}
          onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {[0, 0.05, 0.1].map((delay, i) => (
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
          >
            {([
              { top: -2, left: -2, borderTop: '2px solid', borderLeft: '2px solid', borderRadius: '6px 0 0 0' },
              { top: -2, right: -2, borderTop: '2px solid', borderRight: '2px solid', borderRadius: '0 6px 0 0' },
              { bottom: -2, left: -2, borderBottom: '2px solid', borderLeft: '2px solid', borderRadius: '0 0 0 6px' },
              { bottom: -2, right: -2, borderBottom: '2px solid', borderRight: '2px solid', borderRadius: '0 0 6px 0' },
            ] as CSSProperties[]).map((style, i) => (
              <div
                key={i}
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
                <div className="flex items-center justify-end mb-5">
                  <button
                    onClick={onClose}
                    className="group flex items-center justify-center w-8 h-8 rounded-full border border-white/10 hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                    aria-label="Cerrar"
                  >
                    <X className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors duration-200" />
                  </button>
                </div>

                <h2
                  className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none uppercase mb-2"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                >
                  {data.title}
                </h2>

                <p className="text-white/35 text-sm font-sans mb-5">
                  {data.subtitle}
                </p>

                <div
                  className="h-px mb-6"
                  style={{ background: 'linear-gradient(90deg, rgba(226,18,18,0.7) 0%, rgba(226,18,18,0.1) 60%, transparent 100%)' }}
                />
              </div>

              <div ref={scrollRef} data-lenis-prevent className="rules-scroll flex-1 overflow-y-auto px-6 sm:px-8 pb-8" style={{ overscrollBehavior: 'contain' }}>
                <motion.div
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >
                  {data.sections.map((section) => (
                    <div key={section.label}>
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
                    </div>
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
