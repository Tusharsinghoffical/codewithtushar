import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare, X, Send, Bot, User, Sparkles, CheckCircle2,
  Calendar, Phone, ArrowRight, ExternalLink, RefreshCw, Zap,
  Layers, ShieldCheck, Clock, MessageCircle, ChevronDown, Award,
  Copy, Check, Volume2, VolumeX, Lightbulb, ChevronRight, HelpCircle
} from 'lucide-react';
import { SERVICES, PROJECTS, FIVERR_PROFILE_URL, GOOGLE_BUSINESS_NAME } from '../constants';

interface QuickAction {
  label: string;
  action: () => void;
  icon?: React.ReactNode;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: QuickAction[];
  assumptionQuestions?: string[];
  isBookingPrompt?: boolean;
}

const TUSHAR_PHONE = '918851619647';

interface AIChatAssistantProps {
  showTrigger?: boolean;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ showTrigger = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [showAssumptionBar, setShowAssumptionBar] = useState(true);

  // Booking form state
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingService, setBookingService] = useState('AI Automation');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initial Welcome Message with comprehensive services & assumption questions
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'bot',
      text: `👋 Namaste! I am **Tushar's AI Assistant**.\n\nI can answer anything about **Services**, **Live Projects**, **Pricing**, **SaaS Platforms (Saathi Bot & TASQ-ONE)**, or **Delivery Timelines**.\n\nYou can also click any of the **Assumption Questions** below or book a **Free 30-Min Strategy Audit** with direct WhatsApp confirmation! 🚀`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '🚀 AI Automation', action: () => handleSendPreset('Tell me about AI Automation and n8n workflows') },
        { label: '🤖 AI Chatbot Dev', action: () => handleSendPreset('How do custom AI chatbots and RAG assistants work?') },
        { label: '💻 Web Development', action: () => handleSendPreset('What full-stack web development services do you offer?') },
        { label: '📅 Book Strategy Call', action: () => openBookingFlow() },
        { label: '☁️ SaaS Ecosystem', action: () => handleSendPreset('Tell me about Saathi Bot and TASQ-ONE SaaS products') },
        { label: '💰 Pricing & ROI', action: () => handleSendPreset('What are your pricing packages, rates and guarantees?') }
      ],
      assumptionQuestions: [
        'How much does a custom AI automation or chatbot cost?',
        'Can I test the Saathi Bot demo widget right now?',
        'How fast can Tushar deliver a working MVP?',
        'What tech stack do you recommend for high-scale SaaS?'
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

  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setUnreadCount(0);
    };
    window.addEventListener('open-ai-chat', handleOpenEvent);
    return () => {
      window.removeEventListener('open-ai-chat', handleOpenEvent);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSpeech = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }
    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner speech
    const cleanText = text.replace(/[*_#`•]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const openBookingFlow = (presetService?: string) => {
    if (presetService) setBookingService(presetService);
    setShowBookingForm(true);
    const botMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `✨ Please fill out the quick booking form below. Once confirmed, your complete details will be sent directly to Tushar's WhatsApp for instant confirmation!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isBookingPrompt: true,
      assumptionQuestions: [
        'Is the initial consultation completely free?',
        'Can we connect on Google Meet or Zoom?',
        'What should I prepare before the strategy call?'
      ]
    };
    setMessages(prev => [...prev, botMsg]);
  };

  // Comprehensive Knowledge Engine with Deep Assumptions & Next-Step Guidance
  const generateBotReply = (query: string): { replyText: string; quickActions?: QuickAction[]; assumptionQuestions?: string[] } => {
    const q = query.toLowerCase().trim();

    // 1. Booking / Meeting / Call / Consultation / Hire
    if (
      q.includes('book') || q.includes('meeting') || q.includes('call') ||
      q.includes('consultation') || q.includes('appointment') || q.includes('talk') ||
      q.includes('audit') || q.includes('hire') || q.includes('contact') || q.includes('baat karni')
    ) {
      setTimeout(() => setShowBookingForm(true), 600);
      return {
        replyText: `📅 **Book Free 30-Min AI Strategy Audit with Tushar Singh:**\n\n• **Guaranteed Response:** Under 1 Hour (< 60 mins)\n• **Meeting Formats:** Google Meet, Zoom, or WhatsApp Direct Call\n• **Cost:** 100% Free Consultation & Architecture Blueprint\n• **Direct Line:** +91 88516 19647\n\nFill out the in-chat form below or click **Open WhatsApp Directly** for immediate scheduling!`,
        quickActions: [
          { label: '📝 Fill Booking Form', action: () => openBookingFlow() },
          { label: '💬 Open WhatsApp Directly', action: () => sendDirectWhatsApp('Hi Tushar, I want to book a free 30-min strategy audit call.') }
        ],
        assumptionQuestions: [
          'What happens during the 30-min strategy audit?',
          'Can we sign an NDA before discussing project details?',
          'What are your available meeting time slots this week?'
        ]
      };
    }

    // 2. AI Automation / n8n / Workflows / Multi-Agent Systems
    if (
      q.includes('automation') || q.includes('n8n') || q.includes('workflow') ||
      q.includes('zapier') || q.includes('make.com') || q.includes('agent') || q.includes('automate')
    ) {
      return {
        replyText: `🚀 **AI Workflow Automation & Multi-Agent Orchestration:**\n\n• **What We Build:** Autonomous AI pipelines, n8n self-hosted workflows, CRM auto-syncs (HubSpot/Notion/Airtable), AI email processing, and webhook ETL pipelines.\n• **Tangible Impact:** Clients save **10+ hours per week** per team member with 0% data entry mistakes.\n• **Tech Stack:** n8n, Python, OpenAI GPT-4o, LangChain, Webhooks, Docker, Redis.\n• **Typical Timeline:** 3 to 7 business days from roadmap to production deployment.`,
        quickActions: [
          { label: '📅 Book Automation Audit', action: () => openBookingFlow('AI Automation') },
          { label: '🏆 View Automation Projects', action: () => handleSendPreset('Show me automation case studies') },
          { label: '💬 Inquire on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to discuss automating our business workflows with n8n.') }
        ],
        assumptionQuestions: [
          'Which business workflows can n8n automate?',
          'What are the hosting & API costs of running n8n?',
          'Can n8n connect with WhatsApp and Google Sheets?',
          'How does automated error handling work in production?'
        ]
      };
    }

    // 3. AI Chatbots / Customer Support / WhatsApp Bot / RAG Systems
    if (
      q.includes('chatbot') || q.includes('bot') || q.includes('rag') ||
      q.includes('support agent') || q.includes('whatsapp bot') || q.includes('telegram') || q.includes('saathi')
    ) {
      return {
        replyText: `🤖 **Enterprise AI Chatbots, RAG Knowledge Bases & WhatsApp Commerce:**\n\n• **Capabilities:** 24/7 multilingual assistance, document-trained RAG (PDFs, Notion, DBs), automated lead qualification, and appointment booking.\n• **Channels:** Web embed widget, WhatsApp Business Cloud API, Telegram, and Slack.\n• **Proven Results:** **70% support ticket reduction** and immediate 0-second customer response time.\n• **Live SaaS Showcase:** Try our proprietary **Saathi Bot** live on the right side of the screen right now!\n• **Tech:** OpenAI, LangChain, Pinecone vector search, Python FastAPI, React.`,
        quickActions: [
          { label: '🤖 Test Saathi Bot Widget', action: () => { window.dispatchEvent(new CustomEvent('open-saathi-widget')); } },
          { label: '📅 Book Chatbot Consultation', action: () => openBookingFlow('Chatbot Development') },
          { label: '💬 Discuss on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I need a custom AI Chatbot for my business.') }
        ],
        assumptionQuestions: [
          'How does WhatsApp Business API integration work?',
          'How does RAG prevent hallucinations in bot answers?',
          'Can the chatbot speak Hindi, English and regional languages?',
          'What are the server & OpenAI API costs for a chatbot?'
        ]
      };
    }

    // 4. Custom SaaS Products / TASQ-ONE / Cloud Platforms
    if (
      q.includes('saas') || q.includes('software') || q.includes('tasq') ||
      q.includes('product') || q.includes('multi tenant') || q.includes('subscription') || q.includes('microservice')
    ) {
      return {
        replyText: `☁️ **Tushar's Proprietary SaaS Ecosystem & Custom MVP Engineering:**\n\n1. **Saathi Bot (v1.0.0):** Autonomous B2B AI Chatbot platform with embeddable zero-latency widget, FAQ crawler, and live lead qualification.\n2. **TASQ-ONE (v1.4.0):** The Intelligent Task OS with Groq Llama 3.3 70B AI task decomposition, topological acyclic Kanban DAG validation, sub-400ms latency, and cryptographic audit trails.\n3. **Custom SaaS MVP Engineering:** Multi-tenant architecture, Supabase PostgreSQL RLS, Stripe/Razorpay billing, and Docker containerization.\n• **Delivery Timeline:** Fully functional production MVP in **2 to 4 weeks**.`,
        quickActions: [
          { label: '🚀 Explore SaaS Suites Page', action: () => { window.location.href = '/saas'; } },
          { label: '⚡ Test TASQ-ONE Platform', action: () => { window.location.href = '/saas/tasq-one'; } },
          { label: '📅 Book SaaS MVP Call', action: () => openBookingFlow('Custom SaaS & MVP Engineering') }
        ],
        assumptionQuestions: [
          'How does TASQ-ONE validate dependency DAGs?',
          'What database and authentication do you use for SaaS?',
          'Can you build a private SaaS platform for my company?',
          'How do you handle automated Stripe & Razorpay recurring billing?'
        ]
      };
    }

    // 5. Full-Stack Web Development / React / Next.js / Django
    if (
      q.includes('web') || q.includes('website') || q.includes('react') ||
      q.includes('django') || q.includes('next.js') || q.includes('frontend') ||
      q.includes('full stack') || q.includes('landing page') || q.includes('funnel')
    ) {
      return {
        replyText: `💻 **Full-Stack Web Development & High-Converting Funnels:**\n\n• **Core Tech:** React 19, Next.js 14/15, Django, Python, TypeScript, Tailwind CSS, REST APIs.\n• **Deliverables:** SaaS Dashboards, Startup MVPs, E-Commerce platforms, High-speed Landing Pages.\n• **Performance Standards:** 100/100 Google Lighthouse speed, AEO/GEO semantic SEO, mobile-first responsive UX.\n• **Turnaround:** 7 to 14 business days from wireframe to live production launch.`,
        quickActions: [
          { label: '📅 Book Web Project Call', action: () => openBookingFlow('Full-Stack Web Dev') },
          { label: '🏆 View Web Projects', action: () => handleSendPreset('Show me web development case studies') },
          { label: '💬 Chat on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to build a high-performance web platform.') }
        ],
        assumptionQuestions: [
          'Do you ensure 100/100 Google Lighthouse and SEO ranking?',
          'Can you redesign my existing slow WordPress or Wix site?',
          'Can I manage content easily without touching code?',
          'What is the turnaround time for a complete web MVP?'
        ]
      };
    }

    // 6. Pricing / Rates / Budget / Escrow
    if (
      q.includes('price') || q.includes('cost') || q.includes('rate') ||
      q.includes('kitna') || q.includes('budget') || q.includes('charges') || q.includes('fee') || q.includes('rupee')
    ) {
      return {
        replyText: `💰 **Pricing, Engagement Models & Guarantees:**\n\n• **Free Initial Consultation:** 100% Free 30-min architecture & strategy audit.\n• **Fixed-Price Milestones:** Transparent scopes with 0 hidden costs (Automations, Chatbots, Web MVPs).\n• **Fiverr Escrow Buyer Protection:** Option to hire via Fiverr with full milestone protection.\n• **Guaranteed ROI:** Projects engineered to save 10+ hrs/week or generate immediate qualified pipeline.\n• **Hourly Consulting & Retainer:** Available for ongoing AI ops & technical advisory.`,
        quickActions: [
          { label: '📅 Get Custom Quote', action: () => openBookingFlow('Custom Quote') },
          { label: '⭐ Hire via Fiverr Escrow', action: () => window.open(FIVERR_PROFILE_URL, '_blank') },
          { label: '💬 Get Instant Estimate on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, can you give me an estimate for my project?') }
        ],
        assumptionQuestions: [
          'Can we start with a small paid pilot or proof-of-concept?',
          'How does payment milestone structuring work?',
          'Do you offer free post-launch support and bug fixes?',
          'What are the typical costs for an n8n automation project?'
        ]
      };
    }

    // 7. Lead Generation / Cold Outreach
    if (
      q.includes('lead') || q.includes('prospect') || q.includes('cold email') ||
      q.includes('outreach') || q.includes('apollo') || q.includes('instantly')
    ) {
      return {
        replyText: `🎯 **B2B Lead Generation & Automated Outreach Engines:**\n\n• **Methodology:** Multi-channel cold outreach on Email & LinkedIn targeting your exact buyer personas (ICP).\n• **Deliverables:** Apollo/LinkedIn scrapers, mailbox domain warmup, Instantly/Smartlead setup, AI copywriting.\n• **Track Record:** **250+ verified enterprise leads in 10 days** with 40% higher booked meeting rates.`,
        quickActions: [
          { label: '📅 Book Lead Gen Strategy', action: () => openBookingFlow('Lead Generation Systems') },
          { label: '💬 Inquire on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to scale my lead generation pipeline.') }
        ],
        assumptionQuestions: [
          'How do you protect email deliverability and avoid spam?',
          'What data sources (Apollo/LinkedIn) are used for leads?',
          'Can leads automatically sync to our HubSpot or Notion CRM?'
        ]
      };
    }

    // 8. Timelines & Delivery Speeds
    if (
      q.includes('time') || q.includes('timeline') || q.includes('duration') ||
      q.includes('kab tak') || q.includes('days') || q.includes('fast') || q.includes('delivery') || q.includes('speed')
    ) {
      return {
        replyText: `⏱️ **Project Delivery Timelines:**\n\n• **AI Automations & n8n Workflows:** 3 to 7 business days\n• **Custom AI Chatbots (RAG / WhatsApp):** 5 to 10 business days\n• **Full-Stack MVPs & Web Platforms:** 7 to 14 business days\n• **Express 48-Hour Sprint:** Available for urgent client requirements.\n\nWe provide daily milestone previews on staging URLs so you see live progress every step of the way!`,
        quickActions: [
          { label: '📅 Plan My Timeline', action: () => openBookingFlow('Timeline Planning') },
          { label: '💬 Check Availability on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I have an urgent project requirement and want to check your availability.') }
        ],
        assumptionQuestions: [
          'Can you deliver an emergency prototype in 48 hours?',
          'How often will I receive progress updates and staging previews?',
          'Can we launch in phased milestones?'
        ]
      };
    }

    // 9. About Tushar / Background / Credentials / Location
    if (
      q.includes('about') || q.includes('who is') || q.includes('tushar') ||
      q.includes('education') || q.includes('location') || q.includes('mca') ||
      q.includes('experience') || q.includes('delhi') || q.includes('kahan') || q.includes('singh')
    ) {
      return {
        replyText: `👨‍💻 **About Tushar Singh (Code with Mr Singh):**\n\n• **Role:** AI Automation Engineer, Full-Stack Architect & SaaS Founder\n• **Education:** Master of Computer Applications (MCA), MIT Pune\n• **Location:** Badarpur, New Delhi, India (Serving clients across India, US, UK & Middle East)\n• **Verified Badges:** Google Verified Business Owner, Fiverr Verified Seller with 4.0 ★ rating\n• **Track Record:** ₹2L+ Commercial Value Delivered across 10+ production software products\n• **Core Tech:** Python, React, Next.js, n8n, OpenAI, Django, PostgreSQL, Docker.`,
        quickActions: [
          { label: '📄 View About Page', action: () => { window.location.href = '/about'; } },
          { label: '⭐ Fiverr Profile', action: () => window.open(FIVERR_PROFILE_URL, '_blank') },
          { label: '💬 Connect on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, nice to connect with you!') }
        ],
        assumptionQuestions: [
          'Are you available for international / remote freelance contracts?',
          'Can I see client reviews and ratings on Fiverr?',
          'What is your primary tech stack preference for new projects?'
        ]
      };
    }

    // 10. Security / Pentesting / Compliance
    if (
      q.includes('security') || q.includes('pentest') || q.includes('safe') ||
      q.includes('gdpr') || q.includes('soc2') || q.includes('encryption') || q.includes('hack')
    ) {
      return {
        replyText: `🛡️ **Enterprise Security, Pentesting & Data Protection:**\n\n• **Security Hardening:** Strict HSTS, CSP headers, XSS prevention, and CSRF protection.\n• **Data Privacy:** PostgreSQL Row-Level Security (RLS) ensuring strict multi-tenant tenant isolation.\n• **Cryptographic Auditing:** SHA-256 immutable audit trails compliant with DPDP & SOC2 guidelines.\n• **Zero Secret Leakage:** Environment variables and secrets strictly validated with automated Vitest suites.`,
        quickActions: [
          { label: '🛡️ View Security Architecture', action: () => { window.location.href = '/saas/tasq-one'; } },
          { label: '📅 Book Security Audit Call', action: () => openBookingFlow('Security Audit') }
        ],
        assumptionQuestions: [
          'How do you protect database data against SQL injection?',
          'Do you follow OWASP Top 10 security standards?',
          'How is customer data isolated in multi-tenant SaaS?'
        ]
      };
    }

    // Default Fallback
    return {
      replyText: `🤖 Thanks for your question! Tushar Singh specializes across:\n\n1. **AI Automation** (n8n workflows, Python autonomous agents, CRM syncs)\n2. **Custom AI Chatbots & RAG** (WhatsApp Business API, Web Widgets, Saathi Bot)\n3. **Full-Stack Web Development** (React 19, Next.js 14, Django, 100/100 Lighthouse)\n4. **Proprietary SaaS Suites** (Saathi Bot, TASQ-ONE, Cloud MVPs)\n5. **B2B Lead Generation Engines** (Apollo, LinkedIn, cold email infrastructure)\n\nWould you like to book a free 30-min strategy call or explore any of the assumption questions below?`,
      quickActions: [
        { label: '📅 Book Free 30-Min Audit', action: () => openBookingFlow() },
        { label: '🚀 AI Automation Info', action: () => handleSendPreset('Tell me about AI Automation') },
        { label: '🤖 AI Chatbot Info', action: () => handleSendPreset('Tell me about AI Chatbot Development') },
        { label: '💬 Direct WhatsApp Chat', action: () => sendDirectWhatsApp(`Hi Tushar, I had a question regarding: "${query}"`) }
      ],
      assumptionQuestions: [
        'How much does a typical project cost?',
        'Can I test the Saathi Bot demo widget right now?',
        'How fast can you deliver an MVP?',
        'Can you show me real client case studies?'
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
      const { replyText, quickActions, assumptionQuestions } = generateBotReply(text);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions,
        assumptionQuestions
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
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
      `🌐 *Source:* Tushar AI Assistant Live`
    ].filter(Boolean).join('\n');

    // Add confirmation message to chat
    const confirmMsg: ChatMessage = {
      id: `bot-${Date.now()}`,
      sender: 'bot',
      text: `🎉 **Booking Prepared for ${bookingName}!**\n\nI am now opening WhatsApp with your formatted project brief so Tushar can confirm your slot immediately. If WhatsApp didn't open automatically, tap the green button below.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '🚀 Confirm on WhatsApp Now', action: () => sendDirectWhatsApp(formattedWhatsAppMsg) }
      ],
      assumptionQuestions: [
        'How soon will Tushar confirm my booking slot?',
        'Can I send project files or wireframes on WhatsApp?'
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
        ],
        assumptionQuestions: [
          'What are your fixed-price packages and hourly rates?',
          'Can I test the Saathi Bot demo widget right now?',
          'What is the turnaround time for a custom landing page?'
        ]
      }
    ]);
    setShowBookingForm(false);
  };

  return (
    <>
      {/* ─── Floating Trigger Button (Bottom-Left, pure mascot icon without orb or badge) ─── */}
      {showTrigger && (
        <div className="fixed bottom-6 left-6 sm:left-8 z-[120] group">
          {!isOpen && (
            <button
              onClick={handleOpen}
              aria-label="Open Tushar AI Assistant Chatbot"
              title="Tushar AI Assistant — Services, Projects & Instant Booking"
              className="relative flex items-center justify-center p-0 transition-all duration-300 active:scale-95 hover:scale-110 hover:-translate-y-1.5 focus:outline-none cursor-pointer"
            >
              {/* AI Assistant Mascot Icon Only */}
              <img
                src="/tushar-ai-icon.png"
                alt="Tushar AI Assistant Mascot"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_10px_25px_rgba(34,211,238,0.45)] hover:drop-shadow-[0_16px_35px_rgba(34,211,238,0.7)] transition-all duration-300"
              />
            </button>
          )}

          {/* Hover Tooltip (Desktop) */}
          {!isOpen && (
            <div className="absolute bottom-full left-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-1 group-hover:translate-y-0 hidden sm:block">
              <div className="bg-slate-900/95 backdrop-blur-md text-white text-[10px] font-bold px-3.5 py-2 rounded-xl border border-indigo-500/30 shadow-2xl whitespace-nowrap flex items-center gap-2">
                <Sparkles size={12} className="text-amber-400" />
                <span>Tushar AI Assistant · Free Consultation &lt; 1 Hr</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Chat Window Modal ────────────────────────────────────── */}
      {isOpen && (
        <div
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-8 z-[200] w-[calc(100vw-2rem)] sm:w-[420px] max-h-[88vh] h-[660px] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.4)] border border-slate-200 dark:border-indigo-500/30 overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300 backdrop-blur-xl"
          role="dialog"
          aria-label="Tushar AI Assistant"
        >
          {/* ── Top Header ── */}
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-4 border-b border-indigo-500/20 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-slate-950 p-1 flex items-center justify-center shadow-md border border-cyan-400/40 overflow-hidden">
                  <img
                    src="/tushar-ai-icon.png"
                    alt="Tushar AI Assistant Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-outfit font-black text-sm text-white tracking-wide">
                    Tushar AI Assistant
                  </h3>
                  <span className="px-1.5 py-0.5 bg-indigo-500/30 text-indigo-300 text-[8px] font-black rounded-md uppercase tracking-wider border border-indigo-400/30">
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
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                aria-label="Reset Chat"
              >
                <RefreshCw size={15} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                aria-label="Close Assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* ── Sub-header Banner: Free Consultation & Direct WhatsApp ── */}
          <div className="bg-slate-950/95 px-4 py-2 border-b border-indigo-500/20 flex items-center justify-between text-[11px] shrink-0">
            <div className="flex items-center gap-1.5 text-cyan-300 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate">Free Consultation • &lt; 1 Hr Response</span>
            </div>
            <button
              onClick={() => sendDirectWhatsApp('Hi Tushar, I want to connect directly from your AI Assistant.')}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold transition-all active:scale-95 shrink-0 cursor-pointer"
            >
              <MessageCircle size={12} className="text-emerald-400" />
              <span>Direct WhatsApp</span>
            </button>
          </div>

          {/* ── Messages Scroll Area ── */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-950 p-0.5 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/30 shadow-2xs overflow-hidden">
                    <img
                      src="/tushar-ai-icon.png"
                      alt="Tushar AI"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className={`max-w-[88%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed text-[12px] shadow-xs relative group/msg ${
                      msg.sender === 'user'
                        ? 'bg-indigo-600 text-white rounded-tr-none font-medium'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200/80 dark:border-white/5'
                    }`}
                  >
                    {/* Render message formatted with simple markdown formatting */}
                    <div className="whitespace-pre-wrap space-y-1.5">
                      {msg.text.split('\n').map((line, idx) => {
                        // Bold formatting
                        const parts = line.split(/(\*\*[^*]+\*\*)/g);
                        return (
                          <p key={idx}>
                            {parts.map((p, pIdx) => {
                              if (p.startsWith('**') && p.endsWith('**')) {
                                return (
                                  <strong key={pIdx} className="font-extrabold text-indigo-600 dark:text-cyan-300">
                                    {p.slice(2, -2)}
                                  </strong>
                                );
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

                    <div className="flex items-center justify-between pt-1 mt-1 border-t border-slate-200/50 dark:border-white/5">
                      <span
                        className={`text-[8.5px] ${
                          msg.sender === 'user' ? 'text-indigo-200' : 'text-slate-400'
                        }`}
                      >
                        {msg.timestamp}
                      </span>

                      {/* Bot Message Utilities: Copy & Read Aloud */}
                      {msg.sender === 'bot' && (
                        <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => copyToClipboard(msg.id, msg.text)}
                            title="Copy response"
                            className="p-1 hover:text-indigo-500 rounded transition-colors"
                          >
                            {copiedId === msg.id ? (
                              <Check size={11} className="text-emerald-500" />
                            ) : (
                              <Copy size={11} />
                            )}
                          </button>
                          <button
                            onClick={() => toggleSpeech(msg.id, msg.text)}
                            title={speakingId === msg.id ? 'Stop reading' : 'Read aloud'}
                            className="p-1 hover:text-indigo-500 rounded transition-colors"
                          >
                            {speakingId === msg.id ? (
                              <VolumeX size={11} className="text-cyan-400 animate-pulse" />
                            ) : (
                              <Volume2 size={11} />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Primary Quick Action Chips */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {msg.quickActions.map((qa, qaIdx) => (
                        <button
                          key={qaIdx}
                          onClick={qa.action}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 text-[10px] font-bold transition-all active:scale-95 shadow-2xs cursor-pointer"
                        >
                          <span>{qa.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ── Contextual Assumption / Deep-Dive Questions ── */}
                  {msg.assumptionQuestions && msg.assumptionQuestions.length > 0 && (
                    <div className="pt-1.5 space-y-1">
                      <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-cyan-400/80">
                        <Lightbulb size={11} className="text-amber-400" />
                        <span>Suggested Follow-up Questions:</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {msg.assumptionQuestions.map((qText, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleSendMessage(qText)}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/70 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/70 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-300 border border-slate-200/70 dark:border-slate-800 text-[10.5px] transition-all flex items-center justify-between group/q cursor-pointer"
                          >
                            <span className="line-clamp-1">{qText}</span>
                            <ChevronRight size={12} className="opacity-40 group-hover/q:opacity-100 group-hover/q:translate-x-0.5 transition-all shrink-0 ml-1 text-cyan-400" />
                          </button>
                        ))}
                      </div>
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
                <div className="w-7 h-7 rounded-lg bg-slate-950 p-0.5 flex items-center justify-center shrink-0 border border-cyan-500/30 overflow-hidden">
                  <img
                    src="/tushar-ai-icon.png"
                    alt="Tushar AI"
                    className="w-full h-full object-contain"
                  />
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
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
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
                      What do you need help with?
                    </label>
                    <select
                      value={bookingService}
                      onChange={(e) => setBookingService(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
                    >
                      <option value="AI Workflow Automation (n8n/Python)">⚡ AI Workflow Automation (Save 10+ hrs/wk with n8n/Python)</option>
                      <option value="24/7 AI Chatbot & WhatsApp Commerce">🤖 24/7 AI Chatbot (RAG, WhatsApp API, Web Widget)</option>
                      <option value="Custom SaaS Platform & MVP Engineering">☁️ Custom SaaS & MVP Engineering (Multi-tenant, Stripe, Docker)</option>
                      <option value="High-Converting Web App or Funnel">🌐 Web Development (React 19, Next.js 14, 100 Lighthouse)</option>
                      <option value="B2B Lead Generation & Cold Email">🎯 B2B Lead Generation (Apollo/LinkedIn scraping, Outreach)</option>
                      <option value="Free 30-Min Strategy Audit / Architecture">💡 Not Sure / Free 30-Min Strategy Audit</option>
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
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
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

          {/* ── Assumption Questions Quick Bar (Collapsible / Scrollable) ── */}
          {showAssumptionBar && (
            <div className="px-3 py-2 bg-slate-100/90 dark:bg-slate-950/90 border-t border-slate-200 dark:border-white/5 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[9px] font-black uppercase text-slate-500 dark:text-cyan-400/90 shrink-0 flex items-center gap-1">
                <HelpCircle size={11} className="text-cyan-400" />
                <span>Ask:</span>
              </span>
              <button
                onClick={() => handleSendMessage('What are your pricing packages and rates?')}
                className="shrink-0 px-2 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium transition-all active:scale-95 cursor-pointer"
              >
                💰 Cost &amp; Rates?
              </button>
              <button
                onClick={() => handleSendMessage('How does Saathi Bot capture leads and handle FAQs?')}
                className="shrink-0 px-2 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium transition-all active:scale-95 cursor-pointer"
              >
                🤖 Saathi Bot Demo?
              </button>
              <button
                onClick={() => handleSendMessage('What is your delivery timeline for an MVP?')}
                className="shrink-0 px-2 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium transition-all active:scale-95 cursor-pointer"
              >
                ⏱️ Delivery Timeline?
              </button>
              <button
                onClick={() => handleSendMessage('How does TASQ-ONE break down project tasks?')}
                className="shrink-0 px-2 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium transition-all active:scale-95 cursor-pointer"
              >
                ⚡ TASQ-ONE AI?
              </button>
              <button
                onClick={() => openBookingFlow()}
                className="shrink-0 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-[10px] text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold transition-all active:scale-95 cursor-pointer"
              >
                📅 Free Audit Call
              </button>
            </div>
          )}

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
                placeholder="Ask about AI, Web, Chatbots, Pricing, Timelines..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-10 h-10 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white flex items-center justify-center transition-all shrink-0 active:scale-95 shadow-md shadow-indigo-600/30 cursor-pointer"
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