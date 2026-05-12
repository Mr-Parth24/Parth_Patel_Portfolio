import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import SocialIcon from '../ui/SocialIcon';

/**
 * HeroSection — Full-viewport hero with animated intro.
 * Features:
 * - Staggered text reveal animations
 * - Floating decorative glow orbs in the background
 * - Social icons row
 * - Scroll-down indicator
 * - Responsive from mobile to ultrawide
 */

export default function HeroSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ── Decorative Background Glows ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="glow-backdrop glow-emerald absolute top-[15%] left-[10%] h-72 w-72 sm:h-96 sm:w-96" style={{ animationDelay: '0s' }} />
        <div className="glow-backdrop glow-blue absolute top-[60%] right-[10%] h-64 w-64 sm:h-80 sm:w-80" style={{ animationDelay: '1.5s' }} />
        <div className="glow-backdrop glow-orange absolute bottom-[20%] left-[40%] h-48 w-48 sm:h-64 sm:w-64" style={{ animationDelay: '3s' }} />
        <div className="glow-backdrop glow-violet absolute top-[30%] right-[30%] h-40 w-40 sm:h-56 sm:w-56" style={{ animationDelay: '2s' }} />
      </div>

      {/* ── Subtle Grid Pattern ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #1A1D23 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent-emerald/20 bg-accent-emerald/5 px-4 py-1.5 text-sm font-medium text-accent-emerald">
          <Sparkles size={14} />
          Open to Opportunities
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="mb-4 text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Hi, I'm{' '}
          <span className="text-gradient-emerald">{personalInfo.firstName}</span>
          <span className="text-text-muted">.</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="mb-3 text-lg font-medium text-text-secondary sm:text-xl md:text-2xl"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="mx-auto mb-8 max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-6 py-3 text-sm font-semibold text-text-inverse shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-accent-emerald-dark hover:shadow-lg sm:text-base"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-card px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-md sm:text-base"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <SocialIcon key={link.platform} link={link} />
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex flex-col items-center gap-1.5 text-text-muted transition-colors hover:text-accent-emerald"
          aria-label="Scroll down"
        >
          <span className="text-xs font-medium">Scroll</span>
          <ArrowDown size={16} />
        </motion.button>
      </motion.div>
    </section>
  );
}
