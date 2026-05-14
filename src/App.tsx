import { useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import SkillsSection from './components/sections/SkillsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import EducationSection from './components/sections/EducationSection';
import CertificationsSection from './components/sections/CertificationsSection';
import ContactSection from './components/sections/ContactSection';
import BlogSection from './components/sections/BlogSection';
import GallerySection from './components/sections/GallerySection';

/**
 * App — Root layout assembling all portfolio sections.
 *
 * Section order:
 * 1. Hero (full viewport)
 * 2. About (bio + stats)
 * 3. Skills (categorized badges)
 * 4. Experience (interactive timeline)
 * 5. Projects (tilt-card showcase)
 * 6. Education (institution cards)
 * 7. Certifications
 * 8. Blog [DYNAMIC — renders only when data exists]
 * 9. Gallery [DYNAMIC — renders only when data exists]
 * 10. Contact (CTA + details)
 *
 * ═══════════════════════════════════════════════════════════════
 *  AGENT EXTENSIBILITY: New sections can be added by:
 *  1. Creating a new component in src/components/sections/
 *  2. Importing and placing it in the section flow below
 *  3. Adding corresponding data to src/data/portfolioData.ts
 *  4. Dynamic sections (Blog, Gallery) auto-show when populated
 * ═══════════════════════════════════════════════════════════════
 */

function ScrollProgressBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full transition-none"
        style={{
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #10B981, #3B82F6, #8B5CF6)',
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-surface">
      <ScrollProgressBar />
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <CertificationsSection />

        {/* ── Dynamic Content Sections ──
            These sections conditionally render only when their
            data arrays in portfolioData.ts contain entries.
            Populate via CMS, webhook, or CI/CD to activate. */}
        <BlogSection />
        <GallerySection />

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
