import React from 'react';
import { ArrowUpRight, Star, ShieldCheck } from 'lucide-react';
import { FIVERR_PROFILE_URL } from '../constants';

/* ─── Official Fiverr SVG Icon ───────────────────────────── */
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
    <div className="group fixed bottom-6 left-6 sm:left-8 z-[120]">
      <a
        href={FIVERR_PROFILE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-0 hover:gap-3 bg-[#1DBF73] hover:bg-[#19a463] text-white rounded-full p-3.5 sm:p-4 shadow-[0_15px_40px_rgba(29,191,115,0.35)] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) active:scale-95 border border-emerald-400/30"
        aria-label="Hire Tushar Singh on Fiverr with Buyer Protection"
        title="Hire on Fiverr — 100% Escrow & Buyer Protection"
      >
        {/* Animated Background Ring */}
        <div className="absolute inset-0 bg-[#1DBF73] rounded-full animate-ping opacity-20 scale-110 pointer-events-none" />

        {/* Fiverr Vector Icon */}
        <div className="relative flex items-center justify-center">
          <FiverrIconSvg className="group-hover:rotate-12 transition-transform duration-300 drop-shadow-sm" />
        </div>

        {/* Expandable Text Label (Desktop & Tablet) */}
        <div className="overflow-hidden max-w-0 group-hover:max-w-[220px] transition-all duration-500 ease-in-out whitespace-nowrap">
          <div className="flex items-center gap-1.5 pr-2">
            <span className="text-[11px] font-black uppercase tracking-wider font-outfit text-white">
              Hire on Fiverr
            </span>
            <ArrowUpRight size={14} className="text-white shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Rating / Trust Mini Badge (top-right of button) */}
        <div className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 bg-slate-950 text-amber-400 text-[8px] font-black px-1.5 py-0.5 rounded-full border border-emerald-500/40 shadow-sm">
          <Star size={9} className="fill-amber-400 text-amber-400" />
          <span className="text-white">5.0</span>
        </div>
      </a>

      {/* Hover Info Tooltip */}
      <div className="absolute bottom-full left-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-1 group-hover:translate-y-0 hidden sm:block">
        <div className="bg-slate-900/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30 shadow-2xl whitespace-nowrap flex items-center gap-1.5">
          <ShieldCheck size={13} className="text-emerald-400" />
          <span>Fiverr Verified Seller • 100% Buyer Protection</span>
        </div>
      </div>
    </div>
  );
};

export default FiverrFloatingButton;
