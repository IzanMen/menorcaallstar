import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GlowButton } from '@/components/GlowButton';
import heroBg from '@/assets/hero-bg.webp';

export function HeroSection() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  return (
    <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBg}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-50 object-top scale-110"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
      </div>

      <div
        className="absolute z-0 inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 42%, rgba(232,71,26,0.20) 0%, rgba(232,71,26,0.04) 60%, transparent 100%)' }}
      />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 flex flex-col items-center text-center w-full px-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[min(92vw,64rem)] mx-auto"
        >
          <h1
            className="font-black text-shadow-glow leading-[0.9] mb-3 md:mb-6 w-full"
            style={{ fontSize: 'clamp(3rem, 14vw, 12rem)', letterSpacing: '-0.02em' }}
          >
            MENORCA<br />ALL STAR
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="text-base sm:text-xl md:text-3xl text-primary font-display tracking-[0.24em] sm:tracking-[0.3em] md:tracking-[0.35em] font-bold mb-8 md:mb-10"
          >
            El evento que Menorca necesitaba
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'easeOut' }}
        >
          <GlowButton href="/inscripcion" size="sm" className="md:px-10 md:py-3 md:text-xl" data-testid="btn-inscripcion-hero">
            Inscripción
          </GlowButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 z-10 text-primary/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="w-10 h-10" />
      </motion.div>
    </section>
  );
}
