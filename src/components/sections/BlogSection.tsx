import Section from '../layout/Section';
import { blogPosts } from '../../data/portfolioData';

/**
 * ═══════════════════════════════════════════════════════════════
 *  DYNAMIC CONTENT PLACEHOLDER — Blog/News Feed
 *
 *  AGENT HOOK: To populate this section dynamically:
 *  1. Add entries to the `blogPosts` array in portfolioData.ts
 *  2. Or POST to /api/blog-feed webhook (Cloudflare Worker)
 *  3. Or connect a headless CMS (Sanity/Strapi) via useEffect fetch
 *
 *  Expected payload shape:
 *  { title: string, excerpt: string, date: string, url: string, image?: string }
 *
 *  This section will only render when blogPosts array has entries.
 * ═══════════════════════════════════════════════════════════════
 */

export default function BlogSection() {
  // Only render when there are blog posts to display
  if (blogPosts.length === 0) return null;

  return (
    <Section
      id="blog"
      title="Blog & News"
      subtitle="Latest thoughts, tutorials, and updates."
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <a
            key={post.title}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-border bg-surface-card p-5 shadow-sm transition-all duration-200 hover:border-border-strong hover:shadow-md"
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="mb-4 h-40 w-full rounded-lg object-cover"
              />
            )}
            <h3 className="mb-2 text-lg font-semibold text-text-primary group-hover:text-accent-emerald">
              {post.title}
            </h3>
            <p className="mb-3 text-sm text-text-secondary">{post.excerpt}</p>
            <span className="text-xs text-text-muted">{post.date}</span>
          </a>
        ))}
      </div>
    </Section>
  );
}
