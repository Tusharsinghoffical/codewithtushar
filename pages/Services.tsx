import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SharePageButton from '../components/SharePageButton';
import {
  Brain, Bot, Globe, Palette, ArrowRight, CheckCircle2,
  TrendingUp, AlertCircle, Sparkles, Clock, ChevronRight,
  Instagram, Share2, Megaphone, ArrowUpRight, ShieldCheck,
  Zap, Star, Layers, MessageSquare, PhoneCall, HelpCircle,
  Code2, Rocket, Check
} from 'lucide-react';
import { FIVERR_PROFILE_URL, SITE_URL, getActiveDomain } from '../constants';
import { FiverrIcon, FiverrBadge } from '../components/FiverrBadge';

/* ─── Types ──────────────────────────────────────────────── */
interface ServiceDef {
  id: string;
  category: 'all' | 'ai' | 'chatbots' | 'web' | 'branding' | 'saas';
  icon: React.ReactNode;
  badge: string;
  badgeType: 'popular' | 'demand' | 'full' | 'brand';
  title: string;
  simpleTitle: string; // Plain English for non-tech clients
  tagline: string;
  description: string;
  problem: string;
  features: string[];
  result: string;
  deliveryTime: string;
  stack: string[];
  gradient: string;
  borderGlow: string;
  accentColor: string;
}

/* ─── Service Data with Plain English Clarifications ─────── */
const ACTIVE_SERVICES: ServiceDef[] = [
  {
    id: 'custom-saas',
    category: 'saas',
    icon: <Rocket size={26} />,
    badge: '🚀 Next-Gen Suites',
    badgeType: 'popular',
    title: 'Custom SaaS & Cloud MVP Engineering',
    simpleTitle: 'Build Your Own Software Product (SaaS & Web App)',
    tagline: 'From Idea to Scalable Monthly Recurring Revenue',
    description: 'Launch your product vision with multi-tenant architecture, automated Stripe & Razorpay subscriptions, AI agent integration, and enterprise-grade cloud security.',
    problem: 'Building a SaaS without proper architecture leads to security flaws, high server costs, broken billing logic, and endless technical debt.',
    features: [
      'Multi-tenant database & secure user authentication',
      'Automated recurring subscriptions (Stripe & Razorpay)',
      'Native AI & LLM agent integrations (OpenAI, LangChain)',
      'Scalable Docker & AWS cloud deployment (< 100ms speed)'
    ],
    result: 'Production-ready SaaS MVP live in 2 to 4 weeks',
    deliveryTime: '2 – 4 Weeks',
    stack: ['React', 'Next.js', 'FastAPI', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
    gradient: 'from-cyan-600/15 via-indigo-600/10 to-transparent',
    borderGlow: 'group-hover:border-cyan-500/50',
    accentColor: 'cyan'
  },
  {
    id: 'ai-automation',
    category: 'ai',
    icon: <Brain size={26} />,
    badge: '🔥 Most Popular',
    badgeType: 'popular',
    title: 'AI Automation & Smart Workflows',
    simpleTitle: 'Automate Manual & Repetitive Business Tasks',
    tagline: 'Save 10+ Hours Every Week',
    description: 'Eliminate boring manual work like data entry, copy-pasting between apps, invoice processing, and lead follow-ups using autonomous AI workflows.',
    problem: 'Manual data entry, repetitive tasks, and disconnected software are slowing down your team and causing costly human mistakes.',
    features: [
      'Connect all your tools (Slack, Sheets, CRM, Gmail, WhatsApp)',
      'Automated invoice & document data extraction',
      'Autonomous multi-step AI agents for daily ops',
      'Zero manual errors & 24/7 background operation'
    ],
    result: '10+ hours saved per team member every single week',
    deliveryTime: '3 – 7 Days',
    stack: ['n8n', 'Python', 'OpenAI', 'Zapier', 'Make.com'],
    gradient: 'from-indigo-600/15 via-violet-600/10 to-transparent',
    borderGlow: 'group-hover:border-indigo-500/50',
    accentColor: 'indigo'
  },
  {
    id: 'chatbot',
    category: 'chatbots',
    icon: <Bot size={26} />,
    badge: '⭐ High Demand',
    badgeType: 'demand',
    title: '24/7 AI Customer Support Chatbots',
    simpleTitle: 'Smart AI Chatbot for Website & WhatsApp',
    tagline: 'Instant Automated Customer Replies',
    description: 'Intelligent AI assistant trained specifically on your business FAQs, catalog, and documents. It answers queries, books appointments, and captures leads 24/7 while you sleep.',
    problem: 'Losing high-intent sales because you cannot answer customer inquiries at night or on weekends, while your staff is overwhelmed by the same repetitive questions.',
    features: [
      'Trained on your private documents, PDFs & business knowledge',
      'Multi-channel: Works on Website, WhatsApp Business API & Telegram',
      'Automated meeting & appointment booking directly to your calendar',
      'Multilingual support (English, Hindi, and 20+ global languages)'
    ],
    result: '70% reduction in customer support tickets & instant replies',
    deliveryTime: '5 – 10 Days',
    stack: ['OpenAI GPT-4o', 'LangChain', 'Vector DB', 'WhatsApp API', 'Python'],
    gradient: 'from-emerald-600/15 via-teal-600/10 to-transparent',
    borderGlow: 'group-hover:border-emerald-500/50',
    accentColor: 'emerald'
  },
  {
    id: 'website',
    category: 'web',
    icon: <Globe size={26} />,
    badge: '🚀 High Converting',
    badgeType: 'full',
    title: 'High-Converting Websites & Sales Funnels',
    simpleTitle: 'Modern Website, Landing Page & Online Store',
    tagline: 'Turn Visitors into Paying Clients',
    description: 'Ultra-fast, mobile-friendly websites and sales funnels designed to turn clicks into sales calls. Perfect for startups, agencies, local businesses, and SaaS products.',
    problem: 'Your current website looks outdated, loads slowly on mobile phones, and fails to guide visitors toward buying or booking a call.',
    features: [
      '100/100 Google Lighthouse speed & mobile-first responsive UI',
      'Built-in AEO (AI Engine Optimization) & Google SEO for top ranking',
      'Seamless lead capture forms, WhatsApp buttons & CRM integration',
      'Clean modern design with dark/light mode and rich animations'
    ],
    result: 'Significantly higher conversion rate & under-1s page load speed',
    deliveryTime: '7 – 14 Days',
    stack: ['React.js', 'Next.js', 'Tailwind CSS', 'Django', 'TypeScript'],
    gradient: 'from-blue-600/15 via-cyan-600/10 to-transparent',
    borderGlow: 'group-hover:border-blue-500/50',
    accentColor: 'blue'
  },
  {
    id: 'design',
    category: 'branding',
    icon: <Palette size={26} />,
    badge: '🎨 Brand Identity',
    badgeType: 'brand',
    title: 'Logo & Professional Brand Identity',
    simpleTitle: 'Creative Logo, Social Graphics & Brand Kit',
    tagline: 'Stand Out with Premium Visuals',
    description: 'Clean, memorable logos and cohesive brand identities that make your business look authoritative, credible, and trustworthy across social media and web.',
    problem: 'Inconsistent graphics and generic DIY logos make your business look amateur, lowering trust with potential high-ticket clients.',
    features: [
      'Custom vector logo design with full copyright & vector source files',
      'Complete social media kit (Banners, profile avatars, post templates)',
      'Brand color palette, typography guidelines & stationery kit',
      'Ready for digital screens, mobile apps, and high-res printing'
    ],
    result: 'Recognizable, high-trust brand identity across all platforms',
    deliveryTime: '3 – 5 Days',
    stack: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Canva Pro'],
    gradient: 'from-rose-600/15 via-pink-600/10 to-transparent',
    borderGlow: 'group-hover:border-rose-500/50',
    accentColor: 'rose'
  },
];

const COMING_SOON = [
  { icon: <Instagram size={14} />, label: 'Social Media Management' },
  { icon: <Share2 size={14} />, label: 'Content Strategy & SEO Copy' },
  { icon: <Megaphone size={14} />, label: 'Paid Ads (Meta & Google)' },
];

/* ─── Schema injection for Services Page ─────────────────── */
const injectSchema = () => {
  const el = document.getElementById('services-jsonld');
  if (el) el.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'services-jsonld';
  const base = getActiveDomain();
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Services by Tushar Singh",
    "url": `${base}/services`,
    "numberOfItems": ACTIVE_SERVICES.length,
    "itemListElement": ACTIVE_SERVICES.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Service",
        "name": s.title,
        "description": s.description,
        "provider": {
          "@type": "Person",
          "@id": `${base}/#person`,
          "name": "Tushar Singh"
        },
        "areaServed": "Worldwide"
      }
    }))
  });
  document.head.appendChild(script);
};

/* ─── Main Component ─────────────────────────────────────── */
const Services: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'saas' | 'ai' | 'chatbots' | 'web' | 'branding'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    injectSchema();
    return () => { document.getElementById('services-jsonld')?.remove(); };
  }, []);

  const handleCTA = (s: ServiceDef) => {
    sessionStorage.setItem('selectedService', JSON.stringify({
      service: s.title,
      category: s.id,
      description: s.description
    }));
    navigate('/contact');
  };

  const filteredServices = activeTab === 'all'
    ? ACTIVE_SERVICES
    : ACTIVE_SERVICES.filter(s => s.category === activeTab);

  const FAQ_ITEMS = [
    {
      q: 'Which service should I pick if I am not from a technical background?',
      a: 'Don\'t worry at all! If you want a website or landing page for your business, pick "Website & Funnel". If you want automated 24/7 replies on WhatsApp or your website, pick "AI Chatbot". If you want to connect your apps and eliminate manual work, pick "AI Automation". You can also book a free 30-min consultation and Tushar will recommend the exact solution for your budget.'
    },
    {
      q: 'Can I hire Tushar through Fiverr with Escrow & Buyer Protection?',
      a: 'Yes! You can order directly through my official Fiverr profile (fiverr.com/s/zAd5R2z) where your payment is held securely in escrow until you are 100% satisfied with the deliverables.'
    },
    {
      q: 'How fast can a project be delivered?',
      a: 'Automations and branding packages are typically delivered within 3 to 7 business days. Custom AI chatbots take 5 to 10 days, and full-stack web applications or MVPs take 7 to 14 days.'
    },
    {
      q: 'Do you provide post-launch support and training?',
      a: 'Yes! Every project includes hands-on Loom video walkthroughs, system documentation, and 30 days of free ongoing support to ensure everything runs smoothly.'
    },
    {
      q: 'How do we communicate during the project?',
      a: 'We communicate via WhatsApp, Email, or Slack with guaranteed response times under 1 hour. We also conduct weekly or milestone video check-ins via Google Meet.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* ── 1. HERO SECTION ─────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-5 sm:px-10 overflow-hidden border-b border-slate-100 dark:border-white/5">
        {/* Ambient Glowing Aura */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-teal-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          {/* Trust Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <Sparkles size={12} className="text-indigo-500 animate-pulse" />
              <span>Full-Stack &amp; AI Engineering</span>
            </div>
            <FiverrBadge variant="pill" />
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>10+ Client Deliverables • 4.0★</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.15] speakable">
            Everything You Need to <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">
              Automate &amp; Scale Your Business
            </span>
          </h1>

          {/* Subheading in Plain English */}
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            From modern high-converting websites and 24/7 smart WhatsApp chatbots to automated background workflows — tailored solutions built to save you hours and drive real revenue.
          </p>

          {/* CTA & Share Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-indigo-600/25 active:scale-95 cursor-pointer"
            >
              <span>Book Free 30-Min Audit</span>
              <ChevronRight size={15} />
            </button>
            <a
              href={FIVERR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all duration-200 border border-slate-700 active:scale-95"
            >
              <FiverrIcon size={16} />
              <span>Hire with Escrow</span>
              <ArrowUpRight size={14} className="text-emerald-400" />
            </a>
            <SharePageButton
              title="AI Automation & Web Development Services | Tushar Singh"
              text="Explore top AI automation, chatbot, and full-stack development services by Tushar Singh"
              buttonLabel="Share"
            />
          </div>
        </div>
      </section>

      {/* ── 2. FILTER TABS ─────────────────────────────────── */}
      <section className="py-8 px-5 sm:px-10 sticky top-16 z-40 bg-white/85 dark:bg-slate-950/85 backdrop-blur-xl border-b border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All Services', icon: <Layers size={14} /> },
            { id: 'saas', label: 'Custom SaaS & MVPs', icon: <Rocket size={14} /> },
            { id: 'ai', label: 'AI Automation', icon: <Brain size={14} /> },
            { id: 'chatbots', label: 'Smart Chatbots', icon: <Bot size={14} /> },
            { id: 'web', label: 'Websites & Funnels', icon: <Globe size={14} /> },
            { id: 'branding', label: 'Branding & Logo', icon: <Palette size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 scale-100'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── 3. SERVICE CARDS GRID ───────────────────────────── */}
      <section className="py-16 sm:py-20 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredServices.map((s) => (
              <div
                key={s.id}
                className={`group relative bg-white dark:bg-slate-900/80 rounded-3xl p-7 sm:p-9 border border-slate-200/90 dark:border-white/10 ${s.borderGlow} shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-400 flex flex-col justify-between overflow-hidden`}
              >
                {/* Top Decorative Gradient Accent */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${s.accentColor === 'indigo' ? 'from-indigo-500 via-violet-500 to-indigo-600' : s.accentColor === 'emerald' ? 'from-emerald-500 via-teal-400 to-green-500' : s.accentColor === 'blue' ? 'from-blue-500 via-cyan-400 to-indigo-500' : 'from-rose-500 via-pink-400 to-orange-400'}`} />

                <div>
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md ${
                      s.accentColor === 'indigo' ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30' :
                      s.accentColor === 'emerald' ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30' :
                      s.accentColor === 'blue' ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30' :
                      'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30'
                    }`}>
                      {s.icon}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {s.badge}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock size={11} /> Turnaround: {s.deliveryTime}
                      </span>
                    </div>
                  </div>

                  {/* Title and Plain English Sub-Heading */}
                  <p className="text-[11px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
                    {s.tagline}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-outfit font-black text-slate-950 dark:text-white mb-2 leading-snug">
                    {s.title}
                  </h2>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-4">
                    👉 {s.simpleTitle}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                    {s.description}
                  </p>

                  {/* Problem Callout Box */}
                  <div className="flex gap-3 p-3.5 bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/30 rounded-2xl mb-6">
                    <AlertCircle size={15} className="text-rose-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider">The Problem It Solves</p>
                      <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed mt-0.5">{s.problem}</p>
                    </div>
                  </div>

                  {/* Key Deliverables / What You Get */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">What You Receive:</p>
                    {s.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200 font-medium">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={11} />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Impact Result Box */}
                  <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-500/20 mb-6">
                    <TrendingUp size={15} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <p className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">{s.result}</p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-8">
                    {s.stack.map((stk) => (
                      <span key={stk} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold">
                        {stk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button
                    onClick={() => handleCTA(s)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Get Free Quote</span>
                    <ArrowRight size={13} />
                  </button>
                  <a
                    href={FIVERR_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-3.5 px-3 bg-[#1DBF73]/10 hover:bg-[#1DBF73] text-[#1DBF73] hover:text-white border border-[#1DBF73]/40 hover:border-[#1DBF73] rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all duration-200 active:scale-95"
                  >
                    <FiverrIcon size={14} />
                    <span>Order on Fiverr</span>
                    <ArrowUpRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 4-STEP PROCESS / HOW WE WORK ─────────────────── */}
      <section className="py-20 px-5 sm:px-10 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-3 py-1.5 rounded-full border border-indigo-200 dark:border-indigo-500/30">
              Simple &amp; Transparent
            </span>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              How We Work Together (4 Simple Steps)
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              From our first discovery message to full deployment — zero confusion, regular updates, and measurable results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Free 30-Min Audit',
                desc: 'We hop on a quick call or WhatsApp chat to understand your bottlenecks, goals, and exact project needs.',
                icon: <PhoneCall size={20} className="text-indigo-500" />
              },
              {
                step: '02',
                title: 'Custom Scope & Fixed Price',
                desc: 'You receive a clear scope document with exact milestones, delivery timeline, and transparent pricing. No surprises.',
                icon: <ShieldCheck size={20} className="text-emerald-500" />
              },
              {
                step: '03',
                title: 'Rapid Build & Previews',
                desc: 'We build your solution with live staging previews so you test everything and share real-time feedback.',
                icon: <Code2 size={20} className="text-violet-500" />
              },
              {
                step: '04',
                title: 'Launch & 30-Day Support',
                desc: 'Full deployment on your domain or server, complete video walkthrough training, and 30 days of free ongoing support.',
                icon: <Rocket size={20} className="text-amber-500" />
              },
            ].map((st) => (
              <div
                key={st.step}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 space-y-3 relative shadow-xs"
              >
                <span className="text-4xl font-outfit font-black text-slate-200 dark:text-slate-800 block">
                  {st.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {st.icon}
                </div>
                <h3 className="font-outfit font-black text-base text-slate-950 dark:text-white">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. COMING SOON EXPANSION ────────────────────────── */}
      <section className="py-12 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-3xl border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-amber-400" />
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Upcoming Expansions</span>
              </div>
              <h3 className="text-xl font-outfit font-black text-white">Need Social Media &amp; Paid Ads?</h3>
              <p className="text-xs text-slate-300 mt-1">Expanding our marketing suite with dedicated growth services.</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {COMING_SOON.map((cs) => (
                <span key={cs.label} className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-bold text-slate-200 backdrop-blur-md">
                  {cs.icon} {cs.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. ACCORDION FAQ SECTION ────────────────────────── */}
      <section className="py-16 px-5 sm:px-10 bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Got Questions?</span>
            <h2 className="text-2xl sm:text-3xl font-outfit font-black text-slate-950 dark:text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-outfit font-bold text-sm text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronRight size={18} className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90 text-indigo-600' : 'text-slate-400'}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. FOOTER HIGH-CONVERTING CTA ──────────────────── */}
      <section className="py-20 px-5 sm:px-10 text-center relative overflow-hidden bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Guaranteed Response &lt; 1 Hour</span>
          </span>

          <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white tracking-tight">
            Ready to Build Your Solution?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg mx-auto">
            Book a free 30-minute AI strategy audit, send a direct WhatsApp message, or hire securely on Fiverr with 100% buyer escrow protection.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-indigo-600/30 active:scale-95 cursor-pointer"
            >
              <span>Book Free Consultation</span>
              <ChevronRight size={16} />
            </button>
            <a
              href="https://wa.me/918851619647"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-600/30 active:scale-95"
            >
              <MessageSquare size={16} />
              <span>Direct WhatsApp</span>
            </a>
            <a
              href={FIVERR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#1DBF73] hover:bg-[#19a463] text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl shadow-emerald-600/30 active:scale-95"
            >
              <FiverrIcon size={16} className="brightness-125" />
              <span>Order on Fiverr</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
            Available Worldwide · Mon–Sat · Escrow Protected
          </p>
        </div>
      </section>

    </div>
  );
};

export default Services;
