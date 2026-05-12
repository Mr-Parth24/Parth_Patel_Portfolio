import type { ReactNode } from 'react';

/**
 * GlowCard — Card with ambient colored glow backdrop.
 *
 * Implementation:
 * - A positioned ::before pseudo-element renders a large blurred circle
 * - The glow color is mapped from the `glowColor` prop
 * - On hover, the glow intensifies and scales up slightly
 * - Creates a multi-dimensional fluid feel when multiple cards are in a grid
 */

type GlowColor = 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';

interface GlowCardProps {
  children: ReactNode;
  glowColor?: GlowColor;
  className?: string;
  glowPosition?: 'top-left' | 'top-right' | 'center' | 'bottom-left' | 'bottom-right';
}

const glowColorMap: Record<GlowColor, string> = {
  emerald: 'glow-emerald',
  blue: 'glow-blue',
  orange: 'glow-orange',
  violet: 'glow-violet',
  rose: 'glow-rose',
};

const glowPositionMap = {
  'top-left': '-top-10 -left-10',
  'top-right': '-top-10 -right-10',
  'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'bottom-left': '-bottom-10 -left-10',
  'bottom-right': '-bottom-10 -right-10',
};

export default function GlowCard({
  children,
  glowColor = 'emerald',
  className = '',
  glowPosition = 'top-right',
}: GlowCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border bg-surface-card p-6 shadow-sm transition-all duration-300 hover:border-border-strong hover:shadow-lg ${className}`}
    >
      {/* Ambient glow backdrop */}
      <div
        className={`glow-backdrop ${glowColorMap[glowColor]} ${glowPositionMap[glowPosition]} transition-all duration-500 group-hover:scale-125 group-hover:opacity-50`}
      />

      {/* Card content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
