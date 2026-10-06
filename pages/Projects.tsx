import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PROJECTS, SITE_URL, FIVERR_PROFILE_URL } from '../constants';
import { Project } from '../types';
import SharePageButton from '../components/SharePageButton';
import { FiverrIcon, FiverrBadge } from '../components/FiverrBadge';
import {
  Cpu, Zap, X, ShieldCheck, Target,
  TrendingUp, ArrowRight, Search, Filter,
  ArrowUpRight, Layers, Share2, Link2, Copy, Check,
  Sparkles, ExternalLink, MessageCircle, Clock, Award, Star,
  CheckCircle2, Flame, BarChart3, Code2, Bot, Globe, ChevronRight,
  Briefcase, CheckCircle, GitBranch, Code, Maximize2,
  AlertTriangle, Lightbulb, MapPin
} from 'lucide-react';

/* ─── Category Metadata ──────────────────────────────────── */
const CAT_META: Record<string, { emoji: string; badgeCls: string; accentBorder: string }> = {
  All:            { emoji: '⚡', badgeCls: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700', accentBorder: 'border-indigo-500' },
  'SaaS Products': { emoji: '🚀', badgeCls: 'bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-500/40', accentBorder: 'border-rose-500' },
  'AI Agents':    { emoji: '🤖', badgeCls: 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/40', accentBorder: 'border-indigo-500' },
  'Data Science': { emoji: '📊', badgeCls: 'bg-violet-50 dark:bg-violet-950/70 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/40', accentBorder: 'border-violet-500' },
  'Lead Gen':     { emoji: '🎯', badgeCls: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/40', accentBorder: 'border-emerald-500' },
  'Web Dev':      { emoji: '🌐', badgeCls: 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/40', accentBorder: 'border-blue-500' },
};

const cmeta = (cat: string) =>
  CAT_META[cat] ?? { emoji: '📁', badgeCls: 'bg-slate-100 text-slate-700 border-slate-200', accentBorder: 'border-slate-400' };

/* ─── Informative & Spacious Project Card ─────────────────── */
const ProjectCard: React.FC<{
  project: Project;
  onClick: () => void;
}> = ({ project, onClick }) => {
  const m = cmeta(project.category || 'All');
  const projectUrl = typeof window !== 'undefined' ? `${window.location.origin}/projects?project=${project.id}` : `${SITE_URL}/projects?project=${project.id}`;

  const isLogoImage = Boolean(project.imageUrl?.includes('logo'));

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/15 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer backdrop-blur-sm"
    >
      {/* ── Fixed Aspect Ratio (16:9) Contained Thumbnail ── */}
      <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden shrink-0 flex items-center justify-center select-none border-b border-slate-100 dark:border-white/5">
        {isLogoImage ? (
          <div className="w-full h-full p-6 flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/15 via-violet-500/20 to-cyan-500/15 blur-2xl pointer-events-none" />
            <div className="w-full max-w-[270px] h-28 flex items-center justify-center p-4 rounded-2xl bg-white shadow-xl relative z-10 border border-slate-200/40">
              <img
                src={project.imageUrl}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative overflow-hidden bg-slate-950 flex items-center justify-center">
            {/* Ambient blurred backdrop to seamlessly frame graphics */}
            <img
              src={project.imageUrl || '/projects/p1.svg'}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
            />
            {/* Primary Graphic fitted 100% inside container borders without clipping */}
            <img
              src={project.imageUrl || '/projects/p1.svg'}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="relative z-[1] w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Subtle Hover Action Indicator */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 pointer-events-none">
          <span className="p-2 rounded-xl bg-slate-950/80 text-white backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center">
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>

      {/* ── Body Content ── */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-5">
        <div className="space-y-3">
          {/* Category, Location & Verification Status (Cleanly placed in body so thumbnail is 100% visible) */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider backdrop-blur-md border ${m.badgeCls} shadow-xs`}>
                <span>{m.emoji}</span>
                <span>{project.category}</span>
              </span>
              {project.clientLocation && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-outfit shadow-xs">
                  <MapPin size={11} className="text-slate-950" />
                  <span>{project.clientLocation}</span>
                </span>
              )}
            </div>

            <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{project.category === 'SaaS Products' ? 'Live Cloud SaaS' : 'Verified Deliverable'}</span>
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-outfit font-black text-slate-950 dark:text-white leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Key Measurable Outcome Callout */}
        {project.results && project.results.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-xs font-bold flex items-start gap-2.5">
            <TrendingUp size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <span className="leading-snug line-clamp-2">{project.results[0]}</span>
          </div>
        )}

        {/* Tech Tags and Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {(project.tags || []).slice(0, 3).map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold rounded-lg border border-slate-200/60 dark:border-white/5">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title="Launch Live Platform"
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-black uppercase tracking-wider hover:bg-emerald-600 hover:text-white transition-all shadow-2xs"
              >
                <span>Live</span>
                <ExternalLink size={11} />
              </a>
            )}
            <SharePageButton
              title={`${project.title} | Case Study`}
              text={`Check out this project: "${project.title}" by Tushar Singh`}
              url={projectUrl}
              variant="ghost"
              className="!p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            />
            <button
              onClick={onClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-black uppercase tracking-wider group-hover:bg-indigo-600 group-hover:text-white transition-all cursor-pointer shadow-xs"
            >
              <span>View Brief</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Projects Component ────────────────────────────── */
const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams]     = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]                 = useState('');
  const [selected, setSelected]             = useState<Project | null>(null);
  const [modalCopied, setModalCopied]       = useState(false);
  const [lightboxImage, setLightboxImage]   = useState<{ src: string; title: string } | null>(null);

  const categories = useMemo(() => {
    const s = new Set<string>();
    s.add('All');
    PROJECTS.forEach(p => {
      if (p.category) s.add(p.category);
    });
    return Array.from(s);
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: PROJECTS.length };
    PROJECTS.forEach(p => {
      if (p.category) {
        c[p.category] = (c[p.category] ?? 0) + 1;
      }
    });
    return c;
  }, []);

  const filtered = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory;
      const matchSearch = search.trim() === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags || []).some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [activeCategory, search]);

  useEffect(() => {
    const pId = searchParams.get('project');
    if (pId) {
      const found = PROJECTS.find(p => p.id === pId);
      if (found && selected?.id !== pId) {
        setSelected(found);
      }
    }

    const cat = searchParams.get('category');
    if (cat) {
      if (cat.toLowerCase() === 'saas' || cat.toLowerCase() === 'saas products' || cat === 'Web Dev' || cat === 'Web+Dev') {
        setActiveCategory('Web Dev');
      } else {
        const matched = categories.find(c => c.toLowerCase() === cat.toLowerCase());
        if (matched) setActiveCategory(matched);
      }
    }
  }, [searchParams, categories]);

  // Handle ESC key to close modal or lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImage) {
          setLightboxImage(null);
        } else if (selected) {
          closeProject();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, selected]);

  const openProject = (p: Project) => {
    setSelected(p);
    setSearchParams({ project: p.id });
  };

  const closeProject = () => {
    setSelected(null);
    setSearchParams({});
  };

  const copyModalLink = (p: Project) => {
    const url = `${typeof window !== 'undefined' ? window.location.origin : SITE_URL}/projects?project=${p.id}`;
    navigator.clipboard.writeText(url);
    setModalCopied(true);
    setTimeout(() => setModalCopied(false), 2500);
  };

  const isModalLogo = Boolean(selected?.imageUrl?.includes('logo'));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* ── 1. HERO SECTION ─────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-5 sm:px-10 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/15 via-violet-600/15 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <Sparkles size={12} className="text-indigo-500 animate-pulse" />
              <span>Commercial Deliverables &amp; Proof</span>
            </div>
            <FiverrBadge variant="pill" />
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>₹2L+ Client Impact</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.12] speakable">
            Client Projects &amp; <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">
              Technical Case Studies
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Explore production-grade systems built and delivered for clients — including autonomous AI agents, WhatsApp business automations, full-stack hospital &amp; enterprise platforms, and Power BI dashboards.
          </p>

          {/* Metric Bar */}
          <div className="grid grid-cols-3 max-w-md mx-auto p-3 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 backdrop-blur-md text-center shadow-md">
            <div>
              <p className="text-xl sm:text-2xl font-outfit font-black text-indigo-600 dark:text-indigo-400">10+</p>
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Delivered</p>
            </div>
            <div className="border-x border-slate-200 dark:border-white/10">
              <p className="text-xl sm:text-2xl font-outfit font-black text-emerald-600 dark:text-emerald-400">₹2L+</p>
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Impact</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-outfit font-black text-amber-500">4.0 ★</p>
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FILTER & SEARCH CONTROLS ─────────────────────── */}
      <section className="py-6 px-5 sm:px-10 sticky top-16 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            {categories.map(cat => {
              const on = activeCategory === cat;
              const m = cmeta(cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    on
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 scale-[1.02]'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{m.emoji}</span>
                  <span>{cat}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${on ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                    {counts[cat] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by keyword, stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── 3. PROJECTS GRID ────────────────────────────────── */}
      <section className="py-14 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-8 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center mx-auto">
                <Search size={22} />
              </div>
              <h3 className="font-outfit font-black text-lg text-slate-900 dark:text-white">No Projects Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">Try clearing your search query or selecting "All" to view all case studies.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearch(''); }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map(p => (
                <ProjectCard key={p.id} project={p} onClick={() => openProject(p)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. COMPLETELY REDESIGNED CASE STUDY SUBPAGE / MODAL ── */}
      {selected && (
        <div
          className="fixed inset-0 z-[250] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={closeProject}
        >
          <div
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden my-auto max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Modal Top Header Bar ── */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between gap-4 bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-md shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${cmeta(selected.category || 'All').badgeCls}`}>
                  <span>{cmeta(selected.category || 'All').emoji}</span>
                  <span>{selected.category}</span>
                </span>

                {selected.clientLocation && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 font-outfit inline-flex items-center gap-1 shadow-xs">
                    <MapPin size={11} className="text-slate-950" />
                    <span>Sold to Client in {selected.clientLocation}</span>
                  </span>
                )}

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {selected.category === 'SaaS Products' ? 'Live Cloud SaaS' : 'Verified Deliverable'}
                </span>

                {selected.date && (
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {selected.date}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyModalLink(selected)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-400 transition-colors cursor-pointer"
                  title="Copy shareable link"
                >
                  {modalCopied ? <><Check size={12} className="text-emerald-500" /> Copied</> : <><Copy size={12} /> Share</>}
                </button>
                <button
                  onClick={closeProject}
                  className="w-8 h-8 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* ── Scrollable Modal Content ── */}
            <div className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-grow">

              {/* Title & Subtitle (Clean & Spacious - NEVER overlapping the image) */}
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-black text-slate-950 dark:text-white leading-tight">
                  {selected.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                  {selected.description}
                </p>
              </div>

              {/* ── Dedicated High-Definition Image Showcase ── */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/60 dark:border-white/10 shadow-xl group/showcase">
                {isModalLogo ? (
                  <div className="w-full py-12 px-6 flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 min-h-[220px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-violet-500/15 to-cyan-500/10 blur-2xl pointer-events-none" />
                    <div className="w-full max-w-sm h-32 flex items-center justify-center p-5 rounded-2xl bg-white shadow-2xl relative z-10 border border-white/20">
                      <img
                        src={selected.imageUrl}
                        alt={selected.title}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full bg-slate-950 flex items-center justify-center relative cursor-zoom-in"
                    onClick={() => selected.imageUrl && setLightboxImage({ src: selected.imageUrl, title: selected.title })}
                  >
                    <img
                      src={selected.imageUrl || '/projects/p1.svg'}
                      alt={selected.title}
                      className="w-full max-h-[460px] object-contain rounded-xl"
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-[11px] font-bold backdrop-blur-md border border-white/20 shadow-lg group-hover/showcase:bg-indigo-600 transition-colors pointer-events-none">
                      <Maximize2 size={13} />
                      <span>Click to Zoom Diagram</span>
                    </div>
                  </div>
                )}
              </div>

              {/* ── Case Study Sections Grid ── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left Column: Context, Problem & Strategy */}
                <div className="space-y-5">
                  {/* Client Context */}
                  {selected.clientBackground && (
                    <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 space-y-2">
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <Briefcase size={16} />
                        <h4 className="text-[11px] font-black uppercase tracking-wider">Client Context &amp; Regional Scope</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                        {selected.clientBackground}
                      </p>
                    </div>
                  )}

                  {/* The Problem */}
                  {selected.problemStatement && (
                    <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/30 space-y-2">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
                        <AlertTriangle size={16} />
                        <h4 className="text-[11px] font-black uppercase tracking-wider">The Problem &amp; Bottleneck</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-rose-900 dark:text-rose-200 leading-relaxed font-medium">
                        {selected.problemStatement}
                      </p>
                    </div>
                  )}

                  {/* Strategy */}
                  {selected.strategy && (
                    <div className="p-5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/30 space-y-2">
                      <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <Lightbulb size={16} />
                        <h4 className="text-[11px] font-black uppercase tracking-wider">Engineering Strategy &amp; Solution</h4>
                      </div>
                      <p className="text-xs sm:text-sm text-indigo-950 dark:text-indigo-200 leading-relaxed font-medium">
                        {selected.strategy}
                      </p>
                    </div>
                  )}
                </div>

                {/* Right Column: Outcomes, Before/After & Tech Stack */}
                <div className="space-y-5">
                  {/* Key Outcomes */}
                  {selected.results && selected.results.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <TrendingUp size={16} />
                        <h4 className="text-[11px] font-black uppercase tracking-widest">Key Deliverable Outcomes</h4>
                      </div>
                      <div className="space-y-2.5">
                        {selected.results.map((res, rIdx) => (
                          <div
                            key={rIdx}
                            className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-500/20 text-xs font-bold text-emerald-900 dark:text-emerald-300"
                          >
                            <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                            <span className="leading-snug">{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Before vs After */}
                  {selected.beforeAfter && (
                    <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 space-y-3">
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-400">
                        Before vs After ROI Metric
                      </h4>
                      <div className="grid grid-cols-1 gap-2.5 text-xs">
                        <div className="p-3 rounded-xl bg-rose-500/10 text-rose-800 dark:text-rose-300 border border-rose-500/20">
                          <strong className="block text-[10px] uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-0.5">Before:</strong>
                          <span>{selected.beforeAfter.before}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20">
                          <strong className="block text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-0.5">After:</strong>
                          <span>{selected.beforeAfter.after}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {selected.tags && selected.tags.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-white/5 space-y-2">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        Technologies Deployed
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selected.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 text-[11px] font-bold shadow-2xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* ── Sticky Action Bar Footer ── */}
            <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Built &amp; Verified by <span className="font-bold text-slate-900 dark:text-white">Tushar Singh</span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto justify-end">
                {selected.liveDemoUrl && (
                  <a
                    href={selected.liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                {selected.githubUrl && (
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <span>View GitHub</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                {selected.saasPageUrl && (
                  <button
                    onClick={() => {
                      setSelected(null);
                      navigate(selected.saasPageUrl!);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <span>Explore SaaS Page</span>
                    <ArrowRight size={13} />
                  </button>
                )}

                <a
                  href={`https://wa.me/918851619647?text=${encodeURIComponent(`Hi Tushar, I was looking at your project "${selected.title}" and want to discuss something similar for my business!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <MessageCircle size={14} />
                  <span>Discuss on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 5. FULLSCREEN LIGHTBOX FOR HIGH-RES DIAGRAMS ── */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[300] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
            <span className="text-xs font-bold text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-white/10">
              Press ESC to exit
            </span>
            <button
              onClick={() => setLightboxImage(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
          </div>

          <div
            className="max-w-6xl max-h-[85vh] w-full flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="max-h-[80vh] max-w-full object-contain rounded-2xl border border-white/10 shadow-2xl"
            />
            <p className="mt-3 text-xs sm:text-sm font-bold text-slate-300 text-center font-outfit">
              {lightboxImage.title}
            </p>
          </div>
        </div>
      )}

      {/* ── 6. BOTTOM CTA ───────────────────────────────────── */}
      <section className="py-20 px-5 sm:px-10 bg-slate-950 text-white text-center border-t border-white/5">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-3.5 py-1.5 rounded-full border border-indigo-500/30">
            Start Your Project
          </span>

          <h2 className="text-3xl sm:text-4xl font-outfit font-black text-white leading-tight">
            Ready to Automate or Build Your Custom Platform?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Get a tailored architecture proposal, fixed milestone pricing, and direct 1-on-1 developer partnership with guaranteed 1-hour response.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-950 rounded-2xl font-extrabold text-xs uppercase tracking-wider hover:bg-indigo-50 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <span>Submit Project Brief</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="https://wa.me/918851619647"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95"
            >
              <MessageCircle size={14} />
              <span>Instant WhatsApp</span>
            </a>
            <a
              href={FIVERR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1DBF73] hover:bg-[#19a463] text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95"
            >
              <FiverrIcon size={14} className="brightness-125" />
              <span>Hire on Fiverr</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Projects;
