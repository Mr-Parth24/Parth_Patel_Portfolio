import { motion } from 'framer-motion';
import Section from '../layout/Section';
import SkillBadge from '../ui/SkillBadge';
import GlowCard from '../ui/GlowCard';
import { skillCategories } from '../../data/portfolioData';
import { staggerContainerVariants, fadeUpVariants } from '../../hooks/useScrollReveal';

const ALL_SKILLS = skillCategories.flatMap(c => c.skills);
// Double for seamless infinite loop
const TICKER_ROW1 = [...ALL_SKILLS, ...ALL_SKILLS];
const TICKER_ROW2 = [...ALL_SKILLS.slice().reverse(), ...ALL_SKILLS.slice().reverse()];

const ACCENT_HEX: Record<string, string> = {
  emerald: '#10B981', blue: '#3B82F6', orange: '#F59E0B', violet: '#8B5CF6', rose: '#F43F5E',
};
const ACCENT_LIGHT: Record<string, string> = {
  emerald: '#D1FAE5', blue: '#DBEAFE', orange: '#FEF3C7', violet: '#EDE9FE', rose: '#FFE4E6',
};

export default function SkillsSection() {
  return (
    <Section id="skills" title="Technical Skills" subtitle="Technologies and tools I work with across the full stack.">
      {/* Category cards */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {skillCategories.map(category => (
          <motion.div key={category.category} variants={fadeUpVariants}>
            <GlowCard glowColor={category.accentColor} className="h-full">
              <h3 className="mb-4 text-lg font-semibold text-text-primary">{category.category}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map(skill => (
                  <SkillBadge key={skill} skill={skill} accentColor={category.accentColor} />
                ))}
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Infinite marquee strips */}
      <div className="relative w-full max-w-full overflow-hidden rounded-2xl border border-border bg-surface-card py-4 space-y-3"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>

        {/* Row 1 — scrolls left */}
        <div className="flex gap-3" style={{ animation: 'marquee-left 28s linear infinite', width: 'max-content' }}>
          {TICKER_ROW1.map((skill, i) => {
            const cat = skillCategories.find(c => c.skills.includes(skill)) ?? skillCategories[0];
            const hex = ACCENT_HEX[cat.accentColor];
            const light = ACCENT_LIGHT[cat.accentColor];
            return (
              <span key={`r1-${i}`}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
                style={{ background: light, color: hex }}>
                {skill}
              </span>
            );
          })}
        </div>

        {/* Row 2 — scrolls right */}
        <div className="flex gap-3" style={{ animation: 'marquee-right 32s linear infinite', width: 'max-content' }}>
          {TICKER_ROW2.map((skill, i) => {
            const cat = skillCategories.find(c => c.skills.includes(skill)) ?? skillCategories[1];
            const hex = ACCENT_HEX[cat.accentColor];
            const light = ACCENT_LIGHT[cat.accentColor];
            return (
              <span key={`r2-${i}`}
                className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap"
                style={{ background: light, color: hex }}>
                {skill}
              </span>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
