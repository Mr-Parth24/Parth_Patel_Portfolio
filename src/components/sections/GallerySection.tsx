import Section from '../layout/Section';
import { galleryImages } from '../../data/portfolioData';

/**
 * ═══════════════════════════════════════════════════════════════
 *  DYNAMIC CONTENT PLACEHOLDER — External Image Gallery
 *
 *  AGENT HOOK: To populate this gallery dynamically:
 *  1. Add entries to the `galleryImages` array in portfolioData.ts
 *  2. Or POST to /api/gallery webhook (Cloudflare Worker)
 *  3. Or connect to an external image hosting API (e.g., Cloudinary)
 *
 *  Expected payload shape:
 *  { src: string, alt: string, caption?: string, category?: string }
 *
 *  This section will only render when galleryImages array has entries.
 * ═══════════════════════════════════════════════════════════════
 */

export default function GallerySection() {
  // Only render when there are gallery images to display
  if (galleryImages.length === 0) return null;

  return (
    <Section
      id="gallery"
      title="Gallery"
      subtitle="Visual highlights from projects, events, and research."
    >
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {galleryImages.map((img) => (
          <div
            key={img.src}
            className="mb-4 overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {img.caption && (
              <p className="bg-surface-card px-3 py-2 text-xs text-text-muted">{img.caption}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
