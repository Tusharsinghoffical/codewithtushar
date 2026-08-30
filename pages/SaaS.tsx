import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket, Sparkles, ShieldCheck, Lock, Star, ArrowRight,
  Zap, Bot, Layers, CheckCircle2
} from 'lucide-react';

const TARGET_DATE = new Date('2026-09-01T00:00:00+05:30').getTime();

const calculateTimeLeft = () => {
  const now = new Date().getTime();
  const difference = TARGET_DATE - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const SaaS: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden flex flex-col justify-between pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* ── Dynamic Sci-Fi Animated Grid & Ambient Lights ── */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/20 to-cyan-500/15 blur-[160px] rounded-full animate-pulse" />
        <div className="absolute -bottom-20 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[140px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-12 sm:space-y-16 text-center z-10 my-auto">
        
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
              Coming 1 September 2026.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Building autonomous AI-driven software suites designed to eliminate 90% of business operational friction. Currently in closed beta with select enterprise partners.
          </p>
        </div>

        {/* ── 2. Live Countdown HUD (Target: 1 Sep 2026) ── */}
        <div className="max-w-xl mx-auto p-4 sm:p-6 rounded-3xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl shadow-indigo-500/10">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
            Official Public Beta Launch — 1 September 2026
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

        {/* ── 3. Early Access VIP Direct WhatsApp Consultation Box ── */}
        <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-slate-900 via-indigo-950/50 to-slate-900 border border-indigo-500/40 shadow-2xl space-y-6 text-center">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-3xl font-outfit font-black text-white">
              Get VIP Early Beta Access &amp; Custom Partnerships
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Looking for priority beta testing, custom enterprise white-labeling, or investor discussions? Connect directly with Tushar Singh.
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20partner%20or%20invest%20in%20your%20upcoming%20SaaS%20suites!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-white font-outfit font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-500/25 transition-all active:scale-95 group cursor-pointer"
            >
              <span>Direct WhatsApp Inquiry →</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[10.5px] text-slate-400 font-medium pt-2">
            <span className="flex items-center gap-1.5">
              <Lock size={12} className="text-emerald-400" /> Direct Engineer Access
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Star size={12} className="text-amber-400 fill-amber-400" /> Founder Privileges &amp; 50% Beta Discount
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={12} className="text-cyan-400" /> Guaranteed &lt; 1 Hr Reply
            </span>
          </div>
        </div>

        {/* ── 4. Back Navigation Links ── */}
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
