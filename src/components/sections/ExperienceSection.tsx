import Section from '../layout/Section';
import ExperienceCarousel from '../ui/ExperienceCarousel';

/**
 * ExperienceSection — Horizontal infinite drag-scroll carousel.
 * Replaced vertical timeline with a classy swipeable card track.
 */

export default function ExperienceSection() {
  return (
    <Section
      id="experience"
      title="Experience"
      subtitle="Drag or swipe to explore my research, professional, and leadership roles."
    >
      <ExperienceCarousel />
    </Section>
  );
}
