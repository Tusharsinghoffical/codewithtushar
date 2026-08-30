import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Phone, Mail, MapPin, ArrowRight,
  ExternalLink, Github, Linkedin, Instagram, Youtube
} from 'lucide-react';
import {
  GOOGLE_BUSINESS_URL,
  BUSINESS_ADDRESS,
  FIVERR_PROFILE_URL
} from '../constants';
import { GoogleGIcon } from './GoogleVerifiedBadge';
import { FiverrIcon } from './FiverrBadge';

const TopPromoBar: React.FC = () => {
  return (
    <div
      id="top-promo-bar"
      className="fixed top-0 left-0 right-0 z-[130] w-full bg-slate-950/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-indigo-500/25 text-white shadow-md select-none transition-all duration-300"
      role="banner"
      aria-label="Special announcement and contact bar"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-8 sm:h-9 flex items-center justify-between gap-2 text-[10.5px] sm:text-xs">

        {/* ── LEFT: Contact info (Hidden on small mobile, visible on sm+) ── */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0 text-slate-300">
          {/* Phone / WhatsApp */}
          <a
            href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20discuss%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors font-semibold"
            title="Chat on WhatsApp"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <Phone size={11} className="text-emerald-400" />
            <span>+91 88516 19647</span>
          </a>

          {/* Email */}
          <a
            href="mailto:tusharsinghoffical@gmail.com"
            className="hidden lg:flex items-center gap-1.5 hover:text-indigo-300 transition-colors font-medium text-slate-400"
            title="Send Email"
          >
            <Mail size={11} className="text-indigo-400" />
            <span className="truncate max-w-[150px]">tusharsinghoffical@gmail.com</span>
          </a>

          {/* Location */}
          <span className="hidden xl:flex items-center gap-1 text-slate-400">
            <MapPin size={11} className="text-rose-400" />
            <span>{BUSINESS_ADDRESS.short}</span>
          </span>
        </div>

        {/* ── CENTER: Promotional Offer / Call-To-Offer ── */}
        <div className="flex-1 flex items-center justify-center sm:justify-center overflow-hidden">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-200">
            <Sparkles size={11} className="text-amber-400 animate-spin-slow shrink-0" />
            <span className="font-extrabold text-[10px] sm:text-[11px] text-white tracking-wide truncate">
              ⚡ Special: <span className="text-indigo-300 font-semibold">Free 30-Min AI Automation &amp; Strategy Audit</span>
            </span>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-black uppercase tracking-wider text-amber-300 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 px-2 py-0.5 rounded-full transition-all shrink-0 ml-1"
            >
              <span>Claim Audit</span>
              <ArrowRight size={10} />
            </Link>
          </div>
        </div>

        {/* ── RIGHT: Social Media & Google Business Icons ── */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile direct call / WA button */}
          <a
            href="https://wa.me/918851619647?text=Hi%20Tushar,%20I%20want%20to%20discuss%20a%20project"
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center gap-1 text-[9.5px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full"
          >
            <Phone size={10} />
            <span>WA</span>
          </a>

          {/* Google Business Profile */}
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="Google Business Profile"
            aria-label="Google Business Profile"
          >
            <GoogleGIcon size={12} />
          </a>

          {/* Fiverr Profile */}
          <a
            href={FIVERR_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-slate-300 hover:text-[#1DBF73] hover:bg-white/10 transition-colors inline-flex items-center"
            title="Hire on Fiverr (Buyer Protection)"
            aria-label="Fiverr Profile"
          >
            <FiverrIcon size={13} />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/Tusharsinghoffical"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            title="GitHub"
            aria-label="GitHub Profile"
          >
            <Github size={12} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/tusharsingh2011"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-slate-300 hover:text-sky-400 hover:bg-white/10 transition-colors"
            title="LinkedIn"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={12} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/tushar.cms/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded-md text-slate-300 hover:text-pink-400 hover:bg-white/10 transition-colors"
            title="Instagram"
            aria-label="Instagram Profile"
          >
            <Instagram size={12} />
          </a>

          {/* YouTube */}
          <a
            href="https://www.youtube.com/@codewithmrsingh4u"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex p-1 rounded-md text-slate-300 hover:text-red-400 hover:bg-white/10 transition-colors"
            title="YouTube"
            aria-label="YouTube Channel"
          >
            <Youtube size={12} />
          </a>
        </div>

      </div>
    </div>
  );
};

export default TopPromoBar;
