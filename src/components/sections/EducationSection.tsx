import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import Section from '../layout/Section';
import GlowCard from '../ui/GlowCard';
import { education } from '../../data/portfolioData';
import { staggerContainerVariants, fadeUpVariants } from '../../hooks/useScrollReveal';

/**
 * EducationSection — Education cards with institution details, dates, and GPA.
 */

const accentColors: Array<'emerald' | 'blue' | 'orange' | 'violet'> = ['emerald', 'blue', 'orange', 'violet'];

export default function EducationSection() {
  return (
    <Section
      id="education"
      title="Education"
      subtitle="Academic foundations that shaped my engineering mindset."
    >
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-6 md:grid-cols-2"
      >
        {education.map((edu, index) => (
          <motion.div key={edu.institution} variants={fadeUpVariants}>
            <GlowCard
              glowColor={accentColors[index % accentColors.length]}
              className="h-full"
            >
              {/* Icon */}
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-${accentColors[index % accentColors.length]}/10`}>
                <GraduationCap size={24} className={`text-accent-${accentColors[index % accentColors.length]}`} />
              </div>

              {/* Degree */}
              <h3 className="text-lg font-semibold text-text-primary">{edu.degree}</h3>
              <p className="text-sm font-medium text-accent-emerald">{edu.field}</p>

              {/* Institution */}
              <p className="mt-2 text-sm text-text-secondary">{edu.institution}</p>

              {/* Meta row */}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-text-muted">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={12} />
                  {edu.startDate} — {edu.endDate}
                </span>
                {edu.gpa && (
                  <span className="inline-flex items-center gap-1">
                    <Award size={12} />
                    GPA: {edu.gpa}
                  </span>
                )}
              </div>

              {/* Description */}
              {edu.description && (
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {edu.description}
                </p>
              )}
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
