
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MoreVertical, X, ArrowRight, Sun, Moon, Cpu, Search, ArrowUpRight } from 'lucide-react';
import SearchBar from './SearchBar';
import { FIVERR_PROFILE_URL } from '../constants';
import { FiverrIcon } from './FiverrBadge';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    // Strict Default: White (Light) mode unless user has explicitly saved 'dark' previously.
    // We ignore system preferences to ensure it starts white as requested.
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme === 'dark';

    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    const newThemeState = !isDark;
    setIsDark(newThemeState);

    if (newThemeState) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogoClick = () => {
    setIsBouncing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsBouncing(false), 600);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Projects', path: '/projects' },
    { label: 'SaaS Products', path: '/projects?category=Web+Dev' },
    { label: 'Blog', path: '/blog' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav className={`fixed left-1/2 -translate-x-1/2 z-[110] transition-all duration-500 ease-in-out ${isScrolled ? 'top-10 sm:top-11 w-[98%] sm:w-fit' : 'top-11 sm:top-14 w-[95%] sm:w-fit'}`}>
        <div
          className="relative flex items-center justify-between sm:justify-start gap-1 p-1.5 rounded-full transition-all duration-300 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-900/5 dark:shadow-black/20"
        >

          {/* Logo Section */}
          <div className="flex items-center pl-4 pr-3 shrink-0 z-10">
            <Link
              to="/"
              onClick={handleLogoClick}
              className={`flex items-center gap-3 group transition-transform duration-500 ${isBouncing ? 'animate-bounce-subtle' : ''}`}
            >
              <span className={`font-outfit font-extrabold text-slate-950 dark:text-white transition-all duration-300 ${isScrolled ? 'text-base' : 'text-xl'}`}>
                C.MS
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 px-2">
            {navItems.map((item) => {
              const currentFull = location.pathname + location.search;
              const isActive = item.path.includes('?')
                ? currentFull === item.path
                : location.pathname === item.path && !location.search;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-full text-[12.5px] font-semibold tracking-tight transition-all duration-300 flex items-center gap-1.5 ${isActive
                      ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-lg'
                      : 'text-slate-950 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-white/5'
                    }`}
                >
                  <span>{item.label}</span>
                  {item.label === 'SaaS Products' && (
                    <span className="px-1.5 py-0.2 rounded-full text-[8.5px] font-black uppercase bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300">
                      SaaS
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Utility Actions */}
          <div className="flex items-center gap-1.5 pr-1">
            {/* Search Bar */}
            <div className="hidden sm:block">
              <SearchBar />
            </div>

            {/* Direct Hire on Fiverr Desktop Button */}
            <a
              href={FIVERR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              title="Hire on Fiverr with 100% Escrow & Buyer Protection"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300/80 dark:border-emerald-500/40 text-slate-900 dark:text-emerald-300 hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all duration-200 text-xs font-bold active:scale-95 shadow-2xs group"
            >
              <FiverrIcon size={14} />
              <span className="text-[11px] font-extrabold tracking-tight">Fiverr</span>
              <ArrowUpRight size={11} className="text-[#1DBF73] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all group ${isScrolled
                  ? 'bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white border border-slate-200 dark:border-white/10'
                  : 'bg-white/10 dark:bg-slate-800/20 text-slate-950 dark:text-white backdrop-blur-sm'
                } hover:border-indigo-500`}
            >
              {isDark ? (
                <Sun size={18} className="group-hover:rotate-90 transition-transform duration-500" />
              ) : (
                <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-500" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
              className={`lg:hidden flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all ${isScrolled
                  ? 'bg-slate-50 dark:bg-slate-800 text-slate-950 dark:text-white border border-slate-200 dark:border-white/10'
                  : 'bg-white/10 dark:bg-slate-800/20 text-slate-950 dark:text-white backdrop-blur-sm'
                }`}>
              {isMenuOpen ? <X size={20} /> : <MoreVertical size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-white dark:bg-slate-950 transition-all duration-700 lg:hidden ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
        <div className="flex flex-col h-full pt-32 pb-10 px-8 sm:px-12 overflow-y-auto">
          {/* Mobile Search */}
          <div className="mb-6">
            <SearchBar />
          </div>
          
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center justify-between py-5 border-b border-slate-100 dark:border-white/5 group"
              >
                <div className="flex items-center gap-4">
                  <span className={`text-2xl sm:text-3xl font-outfit font-bold tracking-tight group-hover:pl-2 transition-all duration-500 ${location.pathname === item.path ? 'text-indigo-600' : 'text-slate-950 dark:text-white'}`}>
                    {item.label}
                  </span>
                </div>
                <ArrowRight size={20} className={`${location.pathname === item.path ? 'text-indigo-600' : 'text-slate-200 dark:text-slate-800'}`} />
              </Link>
            ))}
          </div>

          {/* Mobile Fiverr Quick Hire Card */}
          <div className="mt-8">
            <a
              href={FIVERR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300/80 dark:border-emerald-500/30 text-slate-950 dark:text-white shadow-sm active:scale-95 transition-all group"
            >
              <div className="flex items-center gap-3">
                <FiverrIcon size={28} />
                <div className="text-left">
                  <p className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Hire Securely</p>
                  <p className="text-sm font-bold text-slate-950 dark:text-white">Order on Fiverr (Buyer Protection)</p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-[#1DBF73] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="mt-4">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 active:scale-95 transition-all shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-950 dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-slate-950 shadow-lg">
                  {isDark ? <Sun size={24} /> : <Moon size={24} />}
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Display Sync</p>
                  <p className="text-base font-bold text-slate-950 dark:text-white">{isDark ? 'Switch to Light' : 'Switch to Dark'}</p>
                </div>
              </div>
              <Cpu className="text-indigo-50" size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
