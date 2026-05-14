import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import { experience } from '../../data/portfolioData';
import type { IExperience } from '../../data/portfolioData';

type AccentColor = 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';

const ACCENT_HEX: Record<AccentColor, string> = {
  emerald: '#10B981',
  blue: '#3B82F6',
  orange: '#F59E0B',
  violet: '#8B5CF6',
  rose: '#F43F5E',
};
const ACCENT_LIGHT: Record<AccentColor, string> = {
  emerald: '#D1FAE5',
  blue: '#DBEAFE',
  orange: '#FEF3C7',
  violet: '#EDE9FE',
  rose: '#FFE4E6',
};

const CARD_W = 420;
const GAP = 28;
const UNIT = CARD_W + GAP;

const items: IExperience[] = experience;
const N = items.length;
const tripled = [...items, ...items, ...items];

// ─── Single Card ─────────────────────────────────────────────────────────────
function ExpCard({ exp, isActive }: { exp: IExperience; isActive: boolean }) {
  const color = (exp.accentColor ?? 'emerald') as AccentColor;
  const hex = ACCENT_HEX[color];
  const light = ACCENT_LIGHT[color];

  return (
    <motion.div
      animate={{ scale: isActive ? 1 : 0.88, opacity: isActive ? 1 : 0.42 }}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ width: CARD_W, flexShrink: 0 }}
      className="select-none"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-surface-card"
        style={{
          boxShadow: isActive
            ? `0 24px 64px ${hex}20, 0 8px 24px rgba(0,0,0,0.07)`
            : '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.45s ease',
        }}
      >
        {/* Accent top bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${hex}, ${hex}44)` }} />

        <div className="p-7">
          {/* Org badge */}
          <div
            className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ background: light, color: hex }}
          >
            <Briefcase size={11} />
            {exp.organization}
          </div>

          {/* Role */}
          <h3 className="mb-1 text-xl font-bold leading-tight text-text-primary">{exp.title}</h3>

          {/* Dept */}
          {exp.department && (
            <p className="mb-2 text-sm font-medium text-text-secondary">{exp.department}</p>
          )}

          {/* Date */}
          {exp.startDate && (
            <div className="mb-5 flex items-center gap-1.5 text-xs text-text-muted">
              <Calendar size={12} />
              <span>
                {exp.startDate}
                {exp.endDate ? ` — ${exp.endDate}` : ' — Present'}
              </span>
            </div>
          )}

          <div className="mb-5 h-px bg-border" />

          {/* Bullets */}
          <ul className="space-y-3">
            {exp.bullets.slice(0, 3).map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                <span
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: hex }}
                />
                {b}
              </li>
            ))}
          </ul>

          {/* Tags */}
          {exp.tags && exp.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {exp.tags.map(tag => (
                <span
                  key={tag}
                  className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                  style={{ background: `${hex}15`, color: hex }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(800);
  const [virtualIdx, setVirtualIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [hinted, setHinted] = useState(false);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const isHovered = useRef(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Center offset: positions active card at viewport center
  const xFor = useCallback(
    (vi: number) => containerW / 2 - CARD_W / 2 - (N + vi) * UNIT,
    [containerW],
  );

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContainerW(el.offsetWidth));
    ro.observe(el);
    setContainerW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Set initial position when containerW is known
  useEffect(() => {
    x.set(xFor(0));
  }, [containerW, x, xFor]);

  const snapTo = useCallback(
    (vi: number) => {
      let raw = N + vi;
      if (raw < 1) { vi += N; raw += N; }
      if (raw >= N * 2) { vi -= N; raw -= N; }
      animate(x, containerW / 2 - CARD_W / 2 - raw * UNIT, {
        type: 'spring',
        stiffness: 300,
        damping: 34,
      });
      setVirtualIdx(vi);
      setActiveIdx(((vi % N) + N) % N);
    },
    [x, containerW],
  );

  const next = useCallback(() => snapTo(virtualIdx + 1), [snapTo, virtualIdx]);
  const prev = useCallback(() => snapTo(virtualIdx - 1), [snapTo, virtualIdx]);

  // Auto-rotate
  useEffect(() => {
    autoRef.current = setInterval(() => {
      if (!isHovered.current && !isDragging.current) next();
    }, 4200);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  const onDragEnd = useCallback(
    (_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
      isDragging.current = false;
      setHinted(true);
      const { velocity: { x: vx }, offset: { x: ox } } = info;
      let delta = 0;
      if (Math.abs(vx) > 300) delta = vx < 0 ? 1 : -1;
      else if (ox < -UNIT * 0.22) delta = 1;
      else if (ox > UNIT * 0.22) delta = -1;
      snapTo(virtualIdx + delta);
    },
    [virtualIdx, snapTo],
  );

  const dotGoTo = useCallback(
    (i: number) => snapTo(virtualIdx + (i - activeIdx)),
    [virtualIdx, activeIdx, snapTo],
  );

  const trackW = tripled.length * UNIT;

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-surface py-24"
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            top: '5%', left: '-8%',
            background: '#10B981',
            filter: 'blur(120px)',
            opacity: 0.06,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            bottom: '5%', right: '-6%',
            background: '#3B82F6',
            filter: 'blur(120px)',
            opacity: 0.07,
          }}
        />
      </div>

      {/* Heading */}
      <div className="relative z-20 mb-14 flex flex-col items-center text-center px-6">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-accent-emerald">
          Professional Journey
        </p>
        <h2 className="text-4xl font-bold text-text-primary sm:text-5xl">Experience</h2>
        <p className="mt-3 text-base text-text-secondary max-w-md">
          From research labs to real-world products — drag or use arrows to explore
        </p>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-0.5 w-10 rounded-full bg-accent-emerald" />
          <span className="h-0.5 w-4 rounded-full bg-accent-blue" />
          <span className="h-0.5 w-2 rounded-full bg-accent-orange" />
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          ref={containerRef}
          className="overflow-hidden"
          style={{ cursor: isDragging.current ? 'grabbing' : 'grab' }}
        >
          <motion.div
            drag="x"
            style={{ x, width: trackW, display: 'flex', gap: GAP }}
            dragConstraints={{ left: -trackW, right: trackW }}
            dragElastic={0.04}
            onDragStart={() => { isDragging.current = true; setHinted(true); }}
            onDragEnd={onDragEnd}
            className="will-change-transform"
          >
            {tripled.map((exp, i) => {
              const tripledActive = N + virtualIdx;
              return (
                <ExpCard key={i} exp={exp} isActive={i === tripledActive} />
              );
            })}
          </motion.div>
        </div>

        {/* Fade edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10"
          style={{
            width: '18%',
            background: 'linear-gradient(to right, #FAFBFC 5%, transparent 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10"
          style={{
            width: '18%',
            background: 'linear-gradient(to left, #FAFBFC 5%, transparent 100%)',
          }}
        />

        {/* Arrow buttons */}
        <button
          id="exp-prev"
          onClick={prev}
          aria-label="Previous experience"
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-card/90 shadow-md backdrop-blur-sm transition-all hover:border-accent-emerald/50 hover:text-accent-emerald hover:shadow-lg sm:left-8"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          id="exp-next"
          onClick={next}
          aria-label="Next experience"
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-card/90 shadow-md backdrop-blur-sm transition-all hover:border-accent-emerald/50 hover:text-accent-emerald hover:shadow-lg sm:right-8"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Progress counter */}
      <div className="relative z-20 mt-4 flex items-center justify-center">
        <span className="text-xs text-text-muted">
          {activeIdx + 1} / {N}
        </span>
      </div>

      {/* Dot indicators */}
      <div className="relative z-20 mt-3 flex items-center justify-center gap-2">
        {items.map((exp, i) => {
          const color = (exp.accentColor ?? 'emerald') as AccentColor;
          const isActive = i === activeIdx;
          return (
            <button
              key={i}
              id={`exp-dot-${i}`}
              onClick={() => dotGoTo(i)}
              aria-label={`Go to ${exp.title}`}
              className="transition-all duration-300"
              style={{
                width: isActive ? 28 : 7,
                height: 7,
                borderRadius: 9999,
                background: isActive ? ACCENT_HEX[color] : '#D1D5DB',
              }}
            />
          );
        })}
      </div>

      {/* Drag hint */}
      {!hinted && (
        <p className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 text-[11px] text-text-muted">
          ← drag to explore →
        </p>
      )}
    </section>
  );
}
