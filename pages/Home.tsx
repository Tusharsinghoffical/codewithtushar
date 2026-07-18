import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2,
  TrendingUp,
  Users2,
  Rocket,
  ShieldCheck,
  Zap,
  Cpu,
  Clock,
  MapPin,
  Sparkles,
  Database,
  Globe,
  Terminal,
  Activity,
  ArrowRight,
  Brain,
  BarChart3,
  Quote,
  CheckCircle,
  FileSearch,
  Laptop
} from 'lucide-react';
import { PROJECTS, SERVICES, TESTIMONIALS } from '../constants';
import OptimizedImage from '../components/OptimizedImage';

const Home: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  }));
  const featuredPreview = PROJECTS.filter(p => p.isFeatured).slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
  }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const techStack = [
    "Python", "Django", "React.js", "n8n Automation", "Power BI", "SQL", "Machine Learning", 
    "AI Agents", "REST APIs", "Data Engineering", "Tailwind CSS"
  ];

  return (
    <div className="bg-white dark:bg-slate-950 w-full relative">
      <header className="relative min-h-[95vh] flex items-center pt-28 sm:pt-32 pb-16 px-4 sm:px-10 lg:px-16" role="banner">
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
          <div className="absolute top-[-5%] right-[-2%] w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] bg-indigo-50 dark:bg-indigo-950/20 rounded-full blur-[80px] sm:blur-[120px] animate-drift"></div>
          <div className="absolute bottom-[-2%] left-[-2%] w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] bg-violet-50 dark:bg-violet-900/10 rounded-full blur-[70px] sm:blur-[100px] animate-drift" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[9px] font-black uppercase tracking-[0.25em] mb-6 sm:mb-8 shadow-lg animate-fade-in-up mx-auto lg:mx-0">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                Available for Projects — India &amp; Worldwide
              </div>

              {/* H1 — SEO optimised, speakable for AEO/GEO */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white mb-6 tracking-tight leading-[1.1] lg:leading-[1.1] animate-fade-in-up delay-100 speakable">
                Hire Top AI Automation<br />
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow">&amp; Full-Stack Developer</span><br />
                Across India.
              </h1>

              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mb-10 sm:mb-12 leading-relaxed font-medium animate-fade-in-up delay-200 mx-auto lg:mx-0 px-2 sm:px-0 speakable">
                Tushar Singh — AI Automation Expert &amp; Full-Stack Developer serving clients across
                Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Pune, Kolkata, and every state of India.
                25+ successful projects. ₹50L+ revenue generated. Expert in AI agents, chatbots, React.js, Python &amp; n8n.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-10 sm:mb-14 animate-fade-in-up delay-300">
                <Link to="/projects" className="w-full sm:w-auto bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-xs sm:text-sm hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 group shadow-xl active:scale-95">
                  View Portfolio
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/contact" className="w-full sm:w-auto bg-white dark:bg-slate-900 text-slate-950 dark:text-white border border-slate-200 dark:border-white/10 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-xs sm:text-sm hover:border-indigo-200 hover:bg-indigo-50/30 transition-all text-center active:scale-95">
                  Book Free Consultation
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto lg:mx-0 animate-fade-in-up delay-400">
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <Users2 size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-slate-900 dark:text-white whitespace-nowrap">25+ Projects Completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 sm:p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <TrendingUp size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest">Impact</p>
                    <p className="text-[10px] sm:text-[11px] font-bold text-slate-900 dark:text-white tabular-nums">₹50L+ Value Delivered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Illustration Column */}
            <div className="lg:col-span-5 hidden lg:block relative animate-reveal-scale delay-500">
              <div className="relative w-full aspect-square max-w-sm ml-auto animate-float">
                <div className="absolute inset-0 bg-indigo-600/5 dark:bg-indigo-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative z-10 w-full h-full bg-slate-950 dark:bg-slate-900 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 overflow-hidden shadow-2xl border border-white/5 group transition-all duration-700 hover:border-white/20">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/5 backdrop-blur rounded-xl flex items-center justify-center text-indigo-400 border border-white/10 group-hover:scale-110 transition-transform">
                      <Terminal size={20} />
                    </div>
                    <div className="text-right">
                      <p className="text-[7px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1">Status</p>
                      <span className="text-[9px] font-black text-white uppercase tracking-widest">ONLINE</span>
                    </div>
                  </div>
                  <div className="mt-10 space-y-5">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 group-hover:bg-white/[0.08] transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity size={12} className="text-indigo-400" />
                        <span className="text-[7px] font-black text-indigo-400 uppercase tracking-widest">Expertise</span>
                      </div>
                      <h3 className="text-lg font-outfit font-bold text-white mb-1">25+ Projects</h3>
                      <p className="text-[9px] text-slate-500 font-medium">AI & Web Solutions</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 text-center group-hover:border-blue-500/30 transition-colors">
                        <Database size={14} className="text-blue-400 mx-auto mb-1.5" />
                        <span className="text-[6px] font-black text-slate-500 uppercase tracking-widest">Data</span>
                      </div>
                      <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 text-center group-hover:border-amber-500/30 transition-colors">
                        <Zap size={14} className="text-amber-400 mx-auto mb-1.5" />
                        <span className="text-[6px] font-black text-slate-500 uppercase tracking-widest">AI</span>
                      </div>
                      <div className="p-2.5 bg-white/5 rounded-lg border border-white/5 text-center group-hover:border-emerald-500/30 transition-colors">
                        <Globe size={14} className="text-emerald-400 mx-auto mb-1.5" />
                        <span className="text-[6px] font-black text-slate-500 uppercase tracking-widest">Web</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="py-6 sm:py-8 bg-slate-950 overflow-hidden border-y border-white/5 relative">
        <div className="flex animate-marquee whitespace-nowrap gap-10 sm:gap-16">
          {[...techStack, ...techStack].map((tech, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-4 group">
              <span className="text-white/40 font-outfit font-black text-base sm:text-xl uppercase tracking-tighter group-hover:text-indigo-500 transition-colors">
                {tech}
              </span>
              <Sparkles className="text-white/10 w-4 h-4 sm:w-6 sm:h-6" />
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-slate-950 relative" aria-labelledby="services-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-6">
              <Zap size={14} className="fill-current" /> Core Solutions
            </div>
            {/* H2 - Services section heading */}
            <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
              Technical <span className="text-indigo-600 dark:text-indigo-400">Expertise.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {SERVICES.map((service, idx) => (
              <div key={service.id} className={`group p-8 sm:p-10 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:border-indigo-500/20 transition-all duration-500 animate-fade-in-up delay-${(idx + 1) * 100}`}>
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-8 shadow-sm group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  {idx === 0 && <Brain size={24} />}
                  {idx === 1 && <Rocket size={24} />}
                  {idx === 2 && <Terminal size={24} />}
                  {idx === 3 && <Globe size={24} />}
                  {idx === 4 && <BarChart3 size={24} />}
                </div>
                <h3 className="text-2xl font-outfit font-bold text-slate-950 dark:text-white mb-4">{service.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8">{service.description}</p>
                <div className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-3 text-slate-400 dark:text-slate-500">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span className="text-[11px] font-bold uppercase tracking-widest">{feature.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-white/5 relative overflow-hidden" aria-labelledby="about-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative group animate-fade-in-up">
              <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-2xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
              <div className="relative aspect-square sm:aspect-video lg:aspect-square bg-slate-950 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                 <OptimizedImage 
                   src="/me.webp" 
                   alt="Tushar Singh - AI Automation Expert and Full-Stack Developer based in Delhi" 
                   className="opacity-80 group-hover:scale-105 transition-transform duration-1000"
                   priority={true}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
                 <div className="absolute bottom-8 left-8">
                   <p className="text-[11px] font-black text-indigo-400 uppercase tracking-[0.4em] mb-1">Architect</p>
                   <h3 className="text-xl font-outfit font-bold text-white tracking-tight">Tushar Singh</h3>
                 </div>
              </div>
            </div>
            <div className="animate-fade-in-up delay-200">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-[1.5px] bg-indigo-600 dark:bg-indigo-400"></div>
                <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">About the Expert</span>
              </div>
              {/* H2 - About section heading */}
              <h2 id="about-heading" className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight mb-6 mt-2">
                About the <span className="text-indigo-600 dark:text-indigo-400">Developer.</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-10">
                I'm Tushar Singh, an AI Automation Expert & Full-Stack Developer from Delhi. With a portfolio of 25+ projects, I specialize in developing AI agents, chatbots, web applications, and automation systems. My work demonstrates technical proficiency and commitment to delivering quality solutions.
              </p>
              <Link to="/about" className="inline-flex items-center gap-3 text-slate-950 dark:text-white font-black text-[11px] uppercase tracking-widest hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group">
                Read Full Story <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-32 bg-white dark:bg-slate-950 relative overflow-hidden text-center" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-400/20 text-emerald-600 dark:text-emerald-400 text-[9px] font-black uppercase tracking-widest mb-10">
              <ShieldCheck size={14} className="fill-current" /> Verified Proof
            </div>
            {/* H2 - Testimonials section heading */}
            <h2 id="testimonials-heading" className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight mb-12 sm:mb-16">
              Professional <span className="text-indigo-600 dark:text-indigo-400">References.</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {TESTIMONIALS.map((t, idx) => {
                const initials = t.clientName.split(' ').map(n => n[0]).slice(0, 2).join('');
                const avatarColors = ['bg-indigo-600', 'bg-emerald-600', 'bg-violet-600'];
                const avatarColor = avatarColors[idx % avatarColors.length];
                return (
                  <div key={t.id} className={`p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-[2rem] hover:border-indigo-500/20 transition-all duration-500 animate-fade-in-up delay-${(idx + 1) * 100}`}>
                    <Quote className="text-indigo-600/20 mb-6" size={40} />
                    <p className="text-slate-950 dark:text-white font-medium italic mb-8 leading-relaxed">"{t.content}"</p>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl ${avatarColor} flex items-center justify-center text-white font-black text-sm shrink-0 shadow-md`}>
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-950 dark:text-white">{t.clientName}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.clientRole}, {t.company}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
      </section>

      <section className="py-20 sm:py-32 bg-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="bg-slate-950 rounded-[3rem] p-10 sm:p-20 border border-white/10 shadow-2xl overflow-hidden relative group">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-6">
                    <Sparkles size={14} className="fill-current" /> High Value Offer
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-outfit font-extrabold text-white tracking-tight leading-tight mb-6 sm:mb-8 mt-4">
                    Get a Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">AI Automation Audit.</span>
                  </h2>
                  <p className="text-slate-400 font-medium leading-relaxed mb-10 text-lg">
                    I’ll review your current processes and reveal exactly where AI can save you 10+ hours a week and increase your revenue. Zero commitment.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <Link to="/contact" className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-4 bg-white text-slate-950 rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all text-center">
                      Claim Your Free Audit
                    </Link>
                    <div className="flex items-center gap-3">
                       <CheckCircle size={16} className="text-emerald-500" />
                       <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Only 4 slots left this month</span>
                    </div>
                  </div>
               </div>
               <div className="hidden lg:grid grid-cols-2 gap-4">
                  <AuditBenefitCard icon={<FileSearch size={24} />} title="Workflow Audit" desc="We map every manual step." />
                  <AuditBenefitCard icon={<Laptop size={24} />} title="Tool Review" desc="Are you using the best tech?" />
                  <AuditBenefitCard icon={<TrendingUp size={24} />} title="ROI Predictor" desc="Calculate your potential gains." />
                  <AuditBenefitCard icon={<Zap size={24} />} title="Action Plan" desc="A roadmap to automate." />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 sm:py-24 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-white/5 relative" aria-labelledby="projects-heading">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-8 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-[1.5px] bg-indigo-600 dark:bg-indigo-400"></div>
                <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.3em]">Curated Preview</span>
              </div>
              {/* H2 - Projects section heading */}
              <h2 id="projects-heading" className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight mb-3">Featured Projects.</h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-xs sm:text-sm">A selection of projects demonstrating technical capabilities and solutions.</p>
            </div>
            <Link to="/projects" className="w-full sm:w-auto bg-white dark:bg-slate-900 px-7 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-[9px] font-black text-slate-950 dark:text-white uppercase tracking-widest hover:bg-slate-950 dark:hover:bg-white hover:text-white dark:hover:text-slate-950 transition-all shadow-sm text-center active:scale-95">
              Explore All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-8 sm:pb-12">
            {featuredPreview.map((project, idx) => (
              <Link key={project.id} to="/projects" className={`group block animate-fade-in-up delay-${(idx + 1) * 100} relative hover:z-20`}>
                <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-700 relative">
                  <img 
                    src={project.imageUrl} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                    alt={project.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-6 sm:p-8 flex flex-col justify-end">
                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1.5">{project.category}</p>
                    <h4 className="text-lg font-outfit font-bold text-white mb-0">{project.title}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-slate-950 text-center relative overflow-hidden" aria-labelledby="cta-heading">
        <div className="absolute inset-0 pointer-events-none opacity-20">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[120px] animate-pulse"></div>
        </div>
        <div className="max-w-3xl mx-auto px-6 sm:px-10 animate-reveal-scale relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[9px] font-black uppercase tracking-[0.2em] mb-6 sm:mb-8">
            <Sparkles size={14} /> Accelerate Your Growth
          </div>
          {/* H2 - Call to action heading */}
          <h2 id="cta-heading" className="text-3xl sm:text-4xl lg:text-5xl font-outfit font-extrabold text-white mb-6 sm:mb-8 tracking-tight leading-[1.1]">
            Interested in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Collaboration?</span>
          </h2>
          <p className="text-sm sm:text-lg text-slate-400 mb-10 sm:mb-12 font-medium max-w-xl mx-auto leading-relaxed px-2 sm:px-4">
            I'm available for projects in AI automation, web development, and technical consulting. Let's discuss your requirements.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="w-full justify-center sm:w-auto inline-flex px-8 py-4 sm:px-10 bg-white text-slate-950 rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl hover:scale-105 active:scale-95">
              Get in Touch
            </Link>
            <Link to="/services" className="w-full justify-center sm:w-auto inline-flex px-8 py-4 sm:px-10 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] sm:text-[11px] uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95">
              View Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const AuditBenefitCard = ({ icon, title, desc }: any) => (
  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-all">
      {icon}
    </div>
    <h4 className="text-white font-outfit font-bold mb-1">{title}</h4>
    <p className="text-slate-500 text-[10px] font-medium leading-relaxed">{desc}</p>
  </div>
);

const StatItem = ({ number, label, delay = "" }: any) => (
  <div className={`text-center group p-4 sm:p-6 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-500 border border-transparent hover:border-slate-100 dark:hover:border-white/10 animate-fade-in-up hover:z-10 hover:-translate-y-1 ${delay}`}>
    <div className="text-2xl sm:text-5xl font-outfit font-black text-slate-950 dark:text-white tracking-tight mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
      {number}
    </div>
    <div className="text-[8px] sm:text-[9px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">{label}</div>
  </div>
);

export default () => (
  <div>
    <Home />
  </div>
);