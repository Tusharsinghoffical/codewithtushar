import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain, Bot, Globe, Palette, ArrowRight, CheckCircle2,
  TrendingUp, AlertCircle, Sparkles, Clock, ChevronRight,
  Instagram, Share2, Megaphone
} from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────── */
interface ServiceDef {
  id: string;
  icon: React.ReactNode;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  features: string[];
  result: string;
  stack: string[];
  color: string;
  accent: string;
}

/* ─── Service Data (4 active + coming soon) ─────────────── */
const ACTIVE_SERVICES: ServiceDef[] = [
  {
    id: 'ai-automation',
    icon: <Brain size={24} />,
    badge: 'Most Popular',
    title: 'AI Automation',
    tagline: 'Scale Your Workflows',
    description: 'Eliminate manual tasks and optimise operations using autonomous AI agents and intelligent end-to-end workflows.',
    problem: 'Manual data entry, repetitive copy-pasting, and disconnected tools are slowing your growth and causing costly errors.',
    features: ['Workflow Automation', 'AI Agent Integration', 'System Connectivity', 'Process Scoping'],
    result: '10+ hours saved per team member every week',
    stack: ['n8n', 'OpenAI', 'Python', 'Zapier'],
    color: 'from-indigo-500/10 to-violet-500/5',
    accent: 'indigo',
  },
  {
    id: 'chatbot',
    icon: <Bot size={24} />,
    badge: 'High Demand',
    title: 'Chatbot Development',
    tagline: '24/7 Support Assistant',
    description: 'Intelligent AI assistants trained on your business data that handle inquiries, book appointments, and qualify leads around the clock.',
    problem: 'Your business is losing sales because you cannot respond to inquiries 24/7 and your team is overwhelmed by repetitive questions.',
    features: ['Custom Knowledge Base', 'Multilingual Support', 'Appointment Booking', 'CRM Integration'],
    result: '70% reduction in support ticket volume',
    stack: ['OpenAI', 'LangChain', 'Vector DB', 'Voiceflow'],
    color: 'from-emerald-500/10 to-teal-500/5',
    accent: 'emerald',
  },
  {
    id: 'website',
    icon: <Globe size={24} />,
    badge: 'Full Service',
    title: 'Website & Funnel Building',
    tagline: 'High-Conversion UI',
    description: 'Professional websites and sales funnels built for results — digital experiences that turn visitors into paying customers.',
    problem: 'Your website looks outdated and does not convert. Traffic is wasted on pages that do not guide users toward a clear purchase or call.',
    features: ['Sales Funnel Design', 'A/B Testing', 'Speed Optimisation', 'Landing Page Strategy'],
    result: 'Significant increase in website conversion rate',
    stack: ['React', 'Next.js', 'Tailwind', 'Django'],
    color: 'from-blue-500/10 to-cyan-500/5',
    accent: 'blue',
  },
  {
    id: 'design',
    icon: <Palette size={24} />,
    badge: 'Brand Identity',
    title: 'Logo & Graphic Design',
    tagline: 'Professional Branding',
    description: 'Creative logo design and branding solutions that establish a strong, memorable visual identity for your business or personal brand.',
    problem: 'Your brand lacks a professional visual identity. Inconsistent design and outdated logos are weakening your market presence.',
    features: ['Logo Design', 'Brand Identity', 'Social Media Graphics', 'Marketing Materials'],
    result: 'Professional, memorable brand identity delivered',
    stack: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Canva'],
    color: 'from-rose-500/10 to-pink-500/5',
    accent: 'rose',
  },
];

const COMING_SOON = [
  { icon: <Instagram size={14} />, label: 'Social Media Management' },
  { icon: <Share2 size={14} />, label: 'Content Strategy' },
  { icon: <Megaphone size={14} />, label: 'Paid Ads (Meta & Google)' },
];

/* ─── Schema injection ───────────────────────────────────── */
const injectSchema = () => {
  const el = document.getElementById('services-jsonld');
  if (el) el.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'services-jsonld';
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Services by Tushar Singh",
    "url": "https://codewithmrsingh.me/services",
    "numberOfItems": ACTIVE_SERVICES.length,
    "itemListElement": ACTIVE_SERVICES.map((s, i) => ({
      "@type": "ListItem", "position": i + 1,
      "item": { "@type": "Service", "name": s.title, "description": s.description,
        "provider": { "@type": "Person", "@id": "https://codewithmrsingh.me/#person", "name": "Tushar Singh" },
        "areaServed": "Worldwide"
      }
    }))
  });
  document.head.appendChild(script);
};

/* ─── Accent helpers ─────────────────────────────────────── */
const ICON_BG: Record<string, string> = {
  indigo: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white',
  blue:    'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white',
  rose:    'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 group-hover:bg-rose-600 group-hover:text-white',
};
const BADGE_COLOR: Record<string, string> = {
  indigo: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-400/20',
  emerald:'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-400/20',
  blue:   'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-400/20',
  rose:   'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-400/20',
};

/* ─── Service Card ───────────────────────────────────────── */
const ServiceCard = ({ s, onCTA }: { s: ServiceDef; onCTA: () => void }) => (
  <div className={`group relative bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/60 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-400`}>
    {/* top gradient strip */}
    <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${s.color.replace('/10','').replace('/5','')}`} />

    <div className="p-7 sm:p-8">
      {/* Icon + badge row */}
      <div className="flex items-start justify-between mb-6">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${ICON_BG[s.accent]}`}>
          {s.icon}
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${BADGE_COLOR[s.accent]}`}>
          {s.badge}
        </span>
      </div>

      {/* Title */}
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.tagline}</p>
      <h2 className="text-xl font-outfit font-extrabold text-slate-900 dark:text-white mb-3">{s.title}</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">{s.description}</p>

      {/* Problem */}
      <div className="flex gap-2.5 p-3.5 bg-rose-50/60 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/20 rounded-2xl mb-5">
        <AlertCircle size={13} className="text-rose-500 mt-0.5 shrink-0" />
        <p className="text-[11px] text-rose-700 dark:text-rose-400 font-medium leading-relaxed">{s.problem}</p>
      </div>

      {/* Features */}
      <ul className="space-y-2 mb-5">
        {s.features.slice(0, 3).map(f => (
          <li key={f} className="flex items-center gap-2 text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" /> {f}
          </li>
        ))}
      </ul>

      {/* Result */}
      <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/20 rounded-xl mb-6">
        <TrendingUp size={12} className="text-emerald-600 shrink-0" />
        <p className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400">{s.result}</p>
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {s.stack.map(t => (
          <span key={t} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] font-bold rounded-lg">{t}</span>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onCTA}
        className="group/btn w-full flex items-center justify-center gap-2 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all active:scale-95"
        aria-label={`Get quote for ${s.title}`}
      >
        Get Quote <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const Services: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    injectSchema();
    return () => { document.getElementById('services-jsonld')?.remove(); };
  }, []);

  const handleCTA = (s: ServiceDef) => {
    sessionStorage.setItem('selectedService', JSON.stringify({
      service: s.title, category: s.id, description: s.description
    }));
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-5 sm:px-10 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-5">
            <Sparkles size={11} /> Expert Freelance Services
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight mb-4 speakable">
            AI Automation &amp; <span className="text-indigo-600 dark:text-indigo-400">Web Development</span> Services
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Tushar Singh offers expert <strong className="text-slate-700 dark:text-slate-200">AI automation</strong>, <strong className="text-slate-700 dark:text-slate-200">chatbot development</strong>, <strong className="text-slate-700 dark:text-slate-200">website &amp; funnel building</strong>, and <strong className="text-slate-700 dark:text-slate-200">branding</strong> — serving clients across India and worldwide.
          </p>
        </div>
      </section>

      {/* ── SERVICE CARDS ───────────────────────────────────── */}
      <section className="py-16 sm:py-20 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {ACTIVE_SERVICES.map(s => (
              <ServiceCard key={s.id} s={s} onCTA={() => handleCTA(s)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON ─────────────────────────────────────── */}
      <section className="pb-16 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="p-6 sm:p-8 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 border-dashed rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="shrink-0">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={13} className="text-amber-500" />
                  <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">Coming Soon</span>
                </div>
                <p className="text-base font-outfit font-extrabold text-slate-900 dark:text-white">More Services Launching</p>
                <p className="text-xs text-slate-400 mt-0.5">Expanding capabilities — stay tuned</p>
              </div>
              <div className="flex flex-wrap gap-2.5 sm:ml-auto">
                {COMING_SOON.map(cs => (
                  <span key={cs.label} className="flex items-center gap-1.5 px-3.5 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    {cs.icon} {cs.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-14 px-5 sm:px-10 bg-slate-50/50 dark:bg-slate-900/20 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-outfit font-extrabold text-slate-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { q: 'What AI automation services does Tushar Singh offer?', a: 'Custom n8n and Python-based workflows, AI agents, RAG chatbots using OpenAI and LangChain, WhatsApp bots, and end-to-end business process automation that saves 10+ hours per week.' },
              { q: 'How much does chatbot development cost?', a: 'Chatbot projects start from ₹80,000 for a simple FAQ bot to ₹3,00,000+ for a full RAG-based AI agent with CRM integration. Contact via WhatsApp for a custom quote.' },
              { q: 'Does Tushar Singh build full-stack web applications?', a: 'Yes — React.js, Next.js, Django, and Python. Projects include startup MVPs, e-commerce platforms, SaaS dashboards, and agency white-label solutions.' },
              { q: 'What does branding and logo design include?', a: 'Complete brand identity — primary logo, variations, colour palette, typography, social media graphics, and marketing material templates. Delivered via Figma and Adobe suite.' },
            ].map(({ q, a }) => (
              <div key={q} className="p-5 bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-2xl" itemScope itemType="https://schema.org/Question">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2" itemProp="name">{q}</h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed" itemProp="text">{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ──────────────────────────────────────── */}
      <section className="py-14 px-5 sm:px-10 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-outfit font-extrabold text-slate-900 dark:text-white mb-3">Need a custom solution?</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">Book a free 30-minute AI automation audit — completely free, no obligations.</p>
          <p className="text-xs text-slate-400 mb-7">
            WhatsApp: <a href="https://wa.me/918851619647" className="text-emerald-600 dark:text-emerald-400 font-bold underline">+91-8851619647</a>
            &nbsp;·&nbsp; Email: <a href="mailto:tusharsinghkumar04@gmail.com" className="text-indigo-600 dark:text-indigo-400 font-bold underline">tusharsinghkumar04@gmail.com</a>
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
          >
            Book Free Consultation <ChevronRight size={14} />
          </button>
          <p className="text-[9px] text-slate-400 mt-4 uppercase tracking-widest font-bold">Available Worldwide · Mon–Sat</p>
        </div>
      </section>

    </div>
  );
};

export default Services;
