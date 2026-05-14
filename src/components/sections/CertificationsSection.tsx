import { motion } from 'framer-motion';
import { ShieldCheck, Eye } from 'lucide-react';
import Section from '../layout/Section';
import GlowCard from '../ui/GlowCard';
import { certifications } from '../../data/portfolioData';
import { staggerContainerVariants, fadeUpVariants } from '../../hooks/useScrollReveal';

/**
 * CertificationsSection — Certification cards with in-browser PDF viewer.
 * Certificates open in a new tab (no download prompt).
 */

export default function CertificationsSection() {
  if (certifications.length === 0) return null;

  return (
    <Section
      id="certifications"
      title="Certifications"
      subtitle="Industry-recognized credentials and completed simulations."
    >
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="mx-auto grid max-w-2xl gap-6"
      >
        {certifications.map((cert) => (
          <motion.div key={cert.name} variants={fadeUpVariants}>
            <GlowCard glowColor="emerald">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-emerald/10">
                  <ShieldCheck size={24} className="text-accent-emerald" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-text-primary">{cert.name}</h3>
                  <p className="text-sm text-text-secondary">{cert.issuer} · {cert.date}</p>

                  {cert.credentialUrl && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {/* View in browser — NO download */}
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        id={`cert-view-${cert.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-accent-emerald/30 bg-accent-emerald/8 px-3 py-1.5 text-xs font-semibold text-accent-emerald transition-all hover:-translate-y-0.5 hover:bg-accent-emerald/15 hover:shadow-sm"
                      >
                        <Eye size={13} />
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
