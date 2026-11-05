'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import JourneySection from '@/components/sections/JourneySection';
import CrosswalkDivider from '@/components/sections/CrosswalkDivider';
import VaultSection from '@/components/sections/VaultSection';
import SocialProofSection from '@/components/sections/SocialProofSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';
import StudioModals from '@/components/studio/StudioModals';
import { ProjectItem, ExperienceItem, TerminalConfig, ContactConfig } from '@/types';

const INITIAL_PROJECTS: ProjectItem[] = [
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
    url: 'https://github.com/TahaKhanSDE',
  },
  {
    id: 'pet-health',
    title: 'Pet Healthcare Platform',
    subtitle: 'Veterinary Assistance & Symptom Triaging Engine',
    category: 'production',
    desc: 'Emergency vet locator with symptom analysis, digital health card history, and clinic appointment booking built using Flask and machine learning classification models.',
    tags: ['Python', 'Flask', 'ML Models', 'Overpass API'],
    url: '#contact',
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

const INITIAL_EXPERIENCES: ExperienceItem[] = [
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
    metrics: {
      latency: '< 150ms',
      tickets: '0 Dropped',
    },
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

export default function PortfolioPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inspoOpen, setInspoOpen] = useState(false);
  const [newBuildModalOpen, setNewBuildModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Profile Identity
  const [availability, setAvailability] = useState('Available for Hire // SDE-1');
  const [eyebrow, setEyebrow] = useState('DISTRIBUTED SYSTEMS • REAL-TIME PLATFORMS • ARCHITECTURE');
  const [headline, setHeadline] = useState('Engineering Scalable Web Platforms, Distributed Systems & Community Tech.');

  // Collections
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [experiences, setExperiences] = useState<ExperienceItem[]>(INITIAL_EXPERIENCES);

  // Terminal & Contact Endpoints
  const [terminal, setTerminal] = useState<TerminalConfig>({
    uptime: '99.99%',
    rps: '14.2k',
    latency: '38 ms',
    statusText: 'SYS: NOMINAL',
  });

  const [contact, setContact] = useState<ContactConfig>({
    primaryEmail: 'mohd.tahakhan9@gmail.com',
    secondaryEmail: 'thinkercol@gmail.com',
    githubUrl: 'https://github.com/TahaKhanSDE',
    linkedinUrl: 'https://linkedin.com/in/tahakhansde',
    resumeUrl: 'https://drive.google.com/file/d/your-resume-id/view?usp=sharing',
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [utcTime, setUtcTime] = useState('12:00:00');
  const easterEggCount = useRef(0);
  const easterEggTimer = useRef<NodeJS.Timeout | null>(null);

  const handleEasterEgg = () => {
    easterEggCount.current += 1;
    if (easterEggTimer.current) clearTimeout(easterEggTimer.current);
    easterEggTimer.current = setTimeout(() => {
      easterEggCount.current = 0;
    }, 1500);

    if (easterEggCount.current >= 5) {
      easterEggCount.current = 0;
      setAdminOpen(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        const tag = (e.target as HTMLElement)?.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
          e.preventDefault();
          setAdminOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().split(' ')[4] || '');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddProject = (project: ProjectItem) => {
    setProjects((prev) => [project, ...prev]);
    setToastMessage(`Project "${project.title}" committed to vault!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddExperience = (exp: ExperienceItem) => {
    setExperiences((prev) => [exp, ...prev]);
    setToastMessage(`Milestone "${exp.role}" added to timeline!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#F4F5F7] font-sans antialiased bg-grid-pattern selection:bg-[#FFD13B] selection:text-[#121316]">
      <Navbar
        onOpenInspo={() => setInspoOpen(true)}
        availability={availability}
        resumeUrl={contact.resumeUrl}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 md:py-16 space-y-24">
        <HeroSection
          eyebrow={eyebrow}
          headline={headline}
          terminal={terminal}
          onEasterEggClick={handleEasterEgg}
          primaryEmail={contact.primaryEmail}
        />
        <AboutSection />
        <ExperienceSection experiences={experiences} />
        <JourneySection />
        <CrosswalkDivider />
        <VaultSection
          projects={projects}
          onOpenNewBuildModal={() => setNewBuildModalOpen(true)}
        />
        <SocialProofSection />
        <ContactSection contact={contact} />
      </main>

      <Footer utcTime={utcTime} onEasterEggClick={handleEasterEgg} />

      <StudioModals
        inspoOpen={inspoOpen}
        onCloseInspo={() => setInspoOpen(false)}
        newBuildModalOpen={newBuildModalOpen}
        onCloseNewBuildModal={() => setNewBuildModalOpen(false)}
        adminOpen={adminOpen}
        onCloseAdmin={() => setAdminOpen(false)}
        availability={availability}
        onChangeAvailability={setAvailability}
        eyebrow={eyebrow}
        onChangeEyebrow={setEyebrow}
        headline={headline}
        onChangeHeadline={setHeadline}
        terminal={terminal}
        onChangeTerminal={setTerminal}
        contact={contact}
        onChangeContact={setContact}
        onAddProject={handleAddProject}
        onAddExperience={handleAddExperience}
      />

      {toastMessage && (
        <div className="fixed bottom-5 right-5 bg-[#FFD13B] text-[#121316] font-mono font-bold text-xs p-3 rounded border-2 border-[#121316] shadow-[4px_4px_0px_0px_#121316] z-50 animate-bounce">
          {toastMessage}
        </div>
      )}
    </div>
  );
}