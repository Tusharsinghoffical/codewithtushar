import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
  const phoneNumber = '918851619647';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi Tushar, I'd like to discuss a project with you!`;

  return (
    <div className="group fixed bottom-6 right-6 sm:right-8 z-[120]">
      <a 
        href={whatsappUrl}
        target="_blank" 
        rel="noopener noreferrer"
        className="group relative flex items-center gap-0 hover:gap-3 bg-emerald-500 text-white rounded-full p-4 sm:p-4 shadow-[0_20px_50px_rgba(16,185,129,0.3)] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        {/* Animated Background Ring */}
        <div className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-20 scale-110 pointer-events-none"></div>
        
        {/* Expandable Label (Desktop Only) */}
        <div className="overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500 ease-in-out whitespace-nowrap">
          <span className="text-[11px] font-black uppercase tracking-widest pl-2">
            Chat with Tushar
          </span>
        </div>

        {/* Icon */}
        <div className="relative flex items-center justify-center">
          <MessageCircle size={24} fill="currentColor" className="group-hover:rotate-[12deg] transition-transform duration-300" />
        </div>

        {/* Online Status Dot */}
        <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full border-2 border-emerald-500">
          <div className="w-full h-full bg-emerald-500 rounded-full animate-pulse"></div>
        </div>
      </a>
      
      {/* Mobile-only small tooltip */}
      <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
        <div className="bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl whitespace-nowrap">
          Replies within 1 hour or 12 hours of business hours
        </div>
      </div>
    </div>
  );
};

export default WhatsAppButton;