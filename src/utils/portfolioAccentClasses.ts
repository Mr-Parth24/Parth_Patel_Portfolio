/**
 * Static Tailwind class maps for portfolio accent colors.
 * Dynamic template strings like `bg-accent-${color}` are stripped at build time;
 * use these maps so every variant is present in source for Tailwind to compile.
 */

export type PortfolioAccent = 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';

export function portfolioAccent(color?: string): PortfolioAccent {
  const c = color as PortfolioAccent;
  if (c === 'emerald' || c === 'blue' || c === 'orange' || c === 'violet' || c === 'rose') return c;
  return 'emerald';
}

/** Icon tile background (Projects, Education) */
export const accentIconTile: Record<PortfolioAccent, string> = {
  emerald: 'bg-accent-emerald/10',
  blue: 'bg-accent-blue/10',
  orange: 'bg-accent-orange/10',
  violet: 'bg-accent-violet/10',
  rose: 'bg-accent-rose/10',
};

/** Icon / emphasis text on tiles */
export const accentIconText: Record<PortfolioAccent, string> = {
  emerald: 'text-accent-emerald',
  blue: 'text-accent-blue',
  orange: 'text-accent-orange',
  violet: 'text-accent-violet',
  rose: 'text-accent-rose',
};

/** Timeline / dot fill */
export const accentDotBg: Record<PortfolioAccent, string> = {
  emerald: 'bg-accent-emerald',
  blue: 'bg-accent-blue',
  orange: 'bg-accent-orange',
  violet: 'bg-accent-violet',
  rose: 'bg-accent-rose',
};

/** Education diploma CTA — full utility string */
export const educationDiplomaLink: Record<PortfolioAccent, string> = {
  emerald:
    'inline-flex items-center gap-1.5 rounded-lg border border-accent-emerald/30 bg-accent-emerald/8 px-3 py-1.5 text-xs font-semibold text-accent-emerald transition-all hover:-translate-y-0.5 hover:bg-accent-emerald/15 hover:shadow-sm',
  blue:
    'inline-flex items-center gap-1.5 rounded-lg border border-accent-blue/30 bg-accent-blue/8 px-3 py-1.5 text-xs font-semibold text-accent-blue transition-all hover:-translate-y-0.5 hover:bg-accent-blue/15 hover:shadow-sm',
  orange:
    'inline-flex items-center gap-1.5 rounded-lg border border-accent-orange/30 bg-accent-orange/10 px-3 py-1.5 text-xs font-semibold text-accent-orange transition-all hover:-translate-y-0.5 hover:bg-accent-orange/15 hover:shadow-sm',
  violet:
    'inline-flex items-center gap-1.5 rounded-lg border border-accent-violet/30 bg-accent-violet/8 px-3 py-1.5 text-xs font-semibold text-accent-violet transition-all hover:-translate-y-0.5 hover:bg-accent-violet/15 hover:shadow-sm',
  rose:
    'inline-flex items-center gap-1.5 rounded-lg border border-accent-rose/30 bg-accent-rose/8 px-3 py-1.5 text-xs font-semibold text-accent-rose transition-all hover:-translate-y-0.5 hover:bg-accent-rose/15 hover:shadow-sm',
};
