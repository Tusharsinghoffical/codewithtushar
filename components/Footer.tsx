import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  MapPin, 
  Phone, 
  ChevronRight,
  Instagram,
  Youtube
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- MAIN FOOTER GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link to="/" onClick={scrollToTop} className="inline-block">
              <h2 className="text-2xl font-bold text-white hover:text-indigo-400 transition-colors">
                C.MS
              </h2>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed">
              AI Automation, Dashboard & Full-Stack Development. Building intelligent solutions for modern businesses.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <SocialIcon href="https://linkedin.com/in/tusharsingh2011" icon={<Linkedin size={18} />} label="LinkedIn" />
              <SocialIcon href="https://github.com/Tusharsinghoffical" icon={<Github size={18} />} label="GitHub" />
              <SocialIcon href="https://www.instagram.com/codewith_mrsingh/" icon={<Instagram size={18} />} label="Instagram" />
              <SocialIcon href="https://www.youtube.com/@codewithmrsingh4u" icon={<Youtube size={18} />} label="YouTube" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-3">
              <FooterLink to="/" label="Home" />
              <FooterLink to="/about" label="About" />
              <FooterLink to="/projects" label="Projects" />
              <FooterLink to="/services" label="Services" />
              <FooterLink to="/blog" label="Blog" />
              <FooterLink to="/contact" label="Contact" />
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-3">
              <FooterLink to="/services" label="AI Automation" />
              <FooterLink to="/services" label="Web Development" />
              <FooterLink to="/services" label="Chatbot Development" />
              <FooterLink to="/services" label="Lead Generation" />
              <FooterLink to="/services" label="Logo & Design" />
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                <span>Delhi, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-emerald-400 shrink-0" />
                <a href="tel:+918851619647" className="hover:text-white transition-colors">+91 88516 19647</a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <a href="mailto:tusharsinghkumar04@gmail.com" className="hover:text-white transition-colors break-all">
                  tusharsinghkumar04@gmail.com
                </a>
              </div>
            </div>
            
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all hover:gap-3"
            >
              Get in Touch
              <ArrowUpRight size={16} />
            </Link>
          </div>
          
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="text-sm text-slate-500">
            &copy; {currentYear} Code with Mr. Singh. All rights reserved.
          </div>
          
          <div className="text-sm text-slate-500">
            AI Automation & Full-Stack Development Portfolio
          </div>

        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <li>
    <Link 
      to={to} 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="text-slate-400 text-[11px] sm:text-xs font-bold hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group"
    >
      <ChevronRight size={10} className="text-indigo-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      {label}
    </Link>
  </li>
);

const SocialIcon = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={label}
    className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-400 hover:bg-slate-700 transition-all active:scale-95"
  >
    {icon}
  </a>
);

export default Footer;
