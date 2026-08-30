import React from 'react';
import { MessageCircle, Clock, Zap } from 'lucide-react';
import DraggableFloatingWrapper from './DraggableFloatingWrapper';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '918851619647';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi Tushar, I'd like to discuss a project with you!`;

  return (
    <DraggableFloatingWrapper
      id="whatsapp_btn"
      initialBottom={24}
      initialRight={24}
      zIndex={120}
    >
      <div className="group relative">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-0 hover:gap-3 bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white rounded-full p-3.5 sm:p-4 shadow-[0_12px_35px_rgba(16,185,129,0.4)] hover:shadow-[0_18px_45px_rgba(16,185,129,0.6)] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) active:scale-95 border border-emerald-300/40 backdrop-blur-md"
          aria-label="Chat directly with Tushar Singh on WhatsApp (Draggable)"
          title="Chat on WhatsApp (Drag to reposition)"
        >
          {/* Ambient Neon Pulse */}
          <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-25 scale-110 pointer-events-none" />

          {/* Expandable Label (Desktop Only) */}
          <div className="overflow-hidden max-w-0 group-hover:max-w-[210px] transition-all duration-500 ease-in-out whitespace-nowrap">
            <div className="flex items-center gap-1.5 pl-2">
              <span className="text-[11px] font-black uppercase tracking-wider font-outfit text-white drop-shadow-sm">
                Chat on WhatsApp
              </span>
              <Zap size={13} className="text-amber-300 animate-pulse shrink-0" />
            </div>
          </div>

          {/* WhatsApp Icon with 3D Gloss Effect */}
          <div className="relative flex items-center justify-center">
            <MessageCircle
              size={24}
              fill="currentColor"
              className="group-hover:rotate-[15deg] transition-transform duration-300 drop-shadow-md text-white"
            />
          </div>

          {/* Live Active Online Dot */}
          <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 bg-slate-950 rounded-full border-2 border-emerald-300 flex items-center justify-center shadow-md">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
        </a>

        {/* Desktop Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-1 group-hover:translate-y-0 hidden sm:block">
          <div className="bg-slate-900/95 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30 shadow-2xl whitespace-nowrap flex items-center gap-1.5">
            <Clock size={12} className="text-emerald-400" />
            <span>Active Now • Drag to Move</span>
          </div>
        </div>
      </div>
    </DraggableFloatingWrapper>
  );
};

export default WhatsAppButton;