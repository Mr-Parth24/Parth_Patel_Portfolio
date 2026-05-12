import { motion } from 'framer-motion';

/**
 * SkillBadge — Animated skill pill/tag with category-colored tint.
 * Features hover scale-up micro-animation.
 */

type AccentColor = 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';

interface SkillBadgeProps {
  skill: string;
  accentColor?: AccentColor;
}

const colorMap: Record<AccentColor, { bg: string; text: string; border: string }> = {
  emerald: { bg: 'bg-accent-emerald/8', text: 'text-accent-emerald-dark', border: 'border-accent-emerald/20' },
  blue: { bg: 'bg-accent-blue/8', text: 'text-accent-blue', border: 'border-accent-blue/20' },
  orange: { bg: 'bg-accent-orange/10', text: 'text-accent-orange', border: 'border-accent-orange/20' },
  violet: { bg: 'bg-accent-violet/8', text: 'text-accent-violet', border: 'border-accent-violet/20' },
  rose: { bg: 'bg-accent-rose/8', text: 'text-accent-rose', border: 'border-accent-rose/20' },
};

export default function SkillBadge({ skill, accentColor = 'emerald' }: SkillBadgeProps) {
  const colors = colorMap[accentColor];

  return (
    <motion.span
      whileHover={{ scale: 1.08, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex cursor-default items-center rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 sm:text-sm ${colors.bg} ${colors.text} ${colors.border}`}
    >
      {skill}
    </motion.span>
  );
}
