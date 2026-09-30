import { useEffect } from 'react';

interface UseSaathiBotOptions {
  botId?: string;
  scriptUrl?: string;
  enabled?: boolean;
}

const DEFAULT_BOT_ID = 'bot_9f223d8f29b999e81e';
const DEFAULT_SCRIPT_URL = 'https://saathi-bot.vercel.app/widget.js';

export function useSaathiBot({
  botId = DEFAULT_BOT_ID,
  scriptUrl = DEFAULT_SCRIPT_URL,
  enabled = true,
}: UseSaathiBotOptions = {}) {
  useEffect(() => {
    if (!enabled || !botId) return;

    // Check if script tag already exists
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[data-bot="${botId}"]`
    );

    if (existingScript) return;

    // Create and inject the widget script
    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.setAttribute('data-bot', botId);
    script.id = `saathi-bot-script-${botId}`;

    document.body.appendChild(script);

    return () => {
      // Optional cleanup on unmount if needed
      // Note: Saathi bot attaches a host #saathi-bot-widget-container to body
    };
  }, [botId, scriptUrl, enabled]);
}

export default useSaathiBot;
