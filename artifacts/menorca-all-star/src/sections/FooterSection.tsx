import { motion } from 'framer-motion';
import { SiInstagram, SiTiktok } from 'react-icons/si';
import { Mail } from 'lucide-react';
import { GlowButton } from '@/components/GlowButton';

export function FooterSection() {
  return (
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
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.25 }}
          className="w-full"
        >
          <p className="text-[0.6rem] text-primary/50 font-bold tracking-[0.7em] uppercase mb-6">
            Menorca · Agosto 2026
          </p>

          <img
            src="/menorca-all-star-logo.png"
            alt="Menorca All Star"
            className="mx-auto w-16 h-16 sm:w-20 sm:h-20 mb-4 object-contain drop-shadow-[0_0_20px_rgba(226,18,18,0.4)]"
          />
          <h2
            className="font-black uppercase leading-[0.88] tracking-tight mb-8 text-shadow-glow"
            style={{ fontSize: 'clamp(3.5rem, 18vw, 9rem)' }}
          >
            MENORCA<br />ALL STAR
          </h2>

          <GlowButton href="/inscripcion" size="xl" className="mb-16" data-testid="btn-inscripcion-footer">
            INSCRIBIRME
          </GlowButton>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <a
              href="https://www.instagram.com/menorcaallstar?igsh=aHg0bnZxdDg1MWtz"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 text-white/50 hover:border-primary/50 hover:text-white hover:shadow-[0_0_20px_rgba(226,18,18,0.25)] transition-all duration-300"
              data-testid="link-instagram"
            >
              <SiInstagram className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="text-xs font-bold tracking-widest uppercase">Instagram</span>
            </a>

            <a
              href="https://www.tiktok.com/@menorca.all.star?_r=1&_t=ZN-974fFUYRRiw"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 text-white/50 hover:border-primary/50 hover:text-white hover:shadow-[0_0_20px_rgba(226,18,18,0.25)] transition-all duration-300"
              data-testid="link-tiktok"
            >
              <SiTiktok className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="text-xs font-bold tracking-widest uppercase">TikTok</span>
            </a>

            <a
              href="mailto:menorcaallstar@gmail.com"
              className="group flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 text-white/50 hover:border-primary/50 hover:text-white hover:shadow-[0_0_20px_rgba(226,18,18,0.25)] transition-all duration-300"
              data-testid="link-contacto"
            >
              <Mail className="w-5 h-5 group-hover:text-primary transition-colors" />
              <span className="text-xs font-bold tracking-widest uppercase">Contacto</span>
            </a>
          </div>

          <p className="text-[0.6rem] text-white/15 tracking-[0.4em] uppercase">
            © 2026 Menorca All Star — Todos los derechos reservados
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
