import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, X } from 'lucide-react';

interface SaathiBotWidgetProps {
  botId?: string;
  scriptUrl?: string;
}

export const SaathiBotWidget: React.FC<SaathiBotWidgetProps> = ({
  botId = 'bot_9f223d8f29b999e81e',
  scriptUrl = 'https://saathi-bot.vercel.app/widget.js',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!botId) return;

    // Check if script tag already exists
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-bot="${botId}"]`
    );

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = scriptUrl;
      script.async = true;
      script.setAttribute('data-bot', botId);
      script.id = `saathi-bot-script-${botId}`;
      document.body.appendChild(script);
    }
  }, [botId, scriptUrl]);

  // Helper to trigger the Saathi Bot popup open
  const handleOpenSaathiPopup = () => {
    // Attempt to trigger the native Saathi Bot launcher button
    const launcher = document.querySelector<HTMLElement>(
      '#saathi-bot-launcher, #saathi-bot-trigger, [data-saathi-trigger], button[aria-label*="Saathi"], .saathi-launcher-btn'
    );
    if (launcher) {
      launcher.click();
    } else {
      // Dispatch custom event if Saathi Bot listens to window event
      window.dispatchEvent(new CustomEvent('saathi-bot:open'));
    }
  };

  return (
    <div className="fixed bottom-[5.25rem] sm:bottom-[5.5rem] right-6 sm:right-8 z-[115] pointer-events-auto select-none">
      {/* ── Floating "Demo Chatbot" Badge Tag ── */}
      <div className="relative group">
        <button
          type="button"
          onClick={handleOpenSaathiPopup}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onTouchStart={() => setShowTooltip(prev => !prev)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 hover:bg-slate-900 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.35)] hover:shadow-[0_0_20px_rgba(34,211,238,0.55)] text-[9.5px] font-black uppercase tracking-wider backdrop-blur-md cursor-pointer transition-all active:scale-95"
          aria-label="Saathi Bot Testing and Demo Chatbot"
          title="Testing & Demo Chatbot — Saathi Bot (Mr Singh)"
        >
          <img
            src="/saathi-bot/saathi-black-icon.svg"
            alt="Saathi Icon"
            className="w-3.5 h-3.5 object-contain"
          />
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Demo Chatbot</span>
          <span className="text-[8px] font-bold text-slate-400">साथी</span>
        </button>

        {/* ── Hover / Touch Explanatory Tooltip ── */}
        <div
          className={`absolute bottom-full right-0 mb-2 transition-all duration-300 pointer-events-none ${
            showTooltip ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-1 scale-95'
          } group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100`}
        >
          <div className="bg-slate-950/95 backdrop-blur-xl text-white text-[10px] font-bold px-3.5 py-2 rounded-2xl border border-cyan-500/40 shadow-[0_15px_35px_rgba(0,0,0,0.6)] whitespace-nowrap flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[8px] font-black uppercase border border-cyan-400/30">
              Popup Demo
            </span>
            <span>Testing &amp; Demo Chatbot · Saathi Bot (Mr Singh)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaathiBotWidget;
