import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { GlowButton } from '@/components/GlowButton';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import heroBg from '@/assets/hero-bg.png';

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
        <ParticleCanvas />
      </div>

      <div
        className="absolute z-0 w-[120vw] h-[60vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(232,71,26,0.22) 0%, transparent 65%)' }}
      />

      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 flex flex-col items-center text-center w-full px-2"
      >
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <h1
            className="font-black text-shadow-glow leading-[0.88] mb-3 md:mb-6 w-full"
            style={{ fontSize: 'clamp(4rem, 22vw, 12rem)', letterSpacing: '-0.01em' }}
          >
            MENORCA<br />ALL STAR
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-2xl md:text-3xl text-primary font-display tracking-[0.35em] font-bold mb-8 md:mb-10"
          >
            LA BATALLA DEFINITIVA
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
        >
          <GlowButton href="/inscripcion" size="sm" data-testid="btn-inscripcion-hero">
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
