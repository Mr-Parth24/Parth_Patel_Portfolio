import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Section from '../layout/Section';
import GlowCard from '../ui/GlowCard';
import { personalInfo, socialLinks } from '../../data/portfolioData';
import SocialIcon from '../ui/SocialIcon';

/**
 * ContactSection — Contact information + email CTA.
 * Features ambient glow, social icons, and direct contact details.
 */

export default function ContactSection() {
  return (
    <Section
      id="contact"
      title="Let's Connect"
      subtitle="Got a project idea, research opportunity, or just want to say hello?"
    >
      <div className="mx-auto max-w-3xl">
        <GlowCard glowColor="emerald" glowPosition="center" className="relative overflow-visible">
          {/* Extra decorative glows */}
          <div className="glow-backdrop glow-blue absolute -top-16 -right-16 h-48 w-48" style={{ animationDelay: '1s' }} />
          <div className="glow-backdrop glow-orange absolute -bottom-16 -left-16 h-40 w-40" style={{ animationDelay: '2.5s' }} />

          <div className="relative z-10 text-center">
            {/* Heading */}
            <h3 className="mb-2 text-2xl font-bold text-text-primary sm:text-3xl">
              Ready to collaborate?
            </h3>
            <p className="mb-8 text-sm text-text-secondary sm:text-base">
              I'm always open to discussing new opportunities, research collaborations, or interesting projects.
            </p>

            {/* Contact Details */}
            <div className="mb-8 flex max-w-full flex-col items-center justify-center gap-4 text-sm text-text-secondary sm:flex-row sm:flex-wrap sm:gap-6">
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex max-w-full items-center gap-2 break-words text-center transition-colors hover:text-accent-emerald"
              >
                <Mail size={16} className="shrink-0" />
                <span className="min-w-0 break-all">{personalInfo.email}</span>
              </a>
              <a
                href={`tel:${personalInfo.phone.replace(/[^\d+]/g, '')}`}
                className="inline-flex max-w-full items-center gap-2 break-words transition-colors hover:text-accent-emerald"
              >
                <Phone size={16} className="shrink-0" />
                {personalInfo.phone}
              </a>
              <span className="inline-flex max-w-full items-center gap-2 text-center">
                <MapPin size={16} className="shrink-0" />
                <span className="min-w-0">{personalInfo.location}</span>
              </span>
            </div>

            {/* CTA Button */}
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mb-8 inline-flex items-center gap-2 rounded-xl bg-accent-emerald px-8 py-3.5 text-base font-semibold text-text-inverse shadow-lg transition-colors hover:bg-accent-emerald-dark"
            >
              <Send size={18} />
              Send Me an Email
            </motion.a>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-3">
              {socialLinks.map((link) => (
                <SocialIcon key={link.platform} link={link} size="sm" />
              ))}
            </div>
          </div>
        </GlowCard>
      </div>
    </Section>
  );
}
