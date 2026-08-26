import React from 'react';
import { Share2, Check, AlertCircle } from 'lucide-react';
import { useSharePage } from '../hooks/useSharePage';
import type { ShareOverrides } from '../hooks/useSharePage';

interface SharePageButtonProps extends ShareOverrides {
  /** Visual variant — default "outline" or "ghost" for minimal inline use */
  variant?: 'outline' | 'ghost' | 'solid';
  /** Custom idle label (e.g., "Share Project", "Share Portfolio") */
  buttonLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * SharePageButton
 * ──────────────
 * A universal share button that works on every page.
 * Uses the native OS share sheet (Web Share API) on supported devices;
 * falls back to copying the URL to the clipboard everywhere else.
 */
const SharePageButton: React.FC<SharePageButtonProps> = ({
  title,
  text,
  url,
  variant = 'outline',
  buttonLabel,
  className = '',
  children,
}) => {
  const { sharePage, status } = useSharePage({ title, text, url });

  const icon = status === 'copied'
    ? <Check size={13} className="text-emerald-500" />
    : status === 'shared'
    ? <Check size={13} className="text-emerald-500" />
    : status === 'error'
    ? <AlertCircle size={13} className="text-rose-500" />
    : <Share2 size={13} />;

  const label = status === 'copied'
    ? 'Link Copied!'
    : status === 'shared'
    ? 'Shared!'
    : status === 'error'
    ? 'Copy failed'
    : (buttonLabel || children || 'Share');

  let baseClass = '';
  if (variant === 'ghost') {
    baseClass = `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer ${
      status === 'copied' || status === 'shared'
        ? 'text-emerald-600 dark:text-emerald-400'
        : status === 'error'
        ? 'text-rose-500'
        : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400'
    }`;
  } else if (variant === 'solid') {
    baseClass = `inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer shadow-sm ${
      status === 'copied' || status === 'shared'
        ? 'bg-emerald-600 text-white shadow-emerald-500/20'
        : status === 'error'
        ? 'bg-rose-600 text-white shadow-rose-500/20'
        : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-500/20'
    }`;
  } else {
    // outline
    baseClass = `inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 cursor-pointer ${
      status === 'copied' || status === 'shared'
        ? 'border-emerald-300 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
        : status === 'error'
        ? 'border-rose-300 bg-rose-50 dark:bg-rose-950/30 text-rose-600'
        : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20'
    }`;
  }

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        sharePage();
      }}
      aria-label={typeof label === 'string' ? label : 'Share'}
      className={`${baseClass} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default SharePageButton;
