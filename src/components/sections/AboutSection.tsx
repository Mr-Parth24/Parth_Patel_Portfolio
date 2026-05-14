import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Code2, FlaskConical, Globe, Users } from 'lucide-react';
import Section from '../layout/Section';
import GlowCard from '../ui/GlowCard';
import { personalInfo } from '../../data/portfolioData';

const stats = [
  { icon: FlaskConical, label: 'Research Labs', target: 3,  suffix: '',   color: 'emerald' as const },
  { icon: Code2,        label: 'Languages',     target: 5,  suffix: '+',  color: 'blue'    as const },
  { icon: Globe,        label: 'Web Projects',  target: 10, suffix: '+',  color: 'orange'  as const },
  { icon: Users,        label: 'ISA Members',   target: 200,suffix: '+',  color: 'violet'  as const },
];

const ACCENT_HEX = {
  emerald: '#10B981', blue: '#3B82F6', orange: '#F59E0B', violet: '#8B5CF6',
};

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const dur = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);
  return <>{count}{suffix}</>;
}

export default function AboutSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const inView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <Section id="about" title="About Me" subtitle="A quick snapshot of who I am and what drives my work.">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-10">
        {/* Bio */}
        <GlowCard glowColor="emerald" glowPosition="top-left">
          <h3 className="mb-4 text-xl font-semibold text-text-primary">Hello! I'm {personalInfo.name}</h3>
          <div className="space-y-3 text-sm leading-relaxed text-text-secondary sm:text-base">
            <p>
              I'm a Computer Science graduate from South Dakota State University — now a PhD candidate at the University of North Texas — with a deep passion for building systems that bridge hardware and software.
            </p>
            <p>
              My research spans three university laboratories: medical device firmware, GPS-independent computer vision navigation, and agricultural technology. I bring a researcher's rigor and a builder's urgency to every project.
            </p>
            <p>
              Outside of code, I've served as Treasurer of the Indian Students' Association, managing budgets for 200+ members and producing large-scale cultural events with 300+ attendees.
            </p>
          </div>
        </GlowCard>

        {/* Stats with count-up */}
        <div ref={statsRef} className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
            >
              <GlowCard glowColor={stat.color} glowPosition="center" className="text-center">
                <stat.icon size={28} className="mx-auto mb-3" style={{ color: ACCENT_HEX[stat.color] }} />
                <p className="text-2xl font-bold text-text-primary" style={{ color: ACCENT_HEX[stat.color] }}>
                  <CountUp target={stat.target} suffix={stat.suffix} inView={inView} />
                </p>
                <p className="mt-1 text-xs font-medium text-text-muted">{stat.label}</p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
