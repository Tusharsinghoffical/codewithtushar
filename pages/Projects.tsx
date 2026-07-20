import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import {
  Cpu, Zap, X, ShieldCheck, Target,
  TrendingUp, ArrowRight, Search, Filter,
  ArrowUpRight, Layers
} from 'lucide-react';

/* ─── Category metadata ──────────────────────────────────── */
const CAT_META: Record<string, { emoji: string; textCls: string; bgCls: string }> = {
  All:           { emoji: '⚡', textCls: 'text-slate-700 dark:text-slate-200',    bgCls: 'bg-slate-100 dark:bg-slate-800' },
  'AI Agents':   { emoji: '🤖', textCls: 'text-indigo-700 dark:text-indigo-300', bgCls: 'bg-indigo-50 dark:bg-indigo-950/50' },
  'Data Science':{ emoji: '📊', textCls: 'text-violet-700 dark:text-violet-300', bgCls: 'bg-violet-50 dark:bg-violet-950/50' },
  'Lead Gen':    { emoji: '🎯', textCls: 'text-emerald-700 dark:text-emerald-300',bgCls: 'bg-emerald-50 dark:bg-emerald-950/50' },
  'Web Dev':     { emoji: '🌐', textCls: 'text-blue-700 dark:text-blue-300',     bgCls: 'bg-blue-50 dark:bg-blue-950/50' },
};
const cmeta = (cat: string) =>
  CAT_META[cat] ?? { emoji: '📁', textCls: 'text-slate-600', bgCls: 'bg-slate-100' };

/* ─── Sidebar ────────────────────────────────────────────── */
const Sidebar: React.FC<{
  categories: string[];
  counts: Record<string, number>;
  active: string;
  setActive: (c: string) => void;
  close: () => void;
}> = ({ categories, counts, active, setActive, close }) => (
  <div className="flex flex-col gap-1.5">
    <p className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest px-1 mb-2">
      <Filter size={11} /> Filter by Category
    </p>
    {categories.map(cat => {
      const m = cmeta(cat);
      const on = active === cat;
      return (
        <button key={cat} onClick={() => { setActive(cat); close(); }}
          className={`flex items-center justify-between gap-3 w-full px-3.5 py-2.5 rounded-2xl font-bold transition-all text-left ${
            on ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-md'
               : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
          }`}>
          <span className="flex items-center gap-2.5">
            <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-sm shrink-0 ${
              on ? 'bg-white/15 dark:bg-black/20' : m.bgCls
            }`}>
              {m.emoji}
            </span>
            <span className="text-[13px]">{cat}</span>
          </span>
          <span className={`text-[9px] font-black px-2 py-0.5 rounded-full min-w-[22px] text-center ${
            on ? 'bg-white/20 text-white dark:bg-black/20 dark:text-slate-950'
               : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
          }`}>
            {counts[cat] ?? 0}
          </span>
        </button>
      );
    })}
    <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50/50 dark:from-indigo-950/30 dark:to-violet-950/20 border border-indigo-100 dark:border-indigo-400/15">
      <p className="flex items-center gap-1.5 text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-3">
        <Layers size={10} /> Portfolio Stats
      </p>
      {[
        { label: 'Projects Completed', value: '10+' },
        { label: 'Client Rating',      value: '4.0 ★' },
        { label: 'Countries Served',   value: '8+' },
      ].map(({ label, value }) => (
        <div key={label} className="flex justify-between items-center py-1.5 border-b border-indigo-100/50 dark:border-indigo-400/10 last:border-0">
          <span className="text-[10px] text-slate-500 dark:text-slate-400">{label}</span>
          <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Project Card ───────────────────────────────────────── */
const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const m = cmeta(project.category);
  return (
    <div onClick={onClick}
      className="group flex flex-col bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-1.5 transition-all duration-300 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
        <img src={project.imageUrl} alt={project.title} loading="lazy" decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className={`absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest backdrop-blur-sm border border-white/20 ${m.bgCls} ${m.textCls}`}>
          {m.emoji} {project.category}
        </span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <ArrowUpRight size={18} className="text-white" />
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-sm font-outfit font-extrabold text-slate-950 dark:text-white mb-2 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-grow line-clamp-2">
          {project.description}
        </p>
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-50 dark:border-white/5 mt-auto">
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[8px] font-bold rounded-md">
                {tag}
              </span>
            ))}
          </div>
          <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 opacity-0 group-hover:opacity-100 transition-all">
            <ArrowRight size={11} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Component ─────────────────────────────────────── */
const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch]                 = useState('');
  const [selected, setSelected]             = useState<Project | null>(null);
  const [mobileOpen, setMobileOpen]         = useState(false);

  const categories = useMemo(() => {
    const s = new Set<string>();
    PROJECTS.forEach(p => s.add(p.category));
    return ['All', ...Array.from(s).sort()];
  }, []);

  const counts = useMemo(() => {
    const m: Record<string, number> = { All: PROJECTS.length };
    PROJECTS.forEach(p => { m[p.category] = (m[p.category] || 0) + 1; });
    return m;
  }, []);

  const filtered = useMemo(() =>
    PROJECTS.filter(p => {
      const cat = activeCategory === 'All' || p.category === activeCategory;
      const q   = search.toLowerCase();
      const txt = !search || p.title.toLowerCase().includes(q) ||
                  p.description.toLowerCase().includes(q) ||
                  p.tags.some(t => t.toLowerCase().includes(q));
      return cat && txt;
    }),
  [activeCategory, search]);

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="pt-28 pb-10 px-5 sm:px-10 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[9px] font-black uppercase tracking-widest mb-5">
              <Cpu size={11} className="text-indigo-400" /> Case Study Registry
            </div>
            <h1 className="text-3xl sm:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight mb-3">
              Proven ROI &amp; <span className="text-indigo-600 dark:text-indigo-400">Technical Briefs.</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
              Real products submitted to clients — each project represents a tangible transformation using AI, Automation, and Data.
            </p>
          </div>
          {/* Search */}
          <div className="relative w-full sm:w-60 shrink-0">
            <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search projects…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-9 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 transition-colors" />
            {search && (
              <button onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── LAYOUT ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-10 py-10">
        <div className="flex gap-8 lg:gap-10 relative">

          {/* Desktop sidebar */}
          <div className="hidden lg:block w-56 xl:w-60 shrink-0">
            <div className="sticky top-24">
              <Sidebar categories={categories} counts={counts}
                active={activeCategory} setActive={setActiveCategory}
                close={() => setMobileOpen(false)} />
            </div>
          </div>

          {/* Mobile filter toggle */}
          <div className="lg:hidden w-full absolute -top-14 left-0 z-10">
            <button onClick={() => setMobileOpen(o => !o)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-700 dark:text-white shadow-sm">
              <Filter size={12} /> {activeCategory}
              <span className="ml-auto px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-md text-[8px] font-black">
                {filtered.length}
              </span>
            </button>
            {mobileOpen && (
              <div className="mt-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl">
                <Sidebar categories={categories} counts={counts}
                  active={activeCategory} setActive={setActiveCategory}
                  close={() => setMobileOpen(false)} />
              </div>
            )}
          </div>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-6">
              Showing{' '}
              <span className="text-slate-900 dark:text-white font-extrabold">{filtered.length}</span>{' '}
              project{filtered.length !== 1 ? 's' : ''}
              {activeCategory !== 'All' && (
                <> in <span className="text-indigo-600 dark:text-indigo-400">{activeCategory}</span></>
              )}
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-4xl mb-4">🔍</p>
                <p className="text-slate-500 font-medium mb-4">No projects match.</p>
                <button onClick={() => { setActiveCategory('All'); setSearch(''); }}
                  className="text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(p => (
                  <ProjectCard key={p.id} project={p} onClick={() => setSelected(p)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── MODAL ────────────────────────────────────────── */}
      {selected && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6"
          onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" />

          <div
            className="relative w-full sm:max-w-5xl max-h-[96vh] sm:max-h-[88vh] bg-white dark:bg-slate-900 sm:rounded-[2.5rem] rounded-t-[2rem] overflow-y-auto shadow-2xl border border-slate-100 dark:border-white/5 modal-scroll"
            onClick={e => e.stopPropagation()}>

            {/* Modal image header */}
            <div className="relative h-48 sm:h-72 w-full shrink-0">
              <img src={selected.imageUrl} alt={selected.title}
                className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent" />

              {/* Close */}
              <button onClick={() => setSelected(null)}
                className="absolute top-4 right-4 p-2.5 bg-slate-950/70 backdrop-blur text-white rounded-full hover:bg-indigo-600 transition-all active:scale-95">
                <X size={16} />
              </button>

              {/* Category + title */}
              <div className="absolute bottom-0 left-0 px-7 sm:px-10 pb-6 w-full">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-600 text-white text-[8px] font-black uppercase tracking-widest rounded-lg mb-2">
                  {cmeta(selected.category).emoji} {selected.category}
                </span>
                <h2 className="text-xl sm:text-3xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight max-w-3xl">
                  {selected.title}
                </h2>
              </div>
            </div>

            {/* Modal body */}
            <div className="p-6 sm:p-10 space-y-7">

              {/* Background + Challenge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-2">
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-indigo-500 uppercase tracking-widest">
                    <Target size={11} /> Client Background
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selected.clientBackground || 'Available on request.'}
                  </p>
                </div>
                <div className="p-5 bg-rose-50 dark:bg-rose-950/20 rounded-2xl space-y-2">
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-rose-500 uppercase tracking-widest">
                    <ShieldCheck size={11} /> The Challenge
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {selected.problemStatement || 'Core bottleneck identified during discovery.'}
                  </p>
                </div>
              </div>

              {/* Strategy */}
              <div className="p-6 bg-slate-950 rounded-2xl relative overflow-hidden">
                <div className="absolute right-5 top-5 opacity-5"><Zap size={70} /></div>
                <p className="flex items-center gap-1.5 text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-3">
                  <Cpu size={11} /> Implementation Strategy
                </p>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {selected.strategy || 'Technical approach designed to solve identified challenges.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 bg-white/10 text-white/70 text-[8px] font-black uppercase tracking-widest rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Results + Transformation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-3">
                  <p className="flex items-center gap-1.5 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    <TrendingUp size={11} /> Results
                  </p>
                  {(selected.results || ['Measurable improvement delivered.']).map((r, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/5 rounded-xl">
                      <ArrowRight size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{r}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <p className="text-[9px] font-black text-violet-600 dark:text-violet-400 uppercase tracking-widest">
                    Transformation
                  </p>
                  <div className="rounded-2xl overflow-hidden border border-slate-100 dark:border-white/5">
                    <div className="p-4 bg-rose-50 dark:bg-rose-950/20">
                      <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest mb-1">Before</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 italic leading-relaxed">
                        {selected.beforeAfter?.before || 'Manual, error-prone processes.'}
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20">
                      <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-1">After</p>
                      <p className="text-xs text-slate-900 dark:text-white font-bold italic leading-relaxed">
                        {selected.beforeAfter?.after || 'Automated, scalable system running 24/7.'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate('/contact', { state: { service: selected.title } })}
                    className="group w-full py-3.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-950 dark:hover:bg-white dark:hover:text-slate-950 transition-all flex items-center justify-center gap-2 active:scale-95">
                    Get Your Results Like This
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <style>{`
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .dark .modal-scroll::-webkit-scrollbar-thumb { background: #1e293b; }
      `}</style>
    </div>
  );
};

export default Projects;
