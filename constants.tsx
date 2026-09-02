
import React from 'react';
import { Database, Code, Cpu, BarChart, Zap, Globe, Brain, Terminal, Settings, Palette } from 'lucide-react';
import { Service, Project, Testimonial, SaasProduct } from './types';

// ─── Site-wide constants ──────────────────────────────────────────────────────
export const SITE_URL             = 'https://codewithmrsingh.me';
export const SITE_NAME            = 'Code with Mr Singh';
export const SITE_DEFAULT_OG_IMAGE  = 'https://codewithmrsingh.me/tushar-singh-optimized.jpg';
export const SITE_DEFAULT_OG_ALT    = 'Tushar Singh — AI Automation Expert & Full-Stack Developer from Delhi, India';
/** Actual pixel dimensions of tushar-singh-optimized.jpg (square portrait) */
export const SITE_DEFAULT_OG_WIDTH  = '800';
export const SITE_DEFAULT_OG_HEIGHT = '800';
/** Current deployment date — update on each redeploy for fresh dateModified signals */
export const SITE_DATE_MODIFIED = '2026-08-26';

// ─── Google Business Profile & Verification Constants ────────────────────────
export const GOOGLE_BUSINESS_NAME = 'Tushar Singh freelancing';
export const GOOGLE_BUSINESS_URL  = 'https://share.google/ZDu1p0y00ioP6PWiA';
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
    alt: 'TASQ-ONE — The Intelligent Task Operating System (SaaS) by Tushar Singh',
    width: '462',
    height: '197',
  },
};

export const TASQ_ONE_URL = 'https://tasq-one.onrender.com';
export const TASQ_ONE_DOCKER_IMAGE = 'tusharsinghoffical/tasq-one';

/* ─── Proprietary SaaS Products Directory ──────────────────────────────
   💡 TO ADD A NEW SAAS PRODUCT:
   Simply add a new object to the SAAS_PRODUCTS array below. It will
   automatically appear on the /saas page with search, filters & cards!
───────────────────────────────────────────────────────────────────────── */
export const SAAS_PRODUCTS: SaasProduct[] = [
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
  // ── 0. TASQ-ONE Flagship SaaS Platform ─────────────────────
  {
    id: 'p-tasq-one',
    title: 'TASQ-ONE | Intelligent Task Operating System (SaaS)',
    description: 'Cloud-native SaaS platform turning loosely defined ideas into production-ready tasks in seconds using Groq Llama 3.3 70B AI, real-time Kanban dependency DAGs, cryptographic audit trails & PostgreSQL RLS.',
    imageUrl: '/tasq-one/task-one-emblem.png',
    category: 'SaaS Products',
    tags: ['SaaS', 'Groq Llama 3.3', 'Next.js 14', 'PostgreSQL RLS', 'Dependency DAG', 'Docker'],
    date: '2026',
    isFeatured: true,
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

  // ── 1. Automated Lead Funnel ──────────────────────────────
  {
    id: 'p1',
    title: 'Automated Lead Funnel | 250+ Leads in 10 Days',
    description: 'High-conversion marketing automation project for a B2B SaaS client.',
    imageUrl: '/projects/p1.svg',
    category: 'Lead Gen',
    tags: ['Automation', 'Marketing', 'Funnels', 'AI'],
    date: '2025',
    isFeatured: true,
    clientBackground: 'A niche B2B SaaS company struggling to get appointments from cold traffic.',
    problemStatement: 'Manual LinkedIn outreach was too slow, and the cost per lead on Google ads was skyrocketing to $80+.',
    strategy: 'Built a multi-channel automated funnel: Cold LinkedIn automation -> Personalised landing page -> High-intent email sequence -> Automated booking.',
    results: [
      '250+ qualified leads generated in first 10 days.',
      'Cost per lead dropped from $80 to $12.',
      '40% increase in monthly sales calls booked.',
      '100% automated outreach eliminating manual burnout.'
    ],
    beforeAfter: {
      before: '4 leads/week | $320 Average CPA | 15 hrs manual outreach/week',
      after: '175 leads/week | $12 Average CPA | 0 hrs manual outreach/week'
    }
  },
  // ── 2. AI Support Agent ──────────────────────────────────
  {
    id: 'p2',
    title: 'AI Support Agent | 70% Ticket Reduction',
    description: 'Autonomous AI customer support system trained on private business knowledge base using RAG architecture.',
    imageUrl: '/projects/p2.svg',
    category: 'AI Agents',
    tags: ['Python', 'OpenAI', 'RAG', 'LangChain'],
    date: '2025',
    isFeatured: true,
    clientBackground: 'An e-commerce brand handling 500+ repetitive support tickets daily.',
    problemStatement: 'Response times were exceeding 24 hours, leading to customer frustration and cancelled orders.',
    strategy: 'Deployed an RAG-based AI Agent that ingested all product manuals, return policies, and past tickets to answer questions instantly.',
    results: [
      '70% reduction in human support agent workload.',
      'Instant response time (0 seconds) for common queries.',
      '15% increase in repeat orders due to faster resolution.',
      'Zero oversight required for 90% of basic inquiries.'
    ],
    beforeAfter: {
      before: '26 Hour Avg Response Time | 4 Human Agents Overworked',
      after: '0 Second Response Time | 1 Manager Monitoring AI'
    }
  },

  // ── 3. WhatsApp Agent ─────────────────────────────────────
  {
    id: 'p4',
    title: 'WhatsApp AI Agent | 24/7 Business Communication',
    description: 'Automated WhatsApp business agent that handles message routing, template responses, appointment booking, and customer inquiries around the clock.',
    imageUrl: '/projects/p4.svg',
    category: 'AI Agents',
    tags: ['WhatsApp', 'n8n', 'OpenAI', 'Automation'],
    date: '2025',
    isFeatured: true,
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

  // ── 4. Chatbot Development ────────────────────────────────
  {
    id: 'p_chat',
    title: 'RAG Chatbot | Custom Knowledge Base Assistant',
    description: 'Intelligent AI chatbot trained on proprietary business data using Retrieval-Augmented Generation — deployed on website, WhatsApp, and Telegram.',
    imageUrl: '/projects/p3.svg',
    category: 'AI Agents',
    tags: ['OpenAI', 'LangChain', 'Vector DB', 'Voiceflow'],
    date: '2025',
    isFeatured: true,
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

  // ── 5. Hospital Website ───────────────────────────────────
  {
    id: 'p6',
    title: 'Hospital Management Platform | Full-Stack Web App',
    description: 'Full-stack hospital management system with online appointment booking, patient records, doctor scheduling, and admin dashboard built with Django and React.',
    imageUrl: '/projects/p6.svg',
    category: 'Web Dev',
    tags: ['Python', 'Django', 'React', 'PostgreSQL'],
    date: '2024',
    isFeatured: true,
    clientBackground: 'A multi-department hospital running all operations manually on paper and Excel spreadsheets.',
    problemStatement: 'Patients had no way to book appointments online. Staff spent hours managing paper records and phone-based scheduling causing delays and errors.',
    strategy: 'Built a full-stack platform with patient portal, doctor dashboard, admin panel, real-time appointment slots, and digital record management.',
    results: [
      'Appointment booking time reduced from 15 min to 2 min.',
      'Paper records completely eliminated for new patients.',
      'Doctor schedule conflicts dropped to zero.',
      'Patient satisfaction score improved significantly.'
    ],
    beforeAfter: {
      before: 'Manual paper records | Phone-only booking | Scheduling chaos',
      after: 'Digital records | Online booking 24/7 | Automated scheduling'
    }
  },

  // ── 6. Restaurant Website ─────────────────────────────────
  {
    id: 'p7',
    title: 'Restaurant Digital Platform | Online Ordering & Reservations',
    description: 'Complete restaurant web platform with digital menu, online table reservations, food ordering system, and kitchen order management built with Django.',
    imageUrl: '/projects/p7.svg',
    category: 'Web Dev',
    tags: ['Python', 'Django', 'HTML', 'JavaScript'],
    date: '2024',
    isFeatured: false,
    clientBackground: 'A mid-size restaurant with no online presence, losing customers to competitors with digital ordering.',
    problemStatement: 'The restaurant had no website, no online ordering, and relied entirely on walk-ins and phone calls for reservations — losing significant revenue.',
    strategy: 'Developed a full restaurant web platform: digital menu with images, table reservation system, online ordering with payment integration, and owner admin panel.',
    results: [
      'Online orders constituted 30% of total revenue within 2 months.',
      'Table reservation conflicts eliminated completely.',
      'Average order value increased 20% with upsell features.',
      'Google Business visibility improved significantly.'
    ],
    beforeAfter: {
      before: 'Phone-only orders | No online presence | Lost to competitors',
      after: 'Online ordering 24/7 | 30% digital revenue | Strong web presence'
    }
  },

  // ── 7. Hospital Analysis Dashboard ───────────────────────
  {
    id: 'p10',
    title: 'Hospital Analytics Dashboard | Power BI Healthcare Intelligence',
    description: 'Interactive Power BI dashboard analyzing hospital patient flow, bed occupancy, staff efficiency, and resource utilization across multiple departments.',
    imageUrl: '/projects/p10.svg',
    category: 'Data Science',
    tags: ['Power BI', 'DAX', 'Healthcare Analytics', 'SQL'],
    date: '2024',
    isFeatured: false,
    clientBackground: 'A hospital group with 3 branches struggling to track performance across departments without clear visibility into operational data.',
    problemStatement: 'Hospital administrators were making decisions based on monthly paper reports with 30-day lag time, missing critical patterns in patient flow and resource usage.',
    strategy: 'Built a real-time Power BI dashboard connecting hospital SQL databases — visualizing patient flow, bed availability, staff scheduling, and department KPIs with drill-down capability.',
    results: [
      'Decision-making cycle reduced from 30 days to real-time.',
      'Bed utilization efficiency improved by 18%.',
      'Staff overtime costs reduced through better scheduling insights.',
      'Emergency department bottlenecks identified and resolved.'
    ],
    beforeAfter: {
      before: '30-day lag paper reports | No real-time visibility | Reactive decisions',
      after: 'Real-time Power BI | Predictive insights | Proactive operations'
    }
  },

  // ── 8. VAS QR System ──────────────────────────────────────
  {
    id: 'p18',
    title: 'VAS QR Management System | Full-Stack Enterprise Platform',
    description: 'Enterprise Value Added Services platform using QR technology for managing customer loyalty programs, service subscriptions, and digital rewards — built with Django.',
    imageUrl: 'https://fairshare.tech/wp-content/uploads/2019/01/QR_code_attendance.jpg',
    category: 'Web Dev',
    tags: ['Python', 'Django', 'QR Technology', 'REST API'],
    date: '2024',
    isFeatured: false,
    clientBackground: 'A telecom-adjacent service company managing customer loyalty rewards and value-added service subscriptions manually.',
    problemStatement: 'The company was using spreadsheets to track thousands of customer subscriptions, causing errors, delays in rewards delivery, and no real-time visibility.',
    strategy: 'Built a full-stack Django platform with QR code generation, customer service management, subscription tracking, rewards redemption engine, and admin analytics dashboard.',
    results: [
      'Manual errors in reward allocation dropped to zero.',
      'Customer redemption time reduced from 5 days to instant.',
      'Admin team workload reduced by 60% through automation.',
      'Subscription management scaled to 10,000+ customers.'
    ],
    beforeAfter: {
      before: 'Manual spreadsheets | 5-day reward delays | Error-prone tracking',
      after: 'Automated QR system | Instant redemption | Scalable to 10k+ users'
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
