import { GlowButton } from '@/components/GlowButton';
import img3x3 from '@/assets/3x3.webp';
import imgTwoball from '@/assets/twoball.webp';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock3 } from 'lucide-react';

const INSCRIPCIONES = [
  {
    title: '3X3',
    label: 'Inscribirse al 3x3',
    href: 'https://www.tenimpla.com/events/4600/inscripcion',
    image: img3x3,
    variant: 'primary' as const,
  },
  {
    title: 'TWOBALL',
    label: 'Inscribirse al TwoBall',
    href: 'https://www.tenimpla.com/events/4601/inscripcion',
    image: imgTwoball,
    variant: 'secondary' as const,
  },
];

export default function Inscripcion() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-28 relative overflow-hidden text-foreground selection:bg-primary/30 selection:text-white">
      {/* Cinematic background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.15),transparent_50%)]" />
        
        {/* Animated grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center"
      >
        <h1 className="text-4xl md:text-7xl font-black mb-4 tracking-wide uppercase text-shadow-glow">
          INSCRIPCIONES
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground font-sans mb-6 max-w-2xl">
          Elige tu prueba y completa la inscripción oficial en Tenimpla.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.12, ease: 'easeOut' }}
          className="mb-10 w-full overflow-hidden rounded-lg border border-primary/35 bg-black/55 text-left shadow-[0_0_45px_rgba(226,18,18,0.16)]"
          data-testid="price-urgency-notice"
        >
          <div className="h-1 bg-gradient-to-r from-accent via-primary to-accent" />
          <div className="grid gap-4 p-5 sm:grid-cols-[auto_1fr] sm:items-center sm:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-accent">
              <Clock3 className="h-6 w-6" aria-hidden="true" />
            </div>

            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-primary">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                <p className="text-[0.68rem] font-black uppercase tracking-[0.28em]">
                  Subida de precio el 26 de julio
                </p>
              </div>
              <h2 className="mb-2 text-2xl font-black uppercase leading-none text-white sm:text-4xl">
                Últimas horas para asegurar el precio actual
              </h2>
              <p className="text-sm leading-relaxed text-white/68 sm:text-base">
                Inscríbete ahora antes de que suban las inscripciones. Las plazas son limitadas
                y se asignan por estricto orden de inscripción y pago.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
          {INSCRIPCIONES.map((inscripcion, index) => (
            <motion.a
              key={inscripcion.title}
              href={inscripcion.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative min-h-[22rem] overflow-hidden rounded-xl glass-panel text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
            >
              <img
                src={inscripcion.image}
                alt={inscripcion.title}
                className="absolute inset-0 h-full w-full object-cover opacity-45 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-65"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

              <div className="relative z-10 flex h-full min-h-[22rem] flex-col justify-end p-6 sm:p-8">
                <h2 className="mb-6 text-5xl md:text-6xl font-black tracking-wide text-white">
                  {inscripcion.title}
                </h2>

                <div className="pointer-events-none">
                  <GlowButton
                    variant={inscripcion.variant}
                    size="md"
                    className="w-full py-4 text-sm sm:text-base"
                  >
                    {inscripcion.label}
                  </GlowButton>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-8 w-full max-w-md">
          <GlowButton href="/" variant="secondary" className="w-full justify-center py-4 bg-transparent border-none hover:bg-white/5">
            VOLVER AL INICIO
          </GlowButton>
        </div>
      </motion.div>
    </div>
  );
}
