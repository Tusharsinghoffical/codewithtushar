
import React from 'react';
import { Database, Code, Cpu, BarChart, Zap, Globe, Brain, Terminal, Settings, Palette } from 'lucide-react';
import { Service, Project, Testimonial } from './types';

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
  }
];

export const PROJECTS: Project[] = [
  // --- FEATURED CASE STUDIES ---
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
  {
    id: 'p2',
    title: 'AI Support Agent | 70% Ticket Reduction',
    description: 'Autonomous customer support system trained on private business knowledge.',
    imageUrl: '/projects/p2.svg',
    category: 'AI Agents',
    tags: ['Python', 'OpenAI', 'RAG', 'Support'],
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
  {
    id: 'p3',
    title: 'SerpAPI Flight Agent | Freelance Web Developer Project',
    description: 'Professional freelance web developer project: Searches and compares flight prices from multiple airlines in real-time using SerpAPI integration. Shows available flights, prices, and booking options instantly. Purpose: Help travelers find the best flight deals quickly and make informed booking decisions without visiting multiple airline websites. Expert freelance web developer solution.',
    imageUrl: '/projects/p3.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'AI Agents',
    tags: ['JSON', 'SerpAPI', 'Flight Search', 'Freelance Web Developer'],
    date: '2025'
  },
  {
    id: 'p4',
    title: 'WhatsApp Agent | Freelance Automation Developer Project',
    description: 'Expert freelance automation developer project: Handles WhatsApp business communications automatically including message routing, template responses, and conversation management. Sends automated replies and manages customer inquiries 24/7. Purpose: Streamline business communication, improve response times, and provide consistent customer service through WhatsApp platform. Professional freelance automation developer solution.',
    imageUrl: '/projects/p4.svg',
    galleryUrls: ['https://unsplash.com/photos/green-and-white-apple-logo-_qsuER9xYOY'],
    category: 'AI Agents',
    tags: ['JSON', 'WhatsApp', 'Messaging', 'Freelance Automation Developer'],
    date: '2025'
  },

  // --- WEB DEVELOPMENT ---
  {
    id: 'p5',
    title: 'E-Commerce Marketplace | Freelance Full Stack Developer Project',
    description: 'Top-rated freelance full stack developer project: Online shopping platform where customers can browse products, add to cart, make payments, and track orders. Handles inventory management, user accounts, and secure transactions. Purpose: Enable businesses to sell products online with professional e-commerce capabilities and streamlined customer purchasing experience. Expert freelance full stack developer solution.',
    imageUrl: '/projects/p5.svg',
    galleryUrls: [
      'https://www.nextinfoera.in/ecommerce-development',
      'https://www.nextinfoera.in/ecommerce-development'
    ],
    category: 'Web Dev',
    tags: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'Freelance Full Stack Developer'],
    date: '2024',
    isFeatured: true
  },
  {
    id: 'p6',
    title: 'Hospital Website | Freelance Web Developer India Project',
    description: 'Professional freelance web developer India project: Manages hospital appointments, patient records, and medical facility operations digitally. Allows patients to book appointments online and doctors to manage schedules efficiently. Purpose: Modernize healthcare administration, reduce paperwork, and improve patient access to medical services through digital transformation. Expert freelance web developer India solution.',
    imageUrl: '/projects/p6.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Web Dev',
    tags: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'Freelance Web Developer India'],
    date: '2024'
  },
  {
    id: 'p7',
    title: 'Restaurant Website | Freelance Python Developer Project',
    description: 'Expert freelance Python developer project: Digital restaurant platform for online menu browsing, table reservations, and food ordering. Customers can view menus, book tables, and place orders through website or mobile. Purpose: Modernize restaurant operations, increase customer convenience, and boost revenue through online ordering and reservation systems. Professional freelance Python developer solution.',
    imageUrl: '/projects/p7.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Web Dev',
    tags: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'Freelance Python Developer'],
    date: '2024'
  },

  // --- DATA SCIENCE / POWER BI ---
  {
    id: 'p10',
    title: 'Hospital Analysis Data | Freelance Data Scientist Project',
    description: 'Top-rated freelance data scientist project: Analyzes hospital data to track patient flow, bed availability, staff scheduling, and medical resource usage. Creates visual reports showing healthcare operational efficiency. Purpose: Help hospital administrators make data-driven decisions to optimize patient care, resource allocation, and operational costs. Expert freelance data scientist solution.',
    imageUrl: '/projects/p10.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1551288049-bbda6465f74a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Data Science',
    tags: ['Power BI', 'Healthcare Analytics', 'Data Visualization', 'Freelance Data Scientist'],
    date: '2024',
    isFeatured: true
  },
  {
    id: 'p11',
    title: 'HR Analysis Data | Freelance Data Science Consultant Project',
    description: 'Professional freelance data science consultant project: Tracks employee performance, analyzes workforce data, and monitors HR metrics like retention and productivity. Generates reports on organizational health and talent management. Purpose: Enable HR teams to make informed decisions about staffing, training, and employee development based on data insights. Expert freelance data science consultant solution.',
    imageUrl: '/projects/p11.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1454165833767-13a6b060102b?auto=format&fit=crop&q=80&w=1000'
    ],
    category: 'Data Science',
    tags: ['Power BI', 'HR Analytics', 'Dashboard', 'Freelance Data Science Consultant'],
    date: '2024'
  },
  {
    id: 'p12',
    title: 'SuperStore Sales Data | Freelance Business Intelligence Project',
    description: 'Expert freelance business intelligence project: Analyzes retail sales data across different regions to track profits, inventory levels, and customer buying patterns. Identifies best-selling products and optimal pricing strategies. Purpose: Help retailers understand market performance, optimize inventory management, and maximize profitability through data-driven business decisions. Professional freelance business intelligence solution.',
    imageUrl: '/projects/p12.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Data Science',
    tags: ['Power BI', 'Sales Analytics', 'Business Intelligence', 'Freelance Business Intelligence'],
    date: '2024'
  },

  // --- MACHINE LEARNING ---
  {
    id: 'p13',
    title: 'Credit Card Fraud Detection | Freelance ML Engineer Project',
    description: 'Top-rated freelance ML engineer project: Detects fraudulent credit card transactions by analyzing spending patterns and identifying suspicious activities in real-time. Uses machine learning to distinguish between legitimate and fraudulent charges. Purpose: Protect consumers and financial institutions from payment fraud losses while minimizing false declined transactions. Expert freelance ML engineer solution.',
    imageUrl: '/projects/p13.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551288049-bbda6465f74a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'ML',
    tags: ['Python', 'Machine Learning', 'Fraud Detection', 'Freelance ML Engineer'],
    date: '2023'
  },
  {
    id: 'p14',
    title: 'Iris Classification Model | Freelance Data Science Project',
    description: 'Expert freelance data science project: Classifies iris flower species using machine learning algorithms based on measurements like petal length and width. Demonstrates fundamental classification techniques in data science. Purpose: Educational tool for learning machine learning concepts and comparing different classification algorithms on a classic dataset. Professional freelance data science solution.',
    imageUrl: '/projects/p14.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1520412099551-6296b0db5c04?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'ML',
    tags: ['Python', 'Scikit-learn', 'Classification', 'Freelance Data Science'],
    date: '2023'
  },
  {
    id: 'p15',
    title: 'Sales Advertising Analysis | Freelance Python Developer Project',
    description: 'Professional freelance Python developer project: Analyzes advertising campaign performance by examining spending patterns and measuring return on investment. Determines which marketing channels generate the best results for businesses. Purpose: Help marketers optimize advertising budgets by identifying high-performing campaigns and eliminating ineffective spending. Expert freelance Python developer solution.',
    imageUrl: '/projects/p15.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1551288049-bbda6465f74a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Data Science',
    tags: ['Python', 'Data Analysis', 'Regression', 'Freelance Python Developer'],
    date: '2023'
  },
  {
    id: 'p16',
    title: 'Unemployment Prediction Model | Freelance AI Developer Project',
    description: 'Expert freelance AI developer project: Predicts future unemployment rates by analyzing historical employment data and economic trends. Forecasts labor market conditions to help with workforce planning. Purpose: Assist policymakers, businesses, and researchers in understanding employment trends and preparing for future labor market changes. Professional freelance AI developer solution.',
    imageUrl: '/projects/p16.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1454165833767-13a6b060102b?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'ML',
    tags: ['Python', 'Time Series', 'Prediction', 'Freelance AI Developer'],
    date: '2023'
  },

  // --- FINTECH & ENTERPRISE ---
  {
    id: 'p17',
    title: 'IPO Platform | Freelance Web Developer Project',
    description: 'Top-rated freelance web developer project: Tracks Initial Public Offering (IPO) activities, monitors stock market data, and analyzes investment opportunities for companies going public. Provides real-time IPO information and performance metrics. Purpose: Help investors and financial professionals stay informed about new stock offerings and make educated investment decisions in the public markets. Expert freelance web developer solution.',
    imageUrl: '/projects/p17.svg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1611974714024-4607a50d6c2a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Web Dev',
    tags: ['Python', 'Django', 'HTML', 'CSS', 'Freelance Web Developer'],
    date: '2024'
  },
  {
    id: 'p18',
    title: 'VAS QR System | Freelance Full Stack Developer Project',
    description: 'Professional freelance full stack developer project: Manages Value Added Services through QR code technology, enabling customers to access special offers, loyalty programs, and premium services by scanning codes. Handles service subscriptions and customer rewards. Purpose: Simplify service delivery, enhance customer engagement, and streamline loyalty program management through convenient QR code-based interactions. Expert freelance full stack developer solution.',
    imageUrl: 'https://fairshare.tech/wp-content/uploads/2019/01/QR_code_attendance.jpg',
    galleryUrls: [
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1454165833767-13a6b060102b?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Web Dev',
    tags: ['Python', 'Django', 'HTML', 'CSS', 'Freelance Full Stack Developer'],
    date: '2024'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    clientName: 'Rahul Mehra',
    clientRole: 'Operations Director',
    company: 'LogiTrack Solutions',
    content: "Tushar's automation workflows using n8n saved our team over 20 hours a week. The WhatsApp bot is flawless and handles customer queries even while we sleep. Truly a game-changer. Top-rated freelance automation developer in India!",
    rating: 5,
    category: 'Automation',
  },
  {
    id: 't2',
    clientName: 'Priya Sharma',
    clientRole: 'Tech Founder',
    company: 'HealthFirst Technologies',
    content: "The Healthcare platform built by Singh exceeded all our expectations. Clean code, responsive design, and robust security. He's not just a developer; he's a technical architect. Professional freelance web developer India services at their finest.",
    rating: 5,
    category: 'Web Dev',
  },
  {
    id: 't3',
    clientName: 'Arjun Reddy',
    clientRole: 'Lead Analyst',
    company: 'DataMetrics Analytics',
    content: "The Power BI dashboards Tushar created gave us insights we never knew existed. His ability to handle 100k+ records and make them visually intuitive is impressive. Expert freelance data scientist India with exceptional analytical skills.",
    rating: 5,
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
