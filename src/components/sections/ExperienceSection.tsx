import Section from '../layout/Section';
import TimelineItem from '../ui/TimelineItem';
import { experience } from '../../data/portfolioData';

/**
 * ExperienceSection — Interactive vertical timeline of professional & research experience.
 * Each item uses TimelineItem component with GlowCard, connecting dots/lines, and scroll-reveal.
 */

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Research, professional roles, and leadership positions."
    >
      <div className="relative">
        {experience.map((exp, index) => (
          <TimelineItem key={`${exp.title}-${exp.organization}-${index}`} experience={exp} index={index} />
        ))}
      </div>
    </Section>
  );
}
