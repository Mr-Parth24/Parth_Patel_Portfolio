import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';
import { useCallback, useRef } from 'react';

/**
 * useTilt — Maps cursor coordinates within a card element to smooth
 * spring-physics rotateX/rotateY transforms for pseudo-3D tilt effect.
 *
 * Behavior:
 * - On mouse enter: track cursor position relative to card center
 * - Map dx/dy to rotateX/rotateY within ±maxTilt degree range
 * - Apply via useSpring with configurable stiffness/damping
 * - On mouse leave: spring back to (0, 0) — flat
 * - Disabled on touch devices (pointer: coarse)
 *
 * Usage:
 *   const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
 *   <motion.div ref={ref} style={{ rotateX, rotateY }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
 */

interface UseTiltOptions {
  maxTilt?: number;      // Maximum rotation in degrees (default: 15)
  stiffness?: number;    // Spring stiffness (default: 300)
  damping?: number;      // Spring damping (default: 20)
  scale?: number;        // Scale on hover (default: 1.02)
}

interface UseTiltReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

export function useTilt(options: UseTiltOptions = {}): UseTiltReturn {
  const {
    maxTilt = 15,
    stiffness = 300,
    damping = 20,
    scale: hoverScale = 1.02,
  } = options;

  const ref = useRef<HTMLDivElement>(null);

  // Raw motion values
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rawScale = useMotionValue(1);

  // Spring-smoothed outputs
  const springConfig = { stiffness, damping, mass: 0.5 };
  const rotateX = useSpring(rawRotateX, springConfig);
  const rotateY = useSpring(rawRotateY, springConfig);
  const scale = useSpring(rawScale, springConfig);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Skip tilt on touch devices
      if (window.matchMedia('(pointer: coarse)').matches) return;

      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized position from -1 to 1
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);

      // Invert Y for natural tilt feel (cursor moves up → card tilts toward viewer at top)
      rawRotateX.set(-normalizedY * maxTilt);
      rawRotateY.set(normalizedX * maxTilt);
      rawScale.set(hoverScale);
    },
    [maxTilt, hoverScale, rawRotateX, rawRotateY, rawScale]
  );

  const onMouseLeave = useCallback(() => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    rawScale.set(1);
  }, [rawRotateX, rawRotateY, rawScale]);

  return { ref, rotateX, rotateY, scale, onMouseMove, onMouseLeave };
}
