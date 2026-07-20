import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronRight, Minus
} from 'lucide-react';

/* ─── Schema injection ───────────────────────────────────── */
const injectAboutSchema = () => {
  const existing = document.getElementById('about-person-jsonld');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'about-person-jsonld';
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://codewithmrsingh.me/about#profilepage",
    "url": "https://codewithmrsingh.me/about",
    "name": "About Tushar Singh — AI Automation Expert & Full-Stack Developer Delhi",
    "description": "AI Automation Expert and Full-Stack Developer. 10+ successful projects submitted to clients. ₹2L+ revenue generated. Building intelligent systems that eliminate operational friction.",
    "dateModified": "2026-07-18",
    "inLanguage": "en",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://codewithmrsingh.me/#person",
      "name": "Tushar Singh",
      "alternateName": "Code with Mr. Singh",
      "jobTitle": "AI Automation Expert & Full-Stack Developer",
      "image": "https://codewithmrsingh.me/me.webp",
      "url": "https://codewithmrsingh.me",
      "description": "Building intelligent systems that eliminate operational friction for businesses across India and worldwide.",
      "address": { "@type": "PostalAddress", "addressLocality": "Delhi", "addressRegion": "DL", "addressCountry": "IN" },
      "sameAs": [
        "https://github.com/Tusharsinghoffical",
        "https://linkedin.com/in/tusharsingh2011",
        "https://www.youtube.com/@codewithmrsingh4u",
        "https://www.instagram.com/codewith_mrsingh/"
      ]
    }
  });
  document.head.appendChild(script);
};

/* ─── Section divider ────────────────────────────────────── */
const Divider = () => (
  <div className="flex items-center gap-4 my-12 sm:my-16">
    <div className="flex-1 h-px bg-slate-100 dark:bg-white/5" />
    <div className="flex gap-1">
      <span className="w-1 h-1 rounded-full bg-indigo-400" />
      <span className="w-1 h-1 rounded-full bg-violet-400" />
      <span className="w-1 h-1 rounded-full bg-indigo-400" />
    </div>
    <div className="flex-1 h-px bg-slate-100 dark:bg-white/5" />
  </div>
);

/* ─── Principle item ─────────────────────────────────────── */
const Principle = ({ text }: { text: string }) => (
  <li className="flex items-start gap-3 group">
    <div className="mt-1.5 w-4 h-px bg-indigo-400 shrink-0 group-hover:w-6 transition-all duration-300" />
    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{text}</p>
  </li>
);

/* ─── Main Component ─────────────────────────────────────── */
const About: React.FC = () => {
  useEffect(() => {
    injectAboutSchema();
    return () => { document.getElementById('about-person-jsonld')?.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ══════════════════════════════════════════════════
          HERO — Philosophy statement
      ══════════════════════════════════════════════════ */}
      <section className="pt-32 pb-20 px-5 sm:px-10 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">
              The Philosophy
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.05] mb-8 speakable">
            Building Systems That{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-600 bg-clip-text text-transparent bg-[length:200%] animate-gradient-flow">
                Scale Businesses
              </span>
            </span>
            {' '}—{' '}
            <br className="hidden sm:block" />
            Not Workloads.
          </h1>

          <p className="text-lg sm:text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl speakable">
            Technology should eliminate friction, not create it.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          THE PROBLEM FRAMING
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-5 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="prose-custom space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
            <p>
              Every growing business reaches a point where manual processes, disconnected tools,
              and inefficient workflows begin limiting progress. Time is lost on repetitive tasks,
              opportunities slip through the cracks, and teams spend more energy managing
              operations than driving growth.
            </p>
            <p className="text-slate-900 dark:text-white font-semibold text-lg sm:text-xl">
              The goal is simple: build intelligent digital systems that remove those bottlenecks.
            </p>
            <p>
              Every solution is designed with one principle in mind —
              <em className="text-indigo-600 dark:text-indigo-400 not-italic font-semibold"> work smarter through automation, not harder through repetition.</em>
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MORE THAN SOFTWARE
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-5 sm:px-10 bg-slate-950">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-indigo-400" />
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em]">
              More Than Software
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-white tracking-tight mb-12">
            Systems That Work.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                label: 'A website',
                narrow: 'is more than a digital brochure.',
                expand: 'It is a 24/7 sales and trust-building engine — designed to convert, not just exist.',
              },
              {
                label: 'Automation',
                narrow: 'is more than connecting a few apps.',
                expand: 'It is the infrastructure that lets a team of five operate with the leverage of fifty.',
              },
              {
                label: 'Artificial Intelligence',
                narrow: 'is more than adding a chatbot.',
                expand: 'It is a strategic layer that makes every customer interaction smarter and every decision faster.',
              },
            ].map(({ label, narrow, expand }) => (
              <div key={label} className="group p-6 bg-white/5 border border-white/8 rounded-3xl hover:border-indigo-400/30 hover:bg-white/[0.07] transition-all duration-400">
                <p className="text-indigo-400 font-outfit font-extrabold text-lg mb-1">{label}</p>
                <p className="text-white/50 text-sm font-medium mb-3">{narrow}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{expand}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 sm:p-8 border border-white/8 rounded-3xl bg-white/[0.03]">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Real value comes from designing complete systems that streamline operations,
              improve customer experiences, and create measurable business outcomes.
              Every project is built to solve problems, simplify complexity, and create sustainable growth.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          THE APPROACH — 4 PRINCIPLES
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-5 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">
              The Approach
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight mb-6">
            Every business is different.
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10 max-w-2xl">
            That is why every solution begins with understanding how the business operates,
            where inefficiencies exist, and what opportunities can be unlocked through technology.
            The process is built around four principles:
          </p>

          <ul className="space-y-5">
            <Principle text="Solve real business problems — not technical ones." />
            <Principle text="Eliminate repetitive work wherever possible." />
            <Principle text="Design solutions that remain scalable as businesses grow." />
            <Principle text="Focus on measurable outcomes instead of unnecessary complexity." />
          </ul>

          <p className="mt-10 text-slate-400 dark:text-slate-500 italic text-sm sm:text-base leading-relaxed">
            Technology should feel effortless for the people who use it.
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BUILT AROUND RESULTS
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-5 sm:px-10 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Left — copy */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-indigo-500" />
                <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">
                  Built Around Results
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight mb-6">
                The best technology<br />
                <span className="text-slate-400 dark:text-slate-500 font-medium text-2xl sm:text-3xl">often goes unnoticed.</span>
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                <p>Customers enjoy faster experiences.</p>
                <p>Teams complete more work with less effort.</p>
                <p>Processes become predictable.</p>
                <p>Businesses operate with greater clarity and confidence.</p>
              </div>
              <p className="mt-6 text-slate-500 dark:text-slate-500 italic text-sm leading-relaxed">
                Behind every successful digital product is a carefully designed system
                working quietly in the background. That is exactly what every project aims to deliver.
              </p>
            </div>

            {/* Right — stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '10+',   label: 'Real products submitted to clients', color: 'text-indigo-600 dark:text-indigo-400' },
                { value: '4.0★',  label: 'Average client satisfaction rating', color: 'text-amber-500' },
                { value: '₹2L+',  label: 'Value generated for clients',        color: 'text-emerald-600 dark:text-emerald-400' },
                { value: '100%',  label: 'Delivered on time & to spec',         color: 'text-violet-600 dark:text-violet-400' },
              ].map(({ value, label, color }) => (
                <div key={label} className="p-5 bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-3xl text-center hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <p className={`text-3xl font-outfit font-extrabold ${color} mb-1`}>{value}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          LOOKING AHEAD
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 px-5 sm:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-indigo-500" />
            <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">
              Looking Ahead
            </span>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
            <p className="text-slate-900 dark:text-white font-semibold text-xl sm:text-2xl leading-snug">
              The future belongs to businesses that embrace intelligent automation, data-driven
              decision-making, and scalable digital infrastructure.
            </p>
            <p>
              Those who continue relying on manual processes will struggle to compete.
              Those who build smarter systems today will create the foundation for tomorrow's growth.
            </p>
            <p>
              The mission is to help businesses make that transition with solutions that are
              reliable, practical, and built for the long term.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-5 sm:px-10 bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-indigo-400" />
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em]">
              Let's Build Something Exceptional
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-white tracking-tight leading-tight mb-8 max-w-2xl">
            Great businesses aren't built by working harder.<br />
            <span className="text-indigo-400">They're built by building smarter.</span>
          </h2>

          <div className="space-y-3 mb-10 text-slate-400 text-sm sm:text-base font-medium leading-relaxed">
            <p>Build systems that save time.</p>
            <p>Create experiences that customers remember.</p>
            <p>Design technology that continues delivering value long after it's deployed.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link to="/contact"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-50 hover:scale-105 transition-all shadow-xl active:scale-95">
              Let's Talk <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/projects"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
              View Projects <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
