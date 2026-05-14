import { useCallback, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Quote } from 'lucide-react';
import { useDailyQuote } from '../../hooks/useDailyQuote';

/**
 * Footer — light cap on the page: ambient motion, tap sparks, daily quote.
 * Tuned to feel like part of the same surface (not a separate “ slab ”).
 */

type Spark = { id: number; x: number; y: number };

const ROAMERS: Array<{
  w: number;
  h: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  x: number[];
  y: number[];
  bg: string;
  rounded: string;
  /** hide on very narrow viewports to reduce noise */
  hideXs?: boolean;
}> = [
  { w: 40, h: 40, left: '5%', top: '14%', duration: 26, delay: 0, x: [0, 22, -14, 0], y: [0, -18, 12, 0], bg: 'rgba(16,185,129,0.11)', rounded: 'rounded-full', hideXs: true },
  { w: 32, h: 32, left: '82%', top: '10%', duration: 21, delay: 0.9, x: [0, -18, 12, 0], y: [0, 14, -10, 0], bg: 'rgba(59,130,246,0.12)', rounded: 'rounded-full' },
  { w: 22, h: 22, left: '48%', top: '6%', duration: 18, delay: 0.3, x: [0, 14, -18, 0], y: [0, 10, 6, 0], bg: 'rgba(139,92,246,0.10)', rounded: 'rounded-lg rotate-45', hideXs: true },
  { w: 36, h: 36, left: '12%', top: '62%', duration: 24, delay: 1.4, x: [0, 26, -8, 0], y: [0, -14, 16, 0], bg: 'rgba(245,158,11,0.09)', rounded: 'rounded-2xl' },
  { w: 28, h: 28, left: '72%', top: '58%', duration: 20, delay: 0.6, x: [0, -22, 6, 0], y: [0, 16, -12, 0], bg: 'rgba(244,63,94,0.08)', rounded: 'rounded-full' },
];

const MARQUEE = ['Build', 'Research', 'Ship', 'Learn', 'Iterate', 'Debug', 'Deploy', 'Dream'];

export default function Footer() {
  const idRef = useRef(0);
  const [sparks, setSparks] = useState<Spark[]>([]);
  const { quote, status: quoteStatus } = useDailyQuote();

  const spawnSpark = useCallback((clientX: number, clientY: number, rect: DOMRect) => {
    const id = ++idRef.current;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    setSparks((s) => [...s.slice(-12), { id, x, y }]);
    window.setTimeout(() => {
      setSparks((s) => s.filter((p) => p.id !== id));
    }, 650);
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    spawnSpark(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };

  return (
    <footer
      onPointerDown={onPointerDown}
      className="relative isolate cursor-crosshair overflow-hidden border-t border-border/70 bg-surface pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2 sm:pt-3"
      aria-label="Footer — daily quote; tap or click for sparks"
    >
      {/* Soft wash — same family as page, not a second “card” */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-accent-emerald/[0.03] to-accent-blue/[0.04]" />
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-16 top-0 h-48 w-48 rounded-full opacity-[0.22] blur-3xl sm:h-56 sm:w-56 sm:opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.28), transparent 72%)' }}
        />
        <div
          className="absolute -right-12 bottom-0 h-52 w-52 rounded-full opacity-[0.18] blur-3xl sm:h-64 sm:w-64 sm:opacity-22"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.28), transparent 72%)' }}
        />
        <div
          className="absolute inset-x-0 top-1/2 h-32 -translate-y-1/2 opacity-[0.04] sm:opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #1A1D23 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      {ROAMERS.map((r, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute ${r.rounded} border border-white/35 shadow-sm backdrop-blur-[1px] ${r.hideXs ? 'hidden min-[400px]:block' : ''}`}
          style={{
            width: r.w,
            height: r.h,
            left: r.left,
            top: r.top,
            background: r.bg,
          }}
          animate={{ x: r.x, y: r.y }}
          transition={{
            duration: r.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: r.delay,
          }}
        />
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden py-2 opacity-[0.12] sm:py-2.5 sm:opacity-[0.14]">
        <div
          className="flex w-max gap-6 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.28em] text-text-primary sm:gap-10 sm:text-[10px] sm:tracking-[0.32em]"
          style={{ animation: 'marquee-left 48s linear infinite' }}
        >
          {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((word, idx) => (
            <span key={`${word}-${idx}`}>{word}</span>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center pt-3 sm:pt-4">
        <div className="h-px w-24 max-w-[30%] bg-gradient-to-r from-transparent via-accent-emerald/40 to-transparent sm:w-32" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-4 pb-10 pt-10 text-center sm:px-6 sm:pb-12 sm:pt-12 lg:max-w-3xl lg:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="flex flex-col items-center gap-1 sm:gap-1.5"
        >
          <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-emerald sm:text-xs sm:tracking-[0.22em]">
            <Sparkles className="h-3.5 w-3.5 shrink-0 opacity-90" aria-hidden />
            Today&apos;s beautiful thought
          </p>
          <h2 className="text-base font-semibold tracking-tight text-text-primary sm:text-lg">
            Thank you for taking the time
          </h2>
        </motion.div>

        <div className="mt-6 sm:mt-8">
          {quoteStatus === 'loading' && (
            <div
              className="mx-auto w-full max-w-xl space-y-2.5 rounded-xl border border-border/50 bg-surface-card/30 px-4 py-5 text-left backdrop-blur-sm sm:rounded-2xl sm:px-5 sm:py-6"
              aria-busy="true"
              aria-label="Loading quote"
            >
              <div className="h-2.5 w-full animate-pulse rounded bg-surface-hover sm:h-3" />
              <div className="h-2.5 w-[90%] animate-pulse rounded bg-surface-hover sm:h-3" />
              <div className="h-2.5 w-[65%] animate-pulse rounded bg-surface-hover sm:h-3" />
              <div className="mt-3 h-2 w-24 animate-pulse rounded bg-surface-hover sm:mt-4" />
            </div>
          )}

          {quote && quoteStatus !== 'loading' && (
            <motion.figure
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mx-auto w-full max-w-xl rounded-xl border border-border/60 bg-surface-elevated/70 px-4 py-5 text-left shadow-sm backdrop-blur-md sm:rounded-2xl sm:px-6 sm:py-6 lg:max-w-2xl"
            >
              <Quote className="mb-2 h-6 w-6 text-accent-emerald/55 sm:mb-3 sm:h-7 sm:w-7" aria-hidden strokeWidth={1.75} />
              <blockquote className="p-0">
                <p className="text-[0.9375rem] font-normal leading-relaxed text-text-primary sm:text-lg sm:leading-relaxed">
                  <span className="text-text-muted/80">&ldquo;</span>
                  {quote.text}
                  <span className="text-text-muted/80">&rdquo;</span>
                </p>
              </blockquote>
              <figcaption className="mt-3 text-xs font-semibold text-accent-emerald sm:mt-4 sm:text-sm">
                — {quote.author}
              </figcaption>
            </motion.figure>
          )}
        </div>
      </div>

      <AnimatePresence>
        {sparks.map((s) => (
          <motion.span
            key={s.id}
            initial={{ scale: 0, opacity: 0.85 }}
            animate={{ scale: [0, 1.25, 0.15], opacity: [0.85, 0.65, 0] }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-20 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent-emerald/55 bg-accent-emerald/20 shadow-[0_0_20px_rgba(16,185,129,0.35)] sm:h-8 sm:w-8"
            style={{ left: s.x, top: s.y }}
          />
        ))}
      </AnimatePresence>
    </footer>
  );
}
