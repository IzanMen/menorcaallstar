import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'accent' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  children: ReactNode;
  disabled?: boolean;
}

export function GlowButton({ 
  href, 
  variant = 'primary', 
  size = 'md', 
  className, 
  children,
  disabled,
  ...props 
}: GlowButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center font-display uppercase tracking-widest font-bold transition-all duration-300 overflow-hidden";
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-lg",
    lg: "px-10 py-4 text-xl",
    xl: "px-14 py-5 text-2xl md:text-3xl"
  };

  const variants = {
    primary: "bg-primary/10 text-primary border border-primary/50 hover:bg-primary/20 hover:border-primary hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]",
    accent: "bg-accent/10 text-accent border border-accent/50 hover:bg-accent/20 hover:border-accent hover:shadow-[0_0_20px_rgba(255,23,68,0.4)]",
    secondary: "bg-secondary/10 text-secondary border border-secondary/50 hover:bg-secondary/20 hover:border-secondary hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]",
  };
  
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed pointer-events-none grayscale" : "";

  const content = (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={cn(baseStyles, sizeStyles[size], variants[variant], disabledStyles, className)}
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href} className={disabled ? "pointer-events-none" : ""}>
        <span className={cn("inline-block", disabledStyles)} data-testid={`link-${href.replace('/', '')}`}>
          {content}
        </span>
      </Link>
    );
  }

  return (
    <button disabled={disabled} {...props} data-testid="glow-button">
      {content}
    </button>
  );
}
