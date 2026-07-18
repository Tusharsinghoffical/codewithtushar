
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Visibility toggle
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Progress calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
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

  // SVG Circle Logic
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`
        fixed z-[120] flex items-center justify-center
        w-14 h-14 rounded-full transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)
        backdrop-blur-xl border shadow-2xl group active:scale-90
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-12 scale-50 pointer-events-none'}
        /* Positioned above WhatsApp */
        bottom-24 right-6 sm:right-8
        /* Theme Colors */
        bg-white/90 dark:bg-slate-900/90 
        border-slate-200 dark:border-white/10
        text-slate-950 dark:text-white
        hover:border-indigo-500 dark:hover:border-indigo-400
      `}
    >
      {/* Scroll Progress Ring */}
      <svg className="absolute -rotate-90 w-full h-full" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-100 dark:text-slate-800"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-indigo-600 dark:text-indigo-400 transition-all duration-200"
        />
      </svg>

      <div className="relative z-10">
        <ArrowUp 
          size={20} 
          className="transition-transform duration-500 group-hover:-translate-y-1" 
        />
      </div>
    </button>
  );
};

export default ScrollToTop;
