import { GlowButton } from '@/components/GlowButton';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

export default function Resultados() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden text-foreground selection:bg-primary/30 selection:text-white">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(226,18,18,0.10),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-xl glass-panel-heavy p-8 md:p-12 rounded-2xl flex flex-col items-center text-center border-t-primary/30"
      >
        <motion.div
          animate={{
            boxShadow: ['0 0 20px rgba(226,18,18,0.2)', '0 0 40px rgba(226,18,18,0.4)', '0 0 20px rgba(226,18,18,0.2)'],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-8 border border-primary/30"
        >
          <Radio className="w-10 h-10 text-primary" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-wide uppercase text-shadow-glow">
          RESULTADOS
          <br />
          EN DIRECTO
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground font-sans mb-12 max-w-md">
          Los resultados en directo se mostrarán aquí durante el evento del 29 de agosto. ¡Vuelve ese día para seguir cada prueba en tiempo real!
        </p>

        <GlowButton href="/" variant="secondary" className="w-full justify-center py-4 bg-transparent border-none hover:bg-white/5">
          VOLVER AL INICIO
        </GlowButton>
      </motion.div>
    </div>
  );
}
