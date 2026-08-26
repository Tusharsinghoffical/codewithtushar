import React, { useState, useId } from 'react';
import {
  Mail, Send, Github, Linkedin, Instagram,
  CheckCircle, ArrowRight, Sparkles,
  ShieldCheck, Phone, MessageCircle,
  Globe, MapPin, CalendarClock, User, Briefcase,
  ChevronRight
} from 'lucide-react';
import GoogleVerifiedBadge from '../components/GoogleVerifiedBadge';

/* ─── Reusable components ────────────────────────────────── */
const SocialLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer"
    className="flex items-center gap-2 px-3.5 py-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white hover:border-indigo-400/40 hover:bg-white/10 transition-all text-[9px] font-bold uppercase tracking-widest">
    {icon} {label}
  </a>
);

const InfoRow = ({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) => (
  <div className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
    <div className="mt-0.5 text-indigo-400 shrink-0">{icon}</div>
    <div>
      <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">{label}</p>
      {href
        ? <a href={href} className="text-sm font-semibold text-slate-200 hover:text-indigo-400 transition-colors">{value}</a>
        : <p className="text-sm font-semibold text-slate-200">{value}</p>}
    </div>
  </div>
);

const FancyInput = ({ label, id, icon, ...props }: any) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest block">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">{icon}</div>}
      <input id={id}
        className={`w-full ${icon ? 'pl-9' : 'pl-4'} pr-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/8 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all`}
        {...props} />
    </div>
  </div>
);

/* ─── Main ───────────────────────────────────────────────── */
const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [prefilledService, setPrefilledService] = useState('');
  const ids = { name: useId(), email: useId(), phone: useId(), company: useId(), message: useId() };

  React.useEffect(() => {
    const stored = sessionStorage.getItem('selectedService');
    if (stored) { setPrefilledService(JSON.parse(stored).service || ''); sessionStorage.removeItem('selectedService'); }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const fd = new FormData(e.currentTarget);
    const msg = `Hi Tushar! I'd like to discuss a project.\n\nName: ${fd.get('name')}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone')}\nCompany: ${fd.get('company')}\nService: ${fd.get('interest')}\nCountry: ${fd.get('country')}\n\nDetails:\n${fd.get('message')}`;
    window.open(`https://wa.me/918851619647?text=${encodeURIComponent(msg)}`, '_blank');
    setStatus('success');
    const form = e.currentTarget;
    setTimeout(() => form.reset(), 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 px-5 sm:px-10 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100 dark:bg-indigo-950/20 rounded-full blur-[140px] opacity-60" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-100 dark:bg-violet-900/10 rounded-full blur-[100px] opacity-40" />
        </div>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available Worldwide — India, USA, UK, UAE &amp; More
          </div>
          <h1 className="text-4xl sm:text-6xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.05] mb-5 speakable">
            Let's Build Something<br />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-600 bg-clip-text text-transparent bg-[length:200%] animate-gradient-flow">
              Exceptional.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Ready to automate your workflows, build your web platform, or launch your AI chatbot?
            Reach out — a response within 1 hour.
          </p>
        </div>
      </section>

      {/* ── BODY GRID ────────────────────────────────────── */}
      <section className="px-5 sm:px-10 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── LEFT PANEL ─────────────────────────────── */}
          <div className="lg:col-span-4 space-y-5">

            {/* Calendly */}
            <div className="relative bg-indigo-600 rounded-3xl p-7 overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none"><CalendarClock size={130} /></div>
              <div className="w-11 h-11 bg-white/15 rounded-2xl flex items-center justify-center text-white mb-5 relative z-10">
                <CalendarClock size={22} />
              </div>
              <h2 className="text-lg font-outfit font-extrabold text-white mb-2 relative z-10">Book Free Consultation</h2>
              <p className="text-indigo-100 text-xs leading-relaxed mb-5 relative z-10">
                30-min call — audit your workflows, spot AI opportunities, build a strategy. Zero obligations.
              </p>
              <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer"
                className="relative z-10 flex items-center justify-between w-full px-5 py-3.5 bg-white text-indigo-900 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-50 active:scale-95 transition-all">
                Open Calendly <ArrowRight size={14} />
              </a>
            </div>

            {/* WhatsApp */}
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                  <MessageCircle size={18} />
                </div>
                <h3 className="text-base font-outfit font-extrabold text-slate-900 dark:text-white">Chat on WhatsApp</h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                Prefer instant messaging? Drop a voice note or text directly.
              </p>
              <a href="https://wa.me/918851619647" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95">
                +91-88516 19647 <ChevronRight size={12} />
              </a>
            </div>

            {/* Google Business Verified Card */}
            <GoogleVerifiedBadge variant="card" />

            {/* Contact details */}
            <div className="bg-slate-950 rounded-3xl p-6">
              <InfoRow icon={<Mail size={14} />} label="Email" value="tusharsinghkumar04@gmail.com" href="mailto:tusharsinghkumar04@gmail.com" />
              <InfoRow icon={<Phone size={14} />} label="Phone / WhatsApp" value="+91-88516 19647" href="https://wa.me/918851619647" />
              <InfoRow icon={<MapPin size={14} />} label="Registered Office" value="New Delhi, Delhi 110044, India" href="https://www.google.com/maps/search/?api=1&query=Tushar+Singh+freelancing+New+Delhi+Delhi+110044" />
              <InfoRow icon={<Globe size={14} />} label="Service Area" value="India, USA, UK, UAE, Australia, Canada, Singapore & more" />
              <div className="flex flex-wrap gap-2 pt-4">
                <SocialLink href="https://github.com/Tusharsinghoffical" icon={<Github size={11} />} label="GitHub" />
                <SocialLink href="https://linkedin.com/in/tusharsingh2011" icon={<Linkedin size={11} />} label="LinkedIn" />
                <SocialLink href="https://www.instagram.com/tushar.cms/" icon={<Instagram size={11} />} label="Instagram" />
              </div>
            </div>

            {/* Countries */}
            <div className="p-5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 rounded-3xl">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-3">Clients Served Worldwide</p>
              <div className="flex flex-wrap gap-2">
                {['🇮🇳 India','🇺🇸 USA','🇬🇧 UK','🇦🇪 UAE','🇦🇺 Australia','🇨🇦 Canada','🇸🇬 Singapore','🌍 + More'].map(c => (
                  <span key={c} className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/8 rounded-lg text-[9px] font-bold text-slate-600 dark:text-slate-400">{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — FORM ───────────────────────────── */}
          <div className="lg:col-span-8">
            <div className="bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-3xl p-7 sm:p-10 shadow-xl h-full">
              <div className="flex items-center gap-3 mb-7">
                <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                  <Send size={15} />
                </div>
                <div>
                  <h2 className="text-lg font-outfit font-extrabold text-slate-900 dark:text-white">Send a Project Brief</h2>
                  <p className="text-[9px] text-slate-400 font-medium">Available for clients in any country — remote-first</p>
                </div>
              </div>

              {status === 'success' ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={30} />
                  </div>
                  <h3 className="text-xl font-outfit font-extrabold text-slate-900 dark:text-white mb-2">Brief Sent!</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-7 max-w-xs mx-auto leading-relaxed">
                    Sent via WhatsApp. I'll review and respond within 1 hour during business hours.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="px-7 py-3 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-extrabold text-[9px] uppercase tracking-widest hover:bg-indigo-600 transition-all">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FancyInput id={ids.name} name="name" label="Full Name" placeholder="Your name" required icon={<User size={13} />} />
                    <FancyInput id={ids.email} name="email" label="Email Address" type="email" placeholder="you@company.com" required icon={<Mail size={13} />} />
                    <FancyInput id={ids.phone} name="phone" label="WhatsApp / Phone" placeholder="+91 or international" required icon={<Phone size={13} />} />
                    <FancyInput id={ids.company} name="company" label="Company / Brand" placeholder="Your business name" required icon={<Briefcase size={13} />} />
                  </div>

                  {/* Service selector */}
                  <div className="space-y-2">
                    <span className="text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest">I need help with</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['AI Automation', 'Chatbot / AI Agent', 'Website & Funnel', 'Logo & Branding'].map(item => (
                        <label key={item} className="cursor-pointer">
                          <input type="radio" name="interest" value={item}
                            defaultChecked={!!prefilledService && item.toLowerCase().includes(prefilledService.split(' ')[0].toLowerCase())}
                            className="sr-only peer" required />
                          <div className="px-3 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-white/8 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 text-center transition-all peer-checked:bg-indigo-600 peer-checked:text-white peer-checked:border-indigo-600 hover:border-indigo-300 leading-tight">
                            {item}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest block">Your Country / Location</label>
                    <input name="country" placeholder="e.g. India, USA, UK, UAE..." required
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/8 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all" />
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor={ids.message} className="text-[9px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest block">Project Details / Current Problem</label>
                    <textarea id={ids.message} name="message" required rows={4}
                      placeholder="Describe what you're trying to build or automate. What tools do you use? What's the main bottleneck?"
                      className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-white/8 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all resize-y" />
                  </div>

                  <button type="submit" disabled={status === 'sending'}
                    className="group w-full flex items-center justify-center gap-2.5 py-4 bg-indigo-600 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-70">
                    {status === 'sending'
                      ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      : <><Send size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /> Send Brief via WhatsApp</>
                    }
                  </button>

                  <div className="flex items-center justify-center gap-2">
                    <ShieldCheck size={11} className="text-slate-400" />
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Secure · No spam · Response within 1 hour</p>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
