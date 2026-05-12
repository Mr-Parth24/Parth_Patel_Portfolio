import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar, MapPin, GripHorizontal } from 'lucide-react';
import { experience } from '../../data/portfolioData';
import type { IExperience } from '../../data/portfolioData';

/**
 * ExperienceCarousel — Horizontal infinite drag-scroll carousel.
 *
 * Design:
 * - 2 cards visible on desktop (≥768px), 1 on mobile
 * - 3rd card's rounded edge always peeks in on the right (signals scroll)
 * - Infinite loop via array triple-cloning with silent position correction
 * - Framer Motion spring drag + velocity-aware snap-to-card
 * - Auto-advances every 5s, pauses on hover/drag
 * - Navigation arrows + dot indicators
 */

// ─── Accent color maps ──────────────────────────────────────────────────────

type AccentColor = 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';

const glowBg: Record<AccentColor, string> = {
  emerald: 'rgba(16,185,129,0.18)',
  blue:    'rgba(59,130,246,0.18)',
  orange:  'rgba(245,158,11,0.15)',
  violet:  'rgba(139,92,246,0.16)',
  rose:    'rgba(244,63,94,0.15)',
};

const accentText: Record<AccentColor, string> = {
  emerald: '#059669',
  blue:    '#3B82F6',
  orange:  '#F59E0B',
  violet:  '#8B5CF6',
  rose:    '#F43F5E',
};

const accentBadgeBg: Record<AccentColor, string> = {
  emerald: 'rgba(16,185,129,0.08)',
  blue:    'rgba(59,130,246,0.08)',
  orange:  'rgba(245,158,11,0.10)',
  violet:  'rgba(139,92,246,0.08)',
  rose:    'rgba(244,63,94,0.08)',
};

const dotBg: Record<AccentColor, string> = {
  emerald: '#10B981',
  blue:    '#3B82F6',
  orange:  '#F59E0B',
  violet:  '#8B5CF6',
  rose:    '#F43F5E',
};

// ─── Single Card ─────────────────────────────────────────────────────────────

function ExperienceCard({ exp }: { exp: IExperience }) {
  const color = (exp.accentColor ?? 'emerald') as AccentColor;

  return (
    <div
      className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface-card p-6 shadow-md select-none"
      style={{ boxShadow: `0 4px 24px ${glowBg[color]}, 0 1px 4px rgba(0,0,0,0.06)` }}
    >
      {/* Ambient glow orb */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full"
        style={{
          background: accentText[color],
          filter: 'blur(72px)',
          opacity: 0.22,
          animation: 'glow-pulse 4s ease-in-out infinite',
        }}
      />

      {/* Header row */}
      <div className="relative z-10 mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-tight text-text-primary sm:text-lg">
            {exp.title}
          </h3>
          <p className="mt-0.5 text-sm font-medium" style={{ color: accentText[color] }}>
            {exp.organization}
          </p>
          {exp.department && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-text-muted">
              <MapPin size={11} />
              {exp.department}
            </p>
          )}
        </div>

        {/* Color accent dot */}
        <div
          className="mt-1 h-3 w-3 shrink-0 rounded-full"
          style={{ background: dotBg[color] }}
        />
      </div>

      {/* Date badge */}
      {exp.startDate && (
        <div
          className="relative z-10 mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-text-secondary"
          style={{ background: accentBadgeBg[color] }}
        >
          <Calendar size={11} />
          {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}
        </div>
      )}

      {/* Bullet points */}
      <ul className="relative z-10 flex-1 space-y-2 overflow-hidden">
        {exp.bullets.slice(0, 3).map((bullet, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: accentText[color], opacity: 0.7 }}
            />
            <span className="line-clamp-2">{bullet}</span>
          </li>
        ))}
      </ul>

      {/* Tags */}
      {exp.tags && exp.tags.length > 0 && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-1.5">
          {exp.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md px-2 py-0.5 text-xs font-medium text-text-muted"
              style={{ background: 'rgba(0,0,0,0.04)' }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Carousel ────────────────────────────────────────────────────────────────

// Only show the meaningful entries (skip the stub "Additional Roles" entry if desired)
const items: IExperience[] = experience;

// Triple the array for infinite loop
const tripled = [...items, ...items, ...items];
const ORIGIN = items.length; // start index in the middle copy

export default function ExperienceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const [cardWidth, setCardWidth] = useState(0);
  const [gap] = useState(20);
  const [activeIdx, setActiveIdx] = useState(0); // 0-based within original items
  const [isDragging, setIsDragging] = useState(false);
  const [hinted, setHinted] = useState(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHovered = useRef(false);

  // ── Measure card width based on container ─────────────────────────────────
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const width = container.offsetWidth;
    // Desktop: 2 cards + peek of 3rd (≈ 0.35 card). Mobile: 1 card + peek (≈ 0.2)
    const isMobile = width < 640;
    const cw = isMobile
      ? width * 0.88
      : Math.min((width - gap) / 2 - gap * 0.5, 560);
    setCardWidth(cw);
  }, [gap]);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [measure]);

  // ── Compute x offset for a given tripled-array index ────────────────────
  const xForIndex = useCallback(
    (idx: number) => -idx * (cardWidth + gap),
    [cardWidth, gap]
  );

  // ── Initialize at ORIGIN ─────────────────────────────────────────────────
  useEffect(() => {
    if (cardWidth === 0) return;
    x.set(xForIndex(ORIGIN));
  }, [cardWidth, xForIndex, x]);

  // ── Virtual index tracks overall position for infinite loop ─────────────
  const [virtualIdx, setVirtualIdx] = useState(0);

  const goTo = useCallback(
    (vIdx: number) => {
      if (cardWidth === 0) return;
      const tripledIdx = ORIGIN + vIdx;
      setVirtualIdx(vIdx);
      setActiveIdx(((vIdx % items.length) + items.length) % items.length);
      controls.start({
        x: xForIndex(tripledIdx),
        transition: { type: 'spring', stiffness: 320, damping: 34, mass: 0.8 },
      });
    },
    [cardWidth, xForIndex, controls]
  );

  const prev = useCallback(() => goTo(virtualIdx - 1), [goTo, virtualIdx]);
  const next = useCallback(() => goTo(virtualIdx + 1), [goTo, virtualIdx]);

  // ── On drag end: snap to nearest card and handle infinite loop ───────────
  const handleDragEnd = useCallback(
    (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
      setIsDragging(false);
      setHinted(true);

      const vel = info.velocity.x;
      const offset = info.offset.x;
      const unit = cardWidth + gap;
      const currentX = x.get();

      // Velocity-aware: flick counts even if dragged less than 50%
      let delta = 0;
      if (Math.abs(vel) > 400) {
        delta = vel < 0 ? 1 : -1;
      } else {
        // Snap based on how far they dragged
        if (offset < -unit * 0.35) delta = 1;
        else if (offset > unit * 0.35) delta = -1;
      }

      const rawIdx = Math.round(-currentX / unit);
      const snapped = rawIdx + delta;
      const newVirtual = virtualIdx + delta;

      // Rebase tripled index: keep it within [ORIGIN-items, ORIGIN+items*2)
      let tripledIdx = ORIGIN + newVirtual;
      let rebased = newVirtual;

      // If we'd go out of the middle copy, wrap the x position silently first
      if (tripledIdx < items.length) {
        tripledIdx += items.length;
        rebased += items.length;
        x.set(xForIndex(tripledIdx - delta)); // rebase without animation
      } else if (tripledIdx >= items.length * 2) {
        tripledIdx -= items.length;
        rebased -= items.length;
        x.set(xForIndex(tripledIdx - delta));
      }

      setVirtualIdx(rebased);
      setActiveIdx(((rebased % items.length) + items.length) % items.length);
      controls.start({
        x: xForIndex(tripledIdx),
        transition: { type: 'spring', stiffness: 320, damping: 34, mass: 0.8 },
      });

      void snapped; // suppress unused warning
    },
    [cardWidth, gap, x, controls, xForIndex, virtualIdx]
  );

  // ── Auto-advance ─────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => {
      if (!isHovered.current) next();
    };
    autoRef.current = setInterval(tick, 5000);
    return () => {
      if (autoRef.current) clearInterval(autoRef.current);
    };
  }, [next]);

  // ── Drag hint: nudge slightly on mount ──────────────────────────────────
  useEffect(() => {
    if (cardWidth === 0 || hinted) return;
    const timer = setTimeout(() => {
      controls.start({
        x: [xForIndex(ORIGIN), xForIndex(ORIGIN) - 28, xForIndex(ORIGIN)],
        transition: { duration: 1.0, ease: 'easeInOut' },
      });
    }, 1200);
    return () => clearTimeout(timer);
  }, [cardWidth, hinted, controls, xForIndex]);

  const trackWidth = tripled.length * (cardWidth + gap);

  return (
    <div
      className="relative"
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {/* ── Header row: arrows ── */}
      <div className="mb-6 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm text-text-muted">
          <GripHorizontal size={15} />
          Drag or use arrows to explore
        </p>
        <div className="flex gap-2">
          <button
            onClick={prev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-card text-text-secondary shadow-sm transition-all duration-200 hover:border-accent-emerald/40 hover:text-accent-emerald hover:shadow-md"
            aria-label="Previous experience"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-card text-text-secondary shadow-sm transition-all duration-200 hover:border-accent-emerald/40 hover:text-accent-emerald hover:shadow-md"
            aria-label="Next experience"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* ── Carousel viewport ── */}
      <div
        ref={containerRef}
        className="overflow-hidden rounded-2xl"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <motion.div
          ref={trackRef}
          drag="x"
          style={{ x, width: trackWidth, display: 'flex', gap }}
          animate={controls}
          dragConstraints={{ left: -trackWidth, right: 0 }}
          dragElastic={0.08}
          onDragStart={() => { setIsDragging(true); setHinted(true); }}
          onDragEnd={handleDragEnd}
          className="will-change-transform"
        >
          {tripled.map((exp, i) => (
            <div
              key={i}
              style={{
                width: cardWidth,
                minWidth: cardWidth,
                height: 340,
                flexShrink: 0,
              }}
            >
              <ExperienceCard exp={exp} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Dot indicators ── */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {items.map((exp, i) => {
          const color = (exp.accentColor ?? 'emerald') as AccentColor;
          const isActive = i === activeIdx;
          return (
            <button
              key={i}
              onClick={() => goTo(i - (((virtualIdx % items.length) + items.length) % items.length) + virtualIdx)}
              className="transition-all duration-300"
              aria-label={`Go to experience ${i + 1}`}
              style={{
                width: isActive ? 28 : 8,
                height: 8,
                borderRadius: 999,
                background: isActive ? dotBg[color] : '#D1D5DB',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
