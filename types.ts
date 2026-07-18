
export interface Service {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  icon: string;
  category: 'data-science' | 'web-dev' | 'ai-agents' | 'design' | 'ml' | 'automation' | 'marketing';
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
