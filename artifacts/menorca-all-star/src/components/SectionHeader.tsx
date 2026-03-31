import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16 md:mb-24", className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50 tracking-wide uppercase">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 text-primary font-display tracking-[0.2em] text-lg md:text-xl uppercase">
            {subtitle}
          </p>
        )}
        <div className="mt-8 flex justify-center items-center gap-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-2 h-2 rotate-45 bg-primary shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary/50" />
        </div>
      </motion.div>
    </div>
  );
}
