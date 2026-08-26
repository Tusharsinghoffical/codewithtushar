import React from 'react';
import { ShieldCheck, ExternalLink, MapPin, CheckCircle, Award } from 'lucide-react';
import {
  GOOGLE_BUSINESS_NAME,
  GOOGLE_BUSINESS_URL,
  GOOGLE_VERIFICATION_PROOF_URL,
  GOOGLE_MAPS_DIRECTIONS_URL,
  BUSINESS_ADDRESS
} from '../constants';

interface GoogleVerifiedBadgeProps {
  variant?: 'pill' | 'card' | 'banner';
  className?: string;
}

export const GoogleGIcon: React.FC<{ size?: number; className?: string }> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={`shrink-0 ${className}`}>
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

/**
 * GoogleVerifiedBadge
 * ───────────────────
 * High-trust visual badge confirming Google Business Profile ownership
 * and linking to Google Maps profile & verified certificate proof.
 */
const GoogleVerifiedBadge: React.FC<GoogleVerifiedBadgeProps> = ({
  variant = 'pill',
  className = '',
}) => {
  if (variant === 'pill') {
    return (
      <div className={`inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all ${className}`}>
        <GoogleGIcon size={15} />
        <a
          href={GOOGLE_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-bold text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1"
        >
          <span>Google Verified: <strong className="font-extrabold">{GOOGLE_BUSINESS_NAME}</strong></span>
        </a>
        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700 hidden sm:inline-block" />
        <a
          href={GOOGLE_VERIFICATION_PROOF_URL}
          target="_blank"
          rel="noopener noreferrer"
          title="View Official Google Verification Proof"
          className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md hover:bg-emerald-100 transition-colors"
        >
          <ShieldCheck size={11} className="text-emerald-500" />
          <span>Verified Owner</span>
          <ExternalLink size={9} />
        </a>
      </div>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`p-4 sm:p-5 bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-emerald-50/60 dark:from-slate-900 dark:via-slate-900/90 dark:to-slate-900 border border-blue-100 dark:border-white/10 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm ${className}`}>
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-xs">
            <GoogleGIcon size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-outfit font-extrabold text-slate-900 dark:text-white">
                {GOOGLE_BUSINESS_NAME}
              </h4>
              <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded-md">
                <CheckCircle size={10} className="text-emerald-500" /> Google Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
              <MapPin size={11} className="text-rose-500 shrink-0" />
              <span>{BUSINESS_ADDRESS.formatted}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <a
            href={GOOGLE_VERIFICATION_PROOF_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-700 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition-all active:scale-95 shadow-2xs"
          >
            <Award size={12} className="text-indigo-500" /> Proof
          </a>
          <a
            href={GOOGLE_BUSINESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
          >
            <span>View on Google</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    );
  }

  // Card Variant
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-3xl p-6 sm:p-7 shadow-xl space-y-4 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 shadow-sm">
            <GoogleGIcon size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                Official Google Business
              </span>
              <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                <ShieldCheck size={10} className="text-emerald-500" /> Verified
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-outfit font-extrabold text-slate-950 dark:text-white mt-0.5">
              {GOOGLE_BUSINESS_NAME}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-2 border border-slate-100 dark:border-white/5 text-xs">
        <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
          <MapPin size={13} className="text-rose-500 shrink-0 mt-0.5" />
          <span>{BUSINESS_ADDRESS.formatted}</span>
        </div>
        <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500 dark:text-slate-400 border-t border-slate-200/50 dark:border-white/5">
          <span>Operating Hours: <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{BUSINESS_ADDRESS.hours}</strong></span>
          <span>Category: <strong className="text-slate-700 dark:text-slate-200 font-bold">Software Company</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
        <a
          href={GOOGLE_BUSINESS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-slate-200 transition-all active:scale-95"
        >
          <span>Google Profile</span>
          <ExternalLink size={12} />
        </a>
        <a
          href={GOOGLE_VERIFICATION_PROOF_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
        >
          <Award size={13} className="text-indigo-500" />
          <span>Verify Proof</span>
          <ExternalLink size={11} />
        </a>
      </div>
    </div>
  );
};

export default GoogleVerifiedBadge;
