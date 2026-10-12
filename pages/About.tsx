import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, ShieldCheck,
  GraduationCap, MapPin, Award, CheckCircle2, Star, Sparkles,
  Brain, Code2, Layers, Rocket, Zap, MessageSquare,
  Terminal, Database, Globe, Cpu, Workflow, Laptop,
  Activity, Lock, QrCode, X, ExternalLink, Flame, Check,
  FileText, Download
} from 'lucide-react';
import {
  FIVERR_PROFILE_URL, GOOGLE_BUSINESS_NAME, GOOGLE_BUSINESS_URL,
  GOOGLE_VERIFICATION_PROOF_URL, BUSINESS_ADDRESS,
  TASQ_ONE_URL, SAATHI_BOT_URL, SHIELD_CAPTCHA_URL
} from '../constants';
import { FiverrIcon, FiverrBadge } from '../components/FiverrBadge';
import GoogleVerifiedBadge, { GoogleGIcon } from '../components/GoogleVerifiedBadge';
import OptimizedImage from '../components/OptimizedImage';

/* ─── Proprietary SaaS Cloud Suites (Engineered In-House) ─────────────────── */
const SAAS_SUITES = [
  {
    id: 'tasq-one',
    name: 'TASQ-ONE',
    category: 'AI Task Operating System',
    status: 'Public Beta',
    tagline: 'Autonomous AI ticket decomposition with Groq Llama 3.3 and topological Kanban DAGs.',
    logoImage: '/tasq-one/task-one-emblem.png',
    logoAlt: 'TASQ-ONE AI Task Operating System Logo',
    topGradient: 'from-indigo-500 to-violet-600',
    stat: '< 400ms AI Latency',
    specUrl: '/saas/tasq-one',
    liveUrl: TASQ_ONE_URL,
  },
  {
    id: 'saathi-bot',
    name: 'Saathi Bot',
    category: 'Conversational Commerce AI',
    status: 'Production Ready',
    tagline: 'Zero-hallucination multilingual RAG assistant with pre-LLM confidence gating.',
    logoImage: '/saathi-bot/saathi-black-logo.svg',
    logoAlt: 'Saathi Bot Official Logo',
    topGradient: 'from-cyan-500 to-teal-600',
    stat: '18 KB Shadow DOM',
    specUrl: '/saas/saathi-bot',
    liveUrl: SAATHI_BOT_URL,
  },
  {
    id: 'shield-captcha',
    name: 'ShieldCaptcha Enterprise',
    category: 'Cybersecurity & Bot Defense',
    status: 'Live Production',
    tagline: 'Self-hostable, zero-cookie bot defense replacing tracking CAPTCHAs via SHA-256 PoW.',
    logoImage: '/shield-captcha/shield-captcha-logo.png',
    logoAlt: 'ShieldCaptcha Enterprise Official Shield Logo',
    topGradient: 'from-blue-500 to-indigo-600',
    stat: '0 Cookies / $0 Mo',
    specUrl: '/saas/shield-captcha',
    liveUrl: SHIELD_CAPTCHA_URL,
  },
];

/* ─── Technical Expertise Arsenal ─────────────────────────────────────────── */
const TECHNICAL_ARSENAL = [
  {
    title: 'AI Automation & Agents',
    icon: <Brain size={22} className="text-indigo-500 dark:text-indigo-400" />,
    desc: 'Autonomous multi-step workflows, AI agents, Zapier/Make connections, and webhook pipelines that save 10+ hours/week.',
    skills: ['n8n', 'Python', 'OpenAI API', 'Zapier', 'Webhooks'],
    accentBg: 'bg-indigo-50 dark:bg-indigo-950/50',
    accentBorder: 'hover:border-indigo-400/50 dark:hover:border-indigo-500/50',
  },
  {
    title: 'Smart RAG Chatbots',
    icon: <MessageSquare size={22} className="text-emerald-500 dark:text-emerald-400" />,
    desc: '24/7 conversational support bots trained on proprietary docs, integrated with WhatsApp Business API, Telegram & CRMs.',
    skills: ['LangChain', 'Vector DB', 'GPT-4o', 'WhatsApp API', 'Voiceflow'],
    accentBg: 'bg-emerald-50 dark:bg-emerald-950/50',
    accentBorder: 'hover:border-emerald-400/50 dark:hover:border-emerald-500/50',
  },
  {
    title: 'Full-Stack Web Dev',
    icon: <Code2 size={22} className="text-blue-500 dark:text-blue-400" />,
    desc: '100/100 Lighthouse speed web applications, high-converting landing pages, and startup MVPs delivered in 7-14 days.',
    skills: ['React.js', 'Next.js', 'Django', 'TypeScript', 'Tailwind CSS'],
    accentBg: 'bg-blue-50 dark:bg-blue-950/50',
    accentBorder: 'hover:border-blue-400/50 dark:hover:border-blue-500/50',
  },
  {
    title: 'Lead Generation Systems',
    icon: <Zap size={22} className="text-amber-500 dark:text-amber-400" />,
    desc: 'Multi-channel cold email and LinkedIn automated prospecting infrastructure yielding 250+ verified leads.',
    skills: ['Apollo.io', 'Smartlead', 'Instantly', 'LinkedIn Automation'],
    accentBg: 'bg-amber-50 dark:bg-amber-950/50',
    accentBorder: 'hover:border-amber-400/50 dark:hover:border-amber-500/50',
  },
  {
    title: 'Data Science & BI',
    icon: <Database size={22} className="text-violet-500 dark:text-violet-400" />,
    desc: 'Interactive Power BI dashboards, SQL databases, and business intelligence models turning raw data into executive clarity.',
    skills: ['Power BI', 'DAX', 'PostgreSQL', 'Python Pandas', 'SQL'],
    accentBg: 'bg-violet-50 dark:bg-violet-950/50',
    accentBorder: 'hover:border-violet-400/50 dark:hover:border-violet-500/50',
  },
  {
    title: 'Brand Identity & Design',
    icon: <Sparkles size={22} className="text-rose-500 dark:text-rose-400" />,
    desc: 'Cohesive vector logos, digital brand kits, and high-trust social media graphics that establish authority.',
    skills: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Canva Pro'],
    accentBg: 'bg-rose-50 dark:bg-rose-950/50',
    accentBorder: 'hover:border-rose-400/50 dark:hover:border-rose-500/50',
  },
];

/* ─── Core Principles ─────────────────────────────────────────────────────── */
const PRINCIPLES = [
  {
    title: 'Solve Real Business Bottlenecks',
    desc: 'I focus on eliminating manual friction and generating measurable business revenue — not just writing lines of code.',
  },
  {
    title: 'Direct 1-on-1 Communication',
    desc: 'No middlemen or miscommunication. Direct daily WhatsApp updates and video check-ins whenever needed.',
  },
  {
    title: 'Rapid Iteration (7–14 Days MVP)',
    desc: 'Working software in days, not months. You get live staging URLs to test and provide continuous feedback.',
  },
  {
    title: '100% Escrow Protection via Fiverr',
    desc: 'Zero financial risk. You can hire me directly through Fiverr where funds are held safely until full sign-off.',
  },
];

/* ─── Main Component ─────────────────────────────────────────────────────── */
const About: React.FC = () => {
  const navigate = useNavigate();
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO — Who is Tushar Singh?                                     */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-100 dark:border-white/5">
        
        {/* Ambient Light Mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10 space-y-8">
          
          {/* Top Status Capsule */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase tracking-wider shadow-2xs font-outfit">
                <Sparkles size={12} className="text-indigo-500 animate-pulse" />
                <span>About Tushar Singh</span>
              </span>
              <FiverrBadge variant="pill" />
              <GoogleVerifiedBadge variant="pill" />
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/Tushar_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Tushar_Singh_Resume.pdf"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all font-outfit"
              >
                <FileText size={12} className="text-indigo-500" />
                <span>Resume (PDF)</span>
                <Download size={11} />
              </a>

              <button
                type="button"
                onClick={() => setQrModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white transition-all cursor-pointer font-outfit"
              >
                <GoogleGIcon size={12} />
                <span>Verify Owner Proof</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Bio Info */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.12] speakable">
                Hi, I'm <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">Tushar Singh</span>.<br />
                I Build Intelligent Systems That Scale Businesses.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium speakable">
                I am a Delhi-based <strong className="text-slate-950 dark:text-white font-bold">AI Automation Expert &amp; Full-Stack Software Engineer</strong> with a Master of Computer Applications (MCA) from <strong className="text-slate-950 dark:text-white font-bold">MIT Pune</strong>. As the founder of <em>Code with Tushar</em> &amp; <em>Code with Mr Singh</em>, I help businesses eliminate manual bottlenecks and scale using autonomous AI workflows, smart RAG chatbots, and high-performance React/Django platforms.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300 font-outfit">
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5">
                  <GraduationCap size={16} className="text-indigo-500" /> MCA, MIT Pune
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5">
                  <MapPin size={16} className="text-rose-500" /> New Delhi, India
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck size={16} className="text-emerald-500" /> Google &amp; Fiverr Verified
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2 font-outfit">
                <a
                  href="/Tushar_Singh_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Tushar_Singh_Resume.pdf"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95 cursor-pointer"
                >
                  <FileText size={14} />
                  <span>Download Resume (PDF)</span>
                  <Download size={13} />
                </a>
                <button
                  type="button"
                  onClick={() => navigate('/contact')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-indigo-500/25 active:scale-95 cursor-pointer"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight size={14} />
                </button>
                <a
                  href="https://wa.me/918851619647?text=Hi%20Tushar%2C%20I%20saw%20your%20About%20page%20and%20want%20to%20discuss%20a%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp Tushar</span>
                </a>
                <a
                  href={FIVERR_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all active:scale-95"
                >
                  <FiverrIcon size={14} className="brightness-125" />
                  <span>Fiverr Profile</span>
                  <ArrowUpRight size={13} />
                </a>
              </div>
            </div>

            {/* Right: Featured Portrait Photo Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm rounded-3xl p-3 bg-gradient-to-b from-indigo-500/20 via-violet-500/10 to-teal-500/20 border border-indigo-500/30 shadow-2xl shadow-indigo-500/10 backdrop-blur-xl group">
                
                {/* Photo Container */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                  <picture>
                    <source srcSet="/tushar-singh.webp" type="image/webp" />
                    <img
                      src="/tushar-singh-optimized.jpg"
                      alt="Tushar Singh — AI Automation Expert & Full-Stack Developer"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="eager"
                      decoding="async"
                    />
                  </picture>

                  {/* Gradient Vignette at Bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  {/* Top Live Status Indicator */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider text-emerald-400 shadow-lg font-outfit">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Available for Hire
                    </span>
                  </div>

                  {/* Name Tag Bottom Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 text-center space-y-0.5 p-2 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 font-outfit">
                    <p className="font-outfit font-black text-sm text-white">Tushar Singh</p>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">AI Engineer &amp; Full-Stack Architect</p>
                  </div>
                </div>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2 pt-3 text-center font-outfit">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs">
                    <p className="text-base font-outfit font-black text-indigo-600 dark:text-indigo-400">10+</p>
                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Products</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs">
                    <p className="text-base font-outfit font-black text-emerald-600 dark:text-emerald-400">₹2L+</p>
                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Impact</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-xs">
                    <p className="text-base font-outfit font-black text-amber-500">4.0 ★</p>
                    <p className="text-[8px] font-black uppercase tracking-wider text-slate-400">Satisfaction</p>
                  </div>
                </div>

                {/* Hire on Fiverr Button */}
                <a
                  href={FIVERR_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#1DBF73] hover:bg-[#19a463] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer font-outfit"
                >
                  <FiverrIcon size={14} className="brightness-125" />
                  <span>Hire on Fiverr (100% Escrow)</span>
                  <ArrowUpRight size={13} />
                </a>

                {/* Download Resume Button */}
                <a
                  href="/Tushar_Singh_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Tushar_Singh_Resume.pdf"
                  className="mt-2.5 w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 text-xs font-extrabold uppercase tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer font-outfit"
                >
                  <FileText size={14} />
                  <span>Download Resume (PDF)</span>
                  <Download size={13} />
                </a>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 2. PROPRIETARY CLOUD PLATFORMS (ENGINEERED IN-HOUSE)               */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white relative overflow-hidden border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-10 relative z-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 font-outfit flex items-center gap-1.5">
                <Sparkles size={12} className="text-indigo-400" />
                Proprietary SaaS Ecosystem
              </span>
              <h2 className="text-2xl sm:text-4xl font-outfit font-black text-white">
                Cloud Platforms Built from Scratch.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Three production-ready platforms architected by Tushar Singh spanning AI task orchestration, conversational commerce, and zero-cookie bot defense.
              </p>
            </div>

            <Link
              to="/saas"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 font-outfit shrink-0"
            >
              <span>Explore All SaaS Specs</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAAS_SUITES.map((suite) => (
              <div
                key={suite.id}
                className="group relative rounded-3xl bg-slate-900/80 border border-white/10 p-6 flex flex-col justify-between hover:border-white/30 transition-all duration-300 shadow-xl overflow-hidden"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${suite.topGradient}`} />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-slate-950 border border-white/15 p-2 flex items-center justify-center">
                      <img src={suite.logoImage} alt={suite.logoAlt} className="max-h-full object-contain" />
                    </div>
                    <span className="text-[9px] font-black font-outfit uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                      {suite.status}
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block font-outfit">
                      {suite.category}
                    </span>
                    <h3 className="text-lg font-outfit font-black text-white group-hover:text-cyan-300 transition-colors">
                      {suite.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal min-h-[36px]">
                    {suite.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between font-outfit">
                  <span className="text-xs font-black text-emerald-400 font-outfit">{suite.stat}</span>
                  <div className="flex items-center gap-2">
                    <a
                      href={suite.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-300 hover:text-white flex items-center gap-0.5"
                    >
                      <span>Live</span>
                      <ArrowUpRight size={11} />
                    </a>
                    <span className="text-slate-600">•</span>
                    <Link
                      to={suite.specUrl}
                      className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5"
                    >
                      <span>Specs</span>
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 3. CORE TECHNICAL ARSENAL                                          */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-outfit">Technical Expertise</span>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              What Powers My Deliverables
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Battle-tested tools and frameworks selected for speed, security, and measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECHNICAL_ARSENAL.map((tech) => (
              <div
                key={tech.title}
                className={`p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 space-y-4 hover:shadow-xl ${tech.accentBorder} transition-all flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl ${tech.accentBg} flex items-center justify-center`}>
                    {tech.icon}
                  </div>
                  <h3 className="font-outfit font-black text-base text-slate-950 dark:text-white">{tech.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{tech.desc}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-white/5 font-outfit">
                  {tech.skills.map(sk => (
                    <span key={sk} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] font-bold rounded-md">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 4. MY PHILOSOPHY & WORK ETHIC                                      */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="space-y-3 text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-outfit">Core Principles</span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              Why Clients Choose to Work Directly with Me
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-2xl">
              Unlike traditional agencies with layers of account managers and junior subcontractors, when you hire me, you get direct 1-on-1 access to a technical architect who actually writes the code.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRINCIPLES.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-2xs hover:border-indigo-400/50 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200 dark:border-indigo-500/20">
                  <CheckCircle2 size={14} />
                </div>
                <div>
                  <h4 className="text-sm font-outfit font-black text-slate-950 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 5. OFFICIAL RESUME & CREDENTIALS BANNER                            */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-indigo-950/20 via-slate-900/40 to-slate-950/30 border-b border-slate-100 dark:border-white/5 font-outfit">
        <div className="max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 bg-white/80 dark:bg-slate-900/80 border border-indigo-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left Content */}
            <div className="space-y-4 text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-500/30 text-[11px] font-bold text-indigo-700 dark:text-indigo-300">
                <FileText size={13} className="text-indigo-500" />
                <span>Verified Curriculum Vitae (CV)</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                Tushar Singh — Official Resume
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Detailed technical breakdown of my software engineering experience, production deployments, autonomous AI workflows, MCA academic coursework (MIT Pune), and verified commercial track record.
              </p>

              {/* Quick Pills */}
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5">
                  🎓 MCA, MIT Pune
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5">
                  🤖 AI Automation &amp; Agent Workflows
                </span>
                <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/5">
                  💻 React, Next.js, Django &amp; Python
                </span>
                <span className="px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                  ⭐ Google &amp; Fiverr Verified
                </span>
              </div>
            </div>

            {/* Right Buttons Card */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <a
                href="/Tushar_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Tushar_Singh_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-black text-xs uppercase tracking-wider transition-all shadow-xl hover:shadow-indigo-500/25 active:scale-95 cursor-pointer font-outfit"
              >
                <Download size={15} />
                <span>Download Resume (PDF)</span>
              </a>

              <a
                href="/Tushar_Singh_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-white/10 font-bold text-xs uppercase tracking-wider transition-all active:scale-95 cursor-pointer font-outfit"
              >
                <FileText size={14} className="text-indigo-400" />
                <span>View in New Tab</span>
                <ExternalLink size={12} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 5. GOOGLE VERIFIED ACCREDITATION BANNER                            */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <GoogleVerifiedBadge variant="banner" />
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 6. CTA BANNER                                                      */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto space-y-6 relative z-10 font-outfit">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-3.5 py-1.5 rounded-full border border-indigo-500/30 font-outfit">
            Let's Collaborate
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-black text-white leading-tight">
            Have a Project in Mind? <br />
            <span className="bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Let's Build It Together.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Book a free 30-minute AI strategy audit, chat directly on WhatsApp, or hire securely via Fiverr.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-outfit">
            <a
              href="/Tushar_Singh_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Tushar_Singh_Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 cursor-pointer font-outfit"
            >
              <FileText size={14} />
              <span>Download Resume (PDF)</span>
              <Download size={13} />
            </a>
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-950 rounded-2xl font-extrabold text-xs uppercase tracking-wider hover:bg-indigo-50 transition-all shadow-xl active:scale-95 cursor-pointer font-outfit"
            >
              <span>Book Free Consultation</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="https://wa.me/918851619647?text=Hi%20Tushar%2C%20I%20want%20to%20discuss%20a%20new%20project%20for%20my%20business!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 font-outfit"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Tushar</span>
            </a>
            <a
              href={FIVERR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1DBF73] hover:bg-[#19a463] text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95 font-outfit"
            >
              <FiverrIcon size={14} className="brightness-125" />
              <span>Fiverr Profile</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* GOOGLE BUSINESS QR VERIFICATION MODAL                             */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {qrModalOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setQrModalOpen(false)}
        >
          <div
            className="relative max-w-sm w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 shadow-2xl space-y-4 text-center font-outfit"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center">
              <GoogleGIcon size={24} />
            </div>

            <div>
              <div className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full mb-1.5 font-outfit">
                <ShieldCheck size={11} /> Google Verified Business
              </div>
              <h3 className="text-lg font-outfit font-extrabold text-slate-950 dark:text-white">
                {GOOGLE_BUSINESS_NAME}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-outfit">
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
              Scan with your phone or click below to inspect official Google verification &amp; business ownership.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-1 font-outfit">
              <a
                href={GOOGLE_BUSINESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all font-outfit"
              >
                <span>Google Profile</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={GOOGLE_VERIFICATION_PROOF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all font-outfit"
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

export default About;
