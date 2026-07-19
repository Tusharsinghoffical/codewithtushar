import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2, TrendingUp, Users2, Rocket, ShieldCheck, Zap, Cpu,
  Clock, MapPin, Sparkles, Database, Globe, Terminal, Activity,
  ArrowRight, Brain, BarChart3, Quote, CheckCircle, FileSearch,
  Laptop, Star, Award, Code2, Workflow, Bot, Target, ArrowUpRight,
  ChevronRight, Play
} from 'lucide-react';
import { PROJECTS, SERVICES, TESTIMONIALS } from '../constants';
import OptimizedImage from '../components/OptimizedImage';

/* ─── Small reusable components ─────────────────────────────────────────── */

const StatBadge = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-center gap-3 px-5 py-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
    <div className="text-indigo-500 dark:text-indigo-400 shrink-0">{icon}</div>
    <div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-[11px] font-extrabold text-slate-900 dark:text-white whitespace-nowrap">{value}</p>
    </div>
  </div>
);

const ServiceCard = ({ service, idx }: { service: any; idx: number }) => {
  const icons = [<Brain size={22} />, <Rocket size={22} />, <Bot size={22} />, <Globe size={22} />, <Target size={22} />, <Code2 size={22} />];
  return (
    <div className="group relative bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-3xl p-7 hover:border-indigo-400/40 hover:shadow-2xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-400">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-violet-500/0 group-hover:from-indigo-500/[0.03] group-hover:to-violet-500/[0.03] transition-all duration-500 pointer-events-none"></div>
      <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
        {icons[idx] || <Zap size={22} />}
      </div>
      <h3 className="text-base font-extrabold text-slate-900 dark:text-white mb-3 leading-snug">{service.title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5">{service.description}</p>
      <ul className="space-y-2">
        {service.features.slice(0, 3).map((f: any, i: number) => (
          <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            <CheckCircle2 size={12} className="text-emerald-500 shrink-0" />{f.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AuditCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] hover:border-indigo-400/30 transition-all group">
    <div className="w-9 h-9 bg-indigo-600/80 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-white font-bold text-sm mb-1">{title}</p>
    <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
  </div>
);

/* ─── Main Component ─────────────────────────────────────────────────────── */

const Home: React.FC = () => {
  const featuredPreview = PROJECTS.filter(p => p.isFeatured).slice(0, 3);
  const techStack = ["Python", "Django", "React.js", "n8n Automation", "Power BI", "SQL",
    "Machine Learning", "AI Agents", "REST APIs", "Data Engineering", "Tailwind CSS", "OpenAI"];

  return (
    <div className="bg-white dark:bg-slate-950 w-full relative overflow-x-hidden">

      {/* ═══════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════ */}
      <header className="relative min-h-[100vh] flex items-center pt-28 pb-16 px-4 sm:px-10 lg:px-16">
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
          <div className="absolute -top-40 right-0 w-[700px] h-[700px] bg-indigo-100 dark:bg-indigo-950/30 rounded-full blur-[140px] animate-drift" />
          <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-violet-100 dark:bg-violet-900/10 rounded-full blur-[120px] animate-drift" style={{ animationDelay: '3s' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* Left — Copy */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-8">

              {/* Live badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950 dark:bg-white/10 dark:border dark:border-white/10 text-white text-[9px] font-black uppercase tracking-[0.3em] shadow-lg animate-fade-in-up">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for Projects — India &amp; Worldwide
              </div>

              {/* H1 */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.05] animate-fade-in-up speakable">
                AI Automation,{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-600 bg-clip-text text-transparent bg-[length:200%] animate-gradient-flow">
                    Dashboard
                  </span>
                </span>
                <br />
                &amp; Full-Stack
                <br />
                <span className="relative">
                  Development.
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full opacity-40" />
                </span>
              </h1>

              {/* Subtext */}
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed font-medium animate-fade-in-up speakable">
                A collection of <strong className="text-slate-700 dark:text-slate-200">25+ projects</strong> demonstrating
                expertise in AI automation, web development, and intelligent systems. Each project reflects
                commitment to quality and technical excellence — serving clients across every state of India.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 animate-fade-in-up">
                <Link
                  to="/projects"
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-extrabold text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-xl active:scale-95"
                >
                  View Portfolio <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="group w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl font-extrabold text-xs uppercase tracking-widest hover:border-indigo-300 hover:bg-indigo-50/40 transition-all active:scale-95"
                >
                  <Play size={13} className="fill-current" /> Explore Projects
                </Link>
              </div>

              {/* Stat badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 animate-fade-in-up">
                <StatBadge icon={<Users2 size={15} />} label="Experience" value="25+ Projects Completed" />
                <StatBadge icon={<TrendingUp size={15} />} label="Impact" value="₹50L+ Value Delivered" />
              </div>
            </div>

            {/* Right — Visual card */}
            <div className="lg:col-span-5 hidden lg:flex justify-center items-center animate-reveal-scale">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-[2.5rem] blur-3xl animate-pulse" />
                <div className="relative bg-slate-950 dark:bg-slate-900 rounded-[2.5rem] p-8 border border-white/[0.07] shadow-2xl group hover:border-white/20 transition-all duration-700 animate-float">
                  {/* Header */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-11 h-11 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400 border border-white/10">
                      <Terminal size={20} />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">Online</span>
                    </div>
                  </div>
                  {/* Stat block */}
                  <div className="p-5 bg-white/5 rounded-2xl border border-white/[0.06] mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity size={11} className="text-indigo-400" />
                      <span className="text-[8px] font-black text-indigo-400 uppercase tracking-widest">Expertise</span>
                    </div>
                    <p className="text-2xl font-outfit font-extrabold text-white">25+ Projects</p>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">AI &amp; Web Solutions</p>
                  </div>
                  {/* Skill pills */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {[{icon: <Database size={13} className="text-blue-400" />, label: 'Data'},
                      {icon: <Zap size={13} className="text-amber-400" />, label: 'AI'},
                      {icon: <Globe size={13} className="text-emerald-400" />, label: 'Web'}
                    ].map(({icon, label}) => (
                      <div key={label} className="p-3 bg-white/5 rounded-xl border border-white/5 flex flex-col items-center gap-1.5 hover:border-white/20 transition-colors">
                        {icon}
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════
          MARQUEE TECH TICKER
      ═══════════════════════════════════════════════ */}
      <div className="py-5 bg-slate-950 overflow-hidden border-y border-white/5">
        <div className="flex animate-marquee whitespace-nowrap gap-10 sm:gap-14">
          {[...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="flex items-center gap-3 group">
              <span className="text-white/30 font-outfit font-black text-lg uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                {tech}
              </span>
              <Sparkles className="text-white/10 w-4 h-4 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          SERVICES SECTION
      ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-50/50 dark:bg-slate-950 relative" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">

          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-4">
                <Zap size={12} className="fill-current" /> Core Solutions
              </div>
              <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                Technical <span className="text-indigo-600 dark:text-indigo-400">Expertise.</span>
              </h2>
            </div>
            <Link to="/services"
              className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0">
              All Services <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((service, idx) => (
              <ServiceCard key={service.id} service={service} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ABOUT SECTION
      ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-900/20 border-y border-slate-100 dark:border-white/5" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Photo */}
            <div className="relative group">
              <div className="absolute -inset-6 bg-indigo-500/8 rounded-[3rem] blur-3xl group-hover:bg-indigo-500/14 transition-all duration-700" />
              <div className="relative aspect-square bg-slate-950 rounded-[2.5rem] overflow-hidden border border-white/8 shadow-2xl">
                <OptimizedImage
                  src="/me.webp"
                  alt="Tushar Singh - AI Automation Expert and Full-Stack Developer from Delhi India"
                  className="opacity-90 group-hover:scale-105 transition-transform duration-1000"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-7 left-7">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-1">Architect</p>
                  <p className="text-lg font-outfit font-extrabold text-white">Tushar Singh</p>
                </div>
                {/* Floating achievement pill */}
                <div className="absolute top-6 right-6 flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                  <Award size={12} className="text-amber-400" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">5.0 Rating</span>
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="space-y-7">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-px bg-indigo-500" />
                  <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">About the Expert</span>
                </div>
                <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
                  About the <span className="text-indigo-600 dark:text-indigo-400">Developer.</span>
                </h2>
              </div>

              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-sm sm:text-base">
                I'm <strong className="text-slate-800 dark:text-slate-200">Tushar Singh</strong>, an AI Automation Expert &amp; Full-Stack
                Developer from Delhi. With a portfolio of <strong className="text-slate-800 dark:text-slate-200">25+ projects</strong>,
                I specialize in developing AI agents, chatbots, web applications, and automation systems.
                My work demonstrates technical proficiency and commitment to delivering quality solutions.
              </p>

              {/* Quick stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '25+', label: 'Projects' },
                  { value: '5.0★', label: 'Rating' },
                  { value: '₹50L+', label: 'Revenue' },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5">
                    <p className="text-xl font-outfit font-extrabold text-indigo-600 dark:text-indigo-400">{value}</p>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              <Link to="/about"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-lg active:scale-95">
                Read Full Story <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-50/50 dark:bg-slate-950 relative" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-400/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest mb-4">
              <ShieldCheck size={12} className="fill-current" /> Verified Proof
            </div>
            <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight">
              Professional <span className="text-indigo-600 dark:text-indigo-400">References.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => {
              const initials = t.clientName.split(' ').map((n: string) => n[0]).slice(0, 2).join('');
              const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-violet-600'];
              return (
                <div key={t.id}
                  className="relative bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-3xl p-7 hover:border-indigo-400/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-400">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-5">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote size={28} className="text-indigo-200 dark:text-indigo-900 mb-4" />
                  <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed mb-7">"{t.content}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100 dark:border-white/5">
                    <div className={`w-10 h-10 rounded-xl ${colors[idx % colors.length]} flex items-center justify-center text-white font-black text-xs shrink-0`}>
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white">{t.clientName}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t.clientRole}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FREE AUDIT CTA BANNER
      ═══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
        <div className="max-w-7xl mx-auto px-5 sm:px-10 relative z-10">
          <div className="bg-slate-950 rounded-[2.5rem] p-10 sm:p-16 border border-white/10 shadow-2xl overflow-hidden relative">
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-5">
                  <Sparkles size={12} className="fill-current" /> High Value Offer
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-extrabold text-white leading-tight mb-5">
                  Get a Free{' '}
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    AI Automation Audit.
                  </span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  I'll review your current processes and reveal exactly where AI can save you
                  <strong className="text-white"> 10+ hours a week</strong> and increase your revenue. Zero commitment.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link to="/contact"
                    className="px-8 py-4 bg-white text-slate-950 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:scale-105 hover:bg-indigo-50 active:scale-95 transition-all shadow-lg">
                    Claim Your Free Audit
                  </Link>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                    <span className="text-white/50 text-[10px] font-bold uppercase tracking-widest">Only 4 slots left this month</span>
                  </div>
                </div>
              </div>
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <AuditCard icon={<FileSearch size={18} />} title="Workflow Audit" desc="We map every manual step in your process." />
                <AuditCard icon={<Laptop size={18} />} title="Tool Review" desc="Are you using the best tech stack?" />
                <AuditCard icon={<TrendingUp size={18} />} title="ROI Predictor" desc="Calculate your potential gains." />
                <AuditCard icon={<Zap size={18} />} title="Action Plan" desc="A custom roadmap to automate." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PROJECTS
      ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-white dark:bg-slate-900/20 border-y border-slate-100 dark:border-white/5" aria-labelledby="projects-heading">
        <div className="max-w-7xl mx-auto px-5 sm:px-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-indigo-500" />
                <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">Curated Preview</span>
              </div>
              <h2 id="projects-heading" className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight">
                Featured Projects.
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 font-medium">
                A selection of projects demonstrating technical capabilities and solutions.
              </p>
            </div>
            <Link to="/projects"
              className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-700 dark:text-white hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all active:scale-95">
              Explore All <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPreview.map((project, idx) => (
              <Link key={project.id} to="/projects"
                className="group block relative rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 aspect-video">
                <img
                  src={project.imageUrl}
                  loading="lazy"
                  decoding="async"
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">{project.category}</span>
                  <h4 className="text-base font-outfit font-extrabold text-white leading-snug">{project.title}</h4>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <ArrowUpRight size={14} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-slate-950 text-center relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse" />
        </div>
        <div className="max-w-2xl mx-auto px-5 sm:px-10 relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest">
            <Sparkles size={12} /> Accelerate Your Growth
          </div>
          <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-white tracking-tight leading-tight">
            Interested in{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%] animate-gradient-flow">
              Collaboration?
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium max-w-lg mx-auto">
            I'm available for projects in AI automation, web development, and technical consulting.
            Let's discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-slate-950 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl active:scale-95">
              Get in Touch <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
              View Services
            </Link>
          </div>
          <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">
            Replies within 1 hour · Mon–Sat · Pan India &amp; Worldwide
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;
