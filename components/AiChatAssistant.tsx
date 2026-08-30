import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, X, Send, Bot, User, Sparkles, CheckCircle2,
  Calendar, Phone, ArrowRight, ExternalLink, RefreshCw, Zap,
  Layers, ShieldCheck, Clock, MessageCircle, ChevronDown, Award
} from 'lucide-react';
import { SERVICES, PROJECTS, FIVERR_PROFILE_URL, GOOGLE_BUSINESS_NAME } from '../constants';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: () => void; icon?: React.ReactNode }[];
  isBookingPrompt?: boolean;
}

const TUSHAR_PHONE = '918851619647';

export const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  // Booking form state
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingService, setBookingService] = useState('AI Automation');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'bot',
      text: `👋 Namaste! I am **Tushar's AI Assistant**.\n\nAsk me anything about **Services**, **Projects**, **Pricing**, or **Timeline**. You can also book a free 30-min strategy call right here and confirm directly on WhatsApp! 🚀`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '🚀 AI Automation', action: () => handleSendPreset('Tell me about AI Automation services') },
        { label: '🤖 AI Chatbot Dev', action: () => handleSendPreset('How do custom AI chatbots work?') },
        { label: '💻 Web Development', action: () => handleSendPreset('What web development services do you offer?') },
        { label: '🏆 View Projects', action: () => handleSendPreset('Show me recent client projects and results') },
        { label: '💰 Pricing & Timelines', action: () => handleSendPreset('What are the pricing and project timelines?') },
        { label: '📅 Book Free Consultation', action: () => openBookingFlow() },
      ]
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen, isTyping, showBookingForm]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const openBookingFlow = (presetService?: string) => {
    if (presetService) setBookingService(presetService);
    setShowBookingForm(true);
    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `✨ Please fill out the quick booking form below. Once confirmed, your complete details will be sent directly to Tushar's WhatsApp for instant confirmation!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBookingPrompt: true
    };
    setMessages(prev => [...prev, botMsg]);
  };

  // Automated Query Intelligence Engine
  const generateBotReply = (query: string): { replyText: string; quickActions?: { label: string; action: () => void }[] } => {
    const q = query.toLowerCase().trim();

    // 1. Booking / Meeting / Call / Consultation
    if (
      q.includes('book') || q.includes('meeting') || q.includes('call') ||
      q.includes('consultation') || q.includes('appointment') || q.includes('talk') ||
      q.includes('audit') || q.includes('hire') || q.includes('contact') || q.includes('baat karni')
    ) {
      setTimeout(() => setShowBookingForm(true), 600);
      return {
        replyText: `📅 **Book Free 30-Min AI Strategy Audit with Tushar Singh:**\n\n• **Guaranteed Response:** Under 1 Hour\n• **Format:** Google Meet / Zoom or WhatsApp Call\n• **Cost:** 100% Free Strategy Session\n\nPlease fill out the quick details below or tap the button to chat directly on WhatsApp!`,
        quickActions: [
          { label: '📝 Fill Booking Form', action: () => openBookingFlow() },
          { label: '💬 Open WhatsApp Directly', action: () => sendDirectWhatsApp('Hi Tushar, I want to book a free 30-min strategy audit call.') }
        ]
      };
    }

    // 2. AI Automation / n8n / Workflows
    if (
      q.includes('automation') || q.includes('n8n') || q.includes('workflow') ||
      q.includes('zapier') || q.includes('make.com') || q.includes('agent')
    ) {
      return {
        replyText: `🚀 **AI Workflow Automation with n8n & Python:**\n\n• **What We Build:** Autonomous AI multi-step agents, CRM syncs, automated email sequences, invoice/lead processing, and webhook pipelines.\n• **Result:** Saves **10+ hours per week** per team member with zero data entry errors.\n• **Tech Stack:** n8n, Python, OpenAI, LangChain, Zapier, Webhooks.\n\nReady to automate your manual repetitive tasks?`,
        quickActions: [
          { label: '📅 Book Automation Audit', action: () => openBookingFlow('AI Automation') },
          { label: '🏆 View Automation Projects', action: () => handleSendPreset('Show me automation case studies') },
          { label: '💬 Ask Tushar on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to discuss automating our business workflows with n8n.') }
        ]
      };
    }

    // 3. AI Chatbots / Customer Support / WhatsApp Bot
    if (
      q.includes('chatbot') || q.includes('bot') || q.includes('rag') ||
      q.includes('support agent') || q.includes('whatsapp bot') || q.includes('telegram')
    ) {
      return {
        replyText: `🤖 **Custom AI Chatbot & RAG Assistant Development:**\n\n• **Capabilities:** 24/7 multilingual support, appointment scheduling, product recommendations, trained on your custom PDFs/Docs/DB.\n• **Channels:** Website Widget, WhatsApp Business API, Telegram, Slack.\n• **Key Impact:** **70% support ticket reduction** and 0-second customer response time.\n• **Tech:** OpenAI GPT-4o, LangChain, Vector Databases (Pinecone/Chroma), Python.`,
        quickActions: [
          { label: '📅 Book Chatbot Consultation', action: () => openBookingFlow('Chatbot Development') },
          { label: '🏆 See 70% Ticket Reduction Case Study', action: () => handleSendPreset('Tell me about the AI support chatbot project') },
          { label: '💬 Discuss on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I need a custom AI Chatbot for my business.') }
        ]
      };
    }

    // 4. Web Development / React / Django / Frontend / Full Stack
    if (
      q.includes('web') || q.includes('website') || q.includes('react') ||
      q.includes('django') || q.includes('next.js') || q.includes('frontend') ||
      q.includes('full stack') || q.includes('landing page') || q.includes('funnel')
    ) {
      return {
        replyText: `💻 **Full-Stack Web Development & High-Converting Funnels:**\n\n• **Core Tech:** React.js, Next.js, Django, Python, TypeScript, Tailwind CSS, REST APIs.\n• **Deliverables:** SaaS Dashboards, Startup MVPs, High-Converting Sales Funnels, E-Commerce platforms.\n• **Speed & SEO:** 100/100 Google Lighthouse speed, AEO/GEO optimized, responsive UI.\n• **Timeline:** MVP delivered in 7 to 14 business days.`,
        quickActions: [
          { label: '📅 Book Web Project Call', action: () => openBookingFlow('Full-Stack Web Dev') },
          { label: '🏆 View Web Projects', action: () => handleSendPreset('Show me web development case studies') },
          { label: '💬 Message Tushar on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to build a high-performance website/web app.') }
        ]
      };
    }

    // 5. Lead Generation / Outreach
    if (
      q.includes('lead') || q.includes('prospect') || q.includes('cold email') ||
      q.includes('outreach') || q.includes('apollo') || q.includes('instantly')
    ) {
      return {
        replyText: `🎯 **Automated Lead Generation Systems:**\n\n• **Approach:** AI-personalized cold outreach on Email & LinkedIn targeting your exact Ideal Customer Profile (ICP).\n• **Deliverables:** Apollo/LinkedIn scraping, domain warmup, Smartlead/Instantly inbox management, CRM integration.\n• **Results:** Generated **250+ verified leads in 10 days** with 40% higher booked calls.`,
        quickActions: [
          { label: '📅 Book Lead Gen Strategy', action: () => openBookingFlow('Lead Generation Systems') },
          { label: '💬 Inquire on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to scale my lead generation pipeline.') }
        ]
      };
    }

    // 6. Pricing / Cost / Rates / Budget
    if (
      q.includes('price') || q.includes('cost') || q.includes('rate') ||
      q.includes('kitna') || q.includes('budget') || q.includes('charges') || q.includes('fee')
    ) {
      return {
        replyText: `💰 **Pricing & Engagement Models:**\n\n• **Free Initial Consultation:** 100% Free 30-min strategy audit & architecture roadmap.\n• **Fixed-Price Projects:** Clearly scoped milestones with zero hidden charges (MVPs, Chatbots, Automations).\n• **Escrow & Fiverr Protection:** You can also hire Tushar via Fiverr with 100% buyer escrow protection.\n• **ROI Focus:** Every project aims for tangible ROI (hours saved, qualified leads, or automated revenue).\n\nLet's understand your exact requirements to give an accurate estimate!`,
        quickActions: [
          { label: '📅 Get Custom Quote', action: () => openBookingFlow('Custom Quote') },
          { label: '⭐ Hire via Fiverr Escrow', action: () => window.open(FIVERR_PROFILE_URL, '_blank') },
          { label: '💬 Ask Price on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, can you provide a pricing quote for my project?') }
        ]
      };
    }

    // 7. Projects / Portfolio / Case Studies
    if (
      q.includes('project') || q.includes('portfolio') || q.includes('case study') ||
      q.includes('work') || q.includes('deliverable') || q.includes('examples') || q.includes('proof')
    ) {
      const topProjects = PROJECTS.slice(0, 3).map(p => `• **${p.title}**\n  _${p.category} | ${p.results[0]}_`).join('\n\n');
      return {
        replyText: `🏆 **Tushar's Top Client Deliverables (10+ Commercial Projects):**\n\n${topProjects}\n\n• Total Value Generated: **₹2L+**\n• Average Client Rating: **4.0 ★**\n• Response Time: **< 1 Hour**`,
        quickActions: [
          { label: '🚀 Explore All Projects', action: () => { window.location.href = '/projects'; } },
          { label: '📅 Book Call to Discuss Similar Project', action: () => openBookingFlow('Project Inquiry') },
          { label: '💬 WhatsApp Tushar', action: () => sendDirectWhatsApp('Hi Tushar, I saw your portfolio and want to discuss a similar project.') }
        ]
      };
    }

    // 8. About Tushar / Background / Experience / Location
    if (
      q.includes('about') || q.includes('who is') || q.includes('tushar') ||
      q.includes('education') || q.includes('location') || q.includes('mca') ||
      q.includes('experience') || q.includes('delhi') || q.includes('kahan')
    ) {
      return {
        replyText: `👨‍💻 **About Tushar Singh (Code with Mr Singh):**\n\n• **Role:** AI Automation Expert & Full-Stack Developer\n• **Education:** Master of Computer Applications (MCA), Delhi University\n• **Location:** Badarpur, New Delhi, India (Serving clients nationwide & globally)\n• **Credentials:** Google Verified Business Owner, Fiverr Verified Seller, ₹2L+ Value Delivered across 10+ real client products.\n• **Core Tech:** Python, React, n8n, OpenAI, Django, LangChain, PostgreSQL.`,
        quickActions: [
          { label: '📄 View About Page', action: () => { window.location.href = '/about'; } },
          { label: '⭐ Fiverr Profile', action: () => window.open(FIVERR_PROFILE_URL, '_blank') },
          { label: '💬 Connect on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, nice to connect with you!') }
        ]
      };
    }

    // 9. Timeline / Delivery time
    if (
      q.includes('time') || q.includes('timeline') || q.includes('duration') ||
      q.includes('kab tak') || q.includes('days') || q.includes('fast') || q.includes('delivery')
    ) {
      return {
        replyText: `⏱️ **Project Timelines & Delivery Speeds:**\n\n• **AI Automations & n8n Workflows:** 3 to 7 business days\n• **Custom AI Chatbots (RAG / WhatsApp):** 5 to 10 business days\n• **Full-Stack MVPs & Web Platforms:** 7 to 14 business days\n• **Emergency / Sprint Delivery:** Available upon request.\n\nWe provide continuous milestone updates and staging previews so you are always in the loop!`,
        quickActions: [
          { label: '📅 Plan My Timeline', action: () => openBookingFlow('Timeline Planning') },
          { label: '💬 Discuss Urgency on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I have an urgent project requirement and want to check your availability.') }
        ]
      };
    }

    // Default Fallback
    return {
      replyText: `🤖 Thanks for your question! Tushar specializes in:\n\n1. **AI Automation** (n8n, Python, AI agents, automated ops)\n2. **Custom Chatbots** (OpenAI RAG, 24/7 customer support, WhatsApp)\n3. **Full-Stack Web Dev** (React.js, Next.js, Django)\n4. **Lead Generation & High-Converting Funnels**\n\nWould you like to book a free 30-min strategy call or connect directly on WhatsApp?`,
      quickActions: [
        { label: '📅 Book Free 30-Min Audit', action: () => openBookingFlow() },
        { label: '🚀 AI Automation Info', action: () => handleSendPreset('Tell me about AI Automation') },
        { label: '🤖 AI Chatbot Info', action: () => handleSendPreset('Tell me about AI Chatbot Development') },
        { label: '💬 Direct WhatsApp Chat', action: () => sendDirectWhatsApp(`Hi Tushar, I had a question regarding: "${query}"`) }
      ]
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const { replyText, quickActions } = generateBotReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSendPreset = (presetText: string) => {
    handleSendMessage(presetText);
  };

  const sendDirectWhatsApp = (customMessage?: string) => {
    const defaultMsg = "Hi Tushar, I'd like to discuss a project with you!";
    const encoded = encodeURIComponent(customMessage || defaultMsg);
    window.open(`https://wa.me/${TUSHAR_PHONE}?text=${encoded}`, '_blank');
  };

  // Submit in-chat booking and directly forward to WhatsApp
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) {
      alert('Please provide your name and WhatsApp/Phone number.');
      return;
    }

    const formattedWhatsAppMsg = [
      `🚀 *NEW PROJECT INQUIRY / STRATEGY CALL BOOKING*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `👤 *Name:* ${bookingName}`,
      `📞 *Phone / WhatsApp:* ${bookingPhone}`,
      `🛠️ *Service Required:* ${bookingService}`,
      bookingDate ? `📅 *Preferred Date/Time:* ${bookingDate}` : '',
      bookingNotes ? `📝 *Project Brief:* ${bookingNotes}` : '',
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `🌐 *Source:* Code with Mr Singh AI Assistant`
    ].filter(Boolean).join('\n');

    // Add confirmation message to chat
    const confirmMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `🎉 **Booking Prepared for ${bookingName}!**\n\nI am now opening WhatsApp with your formatted project brief so Tushar can confirm your slot immediately. If WhatsApp didn't open automatically, tap the green button below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '🚀 Confirm on WhatsApp Now', action: () => sendDirectWhatsApp(formattedWhatsAppMsg) }
      ]
    };

    setMessages(prev => [...prev, confirmMsg]);
    setShowBookingForm(false);

    // Open WhatsApp with all the client's booking details
    sendDirectWhatsApp(formattedWhatsAppMsg);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `m-${Date.now()}`,
        sender: 'bot',
        text: `🔄 Chat refreshed. How can I help you today? Ask about **AI Automation**, **Chatbots**, **Web Development**, or **Projects**!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '🚀 AI Automation', action: () => handleSendPreset('Tell me about AI Automation services') },
          { label: '🤖 AI Chatbot Dev', action: () => handleSendPreset('How do custom AI chatbots work?') },
          { label: '💻 Web Development', action: () => handleSendPreset('What web development services do you offer?') },
          { label: '📅 Book Strategy Call', action: () => openBookingFlow() },
        ]
      }
    ]);
    setShowBookingForm(false);
  };

  return (
    <>
      {/* ─── Floating Trigger Button (Bottom-Left) ────────────────── */}
      <div className="fixed bottom-6 left-6 sm:left-8 z-[120]">
        {!isOpen && (
          <button
            onClick={handleOpen}
            aria-label="Open AI Assistant Chatbot"
            title="Ask AI Assistant about Services, Projects & In-Chat Booking"
            className="group relative flex items-center gap-0 hover:gap-3 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-500 hover:to-violet-600 text-white rounded-full p-3.5 sm:p-4 shadow-[0_15px_40px_rgba(99,102,241,0.4)] transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) active:scale-95 border border-indigo-400/30"
          >
            {/* Animated Pulse Wave */}
            <div className="absolute inset-0 bg-indigo-500 rounded-full animate-ping opacity-25 scale-110 pointer-events-none" />

            {/* AI Assistant Icon */}
            <div className="relative flex items-center justify-center">
              <Bot size={24} className="group-hover:rotate-12 transition-transform duration-300 drop-shadow-md text-white" />
            </div>

            {/* Expandable Label */}
            <div className="overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-500 ease-in-out whitespace-nowrap">
              <div className="flex items-center gap-1.5 pr-2">
                <span className="text-[11px] font-black uppercase tracking-wider font-outfit text-white">
                  Ask AI Assistant
                </span>
                <Sparkles size={13} className="text-amber-300 animate-pulse shrink-0" />
              </div>
            </div>

            {/* Unread Badge / Online Indicator */}
            <div className="absolute -top-1.5 -right-1.5 flex items-center gap-0.5 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border-2 border-slate-900 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>AI 24/7</span>
            </div>
          </button>
        )}

        {/* Hover Tooltip (Desktop) */}
        {!isOpen && (
          <div className="absolute bottom-full left-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-1 group-hover:translate-y-0 hidden sm:block">
            <div className="bg-slate-900/95 backdrop-blur-md text-white text-[10px] font-bold px-3.5 py-2 rounded-xl border border-indigo-500/30 shadow-2xl whitespace-nowrap flex items-center gap-2">
              <Sparkles size={12} className="text-amber-400" />
              <span>Instant AI answers on Services &amp; 1-Click WhatsApp Booking</span>
            </div>
          </div>
        )}
      </div>

      {/* ─── Chat Window Modal ────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-8 z-[200] w-[calc(100vw-2rem)] sm:w-[410px] max-h-[85vh] h-[640px] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.35)] border border-slate-200 dark:border-indigo-500/20 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300 backdrop-blur-xl"
          role="dialog"
          aria-label="AI Project Assistant"
        >
          {/* ── Header ── */}
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-4 border-b border-indigo-500/20 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-md border border-indigo-400/40">
                  <Bot size={22} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-outfit font-black text-sm text-white tracking-wide">
                    Tushar AI Assistant
                  </h3>
                  <span className="px-1.5 py-0.2 bg-indigo-500/30 text-indigo-300 text-[8px] font-black rounded-md uppercase tracking-wider border border-indigo-400/30">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Answers Services, Projects &amp; Instant Booking</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                aria-label="Reset Chat"
              >
                <RefreshCw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── Sub-header Trust Bar ── */}
          <div className="bg-indigo-50/80 dark:bg-indigo-950/40 px-3.5 py-1.5 border-b border-indigo-100 dark:border-indigo-500/10 flex items-center justify-between text-[9px] font-bold text-indigo-700 dark:text-indigo-300 shrink-0">
            <span className="flex items-center gap-1">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span>Free Consultation • &lt; 1 Hr Response</span>
            </span>
            <button
              onClick={() => sendDirectWhatsApp()}
              className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-extrabold hover:underline"
            >
              <MessageCircle size={11} />
              <span>Direct WhatsApp</span>
            </button>
          </div>

          {/* ── Message Thread ── */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-indigo-600/20 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 border border-indigo-500/20">
                    <Bot size={14} />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed text-[12px] shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-white/5'
                    }`}
                  >
                    {/* Render message formatted with simple markdown formatting */}
                    <div className="whitespace-pre-wrap space-y-1">
                      {msg.text.split('\n').map((line, idx) => {
                        // Bold formatting
                        const parts = line.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={idx}>
                            {parts.map((p, pIdx) => {
                              if (p.startsWith('**') && p.endsWith('**')) {
                                return <strong key={pIdx} className="font-extrabold text-indigo-600 dark:text-indigo-300">{p.slice(2, -2)}</strong>;
                              }
                              if (p.startsWith('_') && p.endsWith('_')) {
                                return <em key={pIdx} className="opacity-90">{p.slice(1, -1)}</em>;
                              }
                              return p;
                            })}
                          </p>
                        );
                      })}
                    </div>

                    <span
                      className={`block text-[8.5px] mt-1.5 ${
                        msg.sender === 'user' ? 'text-indigo-200 text-right' : 'text-slate-400'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* Quick Action Chips attached to message */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickActions.map((qa, qaIdx) => (
                        <button
                          key={qaIdx}
                          onClick={qa.action}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 text-[10px] font-bold transition-all active:scale-95 shadow-2xs"
                        >
                          <span>{qa.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User size={14} />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-xl bg-indigo-600/20 text-indigo-600 flex items-center justify-center shrink-0">
                  <Bot size={14} />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-2xl rounded-tl-none border border-slate-200/80 dark:border-white/5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            {/* ── In-Chat Interactive Booking Form ── */}
            {showBookingForm && (
              <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-indigo-950/40 border-2 border-indigo-500/40 shadow-lg space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-indigo-200/60 dark:border-indigo-500/20 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={15} className="text-indigo-600 dark:text-indigo-400" />
                    <h4 className="font-outfit font-black text-xs text-slate-900 dark:text-white">
                      Book Free 30-Min Strategy Call
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <X size={14} />
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-2.5">
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma / Alex"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-1">
                      Service Required
                    </label>
                    <select
                      value={bookingService}
                      onChange={(e) => setBookingService(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="AI Automation (n8n &amp; Python)">🚀 AI Automation (n8n &amp; Python)</option>
                      <option value="Custom AI Chatbot &amp; RAG Agent">🤖 Custom AI Chatbot &amp; RAG</option>
                      <option value="Full-Stack Web Development">💻 Full-Stack Web Development</option>
                      <option value="Lead Generation Systems">🎯 Lead Generation Systems</option>
                      <option value="Sales Funnel &amp; Landing Page">📈 Sales Funnel &amp; Landing Page</option>
                      <option value="General Consultation / Other">💡 General Project Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-1">
                      Preferred Date &amp; Time (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tomorrow at 4:00 PM IST"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-1">
                      Project Notes / Goal (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly describe what you want to build or automate..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
                  >
                    <MessageCircle size={15} />
                    <span>Confirm &amp; Send to WhatsApp</span>
                    <ArrowRight size={14} />
                  </button>
                  <p className="text-[8.5px] text-center text-slate-500 dark:text-slate-400">
                    ⚡ Instant connection with Tushar Singh on WhatsApp (&lt; 1 hour response)
                  </p>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input Bar ── */}
          <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about AI, Web, Chatbots, Pricing..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-md shadow-indigo-600/30"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;