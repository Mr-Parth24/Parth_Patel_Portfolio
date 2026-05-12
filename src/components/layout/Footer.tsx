import { personalInfo, socialLinks } from '../../data/portfolioData';
import SocialIcon from '../ui/SocialIcon';

/**
 * Footer — Centered social icons row with copyright.
 * Features a subtle top gradient border and hover-animated social icons.
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-surface-elevated">
      {/* Gradient top border accent */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-accent-emerald/40 to-transparent" />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <SocialIcon key={link.platform} link={link} />
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-sm text-text-muted">
              © {currentYear} {personalInfo.name}. Built with React & crafted with care.
            </p>
            <p className="mt-1 text-xs text-text-muted/60">
              {personalInfo.email} · {personalInfo.phone}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
