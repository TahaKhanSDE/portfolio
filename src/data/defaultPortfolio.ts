import {
  ProjectItem,
  ExperienceItem,
  TerminalConfig,
  ContactConfig,
} from '@/types';

// ─── Supplemental types not yet in @/types ────────────────────────────────────

export interface AudioConfig {
  trackName: string;
  src: string;
  bpm: number;
}

export interface Endorsement {
  id: string;
  name: string;
  role: string;
  quote: string;
  initials: string;
  avatarBg: string;
}

export interface PortfolioState {
  // Hero identity
  availability: string;
  eyebrow: string;
  headline: string;
  // Terminal widget
  terminal: TerminalConfig;
  // Contact block
  contact: ContactConfig;
  // Collections
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  // Audio player
  audio: AudioConfig;
  // Testimonials
  endorsements: Endorsement[];
}

// ─── Default values ───────────────────────────────────────────────────────────

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'naadan',
    title: 'Naadan',
    subtitle: 'Real-Time Cloud Kitchen & Multi-Screen Order Management KDS',
    category: 'production',
    desc: 'Architected a full production kitchen display system that handles live order injection, kitchen station state routing, and automatic thermal printer queueing with zero dropped tickets during peak rushes.',
    tags: ['Next.js 15', 'Node.js', 'PostgreSQL', 'WebSockets', 'Render Cloud'],
    url: 'https://naadanindia.com',
    spotlight: true,
  },
  {
    id: 'refnet',
    title: 'RefNet',
    subtitle: 'High-Concurrency Distributed Job Referral Network',
    category: 'distributed',
    desc: 'Designed a decentralized matching engine pairing verified employees with job candidates using Redis pub/sub queues and PostgreSQL transaction locks to prevent double-claim collisions.',
    tags: ['Distributed', 'Docker', 'Redis', 'PostgreSQL'],
    url: 'https://job-referral-network-system.vercel.app',
  },
  {
    id: 'pet-health',
    title: 'Pet Healthcare Platform',
    subtitle: 'Veterinary Assistance & Symptom Triaging Engine',
    category: 'production',
    desc: 'Emergency vet locator with symptom analysis, digital health card history, and clinic appointment booking built using Flask and machine learning classification models.',
    tags: ['Python', 'Flask', 'ML Models', 'Overpass API'],
    url: 'https://pet-animalhospitalcare-system.onrender.com',
  },
  {
    id: 'thealgorithms',
    title: 'TheAlgorithms / TypeScript',
    subtitle: 'Async Algorithms Core',
    category: 'oss',
    desc: 'Implemented deterministic semaphore rate limiters, thread-safe queuing constructs, and high-performance caching algorithms for global open-source developers.',
    tags: ['TypeScript', 'Async/Await', 'Concurrency', 'Vitest'],
    url: 'https://github.com/TheAlgorithms/TypeScript',
  },
];

const DEFAULT_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-naadan',
    role: 'Software Engineer',
    company: 'Sharma & Saraf Groups LLP (Naadan)',
    period: '06/2026 – 10/2026',
    location: 'Nagpur / Remote (Full Lifecycle)',
    badgeText: 'PRODUCTION CONTRACT',
    badgeType: 'production',
    summary:
      'Architected and deployed the customer ordering website (naadanindia.com) and the custom multi-screen Kitchen Display System (KDS) from concept to deployment.',
    bullets: [
      'Engineered sub-second bidirectional state synchronization between POS and kitchen monitors via WebSockets.',
      'Designed PostgreSQL schema with row-level transaction locks preventing duplicate order collisions during peak dining rushes.',
      'Configured zero-downtime deployment pipelines across Vercel and Render microservices.',
    ],
    builtProjects: [
      {
        name: 'Naadan Cloud Kitchen KDS',
        description: 'Multi-screen kitchen monitor routing orders in <150ms with zero drops.',
        tech: ['Next.js 15', 'WebSockets', 'PostgreSQL', 'Render'],
        link: 'https://naadanindia.com',
      },
      {
        name: 'Thermal Receipt Queue Dispatcher',
        description: 'Hardware printer worker consuming orders through Redis queues.',
        tech: ['Node.js', 'Redis', 'Raw TCP'],
      },
    ],
    metrics: { latency: '< 150ms', tickets: '0 Dropped' },
  },
  {
    id: 'exp-nass',
    role: 'Web Development Intern',
    company: 'Nass Technologies',
    period: '08/2024 – 10/2024',
    location: 'Nagpur, MH, India',
    badgeText: 'INTERNSHIP',
    badgeType: 'internship',
    summary:
      'Collaborated with senior engineers to build responsive front-end customer portals and administrative dashboards for enterprise clients.',
    bullets: [
      'Converted Figma mockups into accessible React components using Tailwind CSS.',
      'Integrated RESTful endpoints, resulting in a 30% reduction in initial page load overhead.',
    ],
    builtProjects: [
      {
        name: 'Enterprise Client Admin Portal',
        description: 'Responsive modular UI system reducing bundle size by 30%.',
        tech: ['React.js', 'Tailwind CSS', 'REST API'],
      },
    ],
  },
  {
    id: 'exp-thealgorithms',
    role: 'Open Source Contributor',
    company: 'TheAlgorithms / TypeScript',
    period: '05/2026 – Present',
    location: 'Global Repository • Community',
    badgeText: 'OPEN SOURCE',
    badgeType: 'oss',
    summary:
      'Authored and merged core asynchronous synchronization primitives and data structures utilized by developers across the global TypeScript ecosystem.',
    bullets: [
      'Implemented an asynchronous Semaphore concurrency primitive supporting token acquisition and wait queues.',
      'Authored automated test suites with 100% branch coverage utilizing Vitest for deterministic assertions under parallel load.',
    ],
    builtProjects: [
      {
        name: 'Async Semaphore Concurrency Primitive',
        description: 'Thread-safe async token acquire/release locks with zero race conditions.',
        tech: ['TypeScript', 'Concurrency', 'Vitest'],
        link: 'https://github.com/TheAlgorithms/TypeScript',
      },
    ],
  },
];

const DEFAULT_TERMINAL: TerminalConfig = {
  uptime: '99.99%',
  rps: '14.2k',
  latency: '38 ms',
  statusText: 'SYS: NOMINAL',
};

const DEFAULT_CONTACT: ContactConfig = {
  primaryEmail: 'mohd.tahakhan9@gmail.com',
  secondaryEmail: 'thinkercol@gmail.com',
  githubUrl: 'https://github.com/TahaKhanSDE',
  linkedinUrl: 'https://linkedin.com/in/tahakhansde',
  resumeUrl:
    'https://drive.google.com/file/d/15z10NO4YSWoWD5T8eUU3CFAO_GRYwj6C/view?usp=drive_link',
};

const DEFAULT_AUDIO: AudioConfig = {
  trackName: 'my-new-type-of-hero',
  src: '/my-new-type-of-hero.mp3',
  bpm: 128,
};

const DEFAULT_ENDORSEMENTS: Endorsement[] = [
  {
    id: 'default-1',
    name: 'Aditya Sharma',
    role: 'Operations Lead • Sharma & Saraf Groups LLP',
    quote:
      'Taha took our raw cloud kitchen workflows and engineered a rock-solid KDS platform within weeks. His grasp of real-time state synchronization and database indexes saved us from catastrophic peak order dropouts during high-volume dining hours.',
    initials: 'AS',
    avatarBg: '#FFD13B',
  },
  {
    id: 'default-2',
    name: 'Adil Hashmi',
    role: 'Senior Engineering Collaborator',
    quote:
      "Extremely proactive engineer who doesn't wait for specifications to be spoon-fed. His pull requests are clean, well-tested, and he actively mentors other developers in the community with infectious curiosity and speed.",
    initials: 'AH',
    avatarBg: '#F4F5F7',
  },
];

export const DEFAULT_PORTFOLIO_STATE: PortfolioState = {
  availability: 'Available for Hire // SDE-1',
  eyebrow: 'DISTRIBUTED SYSTEMS • REAL-TIME PLATFORMS • ARCHITECTURE',
  headline:
    'Engineering Scalable Web Platforms, Distributed Systems & Community Tech.',
  terminal: DEFAULT_TERMINAL,
  contact: DEFAULT_CONTACT,
  projects: DEFAULT_PROJECTS,
  experiences: DEFAULT_EXPERIENCES,
  audio: DEFAULT_AUDIO,
  endorsements: DEFAULT_ENDORSEMENTS,
};
