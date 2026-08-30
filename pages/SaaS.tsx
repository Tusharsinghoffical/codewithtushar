import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket, Sparkles, Zap, Bot, ShieldCheck, ArrowRight,
  CheckCircle2, Bell, Lock, Cpu, Globe, Layers, Star,
  Terminal, Flame, Send, Check
} from 'lucide-react';
import { FIVERR_PROFILE_URL } from '../constants';
import { FiverrBadge } from '../components/FiverrBadge';

const UPCOMING_PRODUCTS = [
  {
    id: 'autolead',
    name: 'AutoLead AI Studio',
    badge: 'In Private Beta',
    icon: <Zap className="text-amber-400" size={24} />,
    tagline: 'Autonomous Multichannel Lead Machine',
    description: 'Finds, verifies, enriches, and initiates AI-personalized email & LinkedIn outreach on complete autopilot.',
    specs: ['99.4% Email Accuracy', 'Bypass Spam Filters', 'n8n Native Sync']
  },
  {
    id: 'omnibot',
    name: 'OmniBot RAG Orchestrator',
    badge: 'Under Development',
    icon: <Bot className="text-cyan-400" size={24} />,
    tagline: '24/7 Multi-Tenant Business Brain',
    description: 'Connects all private company documentation, SQL databases, and CRM to answer client queries in milliseconds.',
    specs: ['Sub-100ms Inference', 'WhatsApp & Webhook API', 'Enterprise Guardrails']
  },
  {
    id: 'docuflow',
    name: 'DocuFlow Agentic Pipeline',
    badge: 'Q3 Launch',
    icon: <Cpu className="text-indigo-400" size={24} />,
    tagline: 'Intelligent Document & Invoice Extractor',
    description: 'Converts unstructured PDFs, scanned bills, and complex contracts into clean SQL & JSON databases with 0 human effort.',
    specs: ['99.9% OCR Precision', 'Automated Tally/ERP Sync', 'Multi-Language Support']
  }
];

export const SaaS: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>('autolead');

  // Simulated countdown timer state
  const [timeLeft, setTimeLeft] = useState({ days: 42, hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col justify-between pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      
      {/* ── Dynamic Sci-Fi Animated Grid & Ambient Lights ── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/20 to-cyan-500/15 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-5xl mx-auto w-full space-y-12 sm:space-y-16 text-center z-10">
        
        {/* ── 1. Holographic Header ── */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-cyan-500/20 border border-indigo-400/40 backdrop-blur-xl shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-300 font-outfit">
              Tushar Singh Labs · Proprietary SaaS Suites
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-black tracking-tight text-white leading-[1.08]">
            Something Disruptive is <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-sm">
              Coming Very Soon.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Building autonomous AI-driven software suites designed to eliminate 90% of business operational friction. Currently in closed beta with select enterprise partners.
          </p>
        </div>

        {/* ── 2. Live Countdown HUD ── */}
        <div className="max-w-xl mx-auto p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl shadow-indigo-500/10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
            Estimated Public Beta Reveal
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Mins' },
              { val: timeLeft.seconds, label: 'Secs' },
            ].map(({ val, label }) => (
              <div key={label} className="p-3 sm:p-4 rounded-2xl bg-slate-950/90 border border-white/10 shadow-inner">
                <span className="text-2xl sm:text-4xl font-outfit font-black text-white tabular-nums">
                  {String(val).padStart(2, '0')}
                </span>
                <span className="block text-[9px] font-black uppercase tracking-wider text-indigo-400 mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Sneak-Peek Interactive Products Teaser ── */}
        <div className="space-y-6 text-left">
          <div className="text-center">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-400">
              Under Active Development
            </h2>
            <p className="text-xl sm:text-2xl font-outfit font-black text-white mt-1">
              Sneak Peek at Upcoming Suites
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {UPCOMING_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                onMouseEnter={() => setHoveredProduct(prod.id)}
                className={`relative p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between backdrop-blur-xl ${
                  hoveredProduct === prod.id
                    ? 'bg-slate-900 border-indigo-400 shadow-2xl shadow-indigo-500/20 scale-[1.02]'
                    : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center shadow-lg">
                      {prod.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/40 text-[9px] font-black text-indigo-300 uppercase tracking-wider">
                      {prod.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-outfit font-black text-white">{prod.name}</h3>
                    <p className="text-[11px] font-bold text-indigo-300 uppercase tracking-wide mt-0.5">{prod.tagline}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-medium">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-white/5 space-y-2">
                  {prod.specs.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[10.5px] text-slate-300 font-semibold">
                      <CheckCircle2 size={12} className="text-cyan-400 shrink-0" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 4. Early Access VIP Waitlist Box ── */}
        <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/40 shadow-2xl space-y-6 text-center">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-outfit font-black text-white">
              Get VIP Early Beta Access &amp; 50% Lifetime Discount
            </h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Join the priority list to test live alphas, provide feedback, and unlock lifetime founder pricing.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 flex items-center justify-center gap-2 text-xs font-bold animate-in fade-in">
              <Check size={16} className="text-emerald-400" />
              <span>🎉 You're on the priority waitlist! We'll notify you on launch.</span>
            </div>
          ) : (
            <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email..."
                className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-950 border border-white/15 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
              />
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-cyan-500 hover:opacity-90 text-white font-outfit font-black text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all shrink-0 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Access</span>
                <ArrowRight size={14} />
              </button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-4 text-[10.5px] text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <Lock size={12} className="text-emerald-400" /> Zero spam
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Star size={12} className="text-amber-400 fill-amber-400" /> Founder privileges
            </span>
            <span>•</span>
            <a
              href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20partner%20or%20invest%20in%20your%20upcoming%20SaaS%20suites!"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 hover:underline font-bold"
            >
              Direct WhatsApp Inquiry →
            </a>
          </div>
        </div>

        {/* ── 5. Back Navigation Links ── */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            to="/services"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 transition-all"
          >
            Explore Active Services
          </Link>
          <Link
            to="/projects"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 transition-all"
          >
            View Live Portfolio
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-all shadow-md"
          >
            Hire Tushar for Custom SaaS
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SaaS;
