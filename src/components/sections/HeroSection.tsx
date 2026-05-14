import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowDown, Sparkles, GraduationCap, FileText, Download, Building2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import SocialIcon from '../ui/SocialIcon';

const ROLES = ['Software Developer', 'Embedded Engineer', 'PhD Candidate', 'Builder & Researcher'];

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 7) % 97}%`,
  top: `${(i * 53 + 13) % 95}%`,
  size: (i % 3) + 2,
  delay: `${(i * 0.37) % 5}s`,
  dur: `${7 + (i % 5) * 2}s`,
  color: ['#10B981', '#3B82F6', '#8B5CF6', '#F59E0B'][i % 4],
}));

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 18 });

  const { scrollY } = useScroll();
  const sectionParallaxY = useTransform(scrollY, [0, 600], [0, -120]);
  const photoScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const photoY = useTransform(scrollY, [0, 450], [0, 40]);
  const photoRotate = useTransform(scrollY, [0, 380], [0, -5]);

  // Typewriter
  useEffect(() => {
    const current = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed === current) {
      t = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed === '') {
      queueMicrotask(() => {
        setIsDeleting(false);
        setRoleIdx(i => (i + 1) % ROLES.length);
      });
    } else {
      t = setTimeout(() => {
        setDisplayed(p => isDeleting ? p.slice(0, -1) : current.slice(0, p.length + 1));
      }, isDeleting ? 38 : 78);
    }
    return () => clearTimeout(t);
  }, [displayed, isDeleting, roleIdx]);

  // Mouse parallax
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mouseX.set((e.clientX - r.left - r.width / 2) / r.width * 28);
      mouseY.set((e.clientY - r.top - r.height / 2) / r.height * 28);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [mouseX, mouseY]);

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-x-clip overflow-y-visible"
    >
      {/* Parallax glows — mouse + scroll */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: sectionParallaxY }}>
        <motion.div className="absolute inset-0" style={{ x: springX, y: springY }}>
        <div className="glow-backdrop glow-emerald absolute top-[10%] left-[5%] h-80 w-80 sm:h-96 sm:w-96" style={{ animationDelay: '0s' }} />
        <div className="glow-backdrop glow-blue absolute bottom-[15%] right-[5%] h-64 w-64 sm:h-80 sm:w-80" style={{ animationDelay: '1.5s' }} />
        <div className="glow-backdrop glow-violet absolute top-[50%] right-[25%] h-48 w-48" style={{ animationDelay: '2s' }} />
        <div className="glow-backdrop glow-orange absolute bottom-[30%] left-[30%] h-44 w-44" style={{ animationDelay: '3s' }} />
        </motion.div>
      </motion.div>

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'radial-gradient(circle, #1A1D23 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map(p => (
          <div key={p.id} className="absolute rounded-full"
            style={{
              left: p.left, top: p.top,
              width: p.size, height: p.size,
              background: p.color, opacity: 0.32,
              animation: `particle-drift ${p.dur} ease-in-out infinite ${p.delay}`,
            }} />
        ))}
      </div>

      {/* ── Main content: two columns ── */}
      <div className="relative z-10 mx-auto w-full min-w-0 max-w-6xl px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">

          {/* ── Left: Text ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex-1 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={item} className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-emerald/25 bg-accent-emerald/8 px-4 py-1.5 text-sm font-medium text-accent-emerald relative">
              <span className="absolute inset-0 rounded-full border border-accent-emerald/40 animate-ping" style={{ animationDuration: '2.5s' }} />
              <Sparkles size={14} />
              Open to Opportunities
            </motion.div>

            {/* Name */}
            <motion.h1 variants={item} className="mb-4 text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl lg:text-6xl xl:text-7xl">
              Hi, I'm{' '}
              <span className="text-gradient-emerald">{personalInfo.firstName}</span>
              <span className="text-text-muted">.</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div variants={item} className="mb-4 flex min-h-9 items-center justify-center lg:justify-start">
              <p className="max-w-full min-h-[1.75rem] text-center text-lg font-semibold text-text-secondary sm:min-h-0 sm:text-left sm:text-xl">
                <span>{displayed}</span>
                <span className="ml-0.5 inline-block h-5 w-0.5 animate-pulse bg-accent-emerald align-middle" />
              </p>
            </motion.div>

            {/* Bio */}
            <motion.p variants={item} className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base lg:mx-0">
              {personalInfo.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mb-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <a href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-accent-emerald px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] sm:text-base">
                <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-[100%]" />
                View My Work
              </a>
              <a href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-card px-6 py-3 text-sm font-semibold text-text-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent-emerald/30 hover:shadow-md sm:text-base">
                Get in Touch
              </a>
            </motion.div>

            {/* Resume buttons */}
            {personalInfo.resumeUrl && (
              <motion.div variants={item} className="mb-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="hero-resume-view"
                  className="inline-flex items-center gap-2 rounded-lg border border-accent-blue/30 bg-accent-blue/8 px-4 py-2 text-xs font-semibold text-accent-blue transition-all hover:-translate-y-0.5 hover:bg-accent-blue/15"
                >
                  <FileText size={14} />
                  View Resume
                </a>
                <a
                  href={personalInfo.resumeUrl}
                  download="Parth-Patel-Resume.pdf"
                  id="hero-resume-download"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-card px-4 py-2 text-xs font-semibold text-text-secondary transition-all hover:-translate-y-0.5 hover:border-accent-blue/30 hover:text-accent-blue"
                >
                  <Download size={14} />
                  Download PDF
                </a>
              </motion.div>
            )}

            {/* Socials */}
            <motion.div variants={item} className="flex items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map(link => <SocialIcon key={link.platform} link={link} />)}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile Photo + orbit labels ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative mx-auto w-full max-w-[min(100%,20.5rem)] shrink-0 sm:max-w-[22.5rem]"
          >
            <div className="relative mx-auto flex aspect-square w-full max-w-[18.5rem] items-center justify-center sm:max-w-[21rem]">
              <motion.div
                style={{ scale: photoScale, y: photoY, rotate: photoRotate }}
                className="relative z-10 h-52 w-52 shrink-0 sm:h-64 sm:w-64 md:h-72 md:w-72"
              >
                {/* Outermost ambient glow blob */}
                <div
                  className="absolute inset-0 scale-125 rounded-full blur-3xl opacity-20"
                  style={{ background: 'radial-gradient(circle, #10B981 0%, #3B82F6 50%, transparent 70%)' }}
                />

                {/* Slow-spinning dashed ring */}
                <div
                  className="absolute inset-0 scale-110 rounded-full border-2 border-dashed border-accent-emerald/25"
                  style={{ animation: 'spin-slow 18s linear infinite' }}
                />

                {/* Second ring — opposite direction */}
                <div
                  className="absolute inset-0 scale-[1.18] rounded-full border border-accent-blue/20"
                  style={{ animation: 'spin-slow 28s linear infinite reverse' }}
                />

                {/* Solid glowing border */}
                <div
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: 'linear-gradient(135deg, #10B981, #3B82F6, #8B5CF6, #10B981)',
                    backgroundSize: '300% 300%',
                    animation: 'gradient-shift 4s ease infinite',
                    padding: 3,
                    borderRadius: '50%',
                  }}
                >
                  <div className="h-full w-full rounded-full bg-surface" />
                </div>

                {/* Photo container — circular crop */}
                <div className="relative h-full w-full overflow-hidden rounded-full border-[3px] border-white/60 shadow-2xl">
                  <img
                    src="/images/parth.jpg"
                    alt="Parth Patel"
                    style={{
                      position: 'absolute',
                      width: '100%',
                      height: '120%',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      objectFit: 'cover',
                      objectPosition: 'center top',
                    }}
                  />
                </div>

                {/* PhD + school badges (2–3 only) */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-1 -right-1 z-30 flex items-center gap-1 rounded-full border border-border bg-surface-card px-2 py-0.5 text-[9px] font-semibold shadow-lg sm:-top-3 sm:-right-4 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  style={{ color: '#10B981' }}
                >
                  <GraduationCap className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                  PhD Candidate
                </motion.div>

                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  className="absolute -bottom-1 -left-1 z-30 flex max-w-[min(46vw,10rem)] items-center gap-1 rounded-full border border-border bg-surface-card px-2 py-0.5 text-[9px] font-semibold shadow-lg sm:-bottom-2 sm:-left-3 sm:max-w-none sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-px shadow-sm ring-1 ring-black/[0.06] sm:h-9 sm:w-9">
                    <img
                      src="/images/sdsu-logo.png"
                      alt="San Diego State University"
                      className="h-full w-full object-contain object-center"
                    />
                  </span>
                  <span className="min-w-0 truncate leading-tight">
                    <span className="font-bold text-[#B8860B]">SDSU</span>
                    <span className="font-semibold text-[#1E40AF]"> Alumni</span>
                  </span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  className="absolute -bottom-1 -right-1 z-30 flex max-w-[min(46vw,9rem)] items-center gap-1 rounded-full border border-border bg-surface-card px-2 py-0.5 text-[9px] font-semibold shadow-lg sm:-bottom-2 sm:-right-3 sm:max-w-none sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs"
                  style={{ color: '#2563EB' }}
                >
                  <Building2 className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5" />
                  <span className="truncate">UNT</span>
                </motion.div>

                {/*
                  Open to Work badge — uncomment to restore (add Briefcase to lucide import).
                <motion.div ...><Briefcase />Open to Work</motion.div>
                */}

                {/* Small dot accents */}
                <div
                  className="absolute top-4 -left-2 h-3 w-3 rounded-full bg-accent-emerald opacity-70"
                  style={{ animation: 'glow-pulse 2.5s ease-in-out infinite' }}
                />
                <div
                  className="absolute bottom-8 -right-3 h-2 w-2 rounded-full bg-accent-violet opacity-60"
                  style={{ animation: 'glow-pulse 3s ease-in-out infinite 1s' }}
                />
                <div
                  className="absolute -bottom-1 left-8 h-2.5 w-2.5 rounded-full bg-accent-blue opacity-50"
                  style={{ animation: 'glow-pulse 3.5s ease-in-out infinite 0.5s' }}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 pb-[env(safe-area-inset-bottom,0px)] sm:bottom-8 sm:pb-0"
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
