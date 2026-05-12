import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations.
 *
 * Returns a ref to attach to the element and a boolean `isVisible` flag.
 * Works with Framer Motion: pass isVisible to control animation variants.
 *
 * Usage:
 *   const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
 *   <motion.div ref={ref} animate={isVisible ? 'visible' : 'hidden'} variants={fadeUpVariants}>
 */

interface UseScrollRevealOptions {
  threshold?: number;    // 0-1, how much of element must be visible (default: 0.15)
  rootMargin?: string;   // IntersectionObserver root margin (default: '0px 0px -50px 0px')
  triggerOnce?: boolean; // Only trigger once (default: true)
}

interface UseScrollRevealReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}

export function useScrollReveal(
  options: UseScrollRevealOptions = {}
): UseScrollRevealReturn {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
  } = options;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(el);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

// ─── Framer Motion Variant Presets ─────────────────────────────────────────

const smoothEase = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smoothEase as unknown as [number, number, number, number] },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: smoothEase as unknown as [number, number, number, number] },
  },
};

export const slideLeftVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: smoothEase as unknown as [number, number, number, number] },
  },
};

export const slideRightVariants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: smoothEase as unknown as [number, number, number, number] },
  },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};
