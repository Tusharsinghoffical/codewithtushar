import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      title="Back to Top"
      className={`
        fixed z-[120] flex items-center justify-center
        w-12 h-12 sm:w-13 sm:h-13 rounded-full transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
        backdrop-blur-xl border shadow-[0_10px_30px_rgba(0,0,0,0.25)] group active:scale-90
        ${isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-10 scale-50 pointer-events-none'}
        /* Stacked Position above Saathi Bot, WhatsApp, and Fiverr */
        bottom-[13.25rem] sm:bottom-[13.5rem] right-6 sm:right-8
        /* Modern Glassmorphic Colors */
        bg-slate-900/85 dark:bg-slate-900/90
        border-indigo-500/30 dark:border-indigo-400/30
        text-white hover:border-indigo-400 hover:shadow-[0_15px_35px_rgba(99,102,241,0.35)]
      `}
    >
      {/* Scroll Progress Ring */}
      <svg className="absolute -rotate-90 w-full h-full p-1" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-slate-700/60 dark:text-slate-800"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-200"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative z-10">
        <ArrowUp
          size={18}
          className="text-indigo-300 group-hover:text-white transition-all duration-300 group-hover:-translate-y-1 drop-shadow-sm"
        />
      </div>
    </button>
  );
};

export default ScrollToTop;
