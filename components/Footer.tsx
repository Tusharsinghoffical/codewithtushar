import React from 'react';
import { Link } from 'react-router-dom';
import {
  Github, Linkedin, Instagram, Youtube, MapPin, Mail, Phone,
  ArrowUpRight, Zap, ShieldCheck, CheckCircle2, Star, Clock,
  ArrowUp, Sparkles, Building2, Award, ExternalLink
} from 'lucide-react';
import { FIVERR_PROFILE_URL } from '../constants';
import { FiverrIcon } from './FiverrBadge';

/* ─── Link Component with Micro-Animation ─────────────────── */
const FooterLink = ({ to, label, isNew }: { to: string; label: string; isNew?: boolean }) => (
  <li>
    <Link
      to={to}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="text-slate-400 hover:text-white transition-all duration-200 text-[12.5px] font-medium flex items-center justify-between group py-1"
    >
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-indigo-400 group-hover:scale-125 transition-all" />
        <span className="group-hover:translate-x-1 transition-transform">{label}</span>
      </span>
      {isNew && (
        <span className="px-1.5 py-0.2 rounded-full text-[8.5px] font-black uppercase tracking-wider bg-indigo-500/20 text-cyan-300 border border-indigo-400/30">
          New
        </span>
      )}
    </Link>
  </li>
);

/* ─── Social Button Component ─────────────────────────────── */
const SocialIconBtn = ({ href, icon, label, hoverColor }: { href: string; icon: React.ReactNode; label: string; hoverColor?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`w-9 h-9 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-slate-800 shadow-sm transition-all duration-200 active:scale-95 ${hoverColor || ''}`}
  >
    {icon}
  </a>
);

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800/80 relative overflow-hidden font-sans">
      
      {/* Subtle Ambient Background Gradient */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-t from-indigo-950/20 via-slate-900/10 to-transparent blur-[140px]" />
      </div>

      {/* ── 1. EXECUTIVE CTA BANNER ───────────────────────────── */}
      <div className="border-b border-slate-800/80 py-10 px-4 sm:px-6 lg:px-8 bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-[10.5px] font-bold text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for New Projects &amp; SaaS Consultations · Q3 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-black text-white tracking-tight">
              Ready to automate your workflows or build a custom SaaS?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Free 30-min strategy audit · Guaranteed response in &lt; 1 hour · 100% Escrow buyer protection available.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20discuss%20a%20new%20project%20for%20my%20business!"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-outfit font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
            >
              <Phone size={14} />
              <span>WhatsApp Instant Call</span>
              <ArrowUpRight size={13} />
            </a>

            <a
              href={FIVERR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-[#1DBF73] hover:bg-[#19a463] text-white rounded-xl font-outfit font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#1DBF73]/20 active:scale-95"
            >
              <FiverrIcon size={14} className="brightness-125" />
              <span>Hire on Fiverr</span>
              <ExternalLink size={12} />
            </a>

            <Link
              to="/contact"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-outfit font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              <span>Book Strategy Call</span>
              <ArrowUpRight size={13} />
            </Link>
          </div>

        </div>
      </div>

      {/* ── 2. MAIN CORPORATE NAVIGATION GRID ─────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

          {/* Col 1: Corporate Entity Info (5 cols on lg) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-3">
              <Link to="/" onClick={scrollToTop} className="inline-block">
                <span className="text-3xl font-outfit font-black tracking-tight text-white hover:text-indigo-400 transition-colors">
                  C.MS
                </span>
              </Link>
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <Building2 size={13} />
                <span>Code with Mr Singh · Tushar Singh freelancing</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Official technology practice of <strong>Tushar Singh</strong> (MCA, MIT Pune). Architecting autonomous AI agents, enterprise workflow automations, high-conversion web platforms, and scalable SaaS solutions for clients globally.
              </p>
            </div>

            {/* Social Channels */}
            <div className="space-y-2 pt-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Official Verified Channels
              </p>
              <div className="flex items-center gap-2">
                <SocialIconBtn href="https://linkedin.com/in/tusharsingh2011" icon={<Linkedin size={15} />} label="LinkedIn Profile" />
                <SocialIconBtn href="https://github.com/Tusharsinghoffical" icon={<Github size={15} />} label="GitHub Profile" />
                <SocialIconBtn href={FIVERR_PROFILE_URL} icon={<FiverrIcon size={15} />} label="Fiverr Pro Profile" />
                <SocialIconBtn href="https://www.youtube.com/@codewithmrsingh4u" icon={<Youtube size={15} />} label="YouTube Channel" />
                <SocialIconBtn href="https://www.instagram.com/tushar.cms/" icon={<Instagram size={15} />} label="Instagram" />
              </div>
            </div>

            {/* Verification Tag */}
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium">
                <Award size={13} className="text-emerald-400" />
                <span>Google Verified Business · 100% Delivery Track Record</span>
              </div>
            </div>
          </div>

          {/* Col 2: Core Solutions (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[10.5px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800 pb-2">
              Core Solutions
            </p>
            <ul className="space-y-1.5">
              <FooterLink to="/saas" label="Custom SaaS &amp; Cloud MVPs" isNew />
              <FooterLink to="/services" label="AI Automation &amp; Workflows" />
              <FooterLink to="/services" label="Smart 24/7 RAG Chatbots" />
              <FooterLink to="/services" label="Web Platforms &amp; Funnels" />
              <FooterLink to="/services" label="Lead Generation Systems" />
              <FooterLink to="/services" label="Branding &amp; Visual Identity" />
            </ul>
          </div>

          {/* Col 3: Company & Governance (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-[10.5px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800 pb-2">
              Navigation
            </p>
            <ul className="space-y-1.5">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/about" label="About Tushar" />
              <FooterLink to="/projects" label="Project Portfolio" />
              <FooterLink to="/saas" label="SaaS Suites" isNew />
              <FooterLink to="/blog" label="Engineering Blog" />
              <FooterLink to="/testimonials" label="Client Reviews (4.0★)" />
              <FooterLink to="/contact" label="Contact &amp; Audit" />
            </ul>
          </div>

          {/* Col 4: Corporate Headquarters & Direct Contact (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-[10.5px] font-black text-white uppercase tracking-[0.2em] border-b border-slate-800 pb-2">
              Corporate Desk
            </p>
            <div className="space-y-3.5 text-xs">
              
              <a
                href="https://wa.me/918851619647"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-slate-300 hover:text-emerald-400 transition-colors p-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone size={14} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Direct WhatsApp</span>
                  <span className="font-semibold text-white group-hover:text-emerald-400">+91 88516 19647</span>
                </div>
              </a>

              <a
                href="mailto:tusharsinghoffical@gmail.com"
                className="flex items-center gap-3 text-slate-300 hover:text-indigo-400 transition-colors p-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/40 group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail size={14} />
                </div>
                <div className="overflow-hidden">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Official Email</span>
                  <span className="font-semibold text-white group-hover:text-indigo-400 truncate block">tusharsinghoffical@gmail.com</span>
                </div>
              </a>

              <a
                href="https://www.google.com/maps/search/?api=1&query=Tushar+Singh+freelancing+New+Delhi+Delhi+110044"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-slate-300 hover:text-white transition-colors p-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 group"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                  <MapPin size={14} />
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Headquarters</span>
                  <span className="font-medium text-slate-300 group-hover:text-white leading-tight block">
                    Badarpur, New Delhi, Delhi 110044, India
                  </span>
                </div>
              </a>

              {/* Official Credential Badges */}
              <div className="pt-2 flex flex-col gap-1.5 text-[10px] font-semibold">
                <a
                  href="https://share.google/ZDu1p0y00ioP6PWiA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>Google Business Profile &amp; Reviews</span>
                  <ExternalLink size={10} />
                </a>
                <a
                  href="https://drive.google.com/file/d/17pvGeSh_tA8-_NYFo2UOtRcYA5J2hMOh/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Google Verified Owner Certificate</span>
                  <ExternalLink size={10} />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── 3. LEGAL & COMPLIANCE BOTTOM STRIP ─────────────────── */}
      <div className="border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>&copy; {year} <strong>Code with Mr Singh</strong> (Tushar Singh). All rights reserved.</span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck size={13} className="text-emerald-400" /> 100% Escrow Protected
            </span>
            <span className="hidden sm:inline text-slate-700">•</span>
            <span>Serving Clients Across India, USA, UK, UAE &amp; Worldwide</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-[11px] font-semibold cursor-pointer active:scale-95"
            >
              <span>Back to Top</span>
              <ArrowUp size={12} />
            </button>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
