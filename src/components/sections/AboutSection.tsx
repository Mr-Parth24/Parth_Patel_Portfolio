import { motion } from 'framer-motion';
import { Code2, FlaskConical, Globe, Users } from 'lucide-react';
import Section from '../layout/Section';
import GlowCard from '../ui/GlowCard';
import { personalInfo } from '../../data/portfolioData';

/**
 * AboutSection — Bio card with quick stat highlights.
 * Features ambient glows and staggered card entrance.
 */

const stats = [
  { icon: FlaskConical, label: 'Research Labs', value: '3', color: 'emerald' as const },
  { icon: Code2, label: 'Languages', value: '5+', color: 'blue' as const },
  { icon: Globe, label: 'Web Projects', value: '10+', color: 'orange' as const },
  { icon: Users, label: 'Led 200+ Members', value: 'ISA', color: 'violet' as const },
];

export default function AboutSection() {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="A quick snapshot of who I am and what drives my work."
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Bio Card */}
        <GlowCard glowColor="emerald" glowPosition="top-left">
          <h3 className="mb-4 text-xl font-semibold text-text-primary">
            Hello! I'm {personalInfo.name}
          </h3>
          <div className="space-y-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              I'm a Computer Science graduate from South Dakota State University with a deep passion
              for building systems that bridge hardware and software. From programming STM32
              microcontrollers to crafting React UIs, I thrive at the intersection of embedded
              engineering and modern web development.
            </p>
            <p>
              My research spans three university laboratories — working on medical device firmware,
              GPS-independent navigation with computer vision, and agricultural technology. I bring
              a researcher's rigor and a builder's urgency to every project.
            </p>
            <p>
              Outside of code, I've served as Treasurer of the Indian Students' Association,
              managing budgets for a 200+ member organization and producing large-scale cultural events.
            </p>
          </div>
        </GlowCard>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
            >
              <GlowCard glowColor={stat.color} glowPosition="center" className="text-center">
                <stat.icon size={28} className={`mx-auto mb-3 text-accent-${stat.color}`} />
                <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-text-muted">{stat.label}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
