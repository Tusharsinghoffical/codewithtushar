import React, { useState, useId } from 'react';
import {
  Mail, Send, Github, Linkedin, Instagram,
  CheckCircle2, ArrowRight, Sparkles,
  ShieldCheck, Phone, MessageCircle,
  Globe, MapPin, CalendarClock, User, Briefcase,
  ChevronRight, Clock, Zap, Check, Lock, ArrowUpRight,
  Flame, Award, Layers, FileCheck, ExternalLink, QrCode
} from 'lucide-react';
import GoogleVerifiedBadge, { GoogleGIcon } from '../components/GoogleVerifiedBadge';
import { FiverrIcon, FiverrBadge } from '../components/FiverrBadge';
import {
  GOOGLE_BUSINESS_NAME, GOOGLE_BUSINESS_URL,
  GOOGLE_VERIFICATION_PROOF_URL, BUSINESS_ADDRESS,
  FIVERR_PROFILE_URL
} from '../constants';

/* ─── Reusable Social Pill ────────────────────────────────── */
const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all text-[10px] font-black uppercase tracking-wider shadow-2xs"
  >
    {icon} <span>{label}</span>
  </a>
);

/* ─── Reusable Info Row ────────────────────────────────── */
const InfoRow = ({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) => (
  <div className="flex items-start gap-3 py-3 border-b border-slate-100 dark:border-white/5 last:border-0">
    <div className="mt-0.5 text-indigo-600 dark:text-indigo-400 shrink-0 p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-words"
        >
          {value}
        </a>
      ) : (
        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 break-words">{value}</p>
      )}
    </div>
  </div>
);

/* ─── Reusable Fancy Input ────────────────────────────────── */
const FancyInput = ({ label, id, icon, ...props }: any) => (
  <div className="space-y-1.5 text-left">
    <label htmlFor={id} className="text-[9.5px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
      {label}
    </label>
    <div className="relative">
      {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">{icon}</div>}
      <input
        id={id}
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-white/10 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium`}
        {...props}
      />
    </div>
  </div>
);

/* ─── Main Component ──────────────────────────────────────── */
const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [selectedService, setSelectedService] = useState('AI Automation');
  const [selectedTimeline, setSelectedTimeline] = useState('Standard (2-4 wks)');
  const ids = { name: useId(), email: useId(), phone: useId(), company: useId(), message: useId(), country: useId() };

  React.useEffect(() => {
    const stored = sessionStorage.getItem('selectedService');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.service) setSelectedService(parsed.service);
      } catch (e) {}
      sessionStorage.removeItem('selectedService');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData(e.currentTarget);
    const msg = `Hi Tushar! I'd like to discuss a project.\n\n👤 Name: ${fd.get('name')}\n📧 Email: ${fd.get('email')}\n📱 Phone/WhatsApp: ${fd.get('phone')}\n🏢 Company: ${fd.get('company')}\n🛠️ Service: ${selectedService}\n⏱️ Timeline: ${selectedTimeline}\n🌍 Country: ${fd.get('country')}\n\n📝 Project Details:\n${fd.get('message')}`;
    
    window.open(`https://wa.me/918851619647?text=${encodeURIComponent(msg)}`, '_blank');
    setStatus('success');
    const form = e.currentTarget;
    setTimeout(() => form.reset(), 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 w-full overflow-x-hidden">

      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        {/* Ambient Glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[140px]" />
          <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.035] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Availability Pill & Fiverr Badge */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-500/20 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 shadow-2xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Available Worldwide — India, USA, UK, UAE &amp; More
            </div>
            <FiverrBadge variant="pill" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-outfit font-black text-slate-950 dark:text-white tracking-tight leading-[1.08] speakable">
            Let's Build Something <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Exceptional.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed speakable">
            Ready to automate your manual workflows, build a scalable web platform, or deploy an intelligent AI chatbot?
            Reach out directly or hire via Fiverr — guaranteed response within <strong className="text-slate-950 dark:text-white font-bold">1 hour</strong>.
          </p>

          {/* 3 Quick Assurance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1 text-xs font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <Clock size={14} className="text-indigo-500" />
              <span>Response &lt; 1 Hour</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>100% Free Strategy Audit</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 shadow-2xs">
              <Zap size={14} className="text-amber-500" />
              <span>Direct 1-on-1 Engineering</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 2. MAIN INTERACTIVE GRID ═══════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ── LEFT COLUMN: DIRECT CHANNELS & CREDIBILITY (5 COLS) ── */}
          <div className="lg:col-span-5 space-y-6">

            {/* Direct Action Hub (WhatsApp + Fiverr + Calendly Triple Bento) */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-white/10 shadow-xl space-y-3.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-indigo-400">Direct Connect</span>
                  <h3 className="text-base font-outfit font-black text-white">Instant Consultation &amp; Hire</h3>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[8px] font-black text-emerald-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Online
                </span>
              </div>

              {/* Action 1: WhatsApp */}
              <a
                href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <MessageCircle size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-wider">Chat on WhatsApp</p>
                    <p className="text-[10px] text-emerald-100 font-medium">+91 88516 19647 (Instant Reply)</p>
                  </div>
                </div>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Action 2: Fiverr Direct Order */}
              <a
                href={FIVERR_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-[#1DBF73] hover:bg-[#19a463] text-white transition-all shadow-md active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                    <FiverrIcon size={22} className="brightness-125" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-wider">Order on Fiverr</p>
                    <p className="text-[10px] text-emerald-100 font-medium">100% Escrow &amp; Buyer Protection</p>
                  </div>
                </div>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              {/* Action 3: Calendly */}
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white transition-all active:scale-95"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/30 text-indigo-300 flex items-center justify-center">
                    <CalendarClock size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-wider">Book 30-Min Call</p>
                    <p className="text-[10px] text-slate-300 font-medium">Free AI Architecture Strategy</p>
                  </div>
                </div>
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Official Google Business Verified Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <GoogleGIcon size={20} />
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      Google Verified Business
                    </span>
                    <h3 className="text-sm font-outfit font-black text-slate-950 dark:text-white mt-0.5">
                      {GOOGLE_BUSINESS_NAME}
                    </h3>
                  </div>
                </div>
                <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100 dark:border-white/5">
                <a
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl text-[9.5px] font-black uppercase tracking-wider hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-slate-700 transition-colors"
                >
                  <span>Google Profile</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href={GOOGLE_VERIFICATION_PROOF_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-[9.5px] font-black uppercase tracking-wider hover:bg-emerald-100 transition-colors"
                >
                  <Award size={10} />
                  <span>Verify Proof</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Details Card */}
            <div className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 shadow-sm text-left space-y-1">
              <h3 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Direct Reach &amp; Channels</h3>
              
              <InfoRow
                icon={<FiverrIcon size={15} />}
                label="Fiverr Freelance Profile"
                value="fiverr.com/s/zAd5R2z (Order Directly)"
                href={FIVERR_PROFILE_URL}
              />
              <InfoRow
                icon={<Mail size={15} />}
                label="Official Email"
                value="tusharsinghoffical@gmail.com"
                href="mailto:tusharsinghoffical@gmail.com"
              />
              <InfoRow
                icon={<Phone size={15} />}
                label="Direct Phone / WhatsApp"
                value="+91 88516 19647"
                href="https://wa.me/918851619647"
              />
              <InfoRow
                icon={<MapPin size={15} />}
                label="Public Office Location"
                value="New Delhi, Delhi 110044, India"
                href="https://www.google.com/maps/search/?api=1&query=Tushar+Singh+freelancing+New+Delhi+Delhi+110044"
              />
              <InfoRow
                icon={<Globe size={15} />}
                label="Service Coverage"
                value="India, USA, UK, UAE, Australia, Canada, Singapore & Worldwide"
              />

              {/* Social Links */}
              <div className="pt-4 mt-2 border-t border-slate-200/80 dark:border-white/5">
                <p className="text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2.5">Connect &amp; Hire</p>
                <div className="flex flex-wrap gap-2">
                  <SocialLink href={FIVERR_PROFILE_URL} icon={<FiverrIcon size={12} />} label="Fiverr" />
                  <SocialLink href="https://github.com/Tusharsinghoffical" icon={<Github size={12} />} label="GitHub" />
                  <SocialLink href="https://linkedin.com/in/tusharsingh2011" icon={<Linkedin size={12} />} label="LinkedIn" />
                  <SocialLink href="https://www.instagram.com/tushar.cms/" icon={<Instagram size={12} />} label="Instagram" />
                </div>
              </div>
            </div>

            {/* Global Clients Flag Pills */}
            <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-3xl text-left">
              <p className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Globe size={12} className="text-indigo-500" />
                Clients Served Worldwide
              </p>
              <div className="flex flex-wrap gap-1.5">
                {['🇮🇳 India', '🇺🇸 USA', '🇬🇧 UK', '🇦🇪 UAE', '🇦🇺 Australia', '🇨🇦 Canada', '🇸🇬 Singapore', '🌍 + Worldwide'].map(c => (
                  <span
                    key={c}
                    className="px-2.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-white/10 rounded-lg text-[9.5px] font-bold text-slate-700 dark:text-slate-300"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE PROJECT BRIEF BUILDER (7 COLS) ── */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 rounded-3xl p-6 sm:p-9 shadow-xl relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Form Header */}
              <div className="flex items-center justify-between mb-7 pb-5 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shadow-2xs shrink-0">
                    <Send size={17} />
                  </div>
                  <div>
                    <h2 className="text-lg font-outfit font-black text-slate-950 dark:text-white">Send a Project Brief</h2>
                    <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Response within 1 hour · Free Architecture Scoping</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/30 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                </span>
              </div>

              {status === 'success' ? (
                <div className="text-center py-16 space-y-5">
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={36} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-outfit font-black text-slate-950 dark:text-white">Brief Sent to WhatsApp!</h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Thank you! Your project details have been formatted and opened directly on WhatsApp. I will review and reply within 1 hour.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-7 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Send Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">

                  {/* 1. Service Selector */}
                  <div className="space-y-2 text-left">
                    <label className="text-[9.5px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      1. Select Required Service (What do you need?)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {[
                        { id: 'Website & Web Application', label: 'Website / Web App', sub: 'Custom business site, store, or portal', icon: '🌐' },
                        { id: 'AI Chatbot & WhatsApp Bot', label: 'AI Chatbot & WhatsApp', sub: 'Auto-reply to customer questions 24/7', icon: '💬' },
                        { id: 'AI Business Automation', label: 'AI Workflows & Automation', sub: 'Eliminate manual data entry & connect tools', icon: '🤖' },
                        { id: 'Logo & Brand Identity Design', label: 'Logo & Graphic Design', sub: 'Professional logo & complete brand kit', icon: '🎨' },
                      ].map(item => {
                        const active = selectedService === item.id;
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setSelectedService(item.id)}
                            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                              active
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-[1.01]'
                                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                            }`}
                          >
                            <span className="text-xl shrink-0 p-1.5 rounded-xl bg-white/10">{item.icon}</span>
                            <div className="min-w-0">
                              <span className={`text-[11px] font-black uppercase tracking-wider block leading-tight ${active ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                                {item.label}
                              </span>
                              <span className={`text-[10px] leading-tight block mt-0.5 ${active ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'}`}>
                                {item.sub}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Timeline Selector */}
                  <div className="space-y-2 text-left">
                    <label className="text-[9.5px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      2. Project Urgency &amp; Timeline
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'Urgent (< 2 wks)', label: '🚀 Urgent (< 2 wks)' },
                        { id: 'Standard (2-4 wks)', label: '⚡ Standard (2-4 wks)' },
                        { id: 'Long-term / Retainer', label: '🛠️ Retainer' },
                      ].map(tl => (
                        <button
                          type="button"
                          key={tl.id}
                          onClick={() => setSelectedTimeline(tl.id)}
                          className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer text-[9px] font-black uppercase tracking-wider truncate ${
                            selectedTimeline === tl.id
                              ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                          }`}
                        >
                          {tl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Client Information 4-Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <FancyInput
                      id={ids.name}
                      name="name"
                      label="Full Name"
                      placeholder="e.g. John Doe / Rahul Sharma"
                      required
                      icon={<User size={14} />}
                    />
                    <FancyInput
                      id={ids.email}
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="you@company.com"
                      required
                      icon={<Mail size={14} />}
                    />
                    <FancyInput
                      id={ids.phone}
                      name="phone"
                      label="WhatsApp / Phone Number"
                      placeholder="+91 or +1 234..."
                      required
                      icon={<Phone size={14} />}
                    />
                    <FancyInput
                      id={ids.company}
                      name="company"
                      label="Company / Brand Name"
                      placeholder="Your company or project"
                      required
                      icon={<Briefcase size={14} />}
                    />
                  </div>

                  {/* 4. Location Field */}
                  <FancyInput
                    id={ids.country}
                    name="country"
                    label="Your Country / Location"
                    placeholder="e.g. India, USA, UK, UAE, Canada, Australia..."
                    required
                    icon={<Globe size={14} />}
                  />

                  {/* 5. Project Details */}
                  <div className="space-y-1.5 text-left">
                    <label htmlFor={ids.message} className="text-[9.5px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      Project Details &amp; Current Bottleneck
                    </label>
                    <textarea
                      id={ids.message}
                      name="message"
                      required
                      rows={3}
                      placeholder="What is your business goal? Which workflows are slow or manual? What tools do you currently use (e.g. Google Sheets, CRM, Web Platform)?"
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-white/10 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-y font-medium leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group w-full flex items-center justify-center gap-2.5 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/25 hover:scale-[1.01] active:scale-95 disabled:opacity-70 cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        <span>Send Brief via WhatsApp</span>
                      </>
                    )}
                  </button>

                  {/* Trust footer */}
                  <div className="flex items-center justify-center gap-2 text-[9.5px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider pt-0.5">
                    <Lock size={11} className="text-emerald-500" />
                    <span>100% Confidential · Strict NDA Available · Response in &lt; 1 Hour</span>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ═══════════════════════ 3. WHAT HAPPENS NEXT (ROADMAP) ═══════════════════════ */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 dark:bg-slate-900/30 border-t border-slate-200/80 dark:border-white/5">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12 space-y-2">
            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] flex items-center justify-center gap-1.5">
              <Layers size={13} />
              Simple &amp; Transparent
            </p>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white tracking-tight">
              What Happens After You Submit?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                title: 'Brief Review',
                desc: 'I analyze your goals, current bottlenecks, and tech stack within 1 hour.',
                icon: <Clock size={18} className="text-indigo-500" />,
              },
              {
                step: '02',
                title: 'Strategy Session',
                desc: 'A 30-min call to map out architecture, tool integrations, and AI ROI.',
                icon: <CalendarClock size={18} className="text-violet-500" />,
              },
              {
                step: '03',
                title: 'Fixed Proposal',
                desc: 'Clear scope, fixed pricing, milestone deliverables, and exact timelines.',
                icon: <FileCheck size={18} className="text-emerald-500" />,
              },
              {
                step: '04',
                title: 'Rapid Build & Launch',
                desc: 'Direct 1-on-1 development with daily updates until live deployment.',
                icon: <Zap size={18} className="text-amber-500" />,
              },
            ].map(({ step, title, desc, icon }) => (
              <div
                key={step}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 relative hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xs">
                      {icon}
                    </div>
                    <span className="text-2xl font-outfit font-black text-slate-200 dark:text-slate-800 group-hover:text-indigo-500/20 transition-colors">
                      {step}
                    </span>
                  </div>
                  <h3 className="text-sm font-outfit font-black text-slate-950 dark:text-white mb-1.5">{title}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
