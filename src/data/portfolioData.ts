/**
 * ╔══════════════════════════════════════════════════════════════════════════╗
 * ║  PORTFOLIO DATA — SINGLE SOURCE OF TRUTH                               ║
 * ║                                                                        ║
 * ║  AGENT EXTENSIBILITY PROTOCOL:                                         ║
 * ║  Each exported array/object can be programmatically extended by:       ║
 * ║  1. A headless CMS webhook (e.g., Sanity, Strapi) pushing to a        ║
 * ║     Cloudflare Worker /api/inject endpoint                             ║
 * ║  2. An AI agent (e.g., GPT, Claude) posting JSON via REST/WebSocket   ║
 * ║  3. A WhatsApp → Zapier → GitHub Action CI/CD pipeline that commits   ║
 * ║     new entries directly to this file                                  ║
 * ║  4. A GitHub webhook triggering Cloudflare Pages rebuild               ║
 * ║                                                                        ║
 * ║  PAYLOAD FORMAT: Each section documents its expected JSON shape.       ║
 * ║  To inject at build time: append to the arrays below via script.      ║
 * ║  To inject at runtime: fetch from /api/* and merge into React state.  ║
 * ╚══════════════════════════════════════════════════════════════════════════╝
 */

// ─── Type Definitions ────────────────────────────────────────────────────────

export interface IPersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tagline: string;
  bio: string;
  location: string;
}

/**
 * AGENT HOOK: To add new social links dynamically, POST:
 * { platform: string, url: string, iconName: string }
 * to /api/social-links or append to this array via CI/CD.
 */
export interface ISocialLink {
  platform: string;
  url: string;
  iconName: string; // Lucide icon name
}

/**
 * AGENT HOOK: To add education entries, POST:
 * { institution, degree, field, startDate, endDate, gpa?, description? }
 */
export interface IEducation {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description?: string;
}

/**
 * AGENT HOOK: To add skill categories, POST:
 * { category: string, skills: string[], accentColor: string }
 */
export interface ISkillCategory {
  category: string;
  skills: string[];
  accentColor: 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';
}

/**
 * AGENT HOOK: To add experience entries, POST:
 * { title, organization, department?, startDate, endDate, bullets: string[], tags?: string[] }
 */
export interface IExperience {
  title: string;
  organization: string;
  department?: string;
  startDate: string;
  endDate: string;
  bullets: string[];
  tags?: string[];
  accentColor?: 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';
}

/**
 * AGENT HOOK: To add projects dynamically, POST:
 * { name, description, techStack: string[], liveUrl?, repoUrl?, image? }
 * For dynamic sub-routes, include { slug: string } and the UI will generate
 * /projects/:slug routes automatically.
 */
export interface IProject {
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
  image?: string;
  slug?: string;
  accentColor?: 'emerald' | 'blue' | 'orange' | 'violet' | 'rose';
}

/**
 * AGENT HOOK: To add certifications, POST:
 * { name, issuer, date, credentialUrl? }
 */
export interface ICertification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
}

/**
 * AGENT HOOK: For dynamic blog/news feeds. POST:
 * { title, excerpt, date, url, image?, tags?: string[] }
 * Or connect via RSS feed URL in the BlogSection component.
 */
export interface IBlogPost {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  image?: string;
  tags?: string[];
}

/**
 * AGENT HOOK: For external gallery images. POST:
 * { src, alt, caption?, category? }
 */
export interface IGalleryImage {
  src: string;
  alt: string;
  caption?: string;
  category?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const personalInfo: IPersonalInfo = {
  name: 'Parth Patel',
  firstName: 'Parth',
  lastName: 'Patel',
  email: 'mr.parth24@gmail.com',
  phone: '(605) 592-8322',
  tagline: 'Software Developer · Researcher · Builder',
  bio: 'Computer Science graduate passionate about building cross-platform systems, embedded firmware, and intelligent applications. Experienced in research-driven engineering across computer vision, IoT, and full-stack development.',
  location: 'South Dakota, USA',
};

export const socialLinks: ISocialLink[] = [
  /**
   * AGENT EXTENSIBILITY: Append new entries here or POST to /api/social-links.
   * The UI will auto-render new icons in the footer and hero section.
   */
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/mr-parth24', iconName: 'Linkedin' },
  { platform: 'GitHub', url: 'https://github.com/Mr-Parth24', iconName: 'Github' },
  { platform: 'Instagram', url: 'https://instagram.com/', iconName: 'Instagram' },
  { platform: 'Email', url: 'mailto:mr.parth24@gmail.com', iconName: 'Mail' },
];

export const education: IEducation[] = [
  {
    institution: 'South Dakota State University',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: 'Jan 2023',
    endDate: 'Dec 2025',
    gpa: '3.5',
    description: 'Graduated December 2025. Focus areas include embedded systems, computer vision, and software engineering.',
  },
  {
    institution: 'Chandigarh University',
    degree: 'Bachelor of Computer Applications',
    field: 'Computer Applications',
    startDate: 'Jan 2021',
    endDate: 'Aug 2023',
  },
];

export const skillCategories: ISkillCategory[] = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'C/C++', 'JavaScript', 'Java', 'SQL'],
    accentColor: 'emerald',
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['Flutter', 'React', 'Node.js', 'OpenCV', 'Arduino IDE'],
    accentColor: 'blue',
  },
  {
    category: 'Tools & Technologies',
    skills: [
      'Git', 'Docker', 'VS Code', 'Figma', 'Linux',
      'REST API', 'IoT/Embedded Systems', 'Computer Vision',
      'Machine Learning', 'BLE/USB Protocols', 'AWS', 'HPC', 'Agile/Scrum',
    ],
    accentColor: 'violet',
  },
];

export const experience: IExperience[] = [
  {
    title: 'Undergraduate Research Assistant',
    organization: 'South Dakota State University',
    department: 'Integrated Sensing Circuits and Systems Laboratory',
    startDate: 'Aug 2025',
    endDate: 'Dec 2025',
    bullets: [
      'Developed end-to-end data ecosystems for custom lab medical devices using embedded firmware, Java-based Android apps, and Python PC GUIs for real-time visualization.',
      'Managed hardware assembly, hand-soldering, and engineered cross-platform interfaces for electrochemical data capture (Potentiometry, Impedance).',
      'Programmed STM32 and Arduino microcontrollers; integrated Nordic BLE and UART multi-protocol data transmissions.',
    ],
    tags: ['Embedded', 'Android', 'Python', 'BLE', 'STM32'],
    accentColor: 'emerald',
  },
  {
    title: 'Undergraduate Research Assistant',
    organization: 'South Dakota State University',
    department: 'Intelligent Vision Systems Laboratory',
    startDate: 'May 2025',
    endDate: 'Aug 2025',
    bullets: [
      'Developed GPS-independent navigation systems using Intel RealSense depth sensors, ArUco markers, and SLAM algorithms.',
      'Automated document AI pipelines to parse research tables into structured text and optimized image-to-text workflows.',
    ],
    tags: ['Computer Vision', 'SLAM', 'RealSense', 'Document AI'],
    accentColor: 'blue',
  },
  {
    title: 'Undergraduate Research Assistant',
    organization: 'South Dakota State University',
    department: 'Plant Pathology Department',
    startDate: 'May 2024',
    endDate: 'Aug 2024',
    bullets: [
      'Built a custom Flutter mobile application to automate field data collection and leaf rust analysis.',
      'Designed, developed, and launched the laboratory\'s public web presence to showcase research milestones.',
    ],
    tags: ['Flutter', 'Mobile Dev', 'Web Design'],
    accentColor: 'orange',
  },
  {
    title: 'Webmaster',
    organization: 'South Dakota State University',
    department: 'EECS Department',
    startDate: 'Oct 2024',
    endDate: 'Dec 2025',
    bullets: [
      'Managed departmental websites, designed promotional pages for academic programs, and optimized UI for web accessibility.',
    ],
    tags: ['Web Dev', 'UI/UX', 'Accessibility'],
    accentColor: 'violet',
  },
  {
    title: 'Social Media Manager',
    organization: 'South Dakota State University',
    department: 'EECS Department',
    startDate: 'Oct 2024',
    endDate: 'Dec 2025',
    bullets: [
      'Curated visual content strategies across LinkedIn, Instagram, X, and Facebook, monitoring performance analytics.',
    ],
    tags: ['Social Media', 'Content Strategy', 'Analytics'],
    accentColor: 'rose',
  },
  {
    title: 'Treasurer',
    organization: 'Indian Students\' Association, SDSU',
    department: 'Leadership',
    startDate: 'Oct 2023',
    endDate: 'Dec 2025',
    bullets: [
      'Managed financial budgets for a 200+ member organization and coordinated major cultural productions (300+ attendees).',
    ],
    tags: ['Leadership', 'Finance', 'Event Management'],
    accentColor: 'emerald',
  },
  {
    title: 'Additional Roles',
    organization: 'Various',
    startDate: '',
    endDate: '',
    bullets: [
      'eSport Desk Attendant — South Dakota State University',
      'Student Worker — Larson Manufacturing',
      'Social Media Manager & Content Creator — V Fitness',
    ],
    tags: ['Customer Service', 'Content Creation'],
    accentColor: 'blue',
  },
];

export const projects: IProject[] = [
  /**
   * AGENT EXTENSIBILITY: To dynamically inject project sub-routes:
   * 1. Add a `slug` field to each project for /projects/:slug routing
   * 2. POST new project JSON to /api/projects webhook
   * 3. The ProjectsSection component will auto-generate cards
   */
  {
    name: 'No-Code REST API Builder',
    description: 'Senior Design Project — A drag-and-drop workflow engine allowing non-technical users to design, test, and deploy functional REST APIs without writing code.',
    techStack: ['React', 'Node.js', 'REST API', 'Drag & Drop'],
    slug: 'no-code-api-builder',
    accentColor: 'emerald',
  },
  {
    name: 'Mobile Work & Earnings Tracker',
    description: 'Utility app built to monitor hours worked and aggregate real-time pay tracking across multiple parallel gigs.',
    techStack: ['Flutter', 'Dart', 'SQLite', 'Real-time Data'],
    slug: 'work-earnings-tracker',
    accentColor: 'blue',
  },
];

export const certifications: ICertification[] = [
  {
    name: 'Mastercard Cybersecurity Job Simulation',
    issuer: 'Forage',
    date: '2024',
  },
];

/**
 * ═══════════════════════════════════════════════════════════════
 *  DYNAMIC CONTENT STUBS — Reserved for Agent / CMS Integration
 * ═══════════════════════════════════════════════════════════════
 *
 *  These empty arrays are ready to receive runtime data.
 *  Components will conditionally render sections only when
 *  these arrays contain entries.
 *
 *  INJECTION METHODS:
 *  - Build-time: CI/CD script appends JSON entries before build
 *  - Runtime: useEffect fetch from /api/* Cloudflare Workers
 *  - CMS: Sanity/Strapi webhook triggers rebuild with new data
 *  - Agent: AI posts structured JSON via authenticated endpoint
 */

export const blogPosts: IBlogPost[] = [
  // POST to /api/blog-feed or append here via CI/CD
];

export const galleryImages: IGalleryImage[] = [
  // POST to /api/gallery or append here via CI/CD
];

// ─── Navigation Items ────────────────────────────────────────────────────────

export const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const;
