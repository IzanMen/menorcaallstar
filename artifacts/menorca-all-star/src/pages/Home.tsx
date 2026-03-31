import { GlowButton } from '@/components/GlowButton';
import { SectionHeader } from '@/components/SectionHeader';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, Mic2, Gift, UtensilsCrossed } from 'lucide-react';
import { SiInstagram, SiX } from 'react-icons/si';

import heroBg from '@/assets/hero-bg.png';
import img3x3 from '@/assets/3x3.png';
import imgTwoball from '@/assets/twoball.png';
import imgSkills from '@/assets/skills.png';

function PersonSilhouette({ glow = false }: { glow?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 160"
      className="w-16 h-24 mx-auto mb-4"
      style={{ filter: glow ? 'drop-shadow(0 0 8px rgba(232,71,26,0.5))' : undefined }}
    >
      <ellipse cx="50" cy="32" rx="18" ry="20" fill="rgba(255,255,255,0.08)" />
      <path
        d="M18 160 C18 110 30 90 50 88 C70 90 82 110 82 160"
        fill="rgba(255,255,255,0.08)"
      />
    </svg>
  );
}

interface StaffCardProps {
  delay?: number;
}

function StaffCard({ delay = 0 }: StaffCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.04 }}
      className="group relative glass-panel-heavy rounded-xl flex flex-col items-center justify-center p-6 text-center overflow-hidden border border-white/5 hover:border-primary/40 hover:shadow-[0_0_25px_rgba(232,71,26,0.2)] transition-all duration-500 cursor-default"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(232,71,26,0.06),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <PersonSilhouette glow />
      <span className="text-2xl font-black text-primary/30 group-hover:text-primary/60 transition-colors duration-300 mb-1">???</span>
      <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Próximamente</p>
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const staffGroups = [
    { title: 'ÁRBITROS', count: 3 },
    { title: 'JUECES', count: 3 },
    { title: 'DJ', count: 1 },
    { title: 'SPEAKER', count: 1 },
  ];

  const experiencia = [
    { icon: Sparkles, num: '01', title: 'ESPECTÁCULOS', desc: 'Actuaciones y shows en vivo durante todo el evento' },
    { icon: Mic2, num: '02', title: 'SPEAKER', desc: 'Narración y animación profesional en directo' },
    { icon: Gift, num: '03', title: 'SORTEOS', desc: 'Premios exclusivos y regalos para el público' },
    { icon: UtensilsCrossed, num: '04', title: 'COMIDA Y BEBIDA', desc: 'Zona de restauración con las mejores opciones' },
  ];

  return (
    <div className="bg-background min-h-screen text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white">

      {/* 1. HERO */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30 object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
          <ParticleCanvas />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 flex flex-col items-center text-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          >
            <h1 className="text-[5.5rem] sm:text-[7rem] md:text-[9rem] lg:text-[12rem] font-black tracking-normal md:tracking-wide text-shadow-glow leading-[0.9] mb-4">
              MENORCA<br />ALL STAR
            </h1>
            <p className="text-xl md:text-3xl text-primary font-display tracking-[0.3em] font-bold mb-12">
              LA BATALLA DEFINITIVA
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          >
            <GlowButton href="/inscripcion" size="xl" data-testid="btn-inscripcion-hero">
              INSCRIPCIÓN
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
      <section className="relative py-32 px-4 z-10 bg-black/40">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,71,26,0.04),transparent_70%)]" />
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="EL EQUIPO" subtitle="Los arquitectos del show" />

          <div className="space-y-16">
            {staffGroups.map((group, gi) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: gi * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
                  <h3 className="text-lg md:text-xl font-bold tracking-[0.3em] text-primary uppercase">
                    {group.title}
                  </h3>
                  <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
                </div>

                <div
                  className={`grid gap-4 ${
                    group.count === 1
                      ? 'grid-cols-1 max-w-xs mx-auto'
                      : 'grid-cols-3 max-w-2xl mx-auto'
                  }`}
                >
                  {Array.from({ length: group.count }).map((_, i) => (
                    <StaffCard key={i} delay={gi * 0.1 + i * 0.08} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. EXPERIENCIA */}
      <section className="relative py-32 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(232,71,26,0.04),transparent)]" />
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="LA EXPERIENCIA" subtitle="Más que baloncesto" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4">
          {experiencia.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              className="group relative flex items-center gap-8 py-10 border-b border-white/5 last:border-b-0 hover:border-primary/20 transition-colors duration-500"
              data-testid={`item-experiencia-${i}`}
            >
              <span className="hidden md:block text-[5rem] font-black leading-none text-white/[0.04] group-hover:text-primary/10 transition-colors duration-500 select-none min-w-[6rem] text-right">
                {item.num}
              </span>

              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/40 to-transparent hidden md:block group-hover:via-primary/70 transition-colors duration-500" />

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h4 className="text-2xl md:text-3xl font-black tracking-wider mb-1 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-muted-foreground font-sans text-sm md:text-base">{item.desc}</p>
              </div>

              <div className="hidden lg:block text-primary/0 group-hover:text-primary/40 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                <ChevronDown className="w-6 h-6 -rotate-90" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. FINAL CTA + FOOTER */}
      <footer className="relative pt-32 pb-12 overflow-hidden border-t border-primary/20 z-10">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute inset-0 bg-[#080808]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[3px] border-primary rounded-full shadow-[0_0_20px_rgba(232,71,26,0.4)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border-[3px] border-primary rounded-full shadow-[0_0_10px_rgba(232,71,26,0.4)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[300px] bg-primary shadow-[0_0_10px_rgba(232,71,26,0.4)]" />
          <div className="absolute top-0 -left-4 w-[380px] h-[760px] border-[3px] border-primary rounded-r-full shadow-[0_0_15px_rgba(232,71,26,0.3)]" />
          <div className="absolute top-0 -right-4 w-[380px] h-[760px] border-[3px] border-primary rounded-l-full shadow-[0_0_15px_rgba(232,71,26,0.3)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-shadow-glow tracking-wide">
              MENORCA ALL STAR
            </h2>
            <GlowButton href="/inscripcion" size="lg" className="mb-24" data-testid="btn-inscripcion-footer">
              INSCRIBIRME
            </GlowButton>

            <div className="flex items-center justify-center gap-6 mb-8">
              <a
                href="#"
                className="p-3 rounded-full glass-panel text-white hover:text-primary hover:shadow-[0_0_15px_rgba(232,71,26,0.4)] transition-all"
                data-testid="link-instagram"
              >
                <SiInstagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full glass-panel text-white hover:text-primary hover:shadow-[0_0_15px_rgba(232,71,26,0.4)] transition-all"
                data-testid="link-twitter"
              >
                <SiX className="w-6 h-6" />
              </a>
            </div>

            <p className="text-sm text-muted-foreground font-sans uppercase tracking-widest">
              © {new Date().getFullYear()} Menorca All Star. Todos los derechos reservados.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
