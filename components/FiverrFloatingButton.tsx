import React from 'react';
import { ArrowUpRight, Star, ShieldCheck } from 'lucide-react';
import { FIVERR_PROFILE_URL } from '../constants';

/* ─── Official Fiverr Vector SVG Icon ────────────────────── */
const FiverrIconSvg: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={`w-6 h-6 shrink-0 ${className}`}
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

const FiverrFloatingButton: React.FC = () => {
  return (
    <div className="group fixed bottom-[5.25rem] sm:bottom-[5.5rem] right-6 sm:right-8 z-[120]">
      <a
        href={FIVERR_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-0 hover:gap-3 bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950 hover:from-emerald-950 hover:to-slate-900 text-white rounded-full p-3.5 sm:p-4 shadow-[0_12px_35px_rgba(29,191,115,0.3)] hover:shadow-[0_16px_45px_rgba(29,191,115,0.5)] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) active:scale-95 border-2 border-emerald-500/40 hover:border-emerald-400 backdrop-blur-xl"
        aria-label="Hire Tushar Singh on Fiverr with Buyer Protection"
        title="Hire on Fiverr — 100% Escrow & Buyer Protection"
      >
        {/* Ambient Subtle Pulse Ring */}
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-30 scale-110 pointer-events-none" />

        {/* Expandable Label */}
        <div className="overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500 ease-in-out whitespace-nowrap">
          <div className="flex items-center gap-1.5 pl-2">
            <span className="text-[11px] font-black uppercase tracking-wider font-outfit text-emerald-300 drop-shadow-sm">
              Hire on Fiverr
            </span>
            <ArrowUpRight size={14} className="text-emerald-400 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Fiverr Vector Icon */}
        <div className="relative flex items-center justify-center">
          <FiverrIconSvg className="group-hover:rotate-12 transition-transform duration-300 drop-shadow-md" />
        </div>

        {/* Gold 5.0 Rating Micro Badge */}
        <div className="absolute -top-1.5 -right-1 flex items-center gap-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[8px] font-black px-1.5 py-0.5 rounded-full border border-yellow-200/80 shadow-md">
          <Star size={8} className="fill-slate-950 text-slate-950" />
          <span>5.0</span>
        </div>
      </a>

      {/* Hover Info Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-1 group-hover:translate-y-0 hidden sm:block">
        <div className="bg-slate-900/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30 shadow-2xl whitespace-nowrap flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Fiverr Verified Seller • 100% Escrow Protection</span>
        </div>
      </div>
    </div>
  );
};

export default FiverrFloatingButton;
