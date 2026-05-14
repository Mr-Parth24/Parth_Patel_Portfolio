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
  resumeUrl?: string;
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
  diplomaUrl?: string;
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
  location: 'Denton, TX',
  resumeUrl: '/documents/resume/parth-patel-resume.pdf',
};

export const socialLinks: ISocialLink[] = [
  /**
   * AGENT EXTENSIBILITY: Append new entries here or POST to /api/social-links.
   * The UI will auto-render new icons in the footer and hero section.
   */
  { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/mr-parth24', iconName: 'Linkedin' },
  { platform: 'GitHub', url: 'https://github.com/Mr-Parth24', iconName: 'Github' },
  { platform: 'Instagram', url: 'https://www.instagram.com/parth__787898/', iconName: 'Instagram' },
  { platform: 'Email', url: 'mailto:mr.parth24@gmail.com', iconName: 'Mail' },
];

export const education: IEducation[] = [
  {
    institution: 'University of North Texas',
    degree: 'Doctor of Philosophy',
    field: 'Electrical Engineering',
    startDate: 'Jan 2026',
    endDate: 'Present',
    description: 'PhD Candidate focusing on advanced research in electrical engineering, embedded systems, and intelligent device design.',
  },
  {
    institution: 'South Dakota State University',
    degree: 'Bachelor of Science',
    field: 'Computer Science',
    startDate: 'Aug 2023',
    endDate: 'Dec 2025',
    gpa: '3.5',
    description: 'Graduated December 2025. Focus areas include embedded systems, computer vision, and software engineering.',
    diplomaUrl: '/documents/diploma/sdsu-diploma.pdf',
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
    title: 'Graduate Research Assistant',
    organization: 'University of North Texas',
    department: 'Department of Electrical Engineering',
    startDate: 'Jan 2026',
    endDate: '',
    bullets: [
      'Conducting advanced research in electrical engineering as part of a PhD program, applying cross-disciplinary expertise in embedded systems, signal processing, and intelligent device design.',
      'Collaborating with faculty and research teams to develop novel solutions bridging hardware and software in applied engineering contexts.',
      'Leveraging prior experience in firmware engineering, IoT systems, and cross-platform application development to accelerate research outcomes.',
    ],
    tags: ['PhD Research', 'Electrical Engineering', 'Embedded Systems', 'IoT'],
    accentColor: 'emerald',
  },
  {
    title: 'Undergraduate Research Assistant',
    organization: 'South Dakota State University',
    department: 'Integrated Sensing Circuits & Systems Laboratory',
    startDate: 'Aug 2025',
    endDate: 'Dec 2025',
    bullets: [
      'Built an end-to-end data ecosystem for a custom lab-developed medical Edema Monitoring device — spanning embedded firmware, a Java Android app, and a Python PC GUI for real-time patient data visualization.',
      'Managed hardware-level assembly and hand-soldering of AED units; engineered cross-platform interfaces to capture and graph complex electrochemical data including Potentiometry and Impedance.',
      'Programmed STM32 and Arduino microcontrollers for on-device calculations; integrated Nordic BLE for mobile sync and UART for PC-based graphical interfaces.',
    ],
    tags: ['STM32', 'Arduino', 'Android', 'Python', 'BLE', 'UART', 'Embedded'],
    accentColor: 'blue',
  },
  {
    title: 'Undergraduate Research Assistant',
    organization: 'South Dakota State University',
    department: 'Intelligent Vision Systems Laboratory',
    startDate: 'May 2025',
    endDate: 'Aug 2025',
    bullets: [
      'Developed a GPS-independent autonomous navigation system using Intel RealSense depth sensors and ArUco markers; implemented SLAM algorithms to calculate field boundaries for automated equipment.',
      'Automated research paper table extraction into structured text using trained Document AI models, significantly reducing manual data entry time for the lab.',
      'Streamlined image-to-text pipelines to improve tabular data recognition accuracy, facilitating faster research synthesis across the team.',
    ],
    tags: ['Computer Vision', 'SLAM', 'Intel RealSense', 'Document AI', 'Python'],
    accentColor: 'violet',
  },
  {
    title: 'Webmaster',
    organization: 'South Dakota State University',
    department: 'Electrical Engineering & Computer Science Department',
    startDate: 'Oct 2024',
    endDate: 'Dec 2025',
    bullets: [
      'Managed the EECS department website, ensuring all content was accurate, up-to-date, and visually engaging for prospective students and faculty.',
      'Developed and maintained new web pages to promote academic programs, research highlights, and department news.',
      'Enhanced the user experience through ongoing accessibility improvements, optimizing for readability and navigation across devices.',
    ],
    tags: ['Web Development', 'UI/UX', 'Accessibility', 'Content Management'],
    accentColor: 'orange',
  },
  {
    title: 'Social Media Manager',
    organization: 'South Dakota State University',
    department: 'Electrical Engineering & Computer Science Department',
    startDate: 'Oct 2024',
    endDate: 'Dec 2025',
    bullets: [
      'Spearheaded social media strategies across LinkedIn, Instagram, X, and Facebook — driving engagement and raising the department\'s digital visibility.',
      'Curated and created content spotlighting faculty research, student achievements, and department milestones aligned with institutional branding.',
      'Tracked social media metrics and engagement data, adjusting strategies to optimize reach and impact across all platforms.',
    ],
    tags: ['Social Media', 'Content Strategy', 'Analytics', 'Brand Management'],
    accentColor: 'rose',
  },
  {
    title: 'Undergraduate Research Assistant',
    organization: 'South Dakota State University',
    department: 'Plant Pathology Department',
    startDate: 'May 2024',
    endDate: 'Aug 2024',
    bullets: [
      'Developed a custom Flutter mobile application to replace a time-intensive manual field entry process — featuring high-resolution image uploads and automated CSV generation for leaf rust analysis.',
      'Collaborated on barley leaf rust resistance studies; managed bacterial culture cultivation and performed controlled inoculations to observe and record infection levels.',
      'Designed and launched the laboratory\'s website to showcase research findings, faculty profiles, and project milestones, greatly improving the lab\'s professional presence.',
    ],
    tags: ['Flutter', 'Mobile Dev', 'Web Design', 'Research', 'Data Collection'],
    accentColor: 'blue',
  },
  {
    title: 'eSport Desk Attendant',
    organization: 'South Dakota State University',
    startDate: 'Mar 2024',
    endDate: 'Oct 2024',
    bullets: [
      'Managed front desk operations by checking in students, verifying IDs, and assigning gaming stations based on individual preferences and availability.',
      'Provided technical support by troubleshooting gaming consoles and equipment, ensuring minimal downtime and a smooth experience for all users.',
      'Promoted an inclusive, welcoming gaming community — assisting students with eSports events, tournaments, equipment setup, and game mechanics.',
    ],
    tags: ['Operations', 'Technical Support', 'Customer Service', 'Community'],
    accentColor: 'emerald',
  },
  {
    title: 'Student Worker',
    organization: 'Larson Manufacturing',
    startDate: 'Sep 2023',
    endDate: 'May 2024',
    bullets: [
      'Assisted with store management and customer support, ensuring a seamless and positive shopping experience for customers.',
      'Contributed to sales operations, stock management, and inventory control to maintain efficient and organized store workflows.',
    ],
    tags: ['Operations', 'Customer Service', 'Inventory Management'],
    accentColor: 'orange',
  },
  {
    title: 'Treasurer',
    organization: "Indian Students' Association, SDSU",
    department: 'Student Leadership',
    startDate: 'Oct 2023',
    endDate: 'Dec 2025',
    bullets: [
      'Managed organizational budget and all financial operations for a 200+ member student association over two years.',
      'Led fundraising initiatives and coordinated India Night — a major cultural event with 300+ attendees — handling sponsorships, ticket sales, performances, and catering logistics.',
    ],
    tags: ['Leadership', 'Finance', 'Event Management', 'Fundraising'],
    accentColor: 'violet',
  },
  {
    title: 'Social Media Manager & Content Creator',
    organization: 'V Fitness',
    startDate: 'Jun 2022',
    endDate: 'Jul 2023',
    bullets: [
      'Increased online engagement and brand presence through strategic content creation and targeted digital marketing campaigns across multiple platforms.',
      'Led digital campaigns to raise brand awareness, attract new clients, and align content with the gym\'s broader marketing strategy.',
      'Developed security protocols for social media accounts to safeguard sensitive client and business information.',
    ],
    tags: ['Content Creation', 'Digital Marketing', 'Brand Strategy', 'Social Media'],
    accentColor: 'rose',
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
    credentialUrl: '/documents/certificates/cybersecurity-job-simulation.pdf',
  },
  {
    name: 'AI Horizon 2026 — Volunteer',
    issuer: 'Society for Student AI Innovation (SSAI)',
    date: '2025',
    credentialUrl: '/documents/certificates/ssai-volunteer-certificate.pdf',
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
