import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Star, Quote,
  Zap, Globe, Brain, Bot, Rocket, Target, Code2,
  TrendingUp, Users2, Clock, Sparkles, ChevronRight,
  FileSearch, Laptop, ShieldCheck, Play, BadgeCheck,
  MapPin, Circle, ExternalLink, QrCode, X, Award
} from 'lucide-react';
import {
  PROJECTS, SERVICES, TESTIMONIALS,
  GOOGLE_BUSINESS_NAME, GOOGLE_BUSINESS_URL,
  GOOGLE_VERIFICATION_PROOF_URL, BUSINESS_ADDRESS
} from '../constants';
import OptimizedImage from '../components/OptimizedImage';
import GoogleVerifiedBadge, { GoogleGIcon } from '../components/GoogleVerifiedBadge';

/* ─── Animated counter ───────────────────────────────────────────────────── */
const Counter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = Math.ceil(end / 40);
      const id = setInterval(() => {
        start = Math.min(start + step, end);
        setCount(start);
        if (start >= end) clearInterval(id);
      }, 35);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);
  return <span ref={ref}>{count}{suffix}</span>;
};

/* ─── Service icon map ───────────────────────────────────────────────────── */
const SVC_ICONS = [
  <Brain size={20} />, <Rocket size={20} />, <Bot size={20} />,
  <Globe size={20} />, <Target size={20} />, <Code2 size={20} />,
];

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Home: React.FC = () => {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const featured = PROJECTS.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-950 w-full overflow-x-hidden">

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <header className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 px-5 sm:px-10 lg:px-20 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_-10%,rgba(99,102,241,0.12),transparent)]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.018] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT ── copy */}
          <div className="space-y-8">

            {/* Status pill & Google Verified */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/80 shadow-xs text-[9px] font-black uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for Projects
              </div>
              <GoogleVerifiedBadge variant="pill" />
            </div>

            {/* H1 */}
            <div className="space-y-2">
              <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-outfit font-black text-slate-950 dark:text-white tracking-tight leading-[1.04] speakable">
                Build Smarter.
              </h1>
              <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-outfit font-black tracking-tight leading-[1.04]">
                <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-500 bg-clip-text text-transparent">
                  Automate Faster.
                </span>
              </h1>
              <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-outfit font-black text-slate-950 dark:text-white tracking-tight leading-[1.04]">
                Grow Bigger.
              </h1>
            </div>

            {/* Sub */}
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed speakable">
              AI automation, full-stack web development &amp; intelligent systems by <strong className="text-slate-800 dark:text-slate-100">Tushar Singh</strong> —
              <strong className="text-slate-700 dark:text-slate-200"> 10+ real products</strong> delivered
              to clients across India and worldwide.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link to="/contact"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-slate-950 dark:bg-indigo-600 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-500 transition-all shadow-xl active:scale-95">
                Start a Project
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/projects"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:border-indigo-300 dark:hover:border-indigo-500 transition-all active:scale-95">
                <Play size={12} className="fill-current" /> View Portfolio
              </Link>
            </div>

          </div>

          {/* RIGHT ── dashboard card */}
          <div className="w-full lg:w-auto lg:block">
            <div className="relative mx-auto lg:ml-auto max-w-[400px]">
              <div className="absolute -inset-6 bg-indigo-500/10 rounded-[3rem] blur-3xl" />
              <div className="relative bg-white dark:bg-slate-900 rounded-[2.25rem] border border-slate-100 dark:border-white/10 shadow-2xl p-6 space-y-4 animate-float">

                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Live Dashboard</p>
                    <p className="text-sm font-outfit font-extrabold text-slate-900 dark:text-white mt-0.5">Project Results</p>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-500/20 text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live
                  </span>
                </div>

                {/* Big metric */}
                <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-5 relative overflow-hidden shadow-sm">
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full" />
                  <p className="text-[8px] font-black text-indigo-200 uppercase tracking-widest mb-1">Total Value</p>
                  <p className="text-4xl font-outfit font-black text-white">₹2L+</p>
                  <p className="text-[9px] text-indigo-200 mt-1 flex items-center gap-1">
                    <TrendingUp size={10} /> Across 10+ real client projects
                  </p>
                </div>

                {/* 4 tiles */}
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { icon: <CheckCircle2 size={13} className="text-emerald-500" />, v: '10+', l: 'Projects', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
                    { icon: <Star size={13} className="text-amber-400 fill-amber-400" />, v: '4.0★', l: 'Rating', bg: 'bg-amber-50 dark:bg-amber-950/30' },
                    { icon: <Zap size={13} className="text-violet-500" />, v: '10h+', l: 'Saved/Wk', bg: 'bg-violet-50 dark:bg-violet-950/30' },
                    { icon: <Globe size={13} className="text-blue-500" />, v: '8+', l: 'Countries', bg: 'bg-blue-50 dark:bg-blue-950/30' },
                  ].map(({ icon, v, l, bg }) => (
                    <div key={l} className={`flex items-center gap-2.5 p-2.5 rounded-xl ${bg}`}>
                      {icon}
                      <div>
                        <p className="text-sm font-outfit font-extrabold text-slate-900 dark:text-white">{v}</p>
                        <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">{l}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Avatars */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/5">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Recent clients</p>
                  <div className="flex -space-x-2">
                    {['RM', 'PS', 'AR', 'KP', 'VN'].map((init, i) => (
                      <div key={i}
                        className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center text-white font-black text-[7px]"
                        style={{ background: ['#6366f1', '#10b981', '#8b5cf6', '#f59e0b', '#3b82f6'][i] }}>
                        {init}
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Google Business Verified QR Block ── */}
                <div className="pt-3 border-t border-slate-100 dark:border-white/5">
                  <div className="p-3 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-emerald-50/60 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-200/80 dark:border-white/5 rounded-2xl flex items-center gap-3">
                    {/* Clickable QR code */}
                    <div
                      onClick={() => setQrModalOpen(true)}
                      title="Click to scan or enlarge Google QR code"
                      className="relative w-14 h-14 bg-white p-1 rounded-xl border border-slate-200 dark:border-white/10 shrink-0 cursor-pointer shadow-xs hover:scale-105 transition-transform group"
                    >
                      <img
                        src="/google-business-qr.png"
                        alt="Tushar Singh freelancing - Google Business Profile QR"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-slate-950/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <QrCode size={14} className="text-white drop-shadow" />
                      </div>
                    </div>

                    {/* QR Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <GoogleGIcon size={12} />
                        <span className="text-[7.5px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-1.5 py-0.5 rounded">
                          Google Verified
                        </span>
                      </div>
                      <p className="text-[11px] font-outfit font-extrabold text-slate-900 dark:text-white truncate">
                        {GOOGLE_BUSINESS_NAME}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <a
                          href={GOOGLE_BUSINESS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[8.5px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Profile</span>
                          <ExternalLink size={8} />
                        </a>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <a
                          href={GOOGLE_VERIFICATION_PROOF_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[8.5px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5"
                        >
                          <span>Proof</span>
                          <Award size={8} />
                        </a>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <button
                          onClick={() => setQrModalOpen(true)}
                          className="text-[8.5px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                        >
                          Scan QR
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </header>





      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="py-24 sm:py-32 px-5 sm:px-10 bg-white dark:bg-slate-950" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-3">What I Build</p>
              <h2 id="services-heading" className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Core Services.
              </h2>
            </div>
            <Link to="/services"
              className="group inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 pb-1">
              All Services <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((svc, idx) => (
              <Link to="/services" key={svc.id}
                className="group relative bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 border border-slate-100 dark:border-white/5 hover:border-indigo-300/50 dark:hover:border-indigo-500/30 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0">
                  {SVC_ICONS[idx] || <Zap size={20} />}
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">
                  {svc.title.split(' | ')[0]}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                  {svc.description}
                </p>
                <ul className="space-y-1.5">
                  {svc.features.slice(0, 3).map((f: any, i: number) => (
                    <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      <CheckCircle2 size={11} className="text-emerald-500 shrink-0" />{f.label}
                    </li>
                  ))}
                </ul>
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                  <ArrowUpRight size={14} className="text-indigo-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT SPLIT ═══════════════ */}
      <section className="py-24 sm:py-32 px-5 sm:px-10 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-white/5" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Photo */}
          <div className="relative group order-2 lg:order-1">
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-[2.5rem] blur-2xl group-hover:opacity-150 transition-all duration-700" />
            <div className="relative rounded-[2rem] overflow-hidden bg-slate-950 border border-white/8 shadow-2xl aspect-[4/5] max-w-sm mx-auto">
              <OptimizedImage
                src="/me.webp"
                alt="Tushar Singh — AI Automation Expert & Full-Stack Developer, Delhi"
                className="opacity-90 group-hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />

              {/* Name overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-1">Tushar Singh</p>
                <p className="text-[10px] font-bold text-white/60">AI Automation Expert · Full-Stack Dev</p>
              </div>

              {/* Badge */}
              <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <BadgeCheck size={11} className="text-amber-400" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">4.0 Rated</span>
              </div>

              {/* Location */}
              <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                <MapPin size={10} className="text-emerald-400" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">Delhi, India</span>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="space-y-7 order-1 lg:order-2">
            <div>
              <p className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-3">The Developer</p>
              <h2 id="about-heading" className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Hi, I'm Tushar.
              </h2>
            </div>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              AI Automation Expert &amp; Full-Stack Developer from <strong className="text-slate-700 dark:text-slate-200">Delhi, India.</strong> I build
              AI agents, RAG chatbots, automation workflows, and full-stack web apps — turning complex
              technical problems into clean, scalable solutions that actually ship.
            </p>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              <strong className="text-slate-700 dark:text-slate-200">10+ real products</strong> submitted to clients.
              Every project represents a business problem solved — not just code written.
            </p>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: '10+', lbl: 'Projects' },
                { val: '4.0★', lbl: 'Rating' },
                { val: '₹2L+', lbl: 'Revenue' },
              ].map(({ val, lbl }) => (
                <div key={lbl} className="text-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm">
                  <p className="text-lg font-outfit font-extrabold text-indigo-600 dark:text-indigo-400">{val}</p>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {['Python', 'React.js', 'Django', 'n8n', 'OpenAI', 'LangChain', 'Power BI', 'TypeScript'].map(s => (
                <span key={s} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-[9px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                  {s}
                </span>
              ))}
            </div>

            <Link to="/about"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-lg active:scale-95">
              Full Story <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED PROJECTS ═══════════════ */}
      <section className="py-24 sm:py-32 px-5 sm:px-10 bg-white dark:bg-slate-950" aria-labelledby="projects-heading">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-12">
            <div>
              <p className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-3">Portfolio</p>
              <h2 id="projects-heading" className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white tracking-tight">
                Featured Work.
              </h2>
            </div>
            <Link to="/projects"
              className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:bg-slate-950 hover:text-white hover:border-slate-950 dark:hover:bg-white dark:hover:text-slate-950 dark:hover:border-white transition-all active:scale-95">
              Explore All <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* 3-column grid — first card spans 2 cols on lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((project, idx) => (
              <Link key={project.id} to="/projects"
                className={`group relative overflow-hidden rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 bg-slate-100 dark:bg-slate-900 ${idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.imageUrl}
                    loading="lazy"
                    decoding="async"
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-75 group-hover:opacity-95 transition-opacity" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <span className="text-[8px] font-black text-indigo-400 uppercase tracking-[0.25em] mb-1.5">{project.category}</span>
                  <h4 className="text-sm font-extrabold text-white leading-snug">{project.title}</h4>
                  <p className="text-[10px] text-white/50 mt-1 line-clamp-1">{project.description}</p>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                  <ArrowUpRight size={13} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ GOOGLE BUSINESS TRUST BANNER ═══════════════ */}
      <section className="py-8 px-5 sm:px-10 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <GoogleVerifiedBadge variant="banner" />
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-24 sm:py-32 px-5 sm:px-10 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-white/5" aria-labelledby="testi-heading">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em] mb-3">Client Proof</p>
            <h2 id="testi-heading" className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white tracking-tight">
              What Clients Say.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, idx) => {
              const initials = t.clientName.split(' ').map((n: string) => n[0]).slice(0, 2).join('');
              const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-violet-600'];
              return (
                <div key={t.id}
                  className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col gap-5">

                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {Array(4).fill(0).map((_, i) => (
                      <Star key={i} size={11} className="text-amber-400 fill-amber-400" />
                    ))}
                    <Star size={11} className="text-slate-200 dark:text-slate-700 fill-current" />
                  </div>

                  {/* Quote */}
                  <div className="flex-1">
                    <Quote size={22} className="text-slate-200 dark:text-slate-800 mb-3" />
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed">
                      "{t.content}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100 dark:border-white/5">
                    <div className={`w-9 h-9 rounded-xl ${colors[idx % colors.length]} flex items-center justify-center text-white font-black text-[11px] shrink-0`}>
                      {initials}
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white">{t.clientName}</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.clientRole}</p>
                    </div>
                    <ShieldCheck size={14} className="text-emerald-500 ml-auto shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ FREE AUDIT CTA ═══════════════ */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 overflow-hidden">

        {/* BG */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-5 sm:px-10 relative z-10">
          <div className="bg-slate-950 rounded-[2rem] p-10 sm:p-16 border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[8px] font-black uppercase tracking-widest mb-5">
                <Sparkles size={11} /> Free Offer
              </span>
              <h2 className="text-2xl sm:text-4xl font-outfit font-black text-white leading-tight mb-5">
                Get a Free AI Automation Audit
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-7">
                I'll review your current manual processes and show you exactly where AI can save <strong className="text-white">10+ hours per week</strong> — no strings attached.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <Link to="/contact"
                  className="px-8 py-4 bg-white text-slate-950 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">
                  Claim Free Audit
                </Link>
                <span className="flex items-center gap-2 text-[10px] text-white/50 font-bold uppercase tracking-widest">
                  <CheckCircle2 size={13} className="text-emerald-400" /> 4 slots left this month
                </span>
              </div>
            </div>

            {/* Right — 4 cards */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { icon: <FileSearch size={16} />, t: 'Workflow Audit', d: 'We map every manual step' },
                { icon: <Laptop size={16} />, t: 'Tool Review', d: 'Best tech stack?' },
                { icon: <TrendingUp size={16} />, t: 'ROI Forecast', d: 'Calculate potential gains' },
                { icon: <Zap size={16} />, t: 'Action Plan', d: 'Custom roadmap to automate' },
              ].map(({ icon, t, d }) => (
                <div key={t} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-all group">
                  <div className="w-9 h-9 bg-indigo-600/80 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform">
                    {icon}
                  </div>
                  <p className="text-white font-bold text-sm mb-1">{t}</p>
                  <p className="text-slate-400 text-xs">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-600/15 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="max-w-2xl mx-auto px-5 sm:px-10 text-center relative z-10 space-y-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest">
            <Sparkles size={12} /> Ready to Start?
          </span>

          <h2 id="cta-heading" className="text-3xl sm:text-5xl font-outfit font-black text-white tracking-tight leading-tight">
            Let's Build Something
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent bg-[length:200%] animate-gradient-flow">
              Intelligent Together.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            Available for AI automation, web development &amp; technical consulting worldwide.
            Let's discuss your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-white text-slate-950 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl active:scale-95">
              Start a Project <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
              View Services
            </Link>
          </div>

          <p className="text-slate-600 text-[9px] font-bold uppercase tracking-widest">
            Available Mon–Sat · India &amp; Worldwide
          </p>
        </div>
      </section>

      {/* ═══════════════ GOOGLE QR MODAL ═══════════════ */}
      {qrModalOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setQrModalOpen(false)}
        >
          <div
            className="relative max-w-sm w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-4 text-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
              <GoogleGIcon size={26} />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full mb-1.5">
                <ShieldCheck size={11} /> Google Verified Business
              </div>
              <h3 className="text-lg font-outfit font-extrabold text-slate-950 dark:text-white">
                {GOOGLE_BUSINESS_NAME}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {BUSINESS_ADDRESS.formatted}
              </p>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-slate-100 dark:border-white/5 inline-block shadow-inner">
              <img
                src="/google-business-qr.png"
                alt="Google Business QR Code"
                className="w-52 h-52 object-contain rounded-xl mx-auto"
              />
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Scan with your camera or click below to view profile &amp; verified ownership proof on Google.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95 shadow-sm"
              >
                <span>Google Profile</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={GOOGLE_VERIFICATION_PROOF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
              >
                <Award size={12} className="text-indigo-500" />
                <span>Verify Proof</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;
