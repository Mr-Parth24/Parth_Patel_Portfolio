import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import type { IExperience } from '../../data/portfolioData';
import GlowCard from './GlowCard';

/**
 * TimelineItem — Vertical timeline node with connecting line.
 * Features:
 * - Alternating layout implied via parent grid (stacked on mobile)
 * - Connecting dot + line on the timeline axis
 * - GlowCard wrapping for ambient light effect
 * - Scroll-reveal entrance via parent stagger
 */

interface TimelineItemProps {
  experience: IExperience;
  index: number;
}

export default function TimelineItem({ experience, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative pb-10 pl-10 lg:pl-0"
    >
      {/* Timeline Line (visible on mobile as left border, on desktop as center) */}
      <div className="absolute top-0 bottom-0 left-3.5 w-px bg-border lg:left-1/2 lg:-translate-x-1/2" />

      {/* Timeline Dot */}
      <div className={`absolute top-1 left-1.5 z-10 h-5 w-5 rounded-full border-[3px] border-surface bg-accent-${experience.accentColor || 'emerald'} lg:left-1/2 lg:-translate-x-1/2`} />

      {/* Content Card */}
      <div className={`lg:w-[calc(50%-2rem)] ${isLeft ? 'lg:mr-auto lg:pr-0' : 'lg:ml-auto lg:pl-0'}`}>
        <GlowCard glowColor={experience.accentColor || 'emerald'} glowPosition={isLeft ? 'top-right' : 'top-left'}>
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-text-primary">{experience.title}</h3>
            <p className="text-sm font-medium text-accent-emerald">{experience.organization}</p>
            {experience.department && (
              <p className="mt-0.5 text-xs text-text-muted">
                <MapPin size={12} className="mr-1 inline" />
                {experience.department}
              </p>
            )}
          </div>

          {/* Date Badge */}
          {experience.startDate && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-surface-hover px-3 py-1 text-xs font-medium text-text-secondary">
              <Calendar size={12} />
              {experience.startDate} — {experience.endDate}
            </div>
          )}

          {/* Bullets */}
          <ul className="space-y-2">
            {experience.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-text-secondary">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-emerald/60" />
                {bullet}
              </li>
            ))}
          </ul>

          {/* Tags */}
          {experience.tags && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {experience.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-surface-hover px-2 py-0.5 text-xs font-medium text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </GlowCard>
      </div>
    </motion.div>
  );
}
