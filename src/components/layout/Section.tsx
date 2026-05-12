import { motion } from 'framer-motion';
import { useScrollReveal, fadeUpVariants } from '../../hooks/useScrollReveal';
import type { ReactNode } from 'react';

/**
 * Section — Reusable scroll-reveal section wrapper.
 * Applies consistent padding, max-width centering, scroll-margin-top,
 * and injects a fade-up animation on viewport entry.
 */

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = '',
  fullWidth = false,
}: SectionProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section
      id={id}
      className={`section-padding scroll-mt-24 ${className}`}
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
        variants={fadeUpVariants}
        className={fullWidth ? 'w-full' : 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'}
      >
        {(title || subtitle) && (
          <div className="mb-12 text-center lg:mb-16">
            {title && (
              <h2 className="mb-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mx-auto max-w-2xl text-base text-text-secondary sm:text-lg">
                {subtitle}
              </p>
            )}
            {/* Decorative accent bar */}
            <div className="mx-auto mt-4 flex items-center justify-center gap-1.5">
              <span className="h-1 w-8 rounded-full bg-accent-emerald" />
              <span className="h-1 w-3 rounded-full bg-accent-blue" />
              <span className="h-1 w-1.5 rounded-full bg-accent-orange" />
            </div>
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
