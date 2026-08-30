import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Rocket, Sparkles, ShieldCheck, Lock, Star, ArrowRight,
  Zap, Bot, Layers, CheckCircle2, ChevronRight, Clock
} from 'lucide-react';
import { FIVERR_PROFILE_URL } from '../constants';
import { FiverrBadge } from '../components/FiverrBadge';

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
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden flex flex-col justify-between pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* ── Radiant Light Background Gradients & Mesh Pattern ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] sm:w-[850px] h-[450px] bg-gradient-to-tr from-indigo-100 via-violet-100 to-sky-100 blur-[130px] rounded-full opacity-80" />
        <div className="absolute -bottom-10 right-1/4 w-[450px] h-[350px] bg-emerald-100/60 blur-[110px] rounded-full" />
        {/* Subtle geometric dot grid */}
        <div className="absolute inset-0 opacity-[0.45] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="max-w-4xl mx-auto w-full space-y-10 sm:space-y-14 text-center z-10 my-auto">
        
        {/* ── 1. Header & Live Beacon Badge ── */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-indigo-100 shadow-md shadow-indigo-100/40 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-indigo-700 font-outfit">
              Tushar Singh Labs · Proprietary SaaS Suites
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-black tracking-tight text-slate-950 leading-[1.15]">
            <span className="block">Something Disruptive is</span>
            <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent mt-1">
              Coming 1 September 2026.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Building autonomous AI-driven software suites designed to eliminate 90% of business operational friction. Currently in closed beta with select enterprise partners.
          </p>
        </div>

        {/* ── 2. Clean Modern Light Countdown HUD (Target: 1 Sep 2026) ── */}
        <div className="max-w-xl mx-auto p-5 sm:p-7 rounded-3xl bg-white/95 border border-slate-200/80 backdrop-blur-xl shadow-xl shadow-indigo-900/5">
          <div className="flex items-center justify-center gap-2 mb-4 text-[10.5px] font-black uppercase tracking-[0.25em] text-slate-600">
            <Clock size={13} className="text-indigo-600" />
            <span>Official Public Beta Launch — 1 September 2026</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 text-center">
            {[
              { val: timeLeft.days, label: 'Days' },
              { val: timeLeft.hours, label: 'Hours' },
              { val: timeLeft.minutes, label: 'Mins' },
              { val: timeLeft.seconds, label: 'Secs' },
            ].map(({ val, label }) => (
              <div key={label} className="p-3 sm:p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 shadow-sm">
                <span className="text-2xl sm:text-4xl font-outfit font-black text-slate-950 tabular-nums">
                  {String(val).padStart(2, '0')}
                </span>
                <span className="block text-[9.5px] font-black uppercase tracking-wider text-indigo-600 mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3. Early Access VIP WhatsApp Consultation Box ── */}
        <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-white border border-indigo-100 shadow-2xl shadow-indigo-900/10 space-y-6 text-center">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-3xl font-outfit font-black text-slate-950">
              Get VIP Early Beta Access &amp; Custom Partnerships
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Looking for priority beta testing, custom enterprise white-labeling, or investor discussions? Connect directly with Tushar Singh.
            </p>
          </div>

          <div className="pt-2">
            <a
              href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20partner%20or%20invest%20in%20your%20upcoming%20SaaS%20suites!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-outfit font-black text-sm uppercase tracking-wider shadow-xl shadow-emerald-600/25 transition-all active:scale-95 group cursor-pointer"
            >
              <span>Direct WhatsApp Inquiry →</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-600 font-semibold pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1.5 text-slate-700">
              <Lock size={13} className="text-emerald-600" /> Direct Engineer Access
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <Star size={13} className="text-amber-500 fill-amber-500" /> Founder Privileges &amp; 50% Beta Discount
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <ShieldCheck size={13} className="text-indigo-600" /> Guaranteed &lt; 1 Hr Reply
            </span>
          </div>
        </div>

        {/* ── 4. Clean Navigation Links ── */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to="/services"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-all shadow-sm hover:shadow"
          >
            Explore Active Services
          </Link>
          <Link
            to="/projects"
            className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 transition-all shadow-sm hover:shadow"
          >
            View Live Portfolio
          </Link>
          <Link
            to="/contact"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white transition-all shadow-md shadow-indigo-600/20"
          >
            Hire Tushar for Custom SaaS
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SaaS;
