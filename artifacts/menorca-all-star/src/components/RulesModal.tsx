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
    subtitle: 'Torneig 3x3 · 29 d\u2019agost · Pavelló de Ferreries',
    sections: [
      {
        label: 'Presentació',
        items: [
          'Prepara el teu equip i vine a viure una jornada el 29 d\u2019agost plena de pur bàsquet, competició i el millor ambient de l\u2019estiu al Pavelló de Ferreries. Espectacle garantit!',
        ],
      },
      {
        label: 'Categories i Composició de l\u2019Equip',
        items: [
          { bold: 'Categories disponibles:', sub: ['Mini', 'Infantil', 'Cadet', 'Júnior + Adult (obertes a tothom)'] },
          { bold: 'Format de l\u2019equip:', sub: ['Equips tancats de 5 jugadors exactes', '3 a pista i 2 suplents per garantir rotacions, canvis ràpids i el màxim ritme'] },
        ],
      },
      {
        label: 'Dinàmica i Puntuació',
        items: [
          { bold: 'Partits:', sub: ['7 minuts de joc a temps corregut (la Gran Final serà de 10 minuts)', 'Sense límit de punts'] },
          { bold: 'Valors dels tirs:', sub: ['Cistelles dins la línia: 1 punt', 'Llançaments des de més enllà de la línia de triple: 2 punts'] },
          { bold: 'Emoció fins al final:', sub: ['En cas d\u2019empat, el guanyador es decidirà als tirs lliures en una ronda de mort sobtada'] },
        ],
      },
      {
        label: 'Sistema de Competició',
        items: [
          { bold: 'Fase de Grups:', sub: ['Primera fase de dues rondes explosives', 'Si hi ha empats a la classificació, el basket-average decideix qui passa'] },
          { bold: 'Fase Final:', sub: ['Els millors equips es classifiquen directament per a les Semifinals i la Gran Final pel títol de campions'] },
        ],
      },
      {
        label: 'Preu d\u2019Inscripció',
        items: [
          '5 € per jugador (25 € per equip complet de 5 integrants)',
          'Les places s\u2019atorgaran per estricte ordre de pagament fins a completar el quadre de competició',
        ],
      },
    ],
  },
  'TWOBALL': {
    title: 'TWOBALL',
    code: 'PROTOCOL·B2',
    subtitle: 'Shooting Challenge · Competició per parelles',
    sections: [
      {
        label: 'Presentació',
        items: [
          'Posa a prova la teva punteria i la coordinació amb la teva parella al concurs de tir més espectacular del Menorca All Star',
        ],
      },
      {
        label: 'Categories',
        items: ['Mini', 'Infantil + Cadet', 'Júnior + Adult'],
      },
      {
        label: 'Format de Competició',
        items: [
          'El TwoBall es disputa per parelles',
          'Un jugador llança, recull el seu propi rebot i passa la pilota al company, que haurà de tirar des d\u2019una zona',
          'Els llançaments s\u2019han d\u2019alternar obligatòriament entre els dos membres de la parella',
          'L\u2019objectiu és aconseguir la màxima puntuació possible abans que s\u2019acabi el temps',
        ],
      },
      {
        label: 'Zones de Puntuació',
        items: [
          { bold: 'Tir lliure:', sub: ['1 punt'] },
          { bold: 'Bandes laterals:', sub: ['2 punts'] },
          { bold: 'Zona intermèdia:', sub: ['3 punts'] },
          { bold: 'Triple:', sub: ['4 punts'] },
          { bold: 'Mig camp:', sub: ['8 punts'] },
        ],
      },
      {
        label: 'Sistema de Competició',
        items: [
          { bold: 'Fase Classificatòria:', sub: ['Cada parella disposarà d\u20191 minut per sumar el màxim nombre de punts possible'] },
          { bold: 'Repesca Relàmpec:', sub: ['Les parelles no classificades directament tindran una segona oportunitat per accedir a la final'] },
          { bold: 'Gran Final:', sub: ['Les 3 millors parelles competiran a la pista principal davant de tot el públic'] },
        ],
      },
      {
        label: 'Inscripció',
        items: [
          '5 € per participant · Participació per parelles',
          'Les places són limitades i s\u2019assignaran per ordre d\u2019inscripció i pagament',
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
