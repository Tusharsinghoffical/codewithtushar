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
  const techStack = [
    'Python', 'Django', 'React.js', 'n8n Automation',
    'Power BI', 'SQL', 'Machine Learning', 'AI Agents',
    'REST APIs', 'OpenAI', 'LangChain', 'Tailwind CSS',
  ];

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

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* LEFT COLUMN (7 Cols) ── Clean, Spacious, High-Impact */}
          <div className="lg:col-span-7 space-y-6 text-left">

            {/* Top Pill: Availability + Google Verified */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200/80 dark:border-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-950/40 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Available for Projects
              </span>
              <GoogleVerifiedBadge variant="pill" />
            </div>

            {/* Main Headline (H1) with Motto Accent */}
            <div className="space-y-3">
              <div className="inline-block">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-lg border border-indigo-200/60 dark:border-indigo-500/20">
                  ⚡ Build once, convert always.
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.08] speakable">
                Empowering Vision. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  Automating Growth.
                </span> <br />
                Delivering Certainty.
              </h1>
            </div>

            {/* Subheadline (Work-Centric, Value-Driven) */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed speakable">
              Main aapke repetitive workflows ko self-running <strong className="text-indigo-600 dark:text-indigo-400 font-bold">AI Automations</strong> mein convert karta hoon, 24/7 leads capture karne wale <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Smart Chatbots</strong> build karta hoon, aur high-converting <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Web Platforms</strong> engineer karta hoon jo direct revenue badhate hain.
            </p>

            {/* 2 Clean Trust Bullets */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                <span>Direct 1-on-1 Execution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                <span>100% Reliable Delivery &amp; Support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                <span>Save 10+ hrs/wk with AI</span>
              </div>
            </div>

            {/* CTAs & Reassurance */}
            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-3.5">
                <Link
                  to="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest transition-all shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-95"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/projects"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:border-indigo-400 dark:hover:border-indigo-500 transition-all active:scale-95 shadow-xs"
                >
                  <Play size={12} className="fill-indigo-500 text-indigo-500" />
                  <span>View 10+ Projects</span>
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                <span>Free 30-min strategy audit · Response in &lt; 2 hrs · Zero commitment</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN (5 Cols) ── Glassmorphism Live Showcase & QR Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative mx-auto max-w-[400px] lg:max-w-none">
              <div className="absolute -inset-6 bg-gradient-to-tr from-indigo-500/15 to-violet-500/10 rounded-[3rem] blur-3xl pointer-events-none" />

              <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2.25rem] border border-slate-200/80 dark:border-white/10 shadow-2xl p-6 space-y-4">

                {/* Card Header: Live Dashboard */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <TrendingUp size={15} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Live Dashboard</p>
                      <h2 className="text-xs font-outfit font-black text-slate-900 dark:text-white">Project Results</h2>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/30 text-[8.5px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live
                  </span>
                </div>

                {/* Total Value Gradient Banner */}
                <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-4 relative overflow-hidden text-white shadow-md">
                  <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-white/5 rounded-full blur-sm pointer-events-none" />
                  <p className="text-[8.5px] font-black text-indigo-200 uppercase tracking-widest mb-0.5">Total Value Delivered</p>
                  <p className="text-3xl sm:text-4xl font-outfit font-black text-white">₹2L+</p>
                  <p className="text-[9.5px] text-indigo-100 mt-1 flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-emerald-300" />
                    <span>Across 10+ real client deliverables</span>
                  </p>
                </div>

                {/* 4 Metric Tiles */}
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { icon: <CheckCircle2 size={13} className="text-emerald-500" />, v: '10+',  l: 'Projects',  bg: 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-500/10' },
                    { icon: <Star size={13} className="text-amber-400 fill-amber-400" />,       v: '4.0★', l: 'Rating', bg: 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-100 dark:border-amber-500/10' },
                    { icon: <Zap size={13} className="text-violet-500" />,                      v: '10h+', l: 'Saved/Wk', bg: 'bg-violet-50/70 dark:bg-violet-950/30 border-violet-100 dark:border-violet-500/10' },
                    { icon: <Globe size={13} className="text-blue-500" />,                      v: '8+',   l: 'Countries', bg: 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-100 dark:border-blue-500/10' },
                  ].map(({ icon, v, l, bg }) => (
                    <div key={l} className={`flex items-center gap-2.5 p-2.5 rounded-xl border ${bg}`}>
                      {icon}
                      <div className="min-w-0">
                        <p className="text-sm font-outfit font-extrabold text-slate-900 dark:text-white leading-tight">{v}</p>
                        <p className="text-[7.5px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">{l}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Official Google Business Verified QR Subcard ── */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                  <div className="p-3 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-emerald-50/60 dark:from-slate-800/80 dark:to-slate-800/50 border border-slate-200/80 dark:border-white/10 rounded-2xl flex items-center gap-3">
                    {/* Clickable QR code */}
                    <button
                      type="button"
                      onClick={() => setQrModalOpen(true)}
                      title="Click to scan or enlarge Google QR code"
                      className="relative w-13 h-13 bg-white p-1 rounded-xl border border-slate-200 dark:border-white/10 shrink-0 cursor-pointer shadow-xs hover:scale-105 transition-transform group text-left"
                    >
                      <img
                        src="/google-business-qr.png"
                        alt="Tushar Singh freelancing - Google Business Profile QR"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <QrCode size={15} className="text-white drop-shadow" />
                      </div>
                    </button>

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
                          type="button"
                          onClick={() => setQrModalOpen(true)}
                          className="text-[8.5px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white cursor-pointer"
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

      {/* ═══════════════ MARQUEE ═══════════════ */}
      <div className="py-4 bg-slate-950 border-y border-white/5 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-10">
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i} className="flex items-center gap-3 text-white/25 hover:text-indigo-400 font-outfit font-black text-sm uppercase tracking-wider transition-colors">
              {t} <Sparkles size={12} className="text-white/10 shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="py-14 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto px-5 sm:px-10 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-slate-200 dark:divide-white/10">
          {[
            { end: 10, suffix: '+', label: 'Projects Delivered', sub: 'Real products to clients' },
            { end: 2,  suffix: 'L+', label: '₹ Value Delivered', sub: 'Across all engagements' },
            { end: 10, suffix: 'h+', label: 'Saved per Week',    sub: 'Via automation systems' },
            { end: 8,  suffix: '+',  label: 'Countries',         sub: 'India & worldwide' },
          ].map(({ end, suffix, label, sub }) => (
            <div key={label} className="text-center px-4 sm:px-8">
              <p className="text-3xl sm:text-4xl font-outfit font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
                <Counter end={end} suffix={suffix} />
              </p>
              <p className="text-xs font-extrabold text-slate-800 dark:text-white mt-1">{label}</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

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
                { icon: <Laptop size={16} />,     t: 'Tool Review',    d: 'Best tech stack?' },
                { icon: <TrendingUp size={16} />, t: 'ROI Forecast',   d: 'Calculate potential gains' },
                { icon: <Zap size={16} />,        t: 'Action Plan',    d: 'Custom roadmap to automate' },
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
