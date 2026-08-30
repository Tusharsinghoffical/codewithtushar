import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, CheckCircle2, Star, Quote,
  Zap, Globe, Brain, Bot, Rocket, Target, Code2,
  TrendingUp, Sparkles, ChevronRight,
  FileSearch, Laptop, ShieldCheck, Play, BadgeCheck,
  MapPin, ExternalLink, QrCode, X, Award, Flame
} from 'lucide-react';
import {
  PROJECTS, SERVICES, TESTIMONIALS,
  GOOGLE_BUSINESS_NAME, GOOGLE_BUSINESS_URL,
  GOOGLE_VERIFICATION_PROOF_URL, BUSINESS_ADDRESS,
  FIVERR_PROFILE_URL
} from '../constants';
import OptimizedImage from '../components/OptimizedImage';
import GoogleVerifiedBadge, { GoogleGIcon } from '../components/GoogleVerifiedBadge';
import { FiverrIcon, FiverrBadge } from '../components/FiverrBadge';

/* ─── Service icon map ───────────────────────────────────────────────────── */
const SVC_ICONS = [
  <Brain size={22} />, <Rocket size={22} />, <Bot size={22} />,
  <Globe size={22} />, <Target size={22} />, <Code2 size={22} />,
];

/* ─── Main Component ─────────────────────────────────────────────────────── */
const Home: React.FC = () => {
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const featured = PROJECTS.filter(p => p.isFeatured).slice(0, 3);

  return (
    <div className="bg-white dark:bg-slate-950 w-full overflow-x-hidden transition-colors duration-300">

      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <section className="relative flex items-center justify-center pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden">

        {/* Ambient Glow & Grid Layer */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[140px]" />
          <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* LEFT: Copy & Direct Value (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-7 text-left">

              {/* Top Pill: Availability, Google Verified & Fiverr Verified */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-200/90 dark:border-emerald-500/20 bg-emerald-50/80 dark:bg-emerald-950/40 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 shadow-2xs">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Available for Projects
                </span>
                <GoogleVerifiedBadge variant="pill" />
                <FiverrBadge variant="pill" />
              </div>

              {/* H1 Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.08] speakable">
                Build Smarter. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                  Automate Faster.
                </span> <br />
                Grow Bigger.
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed speakable">
                AI automation, full-stack web development &amp; intelligent systems by <strong className="text-slate-950 dark:text-white font-bold">Tushar Singh</strong> —
                <strong className="text-indigo-600 dark:text-indigo-400 font-bold"> 10+ real products</strong> delivered
                to clients across India and worldwide. Order directly or via Fiverr with buyer protection.
              </p>

              {/* 3 Clean Trust Checkpoints */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  <span>1-on-1 Direct Engineering</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  <span>100% Reliable Delivery &amp; Escrow</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                  <span>Save 10+ hrs/wk with AI</span>
                </div>
              </div>

              {/* CTAs & Reassurance */}
              <div className="space-y-3 pt-1">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-95"
                  >
                    <span>Start a Project</span>
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <a
                    href={FIVERR_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#1DBF73] hover:bg-[#19a463] text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-emerald-500/25 hover:scale-[1.02] active:scale-95"
                  >
                    <FiverrIcon size={16} className="brightness-125" />
                    <span>Hire on Fiverr</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                  <Link
                    to="/projects"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:border-indigo-400 dark:hover:border-indigo-500 transition-all active:scale-95 shadow-xs"
                  >
                    <Play size={12} className="fill-indigo-500 text-indigo-500" />
                    <span>Portfolio</span>
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  <span>Free 30-min strategy audit · Response in &lt; 2 hrs · Escrow Protection</span>
                </div>
              </div>

            </div>

            {/* RIGHT: Glassmorphism Live Dashboard HUD (Compact & Balanced) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
              <div className="relative w-full max-w-[340px]">
                <div className="absolute -inset-3 bg-gradient-to-tr from-indigo-500/15 to-violet-500/10 rounded-3xl blur-2xl pointer-events-none" />

                <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-xl p-4 sm:p-5 space-y-3.5">

                  {/* Card Header: Live Dashboard */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        <TrendingUp size={14} />
                      </div>
                      <div>
                        <p className="text-[7.5px] font-black text-slate-400 uppercase tracking-widest">Live Dashboard</p>
                        <h2 className="text-xs font-outfit font-black text-slate-900 dark:text-white">Project Results</h2>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/30 text-[8px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Live
                    </span>
                  </div>

                  {/* Total Value Gradient Banner (Compact) */}
                  <div className="rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-600 p-3.5 relative overflow-hidden text-white shadow-md">
                    <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/5 rounded-full blur-sm pointer-events-none" />
                    <p className="text-[8px] font-black text-indigo-200 uppercase tracking-widest">Total Value Delivered</p>
                    <p className="text-2xl sm:text-3xl font-outfit font-black text-white leading-tight mt-0.5">₹2L+</p>
                    <p className="text-[9px] text-indigo-100 mt-0.5 flex items-center gap-1">
                      <CheckCircle2 size={11} className="text-emerald-300" />
                      <span>Across 10+ client deliverables</span>
                    </p>
                  </div>

                  {/* 4 Metric Tiles (Compact) */}
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: <CheckCircle2 size={12} className="text-emerald-500" />, v: '10+',  l: 'Projects',  bg: 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-500/10' },
                      { icon: <Star size={12} className="text-amber-400 fill-amber-400" />,       v: '4.0★', l: 'Rating', bg: 'bg-amber-50/70 dark:bg-amber-950/30 border-amber-100 dark:border-amber-500/10' },
                      { icon: <Zap size={12} className="text-violet-500" />,                      v: '10h+', l: 'Saved/Wk', bg: 'bg-violet-50/70 dark:bg-violet-950/30 border-violet-100 dark:border-violet-500/10' },
                      { icon: <ShieldCheck size={12} className="text-blue-500" />,                v: '< 1 Hr', l: 'Response', bg: 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-100 dark:border-blue-500/10' },
                    ].map(({ icon, v, l, bg }) => (
                      <div key={l} className={`flex items-center gap-2 p-2 rounded-lg border ${bg}`}>
                        {icon}
                        <div className="min-w-0">
                          <p className="text-xs font-outfit font-extrabold text-slate-900 dark:text-white leading-tight">{v}</p>
                          <p className="text-[7px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">{l}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Clients Initial Badges */}
                  <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-white/5">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Recent clients</span>
                    <div className="flex -space-x-1.5">
                      {['RM','PS','AR','KP','VN'].map((init, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border border-white dark:border-slate-900 flex items-center justify-center text-white font-black text-[7px] shadow-xs"
                          style={{ background: ['#6366f1','#10b981','#8b5cf6','#f59e0b','#3b82f6'][i] }}
                          title={`Client ${init}`}
                        >
                          {init}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Official Google Business Verified QR Subcard (Compact) ── */}
                  <div className="pt-1.5 border-t border-slate-100 dark:border-white/5">
                    <div className="p-2.5 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-emerald-50/60 dark:from-slate-800/80 dark:to-slate-800/50 border border-slate-200/80 dark:border-white/10 rounded-xl flex items-center gap-2.5">
                      {/* Clickable QR code */}
                      <button
                        type="button"
                        onClick={() => setQrModalOpen(true)}
                        title="Click to scan or enlarge Google QR code"
                        className="relative w-11 h-11 bg-white p-0.5 rounded-lg border border-slate-200 dark:border-white/10 shrink-0 cursor-pointer shadow-xs hover:scale-105 transition-transform group text-left"
                      >
                        <img
                          src="/google-business-qr.png"
                          alt="Tushar Singh freelancing - Google Business Profile QR"
                          className="w-full h-full object-contain rounded-md"
                        />
                        <div className="absolute inset-0 bg-slate-950/30 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <QrCode size={13} className="text-white drop-shadow" />
                        </div>
                      </button>

                      {/* QR Details */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1 mb-0.5">
                          <GoogleGIcon size={11} />
                          <span className="text-[7px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-1 py-0.2 rounded">
                            Google Verified
                          </span>
                        </div>
                        <p className="text-[11px] font-outfit font-extrabold text-slate-900 dark:text-white truncate">
                          {GOOGLE_BUSINESS_NAME}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <a
                            href={GOOGLE_BUSINESS_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[8px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
                          >
                            <span>Profile</span>
                            <ExternalLink size={7} />
                          </a>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <button
                            type="button"
                            onClick={() => setQrModalOpen(true)}
                            className="text-[8px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white cursor-pointer"
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

          {/* ── Modern Tech Stack Trust Strip (fills dead gap seamlessly) ── */}
          <div className="pt-10 sm:pt-12 mt-6 border-t border-slate-100 dark:border-white/5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                  Core Technologies &amp; Systems
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 sm:gap-2.5">
                {[
                  { name: 'Python', tag: 'AI & Automation' },
                  { name: 'React.js', tag: 'Frontend' },
                  { name: 'n8n & Zapier', tag: 'Workflows' },
                  { name: 'OpenAI & RAG', tag: 'LLM Agents' },
                  { name: 'FastAPI / Django', tag: 'Backend' },
                  { name: 'PostgreSQL', tag: 'Database' },
                  { name: 'Tailwind CSS', tag: 'UI Design' },
                ].map(tech => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/70 dark:border-white/5 text-[10.5px] font-bold text-slate-700 dark:text-slate-300 shadow-2xs hover:border-indigo-400 dark:hover:border-indigo-500/40 transition-colors"
                  >
                    <span className="font-extrabold text-slate-900 dark:text-white">{tech.name}</span>
                    <span className="text-[8.5px] text-slate-400 dark:text-slate-500 font-medium">({tech.tag})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════ 2. CORE SERVICES ═══════════════════════ */}
      <section className="pt-10 sm:pt-14 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-900/20 border-t border-slate-100 dark:border-white/5" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-1.5 flex items-center gap-1.5">
                <Flame size={13} className="text-amber-500" />
                What I Build
              </p>
              <h2 id="services-heading" className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Core Services.
              </h2>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0 pb-1"
            >
              <span>All Services</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, idx) => (
              <Link
                to="/services"
                key={svc.id}
                className="group relative bg-white dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:border-indigo-400/80 dark:hover:border-indigo-500/50 rounded-3xl p-7 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                    {SVC_ICONS[idx] || <Zap size={22} />}
                  </div>
                  <h3 className="text-base font-outfit font-black text-slate-950 dark:text-white mb-2 leading-snug">
                    {svc.title.split(' | ')[0]}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-3">
                    {svc.description}
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <ul className="space-y-2">
                    {svc.features.slice(0, 3).map((f: any, i: number) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span>{f.label}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 pt-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Explore Service</span>
                    <ArrowRight size={13} />
                  </div>
                </div>

                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                  <ArrowUpRight size={16} className="text-indigo-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 3. ABOUT DEVELOPER ═══════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Photo Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1 flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-emerald-500/10 rounded-[2.5rem] blur-2xl group-hover:opacity-150 transition-all duration-700" />
              <div className="relative rounded-[2.25rem] overflow-hidden bg-slate-950 border border-slate-200 dark:border-white/10 shadow-2xl aspect-[4/5] w-full">
                <OptimizedImage
                  src="/tushar-singh.webp"
                  alt="Tushar Singh — AI Automation Expert & Full-Stack Developer, Delhi"
                  className="opacity-95 group-hover:scale-105 transition-transform duration-1000 w-full h-full object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Name overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Tushar Singh</p>
                  <p className="text-xs font-bold text-white/90">AI Automation Expert · Full-Stack Dev</p>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/70 backdrop-blur-md rounded-xl border border-white/10">
                  <BadgeCheck size={13} className="text-amber-400" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">4.0 Rated</span>
                </div>

                {/* Location Badge */}
                <div className="absolute top-5 left-5 flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/70 backdrop-blur-md rounded-xl border border-white/10">
                  <MapPin size={12} className="text-emerald-400" />
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">Delhi, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Story (7 Cols) */}
          <div className="lg:col-span-7 space-y-7 order-1 lg:order-2 text-left">
            <div>
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-2">The Developer</p>
              <h2 id="about-heading" className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white tracking-tight leading-tight">
                Hi, I'm Tushar.
              </h2>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              AI Automation Expert &amp; Full-Stack Developer from <strong className="text-slate-950 dark:text-white font-bold">Delhi, India.</strong> I build
              autonomous AI agents, RAG chatbots, workflow automations, and full-stack web platforms — turning complex
              technical bottlenecks into clean, scalable systems that accelerate revenue.
            </p>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              <strong className="text-indigo-600 dark:text-indigo-400 font-bold">10+ real products</strong> delivered to commercial clients.
              Every engagement represents a measurable business problem solved — not just code written.
            </p>

            {/* Stat row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { val: '10+', lbl: 'Projects' },
                { val: '4.0★', lbl: 'Rating' },
                { val: '₹2L+', lbl: 'Revenue' },
              ].map(({ val, lbl }) => (
                <div key={lbl} className="text-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-2xs">
                  <p className="text-xl font-outfit font-black text-indigo-600 dark:text-indigo-400">{val}</p>
                  <p className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-2">
              {['Python', 'React.js', 'Django', 'n8n', 'OpenAI', 'LangChain', 'Power BI', 'TypeScript'].map(s => (
                <span key={s} className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  {s}
                </span>
              ))}
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
            >
              <span>Full Story</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 4. FEATURED WORK ═══════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-900/20" aria-labelledby="projects-heading">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-5 mb-12">
            <div>
              <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] mb-2">Portfolio</p>
              <h2 id="projects-heading" className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white tracking-tight">
                Featured Work.
              </h2>
            </div>
            <Link
              to="/projects"
              className="group shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-slate-200 dark:border-white/10 text-xs font-black uppercase tracking-widest text-slate-700 dark:text-slate-300 hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-slate-950 transition-all active:scale-95"
            >
              <span>Explore All</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((project) => (
              <Link
                key={project.id}
                to="/projects"
                className="group relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 bg-slate-100 dark:bg-slate-900 flex flex-col justify-end h-80"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    loading="lazy"
                    decoding="async"
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
                <div className="relative p-6 z-10">
                  <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.25em] mb-1.5 block">{project.category}</span>
                  <h4 className="text-base font-outfit font-black text-white leading-snug">{project.title}</h4>
                  <p className="text-xs text-white/70 mt-1.5 line-clamp-2">{project.description}</p>
                </div>
                <div className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all z-10">
                  <ArrowUpRight size={15} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 5. GOOGLE BUSINESS LOCAL SEO BANNER ═══════════════════════ */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <GoogleVerifiedBadge variant="banner" />
        </div>
      </section>

      {/* ═══════════════════════ 6. CLIENT TESTIMONIALS ═══════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50/60 dark:bg-slate-900/30 border-y border-slate-100 dark:border-white/5" aria-labelledby="testi-heading">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-14 space-y-2">
            <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em]">Client Proof</p>
            <h2 id="testi-heading" className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white tracking-tight">
              What Clients Say.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => {
              const initials = t.clientName.split(' ').map((n: string) => n[0]).slice(0, 2).join('');
              const colors = ['bg-indigo-600', 'bg-emerald-600', 'bg-violet-600'];
              return (
                <div
                  key={t.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-7 sm:p-8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between gap-6 h-full"
                >
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-1">
                      {Array(4).fill(0).map((_, i) => (
                        <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                      ))}
                      <Star size={13} className="text-slate-200 dark:text-slate-700 fill-current" />
                    </div>

                    {/* Quote */}
                    <p className="text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                      "{t.content}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3.5 pt-5 border-t border-slate-100 dark:border-white/5">
                    <div className={`w-10 h-10 rounded-2xl ${colors[idx % colors.length]} flex items-center justify-center text-white font-black text-xs shrink-0 shadow-xs`}>
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-outfit font-black text-slate-950 dark:text-white truncate">{t.clientName}</p>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest truncate">{t.clientRole}</p>
                    </div>
                    <ShieldCheck size={16} className="text-emerald-500 ml-auto shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 7. FREE AI AUDIT BANNER ═══════════════════════ */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-slate-50 border-y border-slate-200/80 overflow-hidden">
        {/* Subtle Ambient BG */}
        <div className="absolute top-0 left-1/4 w-[450px] h-[350px] bg-indigo-100/70 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-violet-100/60 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-white rounded-[2.5rem] p-8 sm:p-14 border border-slate-200 shadow-xl shadow-indigo-900/5 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left (7 cols) */}
            <div className="lg:col-span-7 text-left space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/70 text-indigo-700 text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={13} className="text-indigo-600" /> Free Offer
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-black text-slate-950 leading-tight">
                Get a Free AI Automation Audit
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                I'll review your current manual processes and show you exactly where AI can save <strong className="text-slate-950 font-bold">10+ hours per week</strong> — no strings attached.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4 pt-2">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-600/25 active:scale-95 cursor-pointer"
                >
                  Claim Free Audit
                </Link>
                <span className="flex items-center gap-2 text-xs text-slate-600 font-semibold self-center">
                  <CheckCircle2 size={16} className="text-emerald-600" /> 4 slots left this month
                </span>
              </div>
            </div>

            {/* Right — 4 roadmap cards (5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              {[
                { icon: <FileSearch size={18} />, t: 'Workflow Audit', d: 'We map every manual step' },
                { icon: <Laptop size={18} />, t: 'Tool Review', d: 'Best tech stack analysis' },
                { icon: <TrendingUp size={18} />, t: 'ROI Forecast', d: 'Calculate potential gains' },
                { icon: <Zap size={18} />, t: 'Action Plan', d: 'Custom roadmap to automate' },
              ].map(({ icon, t, d }) => (
                <div key={t} className="p-4 sm:p-5 bg-slate-50/90 border border-slate-200/80 rounded-2xl hover:bg-slate-100 hover:border-indigo-200 transition-all group text-left flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform shadow-xs">
                      {icon}
                    </div>
                    <p className="text-slate-950 font-bold text-sm mb-1">{t}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 8. FINAL CTA ═══════════════════════ */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-100/60 via-violet-100/50 to-sky-100/60 rounded-full blur-[130px]" />
        </div>

        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-[10.5px] font-black uppercase tracking-widest shadow-xs">
            <Sparkles size={13} /> Ready to Start?
          </span>

          <h2 id="cta-heading" className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 tracking-tight leading-tight">
            Let's Build Something <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Intelligent Together.
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Available for AI automation, web development &amp; technical consulting worldwide.
            Let's discuss your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
            >
              <span>Start a Project</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={FIVERR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1DBF73] hover:bg-[#19a463] text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#1DBF73]/20 active:scale-95"
            >
              <FiverrIcon size={16} className="brightness-125" />
              <span>Order on Fiverr</span>
              <ArrowUpRight size={14} />
            </a>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 rounded-2xl font-extrabold text-xs uppercase tracking-widest transition-all active:scale-95"
            >
              View Services
            </Link>
          </div>

          <p className="text-slate-400 text-[10.5px] font-bold uppercase tracking-widest">
            Available Mon–Sat · India &amp; Worldwide
          </p>
        </div>
      </section>

      {/* ═══════════════════════ GOOGLE QR MODAL ═══════════════════════ */}
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

