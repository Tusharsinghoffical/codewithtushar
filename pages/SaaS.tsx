import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Folder, FolderOpen, ArrowRight, ArrowUpRight, Sparkles,
  ShieldCheck, Lock, Star, Zap, Bot, Layers, CheckCircle2,
  ExternalLink, Terminal, Server, Clock, Users, Database,
  Cpu, GitBranch, FileText, ChevronRight, BarChart3, Globe,
  Shield, Check, ArrowDownRight, Eye
} from 'lucide-react';
import { TASQ_ONE_URL, TASQ_ONE_DOCKER_IMAGE } from '../constants';

interface SaasProduct {
  id: string;
  name: string;
  folderSlug: string;
  category: string;
  status: 'live' | 'beta' | 'incubation';
  statusText: string;
  version: string;
  oneLiner: string;
  description: string;
  logoUrl?: string;
  detailUrl: string;
  liveDemoUrl?: string;
  techStack: string[];
  metrics: { label: string; value: string }[];
  highlights: string[];
  isFlagship?: boolean;
}

const SAAS_PRODUCTS: SaasProduct[] = [
  {
    id: 'tasq-one',
    name: 'TASQ-ONE',
    folderSlug: 'tasq-one',
    category: 'Autonomous Task OS & DAG Workflow',
    status: 'live',
    statusText: 'PUBLIC BETA LIVE',
    version: 'v1.4.0',
    oneLiner: 'The Intelligent Task Operating System turning loosely defined ideas into production-ready tasks in seconds.',
    description: 'Cloud-native SaaS platform featuring Groq Llama 3.3 70B AI task decomposition, real-time Kanban dependency DAGs, cryptographic audit trails, PostgreSQL Row-Level Security, and an Indian market ROI calculator saving ₹48,000+/mo for engineering teams.',
    logoUrl: '/tasq-one/tasq-one-banner.png',
    detailUrl: '/saas/tasq-one',
    liveDemoUrl: TASQ_ONE_URL,
    techStack: ['Next.js 14', 'Groq Llama 3.3', 'Supabase Postgres RLS', 'Upstash Redis', 'Docker'],
    metrics: [
      { label: 'Onboarding', value: '< 5 Mins' },
      { label: 'AI Latency', value: '< 400ms' },
      { label: 'Cost Savings', value: '₹48k/mo' },
      { label: 'Audit Security', value: 'SHA-256' },
    ],
    highlights: [
      'Sub-second Groq Llama 3.3 70B task decomposition',
      'Topological acyclic Kanban dependency DAG enforcement',
      'Immutable cryptographic audit ledger for DPDP & SOC2',
      'Hardware-isolated PostgreSQL Row-Level Security (RLS)',
      'Multi-channel real-time alerts via Slack & Resend email'
    ],
    isFlagship: true
  },
  {
    id: 'leadflow-ai',
    name: 'LeadFlow AI',
    folderSlug: 'leadflow-ai',
    category: 'Autonomous B2B Prospecting & Outreach',
    status: 'beta',
    statusText: 'CLOSED BETA · SELECT PARTNERS',
    version: 'v0.9.2',
    oneLiner: 'AI autonomous pipeline that scours high-intent B2B data and executes personalized multi-touch funnels.',
    description: 'Autonomous scraping and enrichment engine powered by Apollo and vector embeddings that discovers qualified buyers and sends dynamic personalized sequences with automated follow-ups.',
    detailUrl: '/contact',
    techStack: ['Python', 'LangChain', 'OpenAI', 'Apollo API', 'Smartlead'],
    metrics: [
      { label: 'Lead Accuracy', value: '98.4%' },
      { label: 'Booking Rate', value: '4.2x' },
      { label: 'Daily Enrichment', value: '5k+ Records' },
      { label: 'Status', value: 'VIP Beta' }
    ],
    highlights: [
      'Automated intent scoring and LinkedIn verification',
      'Dynamic email copy generation with zero template fatigue',
      'Deliverability safeguard with automated mailbox warmups'
    ]
  },
  {
    id: 'docuparse-vault',
    name: 'DocuParse Vault',
    folderSlug: 'docuparse-ocr',
    category: 'Cryptographic Invoice & DPDP Compliance',
    status: 'incubation',
    statusText: 'R&D INCUBATION',
    version: 'v0.5.0-alpha',
    oneLiner: 'AI-assisted document intelligence and GST invoice auditing pipeline with cryptographic proof of custody.',
    description: 'Extracts structured data from chaotic PDFs, receipts, and multi-lingual Indian invoices with sub-second optical character recognition and tamper-proof hash logging.',
    detailUrl: '/contact',
    techStack: ['FastAPI', 'PyTorch OCR', 'Cloudflare R2', 'PostgreSQL'],
    metrics: [
      { label: 'Parsing Time', value: '1.2s / doc' },
      { label: 'Data Accuracy', value: '99.1%' },
      { label: 'Compliance', value: 'Indian DPDP' },
      { label: 'Pipeline', value: 'Zero Data Retention' }
    ],
    highlights: [
      'Multi-lingual Indian business invoice table extraction',
      'Cryptographic hash generation for tax audit defense',
      'Direct API webhook dispatch into tally & ERP systems'
    ]
  }
];

export const SaaS: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'live' | 'beta' | 'incubation'>('all');
  const [expandedFolder, setExpandedFolder] = useState<string | null>('tasq-one');

  const filteredProducts = SAAS_PRODUCTS.filter((product) => {
    if (filter === 'all') return true;
    return product.status === filter;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      
      {/* ── Background Ambient Glow & Grid ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] sm:w-[950px] h-[500px] bg-gradient-to-tr from-indigo-500/10 via-violet-500/10 to-sky-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-20 space-y-16 sm:space-y-24">

        {/* ═══════════════════════ 1. HUB HEADER ═══════════════════════ */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400 font-outfit">
              Tushar Singh Labs · Proprietary SaaS Directory
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.15]">
              Autonomous Cloud Suites &amp;{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                SaaS Product Portfolio
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore production-ready software tools engineered by Tushar Singh Labs. Click any product folder to view complete technical specs, interactive sandboxes, and deployment guides.
            </p>
          </div>

          {/* Directory Breadcrumb Bar */}
          <div className="inline-flex items-center gap-2 p-2 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 shadow-xs">
            <Terminal size={14} className="text-indigo-500" />
            <span>Path:</span>
            <span className="font-bold text-slate-900 dark:text-white">~/tushar-singh-labs/saas-products/</span>
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold">
              {SAAS_PRODUCTS.length} Folders
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {[
              { id: 'all', label: 'All Product Folders' },
              { id: 'live', label: '🟢 Live Beta (1)' },
              { id: 'beta', label: '🟡 Closed Beta (1)' },
              { id: 'incubation', label: '🟣 In Development (1)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </section>

        {/* ═══════════════════════ 2. FOLDERS / SUITES SHOWCASE ═══════════════════════ */}
        <section className="space-y-8">
          
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-outfit">
              <Folder size={16} className="text-indigo-600 dark:text-indigo-400" />
              <span>Available Product Folders &amp; Suites ({filteredProducts.length})</span>
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400 hidden sm:inline">
              Click folder to inspect details or launch
            </span>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {filteredProducts.map((product) => {
              const isExpanded = expandedFolder === product.id;

              return (
                <div
                  key={product.id}
                  className={`rounded-3xl transition-all duration-300 overflow-hidden border ${
                    product.isFlagship
                      ? 'bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/20'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 shadow-sm'
                  }`}
                >
                  
                  {/* Folder Tab / Title Header */}
                  <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800/80">
                    
                    <div className="flex items-start sm:items-center gap-4">
                      
                      {/* Folder Icon / Logo Icon */}
                      <div className="relative p-3.5 sm:p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                        {isExpanded ? <FolderOpen size={28} /> : <Folder size={28} />}
                        {product.isFlagship && (
                          <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900" />
                          </span>
                        )}
                      </div>

                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="text-2xl font-outfit font-black text-slate-950 dark:text-white">
                            {product.name}
                          </h2>
                          <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
                            /{product.folderSlug}
                          </span>
                          
                          {/* Status Badge */}
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              product.status === 'live'
                                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                                : product.status === 'beta'
                                ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                                : 'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800'
                            }`}
                          >
                            {product.statusText}
                          </span>

                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {product.version}
                          </span>
                        </div>

                        <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                          {product.category}
                        </div>
                      </div>

                    </div>

                    {/* Quick Action Buttons for Folder */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      
                      <button
                        onClick={() => setExpandedFolder(isExpanded ? null : product.id)}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                      >
                        <Eye size={14} />
                        <span>{isExpanded ? 'Fold Preview' : 'Peek Folder'}</span>
                      </button>

                      {product.liveDemoUrl && (
                        <a
                          href={product.liveDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                        >
                          <span>Launch Demo</span>
                          <ExternalLink size={13} />
                        </a>
                      )}

                      <Link
                        to={product.detailUrl}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-outfit font-black uppercase tracking-wider shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                      >
                        <span>Open Folder Page</span>
                        <ArrowRight size={14} />
                      </Link>

                    </div>

                  </div>

                  {/* Folder Contents / Preview Body */}
                  {isExpanded && (
                    <div className="p-6 sm:p-8 space-y-6">
                      
                      {/* Brand Logo Thumbnail if Available */}
                      {product.logoUrl && (
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
                          <div className="p-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs max-w-[160px] sm:max-w-[200px]">
                            <img
                              src={product.logoUrl}
                              alt={`${product.name} Logo`}
                              className="w-full h-auto object-contain max-h-10 dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                            />
                          </div>
                          <div className="space-y-0.5">
                            <div className="text-xs font-bold text-slate-950 dark:text-white">
                              Official Software Identity
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Hosted on Render Cloud · Public Demo &amp; Docker Image Ready
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed max-w-4xl">
                        {product.description}
                      </p>

                      {/* Metrics Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {product.metrics.map((metric, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 text-center sm:text-left"
                          >
                            <span className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400 block">
                              {metric.label}
                            </span>
                            <span className="text-base font-outfit font-extrabold text-slate-950 dark:text-white">
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Key Capabilities Bullet Points */}
                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                          Folder Manifest &amp; Key Highlights:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 p-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/60 border border-slate-200/60 dark:border-slate-800/60"
                            >
                              <CheckCircle2 size={14} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-500">Tech Stack:</span>
                        {product.techStack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Direct CTA Inside Folder */}
                      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          {product.isFlagship
                            ? '⭐ Flagship SaaS: Full interactive sandbox, ROI calculator & Docker commands available.'
                            : '⚡ Custom enterprise implementation available upon request.'}
                        </span>

                        <Link
                          to={product.detailUrl}
                          className="inline-flex items-center gap-1.5 text-xs font-outfit font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 group"
                        >
                          <span>Explore Detailed {product.name} Documentation</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </section>

        {/* ═══════════════════════ 3. QUICK FEATURE SPOTLIGHT BANNER ═══════════════════════ */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white border border-indigo-500/20 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} /> Featured Production Release
              </div>
              <h3 className="text-2xl sm:text-4xl font-outfit font-black tracking-tight">
                Want to See TASQ-ONE in Action?
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl">
                Open the dedicated TASQ-ONE product page to test our live Groq Llama 3.3 70B AI decomposition playground, run our interactive Indian market ROI calculator, and copy ready-to-use Docker deployment snippets.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/saas/tasq-one"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-outfit font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all text-center"
              >
                <span>Open /saas/tasq-one Folder →</span>
              </Link>

              <a
                href={TASQ_ONE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all text-center"
              >
                <span>Launch Live Demo</span>
                <ExternalLink size={14} />
              </a>
            </div>

          </div>
        </section>

        {/* ═══════════════════════ 4. CUSTOM SAAS DEVELOPMENT BANNER ═══════════════════════ */}
        <section className="text-center p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-6 max-w-3xl mx-auto">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-3xl font-outfit font-black text-slate-950 dark:text-white">
              Need a Custom White-Label SaaS Platform?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
              Tushar Singh architects, builds, and deploys scalable full-stack SaaS MVPs in Next.js, Python, PostgreSQL, and Supabase. From multi-tenancy to AI automation pipelines.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-outfit font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/20 transition-all"
            >
              Book 30-Min SaaS Architecture Call
            </Link>
            <a
              href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20hire%20you%20to%20build%20a%20custom%20SaaS%20application!"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
            >
              Direct WhatsApp Inquiry
            </a>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SaaS;
