import React, { useState, useEffect } from 'react';
import { Users, Eye, Sparkles, MapPin, X, Flame } from 'lucide-react';

const RECENT_ACTIVITIES = [
  { location: 'New Delhi, India', action: 'viewed AI Automation Workflows', time: 'Just now' },
  { location: 'Mumbai, India', action: 'explored Custom Chatbot Development', time: '1m ago' },
  { location: 'Bengaluru, India', action: 'viewed Hospital Management System', time: '2m ago' },
  { location: 'London, UK', action: 'checking Full-Stack Portfolio', time: '3m ago' },
  { location: 'Dubai, UAE', action: 'viewed WhatsApp Lead Funnel', time: '4m ago' },
  { location: 'New York, USA', action: 'looking at Pricing & Escrow Gigs', time: '5m ago' },
  { location: 'Hyderabad, India', action: 'opened AI Support Agent Case Study', time: '6m ago' },
  { location: 'Toronto, Canada', action: 'downloaded FAANG Roadmap PDF', time: '7m ago' },
  { location: 'Sydney, Australia', action: 'viewed Google Verified Business Profile', time: '8m ago' },
];

export const LiveVisitorCounter: React.FC = () => {
  // Visitor count starts in 10-15 range and gently oscillates
  const [visitorCount, setVisitorCount] = useState(13);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Fluctuates visitor count between 10 and 15 every 8-15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorCount(prev => {
        // Delta of -1, 0, or +1
        const delta = Math.floor(Math.random() * 3) - 1;
        let next = prev + delta;
        if (next < 10) next = 11;
        if (next > 15) next = 14;
        return next;
      });
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  // Show gentle activity toast every 22 seconds
  useEffect(() => {
    const toastTimer = setInterval(() => {
      setCurrentActivityIndex(prev => (prev + 1) % RECENT_ACTIVITIES.length);
      setShowToast(true);
      const hideTimeout = setTimeout(() => {
        setShowToast(false);
      }, 5500);
      return () => clearTimeout(hideTimeout);
    }, 24000);

    // Initial toast after 4 seconds
    const initialTimeout = setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 5500);
    }, 4000);

    return () => {
      clearInterval(toastTimer);
      clearTimeout(initialTimeout);
    };
  }, []);

  if (dismissed) return null;

  const currentActivity = RECENT_ACTIVITIES[currentActivityIndex];

  return (
    <div className="fixed bottom-[5.25rem] sm:bottom-24 left-6 sm:left-8 z-[110] flex flex-col items-start gap-2 select-none pointer-events-auto">
      
      {/* ── 1. Floating Real-Time Activity Toast Popup ── */}
      {showToast && (
        <div className="animate-in slide-in-from-bottom-3 fade-in duration-300 max-w-[290px] sm:max-w-xs bg-slate-950/90 dark:bg-slate-900/95 backdrop-blur-xl border border-white/15 text-white p-3 rounded-2xl shadow-2xl flex items-start gap-2.5 text-left">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-md">
            <Flame size={14} className="animate-pulse text-amber-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <p className="text-[10px] font-black text-indigo-300 uppercase tracking-wider truncate flex items-center gap-1">
                <MapPin size={10} className="text-rose-400 shrink-0" />
                <span>{currentActivity.location}</span>
              </p>
              <span className="text-[8.5px] text-slate-400">{currentActivity.time}</span>
            </div>
            <p className="text-[11px] font-semibold text-slate-200 leading-tight mt-0.5 line-clamp-2">
              {currentActivity.action}
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-slate-400 hover:text-white p-0.5 -mr-1 -mt-1 cursor-pointer"
            aria-label="Close notification"
          >
            <X size={12} />
          </button>
        </div>
      )}

      {/* ── 2. Compact Live Visitor Pill Badge ── */}
      <div className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-slate-200/90 dark:border-white/15 text-slate-800 dark:text-slate-100 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105">
        {/* Pulsing Green Indicator */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>

        {/* Counter Text */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="font-outfit font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
            {visitorCount}
          </span>
          <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-300">
            Live Visitors
          </span>
        </div>

        {/* Dismiss subtle button on hover */}
        <button
          onClick={() => setDismissed(true)}
          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-opacity ml-0.5 cursor-pointer"
          title="Dismiss visitor counter"
        >
          <X size={11} />
        </button>
      </div>

    </div>
  );
};

export default LiveVisitorCounter;
