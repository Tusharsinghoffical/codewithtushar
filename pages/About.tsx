import React, { useEffect } from 'react';
import { 
  Terminal, 
  Cpu, 
  Workflow, 
  Target, 
  Code2, 
  Zap, 
  Brain, 
  LineChart,
  Download,
  Sparkles,
  ArrowRight,
  MapPin,
  Bot,
  CheckCircle2,
  Award,
  Users
} from 'lucide-react';

// Inject ProfilePage + Person schema for entity knowledge graph inclusion
const injectAboutSchema = () => {
  const existing = document.getElementById('about-person-jsonld');
  if (existing) existing.remove();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://codewithmrsingh.me/about#profilepage",
    "url": "https://codewithmrsingh.me/about",
    "name": "About Tushar Singh — AI Automation Expert & Full-Stack Developer Delhi",
    "description": "Tushar Singh is an MCA graduate from Delhi University and AI Automation Expert with 25+ completed projects generating ₹50L+ in client revenue. Expert in Python, React.js, n8n, AI agents, chatbots, and Django.",
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
      "description": "Tushar Singh is an AI Automation Expert and Full-Stack Developer based in Delhi, India. He founded Code with Mr. Singh. He holds an MCA degree from Delhi University and operates at the intersection of Full-Stack Development, AI Automation, and Digital Marketing. He has completed 25+ successful client projects generating over ₹50 lakh in revenue.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi",
        "addressRegion": "DL",
        "addressCountry": "IN"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Delhi University",
        "address": { "@type": "PostalAddress", "addressLocality": "Delhi", "addressCountry": "IN" }
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "Master of Computer Applications (MCA)"
      },
      "knowsAbout": [
        "AI Automation", "n8n Workflow Automation", "RAG Chatbot Development",
        "OpenAI API", "LangChain", "Full-Stack Development", "Python",
        "React.js", "Next.js", "Django", "Machine Learning", "Data Science",
        "Power BI", "Lead Generation", "Sales Funnel Development",
        "Digital Marketing", "Meta Ads", "Google Ads"
      ],
      "hasOccupation": {
        "@type": "Occupation",
        "name": "AI Automation Expert & Full-Stack Developer",
        "occupationLocation": { "@type": "City", "name": "Delhi" },
        "skills": "AI Automation, Python, React.js, Django, n8n, Machine Learning, Lead Generation, Sales Funnels"
      },
      "sameAs": [
        "https://github.com/Tusharsinghoffical",
        "https://linkedin.com/in/tusharsingh2011",
        "https://www.youtube.com/@codewithmrsingh4u",
        "https://www.instagram.com/codewith_mrsingh/"
      ],
      "award": "25+ Successful Projects, ₹50L+ Revenue Generated",
      "knowsLanguage": [
        { "@type": "Language", "name": "English" },
        { "@type": "Language", "name": "Hindi" }
      ]
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'about-person-jsonld';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

const About: React.FC = () => {
  // Inject ProfilePage + Person schema on mount, clean up on unmount
  useEffect(() => {
    injectAboutSchema();
    return () => {
      const el = document.getElementById('about-person-jsonld');
      if (el) el.remove();
    };
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* ── HERO / STORY ────────────────────────────────────────── */}
        {/* speakable + itemScope marks this for Google TTS, AI engines, entity knowledge graph */}
        <div
          className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center md:items-start mb-24"
          itemScope
          itemType="https://schema.org/Person"
        >
          <meta itemProp="name" content="Tushar Singh" />
          <meta itemProp="jobTitle" content="AI Automation Expert & Full-Stack Developer" />
          <meta itemProp="url" content="https://codewithmrsingh.me" />
          <meta itemProp="email" content="tusharsinghkumar04@gmail.com" />
          <meta itemProp="telephone" content="+91-8851619647" />

          <div className="w-56 h-72 sm:w-64 sm:h-[22rem] rounded-[2rem] overflow-hidden shadow-2xl relative group shrink-0 border border-slate-100 dark:border-white/5">
            <img 
              src="/me.webp" 
              alt="Tushar Singh - AI Automation Expert and Full-Stack Developer from Delhi India"
              title="Tushar Singh — Founder of Code with Mr. Singh"
              loading="lazy"
              decoding="async"
              itemProp="image"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
          
          <div className="text-center md:text-left flex-1 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-widest mb-6 shadow-xl">
              <Sparkles size={12} className="text-amber-400" /> The Journey
            </div>

            {/* H1 — speakable + itemProp for entity identification by AI engines */}
            <h1 className="text-3xl sm:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white mb-3 leading-tight tracking-tight speakable">
              Tushar Singh
            </h1>
            <p className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400 mb-2 speakable" itemProp="jobTitle">
              AI Automation Expert &amp; Full-Stack Developer
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 speakable">
              MCA Graduate, Delhi University &nbsp;·&nbsp; 25+ Projects &nbsp;·&nbsp; ₹50L+ Revenue Generated &nbsp;·&nbsp; Delhi, India
            </p>

            {/* Key stats pills */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
              {[
                { icon: <Award size={13} />, text: "25+ Projects Completed" },
                { icon: <CheckCircle2 size={13} />, text: "5.0 Star Rating" },
                { icon: <Users size={13} />, text: "Clients in 8+ Countries" },
              ].map(({ icon, text }, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-400/20 rounded-xl text-indigo-700 dark:text-indigo-300 text-xs font-bold">
                  {icon} <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mb-10 speakable" itemProp="description">
              <p>
                My background in Data Science gave me an obsession with numbers. But I quickly realized that companies don't just need data—they need systems that act on that data automatically to generate profit.
              </p>
              <p>
                Today, I operate at the intersection of <strong className="text-slate-900 dark:text-slate-200">Full-Stack Development, AI Automation, and Digital Marketing</strong>. I architect autonomous workflows that replace manual labor, design modern web platforms that capture leads seamlessly, and implement paid traffic strategies that scale predictable revenue.
              </p>
              <p className="italic">
                If your business relies on manual data entry, generic websites, or guesswork marketing, you are losing money. I fix that.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-slate-900 px-5 py-3 rounded-xl border border-slate-100 dark:border-white/5 shadow-sm">
                  <MapPin size={16} className="text-indigo-500 dark:text-indigo-400" /> Based in Delhi, Operating Globally
               </div>
               <a 
                 href="/Tushar_Singh_Resume.pdf" 
                 download
                 aria-label="Download Tushar Singh's technical resume"
                 className="flex items-center gap-3 text-[10px] sm:text-xs font-black text-white dark:text-slate-950 bg-slate-950 dark:bg-white hover:bg-indigo-600 dark:hover:bg-indigo-50 px-8 py-3 rounded-xl transition-all shadow-xl uppercase tracking-widest group active:scale-95"
               >
                  Download Resume <Download size={16} className="group-hover:-translate-y-1 transition-transform" />
               </a>
            </div>
          </div>
        </div>

        {/* --- SKILLS PILLARS --- */}
        <div className="mb-24">
           <div className="flex items-center justify-center gap-3 mb-12">
             <div className="h-[1px] w-12 bg-indigo-500/30"></div>
             <h2 className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em] text-center speakable">Core Pillars of Expertise — Full-Stack Development, AI Automation, Digital Marketing</h2>
             <div className="h-[1px] w-12 bg-indigo-500/30"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-shadow group">
                 <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-6 border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform shadow-sm">
                    <Code2 size={24} />
                 </div>
                 <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-4">Full-Stack Development</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                    Building the fast, secure, and highly-scalable foundations. From custom CRM dashboards to high-conversion modern landing pages.
                 </p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest"><Terminal size={12} className="text-indigo-500 shrink-0" /> React & Next.js</li>
                    <li className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest"><Terminal size={12} className="text-indigo-500 shrink-0" /> Python / Django</li>
                    <li className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest"><Terminal size={12} className="text-indigo-500 shrink-0" /> Database Architecture</li>
                 </ul>
              </div>

              {/* Pillar 2 */}
              <div className="bg-slate-950 dark:bg-slate-900 relative overflow-hidden p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-900 dark:border-white/10 shadow-2xl group">
                 <div className="absolute -right-4 -top-4 opacity-5 group-hover:rotate-12 transition-transform duration-700">
                    <Zap size={140} className="text-emerald-500" />
                 </div>
                 <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform shadow-lg">
                    <Bot size={24} />
                 </div>
                 <h3 className="text-lg sm:text-xl font-bold text-white mb-4 relative z-10">AI & Automation</h3>
                 <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6 relative z-10">
                    Removing the human bottleneck. I deploy autonomous agents and automated workflows that run your business operations 24/7 without fatigue.
                 </p>
                 <ul className="space-y-3 relative z-10">
                    <li className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest"><Workflow size={12} className="shrink-0" /> Custom RAG Chatbots</li>
                    <li className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest"><Workflow size={12} className="shrink-0" /> API Integrations</li>
                    <li className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest"><Workflow size={12} className="shrink-0" /> Autonomous Lead Routing</li>
                 </ul>
              </div>

              {/* Pillar 3 */}
              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-100 dark:border-white/5 hover:shadow-2xl transition-shadow group">
                 <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-rose-500 mb-6 border border-slate-100 dark:border-white/5 group-hover:scale-110 transition-transform shadow-sm">
                    <Target size={24} />
                 </div>
                 <h3 className="text-lg sm:text-xl font-bold text-slate-950 dark:text-white mb-4">Digital Marketing</h3>
                 <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                    Traffic is meaningless without conversion. I design quantitative, ROI-focused ad campaigns and marketing funnels that turn clicks into cash.
                 </p>
                 <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest"><LineChart size={12} className="text-rose-500 shrink-0" /> Meta / Google Ads</li>
                    <li className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest"><LineChart size={12} className="text-rose-500 shrink-0" /> Conversion Optimization</li>
                    <li className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest"><LineChart size={12} className="text-rose-500 shrink-0" /> Automated Sequences</li>
                 </ul>
              </div>
           </div>
        </div>

        {/* --- THE ARSENAL (TOOLS) --- */}
        <div className="mb-24 bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-[2.5rem] p-6 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-none">
           <div className="text-center mb-10">
             <h2 className="text-2xl sm:text-3xl font-outfit font-extrabold text-slate-950 dark:text-white mb-4">The Technical Arsenal.</h2>
             <p className="text-sm text-slate-500 dark:text-slate-400 font-medium max-w-xl mx-auto px-4">
               I am platform-agnostic, but I heavily favor tools that provide maximum leverage, speed, and reliability for business-critical operations.
             </p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {/* Tool 1 */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-indigo-400 transition-colors">
                 <Workflow size={36} className="text-rose-500 mb-4" />
                 <h4 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-widest mb-1">n8n</h4>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Advanced Automation</p>
              </div>
              {/* Tool 2 */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-indigo-400 transition-colors">
                 <Brain size={36} className="text-emerald-500 mb-4" />
                 <h4 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-widest mb-1">OpenAI</h4>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Cognitive AI Agents</p>
              </div>
              {/* Tool 3 */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-indigo-400 transition-colors">
                 <Zap size={36} className="text-amber-500 mb-4" />
                 <h4 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-widest mb-1">Zapier</h4>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Seamless Integrations</p>
              </div>
              {/* Tool 4 */}
              <div className="flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-indigo-400 transition-colors">
                 <Target size={36} className="text-blue-500 mb-4" />
                 <h4 className="text-xs font-black text-slate-950 dark:text-white uppercase tracking-widest mb-1">Meta Ads</h4>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Targeted Acquisition</p>
              </div>
           </div>
        </div>

        {/* --- VISION / MISSION MANIFESTO --- */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 dark:bg-slate-900 p-8 sm:p-16 border border-slate-800 dark:border-white/10 shadow-2xl text-center">
           <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500 via-transparent to-transparent"></div>
           
           <h2 className="text-xs sm:text-sm font-black text-indigo-400 uppercase tracking-[0.3em] mb-6 relative z-10 speakable">Vision &amp; Mission</h2>
           
           <h3 className="text-2xl sm:text-4xl font-outfit font-extrabold text-white mb-6 leading-tight tracking-tight max-w-4xl mx-auto relative z-10 px-2 speakable">
             "To eliminate operational friction and enable businesses to scale infinitely through ruthless automation and intelligent engineering."
           </h3>
           
           <p className="text-slate-400 font-medium text-base sm:text-lg max-w-2xl mx-auto mb-12 relative z-10">
             Your team should be focused on strategy, closing deals, and creative problem-solving. Everything else—data entry, lead qualification, basic support, and scheduling—should be handled by the machines I build. Let's engineer your growth.
           </p>

           <a href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-950 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95 relative z-10 group">
              Start The Transformation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
           </a>
        </div>
        
      </div>
    </div>
  );
};

export default About;