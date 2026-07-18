import React, { useState, useId } from 'react';
import { 
  Mail, Send, Github, Linkedin, CheckCircle, 
  ArrowUpRight, Sparkles, Zap, 
  ShieldCheck, Phone, Building2, User, 
  Briefcase, Instagram, CalendarClock, Target
} from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [prefilledService, setPrefilledService] = useState<string>('');
  
  const ids = {
    name: useId(),
    email: useId(),
    phone: useId(),
    company: useId(),
    message: useId()
  };

  // Check for prefilled service data
  React.useEffect(() => {
    const storedService = sessionStorage.getItem('selectedService');
    if (storedService) {
      const serviceData = JSON.parse(storedService);
      setPrefilledService(serviceData.service);
      // Clear the stored data after using it
      sessionStorage.removeItem('selectedService');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const company = formData.get('company') as string;
    const service = formData.get('interest') as string;
    const message = formData.get('message') as string;

    // Construct WhatsApp message
    const whatsappMessage = `Hello Tushar, I'd like to book a consultation!

Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}
Project Focus: ${service}

Details: ${message}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/918851619647?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    setStatus('success');
    
    // Capture form reference before setTimeout (e.currentTarget is nullified by React after handler returns)
    const formEl = e.currentTarget;
    // Reset form after a short delay
    setTimeout(() => {
      formEl.reset();
    }, 2000);
  };

  return (
    <div className="pt-32 pb-24 px-6 sm:px-10 bg-white dark:bg-slate-950 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-indigo-50 dark:bg-indigo-950/20 rounded-full blur-[100px] opacity-60"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* --- HERO HEADER --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-24">
          <div className="max-w-3xl text-center lg:text-left mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-md">
              <Sparkles size={12} className="text-amber-400" /> Let's Build Your Revenue Engine
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.1] mb-6">
              Ready to Scale? <br/>
              <span className="text-indigo-600 dark:text-indigo-400">Book exactly when you want.</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Skip the generic inquiry forms. Pick a time on my calendar directly below, or send me a WhatsApp message if you prefer asynchronous chat.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 lg:gap-16">
          
          {/* --- LEFT: BOOKING & RAPID CONTACT CHANNELS --- */}
          <div className="xl:col-span-5 flex flex-col gap-6">
             
             {/* 1. Massive Calendly Booking Card */}
             <div className="bg-indigo-600 dark:bg-indigo-600 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative overflow-hidden group hover:shadow-indigo-500/20 transition-all border border-indigo-500 dark:border-indigo-400/20">
               <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-700">
                 <CalendarClock size={180} />
               </div>
               
               <div className="w-14 h-14 bg-white/10 backdrop-blur rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20 shadow-inner group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                 <CalendarClock size={28} />
               </div>

               <h2 className="text-3xl font-outfit font-extrabold text-white mb-4 relative z-10 leading-tight">
                 👉 Book a Free Consultation
               </h2>
               <p className="text-indigo-100/90 text-[13px] font-medium leading-relaxed mb-10 max-w-sm relative z-10">
                 Grab 30 minutes on my calendar. We'll audit your current workflows, identify AI automation opportunities, and map out a direct strategy to scale your operations. No obligations.
               </p>

               <a 
                 href="https://calendly.com/" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="flex items-center justify-between w-full px-8 py-5 bg-white text-indigo-900 rounded-[1.25rem] font-bold text-[11px] uppercase tracking-widest shadow-xl hover:bg-slate-50 active:scale-95 transition-all relative z-10 group/btn"
               >
                 <span>Open Calendly</span>
                 <ArrowUpRight size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
               </a>
             </div>

             {/* 2. Alternative: Direct WhatsApp */}
             <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 rounded-[2.5rem] p-8 sm:p-10 hover:shadow-lg transition-shadow">
               <div className="flex justify-between items-start mb-6">
                 <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center shadow-sm">
                   <Phone size={24} />
                 </div>
               </div>
               <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">Prefer instant chat?</h3>
               <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-6">
                 I'm highly responsive on WhatsApp. Send over a quick voice note or text message directly.
               </p>
               <a 
                 href="https://wa.me/918851619647" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors shadow-lg active:scale-95"
               >
                 Chat on WhatsApp
               </a>
             </div>

             {/* 3. Standard Email Box */}
             <div className="bg-slate-950 dark:bg-slate-900 border border-slate-900 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-10 text-white group relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>
               <p className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 relative z-10">Direct Email</p>
               <a href="mailto:tusharsinghkumar04@gmail.com" className="text-sm sm:text-base font-bold underline hover:text-indigo-400 transition-colors break-all relative z-10">
                 tusharsinghkumar04@gmail.com
               </a>
               
               <div className="mt-8 flex items-center gap-3 relative z-10">
                 <SocialLink href="https://github.com/Tusharsinghoffical" icon={<Github size={18} />} />
                 <SocialLink href="https://linkedin.com/in/tusharsingh2011" icon={<Linkedin size={18} />} />
                 <SocialLink href="https://www.instagram.com/codewith_mrsingh/" icon={<Instagram size={18} />} />
               </div>
             </div>
          </div>

          {/* --- RIGHT: HIGH-CONVERSION INQUIRY FORM --- */}
          <div className="xl:col-span-7">
            <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[3rem] border border-slate-100 dark:border-white/5 shadow-2xl relative overflow-hidden h-full flex flex-col">
              
              <div className="flex items-center gap-3 mb-10">
                <Target size={20} className="text-indigo-600 dark:text-indigo-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-slate-950 dark:text-white">Or send a project brief</h2>
              </div>

              {status === 'success' ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-100 dark:border-emerald-400/20 shadow-inner">
                    <CheckCircle size={40} />
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-outfit font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight">Brief Received!</h3>
                  <p className="text-base text-slate-500 dark:text-slate-400 mb-12 font-medium leading-relaxed max-w-sm mx-auto text-center">Your details have been securely sent via WhatsApp. I will review your requirements and respond shortly.</p>
                  <button onClick={() => setStatus('idle')} className="w-full sm:w-auto px-10 py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-bold text-[11px] tracking-widest uppercase hover:bg-indigo-600 dark:hover:bg-indigo-50 transition-all shadow-md active:scale-95">
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10 flex-1 flex flex-col">
                  {/* Identity Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                    <FancyInput id={ids.name} name="name" label="Full Name" placeholder="Your name" required icon={<User size={18} />} />
                    <FancyInput id={ids.email} name="email" label="Work Email" type="email" placeholder="ceo@company.com" required icon={<Mail size={18} />} />
                    <FancyInput id={ids.phone} name="phone" label="WhatsApp Phone" placeholder="+91 88516 19647" required icon={<Phone size={18} />} />
                    <FancyInput id={ids.company} name="company" label="Company Name" placeholder="Your brand line" required icon={<Briefcase size={18} />} />
                  </div>

                  {/* Objective Selection */}
                  <div className="space-y-4">
                    <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest block ml-1">Primary Objective</span>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {['Web Platform', 'AI Workflows', 'Dashboard', 'Digital Ads'].map(item => (
                        <label key={item} className="cursor-pointer group">
                          <input 
                            type="radio" 
                            name="interest" 
                            value={item} 
                            defaultChecked={prefilledService && item.includes(prefilledService.split(' ')[0])}
                            className="sr-only peer" 
                            required 
                          />
                          <div className="px-3 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-all peer-checked:bg-slate-950 dark:peer-checked:bg-white peer-checked:text-white dark:peer-checked:text-slate-950 peer-checked:border-slate-950 dark:peer-checked:border-white peer-checked:ring-2 peer-checked:ring-slate-200 text-center hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 shadow-sm leading-tight flex items-center justify-center h-full">
                            {item}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Project Specifics */}
                  <div className="space-y-3 flex-1 flex flex-col">
                    <label htmlFor={ids.message} className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest block ml-1">Current Bottleneck / Requirements</label>
                    <textarea 
                      id={ids.message}
                      name="message"
                      required
                      placeholder="What is the main problem you are trying to solve? Please include current systems you use (e.g., Shopify, HubSpot, Excel)..."
                      className="w-full h-full min-h-[140px] px-6 py-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-[1.5rem] focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 transition-all font-medium resize-y text-slate-950 dark:text-white text-sm sm:text-base placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm"
                    ></textarea>
                  </div>

                  <div className="pt-2 mt-auto">
                    <button 
                      disabled={status === 'sending'}
                      type="submit" 
                      className="w-full py-5 sm:py-6 bg-indigo-600 text-white font-black uppercase tracking-[0.2em] text-[11px] sm:text-xs rounded-[1.25rem] hover:bg-indigo-700 transition-all flex items-center justify-center gap-4 shadow-[0_10px_30px_rgba(79,70,229,0.3)] group disabled:opacity-70 active:scale-95"
                    >
                      {status === 'sending' ? (
                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Send Brief Securely
                          <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </>
                      )}
                    </button>
                    <div className="flex items-center justify-center gap-2 mt-6">
                       <ShieldCheck size={14} className="text-slate-400" />
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Data transmitted securely via SSL
                       </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
};

const FancyInput = ({ label, id, icon, ...props }: any) => (
  <div className="space-y-2.5">
    <label htmlFor={id} className="text-[10px] font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest ml-1 block">{label}</label>
    <div className="relative group">
      {icon && (
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors pointer-events-none">
          {icon}
        </div>
      )}
      <input 
        id={id}
        {...props}
        className={`w-full ${icon ? 'pl-14' : 'px-6'} pr-6 py-4 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 rounded-xl focus:outline-none focus:border-indigo-600 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-slate-900 focus:ring-4 focus:ring-indigo-500/10 transition-all font-bold text-slate-950 dark:text-white text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm`}
      />
    </div>
  </div>
);

const SocialLink = ({ href, icon }: { href: string, icon: React.ReactNode }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
  >
    {icon}
  </a>
);

export default Contact;