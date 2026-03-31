import { useId } from 'react';
import { GlowButton } from '@/components/GlowButton';
import { SectionHeader } from '@/components/SectionHeader';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SiInstagram, SiX } from 'react-icons/si';

import heroBg from '@/assets/hero-bg.png';
import img3x3 from '@/assets/3x3.webp';
import imgTwoball from '@/assets/twoball.webp';
import imgSkills from '@/assets/skills.webp';

function RealisticSilhouette({ svgClass = "absolute inset-0 w-full h-full" }: { svgClass?: string }) {
  const uid = useId().replace(/:/g, '');
  const SILHOUETTE = "M 200 18 C 255 18, 288 58, 288 108 C 288 148, 272 180, 248 196 C 244 202, 238 210, 234 220 C 258 232, 310 252, 358 282 C 390 302, 410 340, 410 560 L -10 560 C -10 340, 10 302, 42 282 C 90 252, 142 232, 166 220 C 162 210, 156 202, 152 196 C 128 180, 112 148, 112 108 C 112 58, 145 18, 200 18 Z";

  return (
    <svg
      viewBox="0 0 400 560"
      xmlns="http://www.w3.org/2000/svg"
      className={svgClass}
      preserveAspectRatio="xMidYMax meet"
    >
      <defs>
        <linearGradient id={`${uid}-base`} x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.13)" />
          <stop offset="45%" stopColor="rgba(255,255,255,0.07)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.03)" />
        </linearGradient>
        <radialGradient id={`${uid}-rim`} cx="20%" cy="18%" r="55%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.20)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="30%" r="45%">
          <stop offset="0%" stopColor="rgba(232,71,26,0.18)" />
          <stop offset="100%" stopColor="rgba(232,71,26,0)" />
        </radialGradient>
        <filter id={`${uid}-blur`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <clipPath id={`${uid}-clip`}>
          <path d={SILHOUETTE} />
        </clipPath>
      </defs>

      <path d={SILHOUETTE} fill="rgba(0,0,0,0.4)" filter={`url(#${uid}-blur)`} transform="translate(3,8)" />
      <path d={SILHOUETTE} fill={`url(#${uid}-base)`} />
      <path d={SILHOUETTE} fill={`url(#${uid}-rim)`} />
      <path d={SILHOUETTE} fill={`url(#${uid}-glow)`} className="opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <line x1="80" y1="0" x2="50" y2="560" stroke="rgba(255,255,255,0.035)" strokeWidth="40" clipPath={`url(#${uid}-clip)`} />
    </svg>
  );
}

interface StaffCardProps {
  delay?: number;
  role: string;
  count: number;
  compact?: boolean;
  multiple?: boolean;
}

function StaffCard({ delay = 0, role, count, compact = false, multiple = false }: StaffCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
      className={`group relative rounded-xl overflow-hidden border border-white/5 hover:border-primary/25 hover:shadow-[0_0_40px_rgba(226,18,18,0.15)] transition-all duration-500 cursor-default ${compact ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}
      style={{ background: 'linear-gradient(160deg, #111111 0%, #080808 100%)' }}
    >
      {multiple ? (
        <div className="absolute inset-0">
          <div className="absolute inset-y-0 opacity-50" style={{ left: 0, width: '52%' }}>
            <RealisticSilhouette svgClass="w-full h-full" />
          </div>
          <div className="absolute inset-y-0 z-10" style={{ left: '24%', width: '52%' }}>
            <RealisticSilhouette svgClass="w-full h-full" />
          </div>
          <div className="absolute inset-y-0 opacity-50" style={{ right: 0, width: '52%' }}>
            <RealisticSilhouette svgClass="w-full h-full" />
          </div>
        </div>
      ) : (
        <RealisticSilhouette />
      )}

      <div className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.2) 42%, transparent 62%)' }}
      />

      <div className="absolute top-3 right-3 z-20">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/70 border border-primary/30 text-primary font-black text-sm backdrop-blur-sm">
          ×{count}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-5 text-center">
        <h4 className="text-xl font-black tracking-[0.14em] text-white/85 group-hover:text-white transition-colors duration-300 uppercase mb-2">{role}</h4>
        <p className="text-xs font-bold text-primary/60 uppercase tracking-[0.3em]">Próximamente</p>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(226,18,18,0.10),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const experiencia = [
    { num: '01', title: 'ESPECTÁCULOS', desc: 'Actuaciones y shows en vivo durante todo el evento' },
    { num: '02', title: 'SPEAKER', desc: 'Narración y animación profesional en directo' },
    { num: '03', title: 'SORTEOS', desc: 'Premios exclusivos y regalos para el público' },
    { num: '04', title: 'FOOD & DRINKS', desc: 'Zona de restauración con las mejores opciones' },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">

      {/* 1. HERO */}
      <section className="relative h-[100dvh] w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50 object-top scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
          <ParticleCanvas />
        </div>

        {/* Red glow orb behind title */}
        <div className="absolute z-0 w-[120vw] h-[60vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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

      {/* 2. PRUEBAS */}
      <section className="relative py-32 px-4 max-w-7xl mx-auto z-10">
        <SectionHeader title="LAS PRUEBAS" subtitle="Demuestra tu nivel" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { title: '3X3', img: img3x3, color: 'primary' },
            { title: 'TWO BALL', img: imgTwoball, color: 'secondary' },
            { title: 'SKILLS CHALLENGE', img: imgSkills, color: 'accent' },
          ].map((prueba, i) => (
            <motion.div
              key={prueba.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-panel cursor-pointer flex flex-col justify-end p-8"
              whileHover={{ scale: 1.03 }}
              data-testid={`card-prueba-${i}`}
            >
              <img
                src={prueba.img}
                alt={prueba.title}
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-wide">
                  {prueba.title}
                </h3>
                <GlowButton
                  href="/inscripcion"
                  variant={prueba.color as 'primary' | 'secondary' | 'accent'}
                  size="sm"
                  className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                  data-testid={`btn-participar-${i}`}
                >
                  Participar
                </GlowButton>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. EL EQUIPO */}
      <section className="relative py-24 px-4 z-10 bg-black/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,18,18,0.04),transparent_70%)]" />
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="EL EQUIPO" subtitle="Los arquitectos del show" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-xs text-white/25 uppercase tracking-[0.4em] -mt-6 mb-12"
          >
            Identidades por revelar
          </motion.p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <StaffCard role="Árbitros" count={3} delay={0} multiple />
            <StaffCard role="Jueces" count={3} delay={0.1} multiple />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StaffCard role="DJ" count={1} delay={0.2} compact />
            <StaffCard role="Speaker" count={1} delay={0.25} compact />
          </div>

        </div>
      </section>

      {/* 4. EXPERIENCIA */}
      <section className="relative py-32 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(226,18,18,0.04),transparent)]" />
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="LA EXPERIENCIA" subtitle="Más que baloncesto" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6">
          {experiencia.map((item, i) => (
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
                <h4 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-4 group-hover:text-primary transition-colors duration-400 uppercase">
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

      {/* 6. FINAL CTA + FOOTER */}
      <footer className="relative overflow-hidden z-10" style={{ background: '#050505' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-[600px]"
            style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(226,18,18,0.18) 0%, rgba(226,18,18,0.04) 45%, transparent 70%)' }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-48"
            style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(226,18,18,0.08) 0%, transparent 70%)' }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 pt-28 pb-12 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <p className="text-[0.6rem] text-primary/50 font-bold tracking-[0.7em] uppercase mb-6">
              Menorca · Verano 2025
            </p>

            <h2
              className="font-black uppercase leading-[0.88] tracking-tight mb-4 text-shadow-glow"
              style={{ fontSize: 'clamp(3.5rem, 18vw, 9rem)' }}
            >
              MENORCA<br />ALL STAR
            </h2>

            <p className="text-primary font-display font-bold tracking-[0.35em] uppercase text-sm md:text-base mb-12">
              La batalla definitiva
            </p>

            <GlowButton href="/inscripcion" size="xl" className="mb-16" data-testid="btn-inscripcion-footer">
              INSCRIBIRME
            </GlowButton>

            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

            <div className="flex items-center justify-center gap-5 mb-10">
              <a
                href="#"
                className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 text-white/50 hover:border-primary/50 hover:text-white hover:shadow-[0_0_20px_rgba(226,18,18,0.25)] transition-all duration-300"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span className="text-xs font-bold tracking-widest uppercase">Instagram</span>
              </a>
              <a
                href="#"
                className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 text-white/50 hover:border-primary/50 hover:text-white hover:shadow-[0_0_20px_rgba(226,18,18,0.25)] transition-all duration-300"
                data-testid="link-twitter"
              >
                <SiX className="w-5 h-5 group-hover:text-primary transition-colors" />
                <span className="text-xs font-bold tracking-widest uppercase">Twitter</span>
              </a>
            </div>

            <p className="text-[0.6rem] text-white/15 tracking-[0.4em] uppercase">
              © 2025 Menorca All Star — Todos los derechos reservados
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
