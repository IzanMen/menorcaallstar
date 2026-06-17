import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import logoTenimpla from '@assets/logo_tenimpla_1780928308572.png';
import logoIX from '@assets/IX_(6)_1780928358951.png';

const SPONSORS = [
  { name: 'Tenimpla', logo: logoTenimpla, imgClass: 'max-h-full max-w-full object-contain' },
  { name: 'IX', logo: logoIX, imgClass: 'max-h-full max-w-full object-contain scale-[2.8]' },
];

export function PatrocinadoresSection() {
  return (
    <section className="relative py-32 px-4 max-w-7xl mx-auto z-10">
      <SectionHeader title="PATROCINADORES" subtitle="Gracias a quienes lo hacen posible" />

      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
        {SPONSORS.map((sponsor) => (
          <motion.div
            key={sponsor.name}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.04 }}
            className="flex items-center justify-center w-52 sm:w-64 h-32 rounded-2xl bg-white border border-white/10 px-6 py-4 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.04)] hover:shadow-[0_0_50px_rgba(226,18,18,0.15)] transition-shadow duration-500"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              loading="lazy"
              decoding="async"
              className={sponsor.imgClass}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
