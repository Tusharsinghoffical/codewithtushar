import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, Terminal } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-pink-500/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Code Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-black uppercase tracking-widest font-outfit">
          <Terminal size={14} />
          <span>Error 404 · Route Unresolved</span>
        </div>

        {/* Headline */}
        <div className="space-y-3">
          <h1 className="text-6xl sm:text-7xl font-outfit font-black tracking-tight text-slate-950 dark:text-white">
            4<span className="text-indigo-600 dark:text-indigo-400">0</span>4
          </h1>
          <h2 className="text-xl sm:text-2xl font-outfit font-bold text-slate-900 dark:text-slate-100">
            Page Not Found
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            The page you are looking for doesn't exist, has been removed, or has been moved to a new URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Home size={15} />
            <span>Return Home</span>
          </Link>
          <Link
            to="/projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
          >
            <Search size={15} />
            <span>Explore Work</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
