export interface ProjectItem {
  id: string;
  modNumber: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  fullOverview: string;
  architectureDetails: string[];
  metrics: {
    health: string;
    exec: string;
    uptime?: string;
    requestsPerSec?: string;
  };
  tags: string[];
  imageUrl: string;
  statusVariant: 'clinical' | 'organic' | 'urgent' | 'primary';
  liveDemoUrl?: string;
  githubUrl?: string;
  specs: {
    latency: string;
    concurrency: string;
    availability: string;
    encryption: string;
  };
}

export interface CapabilityItem {
  id: string;
  code: string;
  title: string;
  description: string;
  capacity: number;
  icon: string;
  accentColor: string;
  subMetrics: { label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  status: 'ACTIVE' | 'COMPLETED';
  bullets: string[];
  techStack: string[];
  impactScore?: string;
}

export interface TerminalLog {
  id: string;
  sender: 'system' | 'user' | 'error' | 'success';
  text: string;
  timestamp: string;
}
