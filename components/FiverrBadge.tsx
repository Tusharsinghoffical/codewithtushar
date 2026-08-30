import React from 'react';
import { ExternalLink, Star, ShieldCheck, ArrowUpRight, Zap } from 'lucide-react';
import { FIVERR_PROFILE_URL } from '../constants';

/* ─── Official Fiverr Vector Icon ────────────────────────── */
export const FiverrIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 ${className}`}
    aria-label="Fiverr"
  >
    {/* Clean, authentic Fiverr 'fi' glyph */}
    <circle cx="12" cy="12" r="11" fill="#1DBF73" />
    <path
      d="M17.4 9.1h-1.6c-.9 0-1.2.4-1.2 1.2v1.2h2.7l-.3 2.5h-2.4v6h-2.8v-6H10v-2.5h1.8v-1.5c0-2 1.2-3.3 3.4-3.3h2.2v2.4z"
      fill="#FFFFFF"
    />
    <circle cx="7.7" cy="13.9" r="1.3" fill="#FFFFFF" />
  </svg>
);

/* ─── Compact Fiverr Badge / Button Component ────────────── */
interface FiverrBadgeProps {
  variant?: 'pill' | 'button' | 'card' | 'link';
  className?: string;
  showRating?: boolean;
}

export const FiverrBadge: React.FC<FiverrBadgeProps> = ({
  variant = 'pill',
  className = '',
  showRating = true
}) => {
  if (variant === 'pill') {
    return (
      <a
        href={FIVERR_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        title="View Tushar Singh's Fiverr Profile — Hire with Buyer Protection"
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all duration-200 text-[10px] font-black uppercase tracking-wider shadow-2xs group ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-[#1DBF73] animate-pulse" />
        <span className="font-extrabold text-[#1DBF73] tracking-tight">fiverr</span>
        <span className="text-slate-400 dark:text-slate-600">•</span>
        <span className="font-bold">Hire on Fiverr</span>
        <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#1DBF73]" />
      </a>
    );
  }

  if (variant === 'button') {
    return (
      <a
        href={FIVERR_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#1DBF73] hover:bg-[#19a463] text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 ${className}`}
      >
        <FiverrIcon size={18} className="brightness-125" />
        <span>Order on Fiverr</span>
        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    );
  }

  if (variant === 'card') {
    return (
      <div className={`p-4 rounded-2xl bg-slate-900 border border-emerald-500/20 text-white space-y-3 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiverrIcon size={20} />
            <div>
              <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Verified Seller</p>
              <h4 className="text-xs font-outfit font-black text-white">Tushar Singh on Fiverr</h4>
            </div>
          </div>
          {showRating && (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-[9px] font-black text-emerald-300">
              <Star size={10} className="fill-amber-400 text-amber-400" />
              <span>5.0</span>
            </div>
          )}
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
          Hire with 100% Escrow &amp; Buyer Protection. Custom AI automation, chatbot and web gigs.
        </p>
        <a
          href={FIVERR_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#1DBF73] hover:bg-[#19a463] text-white text-[10px] font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
        >
          <span>View Fiverr Profile &amp; Gigs</span>
          <ArrowUpRight size={12} />
        </a>
      </div>
    );
  }

  return (
    <a
      href={FIVERR_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 font-bold transition-colors ${className}`}
    >
      <FiverrIcon size={14} />
      <span>Fiverr Profile</span>
      <ExternalLink size={11} />
    </a>
  );
};

export default FiverrBadge;
