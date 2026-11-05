export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'production' | 'distributed' | 'oss';
  desc: string;
  tags: string[];
  url: string;
  spotlight?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  badgeText: string;
  badgeType: 'production' | 'internship' | 'oss';
  summary: string;
  bullets: string[];
  builtProjects: {
    name: string;
    description: string;
    tech: string[];
    link?: string;
  }[];
  metrics?: {
    latency: string;
    tickets: string;
  };
}

export interface TerminalConfig {
  uptime: string;
  rps: string;
  latency: string;
  statusText: string;
}

export interface ContactConfig {
  primaryEmail: string;
  secondaryEmail: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
}