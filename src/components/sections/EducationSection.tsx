import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award, Eye } from 'lucide-react';
import Section from '../layout/Section';
import GlowCard from '../ui/GlowCard';
import { education } from '../../data/portfolioData';
import { staggerContainerVariants, fadeUpVariants } from '../../hooks/useScrollReveal';
import {
  accentIconText,
  accentIconTile,
  educationDiplomaLink,
  type PortfolioAccent,
} from '../../utils/portfolioAccentClasses';

/**
 * EducationSection — Education cards with diploma viewer link.
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
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {education.map((edu, index) => {
          const color = accentColors[index % accentColors.length] as PortfolioAccent;
          return (
            <motion.div key={edu.institution} variants={fadeUpVariants}>
              <GlowCard glowColor={color} className="h-full">
                {/* Icon */}
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${accentIconTile[color]}`}>
                  <GraduationCap size={24} className={accentIconText[color]} />
                </div>

                {/* Degree */}
                <h3 className="text-lg font-semibold text-text-primary">{edu.degree}</h3>
                <p className={`text-sm font-medium ${accentIconText[color]}`}>{edu.field}</p>

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

                {/* Diploma viewer */}
                {edu.diplomaUrl && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <a
                      href={edu.diplomaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`edu-diploma-${edu.institution.toLowerCase().replace(/\s+/g, '-')}`}
                      className={educationDiplomaLink[color]}
                    >
                      <Eye size={13} />
                      View Diploma
                    </a>
                  </div>
                )}
              </GlowCard>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}
