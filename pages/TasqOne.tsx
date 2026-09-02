import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket, Sparkles, ShieldCheck, Lock, Star, ArrowRight, ArrowUpRight,
  Zap, Bot, Layers, CheckCircle2, ChevronRight, Copy, Check,
  Terminal, Server, ExternalLink, Users, DollarSign, RefreshCw,
  Cpu, GitBranch, FileText, Database, Play, MessageSquare,
  Mail, Cloud, Shield, CheckSquare, BarChart3, Clock, Share2, Globe,
  AlertCircle, HelpCircle, BookOpen, ChevronDown, Award, Lightbulb, ArrowLeft
} from 'lucide-react';
import { TASQ_ONE_URL, TASQ_ONE_DOCKER_IMAGE } from '../constants';

/* ─── Sample Prompts for Live AI Playground ──────────────────────────────── */
const DEMO_PRESETS = [
  {
    label: "Auth & Rate Limiting",
    prompt: "Build user authentication with OTP, JWT tokens, and Upstash Redis rate-limiting guard.",
    result: {
      title: "Implement Multi-Tenant JWT Authentication with Redis Rate-Limiter",
      department: "Backend / Security",
      priority: "P1 — Critical",
      priorityColor: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50",
      estimate: "5 Story Points (1.5 Days)",
      assignee: "Sr. Backend Engineer",
      dagStatus: "Blocked by: Database Schema Migration (#TSK-101)",
      acceptanceCriteria: [
        "Issue signed JWT with 15s in-memory cache and 15-day refresh cycle",
        "Implement 600ms Upstash Redis timeout guard on auth routes",
        "Enforce PostgreSQL Row-Level Security (RLS) per organization UUID",
        "Deliver automated Slack webhook alert upon repeated failed logins"
      ],
      hash: "SHA-256: 4f8b1a92e6c7d3f4"
    }
  },
  {
    label: "Stripe Billing & Invoicing",
    prompt: "Set up Stripe recurring billing with webhook listeners and automated tax invoice generation.",
    result: {
      title: "Deploy Automated Stripe Webhook Gateway & Tax Invoice Sync",
      department: "Finance / Billing",
      priority: "P2 — High",
      priorityColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50",
      estimate: "3 Story Points (1 Day)",
      assignee: "Full-Stack Dev",
      dagStatus: "Ready for Execution — 0 Blockers",
      acceptanceCriteria: [
        "Idempotent webhook handler verifying Stripe signature headers",
        "Auto-generate PDF tax receipts and upload securely to Cloudflare R2",
        "Trigger Resend transactional email with billing summary to customer",
        "Log billing lifecycle event to immutable audit log"
      ],
      hash: "SHA-256: 8a3c9e11bf204d88"
    }
  },
  {
    label: "Real-time Kanban Sync",
    prompt: "Create a real-time collaborative Kanban board with DAG dependency validation.",
    result: {
      title: "Engineered Real-Time Kanban Board with Topological DAG Sorting",
      department: "Product / Frontend",
      priority: "P1 — Critical",
      priorityColor: "text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/50",
      estimate: "8 Story Points (2.5 Days)",
      assignee: "Frontend Lead",
      dagStatus: "Blocked by: Realtime WebSocket Bus (#TSK-108)",
      acceptanceCriteria: [
        "Render dependency edges with visual acyclic DAG validation",
        "Prevent drag-to-done if prerequisite predecessor tasks are incomplete",
        "Optimistic UI updates synchronized via Supabase Realtime channels",
        "Persist audit snapshot of card movement with user cryptographic signature"
      ],
      hash: "SHA-256: d2075f903e1a7b4c"
    }
  }
];

export const TasqOne: React.FC = () => {
  /* ── 1. Interactive AI Playground State ── */
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customPrompt, setCustomPrompt] = useState(DEMO_PRESETS[0].prompt);
  const [isDecomposing, setIsDecomposing] = useState(false);
  const [activeTask, setActiveTask] = useState(DEMO_PRESETS[0].result);

  /* ── 2. Indian Tech ROI Calculator State ── */
  const [teamSize, setTeamSize] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(1200); // INR avg
  const [hoursSavedPerMonth, setHoursSavedPerMonth] = useState(40); // Admin hrs eliminated

  /* ── 3. Copy State ── */
  const [copiedDocker, setCopiedDocker] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedApi, setCopiedApi] = useState(false);

  /* ── Calculate ROI ── */
  const roiCalculations = useMemo(() => {
    const baseSavings = (hourlyRate * hoursSavedPerMonth);
    const annualSavings = baseSavings * 12;
    const efficiencyBoostPct = Math.min(85, Math.round((hoursSavedPerMonth / (teamSize * 160)) * 100 * 3 + 28));
    return {
      monthlySavingsINR: baseSavings,
      annualSavingsINR: annualSavings,
      efficiencyBoostPct
    };
  }, [teamSize, hourlyRate, hoursSavedPerMonth]);

  const handleDecompose = () => {
    setIsDecomposing(true);
    setTimeout(() => {
      if (customPrompt !== DEMO_PRESETS[selectedPreset].prompt) {
        setActiveTask({
          title: customPrompt.length > 50 ? customPrompt.slice(0, 50) + "..." : customPrompt,
          department: "AI Decomposed Spec",
          priority: "P1 — High Priority",
          priorityColor: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50",
          estimate: "5 Story Points (12 Hours)",
          assignee: "Auto-Assigned Engineer",
          dagStatus: "Topological validation verified — 0 circular dependencies",
          acceptanceCriteria: [
            `Parse and validate input: "${customPrompt}"`,
            "Generate granular sub-tasks and acceptance criteria via Groq Llama 3.3 70B",
            "Establish prerequisite DAG edges with blocking constraints",
            "Record cryptographic audit entry into immutable PostgreSQL ledger"
          ],
          hash: `SHA-256: ${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
        });
      } else {
        setActiveTask(DEMO_PRESETS[selectedPreset].result);
      }
      setIsDecomposing(false);
    }, 600);
  };

  const copyToClipboard = (text: string, setCopied: (v: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dockerSnippet = `docker run -d \\
  --name tasq-one \\
  -p 3000:3000 \\
  -e NEXT_PUBLIC_SUPABASE_URL=your_supabase_url \\
  -e GROQ_API_KEY=your_groq_llama_key \\
  tusharsinghoffical/tasq-one:latest`;

  const embedSnippet = `[![TASQ‑ONE Promo](https://img.shields.io/badge/⚡_TASQ‑ONE‑SaaS-6366F1?style=for-the-badge)](https://tasq-one.onrender.com)

> *The Intelligent Task Operating System for High‑Velocity Teams.*`;

  const apiSnippet = `curl -X POST https://tasq-one.onrender.com/api/v1/ai/decompose \\
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \\
  -H "Content-Type: application/json" \\
  -d '{"prompt": "Deploy secure microservice with RLS & Redis cache"}'`;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      
      {/* ── Background Ambient Glow & Grid ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[550px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-sky-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-24 space-y-12 sm:space-y-16">

        {/* ═══════════════════════ TOP APP BAR & STATUS BAR ═══════════════════════ */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
          <Link
            to="/saas"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 transition-all shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>Back to All SaaS Products</span>
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="font-outfit font-black text-slate-950 dark:text-white tracking-tight text-base sm:text-lg">
                TASQ-ONE
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span>Live Public Beta</span>
              </span>
            </div>

            <a
              href={TASQ_ONE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-outfit font-bold text-xs uppercase tracking-wider shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <span>Launch App</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* ═══════════════════════ 1. INTEGRATED HERO SHOWCASE ═══════════════════════ */}
        <section className="text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Logo Card */}
          <div className="flex flex-col items-center justify-center">
            <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl shadow-indigo-500/10 inline-flex items-center justify-center max-w-[280px] sm:max-w-[360px]">
              <img
                src="/tasq-one/tasq-one-banner.png"
                alt="TASQ-ONE Logo"
                className="w-full h-auto object-contain max-h-16 sm:max-h-20 dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400 mt-3 font-outfit">
              Tushar Singh Labs · Cloud-Native SaaS Platform
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.15]">
              Turn Loosely Defined Ideas Into{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 bg-clip-text text-transparent">
                Production-Ready Tasks
              </span>{' '}
              in Seconds.
            </h1>
            <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              TASQ-ONE is the intelligent task operating system for high-velocity teams. Autonomous AI decomposition, real-time Kanban dependency DAGs, cryptographic audit trails, and multi-tenant PostgreSQL Row-Level Security.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
            <a
              href={TASQ_ONE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-outfit font-black text-sm uppercase tracking-wider shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95 group cursor-pointer"
            >
              <span>Launch Web App (Free Beta)</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#simulator"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-outfit font-bold text-sm transition-all shadow-sm"
            >
              <Bot size={17} className="text-violet-600 dark:text-violet-400" />
              <span>Test Live AI Simulator</span>
            </a>

            <a
              href="#roi-calculator"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-outfit font-bold text-sm transition-all"
            >
              <BarChart3 size={17} className="text-emerald-500" />
              <span>Calculate ROI</span>
            </a>
          </div>

          {/* 4 Quick Stat Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto pt-2 text-left">
            {[
              { label: 'Onboarding Speed', val: '< 5 Minutes', sub: 'Sign up & add tasks' },
              { label: 'AI Engine', val: 'Llama 3.3 70B', sub: 'Groq ultra-low latency' },
              { label: 'Audit Trail', val: 'Cryptographic', sub: 'Tamper-evident logs' },
              { label: 'Multi-Tenant', val: 'Postgres RLS', sub: 'Hard data isolation' },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 shadow-xs"
              >
                <div className="text-lg sm:text-xl font-outfit font-extrabold text-slate-950 dark:text-white">
                  {stat.val}
                </div>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  {stat.sub}
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* ═══════════════════════ ⭐ 2. INTEGRATED EXECUTIVE SUMMARY BENTO ⭐ ═══════════════════════ */}
        <section className="relative p-6 sm:p-9 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white border-2 border-indigo-500/30 shadow-2xl overflow-hidden">
          {/* Radiant decorative mesh */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            {/* Header Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-black uppercase tracking-wider font-outfit">
                <BookOpen size={14} className="text-indigo-400" />
                <span>Executive Project Brief &amp; Overview (Summary)</span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock size={13} className="text-emerald-400" />
                <span>2-Minute Read · Instant Understanding</span>
              </div>
            </div>

            {/* Main Headline & 1-Liner */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-outfit font-black tracking-tight text-white leading-tight">
                Kya Hai TASQ-ONE? — What is TASQ-ONE in Plain Words?
              </h2>
              <p className="text-indigo-200 text-sm sm:text-base leading-relaxed max-w-4xl font-medium">
                TASQ-ONE ek <strong>Cloud-Native Intelligent Task Operating System (SaaS)</strong> hai. Yeh aapke raw ya vague ideas (jaise: <em>"Build OTP login with rate limits"</em>) ko <strong>seconds me production-ready developer tasks, acceptance criteria, story points aur dependency DAGs</strong> me convert kar deta hai.
              </p>
            </div>

            {/* 3 Core Highlights (Problem -> Solution -> Impact) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              
              {/* Box 1: The Problem */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wider font-outfit">
                  <AlertCircle size={15} />
                  <span>The Real Problem</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Chaotic Planning &amp; Wasted Hours
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Tech teams weekly 10–15 ghante lambi standup calls, confusing Slack chats aur ad-hoc Jira tickets banane me waste kar dete hain. Junior devs ko bar-bar requirements samjhani padti hain.
                </p>
              </div>

              {/* Box 2: The Solution */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-500/10 border border-indigo-400/25 backdrop-blur-sm space-y-2">
                <div className="flex items-center gap-2 text-indigo-300 text-xs font-black uppercase tracking-wider font-outfit">
                  <Lightbulb size={15} />
                  <span>The TASQ-ONE Solution</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  Autonomous AI Decomposition
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Sirf 1 sentence likho. <strong>Groq Llama 3.3 70B AI</strong> turant pure task ko sub-tasks, estimates, department, assignee aur acceptance criteria me tod deta hai under 400 milliseconds.
                </p>
              </div>

              {/* Box 3: The Impact */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/25 backdrop-blur-sm space-y-2">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-black uppercase tracking-wider font-outfit">
                  <Award size={15} />
                  <span>Measurable ROI Impact</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  ₹48,000+/Month Net Savings
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  DAG dependency graph galti se blocked tasks pe kaam karne se rokta hai. Cryptographic audit trail aur multi-tenant PostgreSQL RLS enterprise security ensure karte hain.
                </p>
              </div>

            </div>

            {/* Quick Specs Quick-Bar */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-4 text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Onboarding in &lt; 5 Minutes
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Free Forever Beta Available
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Self-Hosted Docker Ready
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} className="text-emerald-400" /> Slack &amp; Email Webhooks
                </span>
              </div>

              <a
                href={TASQ_ONE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-outfit font-black text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Try Live App on Render</span>
                <ArrowRight size={13} />
              </a>
            </div>

          </div>
        </section>

        {/* ═══════════════════════ 3. INTERACTIVE LIVE SIMULATION ═══════════════════════ */}
        <section id="simulator" className="scroll-mt-24 max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/60 text-violet-700 dark:text-violet-300 text-xs font-bold uppercase tracking-wider">
              <Bot size={14} /> Interactive Live Simulation
            </div>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              Watch TASQ-ONE Decompose Ideas in Real-Time
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto">
              Test how Groq Llama 3.3 70B turns a simple one-sentence prompt into an airtight engineering specification complete with dependency DAGs and acceptance criteria.
            </p>
          </div>

          <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl shadow-indigo-950/5 space-y-6">
            
            {/* Prompt Selector Preset Chips */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Choose a Sample Business Prompt:
              </label>
              <div className="flex flex-wrap gap-2">
                {DEMO_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedPreset(idx);
                      setCustomPrompt(preset.prompt);
                      setActiveTask(preset.result);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedPreset === idx
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Decompose Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Describe what you want to build in one sentence..."
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onClick={handleDecompose}
                disabled={isDecomposing}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm shadow-md shadow-indigo-600/20 transition-all disabled:opacity-50 cursor-pointer"
              >
                {isDecomposing ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Decomposing via Groq...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Decompose with AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Decomposed Task Spec Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/90 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4">
              
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                    {activeTask.department}
                  </span>
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${activeTask.priorityColor}`}>
                    {activeTask.priority}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Est: {activeTask.estimate}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-900 px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800">
                  <ShieldCheck size={13} className="text-emerald-500" />
                  <span>{activeTask.hash}</span>
                </div>
              </div>

              {/* Task Title */}
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Decomposed Production Task
                </div>
                <h3 className="text-lg sm:text-xl font-outfit font-extrabold text-slate-950 dark:text-white">
                  {activeTask.title}
                </h3>
              </div>

              {/* DAG Status Pill */}
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold">
                <GitBranch size={15} className="shrink-0 text-amber-600 dark:text-amber-400" />
                <span><strong>DAG Dependency Graph:</strong> {activeTask.dagStatus}</span>
              </div>

              {/* Acceptance Criteria Checklist */}
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Generated Acceptance Criteria:
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {activeTask.acceptanceCriteria.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80 text-xs text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Meta */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Users size={13} /> Assignee: <strong>{activeTask.assignee}</strong>
                </span>
                <span className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold">
                  <MessageSquare size={13} /> Auto-Syncs to Slack &amp; Resend
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* ═══════════════════════ 4. CORE ARCHITECTURE & CAPABILITIES ═══════════════════════ */}
        <section id="overview" className="scroll-mt-24 space-y-10">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-outfit">
              Architecture &amp; Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white">
              Engineered to Eliminate 90% of Operational Friction
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-base">
              TASQ-ONE is not just a to-do list — it is an intelligent task operating system built on enterprise primitives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Bot className="text-indigo-600 dark:text-indigo-400" size={24} />,
                title: 'Groq Llama 3.3 70B AI Engine',
                desc: 'Sub-second AI decomposition transforms 1-line thoughts into fully structured task specs with priority, estimates, and departments.',
                tag: 'AI Layer'
              },
              {
                icon: <GitBranch className="text-violet-600 dark:text-violet-400" size={24} />,
                title: 'Real-Time Kanban & Dependency DAGs',
                desc: 'Topological sorting enforces that downstream tickets cannot be worked on until parent prerequisite tasks are verified complete.',
                tag: 'Workflow Engine'
              },
              {
                icon: <ShieldCheck className="text-emerald-600 dark:text-emerald-400" size={24} />,
                title: 'Immutable Cryptographic Audit Trail',
                desc: 'Every state change, assignment, and completion is cryptographically hashed and logged for DPDP, SOC2, and ISO compliance.',
                tag: 'Compliance'
              },
              {
                icon: <Database className="text-cyan-600 dark:text-cyan-400" size={24} />,
                title: 'PostgreSQL Row-Level Security (RLS)',
                desc: 'Hardware-grade multi-tenant data isolation. Each organization has its own strictly sandboxed database views and token guards.',
                tag: 'Security'
              },
              {
                icon: <RefreshCw className="text-amber-600 dark:text-amber-400" size={24} />,
                title: 'Live Realtime Dashboards',
                desc: 'WebSocket auto-refreshing UI with Supabase Realtime keeps entire teams in lockstep without manual page reloads.',
                tag: 'Realtime'
              },
              {
                icon: <MessageSquare className="text-pink-600 dark:text-pink-400" size={24} />,
                title: 'Multi-Channel Notifications',
                desc: 'Native Slack alerts, webhooks, and Resend executive email digests keep stakeholders informed on blockers and completions.',
                tag: 'Integrations'
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 space-y-4 group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {feat.tag}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-outfit font-extrabold text-slate-950 dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ 5. 5-STEP WORKFLOW ═══════════════════════ */}
        <section className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-outfit">
              Step-by-Step Execution
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              How TASQ-ONE Works
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              From raw thought to verified production deployment in five seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Write One Sentence',
                desc: 'Enter a single sentence describing the feature, bug, or operation you need completed.',
                icon: <FileText size={20} className="text-indigo-600 dark:text-indigo-400" />
              },
              {
                step: '02',
                title: 'AI Decomposition',
                desc: 'Groq Llama 3.3 70B expands it into title, acceptance criteria, estimate, priority, and department.',
                icon: <Sparkles size={20} className="text-violet-600 dark:text-violet-400" />
              },
              {
                step: '03',
                title: 'Assign & DAG Track',
                desc: 'Tasks map onto live Kanban boards. Downstream tasks stay locked until prerequisites are done.',
                icon: <GitBranch size={20} className="text-cyan-600 dark:text-cyan-400" />
              },
              {
                step: '04',
                title: 'Audit & Report',
                desc: 'Every change is cryptographically hashed. Export tamper-proof CSV records for statutory audits.',
                icon: <ShieldCheck size={20} className="text-emerald-600 dark:text-emerald-400" />
              },
              {
                step: '05',
                title: 'Instant Multi-Sync',
                desc: 'Automated webhooks, Slack channels, and Resend email digests keep everyone synchronized.',
                icon: <MessageSquare size={20} className="text-amber-600 dark:text-amber-400" />
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 space-y-3 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-outfit font-black text-indigo-600/30 dark:text-indigo-400/30">
                    {step.step}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800">
                    {step.icon}
                  </div>
                </div>
                <h4 className="text-sm font-outfit font-bold text-slate-950 dark:text-white">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ 6. INDIAN TECH TEAM ROI CALCULATOR ═══════════════════════ */}
        <section id="roi-calculator" className="scroll-mt-24 space-y-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 text-white shadow-2xl relative overflow-hidden border border-indigo-500/20">
            
            {/* Radiant Ambient Orb */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-8">
              
              <div className="max-w-3xl space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                  <DollarSign size={14} /> Interactive Financial Model
                </div>
                <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight">
                  Built-In ROI Calculator for Indian Tech Teams
                </h2>
                <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
                  See how much money your engineering or product team saves by replacing chaotic Slack threads, endless standup meetings, and manual Jira ticket creation with TASQ-ONE.
                </p>
              </div>

              {/* Slider Inputs & Outputs Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
                
                {/* Sliders (7 Cols) */}
                <div className="lg:col-span-7 space-y-6 bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                  
                  {/* Team Size Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-300">Team Size:</span>
                      <span className="font-outfit font-extrabold text-indigo-400 text-base">{teamSize} Members</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={60}
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>2 users</span>
                      <span>10 users (Standard)</span>
                      <span>60+ users</span>
                    </div>
                  </div>

                  {/* Hourly Rate Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-300">Avg Engineer / PM Hourly Rate (₹):</span>
                      <span className="font-outfit font-extrabold text-emerald-400 text-base">₹{hourlyRate.toLocaleString('en-IN')}/hr</span>
                    </div>
                    <input
                      type="range"
                      min={400}
                      max={3500}
                      step={100}
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>₹400/hr</span>
                      <span>₹1,200/hr (Indian Market Avg)</span>
                      <span>₹3,500/hr</span>
                    </div>
                  </div>

                  {/* Admin Hours Saved */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-semibold text-slate-300">Admin &amp; Meeting Overhead Eliminated:</span>
                      <span className="font-outfit font-extrabold text-cyan-400 text-base">{hoursSavedPerMonth} Hours / Month</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={120}
                      step={5}
                      value={hoursSavedPerMonth}
                      onChange={(e) => setHoursSavedPerMonth(Number(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>10 hrs</span>
                      <span>40 hrs (~10 hrs/week)</span>
                      <span>120 hrs</span>
                    </div>
                  </div>

                </div>

                {/* Calculation Summary Box (5 Cols) */}
                <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-indigo-950/60 border border-indigo-400/30 text-center space-y-6 shadow-xl">
                  
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                      Projected Net Monthly Savings
                    </span>
                    <div className="text-4xl sm:text-5xl font-outfit font-black text-emerald-400 tracking-tight">
                      ₹{roiCalculations.monthlySavingsINR.toLocaleString('en-IN')}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Direct cash savings from recovered billable engineering hours
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-left">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Annualized Run-Rate</span>
                      <span className="text-lg font-outfit font-black text-white">
                        ₹{roiCalculations.annualSavingsINR.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Efficiency Boost</span>
                      <span className="text-lg font-outfit font-black text-indigo-300">
                        +{roiCalculations.efficiencyBoostPct}%
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={TASQ_ONE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-outfit font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                    >
                      <span>Start Free Beta Onboarding →</span>
                    </a>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════ 7. TRANSPARENT PRICING ═══════════════════════ */}
        <section id="pricing" className="scroll-mt-24 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-outfit">
              Transparent SaaS Packaging
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              Simple, Predictable Plans
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Start with zero upfront investment. Upgrade only when your organization scales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Plan 1: Free */}
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-outfit font-black text-slate-950 dark:text-white">
                    Free Tier
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Perfect for indie hackers, solo founders, and tiny squads.
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-outfit font-black text-slate-950 dark:text-white">$0</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">/ forever</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {[
                    'Up to 5 active team members',
                    '1 organization workspace',
                    'Basic AI decomposition (limited daily tokens)',
                    'Live Kanban board & DAG enforcement',
                    'Community support'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Check size={15} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={TASQ_ONE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-center font-bold text-xs text-slate-900 dark:text-white transition-colors"
              >
                Sign Up Free (5 Mins)
              </a>
            </div>

            {/* Plan 2: Starter (Featured) */}
            <div className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 flex flex-col justify-between space-y-6 shadow-2xl shadow-indigo-600/10">
              
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-[10px] uppercase tracking-wider shadow-md">
                ⚡ Most Popular for Growth Teams
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <h3 className="text-xl font-outfit font-black text-slate-950 dark:text-white">
                    Starter
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Full AI power and compliance export for high-velocity teams.
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-outfit font-black text-indigo-600 dark:text-indigo-400">$19</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">/ user / month</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {[
                    'Unlimited active team members',
                    'Full Groq Llama 3.3 70B AI decomposition',
                    'Cryptographic audit trail CSV export',
                    'Slack bot alerts & custom incoming webhooks',
                    'Email digests via Resend integration',
                    'Priority engineer email support (< 4 hrs)'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-medium">
                      <Check size={15} className="text-indigo-600 dark:text-indigo-400 shrink-0 font-bold" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={TASQ_ONE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-center font-outfit font-black text-xs uppercase tracking-wider text-white shadow-lg shadow-indigo-600/25 transition-all"
              >
                Start 14-Day Free Trial
              </a>
            </div>

            {/* Plan 3: Enterprise */}
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex flex-col justify-between space-y-6 shadow-sm">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-outfit font-black text-slate-950 dark:text-white">
                    Enterprise
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Self-hosted, air-gapped, and customized for regulated industries.
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-outfit font-black text-slate-950 dark:text-white">Custom</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">/ annual contract</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
                  {[
                    'Self-hosted Docker / Kubernetes deployment',
                    'SSO / SAML 2.0 & Okta authentication',
                    'Indian DPDP & SOC 2 audit assurance',
                    'Custom LLM model fine-tuning & local Ollama',
                    'Dedicated Slack channel & 99.9% uptime SLA',
                    'Custom API rate-limit allocation'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Check size={15} className="text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20am%20interested%20in%20an%20Enterprise%20license%20or%20self-hosted%20TASQ-ONE%20deployment!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-center font-bold text-xs text-white dark:text-slate-950 transition-colors"
              >
                Inquire for Enterprise
              </a>
            </div>

          </div>
        </section>

        {/* ═══════════════════════ 8. TECH STACK & ARCHITECTURE ═══════════════════════ */}
        <section className="space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-outfit">
              Engineering Specs
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              How TASQ-ONE is Built
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              State-of-the-art cloud architecture designed for high availability, zero latency, and uncompromising security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Frontend Engine',
                tech: 'Next.js 14 & Tailwind CSS',
                icon: <Cpu size={22} className="text-indigo-500" />,
                details: 'TypeScript with glass-morphic UI, optimistic UI updates, sub-second renders, and responsive mobile layouts.'
              },
              {
                title: 'Cloud Database',
                tech: 'Supabase PostgreSQL 15',
                icon: <Database size={22} className="text-emerald-500" />,
                details: 'PostgreSQL with Row-Level Security (RLS) enforcement per tenant UUID, real-time change data capture, and connection pooling.'
              },
              {
                title: 'AI Decomposition',
                tech: 'Groq Llama 3.3 70B',
                icon: <Bot size={22} className="text-violet-500" />,
                details: 'Hardware-accelerated LPUs deliver complete structured JSON task breakdown via `/api/v1/ai/decompose` in < 400ms.'
              },
              {
                title: 'Security & Cache',
                tech: 'Upstash Redis & JWT',
                icon: <Lock size={22} className="text-rose-500" />,
                details: '15s in-memory auth cache, 600ms Redis timeout guard, rate-limiting, CSP headers, and cryptographic audit hashing.'
              },
            ].map((stack, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 space-y-3 shadow-xs"
              >
                <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 w-fit">
                  {stack.icon}
                </div>
                <h3 className="text-base font-outfit font-black text-slate-950 dark:text-white">
                  {stack.title}
                </h3>
                <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {stack.tech}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {stack.details}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════════ 9. DEPLOYMENT (DOCKER & API) ═══════════════════════ */}
        <section id="deployment" className="scroll-mt-24 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-outfit">
              Deployment Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              Where Can You Access TASQ-ONE?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. Cloud Web App */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  <Globe size={14} /> Cloud SaaS (Instant)
                </div>
                <h3 className="text-xl font-outfit font-black text-slate-950 dark:text-white">
                  Live Managed Web App
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Hosted on high-speed Render cloud infrastructure. Create your organization in 5 minutes with zero server management or maintenance required.
                </p>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono text-indigo-600 dark:text-indigo-400 break-all">
                  https://tasq-one.onrender.com
                </div>
              </div>

              <a
                href={TASQ_ONE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <span>Launch Public Demo</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* 2. Self-Hosted Docker */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold">
                  <Server size={14} /> Self-Hosted Docker
                </div>
                <h3 className="text-xl font-outfit font-black text-slate-950 dark:text-white">
                  Private Cloud / On-Premise
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Official Docker container (<code className="text-indigo-600 dark:text-indigo-400 font-bold">{TASQ_ONE_DOCKER_IMAGE}</code>) deployable to AWS, GCP, Fly.io, Azure, or your on-premise hardware.
                </p>

                <div className="relative">
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
                    {dockerSnippet}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(dockerSnippet, setCopiedDocker)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                    title="Copy Docker snippet"
                  >
                    {copiedDocker ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 dark:text-slate-400 text-center">
                Docker image published on DockerHub
              </div>
            </div>

            {/* 3. REST API Integration */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 space-y-4 flex flex-col justify-between shadow-xs">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 text-xs font-bold">
                  <Cpu size={14} /> Developer REST API
                </div>
                <h3 className="text-xl font-outfit font-black text-slate-950 dark:text-white">
                  Programmable Endpoints
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Integrate task decomposition directly into internal Slack bots, CI/CD webhooks, or custom ERP systems via REST under <code className="text-indigo-600 dark:text-indigo-400">/api/v1/</code>.
                </p>

                <div className="relative">
                  <pre className="p-3 rounded-xl bg-slate-950 text-slate-200 text-[11px] font-mono overflow-x-auto leading-relaxed border border-slate-800">
                    {apiSnippet}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(apiSnippet, setCopiedApi)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                    title="Copy API snippet"
                  >
                    {copiedApi ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 dark:text-slate-400 text-center">
                JWT Authenticated &amp; Redis Rate-Limited
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════════ 10. HIGH-IMPACT CALL TO ACTION ═══════════════════════ */}
        <section className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-800 text-white text-center space-y-6 shadow-2xl shadow-indigo-600/30">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-200 font-outfit">
              Ready to 10x Your Engineering Velocity?
            </span>
            <h2 className="text-3xl sm:text-5xl font-outfit font-black tracking-tight leading-tight">
              Start Your Free Trial Today — No Credit Card Required.
            </h2>
            <p className="text-indigo-100 text-xs sm:text-base leading-relaxed">
              Visit <strong>tasq-one.onrender.com</strong>, create your organization in 5 minutes, and start decomposing chaotic ideas into finished software.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={TASQ_ONE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-indigo-700 font-outfit font-black text-sm uppercase tracking-wider shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Launch TASQ-ONE Web App</span>
              <ArrowRight size={17} />
            </a>

            <a
              href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20consult%20or%20partner%20with%20you%20on%20TASQ-ONE!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-indigo-950/50 hover:bg-indigo-950/70 border border-white/20 text-white font-outfit font-bold text-sm transition-all cursor-pointer"
            >
              <span>Direct WhatsApp Inquiry</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-indigo-200 pt-4 border-t border-indigo-400/30">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} /> Immediate 5-Min Setup
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} /> Free Tier Available Forever
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={15} /> Self-Hosted Docker Ready
            </span>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TasqOne;
