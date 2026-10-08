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
  const [isClosing, setIsClosing] = useState(false);
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
      setIsClosing(false);
      setIsOpen(true);
      setUnreadCount(0);
    };
    window.addEventListener('open-ai-chat', handleOpenEvent);
    return () => {
      window.removeEventListener('open-ai-chat', handleOpenEvent);
    };
  }, []);

  const handleOpen = () => {
    setIsClosing(false);
    setIsOpen(true);
    setUnreadCount(0);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 280);
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

  // Comprehensive Multi-Tier Knowledge Engine with High-Precision Intent Matching
  const generateBotReply = (query: string): { replyText: string; quickActions?: QuickAction[]; assumptionQuestions?: string[] } => {
    const q = query.toLowerCase().trim();

    // ──────────────────────────────────────────────────────────────────────────
    // TIER 1: HIGH-PRECISION SPECIFIC ASSUMPTION & TECHNICAL QUESTIONS
    // ──────────────────────────────────────────────────────────────────────────

    // 1.1. Specific: n8n connecting WhatsApp with Google Sheets / CRM
    if (
      (q.includes('whatsapp') && (q.includes('sheet') || q.includes('google sheet') || q.includes('crm'))) ||
      (q.includes('n8n') && q.includes('sheet')) ||
      (q.includes('connect') && q.includes('whatsapp') && q.includes('sheet'))
    ) {
      return {
        replyText: `✅ **Yes, absolutely! n8n connects WhatsApp with Google Sheets & CRMs in Real-Time:**\n\n• **End-to-End Workflow:**\n  1. Customer messages your WhatsApp Business number.\n  2. An n8n Webhook catches the event instantly (< 200ms).\n  3. An AI node (OpenAI/Python) parses names, phone, purchase intent, and key details.\n  4. n8n appends or updates the row directly in your Google Sheet (or HubSpot/Notion).\n  5. An automated confirmation or answer is dispatched back to WhatsApp in under 2 seconds!\n\n• **Zero Data Loss:** Handles concurrent messages with automatic retries and dead-letter queue.\n• **Bonus Alert:** Can also ping your team's Slack or Telegram group whenever a high-ticket lead arrives!`,
        quickActions: [
          { label: '📅 Plan WhatsApp + Sheets Setup', action: () => openBookingFlow('WhatsApp + Sheets Automation') },
          { label: '💬 Chat with Tushar on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to connect WhatsApp and Google Sheets using n8n.') }
        ],
        assumptionQuestions: [
          'What are the hosting & API costs of running n8n?',
          'Which business workflows can n8n automate?',
          'How does automated error handling work in production?'
        ]
      };
    }

    // 1.2. Specific: Hosting & API Running Costs for n8n or Chatbot
    if (
      (q.includes('hosting') && (q.includes('cost') || q.includes('n8n') || q.includes('server') || q.includes('api'))) ||
      q.includes('api cost') || q.includes('running cost') || q.includes('server cost') ||
      (q.includes('costs of running') || q.includes('api costs for a chatbot'))
    ) {
      return {
        replyText: `⚙️ **Infrastructure & API Running Costs Breakdown:**\n\n• **Self-Hosted n8n VPS:** **$5 to $10/month** on a Hetzner, DigitalOcean, or AWS Lightsail VPS (Runs unlimited workflows with zero per-task charges, saving $100+/mo compared to Zapier!).\n• **OpenAI / Claude API Costs:** For typical business chatbot & automation usage, token costs average only **$3 to $15 per month** (using GPT-4o-mini or Claude 3.5 Haiku).\n• **Vector Database (Pinecone / Supabase pgvector):** 100% Free tier is sufficient for up to 100,000 vector document embeddings!\n• **Total Estimated Monthly OpEx:** Just **$10 to $25/month** to run a complete, high-volume automated business system.`,
        quickActions: [
          { label: '📅 Get Architecture Cost Audit', action: () => openBookingFlow('Cost & Architecture Audit') },
          { label: '💬 Ask Tushar on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, can you give me an OpEx breakdown for my AI automation setup?') }
        ],
        assumptionQuestions: [
          'Can n8n connect with WhatsApp and Google Sheets?',
          'How does automated error handling work in production?',
          'Which business workflows can n8n automate?'
        ]
      };
    }

    // 1.3. Specific: Which business workflows can n8n automate?
    if (
      q.includes('which business workflow') || q.includes('which workflow') ||
      q.includes('tasks can n8n') || q.includes('what can n8n automate') || q.includes('workflows can n8n')
    ) {
      return {
        replyText: `⚡ **Top 5 High-ROI Workflows We Automate with n8n:**\n\n1. **Omnichannel Lead Capture & CRM Sync:** Captures leads from WhatsApp, web forms, Calendly, and pings HubSpot/Notion/Google Sheets instantly.\n2. **AI Invoice & Document Processing:** Reads incoming PDF invoices from email, extracts line-item totals using OpenAI vision, and posts to accounting.\n3. **Customer Onboarding & Drip Sequences:** Sends personalized welcome WhatsApps, creates user folders on Google Drive, and notifies account managers on Slack.\n4. **Social & Content Syndication:** Auto-posts approved blog articles and product drops across LinkedIn, Twitter, and Facebook.\n5. **Stripe & Payment Webhooks:** Auto-generates GST tax invoices, sends WhatsApp payment receipts, and grants app access.`,
        quickActions: [
          { label: '📅 Book Automation Audit', action: () => openBookingFlow('AI Automation') },
          { label: '💬 Discuss My Workflows', action: () => sendDirectWhatsApp('Hi Tushar, I want to see which of our company workflows can be automated with n8n.') }
        ],
        assumptionQuestions: [
          'Can n8n connect with WhatsApp and Google Sheets?',
          'What are the hosting & API costs of running n8n?',
          'How does automated error handling work in production?'
        ]
      };
    }

    // 1.4. Specific: Error handling & production resilience
    if (
      q.includes('error handling') || q.includes('retry') ||
      q.includes('dead letter') || q.includes('production error') || q.includes('fail') && q.includes('production')
    ) {
      return {
        replyText: `🛡️ **Enterprise Error Handling & Resilience Architecture:**\n\n• **Dedicated Error Trigger Nodes:** Every n8n workflow is paired with a global Error Handler workflow that catches unhandled exceptions.\n• **Exponential Backoff Retries:** Transient API timeouts (e.g. OpenAI rate limits or network blips) automatically retry with 2s, 4s, and 8s intervals.\n• **Dead-Letter Storage:** If an external endpoint stays down, raw payloads are safely logged to PostgreSQL so zero data is lost.\n• **Real-Time Admin Alerts:** Sends instant Telegram/Slack alerts with workflow ID, timestamp, and error stack trace for instant remediation.`,
        quickActions: [
          { label: '📅 Book Technical Architecture Review', action: () => openBookingFlow('Architecture Review') },
          { label: '💬 Message Tushar', action: () => sendDirectWhatsApp('Hi Tushar, how do you handle automated error handling and logging?') }
        ],
        assumptionQuestions: [
          'What are the hosting & API costs of running n8n?',
          'Can we sign an NDA before discussing project details?',
          'What are your available meeting time slots this week?'
        ]
      };
    }

    // 1.5. Specific: Test Saathi Bot Widget Demo Right Now
    if (
      (q.includes('saathi') && (q.includes('demo') || q.includes('test') || q.includes('widget') || q.includes('try') || q.includes('live'))) ||
      q.includes('test the saathi bot') || q.includes('test saathi')
    ) {
      return {
        replyText: `🤖 **Saathi Bot is Live on This Screen!**\n\n• **Live Demo:** Look at the bottom-right corner of this page—that's **Saathi Bot (v1.0.0)** running in real time!\n• **What You Can Test:**\n  - Ask it about website services, pricing, or technical questions.\n  - Watch its sub-200ms streaming responses.\n  - Experience automated lead qualification and appointment capture.\n• **Embed on Your Website:** Takes just 1 line of HTML script tag on WordPress, Shopify, Webflow, or Next.js!`,
        quickActions: [
          { label: '🤖 Open Saathi Demo Widget Now', action: () => { window.dispatchEvent(new CustomEvent('open-saathi-widget')); } },
          { label: '🚀 Explore Saathi Bot Product Page', action: () => { window.location.href = '/saas/saathi-bot'; } },
          { label: '💬 Deploy for My Website', action: () => sendDirectWhatsApp('Hi Tushar, I want to deploy a custom Saathi Bot for my business website.') }
        ],
        assumptionQuestions: [
          'How does RAG prevent hallucinations in bot answers?',
          'How does WhatsApp Business API integration work?',
          'Can the chatbot speak Hindi, English and regional languages?'
        ]
      };
    }

    // 1.6. Specific: RAG and preventing hallucinations
    if (
      q.includes('hallucination') || q.includes('prevent hallucination') ||
      q.includes('rag prevent') || q.includes('accurate answers')
    ) {
      return {
        replyText: `🧠 **How Our RAG Architecture Prevents LLM Hallucinations:**\n\n• **Strict Grounding Guardrails:** The LLM system prompt is strictly constrained: *"Answer ONLY based on the verified documents retrieved. If the answer is not present, politely say you don't know and offer WhatsApp connection."*\n• **Chunking & Vector Embeddings:** Your PDFs, Notion docs, and product catalogs are tokenized into 500-token chunks with 50-token overlaps using OpenAI \`text-embedding-3-small\`.\n• **Cosine Similarity Filtering:** Chunks must meet a strict 0.78+ similarity threshold in Pinecone/pgvector to be injected into prompt context.\n• **99.4% Verified Accuracy:** Ensures your chatbot never promises fictitious discounts or incorrect product specs!`,
        quickActions: [
          { label: '📅 Book RAG Architecture Call', action: () => openBookingFlow('RAG Architecture') },
          { label: '💬 Inquire on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, how does your RAG system ensure accurate answers without hallucination?') }
        ],
        assumptionQuestions: [
          'Can the chatbot speak Hindi, English and regional languages?',
          'How does WhatsApp Business API integration work?',
          'What are the server & OpenAI API costs for a chatbot?'
        ]
      };
    }

    // 1.7. Specific: Multilingual & Hindi / Hinglish capabilities
    if (
      q.includes('multilingual') || q.includes('hindi') || q.includes('regional') ||
      q.includes('bhasha') || q.includes('language')
    ) {
      return {
        replyText: `🌐 **Multilingual & Hinglish Natural Language Processing:**\n\n• **Supported Languages:** English, Hindi, Hinglish, Spanish, Arabic, French, and regional Indian languages.\n• **Natural Code-Switching:** Users can type naturally in Hinglish (*"Mera order kab tak deliver hoga?"* or *"Pricing kya hai?"*), and the assistant replies with perfect conversational context.\n• **Language Auto-Detection:** Dynamically switches languages based on the customer's input without requiring awkward dropdown selectors.`,
        quickActions: [
          { label: '📅 Plan Multilingual Bot', action: () => openBookingFlow('Multilingual Chatbot') },
          { label: '💬 Test in Hindi on WhatsApp', action: () => sendDirectWhatsApp('Namaste Tushar, mujhe ek multilingual AI chatbot chahiye.') }
        ],
        assumptionQuestions: [
          'How does WhatsApp Business API integration work?',
          'How does RAG prevent hallucinations in bot answers?',
          'How much does a custom AI automation or chatbot cost?'
        ]
      };
    }

    // 1.8. Specific: WhatsApp Business Cloud API Integration
    if (
      q.includes('whatsapp business api') || q.includes('meta cloud api') ||
      q.includes('whatsapp api integration') || q.includes('whatsapp integration work')
    ) {
      return {
        replyText: `📱 **Official WhatsApp Business Cloud API Setup:**\n\n• **Direct Meta Cloud API:** Zero reliance on unapproved scrapers—100% compliant with Meta terms with zero ban risk.\n• **Interactive Rich UI:** Sends clickable quick-reply buttons, interactive catalog list pickers, and PDF brochures.\n• **Instant 24/7 Auto-Reply:** Answers customer questions in under 1 second, captures customer phone numbers, and routes hot deals to your personal phone.`,
        quickActions: [
          { label: '📅 Setup WhatsApp Cloud API', action: () => openBookingFlow('WhatsApp Cloud API') },
          { label: '💬 Chat on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to set up an official WhatsApp Business Cloud API bot.') }
        ],
        assumptionQuestions: [
          'Can n8n connect with WhatsApp and Google Sheets?',
          'How much does a custom AI automation or chatbot cost?',
          'What are the hosting & API costs of running n8n?'
        ]
      };
    }

    // 1.9. Specific: TASQ-ONE DAG validation & Groq Llama 3.3 70B AI
    if (
      q.includes('dag') || q.includes('kahn') || q.includes('topological') ||
      q.includes('tasq-one') || q.includes('tasq') || q.includes('llama 3.3')
    ) {
      return {
        replyText: `⚡ **TASQ-ONE: Autonomous Task OS with Groq Llama 3.3 70B AI:**\n\n• **Acyclic Dependency DAG Validation:** Uses Kahn's topological sort algorithm to validate task dependencies, ensuring development pipelines have zero circular deadlocks.\n• **Sub-400ms Decomposition:** Converts messy thoughts into production-ready Jira/Linear user stories, acceptance criteria, and story points in under 400ms.\n• **Cryptographic Audit Trails:** Immutable SHA-256 state tracking compliant with DPDP & SOC2 data governance.\n• **Stack:** Next.js 14, Groq Llama 3.3 70B, Supabase Postgres RLS, Upstash Redis, Docker.`,
        quickActions: [
          { label: '⚡ Explore TASQ-ONE Platform', action: () => { window.location.href = '/saas/tasq-one'; } },
          { label: '🚀 Explore All SaaS Suites', action: () => { window.location.href = '/saas'; } },
          { label: '📅 Book SaaS Engineering Call', action: () => openBookingFlow('SaaS Architecture') }
        ],
        assumptionQuestions: [
          'What tech stack do you recommend for high-scale SaaS?',
          'What database and authentication do you use for SaaS?',
          'Can you build a private SaaS platform for my company?'
        ]
      };
    }

    // 1.10. Specific: SaaS Architecture, Multi-tenancy & Stripe/Razorpay
    if (
      q.includes('multi tenant') || q.includes('database and auth') ||
      q.includes('supabase rls') || q.includes('recurring billing') || q.includes('stripe') || q.includes('razorpay')
    ) {
      return {
        replyText: `☁️ **Multi-Tenant SaaS Architecture & Automated Subscriptions:**\n\n• **Tenant Data Isolation:** PostgreSQL Row-Level Security (RLS) policies (\`tenant_id = auth.jwt()->>'tenant_id'\`) guarantee strict tenant data isolation.\n• **Automated Recurring Billing:** Pre-built webhooks for Stripe & Razorpay handling subscription creation, prorated upgrades, failed invoice retries, and customer portals.\n• **Scalable Cloud Setup:** Containerized Docker images ready for AWS ECS, Vercel, or Render with sub-second Edge response times.`,
        quickActions: [
          { label: '📅 Book SaaS MVP Strategy', action: () => openBookingFlow('SaaS Architecture') },
          { label: '💬 Inquire on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to discuss multi-tenant database and billing architecture for our SaaS.') }
        ],
        assumptionQuestions: [
          'What tech stack do you recommend for high-scale SaaS?',
          'How fast can Tushar deliver a working MVP?',
          'Can we start with a small paid pilot or proof-of-concept?'
        ]
      };
    }

    // 1.11. Specific: 100/100 Lighthouse & SEO
    if (
      q.includes('lighthouse') || q.includes('100/100') ||
      q.includes('seo ranking') || q.includes('core web vitals') || q.includes('page speed')
    ) {
      return {
        replyText: `⚡ **100/100 Google Lighthouse & Modern AEO/GEO SEO Standards:**\n\n• **Core Web Vitals:** Sub-800ms First Contentful Paint (FCP), 0 Cumulative Layout Shift (CLS), and sub-100ms INP.\n• **Semantic Architecture:** Full HTML5 semantic structure, JSON-LD Schema markup, dynamic Open Graph & Twitter meta tags.\n• **Pre-Rendering & Compression:** WebP/AVIF asset optimization, route-based code splitting, and zero render-blocking scripts.\n• **Result:** Maximum Google crawl efficiency and AI Search Engine (AEO/GEO) discoverability!`,
        quickActions: [
          { label: '📅 Book Website Audit Call', action: () => openBookingFlow('Performance Audit') },
          { label: '💬 Inquire on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want my website to achieve 100/100 Google Lighthouse score.') }
        ],
        assumptionQuestions: [
          'Can you redesign my existing slow WordPress or Wix site?',
          'Can I manage content easily without touching code?',
          'What is the turnaround time for a complete web MVP?'
        ]
      };
    }

    // 1.12. Specific: WordPress / Wix Migration to Modern React
    if (
      q.includes('wordpress') || q.includes('wix') ||
      q.includes('redesign my existing') || q.includes('migrate')
    ) {
      return {
        replyText: `🔄 **WordPress / Wix to Modern React/Next.js Migration:**\n\n• **Massive Speed Increase:** Drops page load from 4–6s down to under 800ms.\n• **100% SEO Preservation:** All existing URLs, slug structures, meta titles, and 301 redirects are preserved to protect your search ranking.\n• **Zero Maintenance Headaches:** No vulnerable PHP plugins, no constant security breaches, and zero database bloat.`,
        quickActions: [
          { label: '📅 Plan Website Migration', action: () => openBookingFlow('Website Migration') },
          { label: '💬 Message Tushar on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want to migrate my slow WordPress/Wix site to modern React/Next.js.') }
        ],
        assumptionQuestions: [
          'Do you ensure 100/100 Google Lighthouse and SEO ranking?',
          'Can I manage content easily without touching code?',
          'What are your pricing packages and rates?'
        ]
      };
    }

    // 1.13. Specific: Headless CMS / Non-technical content management
    if (
      q.includes('without code') || q.includes('without touching code') ||
      q.includes('cms') || q.includes('manage content')
    ) {
      return {
        replyText: `📝 **Headless CMS & Non-Technical Content Management:**\n\n• **Intuitive Visual Dashboard:** We integrate modern headless CMS platforms (Sanity, Strapi, Notion, or Supabase).\n• **Zero Coding Required:** Your marketing team can add blog posts, edit pricing plans, change images, and update testimonials through a friendly visual editor.\n• **Instant Live Publishing:** Content changes trigger automated rebuild webhooks, publishing changes live in seconds!`,
        quickActions: [
          { label: '📅 Book CMS Consultation', action: () => openBookingFlow('CMS Setup') },
          { label: '💬 Inquire on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I want a modern web platform where my team can manage content easily without code.') }
        ],
        assumptionQuestions: [
          'Do you ensure 100/100 Google Lighthouse and SEO ranking?',
          'What is the turnaround time for a complete web MVP?',
          'How much does a custom AI automation or chatbot cost?'
        ]
      };
    }

    // 1.14. Specific: Paid Pilot / Proof of Concept
    if (
      q.includes('pilot') || q.includes('proof-of-concept') ||
      q.includes('poc') || q.includes('start small')
    ) {
      return {
        replyText: `🎯 **Yes, absolutely! We love starting with a Paid Pilot:**\n\n• **Low Risk & Fast Validation:** We build a focused proof-of-concept (1 core workflow or 1 chatbot prototype) in **3 to 5 business days**.\n• **Test Working Chemistry:** Validate delivery speed, code quality, and communication before committing to the full enterprise contract.\n• **100% Credited:** The pilot fee is credited toward the full project if you decide to proceed!`,
        quickActions: [
          { label: '📅 Start a Paid Pilot', action: () => openBookingFlow('Paid Pilot') },
          { label: '💬 WhatsApp Tushar', action: () => sendDirectWhatsApp('Hi Tushar, I want to start with a small paid pilot project.') }
        ],
        assumptionQuestions: [
          'How does payment milestone structuring work?',
          'Can we sign an NDA before discussing project details?',
          'What are your pricing packages and rates?'
        ]
      };
    }

    // 1.15. Specific: Payment Milestone Structuring & Escrow
    if (
      q.includes('milestone') || (q.includes('payment') && q.includes('structur'))
    ) {
      return {
        replyText: `💳 **Milestone-Based Transparent Payment Structuring:**\n\n• **Standard Project Breakdown:**\n  - **Milestone 1 (30%):** Project kickoff, UX wireframes & architecture approval.\n  - **Milestone 2 (40%):** Functional beta build deployed on staging for client testing.\n  - **Milestone 3 (30%):** Final production launch, QA sign-off, and repository handover.\n• **Fiverr Escrow Protection:** You also have the option to hire via Fiverr Escrow, where funds remain locked until you personally approve the milestone deliverable!`,
        quickActions: [
          { label: '⭐ Hire via Fiverr Escrow', action: () => window.open(FIVERR_PROFILE_URL, '_blank', 'noopener,noreferrer') },
          { label: '📅 Discuss Milestones on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, can you explain how project milestones are structured?') }
        ],
        assumptionQuestions: [
          'Can we start with a small paid pilot or proof-of-concept?',
          'Do you offer free post-launch support and bug fixes?',
          'Can we sign an NDA before discussing project details?'
        ]
      };
    }

    // 1.16. Specific: Post-Launch Support & Warranty
    if (
      q.includes('post-launch') || q.includes('maintenance') ||
      q.includes('bug fixes') || q.includes('warranty') || q.includes('support after')
    ) {
      return {
        replyText: `🛠️ **Post-Launch Support & Warranty Guarantee:**\n\n• **14 to 30 Days Free Warranty:** Any bug, glitch, or alignment issue found post-launch is resolved immediately at zero charge.\n• **Comprehensive Handoff:** Includes clear architecture documentation and Loom video walkthroughs for your team.\n• **Ongoing Retainers Available:** Monthly retainer options available for continuous AI prompt tuning, feature iterations, and server uptime monitoring.`,
        quickActions: [
          { label: '📅 Book Support Plan Call', action: () => openBookingFlow('Support Retainer') },
          { label: '💬 Inquire on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, what post-launch support and maintenance do you offer?') }
        ],
        assumptionQuestions: [
          'Can we start with a small paid pilot or proof-of-concept?',
          'How does payment milestone structuring work?',
          'What are your pricing packages and rates?'
        ]
      };
    }

    // 1.17. Specific: Cold Email Deliverability & Anti-Spam
    if (
      q.includes('deliverability') || q.includes('spam') ||
      q.includes('spf') || q.includes('dkim') || q.includes('warmup')
    ) {
      return {
        replyText: `📬 **Cold Email Deliverability & Anti-Spam Engineering:**\n\n• **Domain Authentication:** Dedicated secondary sending domains configured with SPF, DKIM, DMARC, and custom tracking domains (CTD).\n• **Gradual Inbox Warmup:** 14-day automated warmup via Instantly/Smartlead mimicking natural human cadence.\n• **AI Personalization & Spintax:** Dynamic variables and spin syntax to ensure no two emails are identical, bypassing spam filters with 60%+ open rates.`,
        quickActions: [
          { label: '📅 Plan Lead Gen Pipeline', action: () => openBookingFlow('Lead Generation') },
          { label: '💬 WhatsApp Tushar', action: () => sendDirectWhatsApp('Hi Tushar, how do you handle email deliverability and avoid spam in outreach?') }
        ],
        assumptionQuestions: [
          'What data sources (Apollo/LinkedIn) are used for leads?',
          'Can leads automatically sync to our HubSpot or Notion CRM?',
          'What are your pricing packages and rates?'
        ]
      };
    }

    // 1.18. Specific: Emergency 48-Hour Sprint
    if (
      q.includes('48 hour') || q.includes('48-hour') ||
      q.includes('emergency') || q.includes('urgent')
    ) {
      return {
        replyText: `⚡ **48-Hour Emergency Sprint Delivery Available!**\n\n• **Ideal For:** Fast MVP demos, investor pitch deck prototypes, sudden client deadlines, or critical production bug fixes.\n• **Dedicated Focus:** Tushar focuses exclusively on your sprint with frequent staging updates.\n• **How to Initiate:** Message Tushar directly on WhatsApp with the keyword **"URGENT SPRINT"** for immediate confirmation!`,
        quickActions: [
          { label: '💬 Message Tushar on WhatsApp (Urgent)', action: () => sendDirectWhatsApp('Hi Tushar, I have an URGENT 48-HR SPRINT requirement. Are you available?') },
          { label: '📅 Schedule Immediate Call', action: () => openBookingFlow('Urgent Sprint') }
        ],
        assumptionQuestions: [
          'How often will I receive progress updates and staging previews?',
          'Can we launch in phased milestones?',
          'Can we sign an NDA before discussing project details?'
        ]
      };
    }

    // 1.19. Specific: NDA & Confidentiality
    if (
      q.includes('nda') || q.includes('non disclosure') || q.includes('confidential')
    ) {
      return {
        replyText: `📝 **Mutual NDA & Intellectual Property Protection:**\n\n• **100% Confidentiality:** We are happy to review and sign your standard Mutual Non-Disclosure Agreement (NDA) before discussing proprietary business logic or codebases.\n• **Full IP Ownership:** You retain 100% intellectual property rights, copyright, and source code ownership upon project completion and handover.`,
        quickActions: [
          { label: '📅 Book Confidential Strategy Audit', action: () => openBookingFlow('Confidential Project') },
          { label: '💬 Send NDA on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I would like to share an NDA before we discuss project specs.') }
        ],
        assumptionQuestions: [
          'What happens during the 30-min strategy audit?',
          'What are your available meeting time slots this week?',
          'Can we start with a small paid pilot or proof-of-concept?'
        ]
      };
    }

    // 1.20. Specific: What happens in 30-min Strategy Audit?
    if (
      q.includes('what happens during') || q.includes('strategy audit') ||
      q.includes('30-min strategy') || q.includes('prepare before the strategy')
    ) {
      return {
        replyText: `🎯 **What Happens in Your Free 30-Min Strategy Audit:**\n\n1. **Workflow & Bottleneck Analysis:** We identify manual tasks that waste time or leak revenue in your current operation.\n2. **Architecture Blueprint:** Tushar recommends the exact stack (e.g. n8n vs Python vs Next.js vs RAG).\n3. **Timeline & Cost Estimate:** Clear milestone plan and OpEx cost estimates with zero sales pressure.\n• **Preparation:** Simply bring your rough goal or existing process workflow!`,
        quickActions: [
          { label: '📝 Fill Booking Form Now', action: () => openBookingFlow() },
          { label: '💬 WhatsApp Directly', action: () => sendDirectWhatsApp('Hi Tushar, I want to book a free 30-min strategy audit.') }
        ],
        assumptionQuestions: [
          'What are your available meeting time slots this week?',
          'Can we sign an NDA before discussing project details?',
          'What are your pricing packages and rates?'
        ]
      };
    }

    // 1.21. Specific: Tech Stack Recommendation for SaaS / Web
    if (
      q.includes('tech stack') || q.includes('recommend for high-scale saas') ||
      (q.includes('recommend') && q.includes('stack'))
    ) {
      return {
        replyText: `🏗️ **Recommended Modern Tech Stack for High-Scale SaaS:**\n\n• **Frontend & SSR:** **Next.js 15 (App Router)** + React 19 + TypeScript + Tailwind CSS for sub-second UI speeds.\n• **Database & RLS:** **Supabase PostgreSQL** with strict Row-Level Security for multi-tenant isolation.\n• **Serverless Caching:** **Upstash Redis** for rate limiting, session caching, and sub-10ms response times.\n• **AI Models & Agents:** **Groq Llama 3.3 70B** (<400ms inference) + **OpenAI GPT-4o** for multi-modal tasks.\n• **Containerization & Hosting:** Docker containers deployed on AWS ECS, Render, or Vercel.`,
        quickActions: [
          { label: '🚀 View TASQ-ONE Architecture', action: () => { window.location.href = '/saas/tasq-one'; } },
          { label: '📅 Book Tech Architecture Call', action: () => openBookingFlow('Tech Stack Advisory') },
          { label: '💬 Inquire on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, what tech stack do you recommend for our new software platform?') }
        ],
        assumptionQuestions: [
          'How does TASQ-ONE validate dependency DAGs?',
          'What database and authentication do you use for SaaS?',
          'How fast can Tushar deliver a working MVP?'
        ]
      };
    }

    // ──────────────────────────────────────────────────────────────────────────
    // TIER 2: PRICING, COSTS & TIMELINES (MUST MATCH BEFORE GENERAL CATEGORIES)
    // ──────────────────────────────────────────────────────────────────────────

    // 2.1. PRICING & COSTS (Handles "How much does a custom AI automation or chatbot cost?", "What are your pricing packages and rates?", etc.)
    if (
      q.includes('price') || q.includes('cost') || q.includes('rate') ||
      q.includes('charges') || q.includes('fee') || q.includes('kitna') ||
      q.includes('budget') || q.includes('rupee') || q.includes('quote') || q.includes('how much')
    ) {
      return {
        replyText: `💰 **Transparent Pricing & Cost Estimates:**\n\n• **AI Workflow Automations (n8n / Python):** Typically **₹15,000 – ₹45,000** ($200 – $600) based on complexity and webhook integrations.\n• **Custom AI Chatbots & RAG (WhatsApp / Web):** Typically **₹25,000 – ₹60,000** ($350 – $800) including custom document training and WhatsApp API setup.\n• **Full-Stack Web MVPs & Funnels:** Typically **₹40,000 – ₹1,20,000** ($500 – $1,500) for complete production-ready platforms.\n• **Free Initial Consultation:** 100% Free 30-min strategy audit with zero commitment.\n• **Fiverr Escrow Protection:** 100% milestone buyer escrow available!`,
        quickActions: [
          { label: '📅 Get Custom Quote', action: () => openBookingFlow('Custom Quote') },
          { label: '⭐ View Fiverr Packages', action: () => window.open(FIVERR_PROFILE_URL, '_blank', 'noopener,noreferrer') },
          { label: '💬 Get Instant Estimate on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, can you give me an accurate pricing estimate for my project?') }
        ],
        assumptionQuestions: [
          'Can we start with a small paid pilot or proof-of-concept?',
          'How does payment milestone structuring work?',
          'What are the typical costs for an n8n automation project?',
          'Do you offer free post-launch support and bug fixes?'
        ]
      };
    }

    // 2.2. TIMELINES & SPEED (Handles "How fast can Tushar deliver a working MVP?", "Delivery timeline?", etc.)
    if (
      q.includes('timeline') || q.includes('turnaround') || q.includes('how fast') ||
      q.includes('delivery time') || q.includes('kab tak') || q.includes('duration') || q.includes('delivery timeline')
    ) {
      return {
        replyText: `⏱️ **Project Delivery Timelines & Milestones:**\n\n• **AI Automations & n8n Workflows:** **3 to 7 business days**\n• **Custom AI Chatbots & RAG Systems:** **5 to 10 business days**\n• **High-Converting Landing Pages:** **3 to 5 business days**\n• **Full-Stack SaaS MVPs:** **7 to 14 business days**\n• **Express 48-Hour Emergency Sprint:** Available for urgent client requirements.\n\nWe provide daily milestone previews on staging URLs so you see live progress every step of the way!`,
        quickActions: [
          { label: '📅 Plan My Timeline', action: () => openBookingFlow('Timeline Planning') },
          { label: '💬 Check Availability on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I have a specific deadline and want to check your availability.') }
        ],
        assumptionQuestions: [
          'Can you deliver an emergency prototype in 48 hours?',
          'How often will I receive progress updates and staging previews?',
          'Can we launch in phased milestones?'
        ]
      };
    }

    // ──────────────────────────────────────────────────────────────────────────
    // TIER 3: BROAD DOMAIN INQUIRIES (FALLBACK CATEGORIES)
    // ──────────────────────────────────────────────────────────────────────────

    // 3.1. Booking / Contact / Hire
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

    // 3.2. AI Automation & n8n
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
          'Can n8n connect with WhatsApp and Google Sheets?',
          'What are the hosting & API costs of running n8n?',
          'Which business workflows can n8n automate?',
          'How does automated error handling work in production?'
        ]
      };
    }

    // 3.3. AI Chatbots & RAG
    if (
      q.includes('chatbot') || q.includes('bot') || q.includes('rag') ||
      q.includes('support agent') || q.includes('whatsapp bot') || q.includes('telegram')
    ) {
      return {
        replyText: `🤖 **Enterprise AI Chatbots, RAG Knowledge Bases & WhatsApp Commerce:**\n\n• **Capabilities:** 24/7 multilingual assistance, document-trained RAG (PDFs, Notion, DBs), automated lead qualification, and appointment booking.\n• **Channels:** Web embed widget, WhatsApp Business Cloud API, Telegram, and Slack.\n• **Proven Results:** **70% support ticket reduction** and immediate 0-second customer response time.\n• **Live SaaS Showcase:** Try our proprietary **Saathi Bot** live on the right side of the screen right now!\n• **Tech:** OpenAI, LangChain, Pinecone vector search, Python FastAPI, React.`,
        quickActions: [
          { label: '🤖 Test Saathi Bot Widget', action: () => { window.dispatchEvent(new CustomEvent('open-saathi-widget')); } },
          { label: '📅 Book Chatbot Consultation', action: () => openBookingFlow('Chatbot Development') },
          { label: '💬 Discuss on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, I need a custom AI Chatbot for my business.') }
        ],
        assumptionQuestions: [
          'Can I test the Saathi Bot demo widget right now?',
          'How does RAG prevent hallucinations in bot answers?',
          'How does WhatsApp Business API integration work?',
          'Can the chatbot speak Hindi, English and regional languages?'
        ]
      };
    }

    // 3.4. Proprietary SaaS Suites
    if (
      q.includes('saas') || q.includes('software') || q.includes('product')
    ) {
      return {
        replyText: `☁️ **Tushar's Proprietary SaaS Ecosystem & Custom MVP Engineering:**\n\n1. **Saathi Bot (v1.0.0):** Autonomous B2B AI Chatbot platform with embeddable zero-latency widget, FAQ crawler, and live lead qualification.\n2. **TASQ-ONE (v1.4.0):** The Intelligent Task OS with Groq Llama 3.3 70B AI task decomposition, topological acyclic Kanban DAG validation, sub-400ms latency, and cryptographic audit trails.\n3. **Custom SaaS MVP Engineering:** Multi-tenant architecture, Supabase PostgreSQL RLS, Stripe/Razorpay billing, and Docker containerization.\n• **Delivery Timeline:** Fully functional production MVP in **2 to 4 weeks**.`,
        quickActions: [
          { label: '🚀 Explore SaaS Suites Page', action: () => { window.location.href = '/saas'; } },
          { label: '⚡ Test TASQ-ONE Platform', action: () => { window.location.href = '/saas/tasq-one'; } },
          { label: '📅 Book SaaS MVP Call', action: () => openBookingFlow('Custom SaaS & MVP Engineering') }
        ],
        assumptionQuestions: [
          'What tech stack do you recommend for high-scale SaaS?',
          'How does TASQ-ONE validate dependency DAGs?',
          'Can you build a private SaaS platform for my company?',
          'How do you handle automated Stripe & Razorpay recurring billing?'
        ]
      };
    }

    // 3.5. Web Development
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

    // 3.6. Lead Generation
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

    // 3.7. About Tushar
    if (
      q.includes('about') || q.includes('who is') || q.includes('tushar') ||
      q.includes('education') || q.includes('location') || q.includes('mca') ||
      q.includes('experience') || q.includes('delhi') || q.includes('kahan') || q.includes('singh')
    ) {
      return {
        replyText: `👨‍💻 **About Tushar Singh (Code with Mr Singh):**\n\n• **Role:** AI Automation Engineer, Full-Stack Architect & SaaS Founder\n• **Education:** Master of Computer Applications (MCA), MIT Pune\n• **Location:** Badarpur, New Delhi, India (Serving clients across India, US, UK & Middle East)\n• **Verified Badges:** Google Verified Business Owner, Fiverr Verified Seller with 4.0 ★ rating\n• **Track Record:** ₹2L+ Commercial Value Delivered across 10+ production software products\n• **Core Tech:** Python, React, Next.js, n8n, OpenAI, Django, PostgreSQL, Docker.`,
        quickActions: [
          { label: '📄 View About Page', action: () => { window.location.href = '/about'; } },
          { label: '⭐ Fiverr Profile', action: () => window.open(FIVERR_PROFILE_URL, '_blank', 'noopener,noreferrer') },
          { label: '💬 Connect on WhatsApp', action: () => sendDirectWhatsApp('Hi Tushar, nice to connect with you!') }
        ],
        assumptionQuestions: [
          'Are you available for international / remote freelance contracts?',
          'Can I see client reviews and ratings on Fiverr?',
          'What is your educational & technical background?'
        ]
      };
    }

    // 3.8. Security & Pentesting
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

    // 3.9. Default Fallback
    return {
      replyText: `🤖 Thanks for your question! Tushar Singh specializes across:\n\n1. **AI Automation** (n8n workflows, Python autonomous agents, CRM syncs)\n2. **Custom AI Chatbots & RAG** (WhatsApp Business API, Web Widgets, Saathi Bot)\n3. **Full-Stack Web Development** (React 19, Next.js 14, Django, 100/100 Lighthouse)\n4. **Proprietary SaaS Suites** (Saathi Bot, TASQ-ONE, Cloud MVPs)\n5. **B2B Lead Generation Engines** (Apollo, LinkedIn, cold email infrastructure)\n\nWould you like to book a free 30-min strategy call or explore any of the assumption questions below?`,
      quickActions: [
        { label: '📅 Book Free 30-Min Audit', action: () => openBookingFlow() },
        { label: '🚀 AI Automation Info', action: () => handleSendPreset('Tell me about AI Automation') },
        { label: '🤖 AI Chatbot Info', action: () => handleSendPreset('Tell me about AI Chatbot Development') },
        { label: '💬 Direct WhatsApp Chat', action: () => sendDirectWhatsApp(`Hi Tushar, I had a question regarding: "${query}"`) }
      ],
      assumptionQuestions: [
        'How much does a custom AI automation or chatbot cost?',
        'Can I test the Saathi Bot demo widget right now?',
        'How fast can Tushar deliver a working MVP?',
        'What tech stack do you recommend for high-scale SaaS?'
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
    window.open(`https://wa.me/${TUSHAR_PHONE}?text=${encoded}`, '_blank', 'noopener,noreferrer');
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
      {/* ─── Floating Trigger Button (Bottom-Left) ─── */}
      {showTrigger && (
        <div className="fixed bottom-3 left-3 sm:bottom-6 sm:left-8 z-[120] group">
          {!isOpen && (
            <div className="relative flex flex-col items-center">
              <button
                onClick={handleOpen}
                aria-label="Open Tushar AI Assistant Chatbot"
                title="Tushar AI Assistant — Services, Projects & Instant Booking"
                className="relative flex items-center justify-center p-0 transition-all duration-300 active:scale-90 focus:outline-none cursor-pointer group/mascot"
              >
                {/* 3D Gyro Orbit Ring around mascot (Innovative energy shield) */}
                <div className="absolute -inset-3 pointer-events-none flex items-center justify-center -z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-cyan-400/35 border-dashed animate-gyro-ring shadow-[0_0_15px_rgba(34,211,238,0.25)]" />
                </div>

                {/* Ambient Soft Cyan Pulse Aura (No green dot) */}
                <span className="absolute inset-1 rounded-full bg-cyan-400/20 blur-md animate-pulse -z-10" />

                {/* AI Assistant Mascot with 3D Automove & Flip Animation */}
                <div className="animate-bot-automove-flip">
                  <img
                    src="/tushar-ai-icon.png"
                    alt="Tushar AI Assistant Mascot"
                    className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-[0_12px_28px_rgba(34,211,238,0.55)] group-hover/mascot:drop-shadow-[0_20px_45px_rgba(34,211,238,0.85)] group-hover/mascot:scale-110 transition-all duration-300 select-none pointer-events-none"
                  />
                </div>
              </button>

              {/* Dynamic 3D Ground Shadow that scales with mascot float height */}
              <div className="w-8 sm:w-10 h-1.5 bg-cyan-950/60 dark:bg-black/60 rounded-full blur-xs mt-1 animate-bot-shadow pointer-events-none" />
            </div>
          )}

          {/* Hover Tooltip (Desktop) */}
          {!isOpen && (
            <div className="absolute bottom-full left-0 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-y-1 group-hover:translate-y-0 hidden sm:block">
              <div className="bg-slate-900/95 backdrop-blur-md text-white text-[10px] font-bold px-3.5 py-2 rounded-xl border border-cyan-500/30 shadow-2xl whitespace-nowrap flex items-center gap-2">
                <Sparkles size={12} className="text-cyan-400" />
                <span>Tushar AI Assistant · Free Consultation &lt; 1 Hr</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ─── Chat Window Modal with Open & Close Animations ────────── */}
      {(isOpen || isClosing) && (
        <div
          className={`fixed inset-x-2 bottom-2 sm:inset-x-auto sm:left-6 md:left-8 sm:bottom-6 z-[200] w-[calc(100vw-1rem)] sm:w-[440px] md:w-[460px] max-h-[calc(100dvh-1rem)] sm:max-h-[85vh] h-[min(650px,calc(100dvh-1.5rem))] sm:h-[660px] flex flex-col bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-indigo-500/30 overflow-hidden backdrop-blur-xl ${
            isClosing ? 'animate-chat-close pointer-events-none' : 'animate-chat-open'
          }`}
          role="dialog"
          aria-label="Tushar AI Assistant"
        >
          {/* ── Top Header ── */}
          <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 p-3 sm:p-4 border-b border-indigo-500/20 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="relative shrink-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-slate-950 p-1 flex items-center justify-center shadow-md border border-cyan-400/40 overflow-hidden">
                  <img
                    src="/tushar-ai-icon.png"
                    alt="Tushar AI Assistant Logo"
                    className="w-full h-full object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] animate-pulse [animation-duration:4s]"
                  />
                </div>
                {/* Electric Cyan live beacon instead of green dot */}
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-cyan-400 rounded-full border-2 border-slate-950 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h3 className="font-outfit font-black text-xs sm:text-sm text-white tracking-wide truncate">
                    Tushar AI Assistant
                  </h3>
                  <span className="px-1.5 py-0.5 bg-cyan-500/20 text-cyan-300 text-[8px] font-black rounded-md uppercase tracking-wider border border-cyan-400/30 shrink-0 animate-pulse">
                    Live
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-400 flex items-center gap-1.5 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
                  <span className="truncate">Answers Services, Projects &amp; Instant Booking</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <button
                onClick={handleResetChat}
                title="Reset Conversation"
                className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:rotate-180 cursor-pointer"
                aria-label="Reset Chat"
              >
                <RefreshCw size={14} className="sm:w-[15px] sm:h-[15px]" />
              </button>
              <button
                onClick={handleClose}
                className="p-1.5 sm:p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 hover:scale-110 cursor-pointer"
                aria-label="Close Assistant"
              >
                <X size={16} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </div>

          {/* ── Sub-header Banner: Free Consultation & Direct WhatsApp ── */}
          <div className="bg-slate-950/95 px-3 sm:px-4 py-1.5 sm:py-2 border-b border-indigo-500/20 flex items-center justify-between text-[10px] sm:text-[11px] shrink-0 gap-2">
            <div className="flex items-center gap-1.5 text-cyan-300 font-semibold min-w-0 truncate">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="truncate text-[9.5px] sm:text-[11px]">Free Consultation • &lt; 1 Hr Response</span>
            </div>
            <button
              onClick={() => sendDirectWhatsApp('Hi Tushar, I want to connect directly from your AI Assistant.')}
              className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[9px] sm:text-[10px] font-bold transition-all duration-200 hover:scale-105 active:scale-95 shrink-0 cursor-pointer"
            >
              <MessageCircle size={11} className="text-emerald-400 sm:w-3 sm:h-3" />
              <span>Direct WhatsApp</span>
            </button>
          </div>

          {/* ── Messages Scroll Area ── */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 sm:gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-950 p-0.5 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-500/30 shadow-2xs overflow-hidden">
                    <img
                      src="/tushar-ai-icon.png"
                      alt="Tushar AI"
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="max-w-[90%] sm:max-w-[86%] space-y-1.5 sm:space-y-2">
                  <div
                    className={`p-2.5 sm:p-3.5 rounded-2xl leading-relaxed text-[11px] sm:text-[12px] shadow-xs relative group/msg transition-all duration-200 ${
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
                              <div className="flex items-center gap-0.5 px-0.5 text-cyan-400">
                                <span className="w-0.5 h-3 bg-cyan-400 rounded-full animate-soundwave-1" />
                                <span className="w-0.5 h-2 bg-cyan-400 rounded-full animate-soundwave-2" />
                                <span className="w-0.5 h-3.5 bg-cyan-400 rounded-full animate-soundwave-3" />
                              </div>
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
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-0.5">
                      {msg.quickActions.map((qa, qaIdx) => (
                        <button
                          key={qaIdx}
                          onClick={qa.action}
                          className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20 text-[9px] sm:text-[10px] font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xs active:scale-95 shadow-2xs cursor-pointer"
                        >
                          <span>{qa.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ── Contextual Assumption / Deep-Dive Questions ── */}
                  {msg.assumptionQuestions && msg.assumptionQuestions.length > 0 && (
                    <div className="pt-1.5 space-y-1">
                      <div className="flex items-center gap-1 text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-cyan-400/80">
                        <Lightbulb size={10} className="text-amber-400 sm:w-[11px] sm:h-[11px]" />
                        <span>Suggested Follow-up Questions:</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {msg.assumptionQuestions.map((qText, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleSendMessage(qText)}
                            className="w-full text-left px-2 sm:px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/70 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/70 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-cyan-300 border border-slate-200/70 dark:border-slate-800 text-[9.5px] sm:text-[10.5px] leading-snug transition-all duration-200 hover:translate-x-1 hover:border-indigo-400/40 flex items-center justify-between group/q cursor-pointer"
                          >
                            <span className="line-clamp-2 pr-1">{qText}</span>
                            <ChevronRight size={12} className="opacity-40 group-hover/q:opacity-100 group-hover/q:translate-x-1 transition-all shrink-0 text-cyan-400" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg sm:rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User size={12} className="sm:w-[14px] sm:h-[14px]" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 sm:gap-2.5 items-center animate-in fade-in-0 slide-in-from-bottom-1 duration-200">
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-slate-950 p-0.5 flex items-center justify-center shrink-0 border border-cyan-500/30 overflow-hidden shadow-2xs animate-pulse">
                  <img
                    src="/tushar-ai-icon.png"
                    alt="Tushar AI"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl rounded-tl-none border border-slate-200/80 dark:border-white/5 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 animate-bounce [animation-duration:0.8s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 animate-bounce [animation-duration:0.8s] [animation-delay:0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-cyan-400 animate-bounce [animation-duration:0.8s] [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            {/* ── In-Chat Interactive Booking Form ── */}
            {showBookingForm && (
              <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-indigo-950/40 border-2 border-indigo-500/40 shadow-lg space-y-2.5 sm:space-y-3 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-indigo-200/60 dark:border-indigo-500/20 pb-1.5 sm:pb-2">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-indigo-600 dark:text-indigo-400 sm:w-[15px] sm:h-[15px]" />
                    <h4 className="font-outfit font-black text-[11px] sm:text-xs text-slate-900 dark:text-white">
                      Book Free 30-Min Strategy Call
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer p-0.5"
                  >
                    <X size={14} />
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-2 sm:space-y-2.5">
                  <div>
                    <label className="block text-[8.5px] sm:text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-0.5 sm:mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma / Alex"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[8.5px] sm:text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-0.5 sm:mb-1">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[8.5px] sm:text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-0.5 sm:mb-1">
                      What do you need help with?
                    </label>
                    <select
                      value={bookingService}
                      onChange={(e) => setBookingService(e.target.value)}
                      className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-[11px] sm:text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-medium"
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
                    <label className="block text-[8.5px] sm:text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-0.5 sm:mb-1">
                      Preferred Date &amp; Time (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tomorrow at 4:00 PM IST"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[8.5px] sm:text-[9px] font-black uppercase text-slate-600 dark:text-slate-300 mb-0.5 sm:mb-1">
                      Project Notes / Goal (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Briefly describe what you want to build or automate..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <MessageCircle size={14} className="sm:w-[15px] sm:h-[15px]" />
                    <span>Confirm &amp; Send to WhatsApp</span>
                    <ArrowRight size={13} className="sm:w-[14px] sm:h-[14px]" />
                  </button>
                  <p className="text-[8px] sm:text-[8.5px] text-center text-slate-500 dark:text-slate-400">
                    ⚡ Instant connection with Tushar Singh on WhatsApp (&lt; 1 hour response)
                  </p>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Assumption Questions Quick Bar (Collapsible / Scrollable) ── */}
          {showAssumptionBar && (
            <div className="px-2.5 sm:px-3 py-1.5 sm:py-2 bg-slate-100/90 dark:bg-slate-950/90 border-t border-slate-200 dark:border-white/5 flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[8.5px] sm:text-[9px] font-black uppercase text-slate-500 dark:text-cyan-400/90 shrink-0 flex items-center gap-0.5 sm:gap-1">
                <HelpCircle size={10} className="text-cyan-400 sm:w-[11px] sm:h-[11px]" />
                <span>Ask:</span>
              </span>
              <button
                onClick={() => handleSendMessage('What are your pricing packages and rates?')}
                className="shrink-0 px-2 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-[9.5px] sm:text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                💰 Cost &amp; Rates?
              </button>
              <button
                onClick={() => handleSendMessage('How does Saathi Bot capture leads and handle FAQs?')}
                className="shrink-0 px-2 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-[9.5px] sm:text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                🤖 Saathi Bot Demo?
              </button>
              <button
                onClick={() => handleSendMessage('What is your delivery timeline for an MVP?')}
                className="shrink-0 px-2 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-[9.5px] sm:text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                ⏱️ Delivery Timeline?
              </button>
              <button
                onClick={() => handleSendMessage('How does TASQ-ONE break down project tasks?')}
                className="shrink-0 px-2 py-1 rounded-md bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 text-[9.5px] sm:text-[10px] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                ⚡ TASQ-ONE AI?
              </button>
              <button
                onClick={() => openBookingFlow()}
                className="shrink-0 px-2 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 text-[9.5px] sm:text-[10px] text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
              >
                📅 Free Audit Call
              </button>
            </div>
          )}

          {/* ── Input Bar ── */}
          <div className="p-2 sm:p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5 sm:gap-2"
            >
              <input
                type="text"
                placeholder="Ask about AI, Web, Chatbots, Pricing, Timelines..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] sm:text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors shadow-inner"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white flex items-center justify-center transition-all duration-200 shrink-0 active:scale-95 shadow-md shadow-indigo-600/30 cursor-pointer disabled:cursor-not-allowed disabled:shadow-none hover:scale-105"
                aria-label="Send message"
              >
                <Send size={14} className={`sm:w-4 sm:h-4 transition-transform duration-200 ${inputText.trim() ? 'translate-x-0.5 -translate-y-0.5 scale-110' : ''}`} />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;