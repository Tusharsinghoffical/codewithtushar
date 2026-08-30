import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, ChevronRight, Minus, ArrowUpRight, ShieldCheck,
  GraduationCap, MapPin, Award, CheckCircle2, Star, Sparkles,
  Brain, Code2, Layers, Rocket, Zap, MessageSquare, PhoneCall,
  Terminal, Database, Globe
} from 'lucide-react';
import SharePageButton from '../components/SharePageButton';
import { FIVERR_PROFILE_URL, GOOGLE_BUSINESS_NAME, GOOGLE_BUSINESS_URL, GOOGLE_VERIFICATION_PROOF_URL, BUSINESS_ADDRESS } from '../constants';
import { FiverrIcon, FiverrBadge } from '../components/FiverrBadge';
import GoogleVerifiedBadge from '../components/GoogleVerifiedBadge';

/* ─── Principle item ─────────────────────────────────────── */
const Principle = ({ title, text }: { title: string; text: string }) => (
  <li className="flex items-start gap-3.5 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 shadow-2xs">
    <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-200 dark:border-indigo-500/20">
      <CheckCircle2 size={13} />
    </div>
    <div>
      <h4 className="text-sm font-outfit font-black text-slate-900 dark:text-white mb-0.5">{title}</h4>
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{text}</p>
    </div>
  </li>
);

/* ─── Main Component ─────────────────────────────────────── */
const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* ══════════════════════════════════════════════════
          1. HERO — Who is Tushar Singh?
      ══════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 px-5 sm:px-10 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto relative z-10 space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <Sparkles size={12} className="text-indigo-500 animate-pulse" />
              <span>About Tushar Singh</span>
            </div>
            <FiverrBadge variant="pill" />
            <GoogleVerifiedBadge />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Bio Info */}
            <div className="lg:col-span-8 space-y-5">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.12] speakable">
                Hi, I'm <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">Tushar Singh</span>.<br />
                I Build Intelligent Systems That Scale Businesses.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium speakable">
                I am a Delhi-based <strong>AI Automation Expert &amp; Full-Stack Software Engineer</strong> with a Master of Computer Applications (MCA) from <strong>Delhi University</strong>. As the founder of <em>Code with Mr Singh</em>, I help businesses eliminate manual bottlenecks and scale using autonomous AI workflows, smart RAG chatbots, and high-performance React/Django platforms.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <GraduationCap size={16} className="text-indigo-500" /> MCA, Delhi University
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-rose-500" /> New Delhi, India (Worldwide Clients)
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-emerald-500" /> Google &amp; Fiverr Verified
                </span>
              </div>
            </div>

            {/* Right: Quick Stat Badge Card */}
            <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-white/10 shadow-xl space-y-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-outfit font-black text-xl shadow-md">
                  TS
                </div>
                <div>
                  <h3 className="font-outfit font-black text-base text-slate-950 dark:text-white">Tushar Singh</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Founder, Code with Mr Singh</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-200 dark:border-white/10 text-center">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5">
                  <p className="text-xl font-outfit font-black text-indigo-600 dark:text-indigo-400">10+</p>
                  <p className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider">Client Products</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5">
                  <p className="text-xl font-outfit font-black text-emerald-600 dark:text-emerald-400">₹2L+</p>
                  <p className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider">Revenue Impact</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5">
                  <p className="text-xl font-outfit font-black text-amber-500">4.0 ★</p>
                  <p className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider">Client Rating</p>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-white/5">
                  <p className="text-xl font-outfit font-black text-teal-500">&lt; 1 Hr</p>
                  <p className="text-[8.5px] font-black text-slate-400 uppercase tracking-wider">Response Time</p>
                </div>
              </div>

              <a
                href={FIVERR_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1DBF73] hover:bg-[#19a463] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <FiverrIcon size={14} className="brightness-125" />
                <span>Hire on Fiverr (Escrow Protected)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2. CORE TECHNICAL ARSENAL
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-10 bg-slate-50 dark:bg-slate-900/30 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Technical Expertise</span>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              What Powers My Deliverables
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
              Battle-tested tools and frameworks selected for speed, security, and measurable ROI.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'AI Automation & Agents',
                icon: <Brain size={22} className="text-indigo-500" />,
                desc: 'Autonomous multi-step workflows, AI agents, Zapier/Make connections, and webhook pipelines that save 10+ hours/week.',
                skills: ['n8n', 'Python', 'OpenAI API', 'Zapier', 'Webhooks']
              },
              {
                title: 'Smart RAG Chatbots',
                icon: <MessageSquare size={22} className="text-emerald-500" />,
                desc: '24/7 conversational support bots trained on proprietary docs, integrated with WhatsApp Business API, Telegram & CRMs.',
                skills: ['LangChain', 'Vector DB', 'GPT-4o', 'WhatsApp API', 'Voiceflow']
              },
              {
                title: 'Full-Stack Web Dev',
                icon: <Code2 size={22} className="text-blue-500" />,
                desc: '100/100 Lighthouse speed web applications, high-converting landing pages, and startup MVPs delivered in 7-14 days.',
                skills: ['React.js', 'Next.js', 'Django', 'TypeScript', 'Tailwind CSS']
              },
              {
                title: 'Lead Generation Systems',
                icon: <Zap size={22} className="text-amber-500" />,
                desc: 'Multi-channel cold email and LinkedIn automated prospecting infrastructure yielding 250+ verified leads.',
                skills: ['Apollo.io', 'Smartlead', 'Instantly', 'LinkedIn Automation']
              },
              {
                title: 'Data Science & BI',
                icon: <Database size={22} className="text-violet-500" />,
                desc: 'Interactive Power BI dashboards, SQL databases, and business intelligence models turning raw data into executive clarity.',
                skills: ['Power BI', 'DAX', 'PostgreSQL', 'Python Pandas', 'SQL']
              },
              {
                title: 'Brand Identity & Design',
                icon: <Sparkles size={22} className="text-rose-500" />,
                desc: 'Cohesive vector logos, digital brand kits, and high-trust social media graphics that establish authority.',
                skills: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Canva Pro']
              },
            ].map((tech) => (
              <div
                key={tech.title}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/5 space-y-4 hover:shadow-xl hover:border-indigo-400/40 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  {tech.icon}
                </div>
                <h3 className="font-outfit font-black text-base text-slate-950 dark:text-white">{tech.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{tech.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-white/5">
                  {tech.skills.map(sk => (
                    <span key={sk} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] font-bold rounded-md">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          3. MY PHILOSOPHY & WORK ETHIC
      ══════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 px-5 sm:px-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Core Principles</span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black text-slate-950 dark:text-white">
              Why Clients Choose to Work Directly with Me
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Unlike traditional agencies with layers of account managers and junior subcontractors, when you hire me, you get direct 1-on-1 access to a technical architect who actually writes the code.
            </p>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Principle
              title="Solve Real Business Bottlenecks"
              text="I focus on eliminating manual friction and generating measurable business revenue — not just writing lines of code."
            />
            <Principle
              title="Direct 1-on-1 Communication"
              text="No middlemen or miscommunication. Direct daily WhatsApp updates and video check-ins whenever needed."
            />
            <Principle
              title="Rapid Iteration (7–14 Days MVP)"
              text="Working software in days, not months. You get live staging URLs to test and provide continuous feedback."
            />
            <Principle
              title="100% Escrow Protection via Fiverr"
              text="Zero financial risk. You can hire me directly through Fiverr where funds are held safely until full sign-off."
            />
          </ul>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          4. CTA BANNER
      ══════════════════════════════════════════════════ */}
      <section className="py-20 px-5 sm:px-10 bg-slate-950 text-white text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-950/60 px-3.5 py-1.5 rounded-full border border-indigo-500/30">
            Let's Collaborate
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-black text-white leading-tight">
            Have a Project in Mind? <br />
            <span className="text-indigo-400">Let's Build It Together.</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
            Book a free 30-minute AI strategy audit, chat directly on WhatsApp, or hire securely via Fiverr.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-slate-950 rounded-2xl font-extrabold text-xs uppercase tracking-wider hover:bg-indigo-50 transition-all shadow-xl active:scale-95 cursor-pointer"
            >
              <span>Book Free Consultation</span>
              <ArrowRight size={14} />
            </button>
            <a
              href="https://wa.me/918851619647"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95"
            >
              <MessageSquare size={14} />
              <span>WhatsApp Tushar</span>
            </a>
            <a
              href={FIVERR_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#1DBF73] hover:bg-[#19a463] text-white rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl active:scale-95"
            >
              <FiverrIcon size={14} className="brightness-125" />
              <span>Fiverr Profile</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
