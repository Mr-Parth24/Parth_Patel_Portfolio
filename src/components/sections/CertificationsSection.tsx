import { motion } from 'framer-motion';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import Section from '../layout/Section';
import GlowCard from '../ui/GlowCard';
import { certifications } from '../../data/portfolioData';
import { staggerContainerVariants, fadeUpVariants } from '../../hooks/useScrollReveal';

/**
 * CertificationsSection — Certification cards with issuer and credential links.
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
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-emerald/10">
                  <ShieldCheck size={24} className="text-accent-emerald" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{cert.name}</h3>
                  <p className="text-sm text-text-secondary">{cert.issuer} · {cert.date}</p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-accent-emerald hover:text-accent-emerald-dark"
                    >
                      <ExternalLink size={14} />
                      View Credential
                    </a>
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
