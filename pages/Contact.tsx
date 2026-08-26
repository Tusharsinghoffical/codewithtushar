import React, { useState, useId } from 'react';
import {
  Mail, Send, Github, Linkedin, Instagram,
  CheckCircle2, ArrowRight, Sparkles,
  ShieldCheck, Phone, MessageCircle,
  Globe, MapPin, CalendarClock, User, Briefcase,
  ChevronRight, Clock, Zap, Check, Lock, ArrowUpRight,
  Flame, HelpCircle, FileCheck, Layers, Award
} from 'lucide-react';
import GoogleVerifiedBadge, { GoogleGIcon } from '../components/GoogleVerifiedBadge';
import {
  GOOGLE_BUSINESS_NAME, GOOGLE_BUSINESS_URL,
  GOOGLE_VERIFICATION_PROOF_URL, BUSINESS_ADDRESS
} from '../constants';

/* ─── Reusable Social Pill ────────────────────────────────── */
const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all text-[10px] font-black uppercase tracking-wider shadow-2xs"
  >
    {icon} <span>{label}</span>
  </a>
);

/* ─── Reusable Info Row ────────────────────────────────── */
const InfoRow = ({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) => (
  <div className="flex items-start gap-3.5 py-3.5 border-b border-slate-200/80 dark:border-white/5 last:border-0">
    <div className="mt-1 text-indigo-600 dark:text-indigo-400 shrink-0 p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60">
      {icon}
    </div>
    <div className="min-w-0 flex-1">
      <p className="text-[8.5px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-words"
        >
          {value}
        </a>
      ) : (
        <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 break-words">{value}</p>
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
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-white/10 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium`}
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
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">

      {/* ═══════════════════════ 1. HERO SECTION ═══════════════════════ */}
      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[140px]" />
          <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/5 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.022] dark:opacity-[0.035] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Availability Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/90 dark:border-emerald-500/20 text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 shadow-2xs">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available Worldwide — India, USA, UK, UAE &amp; More
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-black text-slate-950 dark:text-white tracking-tight leading-[1.06] speakable">
            Let's Build Something <br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Exceptional.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed speakable">
            Ready to automate your manual workflows, build a modern web platform, or launch an intelligent AI chatbot?
            Reach out directly — you'll get a detailed response within <strong className="text-slate-950 dark:text-white font-bold">1 hour</strong>.
          </p>

          {/* 3 Quick Assurance Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2 text-xs font-bold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2xs">
              <Clock size={14} className="text-indigo-500" />
              <span>Response &lt; 1 Hour</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2xs">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>100% Free Strategy Call</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-2xs">
              <Zap size={14} className="text-amber-500" />
              <span>Direct 1-on-1 with Tushar</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ 2. MAIN INTERACTIVE GRID ═══════════════════════ */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ── LEFT COLUMN: DIRECT CHANNELS & CREDIBILITY (5 COLS) ── */}
          <div className="lg:col-span-5 space-y-6">

            {/* Calendly Booking Card */}
            <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-600 to-violet-700 rounded-3xl p-7 sm:p-8 overflow-hidden text-white shadow-xl group">
              <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <CalendarClock size={160} />
              </div>
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white shadow-xs">
                  <CalendarClock size={24} />
                </div>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-indigo-100">
                  Free 30-Min Call
                </span>
              </div>

              <h2 className="text-xl font-outfit font-black text-white mb-2 relative z-10">
                Book Strategy Consultation
              </h2>
              <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed mb-6 relative z-10">
                Map out your manual bottlenecks, discover AI automation opportunities, and get a tailored delivery roadmap. Zero obligations.
              </p>
              <a
                href="https://calendly.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-between w-full px-6 py-4 bg-white text-indigo-950 rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:bg-indigo-50 hover:scale-[1.02] active:scale-95 transition-all shadow-md"
              >
                <span>Open Calendly Schedule</span>
                <ArrowRight size={15} />
              </a>
            </div>

            {/* WhatsApp Direct Connect */}
            <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent dark:from-emerald-950/40 dark:via-emerald-950/20 dark:to-transparent border border-emerald-200/90 dark:border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-xs">
                    <MessageCircle size={22} />
                  </div>
                  <div>
                    <h3 className="text-base font-outfit font-black text-slate-950 dark:text-white">Chat on WhatsApp</h3>
                    <p className="text-[9px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Direct Voice Note or Text</p>
                  </div>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Prefer immediate messaging? Reach out directly with project questions, voice notes, or quick estimates.
              </p>
              <a
                href="https://wa.me/918851619647"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-emerald-500/20"
              >
                <span>+91 88516 19647</span>
                <ChevronRight size={14} />
              </a>
            </div>

            {/* Google Business Verified Card */}
            <GoogleVerifiedBadge variant="card" />

            {/* Direct Contact Details Card */}
            <div className="bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-sm">
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Direct Reach &amp; Channels</h3>
              
              <InfoRow
                icon={<Mail size={16} />}
                label="Email Address"
                value="tusharsinghkumar04@gmail.com"
                href="mailto:tusharsinghkumar04@gmail.com"
              />
              <InfoRow
                icon={<Phone size={16} />}
                label="Phone / WhatsApp"
                value="+91 88516 19647"
                href="https://wa.me/918851619647"
              />
              <InfoRow
                icon={<MapPin size={16} />}
                label="Registered Office"
                value="New Delhi, Delhi 110044, India"
                href="https://www.google.com/maps/search/?api=1&query=Tushar+Singh+freelancing+New+Delhi+Delhi+110044"
              />
              <InfoRow
                icon={<Globe size={16} />}
                label="Service Coverage"
                value="India, USA, UK, UAE, Australia, Canada, Singapore & Worldwide"
              />

              {/* Social Links */}
              <div className="pt-5 border-t border-slate-200/80 dark:border-white/5">
                <p className="text-[8.5px] font-black uppercase tracking-widest text-slate-400 mb-3">Connect on Social</p>
                <div className="flex flex-wrap gap-2">
                  <SocialLink href="https://github.com/Tusharsinghoffical" icon={<Github size={13} />} label="GitHub" />
                  <SocialLink href="https://linkedin.com/in/tusharsingh2011" icon={<Linkedin size={13} />} label="LinkedIn" />
                  <SocialLink href="https://www.instagram.com/tushar.cms/" icon={<Instagram size={13} />} label="Instagram" />
                </div>
              </div>
            </div>

            {/* Global Clients Flag Pills */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-white/10 rounded-3xl">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                <Globe size={13} className="text-indigo-500" />
                Clients Served Worldwide
              </p>
              <div className="flex flex-wrap gap-2">
                {['🇮🇳 India', '🇺🇸 USA', '🇬🇧 UK', '🇦🇪 UAE', '🇦🇺 Australia', '🇨🇦 Canada', '🇸🇬 Singapore', '🌍 + Worldwide'].map(c => (
                  <span
                    key={c}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-2xs"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT COLUMN: INTERACTIVE PROJECT BRIEF BUILDER (7 COLS) ── */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-white/10 rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Form Header */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center shadow-2xs">
                    <Send size={18} />
                  </div>
                  <div>
                    <h2 className="text-xl font-outfit font-black text-slate-950 dark:text-white">Send a Project Brief</h2>
                    <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Response within 1 hour · Free Architecture Audit</p>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/30 text-[9px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                </span>
              </div>

              {status === 'success' ? (
                <div className="text-center py-16 space-y-5">
                  <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-3xl flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-outfit font-black text-slate-950 dark:text-white">Brief Sent to WhatsApp!</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Thank you! Your project details have been prepared and sent directly to WhatsApp. I will review and reply within 1 hour.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-8 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-extrabold text-xs uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    Send Another Brief
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* 1. Service Selector */}
                  <div className="space-y-2 text-left">
                    <label className="text-[9.5px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      1. What service do you need?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { id: 'AI Automation', label: 'AI Automation', icon: '🤖' },
                        { id: 'Chatbot / AI Agent', label: 'AI Chatbots', icon: '💬' },
                        { id: 'Website & Funnel', label: 'Web Platform', icon: '⚡' },
                        { id: 'Logo & Branding', label: 'Brand Design', icon: '🎨' },
                      ].map(item => {
                        const active = selectedService.toLowerCase().includes(item.id.toLowerCase().split(' ')[0]);
                        return (
                          <button
                            type="button"
                            key={item.id}
                            onClick={() => setSelectedService(item.id)}
                            className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                              active
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20 scale-[1.02]'
                                : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/90 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                            }`}
                          >
                            <span className="text-base">{item.icon}</span>
                            <span className="text-[10px] font-black uppercase tracking-wider leading-tight">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. Timeline Selector */}
                  <div className="space-y-2 text-left">
                    <label className="text-[9.5px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                      2. Project Urgency / Timeline
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {[
                        { id: 'Urgent (< 2 wks)', label: '🚀 Urgent (< 2 wks)' },
                        { id: 'Standard (2-4 wks)', label: '⚡ Standard (2-4 wks)' },
                        { id: 'Long-term / Retainer', label: '🛠️ Long-term / Retainer' },
                      ].map(tl => (
                        <button
                          type="button"
                          key={tl.id}
                          onClick={() => setSelectedTimeline(tl.id)}
                          className={`py-2.5 px-2 rounded-xl border text-center transition-all cursor-pointer text-[9.5px] font-black uppercase tracking-wider truncate ${
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FancyInput
                      id={ids.name}
                      name="name"
                      label="Full Name"
                      placeholder="e.g. John Doe / Rahul Sharma"
                      required
                      icon={<User size={15} />}
                    />
                    <FancyInput
                      id={ids.email}
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="you@company.com"
                      required
                      icon={<Mail size={15} />}
                    />
                    <FancyInput
                      id={ids.phone}
                      name="phone"
                      label="WhatsApp / Phone"
                      placeholder="+91 or +1 234..."
                      required
                      icon={<Phone size={15} />}
                    />
                    <FancyInput
                      id={ids.company}
                      name="company"
                      label="Company / Brand"
                      placeholder="Your brand name"
                      required
                      icon={<Briefcase size={15} />}
                    />
                  </div>

                  {/* 4. Location Field */}
                  <FancyInput
                    id={ids.country}
                    name="country"
                    label="Your Country / Location"
                    placeholder="e.g. India, USA, UK, UAE, Canada, Australia..."
                    required
                    icon={<Globe size={15} />}
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
                      rows={4}
                      placeholder="What is your business goal? Which workflows are slow or manual? What tools do you currently use (e.g. Google Sheets, CRM, Website)?"
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200/90 dark:border-white/10 rounded-2xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-y font-medium leading-relaxed"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="group w-full flex items-center justify-center gap-3 py-4.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-extrabold text-xs uppercase tracking-widest transition-all shadow-xl shadow-indigo-500/25 hover:scale-[1.01] active:scale-95 disabled:opacity-70 cursor-pointer"
                  >
                    {status === 'sending' ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={15} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                        <span>Send Brief via WhatsApp</span>
                      </>
                    )}
                  </button>

                  {/* Trust footer */}
                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider pt-1">
                    <Lock size={12} className="text-emerald-500" />
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
          
          <div className="text-center mb-14 space-y-2">
            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] flex items-center justify-center gap-1.5">
              <Layers size={13} />
              Simple &amp; Transparent
            </p>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white tracking-tight">
              What Happens After You Submit?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Brief Review',
                desc: 'I analyze your goals, current bottlenecks, and tech stack within 1 hour.',
                icon: <Clock size={20} className="text-indigo-500" />,
              },
              {
                step: '02',
                title: 'Strategy Session',
                desc: 'A 30-min call to map out architecture, tool integrations, and AI ROI.',
                icon: <CalendarClock size={20} className="text-violet-500" />,
              },
              {
                step: '03',
                title: 'Fixed Proposal',
                desc: 'Clear scope, fixed pricing, milestone deliverables, and exact timelines.',
                icon: <FileCheck size={20} className="text-emerald-500" />,
              },
              {
                step: '04',
                title: 'Rapid Build & Launch',
                desc: 'Direct 1-on-1 development with daily updates until live deployment.',
                icon: <Zap size={20} className="text-amber-500" />,
              },
            ].map(({ step, title, desc, icon }) => (
              <div
                key={step}
                className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 rounded-3xl p-7 relative hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <span className="text-3xl font-outfit font-black text-slate-200 dark:text-slate-800 absolute top-5 right-6 group-hover:text-indigo-500/20 transition-colors">
                  {step}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-2xs">
                  {icon}
                </div>
                <h3 className="text-base font-outfit font-black text-slate-950 dark:text-white mb-2">{title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
