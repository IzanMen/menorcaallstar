import { GlowButton } from '@/components/GlowButton';
import { SectionHeader } from '@/components/SectionHeader';
import { ParticleCanvas } from '@/components/ParticleCanvas';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Music, Mic2, Gift, UtensilsCrossed } from 'lucide-react';
import { SiInstagram, SiX } from 'react-icons/si';

import heroBg from '@/assets/hero-bg.png';
import img3x3 from '@/assets/3x3.png';
import imgTwoball from '@/assets/twoball.png';
import imgSkills from '@/assets/skills.png';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

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
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-shadow-glow leading-none mb-4">
              MENORCA<br />ALL STAR
            </h1>
            <p className="text-xl md:text-3xl text-primary font-display tracking-[0.3em] font-bold mb-12">
              LA BATALLA DEFINITIVA
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <GlowButton href="/inscripcion" size="xl">
              INSCRIPCIÓN
            </GlowButton>
          </motion.div>
        </motion.div>

        <motion.div 
          className="absolute bottom-10 z-10 text-primary/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-10 h-10" />
        </motion.div>
      </section>

      {/* 2. PRUEBAS */}
      <section className="relative py-32 px-4 max-w-7xl mx-auto z-10">
        <SectionHeader title="LAS PRUEBAS" subtitle="Demuestra tu nivel" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { title: "3X3", img: img3x3, color: "primary" },
            { title: "TWO BALL", img: imgTwoball, color: "secondary" },
            { title: "SKILLS CHALLENGE", img: imgSkills, color: "accent" }
          ].map((prueba, i) => (
            <motion.div
              key={prueba.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden glass-panel cursor-pointer flex flex-col justify-end p-8"
              whileHover={{ scale: 1.03 }}
            >
              <img 
                src={prueba.img} 
                alt={prueba.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 group-hover:scale-110 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-4xl md:text-5xl font-black mb-6 tracking-wide" style={{ textShadow: `0 0 20px var(--color-${prueba.color})` }}>
                  {prueba.title}
                </h3>
                <GlowButton 
                  href="/inscripcion" 
                  variant={prueba.color as any} 
                  size="sm" 
                  className="w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                >
                  Participar
                </GlowButton>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. STAFF / MISTERIO */}
      <section className="relative py-32 px-4 z-10 bg-black/50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.05),transparent_70%)]" />
        <SectionHeader title="EL EQUIPO" subtitle="Los arquitectos del show" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {['ÁRBITROS', 'JUECES', 'DJ', 'SPEAKER', 'LIVE MUSIC', 'INVITADO ESPECIAL'].map((role, i) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group aspect-square glass-panel-heavy rounded-xl flex flex-col items-center justify-center p-6 text-center overflow-hidden border-secondary/20 hover:border-secondary hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity mix-blend-overlay pointer-events-none" />
              
              <div className="text-secondary mb-4 group-hover:animate-pulse">
                <span className="text-6xl font-black opacity-20 group-hover:opacity-80 transition-opacity text-shadow-glow">???</span>
              </div>
              <h4 className="text-xl md:text-2xl font-bold tracking-widest text-white mb-2">{role}</h4>
              <p className="text-sm text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">Próximamente</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. EXPERIENCIA */}
      <section className="relative py-32 px-4 max-w-7xl mx-auto z-10">
        <SectionHeader title="LA EXPERIENCIA" subtitle="Más que baloncesto" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Music, title: "MÚSICA", desc: "DJ Set en vivo durante todo el evento" },
            { icon: Mic2, title: "SPEAKER", desc: "Animación y narración en directo" },
            { icon: Gift, title: "SORTEOS", desc: "Premios exclusivos para el público" },
            { icon: UtensilsCrossed, title: "FOOD & DRINKS", desc: "Zona gastronómica completa" }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-panel p-8 rounded-xl text-center group hover:bg-card/40 transition-colors"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                <item.icon className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold mb-3 tracking-wider">{item.title}</h4>
              <p className="text-muted-foreground font-sans">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. VISUAL INTERLUDE */}
      <section className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden bg-black z-10 border-y border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.15),transparent_60%)]" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary blur-[100px] rounded-full mix-blend-screen animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "0px" }}
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          <GlowButton href="/inscripcion" size="xl" className="shadow-[0_0_50px_rgba(0,212,255,0.2)]">
            Asegura tu plaza
          </GlowButton>
        </motion.div>
      </section>

      {/* 6. FINAL CTA & 7. FOOTER */}
      <footer className="relative pt-32 pb-12 overflow-hidden border-t border-primary/20 z-10">
        {/* Basketball court lines CSS background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          {/* Main court bg */}
          <div className="absolute inset-0 bg-[#0a0a0a]" />
          
          {/* Center circle */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[4px] border-primary rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border-[4px] border-primary rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-[300px] bg-primary shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
          
          {/* 3-point arcs */}
          <div className="absolute top-0 -left-4 w-[400px] h-[800px] border-[4px] border-primary rounded-r-full shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
          <div className="absolute top-0 -right-4 w-[400px] h-[800px] border-[4px] border-primary rounded-l-full shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8 text-shadow-glow">MENORCA ALL STAR</h2>
            <GlowButton href="/inscripcion" size="lg" className="mb-24">
              INSCRIBIRME
            </GlowButton>
            
            <div className="flex items-center justify-center gap-6 mb-8">
              <a href="#" className="p-3 rounded-full glass-panel text-white hover:text-primary hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all" data-testid="link-instagram">
                <SiInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 rounded-full glass-panel text-white hover:text-primary hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all" data-testid="link-twitter">
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
