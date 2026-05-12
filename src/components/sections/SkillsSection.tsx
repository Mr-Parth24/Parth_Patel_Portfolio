import { motion } from 'framer-motion';
import Section from '../layout/Section';
import SkillBadge from '../ui/SkillBadge';
import GlowCard from '../ui/GlowCard';
import { skillCategories } from '../../data/portfolioData';
import { staggerContainerVariants, fadeUpVariants } from '../../hooks/useScrollReveal';

/**
 * SkillsSection — Grouped skill badges organized by category.
 * Each category is wrapped in a GlowCard with matching accent color.
 * Skills animate in with staggered entrance.
 */

export default function SkillsSection() {
  return (
    <Section
      id="skills"
      title="Technical Skills"
      subtitle="Technologies and tools I work with across the full stack."
    >
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map((category) => (
          <motion.div key={category.category} variants={fadeUpVariants}>
            <GlowCard glowColor={category.accentColor} className="h-full">
              <h3 className="mb-4 text-lg font-semibold text-text-primary">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <SkillBadge
                    key={skill}
                    skill={skill}
                    accentColor={category.accentColor}
                  />
                ))}
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
