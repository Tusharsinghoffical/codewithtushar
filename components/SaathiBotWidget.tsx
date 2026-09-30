import React from 'react';
import { useSaathiBot } from '../hooks/useSaathiBot';

interface SaathiBotWidgetProps {
  botId?: string;
  scriptUrl?: string;
  enabled?: boolean;
}

export const SaathiBotWidget: React.FC<SaathiBotWidgetProps> = ({
  botId = 'bot_9f223d8f29b999e81e',
  scriptUrl = 'https://saathi-bot.vercel.app/widget.js',
  enabled = true,
}) => {
  useSaathiBot({ botId, scriptUrl, enabled });
  return null;
};

export default SaathiBotWidget;
