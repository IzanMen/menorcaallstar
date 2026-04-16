import { motion } from 'framer-motion';
import { RealisticSilhouette } from './RealisticSilhouette';

interface StaffCardProps {
  delay?: number;
  role: string;
  count: number;
  compact?: boolean;
  multiple?: boolean;
}

export function StaffCard({ delay = 0, role, count, compact = false, multiple = false }: StaffCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.2, delay: Math.min(delay, 0) }}
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

      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.2) 42%, transparent 62%)' }}
      />

      <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-5 text-center">
        <h4 className="text-xl font-black tracking-[0.14em] text-white/85 group-hover:text-white transition-colors duration-300 uppercase mb-2">
          {role}
        </h4>
        <p className="text-xs font-bold text-primary/60 uppercase tracking-[0.3em]">Próximamente</p>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(226,18,18,0.10),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
    </motion.div>
  );
}
