import { motion } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';
import type { ReactNode } from 'react';

/**
 * TiltCard — Extends GlowCard with pseudo-3D tilt effect.
 * Uses the useTilt hook for spring-physics cursor tracking.
 * Includes ambient glow backdrop like GlowCard.
 *
 * Best used for project showcase cards on desktop.
 * Tilt is automatically disabled on touch devices.
 */

type GlowColor = 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';

interface TiltCardProps {
  children: ReactNode;
  glowColor?: GlowColor;
  className?: string;
}

const glowColorMap: Record<GlowColor, string> = {
  emerald: 'glow-emerald',
  blue: 'glow-blue',
  orange: 'glow-orange',
  violet: 'glow-violet',
  rose: 'glow-rose',
};

export default function TiltCard({
  children,
  glowColor = 'emerald',
  className = '',
}: TiltCardProps) {
  const { ref, rotateX, rotateY, scale, onMouseMove, onMouseLeave } = useTilt({
    maxTilt: 12,
    stiffness: 300,
    damping: 20,
    scale: 1.03,
  });

  return (
    <div className="perspective-1000">
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`group relative overflow-hidden rounded-xl border border-border bg-surface-card p-5 shadow-sm transition-colors duration-300 hover:border-border-strong sm:p-6 ${className}`}
      >
        {/* Ambient glow backdrop */}
        <div
          className={`glow-backdrop ${glowColorMap[glowColor]} -top-10 -right-10 transition-all duration-500 group-hover:scale-125 group-hover:opacity-50`}
        />

        {/* Shine effect overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.05) 55%, transparent 60%)',
          }}
        />

        {/* Card content with slight Z-offset for 3D depth */}
        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
