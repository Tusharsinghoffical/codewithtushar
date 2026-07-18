import React from 'react';
import { TESTIMONIALS } from '../constants';
import { Testimonial } from '../types';
import { Star, Quote, ShieldCheck, Sparkles, MessageSquare, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials: React.FC = () => {
  return (
    <div className="pt-32 pb-24 px-4 sm:px-6 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* --- COMPACT HEADER --- */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[9px] font-black uppercase tracking-[0.3em] mb-6 shadow-md">
            <ShieldCheck size={12} className="text-emerald-400" /> Verified Registry
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight leading-tight">
            Client <br />
            <span className="text-indigo-600 dark:text-indigo-400">Testimonials.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
            Real feedback from satisfied clients who hired India's top-rated freelance Data Scientist & Full-Stack Developer. Verified results from Delhi-based expert.
          </p>
        </div>

        {/* --- REFINED MASONRY GRID --- */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 mb-24">
          {TESTIMONIALS.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* --- PROOF GALLERY --- */}
        <div className="mt-20 border-t border-slate-100 dark:border-white/5 pt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-[1.5px] bg-indigo-600 dark:bg-indigo-400"></div>
                <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">Visual Evidence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight">Project Success Stories.</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Confirmed completions and client satisfaction snapshots from freelance development projects.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.filter(t => t.snippetUrl).map(t => (
              <div key={`snippet-${t.id}`} className="group relative rounded-[2rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm aspect-video sm:aspect-square">
                <img 
                  src={t.snippetUrl} 
                  alt={`Feedback snippet from ${t.clientName}`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                   <p className="text-white font-bold text-xs mb-0.5">{t.clientName}</p>
                   <p className="text-indigo-400 text-[8px] font-black uppercase tracking-widest">{t.category} Deployment</p>
                </div>
              </div>
            ))}
            
            {/* COMPACT CTA BOX */}
            <div className="bg-slate-950 dark:bg-slate-900 rounded-[2rem] p-8 flex flex-col justify-center text-center text-white relative overflow-hidden group shadow-xl border dark:border-white/5">
               <div className="absolute -top-10 -right-10 text-white/5 group-hover:rotate-12 transition-transform duration-1000">
                  <MessageSquare size={120} />
               </div>
               <h3 className="text-lg font-bold mb-2 relative z-10">Hire Expert Freelancer.</h3>
               <p className="text-[11px] text-slate-400 mb-6 relative z-10 font-medium leading-relaxed italic">
                 "Join the registry of enterprises who achieved results with India's top freelance developer."
               </p>
               <Link 
                to="/contact"
                className="bg-white dark:bg-indigo-600 text-slate-950 dark:text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-700 hover:text-white transition-all relative z-10 shadow-lg flex items-center justify-center gap-2 group/btn"
              >
                  Hire Freelance Developer
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  // Generate initials from client name
  const initials = testimonial.clientName
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('');

  // Deterministic color based on client id
  const colors: Record<string, string> = {
    't1': 'bg-indigo-600',
    't2': 'bg-emerald-600',
    't3': 'bg-violet-600',
  };
  const avatarColor = colors[testimonial.id] ?? 'bg-slate-600';

  return (
    <div className="break-inside-avoid-column bg-white dark:bg-slate-900 p-5 sm:p-7 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl hover:border-indigo-100 dark:hover:border-indigo-400/30 transition-all duration-500 group flex flex-col h-fit">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-0.5 text-amber-400">
          {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
        </div>
        <Quote className="text-slate-100 dark:text-slate-800 group-hover:text-indigo-50 dark:group-hover:text-indigo-900/30 transition-colors" size={28} />
      </div>

      <p className="text-slate-600 dark:text-slate-400 text-[13px] sm:text-sm leading-relaxed font-medium mb-8 italic">
        "{testimonial.content}"
      </p>

      <div className="flex items-center gap-3 mt-auto pt-5 border-t border-slate-50 dark:border-white/5">
        {/* Initials Avatar */}
        <div className={`w-10 h-10 rounded-xl ${avatarColor} flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md`}>
          {initials}
        </div>
        <div>
          <h4 className="text-slate-950 dark:text-white font-bold text-[13px] leading-tight mb-0.5">{testimonial.clientName}</h4>
          <div className="flex items-center gap-1.5">
            <p className="text-[8px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-widest">{testimonial.clientRole}</p>
            <span className="w-0.5 h-0.5 rounded-full bg-slate-300 dark:bg-slate-700"></span>
            <p className="text-[8px] text-indigo-500 dark:text-indigo-400 font-black uppercase tracking-widest">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Testimonials;