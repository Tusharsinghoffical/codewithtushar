import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Bot,
  Sparkles,
  Zap,
  Star,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  X
} from 'lucide-react';
import { FIVERR_PROFILE_URL } from '../constants';

/* ─── Official Fiverr Vector SVG Icon ────────────────────── */
const FiverrIconSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-5 h-5 shrink-0 ${className}`}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="11" fill="#1DBF73" />
    <path
      d="M17.4 9.1h-1.6c-.9 0-1.2.4-1.2 1.2v1.2h2.7l-.3 2.5h-2.4v6h-2.8v-6H10v-2.5h1.8v-1.5c0-2 1.2-3.3 3.4-3.3h2.2v2.4z"
      fill="#FFFFFF"
    />
    <circle cx="7.7" cy="13.9" r="1.3" fill="#FFFFFF" />
  </svg>
);

export const FloatingSideDock: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const TUSHAR_PHONE = '918851619647';
  const whatsappUrl = `https://wa.me/${TUSHAR_PHONE}?text=${encodeURIComponent(
    "Hi Tushar, I'd like to discuss a project with you!"
  )}`;

  // Handle open AI chat modal
  const handleOpenAIChat = () => {
    window.dispatchEvent(new CustomEvent('open-ai-chat'));
    setIsExpanded(false);
  };

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    // Only auto-expand on hover for pointer/mouse devices (desktop)
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 280);
  };

  return (
    <>
      {/* ─── Mobile Backdrop Overlay when Expanded ────────── */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-[125] md:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <aside
        ref={dockRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-[130] transition-all duration-300 ease-out flex items-center ${
          isExpanded
            ? 'translate-x-0'
            : 'translate-x-[calc(100%-2.5rem)] sm:translate-x-[calc(100%-2.75rem)] md:translate-x-[calc(100%-3rem)]'
        }`}
        aria-label="Quick Contact and AI Assistant Actions"
      >
        {/* ─── 1. Collapsed Arrow Tab / Handle ────────────────── */}
        <button
          type="button"
          onClick={() => setIsExpanded(prev => !prev)}
          className="w-10 sm:w-11 md:w-12 py-3.5 sm:py-4 md:py-5 rounded-l-2xl bg-slate-950/95 hover:bg-slate-900 border-l-2 border-y-2 border-r-0 border-indigo-500/50 shadow-[0_10px_35px_rgba(99,102,241,0.4)] backdrop-blur-xl text-white flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer group focus:outline-hidden transition-all shrink-0"
          aria-expanded={isExpanded}
          title={isExpanded ? 'Collapse quick actions' : 'Hover or tap to open Quick Actions (WhatsApp, AI Chat, Fiverr)'}
        >
          {/* Animated Chevron Arrow pointing towards screen */}
          <div className="relative">
            <ChevronLeft
              size={16}
              className={`text-cyan-400 group-hover:scale-125 transition-transform duration-300 sm:w-[18px] sm:h-[18px] ${
                isExpanded ? 'rotate-180 text-white' : 'animate-pulse'
              }`}
            />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          {/* Micro Visual Indicators for the 3 Services */}
          <div className="flex flex-col items-center gap-1 sm:gap-1.5 py-0.5 sm:py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" title="AI Chatbot" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" title="WhatsApp Direct" />
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" title="Fiverr Verified" />
          </div>

          {/* Vertical Label */}
          <span
            className="text-[8px] sm:text-[9px] font-black uppercase tracking-wider font-outfit text-slate-300 group-hover:text-cyan-300 [writing-mode:vertical-rl] rotate-180 select-none"
          >
            Quick Actions
          </span>
        </button>

        {/* ─── 2. Expanded Floating Pop-up Card Deck ───────────── */}
        <div className="w-[min(calc(100vw-3.2rem),18rem)] sm:w-[19rem] max-h-[85vh] overflow-y-auto p-3 sm:p-4 rounded-l-2xl bg-slate-950/95 border-l border-y border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl text-white space-y-2.5">
          
          {/* Header with Quick Title & Close Toggle */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2 px-1">
            <div className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-cyan-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider font-outfit text-white">
                Connect with Tushar
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close actions dock"
            >
              <ChevronRight size={14} />
            </button>
          </div>

        {/* Action 1: Tushar Original AI Assistant */}
        <button
          type="button"
          onClick={handleOpenAIChat}
          className="w-full group/btn relative flex items-center gap-3 p-2.5 rounded-xl bg-gradient-to-r from-violet-950/80 via-indigo-950/70 to-slate-900 border border-indigo-500/40 hover:border-indigo-400 text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-slate-950 p-1 flex items-center justify-center shrink-0 shadow-md border border-cyan-400/40 group-hover/btn:rotate-6 transition-transform overflow-hidden">
            <img src="/tushar-ai-icon.png" alt="Tushar AI Assistant" className="w-full h-full object-contain" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-outfit">Ask AI Assistant</span>
              <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                24/7 AI
              </span>
            </div>
            <p className="text-[10px] text-slate-300 line-clamp-1">
              Services, projects &amp; WhatsApp booking
            </p>
          </div>
        </button>

        {/* Action 2: WhatsApp Direct */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsExpanded(false)}
          className="w-full group/btn relative flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-emerald-950/80 via-teal-950/70 to-slate-900 border border-emerald-500/40 hover:border-emerald-400 text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shrink-0 shadow-md group-hover/btn:rotate-6 transition-transform">
            <MessageCircle size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-outfit">WhatsApp Direct</span>
              <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-0.5">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
                Active
              </span>
            </div>
            <p className="text-[10px] text-slate-300 line-clamp-1 flex items-center gap-1">
              <Clock size={10} className="text-emerald-400 shrink-0" />
              <span>Replies in &lt; 1 hour</span>
            </p>
          </div>
        </a>

        {/* Action 3: Fiverr Verified Hire */}
        <a
          href={FIVERR_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsExpanded(false)}
          className="w-full group/btn relative flex items-center gap-3 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-emerald-950/50 border border-slate-700 hover:border-emerald-400 text-left transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-emerald-500/30 flex items-center justify-center text-white shrink-0 shadow-md group-hover/btn:rotate-6 transition-transform">
            <FiverrIconSvg />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-outfit">Hire on Fiverr</span>
              <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-0.5">
                <Star size={8} className="fill-amber-400 text-amber-400" />
                5.0
              </span>
            </div>
            <p className="text-[10px] text-slate-300 line-clamp-1 flex items-center gap-1">
              <ShieldCheck size={10} className="text-emerald-400 shrink-0" />
              <span>100% Escrow Protection</span>
            </p>
          </div>
          <ArrowUpRight size={13} className="text-slate-400 group-hover/btn:text-emerald-400 shrink-0" />
        </a>

        {/* Footer Subtext */}
        <div className="pt-1 text-center">
          <p className="text-[9px] text-slate-400 font-medium">
            Available 24/7 · Direct Founder Access
          </p>
        </div>
      </div>
    </aside>
    </>
  );
};

export default FloatingSideDock;
