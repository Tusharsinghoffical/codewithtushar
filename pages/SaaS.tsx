import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket, Sparkles, ShieldCheck, Lock, Star, ArrowRight, ArrowUpRight,
  Zap, Bot, Layers, CheckCircle2, ChevronRight, Copy, Check,
  Terminal, Server, ExternalLink, Users, DollarSign, RefreshCw,
  Cpu, GitBranch, FileText, Database, Play, MessageSquare,
  Search, Filter, SlidersHorizontal, LayoutGrid, List, PlusCircle,
  HelpCircle, Code2, Globe, Shield, BarChart3, Clock, CheckSquare
} from 'lucide-react';
import { SAAS_PRODUCTS, TASQ_ONE_URL, TASQ_ONE_DOCKER_IMAGE } from '../constants';
import { SaasProduct } from '../types';

export const SaaS: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'cards' | 'specs'>('cards');
  const [selectedProductForDrawer, setSelectedProductForDrawer] = useState<SaasProduct | null>(null);
  const [copiedDockerId, setCopiedDockerId] = useState<string | null>(null);

  // Dynamic categories extracted from SAAS_PRODUCTS
  const categories = useMemo(() => {
    const set = new Set<string>();
    set.add('All');
    SAAS_PRODUCTS.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set);
  }, []);

  // Filter products by search and category
  const filteredProducts = useMemo(() => {
    return SAAS_PRODUCTS.filter(product => {
      const matchCat = activeCategory === 'All' || product.category === activeCategory;
      const matchSearch = searchQuery.trim() === '' ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [searchQuery, activeCategory]);

  const copyDockerCommand = (cmd: string, id: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedDockerId(id);
    setTimeout(() => setCopiedDockerId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      
      {/* ── Background Ambient Glow & Grid ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1050px] h-[520px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-sky-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-24 space-y-12 sm:space-y-16">

        {/* ═══════════════════════ 1. COMMAND & STATUS DECK HEADER ═══════════════════════ */}
        <section className="space-y-6 text-center max-w-4xl mx-auto pt-2">
          
          {/* Status Network Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xs backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200 font-outfit">
              Tushar Singh Labs · Proprietary SaaS Ecosystem
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.12]">
              Cloud-Native SaaS Suites &amp;{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                Software Platforms
              </span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Explore autonomous, production-ready SaaS tools developed by Tushar Singh. Test live interactive simulations, calculate team ROI, inspect technical architectures, or launch directly in cloud.
            </p>
          </div>

          {/* Quick Metrics Ticker Deck */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Sparkles size={14} className="text-indigo-500" />
              <span>Llama 3.3 70B AI Integration</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>PostgreSQL Row-Level Security</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Terminal size={14} className="text-violet-500" />
              <span>Self-Hostable Docker Images</span>
            </span>
          </div>

        </section>

        {/* ═══════════════════════ 2. SAAS FILTER & SEARCH TOOLBAR ═══════════════════════ */}
        <section className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-sm space-y-4">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search SaaS by name, keyword, AI model, or tech stack..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'cards'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LayoutGrid size={14} />
                <span>Showcase View</span>
              </button>
              <button
                onClick={() => setViewMode('specs')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'specs'
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <List size={14} />
                <span>Architecture Specs</span>
              </button>
            </div>

          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1 mr-1">
              <Filter size={12} /> Filter:
            </span>
            {categories.map((cat) => {
              const count = cat === 'All'
                ? SAAS_PRODUCTS.length
                : SAAS_PRODUCTS.filter(p => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeCategory === cat
                      ? 'bg-indigo-700 text-indigo-100'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </section>

        {/* ═══════════════════════ 3. DYNAMIC SAAS PRODUCT CARDS ═══════════════════════ */}
        <section className="space-y-8">
          
          <div className="flex items-center justify-between">
            <div className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-slate-400 font-outfit">
              Showing {filteredProducts.length} SaaS Product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
              Production-Ready &amp; Fully Hosted
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 space-y-3">
              <Search className="mx-auto text-slate-400" size={32} />
              <h3 className="text-lg font-outfit font-black text-slate-950 dark:text-white">
                No SaaS products matched your search.
              </h3>
              <p className="text-xs text-slate-500">
                Try searching for "TASQ-ONE", "Llama", or clear the search query.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : viewMode === 'cards' ? (
            
            /* ── VIEW MODE 1: COMPACT, SLEEK SHOWCASE CARDS ── */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 hover:border-indigo-500/50 shadow-md hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Subtle Top Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                  <div className="space-y-4">
                    {/* Header Row: Logo Avatar + Meta + Status Pill */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-slate-950 border border-slate-800 dark:border-white/10 flex items-center justify-center p-1.5 shadow-sm shrink-0 overflow-hidden group-hover:scale-105 transition-transform">
                          <img
                            src={product.bannerImage}
                            alt={`${product.title} icon`}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-outfit">
                              {product.category}
                            </span>
                            <span className="font-mono text-[10px] text-slate-500 dark:text-slate-400 px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800">
                              {product.version}
                            </span>
                          </div>
                          <h2 className="text-lg font-outfit font-black text-slate-950 dark:text-white tracking-tight leading-snug">
                            {product.title}
                          </h2>
                        </div>
                      </div>

                      {/* Live Status Pill */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        <span>Live</span>
                      </span>
                    </div>

                    {/* Tagline & Short Description */}
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 line-clamp-1">
                        {product.tagline}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Compact 4-Metric Strip */}
                    <div className="grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200/70 dark:border-slate-800/80 text-center">
                      {product.metrics.map((metric, idx) => (
                        <div key={idx} className="min-w-0">
                          <span className="text-[9px] uppercase font-bold text-slate-500 dark:text-slate-400 block truncate">
                            {metric.label}
                          </span>
                          <span className="text-xs sm:text-sm font-outfit font-black text-slate-950 dark:text-white block mt-0.5 truncate">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Top 3 Capabilities with Green Checks */}
                    <div className="space-y-1">
                      {product.highlights.slice(0, 3).map((h, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                          <span className="truncate leading-none">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Compact Tech Stack Badges */}
                    <div className="flex flex-wrap items-center gap-1 pt-0.5">
                      {product.techStack.slice(0, 5).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {product.techStack.length > 5 && (
                        <span className="text-[10px] text-slate-500 font-bold">
                          +{product.techStack.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Action Footer: Dual CTAs */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                    <Link
                      to={product.pageUrl}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-outfit font-black text-xs uppercase tracking-wider shadow-sm shadow-indigo-600/20 transition-all text-center"
                    >
                      <span>Explore Product Page</span>
                      <ArrowRight size={13} />
                    </Link>

                    {product.demoUrl && (
                      <a
                        href={product.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-slate-700 transition-all"
                      >
                        <span>Demo</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

          ) : (

            /* ── VIEW MODE 2: COMPACT ARCHITECTURE SPECS TABLE ── */
            <div className="overflow-x-auto rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-4 px-6">Product / Suite</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">AI &amp; Core Engine</th>
                    <th className="py-4 px-6">Security &amp; DB</th>
                    <th className="py-4 px-6">Verified ROI</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-950 dark:text-white">
                        <div className="flex items-center gap-3">
                          <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                            <Sparkles size={16} className="text-indigo-500" />
                          </div>
                          <div>
                            <div className="font-outfit font-black text-sm">{p.title}</div>
                            <div className="text-[11px] text-slate-500">{p.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {p.statusLabel}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                        {p.tags[0]}
                      </td>
                      <td className="py-4 px-6 text-slate-700 dark:text-slate-300">
                        {p.tags[1]}
                      </td>
                      <td className="py-4 px-6 font-semibold text-emerald-600 dark:text-emerald-400">
                        {p.metrics[2]?.value || '₹48k/mo'}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          <Link
                            to={p.pageUrl}
                            className="px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-600 hover:text-white transition-colors"
                          >
                            View Specs
                          </Link>
                          {p.demoUrl && (
                            <a
                              href={p.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-indigo-500"
                              title="Launch Demo"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          )}

        </section>


        {/* ═══════════════════════ 5. CUSTOM SAAS MVP DEVELOPMENT CTA ═══════════════════════ */}
        <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 text-white text-center space-y-6 shadow-2xl shadow-indigo-600/25">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-200 font-outfit">
              Custom SaaS Engineering Services
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight leading-tight">
              Need a Custom White-Label SaaS MVP Built for Your Business?
            </h2>
            <p className="text-indigo-100 text-xs sm:text-base leading-relaxed">
              Tushar Singh architects, develops, and deploys high-scale multi-tenant SaaS platforms with Groq/OpenAI AI decomposition, PostgreSQL Row-Level Security, Redis caching, Stripe billing, and automated webhooks.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-indigo-700 font-outfit font-black text-xs uppercase tracking-wider shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Book SaaS Architecture Consultation</span>
              <ArrowRight size={15} />
            </Link>

            <a
              href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20hire%20you%20to%20build%20a%20custom%20SaaS%20application!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-950/50 hover:bg-indigo-950/70 border border-white/20 text-white font-outfit font-bold text-xs transition-all cursor-pointer"
            >
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-indigo-200 pt-4 border-t border-indigo-400/30">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} /> Production-Ready Next.js &amp; Python
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} /> Hard PostgreSQL Multi-Tenant RLS
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} /> Sub-Second AI LPU Latency
            </span>
          </div>
        </section>

      </div>
    </div>
  );
};

export default SaaS;
