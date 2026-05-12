import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { experience } from '../../data/portfolioData';
import type { IExperience } from '../../data/portfolioData';

/**
 * ExperienceSection — Full-screen horizontal timeline.
 * Classic alternating top/bottom layout rotated 90° into horizontal scroll.
 * No card boxes — content floats above/below a center spine line.
 * Framer Motion drag with spring physics + fade gradient edges.
 */

type AccentColor = 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';

const ACCENT_HEX: Record<AccentColor, string> = {
  emerald: '#10B981', blue: '#3B82F6', orange: '#F59E0B', violet: '#8B5CF6', rose: '#F43F5E',
};
const ACCENT_DARK: Record<AccentColor, string> = {
  emerald: '#059669', blue: '#2563EB', orange: '#D97706', violet: '#7C3AED', rose: '#E11D48',
};

// Timeline geometry
const SLOT_W = 300;
const GAP = 60;
const UNIT = SLOT_W + GAP;
const TRACK_H = 520;
const LINE_Y = 260; // center of track
const DOT_R = 7;
const CONN_H = 36; // connector height between dot and content
const CONTENT_H = 190; // content block height

const items: IExperience[] = experience;
const tripled = [...items, ...items, ...items];
const ORIGIN = items.length;

// ─── Single timeline entry (above or below the line) ─────────────────────
function TimelineEntry({ exp, above }: { exp: IExperience; above: boolean }) {
  const color = (exp.accentColor ?? 'emerald') as AccentColor;
  const hex = ACCENT_HEX[color];
  const dark = ACCENT_DARK[color];

  const contentTop = above ? LINE_Y - CONN_H - CONTENT_H : LINE_Y + DOT_R * 2 + CONN_H;
  const connTop    = above ? LINE_Y - CONN_H - DOT_R      : LINE_Y + DOT_R * 2;
  const dotTop     = LINE_Y - DOT_R;

  return (
    <div className="absolute inset-0">
      {/* Glow aura on dot */}
      <div
        className="absolute rounded-full"
        style={{
          width: 56, height: 56,
          left: SLOT_W / 2 - 28, top: LINE_Y - 28,
          background: hex, filter: 'blur(22px)', opacity: 0.28,
          animation: 'glow-pulse 4s ease-in-out infinite',
        }}
      />

      {/* Dot on spine */}
      <div
        className="absolute rounded-full border-2 border-surface-card"
        style={{
          width: DOT_R * 2, height: DOT_R * 2,
          left: SLOT_W / 2 - DOT_R, top: dotTop,
          background: hex,
        }}
      />

      {/* Vertical connector */}
      <div
        className="absolute"
        style={{
          width: 1.5, height: CONN_H,
          left: SLOT_W / 2 - 0.75, top: connTop,
          background: `linear-gradient(to ${above ? 'top' : 'bottom'}, transparent, ${hex}88)`,
        }}
      />

      {/* Content block — no background, pure floating text */}
      <div
        className="absolute select-none"
        style={{ top: contentTop, height: CONTENT_H, left: 0, right: 0, padding: '0 12px' }}
      >
        <div className={`flex h-full flex-col ${above ? 'justify-end' : 'justify-start'}`}>
          {/* Title */}
          <p className="text-sm font-bold leading-tight text-text-primary">{exp.title}</p>
          {/* Org */}
          <p className="mt-0.5 text-xs font-semibold" style={{ color: dark }}>{exp.organization}</p>
          {exp.department && (
            <p className="mt-0.5 text-[10px] leading-tight text-text-muted">{exp.department}</p>
          )}
          {/* Date */}
          {exp.startDate && (
            <div className="mt-1.5 flex items-center gap-1 text-[10px] text-text-muted">
              <Calendar size={9} />
              {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}
            </div>
          )}
          {/* Bullets */}
          <ul className="mt-2 space-y-1">
            {exp.bullets.slice(0, 2).map((b, i) => (
              <li key={i} className="flex gap-1.5 text-[11px] leading-snug text-text-secondary">
                <span className="mt-[5px] h-1 w-1 shrink-0 rounded-full" style={{ background: hex, opacity: 0.7 }} />
                <span className="line-clamp-2">{b}</span>
              </li>
            ))}
          </ul>
          {/* Tags */}
          {exp.tags && (
            <div className="mt-2 flex flex-wrap gap-1">
              {exp.tags.slice(0, 3).map(t => (
                <span key={t} className="rounded px-1.5 py-0.5 text-[9px] font-medium text-text-muted"
                  style={{ background: `${hex}12` }}>
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────
export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();
  const [virtualIdx, setVirtualIdx] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const isHovered = useRef(false);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [hinted, setHinted] = useState(false);

  const xFor = useCallback((vi: number) => -(ORIGIN + vi) * UNIT, []);

  // Initialise position
  useEffect(() => { x.set(xFor(0)); }, [x, xFor]);

  const goTo = useCallback((vi: number) => {
    setVirtualIdx(vi);
    setActiveIdx(((vi % items.length) + items.length) % items.length);
    controls.start({ x: xFor(vi), transition: { type: 'spring', stiffness: 280, damping: 30 } });
  }, [controls, xFor]);

  const next = useCallback(() => goTo(virtualIdx + 1), [goTo, virtualIdx]);
  const prev = useCallback(() => goTo(virtualIdx - 1), [goTo, virtualIdx]);

  // Drag end handler
  const onDragEnd = useCallback((_: unknown, info: { velocity: { x: number }; offset: { x: number } }) => {
    setHinted(true);
    const { velocity: { x: vx }, offset: { x: ox } } = info;
    let delta = 0;
    if (Math.abs(vx) > 350) delta = vx < 0 ? 1 : -1;
    else if (ox < -UNIT * 0.3) delta = 1;
    else if (ox > UNIT * 0.3) delta = -1;

    let vi = virtualIdx + delta;
    // Rebase to keep within middle copy
    const raw = ORIGIN + vi;
    if (raw < items.length) {
      vi += items.length;
      x.set(xFor(vi - delta));
    } else if (raw >= items.length * 2) {
      vi -= items.length;
      x.set(xFor(vi - delta));
    }
    goTo(vi);
  }, [virtualIdx, x, xFor, goTo]);

  // Auto-advance
  useEffect(() => {
    autoRef.current = setInterval(() => { if (!isHovered.current) next(); }, 5000);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  // Drag hint nudge
  useEffect(() => {
    if (hinted) return;
    const t = setTimeout(() => {
      controls.start({
        x: [xFor(0), xFor(0) - 40, xFor(0)],
        transition: { duration: 1.1, ease: 'easeInOut' },
      });
    }, 1400);
    return () => clearTimeout(t);
  }, [hinted, controls, xFor]);

  const trackW = tripled.length * UNIT;

  // Dot nav: map dot click to correct virtual offset
  const dotGoTo = useCallback((i: number) => {
    const current = ((virtualIdx % items.length) + items.length) % items.length;
    const diff = i - current;
    goTo(virtualIdx + diff);
  }, [virtualIdx, goTo]);

  return (
    <section
      id="experience"
      className="relative flex flex-col overflow-hidden bg-surface"
      style={{ minHeight: '100dvh' }}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
    >
      {/* ── Section heading ── */}
      <div className="relative z-20 flex flex-col items-center pt-20 pb-4">
        <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Experience
        </h2>
        <p className="mt-2 text-sm text-text-secondary sm:text-base">
          Drag to travel through my timeline
        </p>
        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-1 w-8 rounded-full bg-accent-emerald" />
          <span className="h-1 w-3 rounded-full bg-accent-blue" />
          <span className="h-1 w-1.5 rounded-full bg-accent-orange" />
        </div>
      </div>

      {/* ── Arrow nav ── */}
      <div className="absolute right-6 top-20 z-30 flex gap-2">
        {['←','→'].map((ch, i) => (
          <button key={ch} onClick={i === 0 ? prev : next}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-card/80 text-sm text-text-secondary backdrop-blur-sm transition-all hover:border-accent-emerald/40 hover:text-accent-emerald hover:shadow-md">
            {ch}
          </button>
        ))}
      </div>

      {/* ── Timeline track ── */}
      <div
        ref={containerRef}
        className="flex flex-1 items-center overflow-hidden"
        style={{ cursor: 'grab' }}
      >
        <motion.div
          drag="x"
          style={{ x, width: trackW, height: TRACK_H, position: 'relative', flexShrink: 0 }}
          animate={controls}
          dragConstraints={{ left: -trackW, right: trackW }}
          dragElastic={0.06}
          onDragStart={() => setHinted(true)}
          onDragEnd={onDragEnd}
          className="will-change-transform"
        >
          {/* ── Center spine line ── */}
          <div
            className="absolute"
            style={{
              top: LINE_Y, left: 0, width: trackW, height: 1.5,
              background: 'linear-gradient(to right, transparent 0%, #E5E7EB 4%, #E5E7EB 96%, transparent 100%)',
            }}
          />

          {/* ── Timeline entries ── */}
          {tripled.map((exp, i) => (
            <div
              key={i}
              style={{ position: 'absolute', left: i * UNIT, top: 0, width: SLOT_W, height: TRACK_H }}
            >
              <TimelineEntry exp={exp} above={i % 2 === 0} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Left/right fade edges ── */}
      {['left', 'right'].map(side => (
        <div key={side} className="pointer-events-none absolute top-0 bottom-0 z-10"
          style={{
            [side]: 0, width: '18%',
            background: `linear-gradient(to ${side === 'left' ? 'right' : 'left'}, #FAFBFC 20%, transparent 100%)`,
          }}
        />
      ))}

      {/* ── Dot indicators ── */}
      <div className="relative z-20 flex items-center justify-center gap-2 pb-8">
        {items.map((exp, i) => {
          const color = (exp.accentColor ?? 'emerald') as AccentColor;
          const isActive = i === activeIdx;
          return (
            <button key={i} onClick={() => dotGoTo(i)} aria-label={`Go to ${exp.title}`}
              className="transition-all duration-300"
              style={{
                width: isActive ? 28 : 8, height: 8, borderRadius: 999,
                background: isActive ? ACCENT_HEX[color] : '#D1D5DB',
              }}
            />
          );
        })}
      </div>

      {/* ── Drag hint label ── */}
      {!hinted && (
        <p className="pointer-events-none absolute bottom-20 left-1/2 z-20 -translate-x-1/2 text-xs text-text-muted">
          ← drag to explore →
        </p>
      )}
    </section>
  );
}
