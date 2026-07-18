import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import {
   Terminal,
   Cpu,
   Zap,
   Tag as TagIcon,
   X,
   LayoutGrid,
   Calendar,
   ShieldCheck,
   Target,
   Wrench,
   TrendingUp,
   ArrowRight,
   Plus
} from 'lucide-react';

const Projects: React.FC = () => {
   const navigate = useNavigate();
   const [activeCategory, setActiveCategory] = useState('All');
   const [selectedTag, setSelectedTag] = useState('All');
   const [selectedProject, setSelectedProject] = useState<Project | null>(null);

   const categories = useMemo(() => {
      const cats = new Set<string>();
      PROJECTS.forEach(p => cats.add(p.category));
      return ['All', ...Array.from(cats).sort()];
   }, []);

   const allTags = useMemo(() => {
      const tagsSet = new Set<string>();
      PROJECTS.forEach(p => p.tags.forEach(t => tagsSet.add(t)));
      return ['All', ...Array.from(tagsSet).sort()];
   }, []);

   const filteredProjects = useMemo(() => {
      return PROJECTS.filter(p => {
         const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
         const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag);
         return matchesCategory && matchesTag;
      });
   }, [activeCategory, selectedTag]);

   useEffect(() => {
      if (selectedProject) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'unset';
      }
      return () => { document.body.style.overflow = 'unset'; };
   }, [selectedProject]);

   return (
      <div className="bg-white dark:bg-slate-950 min-h-screen">
         {/* --- HERO SECTION --- */}
         <section className="pt-32 pb-16 px-6 sm:px-10 border-b border-slate-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-12">
               <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-widest mb-6">
                     <Cpu size={14} className="text-indigo-400" /> Case Study Registry
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-none mb-6">
                     Proven ROI & <span className="text-indigo-600 dark:text-indigo-400">Technical Briefs.</span>
                  </h1>
                  <p className="text-xs sm:text-base lg:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                     A detailed record of how I solve complex business problems using AI, Automation, and Data. Every project here represents a tangible transformation.
                  </p>
               </div>

               {/* Filters */}
               <div className="w-full lg:w-auto flex flex-wrap gap-2">
                  {categories.map(cat => (
                     <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg sm:rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat
                           ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xl'
                           : 'bg-white dark:bg-slate-950 text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-400'
                           }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>
         </section>

         {/* --- GRID SECTION --- */}
         <section className="py-16 sm:py-20 px-4 sm:px-8">
            <div className="max-w-[1400px] mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                  {filteredProjects.map((project, idx) => (
                     <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-all duration-700 cursor-pointer"
                     >
                        <div className="relative aspect-[16/10] overflow-hidden">
                           <img
                              src={project.imageUrl}
                              alt={project.title}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                           />
                           <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors duration-500"></div>
                           <div className="absolute top-4 left-4">
                              <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-950 text-[8px] font-black uppercase tracking-widest rounded-lg border border-white/20">
                                 {project.category}
                              </span>
                           </div>
                        </div>
                        <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-grow">
                           <h3 className="text-lg sm:text-xl font-outfit font-extrabold text-slate-950 dark:text-white mb-3 tracking-tight leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {project.title}
                           </h3>
                           <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 flex-grow line-clamp-3">
                              {project.description}
                           </p>
                           <div className="mt-auto flex items-center justify-between gap-4">
                              <div className="flex flex-wrap gap-1.5 overflow-hidden h-6">
                                 {project.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="px-2 py-1 bg-slate-50 dark:bg-slate-950 text-slate-400 text-[6px] sm:text-[7px] font-black uppercase tracking-widest rounded-md border border-slate-100 dark:border-white/5 whitespace-nowrap">
                                       {tag}
                                    </span>
                                 ))}
                              </div>
                              <div className="w-8 h-8 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center transition-transform group-hover:rotate-45 shrink-0 shadow-md">
                                 <Plus size={14} />
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* --- CASE STUDY MODAL --- */}
         {selectedProject && (
            <div
               className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6"
               onClick={() => setSelectedProject(null)}
            >
               <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500"></div>

               <div
                  className="relative w-full max-w-6xl max-h-[92vh] bg-white dark:bg-slate-900 rounded-[2rem] sm:rounded-[3rem] overflow-y-auto shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-slate-100 dark:border-white/5 animate-in zoom-in-95 fade-in duration-500 flex flex-col custom-scrollbar"
                  onClick={e => e.stopPropagation()}
               >
                  {/* Modal Hero */}
                  <div className="relative h-64 sm:h-96 w-full">
                     <img src={selectedProject.imageUrl} className="w-full h-full object-cover" alt={selectedProject.title} />
                     <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-transparent"></div>
                     <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-6 right-6 p-4 bg-slate-950 text-white rounded-full transition-all active:scale-95 shadow-2xl z-50 hover:bg-indigo-600"
                     >
                        <X size={20} />
                     </button>
                     <div className="absolute bottom-0 left-0 p-8 sm:p-12 w-full">
                        <div className="flex items-center gap-3 mb-4">
                           <span className="px-3 py-1.5 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                              {selectedProject.category}
                           </span>
                           <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                              <Calendar size={12} /> {selectedProject.date}
                           </span>
                        </div>
                        <h2 className="text-xl sm:text-3xl lg:text-4xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight max-w-4xl">
                           {selectedProject.title}
                        </h2>
                     </div>
                  </div>

                  <div className="p-6 sm:p-10 lg:p-14 pt-8">
                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14">
                        {/* Left Column: Context */}
                        <div className="lg:col-span-12 space-y-12">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                 <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                                    <Target size={14} /> Client Background
                                 </div>
                                 <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic">
                                    {selectedProject.clientBackground || "Detailed background information available upon request for privacy."}
                                 </p>
                              </div>
                              <div className="space-y-4">
                                 <div className="flex items-center gap-2 text-[10px] font-black text-rose-500 uppercase tracking-widest">
                                    <ShieldCheck size={14} /> The Challenge
                                 </div>
                                 <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                                    {selectedProject.problemStatement || "The core operational bottleneck identified during initial discovery."}
                                 </p>
                              </div>
                           </div>

                           <div className="p-6 sm:p-8 bg-slate-950 text-white rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 relative overflow-hidden">
                              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                 <Zap size={140} />
                              </div>
                              <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6 border-b border-white/10 pb-4 inline-block">
                                 <Cpu size={14} /> Implementation Strategy
                              </div>
                              <p className="text-slate-300 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-4xl">
                                 {selectedProject.strategy || "Comprehensive technical approach designed to solve the identified challenges."}
                              </p>
                              <div className="mt-10 flex flex-wrap gap-2">
                                 {selectedProject.tags.map(tag => (
                                    <span key={tag} className="px-3 py-1.5 bg-white/10 text-white/80 text-[8px] font-black uppercase tracking-widest rounded-lg border border-white/5">
                                       {tag}
                                    </span>
                                 ))}
                              </div>
                           </div>

                           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                              {/* Results List */}
                              <div className="space-y-8">
                                 <div className="flex items-center gap-2 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                                    <TrendingUp size={14} /> Quantifiable Results
                                 </div>
                                 <div className="space-y-4">
                                    {(selectedProject.results || ["Metric A: 40% Growth", "Metric B: 20hrs Saved", "Metric C: 100% Accuracy"]).map((res, ridx) => (
                                       <div key={ridx} className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-2xl group transition-all hover:translate-x-2">
                                          <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                                             <ArrowRight size={14} />
                                          </div>
                                          <span className="text-sm font-bold text-slate-900 dark:text-slate-100">{res}</span>
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              {/* Transformation Panel */}
                              <div className="space-y-8">
                                 <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                                    <Zap size={14} /> Transformation Brief
                                 </div>
                                 <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl">
                                    <div className="p-5 sm:p-8 border-b border-slate-100 dark:border-white/5 bg-rose-50 dark:bg-rose-950/10">
                                       <p className="text-[8px] font-black text-rose-500 uppercase tracking-widest mb-3">Before System</p>
                                       <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-bold italic line-clamp-3">
                                          {selectedProject.beforeAfter?.before || "Legacy manual workflows with high error rates."}
                                       </p>
                                    </div>
                                    <div className="p-5 sm:p-8 bg-emerald-50 dark:bg-emerald-950/10">
                                       <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-3">After Singh Automation</p>
                                       <p className="text-xs sm:text-sm text-slate-900 dark:text-white font-bold italic line-clamp-3">
                                          {selectedProject.beforeAfter?.after || "Optimized autonomous engine scaling results 24/7."}
                                       </p>
                                    </div>
                                 </div>
                                 <button
                                    onClick={() => navigate('/contact', { state: { service: selectedProject.title } })}
                                    className="w-full py-3 sm:py-4 bg-indigo-600 text-white rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest hover:bg-slate-950 transition-all shadow-xl flex items-center justify-center gap-2 group active:scale-95 px-4"
                                 >
                                    <span className="truncate">Get Your Results Like This</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform shrink-0" />
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}

         <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
        }
      `}</style>
      </div>
   );
};

export default Projects;