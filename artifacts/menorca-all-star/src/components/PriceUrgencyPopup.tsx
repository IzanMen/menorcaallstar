import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { AlertTriangle, ArrowRight, Clock3, X } from 'lucide-react';
import { Link, useLocation } from 'wouter';

const POPUP_SESSION_KEY = 'menorca-price-urgency-popup-dismissed';
const POPUP_DELAY_MS = 1800;

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.18 } },
  exit: { opacity: 0, transition: { duration: 0.14 } },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 420, damping: 30, mass: 0.8 },
  },
  exit: { opacity: 0, y: 18, scale: 0.97, transition: { duration: 0.14 } },
};

export function PriceUrgencyPopup() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location !== '/') return;
    if (sessionStorage.getItem(POPUP_SESSION_KEY) === 'true') return;

    const timer = window.setTimeout(() => setIsOpen(true), POPUP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePopup();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function closePopup() {
    sessionStorage.setItem(POPUP_SESSION_KEY, 'true');
    setIsOpen(false);
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[120] flex items-end justify-center bg-black/78 px-4 pb-5 pt-20 backdrop-blur-md sm:items-center sm:p-6"
          onClick={closePopup}
          role="presentation"
        >
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[34rem] overflow-hidden rounded-lg border border-primary/40 bg-[#080808] shadow-[0_0_80px_rgba(226,18,18,0.28),0_24px_90px_rgba(0,0,0,0.82)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="price-urgency-title"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent via-primary to-accent" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 20% 0%, rgba(245,158,11,0.18), transparent 42%), radial-gradient(ellipse at 80% 20%, rgba(226,18,18,0.22), transparent 48%)',
              }}
            />

            <div className="relative p-5 sm:p-7">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-3 py-2 text-accent">
                  <Clock3 className="h-4 w-4" aria-hidden="true" />
                  <span className="text-[0.65rem] font-black uppercase tracking-[0.24em]">
                    Últimas horas
                  </span>
                </div>

                <button
                  onClick={closePopup}
                  className="group flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all duration-200 hover:border-primary/50 hover:bg-primary/10"
                  aria-label="Cerrar aviso"
                  type="button"
                >
                  <X className="h-4 w-4 text-white/45 transition-colors group-hover:text-primary" aria-hidden="true" />
                </button>
              </div>

              <div className="mb-5 flex items-center gap-3 text-primary">
                <AlertTriangle className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                <p className="text-xs font-black uppercase tracking-[0.32em] text-primary/80">
                  Subida de precio el 26 de julio
                </p>
              </div>

              <h2
                id="price-urgency-title"
                className="mb-4 text-4xl font-black uppercase leading-[0.9] text-white sm:text-6xl"
              >
                Apúntate antes de que suban las inscripciones
              </h2>

              <p className="mb-6 text-base leading-relaxed text-white/74 sm:text-lg">
                El precio actual se acaba ya. Si quieres asegurar tu plaza en Menorca All Star,
                inscríbete ahora: las plazas van por orden de inscripción y pago.
              </p>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <Link
                  href="/inscripcion"
                  onClick={closePopup}
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-primary bg-primary px-5 py-3 font-display text-base font-black uppercase tracking-widest text-white transition-all duration-300 hover:bg-primary/85 hover:shadow-[0_0_28px_rgba(226,18,18,0.45)]"
                  data-testid="link-popup-inscripcion"
                >
                  Inscribirme ya
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>

                <Link
                  href="/inscripcion"
                  onClick={closePopup}
                  className="inline-flex min-h-12 items-center justify-center border border-white/12 px-5 py-3 font-display text-sm font-black uppercase tracking-widest text-white/65 transition-all duration-300 hover:border-accent/45 hover:text-accent"
                  data-testid="link-popup-precios"
                >
                  Ver precios
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
