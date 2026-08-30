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
  Sparkles, ExternalLink, MessageCircle, Clock, Award, Star
} from 'lucide-react';

/* ─── Category metadata ──────────────────────────────────── */
const CAT_META: Record<string, { emoji: string; textCls: string; bgCls: string; borderCls: string }> = {
  All:            { emoji: '⚡', textCls: 'text-slate-700 dark:text-slate-200',    bgCls: 'bg-slate-100 dark:bg-slate-800', borderCls: 'border-slate-300 dark:border-slate-700' },
  'AI Agents':    { emoji: '🤖', textCls: 'text-indigo-700 dark:text-indigo-300', bgCls: 'bg-indigo-50 dark:bg-indigo-950/60', borderCls: 'border-indigo-200 dark:border-indigo-500/30' },
  'Data Science': { emoji: '📊', textCls: 'text-violet-700 dark:text-violet-300', bgCls: 'bg-violet-50 dark:bg-violet-950/60', borderCls: 'border-violet-200 dark:border-violet-500/30' },
  'Lead Gen':     { emoji: '🎯', textCls: 'text-emerald-700 dark:text-emerald-300',bgCls: 'bg-emerald-50 dark:bg-emerald-950/60', borderCls: 'border-emerald-200 dark:border-emerald-500/30' },
  'Web Dev':      { emoji: '🌐', textCls: 'text-blue-700 dark:text-blue-300',     bgCls: 'bg-blue-50 dark:bg-blue-950/60', borderCls: 'border-blue-200 dark:border-blue-500/30' },
};

const cmeta = (cat: string) =>
  CAT_META[cat] ?? { emoji: '📁', textCls: 'text-slate-600', bgCls: 'bg-slate-100', borderCls: 'border-slate-200' };

/* ─── Project Card Component ─────────────────────────────── */
const ProjectCard: React.FC<{
  project: Project;
  onClick: () => void;
}> = ({ project, onClick }) => {
  const m = cmeta(project.category || 'All');
  const projectUrl = typeof window !== 'undefined' ? `${window.location.origin}/projects?project=${project.id}` : `${SITE_URL}/projects?project=${project.id}`;

  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer backdrop-blur-xl"
    >
      {/* Top Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-violet-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity z-10" />

      {/* Thumbnail */}
      <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden shrink-0">
        <img
          src={project.imageUrl || '/projects/p1.svg'}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Category Pill */}
        <span className={`absolute top-3.5 left-3.5 flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md border ${m.bgCls} ${m.textCls} ${m.borderCls} shadow-md`}>
          {m.emoji} {project.category}
        </span>

        {/* Hover Action Badge */}
        <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-105 shadow-md">
          <ArrowUpRight size={16} />
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <h3 className="text-base font-outfit font-black text-slate-950 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {project.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">
            {project.description}
          </p>
        </div>

        {/* Key Impact Metric if available */}
        {project.results && project.results.length > 0 && (
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[11px] font-extrabold">
            <TrendingUp size={14} className="text-emerald-500 shrink-0" />
            <span className="truncate">{project.results[0]}</span>
          </div>
        )}

        {/* Tags & Action Row */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {(project.tags || []).slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] font-bold rounded-lg">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <SharePageButton
              title={`${project.title} | Case Study`}
              text={`Check out this project: "${project.title}" by Tushar Singh`}
              url={projectUrl}
              variant="ghost"
              className="!p-1.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400"
            />
            <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
              Case Study <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams]     = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]                 = useState('');
  const [selected, setSelected]             = useState<Project | null>(null);
  const [modalCopied, setModalCopied]       = useState(false);

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
  }, [searchParams]);

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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* ── 1. HERO SECTION ─────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-5 sm:px-10 overflow-hidden border-b border-slate-100 dark:border-white/5">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <Sparkles size={12} className="text-indigo-500 animate-pulse" />
              <span>Proven Deliverables &amp; ROI</span>
            </div>
            <FiverrBadge variant="pill" />
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>₹2L+ Value Generated</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.15] speakable">
            Commercial Projects &amp; <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">
              Client Case Studies
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Real products built and deployed for clients across India and worldwide — AI automations, conversational bots, full-stack web platforms, and data intelligence dashboards.
          </p>

          {/* Metric Bar */}
          <div className="grid grid-cols-3 max-w-lg mx-auto p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 backdrop-blur-md text-center">
            <div>
              <p className="text-xl sm:text-2xl font-outfit font-black text-indigo-600 dark:text-indigo-400">10+</p>
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Delivered</p>
            </div>
            <div className="border-x border-slate-200 dark:border-white/10">
              <p className="text-xl sm:text-2xl font-outfit font-black text-emerald-600 dark:text-emerald-400">₹2L+</p>
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Client Impact</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-outfit font-black text-amber-500">4.0 ★</p>
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SEARCH & FILTER SECTION ──────────────────────── */}
      <section className="py-8 px-5 sm:px-10 sticky top-16 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/5">
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
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    on
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-100'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{m.emoji}</span>
                  <span>{cat}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${on ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
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
              placeholder="Search case studies & tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── 3. PROJECTS GRID ────────────────────────────────── */}
      <section className="py-16 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-8">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center mx-auto mb-3">
                <Search size={22} />
              </div>
              <h3 className="font-outfit font-black text-lg text-slate-900 dark:text-white mb-1">No Projects Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">Try changing your search term or select another category filter.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearch(''); }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Reset Filters
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

      {/* ── 4. DETAILED CASE STUDY MODAL ────────────────────── */}
      {selected && (
        <div
          className="fixed inset-0 z-[250] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={closeProject}
        >
          <div
            className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-[21/9] bg-slate-950 overflow-hidden">
              <img src={selected.imageUrl || '/projects/p1.svg'} alt={selected.title} className="w-full h-full object-cover opacity-85" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <button
                onClick={closeProject}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-800 transition-colors border border-white/20"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-indigo-600 text-white mb-2 inline-block">
                  {selected.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-outfit font-black text-white leading-tight">
                  {selected.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Project Overview</h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{selected.description}</p>
              </div>

              {selected.problemStatement && (
                <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/30 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">Problem Addressed</p>
                  <p className="text-xs text-rose-800 dark:text-rose-300 leading-relaxed font-medium">{selected.problemStatement}</p>
                </div>
              )}

              {selected.strategy && (
                <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/30 space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Engineering Strategy &amp; Solution</p>
                  <p className="text-xs text-indigo-800 dark:text-indigo-300 leading-relaxed font-medium">{selected.strategy}</p>
                </div>
              )}

              {selected.results && selected.results.length > 0 && (
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Key Deliverable Outcomes:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selected.results.map((res, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-500/20 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                        <TrendingUp size={14} className="text-emerald-500 shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selected.beforeAfter && (
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-white/5 space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Before vs After ROI Metric</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-700 dark:text-rose-300 border border-rose-500/20">
                      <strong>Before:</strong> {selected.beforeAfter.before}
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      <strong>After:</strong> {selected.beforeAfter.after}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => copyModalLink(selected)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-400 transition-colors"
              >
                {modalCopied ? <><Check size={13} className="text-emerald-500" /> Copied</> : <><Copy size={13} /> Copy Link</>}
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/918851619647?text=${encodeURIComponent(`Hi Tushar, I was looking at your project "${selected.title}" and want to discuss something similar for my business!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
                >
                  <MessageCircle size={14} />
                  <span>Discuss Similar Project</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Projects;
