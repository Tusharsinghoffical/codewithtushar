import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, Youtube, MapPin, Mail, Phone, ArrowUpRight, Zap } from 'lucide-react';

/* ─── Sub-components ─────────────────────────────────────── */
const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link to={to} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="text-slate-400 text-xs hover:text-white transition-colors flex items-center gap-1.5 group">
      <span className="w-0 group-hover:w-2 h-px bg-indigo-400 transition-all duration-300 shrink-0" />
      {label}
    </Link>
  </li>
);

const SocialBtn = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-400/50 hover:bg-indigo-500/10 transition-all active:scale-95">
    {icon}
  </a>
);

/* ─── Footer ─────────────────────────────────────────────── */
const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5">
      
      {/* ── CTA STRIP ─────────────────────────────────────── */}
      <div className="border-b border-white/5 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1">
              Available Worldwide — India, USA, UK, UAE &amp; More
            </p>
            <p className="text-base font-outfit font-extrabold text-white">
              Ready to start your project?
            </p>
          </div>
          <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-widest transition-all active:scale-95">
            Get in Touch <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>

      {/* ── MAIN GRID ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-2xl font-outfit font-black text-white hover:text-indigo-400 transition-colors tracking-tight">C.MS</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-[220px]">
              AI Automation &amp; Full-Stack Development. Building intelligent systems that scale businesses — not workloads.
            </p>
            <div className="flex items-center gap-2">
              <SocialBtn href="https://linkedin.com/in/tusharsingh2011"      icon={<Linkedin size={15} />}  label="LinkedIn" />
              <SocialBtn href="https://github.com/Tusharsinghoffical"         icon={<Github size={15} />}   label="GitHub" />
              <SocialBtn href="https://www.instagram.com/tushar.cms/"         icon={<Instagram size={15} />} label="Instagram" />
              <SocialBtn href="https://www.youtube.com/@codewithmrsingh4u"    icon={<Youtube size={15} />}  label="YouTube" />
            </div>
            {/* Worldwide badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/8 rounded-xl w-fit">
              <Zap size={10} className="text-indigo-400" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Serving Worldwide</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[9px] font-black text-white uppercase tracking-widest mb-5">Navigation</h3>
            <ul className="space-y-3">
              <FooterLink to="/"            label="Home" />
              <FooterLink to="/about"       label="About" />
              <FooterLink to="/projects"    label="Projects" />
              <FooterLink to="/services"    label="Services" />
              <FooterLink to="/blog"        label="Blog" />
              <FooterLink to="/contact"     label="Contact" />
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[9px] font-black text-white uppercase tracking-widest mb-5">Services</h3>
            <ul className="space-y-3">
              <FooterLink to="/services" label="AI Automation" />
              <FooterLink to="/services" label="Chatbot Development" />
              <FooterLink to="/services" label="Website & Funnel" />
              <FooterLink to="/services" label="Logo & Branding" />
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[9px] font-black text-white uppercase tracking-widest mb-5">Contact</h3>
            <div className="space-y-4">
              <a href="https://wa.me/918851619647" className="flex items-center gap-2.5 text-slate-400 hover:text-emerald-400 transition-colors group">
                <Phone size={13} className="shrink-0 text-emerald-400" />
                <span className="text-xs">+91 88516 19647</span>
              </a>
              <a href="mailto:tusharsinghkumar04@gmail.com" className="flex items-start gap-2.5 text-slate-400 hover:text-indigo-400 transition-colors group">
                <Mail size={13} className="shrink-0 text-indigo-400 mt-0.5" />
                <span className="text-xs break-all">tusharsinghkumar04@gmail.com</span>
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Tushar+Singh+freelancing+New+Delhi+Delhi+110044" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 text-slate-400 hover:text-white transition-colors group">
                <MapPin size={13} className="shrink-0 text-rose-400 mt-0.5" />
                <span className="text-xs">New Delhi, Delhi 110044, India</span>
              </a>
              <div className="pt-2 flex flex-col gap-1.5">
                <a href="https://share.google/ZDu1p0y00ioP6PWiA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-indigo-400 hover:text-indigo-300 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Google Business Profile <ArrowUpRight size={10} />
                </a>
                <a href="https://drive.google.com/file/d/17pvGeSh_tA8-_NYFo2UOtRcYA5J2hMOh/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Google Verified Owner Proof <ArrowUpRight size={10} />
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BOTTOM BAR ─────────────────────────────────────── */}
      <div className="border-t border-white/5 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] text-slate-600 font-medium">
            &copy; {year} Code with Mr. Singh. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-600">AI Automation &amp; Full-Stack Development</span>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Available</span>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
