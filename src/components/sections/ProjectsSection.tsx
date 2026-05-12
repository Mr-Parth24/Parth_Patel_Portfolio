import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Layers } from 'lucide-react';
import Section from '../layout/Section';
import TiltCard from '../ui/TiltCard';
import { projects } from '../../data/portfolioData';
import { staggerContainerVariants, fadeUpVariants } from '../../hooks/useScrollReveal';

/**
 * ProjectsSection — Tilt-card project showcase grid.
 * Uses pseudo-3D TiltCard for desktop hover interaction.
 *
 * ═══════════════════════════════════════════════════════════════
 *  AGENT EXTENSIBILITY: Dynamically Injected Project Sub-Routes
 *
 *  To add projects at runtime:
 *  1. POST new project JSON to /api/projects webhook
 *  2. Each project with a `slug` field will auto-generate a
 *     /projects/:slug sub-route (when React Router is added)
 *  3. Or append entries to the `projects` array in portfolioData.ts
 *     via CI/CD automation
 *
 *  Expected payload:
 *  { name, description, techStack: string[], slug?, liveUrl?, repoUrl?, image? }
 * ═══════════════════════════════════════════════════════════════
 */

export default function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Projects"
      subtitle="Highlighted builds showcasing my engineering approach."
    >
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((project) => (
          <motion.div key={project.name} variants={fadeUpVariants}>
            <TiltCard glowColor={project.accentColor || 'emerald'} className="h-full">
              {/* Icon Header */}
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent-${project.accentColor || 'emerald'}/10`}>
                <Layers size={24} className={`text-accent-${project.accentColor || 'emerald'}`} />
              </div>

              {/* Title & Description */}
              <h3 className="mb-2 text-xl font-semibold text-text-primary">{project.name}</h3>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">{project.description}</p>

              {/* Tech Stack */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md bg-surface-hover px-2.5 py-1 text-xs font-medium text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Links */}
              <div className="flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-emerald transition-colors hover:text-accent-emerald-dark"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
                  >
                    <GitFork size={14} />
                    Source
                  </a>
                )}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* ═══════════════════════════════════════════════════════════
          PLACEHOLDER: Dynamically injected project sub-routes

          When React Router is added, projects with `slug` fields
          will auto-generate /projects/:slug detail pages.
          For now, cards link externally via liveUrl/repoUrl.
          ═══════════════════════════════════════════════════════════ */}
    </Section>
  );
}
