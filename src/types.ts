export interface ProjectItem {
  id: string;
  modNumber: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  fullOverview: string;
  architectureDetails: string[];
  tags: string[];
  imageUrl: string;
  statusVariant: 'clinical' | 'organic' | 'urgent' | 'primary';
  liveDemoUrl?: string;
  githubUrl?: string;
  specs: {
    architecture: string;
    runtime: string;
    status: string;
    security: string;
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
