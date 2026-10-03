
export interface Service {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  icon: string;
  category: 'data-science' | 'web-dev' | 'ai-agents' | 'design' | 'ml' | 'automation' | 'marketing' | 'saas';
  features: { icon: string; label: string }[];
  techStack: string[];
  problem?: string;
  solution?: string;
  process?: string[];
  expectedResults?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  galleryUrls?: string[];
  category: string;
  tags: string[];
  isFeatured?: boolean;
  date?: string;
  clientBackground?: string;
  problemStatement?: string;
  strategy?: string;
  results?: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
  liveDemoUrl?: string;
  saasPageUrl?: string;
  githubUrl?: string;
  clientLocation?: string;
  videoUrl?: string;
  isPinned?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientRole: string;
  company?: string;
  content: string;
  rating: number;
  avatarUrl?: string;
  snippetUrl?: string; // For chat screenshots/proof snippets
  category: 'Automation' | 'Web Dev' | 'Data Science';
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceInterested: string;
  budgetRange: string;
  timeline: string;
  priority: 'low' | 'medium' | 'high';
  message: string;
}

export interface SaasProduct {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  status: 'live' | 'beta' | 'in-development';
  statusLabel: string;
  version: string;
  bannerImage: string;
  bannerImageDark?: string;
  logoImage?: string;
  logoImageDark?: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  techStack: string[];
  demoUrl?: string; // Live application URL (e.g. Render / Vercel link)
  pageUrl: string; // Dedicated product landing page (e.g. /saas/tasq-one)
  dockerSnippet?: string;
  isFlagship?: boolean;
}
