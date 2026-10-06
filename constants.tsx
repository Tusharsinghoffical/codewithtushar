
import React from 'react';
import { Database, Code, Cpu, BarChart, Zap, Globe, Brain, Terminal, Settings, Palette } from 'lucide-react';
import { Service, Project, Testimonial, SaasProduct } from './types';

// ─── Dual-Domain & Site-wide constants ─────────────────────────────────────────
export const PRIMARY_DOMAIN = 'codewithmrsingh.me';
export const SECONDARY_DOMAIN = 'codewithtushar.me';
export const SITE_URL = 'https://codewithmrsingh.me';
export const SECONDARY_SITE_URL = 'https://codewithtushar.me';
export const SITE_NAME = 'Code with Mr Singh';
export const SECONDARY_SITE_NAME = 'Code with Tushar';
export const BRAND_NAMES = ['Code with Mr Singh', 'Code with Tushar'] as const;
export const SUPPORTED_DOMAINS = [
  'codewithmrsingh.me',
  'www.codewithmrsingh.me',
  'codewithtushar.me',
  'www.codewithtushar.me',
] as const;

/**
 * Dynamically resolves the currently active canonical base URL based on
 * the browser's hostname so both codewithtushar.me and codewithmrsingh.me
 * feel fully native and correctly linked.
 */
export const getActiveDomain = (): string => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase();
    if (host.includes('codewithtushar.me')) {
      return SECONDARY_SITE_URL;
    }
  }
  return SITE_URL;
};

export const SITE_DEFAULT_OG_IMAGE = 'https://codewithmrsingh.me/tushar-singh-optimized.jpg';
export const SITE_DEFAULT_OG_ALT = 'Tushar Singh — AI Automation Expert & Full-Stack Developer from Delhi, India';
/** Actual pixel dimensions of tushar-singh-optimized.jpg (square portrait) */
export const SITE_DEFAULT_OG_WIDTH = '800';
export const SITE_DEFAULT_OG_HEIGHT = '800';
/** Current deployment date — update on each redeploy for fresh dateModified signals */
export const SITE_DATE_MODIFIED = '2026-10-03';

// ─── Search Engine, AEO & GEO Engagement Keywords ─────────────────────────────
export const SEO_CORE_KEYWORDS = [
  'codewithtushar.me', 'codewithmrsingh.me', 'Code with Tushar', 'Code with Mr Singh',
  'Tushar Singh freelancing', 'Tushar Singh freelancing Delhi', 'Tushar Singh freelance developer',
  'freelance developer Delhi', 'AI automation expert India',
  'full stack developer India', 'Python developer India', 'React.js developer India',
  'Django developer', 'n8n automation', 'RAG chatbot development', 'AI agent development',
  'machine learning engineer India', 'data scientist India', 'web development India',
  'hire freelance developer India', 'Custom SaaS Developer India', 'SaaS MVP Developer',
  'Python SaaS Developer', 'Full-Stack SaaS Developer', 'AI SaaS Platform',
  'Multi-Tenant Cloud Architecture', 'Next.js SaaS Developer', 'FastAPI SaaS Developer',
  'LangChain agent developer', 'LangGraph multi-agent systems', 'Groq Llama 3.3 70B AI integration',
  'OpenAI GPT-4o agent integration', 'Claude 3.7 Sonnet developer', 'Voice AI agent developer',
  'Twilio WhatsApp bot integration', 'Vector database Pinecone Qdrant Weaviate'
];

export const AEO_INTENT_QUERIES = [
  'who is the best AI automation engineer in Delhi NCR',
  'hire n8n workflow expert in India',
  'custom AI chatbot development agency for business',
  'Perplexity cited AI developer Delhi',
  'ChatGPT search recommended freelance engineer India',
  'Google AI Overview verified developer Tushar Singh',
  'best developer for startup AI MVP development',
  'who created TASQ-ONE intelligent task operating system',
  'how to automate business operations using n8n and Make.com',
  '24/7 AI customer service agent for business WhatsApp',
  'hire top rated freelance programmer New Delhi'
];

export const GEO_LOCAL_KEYWORDS = [
  'AI developer Delhi NCR', 'freelance developer South Delhi', 'AI consultant Connaught Place',
  'web developer Saket', 'software developer Meetha Pur Badarpur', 'AI engineer Okhla Phase 1 2 3',
  'AI developer Noida Sector 62', 'developer Noida Sector 18', 'developer Greater Noida',
  'AI agency Gurgaon Cyber City', 'developer Golf Course Road Gurugram', 'developer DLF CyberHub',
  'developer Faridabad', 'developer Ghaziabad', 'developer Indirapuram',
  'tech consultant Mumbai BKC', 'developer Bangalore Koramangala HSR Layout',
  'developer Hyderabad HITEC City', 'developer Pune Hinjewadi', 'developer Chennai OMR',
  'AI engineer Dubai UAE', 'developer Abu Dhabi', 'freelance engineer Singapore',
  'AI consultant London UK', 'full stack developer New York', 'software consultant San Francisco Bay Area'
];

export const ALL_SITE_KEYWORDS = [
  ...SEO_CORE_KEYWORDS,
  ...AEO_INTENT_QUERIES,
  ...GEO_LOCAL_KEYWORDS
];

// ─── Google Business Profile & Verification Constants ────────────────────────
export const GOOGLE_BUSINESS_NAME = 'Tushar Singh freelancing';
export const GOOGLE_BUSINESS_URL = 'https://share.google/ZDu1p0y00ioP6PWiA';
export const GOOGLE_VERIFICATION_PROOF_URL = 'https://drive.google.com/file/d/17pvGeSh_tA8-_NYFo2UOtRcYA5J2hMOh/view?usp=sharing';
export const GOOGLE_MAPS_DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=Tushar+Singh+freelancing+New+Delhi+Delhi+110044';

// ─── Fiverr Profile & Freelancing Constants ──────────────────────────────────
export const FIVERR_PROFILE_URL = 'https://www.fiverr.com/s/zAd5R2z';
export const FIVERR_SELLER_NAME = 'Tushar Singh on Fiverr';
export const BUSINESS_ADDRESS = {
  streetAddress: 'Badarpur',
  addressLocality: 'New Delhi',
  addressRegion: 'Delhi',
  postalCode: '110044',
  addressCountry: 'IN',
  formatted: 'New Delhi, Delhi 110044, India',
  short: 'New Delhi, India',
  hours: 'Open 24 Hours',
  phone: '+91-88516 19647',
  email: 'tusharsinghoffical@gmail.com',
  latitude: 28.5034,
  longitude: 77.3082,
};

// Per-page OG images and alt text.
// width/height must match actual image pixel dimensions.
// Swap image URLs here when dedicated 1200×630 banners are available.
export const PAGE_OG: Record<string, { image: string; alt: string; width?: string; height?: string }> = {
  '/': {
    image: SITE_DEFAULT_OG_IMAGE,
    alt: SITE_DEFAULT_OG_ALT,
  },
  '/about': {
    image: SITE_DEFAULT_OG_IMAGE,
    alt: 'Tushar Singh — MCA graduate, AI Automation Expert & Full-Stack Developer, Delhi India',
  },
  '/services': {
    image: SITE_DEFAULT_OG_IMAGE,
    alt: 'AI Automation, Chatbot, Full-Stack Web Development & Branding Services by Tushar Singh',
  },
  '/projects': {
    image: SITE_DEFAULT_OG_IMAGE,
    alt: '10+ AI & Web Development Projects — Portfolio by Tushar Singh',
  },
  '/blog': {
    image: SITE_DEFAULT_OG_IMAGE,
    alt: 'AI Automation & Web Development Blog by Tushar Singh',
  },
  '/testimonials': {
    image: SITE_DEFAULT_OG_IMAGE,
    alt: 'Client Testimonials & Reviews — Tushar Singh Portfolio',
  },
  '/contact': {
    image: SITE_DEFAULT_OG_IMAGE,
    alt: 'Contact Tushar Singh — Book a Free AI Automation Consultation',
  },
  '/saas': {
    image: `${SITE_URL}/tasq-one/tasq-one-banner.png`,
    alt: 'TASQ-ONE & Saathi Bot — Proprietary SaaS Suites by Tushar Singh',
    width: '462',
    height: '197',
  },
  '/saas/tasq-one': {
    image: `${SITE_URL}/tasq-one/tasq-one-banner.png`,
    alt: 'TASQ-ONE — The Intelligent Task Operating System (SaaS) by Tushar Singh',
    width: '462',
    height: '197',
  },
  '/saas/saathi-bot': {
    image: `${SITE_URL}/saathi-bot/saathi-bot-logo.svg`,
    alt: 'Saathi Bot — Grounded Enterprise AI Chatbot & Conversational Commerce Platform by Tushar Singh',
    width: '240',
    height: '64',
  },
  '/saas/shield-captcha': {
    image: `${SITE_URL}/projects/shield-captcha-enterprise.jpg`,
    alt: 'ShieldCaptcha Enterprise — Autonomous Zero-Cookie Bot Defense Platform by Tushar Singh',
    width: '1280',
    height: '720',
  },
};

export const TASQ_ONE_URL = 'https://tasq-one.onrender.com';
export const TASQ_ONE_DOCKER_IMAGE = 'tusharsinghoffical/tasq-one';

export const SAATHI_BOT_URL = 'https://saathi-bot.vercel.app';
export const SAATHI_BOT_WIDGET_SCRIPT = 'https://saathi-bot.vercel.app/widget.js';
export const SAATHI_BOT_PUBLIC_ID = 'bot_9f223d8f29b999e81e';
export const SAATHI_BOT_DASHBOARD_URL = 'https://saathi-bot.vercel.app/dashboard/bots/3622b090-d258-4556-ae06-4369b495bb3f';

export const SHIELD_CAPTCHA_URL = 'https://shieldcaptcha.vercel.app';
export const SHIELD_CAPTCHA_DEMO_URL = 'https://shieldcaptcha.vercel.app/demo';
export const SHIELD_CAPTCHA_SIMULATOR_URL = 'https://shieldcaptcha.vercel.app/simulator';
export const SHIELD_CAPTCHA_DOCS_URL = 'https://shieldcaptcha.vercel.app/docs';
export const SHIELD_CAPTCHA_DOCKER_IMAGE = 'tusharsinghoffical/shieldcaptcha';

/* ─── Proprietary SaaS Products Directory ──────────────────────────────
   💡 TO ADD A NEW SAAS PRODUCT:
   Simply add a new object to the SAAS_PRODUCTS array below. It will
   automatically appear on the /saas page with search, filters & cards!
───────────────────────────────────────────────────────────────────────── */
export const SAAS_PRODUCTS: SaasProduct[] = [
  {
    id: 'saathi-bot',
    title: 'Saathi Bot',
    tagline: 'Enterprise Autonomous AI Chatbot & Conversational Commerce Platform',
    description: 'Self-serve, multi-tenant B2B AI SaaS that converts any digital knowledge footprint (websites, sitemaps, PDFs, DOCX) into an accurate, grounded, multilingual AI assistant in under 10 minutes with pre-LLM Confidence Gating, zero hallucinations, cross-lingual semantic retrieval, and zero-redirect lead booking.',
    category: 'Conversational AI & Lead Gen',
    status: 'live',
    statusLabel: 'PRODUCTION V1.0 LIVE',
    version: 'v1.0.0',
    bannerImage: '/saathi-bot/saathi-white-banner.svg',
    bannerImageDark: '/saathi-bot/saathi-black-logo.svg',
    logoImage: '/saathi-bot/saathi-white-logo.svg',
    logoImageDark: '/saathi-bot/saathi-black-logo.svg',
    tags: ['Hybrid RAG (RRF)', 'Confidence Gate', 'Multilingual RAG', 'Shadow DOM (18KB)', 'Google Sheets Sync', 'Supabase pgvector', 'Zero-AWS'],
    metrics: [
      { label: 'First-Token Latency', value: '< 750ms' },
      { label: 'Fallback Latency', value: '24ms' },
      { label: 'Fallback AI Cost', value: '$0.000 (Free)' },
      { label: 'Widget Payload', value: '18 KB (5.5 KB gz)' },
    ],
    highlights: [
      '100% Verifiable Grounding with transparent source citations',
      'Pre-LLM Confidence Gate saving up to 41% on operational AI bills',
      'Cross-lingual multilingual semantic understanding & retrieval',
      'In-chat lead booking form with real-time 2-way Google Sheets mirror',
      'Zero-dependency Shadow DOM embed widget immune to host CSS bleeding',
      'Mathematical multi-tenant isolation via PostgreSQL RLS & denormalized bot_id',
      'High-throughput Multi-Model AI Gateway (Groq Llama 3.3 70B & Gemini 2.5 Pro)'
    ],
    techStack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase pgvector', 'Google Gemini 2.5', 'Groq Cloud', 'Vercel Edge'],
    demoUrl: SAATHI_BOT_URL,
    pageUrl: '/saas/saathi-bot',
    dockerSnippet: `<script src="https://saathi-bot.vercel.app/widget.js" data-bot="bot_9f223d8f29b999e81e" async></script>`,
    isFlagship: true
  },
  {
    id: 'tasq-one',
    title: 'TASQ-ONE',
    tagline: 'The Intelligent Task Operating System',
    description: 'Cloud-native SaaS platform turning loosely defined thoughts into production-ready developer tasks, acceptance criteria, story points and dependency DAGs in seconds using Groq Llama 3.3 70B AI.',
    category: 'AI Task Management',
    status: 'live',
    statusLabel: 'PUBLIC BETA LIVE',
    version: 'v1.4.0',
    bannerImage: '/tasq-one/task-one-emblem.png',
    logoImage: '/tasq-one/task-one-emblem.png',
    tags: ['Groq Llama 3.3', 'PostgreSQL RLS', 'Dependency DAG', 'Redis Cache', 'Docker'],
    metrics: [
      { label: 'Onboarding Speed', value: '< 5 Mins' },
      { label: 'AI Latency', value: '< 400ms' },
      { label: 'Monthly Team ROI', value: '₹48k/mo' },
      { label: 'Audit Security', value: 'SHA-256' },
    ],
    highlights: [
      'Sub-second Groq Llama 3.3 70B AI task decomposition',
      'Topological acyclic Kanban dependency DAG validation',
      'Immutable cryptographic audit trail for DPDP & SOC2',
      'Hardware-isolated PostgreSQL Row-Level Security (RLS)',
      'Multi-channel real-time notifications via Slack & Resend'
    ],
    techStack: ['Next.js 14', 'Groq Llama 3.3 70B', 'Supabase Postgres RLS', 'Upstash Redis', 'Docker'],
    demoUrl: TASQ_ONE_URL,
    pageUrl: '/saas/tasq-one',
    dockerSnippet: `docker run -d --name tasq-one -p 3000:3000 tusharsinghoffical/tasq-one:latest`,
    isFlagship: true
  },
  {
    id: 'shield-captcha',
    title: 'ShieldCaptcha Enterprise',
    tagline: 'Zero-Cookie Autonomous Bot Defense & Human Verification Platform',
    description: 'Self-hostable, zero-cookie privacy-first bot defense platform replacing legacy tracking CAPTCHAs. Features client-side SHA-256 Proof-of-Work, real-time mouse kinematics trajectory analysis, dual Node.js/Python engines, and single-use HMAC-SHA256 replay-protected verification tokens in 150–300ms.',
    category: 'Cybersecurity & Bot Defense',
    status: 'live',
    statusLabel: 'ENTERPRISE PRODUCTION LIVE',
    version: 'v1.2.0',
    bannerImage: '/shield-captcha/shield-captcha-banner.png',
    bannerImageDark: '/shield-captcha/shield-captcha-banner.png',
    logoImage: '/shield-captcha/shield-captcha-logo.png',
    logoImageDark: '/shield-captcha/shield-captcha-logo.png',
    tags: ['Zero-Cookie', 'Proof-of-Work (SHA-256)', 'Mouse Kinematics', 'HMAC-SHA256', 'Sub-300ms Latency', 'Self-Hostable', 'GDPR & DPDP Compliant'],
    metrics: [
      { label: 'Verification Latency', value: '150–300ms' },
      { label: 'Tracking Cookies', value: '0 (Zero Cookies)' },
      { label: 'Compliance', value: 'GDPR / CCPA / DPDP' },
      { label: 'Self-Hosted Cost', value: '$0 / Month' },
    ],
    highlights: [
      'Client-side hardware-accelerated SHA-256 Proof-of-Work challenges via Web Workers',
      'Real-time biomechanical mouse kinematics trajectory & micro-tremor entropy detection',
      'Atomic single-use HMAC-SHA256 verification tokens with cryptographic replay defense',
      'Dual native backend verification support: Node.js (Express/NestJS) & Python (FastAPI/Django)',
      '100% GDPR, CCPA, and India DPDP Act compliance without third-party data tracking',
      'One-command self-hosting via Docker and Docker Compose with zero vendor lock-in',
      'Interactive developer sandbox with live simulator, benchmark calculator, and code generators'
    ],
    techStack: ['Node.js', 'FastAPI', 'Docker', 'Web Workers', 'Web Crypto API', 'TypeScript'],
    demoUrl: SHIELD_CAPTCHA_URL,
    pageUrl: '/saas/shield-captcha',
    dockerSnippet: `docker run -d --name shield-captcha -p 8080:8080 tusharsinghoffical/shieldcaptcha:latest`,
    isFlagship: true
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'AI Automation | Scale Your Workflows',
    description: 'Expert freelance AI Automation in India. I help businesses eliminate manual tasks and optimize operations using autonomous agents and intelligent workflows.',
    priceRange: 'Contact for Price',
    icon: 'Brain',
    category: 'automation',
    features: [
      { icon: '🚀', label: 'Workflow Optimization' },
      { icon: '🤖', label: 'AI Agent Integration' },
      { icon: '🔗', label: 'System Connectivity' },
      { icon: '📋', label: 'Process Scoping' }
    ],
    techStack: ['n8n', 'OpenAI', 'Python', 'Zapier'],
    problem: 'Manual data entry, repetitive copy-pasting, and disconnected tools are slowing down your business growth and leading to costly human errors.',
    solution: 'I build custom autonomous agents and end-to-end workflow automation that connects your favorite tools (Slack, CRM, Email, Sheets) into a single intelligent system.',
    process: [
      'Operational Audit: Identifying bottlenecks in your current workflow.',
      'Architecture Design: Mapping out the automated connectivity.',
      'Core Development: Building the logic using n8n and Python.',
      'Secure Integration: Connecting your APIs and private data.',
      'Monitoring: Continuous performance tracking and optimization.'
    ],
    expectedResults: [
      '10+ hours saved per team member every week.',
      'Zero manual data entry errors.',
      '24/7 autonomous operations without oversight.',
      'Scalable infrastructure that grows with your team.'
    ]
  },
  {
    id: 's2',
    title: 'Lead Generation Systems | Quality Prospecting',
    description: 'Specialized lead generation systems that consistently fill your pipeline with high-intent prospects using advanced scraping and outreach.',
    priceRange: 'Contact for Price',
    icon: 'Zap',
    category: 'marketing',
    features: [
      { icon: '🎯', label: 'Targeted Prospecting' },
      { icon: '📧', label: 'Email Automation' },
      { icon: '👔', label: 'LinkedIn Outreach' },
      { icon: '📊', label: 'Data Mining' }
    ],
    techStack: ['Apollo', 'Instantly', 'Smartlead', 'Python'],
    problem: 'Your sales team is wasting time on low-quality leads and dry pipelines, while manual outreach is inconsistent and fails to scale.',
    solution: 'I implement multi-channel automated outreach systems that find, verify, and engage your ideal clients at scale using AI-personalized messaging.',
    process: [
      'Ideal Client Profile (ICP) Mapping: Defining exactly who to target.',
      'Data Scraping: Harvesting verified contact data from Apollo/LinkedIn.',
      'Outreach Automation: Setting up high-deliverability email/LinkedIn sequences.',
      'Lead Qualification: Automated screening of interested prospects.',
      'CRM Delivery: Pushing qualified leads directly to your sales pipeline.'
    ],
    expectedResults: [
      '50+ qualified sales meetings monthly.',
      'Predictable flow of high-intent prospects.',
      '95%+ email deliverability and high engagement rates.',
      'Complete removal of manual prospecting tasks.'
    ]
  },
  {
    id: 's3',
    title: 'Chatbot Development | 24/7 Support Assistant',
    description: 'Intelligent AI assistants that handle customer inquiries, book appointments, and qualify leads while you sleep.',
    priceRange: 'Contact for Price',
    icon: 'Terminal',
    category: 'ai-agents',
    features: [
      { icon: '📚', label: 'Custom Knowledge Base' },
      { icon: '🌐', label: 'Multilingual Support' },
      { icon: '📅', label: 'Appointment Booking' },
      { icon: '🧰', label: 'CRM Integration' }
    ],
    techStack: ['OpenAI', 'LangChain', 'Vector DB', 'Voiceflow'],
    problem: 'Your business is losing sales because you can’t respond to inquiries 24/7, and your support team is overwhelmed by the same repetitive questions.',
    solution: 'I build advanced RAG-based (Retrieval-Augmented Generation) chatbots trained on your specific business data that can sell and support like an expert human agent.',
    process: [
      'Knowledge Base Ingestion: Training the AI on your documents.',
      'Conversation Flow Design: Building intuitive user journeys.',
      'Backend API Wiring: Connecting the bot to your CRM/Booking tools.',
      'Deployment: Embedding the bot on Web, WhatsApp, or Telegram.',
      'Refinement: Tuning responses based on real user interactions.'
    ],
    expectedResults: [
      '70% reduction in support ticket volume.',
      'Instant response times for every customer.',
      'Increase in automated leads Captured via chat.',
      'Consistent, error-free brand communication.'
    ]
  },
  {
    id: 's4',
    title: 'Website & Funnel Building | High-Conversion UI',
    description: 'Professional websites and sales funnels focused on results. We create digital experiences that turn visitors into customers.',
    priceRange: 'Contact for Price',
    icon: 'Code',
    category: 'web-dev',
    features: [
      { icon: '🎨', label: 'Sales Funnel Design' },
      { icon: '🧪', label: 'A/B Testing' },
      { icon: '⚡', label: 'Speed Optimization' },
      { icon: '🏔️', label: 'Landing Page Strategy' }
    ],
    techStack: ['React', 'Next.js', 'Tailwind', 'Django'],
    problem: 'Your website looks outdated and doesn’t convert. Traffic is being wasted on pages that don’t guide users toward a clear purchase or call.',
    solution: 'I design and build lightweight, high-performance web applications and landing pages optimized for one purpose: conversions.',
    process: [
      'Conversion Strategy: Mapping the user journey and CTA path.',
      'UI/UX Design: Creating a premium, high-trust visual language.',
      'Development: Clean code using React/Next.js for 100/100 speed.',
      'Integration: Wiring up forms, analytics, and CRM tracking.',
      'Launch & Test: Deploying and monitoring conversion rates.'
    ],
    expectedResults: [
      'Significant increase in website conversion rate (CVR).',
      'Ultra-fast page loads for better SEO and lower bounce rates.',
      'Modern, premium brand perception.',
      'Fully responsive experience on all devices.'
    ]
  },
  {
    id: 's5',
    title: 'Logo & Graphic Design | Professional Branding',
    description: 'Creative logo design and branding solutions that establish a strong visual identity for your business or personal brand.',
    priceRange: 'Contact for Price',
    icon: 'Palette',
    category: 'design',
    features: [
      { icon: '🎨', label: 'Logo Design' },
      { icon: '✨', label: 'Brand Identity' },
      { icon: '📱', label: 'Social Media Graphics' },
      { icon: '📄', label: 'Marketing Materials' }
    ],
    techStack: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Canva'],
    problem: 'Your brand lacks a professional visual identity. Inconsistent design and outdated logos are weakening your market presence and credibility.',
    solution: 'I create cohesive brand identities and professional designs that communicate your values and attract your target audience effectively.',
    process: [
      'Brand Discovery: Understanding your vision, values, and target audience.',
      'Concept Development: Creating multiple design directions and concepts.',
      'Refinement: Iterating based on your feedback to perfect the design.',
      'Delivery: Providing all formats and brand guidelines for consistent usage.',
      'Support: Ongoing assistance for future design needs.'
    ],
    expectedResults: [
      'Professional, memorable logo that represents your brand.',
      'Complete brand identity package for consistency.',
      'Versatile designs optimized for digital and print.',
      'Brand guidelines for future design consistency.'
    ]
  },
  {
    id: 's6',
    title: 'Custom SaaS & Cloud MVP Engineering | Scalable Software Suites',
    description: 'Turn your product vision into a full-stack SaaS platform. Multi-tenant architecture, Stripe & Razorpay automated billing, AI agent integration, and enterprise-grade cloud security.',
    priceRange: 'Contact for Price',
    icon: 'Layers',
    category: 'saas',
    features: [
      { icon: '🚀', label: 'Multi-Tenant Architecture' },
      { icon: '💳', label: 'Stripe & Razorpay Billing' },
      { icon: '🤖', label: 'AI Agent & LLM Native' },
      { icon: '🔒', label: 'Role-Based Access & Security' }
    ],
    techStack: ['React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
    problem: 'Building a SaaS from scratch is fraught with technical debt, slow development cycles, complex billing logic, and security vulnerabilities.',
    solution: 'I architect and build battle-tested, modular AI SaaS platforms with clean APIs, modern frontend dashboards, automated subscription tiers, and sub-second performance.',
    process: [
      'Product Architecture & Wireframing: Mapping database schemas, user tiers, and API endpoints.',
      'Core Engine & Auth: Setting up secure OAuth, JWT, and multi-tenant database isolation.',
      'Subscription & Billing Engine: Integrating automated webhooks for Stripe, Razorpay, or LemonSqueezy.',
      'AI & Business Logic Integration: Connecting custom LLMs, vector search, and automation triggers.',
      'Cloud CI/CD & Production Launch: Deploying on AWS/Docker with automated monitoring.'
    ],
    expectedResults: [
      'Production-ready MVP launched in 2 to 4 weeks.',
      'Scalable cloud infrastructure supporting 100,000+ active users.',
      'Automated recurring billing and subscription management.',
      '100% clean, documented codebase ready for venture funding.'
    ]
  }
];

export const PROJECTS: Project[] = [
  // ── 0. ShieldCaptcha Enterprise Flagship Cybersecurity SaaS (Pinned / Featured) ─
  {
    id: 'p-shield-captcha',
    title: 'ShieldCaptcha Enterprise | Zero-Cookie Autonomous Bot Defense & Human Verification',
    description: 'Self-hostable, zero-cookie privacy-first bot defense platform combining hardware-accelerated SHA-256 Proof-of-Work, real-time mouse kinematics physics, and military-grade HMAC-SHA256 replay-protected verification tokens in 150–300ms.',
    imageUrl: '/projects/shield-captcha-enterprise.jpg',
    category: 'SaaS Products',
    tags: ['SaaS', 'Cybersecurity', 'Proof-of-Work', 'Mouse Kinematics', 'Zero-Cookie', 'HMAC-SHA256', 'Node.js', 'FastAPI', 'Docker'],
    date: '2026',
    isFeatured: true,
    isPinned: true,
    clientBackground: 'Tushar Singh Labs open-source cybersecurity initiative delivering a 100% self-hostable, privacy-first alternative to Google reCAPTCHA and Cloudflare Turnstile for global enterprises.',
    problemStatement: 'Legacy CAPTCHAs violate user privacy through third-party tracking cookies, deliver painful 15-30s user friction with image grids, charge thousands of dollars at scale, and get easily defeated by AI computer vision scrapers.',
    strategy: 'Engineered a multi-modal zero-dependency bot defense platform combining background Web Worker SHA-256 Proof-of-Work puzzles, biomechanical mouse pointer trajectory analysis (curvature & micro-tremors), AES-CBC-128 client encryption, and atomic single-use HMAC-SHA256 verification tokens.',
    results: [
      'Sub-300ms verification execution (150ms–300ms vs 15s legacy CAPTCHA).',
      'Zero third-party cookies & 100% GDPR, CCPA & DPDP compliant privacy.',
      '100% self-hostable on Docker with zero licensing fees ($0 forever).',
      'Immunity to AI vision scrapers via kinematics physics and hardware compute cost.'
    ],
    beforeAfter: {
      before: '15-30s traffic light clicking, tracking cookies & thousands in reCAPTCHA enterprise fees',
      after: 'Sub-300ms zero-cookie 1-click PoW, kinematics physics defense & 100% free self-hosting'
    },
    liveDemoUrl: 'https://shieldcaptcha.vercel.app',
    saasPageUrl: '/saas/shield-captcha'
  },

  // ── 1. TASQ-ONE Flagship SaaS Platform (Pinned / Featured) ─────────────────────
  {
    id: 'p-tasq-one',
    title: 'TASQ-ONE | Intelligent Task Operating System (SaaS)',
    description: 'Cloud-native SaaS platform turning loosely defined ideas into production-ready tasks in seconds using Groq Llama 3.3 70B AI, real-time Kanban dependency DAGs, cryptographic audit trails & PostgreSQL RLS.',
    imageUrl: '/projects/task-one-platform.png',
    category: 'SaaS Products',
    tags: ['SaaS', 'Groq Llama 3.3', 'Next.js 14', 'PostgreSQL RLS', 'Dependency DAG', 'Docker'],
    date: '2026',
    isFeatured: true,
    isPinned: true,
    clientBackground: 'Tushar Singh Labs proprietary SaaS engineering initiative for high-velocity software engineering and product teams in India & worldwide.',
    problemStatement: 'Tech teams waste 10–15 hours weekly in tedious standup meetings, unstructured Slack chats, and writing vague Jira tickets, creating constant confusion for developers.',
    strategy: 'Engineered an autonomous AI task operating system with Groq Llama 3.3 70B sub-400ms decomposition, topological acyclic DAG validation, immutable SHA-256 audit trails, and multi-tenant PostgreSQL RLS.',
    results: [
      '< 400ms autonomous AI task decomposition via Groq LPU.',
      '₹48,000+/month net engineering savings for standard 10-person teams.',
      '100% prevention of premature work on blocked tickets via DAG validation.',
      'Cryptographic SHA-256 audit trails ensuring DPDP and SOC 2 readiness.'
    ],
    beforeAfter: {
      before: '10–15 hrs/week wasted in standup chaos & vague Jira tickets',
      after: '< 5-minute setup with instant AI task specs and live DAG tracking'
    },
    liveDemoUrl: 'https://tasq-one.onrender.com',
    saasPageUrl: '/saas/tasq-one'
  },

  // ── 2. Saathi Bot Flagship Conversational AI SaaS (Pinned / Featured) ──────────
  {
    id: 'p-saathi-bot',
    title: 'Saathi Bot | Autonomous AI Chatbot & Conversational Commerce Platform',
    description: 'Self-serve, multi-tenant B2B AI SaaS that turns any website, documentation, or sitemap into an accurate, grounded AI assistant with Pre-LLM Confidence Gating, zero hallucinations, 18 KB Shadow DOM widget, and in-chat lead booking.',
    imageUrl: '/saathi-bot/saathi-bot-banner.jpg',
    category: 'SaaS Products',
    tags: ['SaaS', 'Hybrid RAG', 'Confidence Gate', 'Next.js 16', 'Supabase pgvector', 'Shadow DOM', 'Google Sheets'],
    date: '2026',
    isFeatured: true,
    isPinned: true,
    clientBackground: 'Tushar Singh Labs proprietary multi-tenant B2B conversational AI platform for e-commerce stores, healthcare clinics, and service businesses worldwide.',
    problemStatement: 'Businesses lose high-intent leads and burn expensive LLM tokens when traditional chatbots hallucinate incorrect policies, clash with host website CSS, or bounce users to external booking forms.',
    strategy: 'Engineered an autonomous conversational commerce platform with dense+sparse Hybrid RAG, a 0.55 Pre-LLM Confidence Gate that drops off-topic queries in 24ms at $0 cost, an 18 KB zero-bleed Shadow DOM widget, and in-chat lead booking synced to Google Sheets via encrypted OAuth.',
    results: [
      'Sub-second first-token streaming latency (< 750ms).',
      'Up to 41% operational AI cost reduction via Pre-LLM Confidence Gate.',
      'Zero CSS bleeding with host websites via 18 KB native Web Component Shadow DOM.',
      'Real-time 2-way lead booking synchronization with Google Sheets API.'
    ],
    beforeAfter: {
      before: 'Hallucinating bots, runaway token bills, iframe CSS collisions & 60%+ booking drop-off',
      after: '100% grounded answers, $0 fallback cost, 18 KB widget & seamless in-chat booking'
    },
    liveDemoUrl: SAATHI_BOT_URL,
    saasPageUrl: '/saas/saathi-bot'
  },

  // ── 2. AI-Powered HR Recruitment Screening Assistant (Abu Dhabi Client Deliverable - Pinned) ──────
  {
    id: 'p7',
    title: 'AI-Powered HR Recruitment Screening Assistant | n8n + LLMs',
    description: 'Enterprise recruitment automation assistant built with n8n and LLMs that screens hundreds of candidate resumes in seconds, calculates ATS scores, identifies skill matches, generates interview questions, and notifies recruiters via Slack & Email.',
    imageUrl: '/projects/ai-hr-recruitment-screening-assistant.png',
    category: 'AI Agents',
    tags: ['n8n', 'LLMs', 'OpenAI', 'Workflow Automation', 'ATS Scoring', 'Slack & Email Integration'],
    date: '2026',
    isFeatured: true,
    isPinned: true,
    clientLocation: 'Abu Dhabi, UAE',
    clientBackground: 'Delivered and sold to an enterprise recruitment client in Abu Dhabi (UAE) needing to eliminate manual resume screening bottlenecks and accelerate hiring cycles.',
    problemStatement: 'Hiring is one of the most time-consuming processes. HR teams spend endless hours manually reviewing hundreds of PDF resumes, matching skills with job descriptions, calculating fitment, and drafting interview questions — creating severe delays and recruiter burnout.',
    strategy: 'Engineered an end-to-end multi-model AI recruitment workflow using n8n + LLMs: accepts multi-candidate PDF resumes, parses job descriptions, calculates 0–100 ATS scores, computes Skill/Experience/Education match, detects career gaps and missing competencies, classifies candidates (Qualified / Maybe Qualified / Not Qualified), formulates tailored technical interview questions, logs candidate records, and triggers automated Slack & Email alerts.',
    results: [
      'Successfully deployed & sold to enterprise client in Abu Dhabi, UAE.',
      'Completed first-level candidate screening in seconds rather than 4–6 business days.',
      'Automated ATS scoring (0–100) with precise skill, education & experience match metrics.',
      'Reduced HR screening workload by 85%+ with instant Slack & Email candidate dossiers.'
    ],
    beforeAfter: {
      before: 'Hundreds of resumes reviewed manually | Inconsistent evaluations | 4-6 day screening lag',
      after: 'Sub-second AI resume screening | Standardized ATS scores | Automated interview questions & Slack alerts'
    }
  },

  // ── 3. WhatsApp AI Agent (Pinned) ─────────────────────
  {
    id: 'p4',
    title: 'WhatsApp AI Agent | 24/7 Business Communication',
    description: 'Automated WhatsApp business agent that handles message routing, template responses, appointment booking, and customer inquiries around the clock.',
    imageUrl: '/projects/whatsapp-ai-agent.png',
    category: 'AI Agents',
    tags: ['WhatsApp', 'n8n', 'OpenAI', 'Automation'],
    date: '2025',
    isFeatured: true,
    isPinned: true,
    clientBackground: 'A service business receiving 200+ WhatsApp messages daily with no automated response system.',
    problemStatement: 'The business owner was manually responding to every WhatsApp message, consuming 4+ hours daily and missing leads after hours.',
    strategy: 'Built an n8n-powered WhatsApp automation with AI intent detection, auto-replies, appointment booking, and CRM integration.',
    results: [
      '100% automated responses for common inquiries.',
      '4+ hours per day saved for the business owner.',
      'Zero missed leads — all inquiries captured 24/7.',
      'Appointment booking rate increased by 35%.'
    ],
    beforeAfter: {
      before: '4 hrs/day manual replies | Missed after-hours leads',
      after: '0 hrs manual work | 24/7 automated lead capture'
    }
  },

  // ── 4. TakeOpinion Medical Tourism Platform (Delhi Client Deliverable - Pinned) ─────────────────────────
  {
    id: 'p6',
    title: 'TakeOpinion | Global Medical Tourism & Hospital Platform',
    description: 'Comprehensive Django 5-based global medical tourism platform connecting international patients with doctors, accredited hospitals, treatments, hotel bookings, and secure payment processing.',
    imageUrl: '/projects/takeopinion-platform.jpg',
    category: 'Web Dev',
    tags: ['Django 5', 'Python', 'PostgreSQL', 'Stripe', 'Razorpay', 'Bootstrap 5', 'Celery & Redis'],
    date: '2024',
    isFeatured: true,
    isPinned: true,
    clientLocation: 'Delhi, India',
    clientBackground: 'Delivered and sold to a prominent healthcare & medical tourism enterprise client in Delhi, India, connecting overseas and domestic patients with accredited healthcare facilities, specialized doctors, treatments, and integrated hotel accommodations.',
    problemStatement: 'Cross-border patients struggled with comparing treatment pricing, scheduling verified doctor consultations across timezones, booking nearby partner hotels, and processing secure international payments with transparent quotes.',
    strategy: 'Architected and built full-stack Django 5 web application with 718+ fixture records: doctor directory, hospital network, treatment catalog with 15% platform discount calculations, hotel room booking (Normal to Executive Suites ₹2.5k–₹9k), guest checkout flows, Google Meet consultation integration, Celery/Redis background jobs, and Stripe/Razorpay gateways.',
    results: [
      'Successfully delivered and sold to healthcare enterprise in Delhi, India.',
      'Appointment & consultation booking time reduced from 15 min to 2 min.',
      'Over 718+ medical records, doctor profiles, and hospital listings synchronized.',
      'Partnered hotel booking & guest consultation checkout enabled without mandatory login.',
      'Secure dual payment processing (Stripe & Razorpay) with automated 15% discount engine.'
    ],
    beforeAfter: {
      before: 'Fragmented clinic directories | Manual quote requests | Phone-only hotel coordination',
      after: 'End-to-end medical tourism portal | Instant treatment comparison | Integrated hospital & hotel booking'
    },
    liveDemoUrl: 'https://takeopinionclientprojectss.onrender.com',
    githubUrl: 'https://github.com/Tusharsinghoffical/TakeOpinionclient'
  },

  // ── 5. VASS Smart Attendance System (Maharashtra Client Deliverable - Pinned) ──────────────────────────────────
  {
    id: 'p18',
    title: 'VASS | Smart Attendance System for Modern Workplaces',
    description: 'Enterprise QR-based smart employee attendance & workforce management platform featuring live GPS location verification, multi-branch tracking, employee portal, leave management, and real-time admin analytics.',
    imageUrl: '/projects/vas-qr-attendance-platform.jpg',
    category: 'Web Dev',
    tags: ['Python', 'Django', 'QR Technology', 'GPS Geofencing', 'Live Tracking', 'Workforce Analytics'],
    date: '2024',
    isFeatured: true,
    isPinned: true,
    clientLocation: 'Maharashtra, India',
    clientBackground: 'Delivered and sold to a growing enterprise client in Maharashtra, India, managing 120+ employees across multiple branches needing automated QR attendance and live GPS location verification.',
    problemStatement: 'Manual attendance registers and biometric scanners led to proxy check-ins, buddy-punching, zero geo-verification, and over 15 hours wasted every month reconciling payroll attendance data.',
    strategy: 'Built a full-stack Django platform featuring dynamic QR code attendance with GPS geofence verification (Mumbai coordinates), role-based Employee & Admin portals, real-time presence overview dashboard (Present, Absent, On-Leave counters), automated leave management, and instant exportable analytics.',
    results: [
      'Successfully deployed and sold to client in Maharashtra, India.',
      'Proxy check-ins and buddy-punching reduced to 0% via dynamic QR and live GPS verification.',
      'Daily check-in time reduced from 5 minutes in line to under 3 seconds on mobile.',
      'HR & Admin monthly payroll processing workload cut by 60%.',
      'Unified multi-branch workforce visibility enabled for 120+ active employees.'
    ],
    beforeAfter: {
      before: 'Biometric queues | Proxy check-ins | 15 hrs/month lost on manual payroll logs',
      after: 'Instant QR check-in | GPS location verified | Real-time multi-branch workforce dashboard'
    },
    liveDemoUrl: 'https://vassystemclientproject.onrender.com/'
  },

  // ── 6. RAG Chatbot (Pinned) ────────────────────────────────
  {
    id: 'p_chat',
    title: 'RAG Chatbot | Custom Knowledge Base Assistant',
    description: 'Intelligent AI chatbot trained on proprietary business data using Retrieval-Augmented Generation — deployed on website, WhatsApp, and Telegram.',
    imageUrl: '/projects/rag-knowledge-base-chatbot.png',
    category: 'AI Agents',
    tags: ['OpenAI', 'LangChain', 'Vector DB', 'Voiceflow'],
    date: '2025',
    isFeatured: true,
    isPinned: true,
    clientBackground: 'An education platform needing a 24/7 assistant to handle student queries about courses and admissions.',
    problemStatement: 'The support team was overwhelmed by repetitive questions about course details, fees, and admission process, causing delays and poor student experience.',
    strategy: 'Built a RAG chatbot ingesting all course documents, FAQs, and policies into a vector database. Deployed on website widget and WhatsApp with CRM lead capture.',
    results: [
      'Handles 80% of student queries without human intervention.',
      'Lead capture rate increased by 40% through chat.',
      'Support team workload reduced by 65%.',
      'Multilingual support in English and Hindi.'
    ],
    beforeAfter: {
      before: 'Long email wait times | Repetitive manual queries | Lost leads',
      after: 'Instant AI answers | Automated lead capture | Happy students'
    }
  },

  // ── 7. Hospital Analytics Dashboard (Pinned) ───────────────────────
  {
    id: 'p10',
    title: 'Hospital Analytics Dashboard | Power BI Healthcare Intelligence',
    description: 'Interactive Power BI dashboard analyzing hospital patient flow, bed occupancy, staff efficiency, and resource utilization across multiple departments and branches.',
    imageUrl: '/projects/hospital-analytics-dashboard.jpg',
    category: 'Data Science',
    tags: ['Power BI', 'DAX', 'Healthcare Analytics', 'SQL', 'Hospital Intelligence', 'Patient Flow'],
    date: '2024',
    isFeatured: true,
    isPinned: true,
    clientBackground: 'Built for a multi-specialty healthcare network with 3 hospital branches struggling with disconnected data, paper reports, and delayed operational visibility.',
    problemStatement: 'Hospital administrators were making resource and bed allocation decisions based on monthly paper reports with a 30-day lag time, leading to severe ICU bottlenecks and high overtime costs.',
    strategy: 'Engineered a real-time Power BI intelligence dashboard unifying data from 3 hospital branches: automated patient flow (OPD/IPD/Emergency), departmental bed occupancy tracking (Medicine, Surgery, ICU, Pediatrics, Gynecology, Orthopedics), staff-on-duty scheduling, and wait-time diagnostics.',
    results: [
      'Decision-making cycle reduced from 30 days to real-time.',
      'Bed utilization optimized by 18% across 6 core hospital departments.',
      'Unified operational intelligence deployed across 3 hospital branches.',
      'Emergency department wait times tracked and bottlenecks proactively resolved.',
      'Significant reduction in clinical staff overtime expenses via predictive staffing.'
    ],
    beforeAfter: {
      before: '30-day lag paper reports | No real-time visibility | Reactive emergency response',
      after: 'Real-time Power BI | Predictive bed & staff insights | Unified 3-branch intelligence'
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Rahul Mehra',
    clientRole: 'Operations Director',
    company: 'LogiTrack Solutions',
    content: "Tushar's automation workflows using n8n saved our team over 20 hours a week. The WhatsApp bot is flawless and handles customer queries even while we sleep. Truly a game-changer. Top-rated freelance automation developer in India!",
    rating: 4,
    category: 'Automation',
  },
  {
    id: 't2',
    clientName: 'Priya Sharma',
    clientRole: 'Tech Founder',
    company: 'HealthFirst Technologies',
    content: "The Healthcare platform built by Singh exceeded all our expectations. Clean code, responsive design, and robust security. He's not just a developer; he's a technical architect. Professional freelance web developer India services at their finest.",
    rating: 4,
    category: 'Web Dev',
  },
  {
    id: 't3',
    clientName: 'Arjun Reddy',
    clientRole: 'Lead Analyst',
    company: 'DataMetrics Analytics',
    content: "The Power BI dashboards Tushar created gave us insights we never knew existed. His ability to handle 100k+ records and make them visually intuitive is impressive. Expert freelance data scientist India with exceptional analytical skills.",
    rating: 4,
    category: 'Data Science',
  }
];


export const ICON_MAP = {
  Database: <Database className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  BarChart: <BarChart className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Brain: <Brain className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Settings: <Settings className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
};
