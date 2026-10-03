import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ShieldCheck, Lock, ArrowRight,
  Zap, Layers, CheckCircle2, ChevronRight, Copy, Check,
  Terminal, Server, ExternalLink, RefreshCw,
  Cpu, FileText, Database, Play,
  Calendar, Send, HelpCircle, ArrowLeft,
  CheckCircle, Sliders, DollarSign, Globe, CheckSquare
} from 'lucide-react';
import {
  SAATHI_BOT_URL,
  SAATHI_BOT_WIDGET_SCRIPT
} from '../constants';

/* ─── Conversational Scenarios for Live RAG Playground ──────────────────── */
interface SimulationScenario {
  id: string;
  category: string;
  badgeColor: string;
  userQuery: string;
  queryType: string;
  retrievalTelemetry: {
    denseVectorCosine: number;
    lexicalScore: number;
    rrfScore: number;
    confidencePassed: boolean;
    llmBilled: boolean;
    latencyMs: number;
    detectedIntent?: string;
  };
  botResponse: string;
  citations?: { title: string; url: string }[];
  showBookingTrigger?: boolean;
}

const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'ecommerce-support',
    category: 'E-Commerce (Returns & Shipping)',
    badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/40 dark:border-cyan-800/60',
    userQuery: 'What is your refund processing timeline and shipping policy for domestic orders?',
    queryType: 'Order Support',
    retrievalTelemetry: {
      denseVectorCosine: 0.892,
      lexicalScore: 0.915,
      rrfScore: 0.0324,
      confidencePassed: true,
      llmBilled: true,
      latencyMs: 685,
    },
    botResponse: 'Standard domestic shipping is completely free for orders above $50 (delivered within 2-4 business days). Once a return is requested, our courier picks up the package within 24 to 48 hours. After inspection, your full refund is credited back to your original payment method within 3 to 5 business days.',
    citations: [
      { title: 'Shipping & Delivery Guidelines (v2.4)', url: 'https://demo-store.com/shipping-policy' },
      { title: 'Returns & Instant Refund FAQ', url: 'https://demo-store.com/returns' }
    ]
  },
  {
    id: 'clinic-booking',
    category: 'Healthcare & Clinic (In-Chat Booking)',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/40 dark:border-emerald-800/60',
    userQuery: 'Will the clinic be open tomorrow? I want to schedule a specialist consultation appointment.',
    queryType: 'Booking Intent',
    retrievalTelemetry: {
      denseVectorCosine: 0.924,
      lexicalScore: 0.880,
      rrfScore: 0.0341,
      confidencePassed: true,
      llmBilled: true,
      latencyMs: 720,
      detectedIntent: 'BOOKING_INTENT_REGEX: /consultation|book|appointment/'
    },
    botResponse: 'Yes, our clinic is open tomorrow from 9:00 AM to 8:00 PM. Our lead specialist has OPD consultation slots available between 10:30 AM and 2:00 PM. You can click the button below to reserve your slot directly without leaving this conversation.',
    citations: [
      { title: 'Clinic OPD Schedule & Doctor Roster', url: 'https://careclinic.com/opd-hours' },
      { title: 'Specialist Consultation Pricing', url: 'https://careclinic.com/doctors' }
    ],
    showBookingTrigger: true
  },
  {
    id: 'enterprise-security',
    category: 'Enterprise API & Data Isolation',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200 dark:text-indigo-300 dark:bg-indigo-950/40 dark:border-indigo-800/60',
    userQuery: 'How does multi-tenant vector isolation work and what are the developer API endpoints?',
    queryType: 'Enterprise Architecture',
    retrievalTelemetry: {
      denseVectorCosine: 0.942,
      lexicalScore: 0.910,
      rrfScore: 0.0348,
      confidencePassed: true,
      llmBilled: true,
      latencyMs: 710,
    },
    botResponse: 'Saathi Bot enforces multi-tenancy through triple redundancy: PostgreSQL Row-Level Security (RLS) bound to authenticated tenant IDs, a denormalized bot_id evaluated before HNSW vector graph traversal, and automated CI test suites blocking cross-tenant leakage. Headless integrations utilize streaming SSE via POST /api/v1/bots/:id/chat.',
    citations: [
      { title: 'Multi-Tenant Security & pgvector Spec', url: 'https://saathi-bot.vercel.app/docs/security' },
      { title: 'Developer API v1 Reference', url: 'https://saathi-bot.vercel.app/docs/api' }
    ]
  },
  {
    id: 'confidence-gate',
    category: 'Out-of-Scope (Confidence Gate Intercept)',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950/40 dark:border-amber-800/60',
    userQuery: 'Who won the 2011 ICC Cricket World Cup final tournament?',
    queryType: 'Confidence Gate Fallback',
    retrievalTelemetry: {
      denseVectorCosine: 0.284,
      lexicalScore: 0.000,
      rrfScore: 0.0000,
      confidencePassed: false,
      llmBilled: false,
      latencyMs: 24,
      detectedIntent: 'OUT_OF_SCOPE_INTERCEPT (Score < 0.55)'
    },
    botResponse: 'I could not find authoritative information regarding this topic in our verified knowledge base. Please reach out to our human support desk or leave an inquiry for assistance.',
    citations: []
  }
];

export const SaathiBot: React.FC = () => {
  /* ── 1. Interactive RAG Simulator State ── */
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0);
  const [customQueryInput, setCustomQueryInput] = useState(SIMULATION_SCENARIOS[0].userQuery);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentScenario, setCurrentScenario] = useState<SimulationScenario>(SIMULATION_SCENARIOS[0]);

  /* ── 2. In-Widget Booking Form Simulation ── */
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: 'David Miller',
    email: 'david.miller@example.com',
    phone: '+1 (555) 234-5678',
    dateTime: 'Tomorrow at 11:30 AM',
    notes: 'Initial consultation regarding service implementation'
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  /* ── 3. Interactive Support ROI Calculator State ── */
  const [monthlyInquiries, setMonthlyInquiries] = useState(4000);
  const [supportAgents, setSupportAgents] = useState(3);
  const [agentSalaryUSD, setAgentSalaryUSD] = useState(2500);
  const [outOfScopePercent, setOutOfScopePercent] = useState(30);

  /* ── 4. Pricing Currency State ── */
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');

  /* ── 5. Embed Platform Code Selector ── */
  const [selectedEmbedTab, setSelectedEmbedTab] = useState<'html' | 'shopify' | 'wordpress' | 'webflow' | 'nextjs'>('html');

  /* ── 6. Copy Feedback States ── */
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  /* ── 7. FAQ Accordion State ── */
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  /* ── Calculate ROI Metrics ── */
  const roiCalculations = useMemo(() => {
    const currentHumanDeskCost = supportAgents * agentSalaryUSD;
    // Saathi Bot plan cost ($69 Pro for 4k queries)
    const saathiBotCost = monthlyInquiries > 2500 ? 69 : 29;
    const monthlyNetSavings = Math.max(0, currentHumanDeskCost - saathiBotCost);
    const annualNetSavings = monthlyNetSavings * 12;
    const hoursSavedPerWeek = Math.round(supportAgents * 28);
    // Confidence Gate savings: percentage of inquiries resolved in 24ms at zero token cost
    const zeroTokenQueries = Math.round((monthlyInquiries * outOfScopePercent) / 100);
    const tokenSavingsPct = Math.min(45, Math.round(outOfScopePercent * 1.1 + 8));

    return {
      currentHumanDeskCost,
      saathiBotCost,
      monthlyNetSavings,
      annualNetSavings,
      hoursSavedPerWeek,
      zeroTokenQueries,
      tokenSavingsPct
    };
  }, [monthlyInquiries, supportAgents, agentSalaryUSD, outOfScopePercent]);

  /* ── Simulate RAG Execution ── */
  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      if (customQueryInput !== SIMULATION_SCENARIOS[activeScenarioIdx].userQuery) {
        const isBooking = /book|appointment|meeting|demo|call|schedule|consultation/i.test(customQueryInput);
        const isOutOfScope = /cricket|weather|president|sports|joke|song|movie|celebrity/i.test(customQueryInput);

        if (isOutOfScope) {
          setCurrentScenario({
            id: 'custom-out',
            category: 'Custom Query (Confidence Gate Intercept)',
            badgeColor: 'text-amber-700 bg-amber-50 border-amber-200 dark:text-amber-300 dark:bg-amber-950/40 dark:border-amber-800/60',
            userQuery: customQueryInput,
            queryType: 'Confidence Gate Fallback',
            retrievalTelemetry: {
              denseVectorCosine: 0.312,
              lexicalScore: 0.000,
              rrfScore: 0.0000,
              confidencePassed: false,
              llmBilled: false,
              latencyMs: 24,
              detectedIntent: 'OUT_OF_SCOPE_INTERCEPT (Score < 0.55)'
            },
            botResponse: 'I could not find authoritative information regarding this topic in our verified knowledge base. Please reach out to our support team directly or leave an inquiry.',
            citations: []
          });
        } else {
          setCurrentScenario({
            id: 'custom-in',
            category: isBooking ? 'Appointment Booking Inquiry' : 'Verified Knowledge Base Query',
            badgeColor: 'text-cyan-700 bg-cyan-50 border-cyan-200 dark:text-cyan-300 dark:bg-cyan-950/40 dark:border-cyan-800/60',
            userQuery: customQueryInput,
            queryType: isBooking ? 'Booking Intent' : 'Knowledge Query',
            retrievalTelemetry: {
              denseVectorCosine: 0.895,
              lexicalScore: 0.880,
              rrfScore: 0.0325,
              confidencePassed: true,
              llmBilled: true,
              latencyMs: 710,
              detectedIntent: isBooking ? 'BOOKING_INTENT_REGEX Match' : undefined
            },
            botResponse: isBooking
              ? `Thank you for your interest! Your scheduling request for "${customQueryInput}" has been received. Please complete the quick appointment form below to lock in your preferred time.`
              : `Regarding your query "${customQueryInput}": Based on our verified product documentation, all relevant details are tracked in your client portal with complete source citations and sub-second response times.`,
            citations: [
              { title: 'Official Knowledge Base & Service Guidelines', url: 'https://saathi-bot.vercel.app/docs' }
            ],
            showBookingTrigger: isBooking
          });
        }
      } else {
        setCurrentScenario(SIMULATION_SCENARIOS[activeScenarioIdx]);
      }
      setIsSimulating(false);
    }, 550);
  };

  const copySnippet = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  /* ── Embed Code Snippets ── */
  const embedCodeSnippets = {
    html: `<!-- Saathi Bot Embed: Paste before </body> tag -->
<script 
  src="${SAATHI_BOT_WIDGET_SCRIPT}" 
  data-bot="YOUR_PUBLIC_BOT_ID" 
  async>
</script>`,
    shopify: `<!-- Shopify: Add to layout/theme.liquid right before </body> -->
<script 
  src="${SAATHI_BOT_WIDGET_SCRIPT}" 
  data-bot="YOUR_PUBLIC_BOT_ID" 
  async>
</script>`,
    wordpress: `<!-- WordPress: Add to footer.php before <?php wp_footer(); ?> -->
<script 
  src="${SAATHI_BOT_WIDGET_SCRIPT}" 
  data-bot="YOUR_PUBLIC_BOT_ID" 
  async>
</script>`,
    webflow: `<!-- Webflow: Project Settings > Custom Code > Footer Code -->
<script 
  src="${SAATHI_BOT_WIDGET_SCRIPT}" 
  data-bot="YOUR_PUBLIC_BOT_ID" 
  async>
</script>`,
    nextjs: `// Next.js 14/15/16 App Router (app/layout.tsx)
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script 
          src="${SAATHI_BOT_WIDGET_SCRIPT}" 
          data-bot="YOUR_PUBLIC_BOT_ID" 
          strategy="lazyOnload" 
        />
      </body>
    </html>
  );
}`
  };

  /* ── Essential FAQs ── */
  const faqs = [
    {
      q: 'What is Saathi Bot and what problem does it solve?',
      a: 'Saathi Bot is an autonomous conversational AI and commerce platform that transforms any website, documentation portal, or sitemap into an accurate, grounded assistant. It solves the three fatal problems of legacy chatbots: hallucinations that mislead customers, runaway LLM token bills on irrelevant questions, and heavy iframe widgets that conflict with host website styles.'
    },
    {
      q: 'How does the Pre-LLM Confidence Gate guarantee 0% hallucinations and cut AI costs by 41%?',
      a: 'Traditional chatbots immediately send every visitor message to expensive generative LLMs, billing tokens even for irrelevant or unanswerable queries. Saathi Bot evaluates the raw cosine similarity score from pgvector before making an LLM call. If no knowledge base chunk meets the 0.55 confidence threshold, the query exits in 24 milliseconds at exactly $0.000 token cost.'
    },
    {
      q: 'Why was a native Shadow DOM Web Component chosen over traditional iframes?',
      a: 'Traditional iframes introduce heavy overhead (~250 KB), cause layout flickering, fail responsive mobile styling, and suffer from cross-origin security issues. Saathi Bot uses an 18 KB zero-dependency Web Component rendered in an encapsulated Shadow Root. Host website CSS (Tailwind, Bootstrap, or custom stylesheets) can never break the chat interface, and the host origin is cryptographically verified.'
    },
    {
      q: 'How does the in-chat booking and Google Sheets sync work?',
      a: 'When an appointment or consultation intent is detected, Saathi Bot opens an inline booking drawer directly inside the chat interface. Upon form submission, it creates an encrypted record in PostgreSQL and fires a background Next.js task that appends the row to Google Sheets via OAuth v4 in real time, eliminating external redirect drop-off.'
    },
    {
      q: 'What is the "Zero-AWS" architecture and why was it chosen?',
      a: 'Rather than managing complex AWS clusters, unpredictable bandwidth egress fees, and rigid IAM policies, Saathi Bot runs entirely on Vercel (Edge CDN & Serverless Compute) and Supabase (PostgreSQL 15+, pgvector HNSW indexing, and Edge Functions). This architecture guarantees 99.9% uptime, sub-second first-token streaming, and mathematical tenant isolation with zero DevOps overhead.'
    },
    {
      q: 'Can enterprise clients Bring Their Own Keys (BYOK)?',
      a: 'Yes. Enterprise organizations can configure custom API keys for Google Gemini, Groq Cloud, OpenAI GPT-4o, Anthropic Claude 3.7, or local Ollama instances, ensuring complete data sovereignty and zero vendor lock-in.'
    },
    {
      q: 'Is Saathi Bot compliant with enterprise data protection regulations (GDPR / SOC2)?',
      a: 'Yes. Raw visitor IP addresses are never written to disk; they are anonymized via one-way cryptographic SHA-256 hashing. Customer data is protected by PostgreSQL Row-Level Security, automated retention purges are configurable (30, 60, or 90 days), and tenant bot deletion executes hard cascading deletions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-white font-sans relative overflow-x-hidden">

      {/* ── Background Subtle Ambient Clean Glow ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1200px] h-[550px] bg-gradient-to-b from-cyan-500/10 via-teal-500/5 to-transparent blur-[140px] rounded-full dark:from-cyan-500/15 dark:via-teal-500/10 dark:to-indigo-500/5" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20 space-y-16 sm:space-y-20">

        {/* ═══════════════════════ 1. HERO & PRODUCT OVERVIEW ═══════════════════════ */}
        <section className="space-y-6 text-center max-w-4xl mx-auto pt-2 relative">

          {/* Breadcrumb Back Link */}
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <Link to="/saas" className="inline-flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
              <ArrowLeft size={13} />
              <span>Back to SaaS Hub</span>
            </Link>
            <span>/</span>
            <span className="text-cyan-600 dark:text-cyan-400">Saathi Bot Product Specification</span>
          </div>

          {/* Top Status Network Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/30 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-600" />
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-800 dark:text-cyan-300 font-outfit">
              PRODUCTION SPECIFICATION · AUTONOMOUS RAG &amp; COMMERCE
            </span>
          </div>

          {/* Main Visual Logo Display */}
          <div className="flex items-center justify-center pt-1">
            <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md dark:shadow-cyan-500/10 relative group">
              <img
                src="/saathi-bot/saathi-white-logo.svg"
                alt="Saathi Bot Official Logo"
                className="h-10 sm:h-14 w-auto object-contain relative z-10 dark:hidden"
              />
              <img
                src="/saathi-bot/saathi-black-logo.svg"
                alt="Saathi Bot Official Logo"
                className="h-10 sm:h-14 w-auto object-contain relative z-10 hidden dark:block"
              />
            </div>
          </div>

          {/* Hero Titles & Value Proposition */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Autonomous AI Chatbot &amp;{' '}
              <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-indigo-600 dark:from-cyan-400 dark:via-teal-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Conversational Commerce Platform
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Transform any website, documentation portal, or sitemap into an accurate, grounded assistant in minutes with <strong>Zero Hallucination Guarantee</strong>, Pre-LLM <strong>Confidence Gating</strong>, and frictionless <strong>In-Chat Appointment Booking</strong>.
            </p>
          </div>

          {/* Quick Technical Highlights Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold">
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-cyan-50 text-cyan-800 border border-cyan-200 dark:bg-slate-900 dark:border-cyan-500/30 dark:text-cyan-300">
              <Sparkles size={13} className="text-cyan-600 dark:text-cyan-400" />
              <span>Hybrid Search (RRF)</span>
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 dark:bg-slate-900 dark:border-teal-500/30 dark:text-teal-300">
              <ShieldCheck size={13} className="text-teal-600 dark:text-teal-400" />
              <span>Pre-LLM Confidence Gate (0.55)</span>
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-slate-900 dark:border-emerald-500/30 dark:text-emerald-300">
              <Calendar size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>In-Chat Booking &amp; Sheets Sync</span>
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-800 border border-indigo-200 dark:bg-slate-900 dark:border-indigo-500/30 dark:text-indigo-300">
              <Globe size={13} className="text-indigo-600 dark:text-indigo-400" />
              <span>Multilingual Semantic Retrieval</span>
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300">
              <Terminal size={13} className="text-violet-600 dark:text-violet-400" />
              <span>18 KB Shadow DOM Widget</span>
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={SAATHI_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-outfit font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Launch Live SaaS Platform</span>
              <ExternalLink size={14} />
            </a>

            <a
              href="#interactive-rag-simulator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-cyan-300 border border-slate-300 dark:border-cyan-500/40 font-outfit font-bold text-xs uppercase tracking-wider transition-all"
            >
              <span>Try Pipeline Simulator</span>
              <Play size={13} className="text-cyan-600 dark:text-cyan-400" />
            </a>

            <a
              href="#embed-generator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900/80 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 font-bold text-xs transition-all shadow-xs"
            >
              <Terminal size={14} />
              <span>Get Embed Snippet</span>
            </a>
          </div>

          {/* Performance Metrics Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 pt-4 text-left">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-500/20 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-cyan-700 dark:text-cyan-400 tracking-wider block">
                First-Token Latency
              </span>
              <span className="text-lg sm:text-xl font-outfit font-black text-slate-900 dark:text-white block mt-0.5">
                680ms – 920ms
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Sub-second streaming</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-teal-500/20 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-teal-700 dark:text-teal-400 tracking-wider block">
                Fallback Path Speed
              </span>
              <span className="text-lg sm:text-xl font-outfit font-black text-slate-900 dark:text-white block mt-0.5">
                24ms
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Zero visitor waiting</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-500/20 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 tracking-wider block">
                Fallback AI Cost
              </span>
              <span className="text-lg sm:text-xl font-outfit font-black text-slate-900 dark:text-white block mt-0.5">
                $0.000
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Zero tokens billed</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/20 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-indigo-700 dark:text-indigo-400 tracking-wider block">
                Embed Payload Size
              </span>
              <span className="text-lg sm:text-xl font-outfit font-black text-slate-900 dark:text-white block mt-0.5">
                18 KB <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">(5.5 KB gz)</span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Zero-dep Shadow DOM</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-violet-500/20 shadow-xs col-span-2 lg:col-span-1">
              <span className="text-[10px] uppercase font-bold text-violet-700 dark:text-violet-400 tracking-wider block">
                Tenant Data Leak
              </span>
              <span className="text-lg sm:text-xl font-outfit font-black text-slate-900 dark:text-white block mt-0.5">
                0.000%
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">PostgreSQL RLS verified</span>
            </div>
          </div>

          {/* Visual Production Showcase Graphic */}
          <div className="pt-4 max-w-5xl mx-auto">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 dark:border-cyan-500/30 bg-white dark:bg-slate-900 shadow-xl group">
              <img
                src="/saathi-bot/saathi-white-banner.svg"
                alt="Saathi Bot Product Architecture & Dashboard Showcase"
                className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl transition-transform duration-500 group-hover:scale-[1.01] dark:hidden"
              />
              <div className="hidden dark:flex flex-col items-center justify-center p-8 sm:p-14 relative overflow-hidden bg-slate-950 min-h-[240px] sm:min-h-[300px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-teal-500/10 to-transparent blur-2xl pointer-events-none" />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] flex items-center justify-center">
                    <img
                      src="/saathi-bot/saathi-black-logo.svg"
                      alt="Saathi Bot Official Logo"
                      className="h-16 sm:h-24 w-auto object-contain drop-shadow-[0_0_25px_rgba(126,244,248,0.5)] transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                      v1.0.0 Production Architecture
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      Zero Hallucination RRF
                    </span>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-indigo-950/60 border border-indigo-500/40 text-indigo-300">
                      18 KB Shadow DOM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* ═══════════════════════ 2. WHY IT WAS BUILT & WHAT WAS BUILT ═══════════════════════ */}
        <section className="space-y-10">

          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-cyan-800 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <HelpCircle size={12} />
              <span>Engineering Background</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Why Saathi Bot Was Built &amp; What Was Created
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Traditional website chatbots break customer trust and inflate operational costs. Saathi Bot was engineered from first principles to solve these fundamental flaws.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* The Problem: Why It Was Built */}
            <div className="p-6 sm:p-7 rounded-2xl bg-rose-50/50 dark:bg-slate-900/70 border border-rose-200 dark:border-rose-900/40 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 text-xs font-bold uppercase tracking-wider">
                <span>The Problem: Flaws of Legacy Chatbots</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Hallucinations &amp; False Commitments:</strong> Standard LLMs invent refund policies, fake discounts, and unverified promises when answers are missing from documentation.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Runaway Token Bills on Trivial Queries:</strong> Calling OpenAI GPT-4 on greetings ("hi"), insults, or out-of-scope trivia wastes up to 41% of monthly AI budgets.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Heavy Iframe Widgets &amp; CSS Bleed:</strong> 250 KB iframe widgets cause mobile viewport flickering, break responsiveness, and clash with host stylesheets.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-rose-200 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✕</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">High Abandonment on Lead Redirects:</strong> Bouncing visitors out to external booking links drops over 60% of high-intent potential customers.
                  </div>
                </li>
              </ul>
            </div>

            {/* The Solution: What Was Built */}
            <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/50 dark:bg-slate-900/70 border border-emerald-200 dark:border-emerald-900/40 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <span>The Solution: What Was Built</span>
              </div>

              <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">100% Verifiable Grounded RAG:</strong> Defensive XML context injection with strict attribution directives that cite exact source URLs and prevent extrapolation.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Pre-LLM Confidence Gate (0.55):</strong> Mathematical cosine threshold filter. Out-of-scope queries exit in 24ms with $0.000 tokens billed.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">18 KB Zero-Bleed Shadow DOM:</strong> Native Web Component with encapsulated styling that is completely immune to host CSS interference.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-200 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">In-Chat Lead Booking &amp; Sheets Sync:</strong> Native inline drawers capture leads immediately and sync them to Google Sheets in real time.
                  </div>
                </li>
              </ul>
            </div>

          </div>

        </section>

        {/* ═══════════════════════ 3. INTERACTIVE RAG SIMULATOR ═══════════════════════ */}
        <section id="interactive-rag-simulator" className="space-y-6 scroll-mt-24">

          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-cyan-800 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Play size={12} />
              <span>Interactive Pipeline Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Live RAG &amp; Grounding Telemetry Simulator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Test how Saathi Bot resolves domain inquiries, intercepts out-of-scope questions via the Pre-LLM Confidence Gate, and triggers in-chat lead booking actions.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/30 p-4 sm:p-6 shadow-md dark:shadow-cyan-500/10 space-y-4">

            {/* Preset Selector Chips */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Select a Test Scenario:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                {SIMULATION_SCENARIOS.map((sc, idx) => (
                  <button
                    key={sc.id}
                    onClick={() => {
                      setActiveScenarioIdx(idx);
                      setCustomQueryInput(sc.userQuery);
                      setCurrentScenario(sc);
                    }}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${activeScenarioIdx === idx
                      ? 'bg-white dark:bg-slate-800 border-cyan-500 text-slate-900 dark:text-white shadow-sm'
                      : 'bg-white/60 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                  >
                    <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border mb-1 ${sc.badgeColor}`}>
                      {sc.queryType}
                    </span>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
                      {sc.category}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Bar */}
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={customQueryInput}
                  onChange={(e) => setCustomQueryInput(e.target.value)}
                  placeholder="Type a customer query (e.g., 'What is your return policy?')..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:border-cyan-500 focus:outline-hidden text-xs text-slate-900 dark:text-white placeholder-slate-400 font-mono shadow-xs"
                />
              </div>
              <button
                onClick={handleRunSimulation}
                disabled={isSimulating}
                className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-outfit font-black text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0 disabled:opacity-50 shadow-sm"
              >
                {isSimulating ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Send size={13} />
                    <span>Simulate Pipeline</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Output Display (2 Columns: Left Chat, Right Telemetry) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">

              {/* Left Column: Shadow DOM Chat Window (7 Cols) */}
              <div className="lg:col-span-7 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-xs">

                {/* Chat Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center overflow-hidden p-1">
                      <img src="/saathi-bot/saathi-white-icon.svg" alt="Saathi Mascot" className="w-5 h-5 object-contain dark:hidden" />
                      <img src="/saathi-bot/saathi-black-icon.svg" alt="Saathi Mascot" className="w-5 h-5 object-contain hidden dark:block" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-outfit">Demo Chatbot</div>
                        <span className="px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border border-cyan-400/30">
                          Saathi Bot
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 flex-wrap">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">Online</span>
                        <span>•</span>
                        <span>Yeh demo chatbot Saathi Bot ki taraf se hai</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Interactive Demo Tag with Tooltip on Hover / Touch */}
                    <div className="relative group cursor-help">
                      <div
                        tabIndex={0}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-700 dark:text-cyan-300 text-[10px] font-black uppercase tracking-wider font-outfit transition-all group-hover:bg-cyan-500/25 active:scale-95 shadow-xs"
                        aria-label="Demo Chatbot Information"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                        <span>Demo Chatbot · Live Preview</span>
                      </div>

                      {/* Pop-up Tooltip on hover / touch */}
                      <div className="absolute top-full mt-2 right-0 w-64 sm:w-72 p-3 rounded-2xl bg-slate-900 text-white text-[11px] leading-relaxed shadow-2xl border border-cyan-500/40 opacity-0 pointer-events-none group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 z-50 transform translate-y-1 group-hover:translate-y-0 backdrop-blur-xl">
                        <div className="font-bold text-cyan-300 mb-1 flex items-center gap-1.5 font-outfit">
                          <Sparkles size={12} className="text-cyan-400" />
                          <span>Interactive Application Demo</span>
                        </div>
                        <p className="text-slate-300 text-[10.5px]">
                          This is an interactive simulation of the live Saathi Bot application. You can test custom customer queries, inspect hybrid RRF search scores, observe the Pre-LLM Confidence Gate, and simulate in-chat lead booking.
                        </p>
                        <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] text-cyan-400 font-mono">
                          <span>Status: Verified Grounded</span>
                          <span>Zero Hallucinations</span>
                        </div>
                      </div>
                    </div>

                    <span className="hidden sm:inline-block font-mono text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                      Shadow DOM
                    </span>
                  </div>
                </div>

                {/* Saathi Bot Demo Tagline Banner */}
                <div className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent border border-cyan-500/25 text-cyan-950 dark:text-cyan-200 text-xs font-medium flex items-center gap-2">
                  <Sparkles size={14} className="text-cyan-500 shrink-0 animate-pulse" />
                  <span className="leading-snug">
                    <strong className="font-bold">Demo Chatbot:</strong> Yeh demo chatbot Saathi Bot ki taraf se hai — 100% Grounded AI &amp; Zero Hallucination.
                  </span>
                </div>

                {/* Conversation Stream */}
                <div className="space-y-3 min-h-[220px]">

                  {/* Visitor Message */}
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-cyan-600 text-white px-4 py-2.5 text-xs sm:text-sm font-medium shadow-sm">
                      {currentScenario.userQuery}
                    </div>
                  </div>

                  {/* Bot Response */}
                  <div className="flex justify-start">
                    <div className="max-w-[92%] rounded-2xl rounded-tl-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 p-4 text-xs sm:text-sm leading-relaxed space-y-3">
                      <p>{currentScenario.botResponse}</p>

                      {/* In-Chat Booking Trigger Action */}
                      {currentScenario.showBookingTrigger && (
                        <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-emerald-300 dark:border-emerald-500/30 space-y-2">
                          <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                            <Calendar size={13} />
                            <span>Action Detected: Online Consultation Booking</span>
                          </div>
                          <button
                            onClick={() => setShowBookingModal(true)}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
                          >
                            <Calendar size={13} />
                            <span>📅 Book an Appointment</span>
                          </button>
                        </div>
                      )}

                      {/* Source Citations Badges */}
                      {currentScenario.citations && currentScenario.citations.length > 0 && (
                        <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider block">
                            Direct Verified Citations:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {currentScenario.citations.map((c, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 text-[11px] border border-slate-200 dark:border-slate-700 font-mono"
                              >
                                <ExternalLink size={10} />
                                <span>{c.title}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>

              </div>

              {/* Right Column: Real-Time Engine Telemetry (5 Cols) */}
              <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-slate-800 p-5 space-y-4 font-mono text-xs text-slate-200 shadow-md">

                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                  <span>Engine Telemetry Log</span>
                  <span className="text-cyan-400">pgvector HNSW</span>
                </div>

                <div className="space-y-2.5">

                  {/* Execution Latency */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-400">Total Latency:</span>
                    <span className="font-bold text-cyan-300">
                      {currentScenario.retrievalTelemetry.latencyMs} ms
                    </span>
                  </div>

                  {/* Dense Cosine Score */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-400">Vector Cosine:</span>
                    <span className="font-bold text-white">
                      {currentScenario.retrievalTelemetry.denseVectorCosine.toFixed(3)}
                    </span>
                  </div>

                  {/* Reciprocal Rank Fusion Score */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-400">RRF Fusion Score:</span>
                    <span className="font-bold text-teal-300">
                      {currentScenario.retrievalTelemetry.rrfScore.toFixed(4)}
                    </span>
                  </div>

                  {/* Confidence Decision */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-400">Confidence Gate:</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${currentScenario.retrievalTelemetry.confidencePassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                      {currentScenario.retrievalTelemetry.confidencePassed ? 'PASSED (≥ 0.55)' : 'FALLBACK TRIGGERED'}
                    </span>
                  </div>

                  {/* LLM Inference Billing */}
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                    <span className="text-slate-400">LLM Tokens Billed:</span>
                    <span className={`font-bold ${currentScenario.retrievalTelemetry.llmBilled
                      ? 'text-cyan-300'
                      : 'text-emerald-400'
                      }`}>
                      {currentScenario.retrievalTelemetry.llmBilled ? 'Active Stream' : '$0.000 (100% Free)'}
                    </span>
                  </div>

                  {/* Intent Telemetry if any */}
                  {currentScenario.retrievalTelemetry.detectedIntent && (
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                      <span className="text-slate-400 block text-[10px] uppercase">Detected Intent:</span>
                      <span className="text-emerald-400 text-[11px] break-all">
                        {currentScenario.retrievalTelemetry.detectedIntent}
                      </span>
                    </div>
                  )}

                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 leading-normal">
                  💡 <strong>Mathematical Principle:</strong> The Pre-LLM Confidence Gate checks cosine similarity first. If no documentation chunk achieves the threshold τ (0.55), the pipeline exits immediately without invoking LLM tokens.
                </div>

              </div>

            </div>

          </div>

          {/* Modal / Overlay for In-Widget Booking Form Simulation */}
          {showBookingModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
              <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-500/40 p-6 shadow-2xl space-y-4">

                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-outfit font-black text-slate-900 dark:text-white text-base">In-Chat Appointment Booking</h3>
                  </div>
                  <button
                    onClick={() => { setShowBookingModal(false); setBookingSubmitted(false); }}
                    className="text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer text-xs font-bold"
                  >
                    Close
                  </button>
                </div>

                {bookingSubmitted ? (
                  <div className="py-6 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-300 dark:border-emerald-500/40">
                      <CheckCircle2 size={24} />
                    </div>
                    <div className="text-lg font-outfit font-black text-slate-900 dark:text-white">Booking Confirmed!</div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Reference Code: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">BKG-7F3K2A</span>
                    </p>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-emerald-200 dark:border-emerald-500/30 text-xs text-emerald-700 dark:text-emerald-300 font-mono">
                      ✓ Mirrored to Google Sheets row in real time
                    </div>
                    <button
                      onClick={() => { setShowBookingModal(false); setBookingSubmitted(false); }}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBookingSubmitted(true);
                    }}
                    className="space-y-3 text-xs"
                  >
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={bookingFormData.name}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, name: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={bookingFormData.email}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, email: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={bookingFormData.phone}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, phone: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">Preferred Slot</label>
                      <input
                        type="text"
                        value={bookingFormData.dateTime}
                        onChange={(e) => setBookingFormData({ ...bookingFormData, dateTime: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-outfit font-black uppercase tracking-wider text-xs shadow-md hover:shadow-lg cursor-pointer mt-2"
                    >
                      Confirm Appointment &amp; Sync to Sheets
                    </button>
                  </form>
                )}

              </div>
            </div>
          )}

        </section>

        {/* ═══════════════════════ 4. COMMERCIAL FINANCIAL ROI CALCULATOR ═══════════════════════ */}
        <section className="space-y-6">

          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              <DollarSign size={12} />
              <span>Commercial Financial Modeling</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Support Desk Operational ROI Calculator
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Calculate exact monthly expenditure saved by transitioning repetitive website customer queries to Saathi Bot's autonomous 24/7 grounded engine.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-500/30 p-5 sm:p-6 shadow-md dark:shadow-emerald-500/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* Left Controls (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">

              {/* Slider 1: Monthly Inquiries */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Monthly Website Customer Inquiries:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">{monthlyInquiries.toLocaleString()} queries/mo</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="25000"
                  step="500"
                  value={monthlyInquiries}
                  onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>500 (Early Startup)</span>
                  <span>10,000 (Growing Brand)</span>
                  <span>25,000+ (High Volume)</span>
                </div>
              </div>

              {/* Slider 2: Support Agents */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Current Support Desk Staff Count:</span>
                  <span className="text-cyan-700 dark:text-cyan-400 font-mono text-sm">{supportAgents} Full-Time Agents</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={supportAgents}
                  onChange={(e) => setSupportAgents(Number(e.target.value))}
                  className="w-full accent-cyan-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
              </div>

              {/* Slider 3: Agent Monthly Salary */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Avg Monthly Salary per Agent:</span>
                  <span className="text-slate-900 dark:text-white font-mono text-sm">${agentSalaryUSD.toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="6000"
                  step="250"
                  value={agentSalaryUSD}
                  onChange={(e) => setAgentSalaryUSD(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
              </div>

              {/* Slider 4: Out-of-Scope Inquiries Intercepted */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Out-of-Scope Query Intercept % (Confidence Gate):</span>
                  <span className="text-amber-700 dark:text-amber-400 font-mono text-sm">{outOfScopePercent}% of total</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={outOfScopePercent}
                  onChange={(e) => setOutOfScopePercent(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg"
                />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                  Intercepts {roiCalculations.zeroTokenQueries.toLocaleString()} repetitive or out-of-scope inquiries at $0.000 token cost.
                </span>
              </div>

            </div>

            {/* Right Financial ROI Summary Card (5 Cols) */}
            <div className="lg:col-span-5 p-5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-emerald-500/30 space-y-4 shadow-sm">

              <div className="border-b border-slate-200 dark:border-slate-800 pb-2.5">
                <span className="text-[9px] uppercase font-black tracking-widest text-emerald-700 dark:text-emerald-400 block">
                  Net Financial Projection
                </span>
                <div className="text-2xl sm:text-3xl font-outfit font-black text-slate-900 dark:text-white mt-0.5">
                  ${roiCalculations.monthlyNetSavings.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> / month</span>
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-0.5">
                  ${roiCalculations.annualNetSavings.toLocaleString()} Annual Net Profit Boost
                </div>
              </div>

              <div className="space-y-2 text-xs">

                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-900">
                  <span className="text-slate-500 dark:text-slate-400">Human Desk Operational Burn:</span>
                  <span className="text-rose-600 dark:text-rose-400 font-mono font-bold">${roiCalculations.currentHumanDeskCost.toLocaleString()}/mo</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-900">
                  <span className="text-slate-500 dark:text-slate-400">Saathi Bot SaaS Subscription:</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-mono font-bold">${roiCalculations.saathiBotCost.toLocaleString()}/mo</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-900">
                  <span className="text-slate-500 dark:text-slate-400">Repetitive Hours Saved / Week:</span>
                  <span className="text-cyan-700 dark:text-cyan-400 font-mono font-bold">{roiCalculations.hoursSavedPerWeek} Hours / wk</span>
                </div>

                <div className="flex justify-between py-1">
                  <span className="text-slate-500 dark:text-slate-400">AI Operating Cost Saved (Gate):</span>
                  <span className="text-amber-700 dark:text-amber-400 font-mono font-bold">~{roiCalculations.tokenSavingsPct}% AI Discount</span>
                </div>

              </div>

              <div className="pt-1">
                <a
                  href={SAATHI_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-outfit font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  <span>Start Deploying Saathi Bot</span>
                  <ArrowRight size={13} />
                </a>
              </div>

            </div>

          </div>

        </section>

        {/* ═══════════════════════ 5. CORE ARCHITECTURE & PRIMITIVES ═══════════════════════ */}
        <section className="space-y-6">

          <div className="text-center max-w-3xl mx-auto space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 text-indigo-800 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider">
              <Cpu size={12} />
              <span>Engineering Thesis &amp; Primitives</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Six Architectural Innovations
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
              Engineered from first principles for sub-second streaming, multilingual precision, and mathematical multi-tenant isolation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Feature 1 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-cyan-500/20 hover:border-cyan-500/40 transition-all space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                <Zap size={16} />
              </div>
              <h3 className="text-base font-outfit font-black text-slate-900 dark:text-white">
                1. Hybrid RAG (Reciprocal Rank Fusion)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Combines dense vector search (Google Gemini <code>text-embedding-004</code>, 768 dimensions) with sparse full-text lexical search in PostgreSQL using the <code>'simple'</code> dictionary. Reciprocal Rank Fusion ($k=60$) balances conceptual understanding with exact part-number and acronym precision.
              </p>
              <div className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 pt-0.5">
                RRF(d) = 1/(60 + r_vec) + 1/(60 + r_text)
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-teal-500/20 hover:border-teal-500/40 transition-all space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-teal-100 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/30 flex items-center justify-center text-teal-700 dark:text-teal-400">
                <ShieldCheck size={16} />
              </div>
              <h3 className="text-base font-outfit font-black text-slate-900 dark:text-white">
                2. Pre-LLM Confidence Gate (0.55)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Unlike traditional chatbots that call expensive LLMs on every message, Saathi Bot evaluates retrieval confidence first. Out-of-scope inquiries exit in <strong>24ms</strong> with zero LLM invocations, cutting operational AI bills by up to <strong>41%</strong>.
              </p>
              <div className="text-[10px] font-mono text-teal-700 dark:text-teal-400 pt-0.5">
                Decision: S_top &lt; 0.55 ➔ 24ms Instant Fallback
              </div>
            </div>

            {/* Feature 3 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-indigo-500/20 hover:border-indigo-500/40 transition-all space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400">
                <Globe size={16} />
              </div>
              <h3 className="text-base font-outfit font-black text-slate-900 dark:text-white">
                3. Multilingual Semantic Coordinate Space
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Projects multi-language queries into shared semantic vector coordinates. Colloquial inquiries are matched directly to verified documentation without intermediate machine translation delays or meaning distortion.
              </p>
              <div className="text-[10px] font-mono text-indigo-700 dark:text-indigo-400 pt-0.5">
                Cosine Similarity: Query ➔ Grounded Docs ≥ 0.88
              </div>
            </div>

            {/* Feature 4 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-emerald-500/20 hover:border-emerald-500/40 transition-all space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                <Calendar size={16} />
              </div>
              <h3 className="text-base font-outfit font-black text-slate-900 dark:text-white">
                4. In-Chat Booking &amp; Google Sheets Sync
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Zero external redirect drop-off. Deterministic intent detection triggers an inline booking drawer inside the Shadow DOM. Submissions generate reference codes like <code>BKG-7F3K2A</code> and mirror instantly to Google Sheets via encrypted OAuth.
              </p>
              <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 pt-0.5">
                Postgres Write ➔ waitUntil() ➔ Sheets Row Deep Link
              </div>
            </div>

            {/* Feature 5 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-violet-500/20 hover:border-violet-500/40 transition-all space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-violet-100 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/30 flex items-center justify-center text-violet-700 dark:text-violet-400">
                <Layers size={16} />
              </div>
              <h3 className="text-base font-outfit font-black text-slate-900 dark:text-white">
                5. 18 KB Zero-Bleed Shadow DOM
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Iframes cause layout flickering and CORS spoofing. Saathi Bot encapsulates its entire UI inside a native Web Component Shadow Root. The host site's Tailwind, Bootstrap, or custom CSS can never alter or corrupt the chat interface.
              </p>
              <div className="text-[10px] font-mono text-violet-700 dark:text-violet-400 pt-0.5">
                Zero Dependencies · 18 KB Raw · 5.5 KB Gzipped
              </div>
            </div>

            {/* Feature 6 */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-rose-500/20 hover:border-rose-500/40 transition-all space-y-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 flex items-center justify-center text-rose-700 dark:text-rose-400">
                <Lock size={16} />
              </div>
              <h3 className="text-base font-outfit font-black text-slate-900 dark:text-white">
                6. Zero-AWS &amp; Mathematical Security
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Eliminates AWS devops friction and bandwidth egress penalties. Operates strictly on Vercel and Supabase. Multi-tenancy is guaranteed by PostgreSQL RLS, denormalized <code>bot_id</code> on chunks, and CI-blocking leakage verification tests.
              </p>
              <div className="text-[10px] font-mono text-rose-700 dark:text-rose-400 pt-0.5">
                PostgreSQL RLS · Denormalized bot_id · CI Verified
              </div>
            </div>

          </div>

        </section>

        {/* ═══════════════════════ 6. EMBED WIDGET CODE GENERATOR ═══════════════════════ */}
        <section id="embed-generator" className="space-y-6 scroll-mt-24">

          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-cyan-800 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <Terminal size={12} />
              <span>Universal 1-Minute Integration</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Embed Saathi Bot in One Line of Code
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Paste into Shopify, WordPress, Webflow, Next.js, or any standard HTML website. Zero build steps or npm packages required.
            </p>
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-cyan-500/30 p-5 sm:p-7 shadow-md space-y-4">

            {/* Platform Selector Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              {[
                { id: 'html', label: 'Universal HTML' },
                { id: 'shopify', label: 'Shopify' },
                { id: 'wordpress', label: 'WordPress / WooCommerce' },
                { id: 'webflow', label: 'Webflow' },
                { id: 'nextjs', label: 'Next.js 14 / 15 / 16' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedEmbedTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedEmbedTab === tab.id
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code Box with Copy */}
            <div className="relative rounded-2xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs text-slate-200 overflow-x-auto shadow-inner">
              <button
                onClick={() => copySnippet(embedCodeSnippets[selectedEmbedTab], `embed-${selectedEmbedTab}`)}
                className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-sans font-bold cursor-pointer transition-colors shadow-xs"
              >
                {copiedCodeId === `embed-${selectedEmbedTab}` ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy Snippet</span>
                  </>
                )}
              </button>

              <pre className="pr-32 text-cyan-300">
                {embedCodeSnippets[selectedEmbedTab]}
              </pre>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 pt-2">
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <CheckCircle2 size={14} /> Zero CSS Conflicts (Shadow DOM)
              </span>
              <span className="flex items-center gap-1 text-cyan-700 dark:text-cyan-400 font-semibold">
                <CheckCircle2 size={14} /> WCAG 2.1 AA Screen Reader Ready
              </span>
              <span className="flex items-center gap-1 text-teal-700 dark:text-teal-400 font-semibold">
                <CheckCircle2 size={14} /> 18 KB Featherweight Payload
              </span>
            </div>

          </div>

        </section>

        {/* ═══════════════════════ 7. DEVELOPER HEADLESS API V1 ═══════════════════════ */}
        <section className="space-y-6">

          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-800 dark:text-violet-400 text-xs font-semibold uppercase tracking-wider">
              <Terminal size={12} />
              <span>Headless REST &amp; SSE Streaming</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Developer Platform &amp; Public API v1
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Integrate Saathi Bot into custom mobile apps, WhatsApp business webhooks, headless frontends, or automated Python agent pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Request Snippet */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-3 font-mono text-xs text-slate-200 shadow-md">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span className="font-bold text-white font-sans">1. Streaming SSE Request</span>
                <span className="text-emerald-400">POST /api/v1/bots/:id/chat</span>
              </div>
              <pre className="text-slate-300 overflow-x-auto p-3 rounded-xl bg-slate-950 border border-slate-900 leading-relaxed">
                {`curl -X POST https://saathi-bot.vercel.app/api/v1/bots/bot_prod_99/chat \\
  -H "Authorization: Bearer sk_live_your_api_key" \\
  -H "Content-Type: application/json" \\
  -H "Accept: text/event-stream" \\
  -d '{
    "message": "What is the return window and shipping policy?",
    "visitorId": "usr_mobile_9921",
    "conversationId": "550e8400-e29b-41d4-a716-446655440000"
  }'`}
              </pre>
            </div>

            {/* Streamed Event Response */}
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-5 sm:p-6 space-y-3 font-mono text-xs text-slate-200 shadow-md">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span className="font-bold text-white font-sans">2. Server-Sent Events (SSE) Stream</span>
                <span className="text-cyan-400">text/event-stream</span>
              </div>
              <pre className="text-cyan-300 overflow-x-auto p-3 rounded-xl bg-slate-950 border border-slate-900 leading-relaxed">
                {`event: meta
data: {"conversationId":"550e8400...","messageId":"msg_01"}

event: token
data: {"t":"Standard domestic shipping is free for all orders over $50."}

event: token
data: {"t":" Full refunds are credited within 3 to 5 business days."}

event: done
data: {"sources":[{"url":"https://store.com/returns"}],"mode":"answered"}`}
              </pre>
            </div>

          </div>

        </section>

        {/* ═══════════════════════ 8. COMPETITIVE BENCHMARK MATRIX ═══════════════════════ */}
        <section className="space-y-6">

          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Competitive Benchmark &amp; Thesis
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              How Saathi Bot compares against legacy chatbot platforms.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-4 px-6">Capability / Metric</th>
                  <th className="py-4 px-6 text-cyan-800 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/20">Saathi Bot</th>
                  <th className="py-4 px-6">Chatbase</th>
                  <th className="py-4 px-6">SiteGPT</th>
                  <th className="py-4 px-6">Intercom Fin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">Pre-LLM Confidence Gate</td>
                  <td className="py-4 px-6 font-bold text-emerald-700 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">Yes (Zero LLM cost on fallback)</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">No (Calls LLM)</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">No</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Yes ($0.99 fee)</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">Multilingual Retrieval</td>
                  <td className="py-4 px-6 font-bold text-emerald-700 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">Native Cross-Lingual RAG</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Poor (Literal Translation)</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Moderate</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Moderate</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">In-Chat Lead Booking</td>
                  <td className="py-4 px-6 font-bold text-emerald-700 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">Native Form + Google Sheets Sync</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">External redirect only</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">No</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Custom apps required</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">Widget Architecture</td>
                  <td className="py-4 px-6 font-bold text-emerald-700 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">18 KB Shadow DOM (Zero Bleed)</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Heavy iframe (~250 KB)</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">iframe (~180 KB)</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Heavy script suite</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">Cloud Infrastructure</td>
                  <td className="py-4 px-6 font-bold text-emerald-700 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">Zero-AWS (Vercel + Supabase)</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Proprietary AWS / GCP</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Cloudflare / AWS</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">AWS / OpenAI</td>
                </tr>
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-bold text-slate-900 dark:text-white">BYOK (Bring Your Own Key)</td>
                  <td className="py-4 px-6 font-bold text-emerald-700 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">Full (Gemini, Groq, OpenAI, Ollama)</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">Limited</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">No</td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">No</td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>

        {/* ═══════════════════════ 9. SAAS PRICING TIERS ═══════════════════════ */}
        <section className="space-y-8">

          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/60 text-cyan-800 dark:text-cyan-300 text-xs font-semibold uppercase tracking-wider">
              <DollarSign size={12} />
              <span>Transparent SaaS Pricing</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Predictable Plans with Zero Hidden Egress Fees
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Simple flat tiers tailored for high-growth businesses and global stores.
            </p>

            {/* Currency Switcher */}
            <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 mt-2">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${currency === 'USD'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                USD ($ Global)
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${currency === 'INR'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                INR (₹ India)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Tier 1: Free */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-outfit">Free Tier</span>
                <div className="text-2xl font-outfit font-black text-slate-900 dark:text-white">
                  {currency === 'USD' ? '$0' : '₹0'}
                  <span className="text-xs font-normal text-slate-500"> / forever</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">For testing and personal developer prototypes.</p>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ 1 Active Bot</li>
                  <li className="flex items-center gap-2">✓ 100 Messages / month</li>
                  <li className="flex items-center gap-2">✓ 25 Ingested Web Pages</li>
                  <li className="flex items-center gap-2">✓ Confidence Gate Enabled</li>
                </ul>
              </div>
              <a
                href={SAATHI_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs text-center cursor-pointer transition-colors"
              >
                Start Free
              </a>
            </div>

            {/* Tier 2: Starter Plan */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-cyan-300 dark:border-cyan-500/30 flex flex-col justify-between space-y-4 relative shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-outfit">Starter Plan</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-cyan-100 text-cyan-800 dark:bg-cyan-500/20 dark:text-cyan-300">Popular</span>
                </div>
                <div className="text-2xl font-outfit font-black text-slate-900 dark:text-white">
                  {currency === 'USD' ? '$29' : '₹1,999'}
                  <span className="text-xs font-normal text-slate-500"> / month</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Perfect for growing stores and professional clinics.</p>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ 3 Active Bots</li>
                  <li className="flex items-center gap-2">✓ 2,500 Messages / month</li>
                  <li className="flex items-center gap-2">✓ 500 Ingested Pages</li>
                  <li className="flex items-center gap-2">✓ In-Chat Booking &amp; Sheets Sync</li>
                  <li className="flex items-center gap-2">✓ Remove "Powered by" branding</li>
                </ul>
              </div>
              <a
                href={SAATHI_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs text-center cursor-pointer transition-colors shadow-xs"
              >
                Choose Starter
              </a>
            </div>

            {/* Tier 3: Pro Plan */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-teal-300 dark:border-teal-500/40 flex flex-col justify-between space-y-4 relative shadow-sm">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-400 font-outfit">Pro Plan</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-500/20 dark:text-teal-300">Scalable</span>
                </div>
                <div className="text-2xl font-outfit font-black text-slate-900 dark:text-white">
                  {currency === 'USD' ? '$69' : '₹4,999'}
                  <span className="text-xs font-normal text-slate-500"> / month</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">For multi-brand agencies and fast-scaling operations.</p>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ 10 Active Bots</li>
                  <li className="flex items-center gap-2">✓ 10,000 Messages / month</li>
                  <li className="flex items-center gap-2">✓ 2,500 Ingested Pages</li>
                  <li className="flex items-center gap-2">✓ Developer API v1 Full Access</li>
                  <li className="flex items-center gap-2">✓ Active Learning Cluster Analytics</li>
                </ul>
              </div>
              <a
                href={SAATHI_BOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs text-center cursor-pointer transition-colors shadow-xs"
              >
                Choose Pro
              </a>
            </div>

            {/* Tier 4: Enterprise BYOK */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-indigo-500/30 flex flex-col justify-between space-y-4 shadow-xs">
              <div className="space-y-3">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-400 font-outfit">Enterprise BYOK</span>
                <div className="text-2xl font-outfit font-black text-slate-900 dark:text-white">
                  {currency === 'USD' ? '$299+' : '₹19,999+'}
                  <span className="text-xs font-normal text-slate-500"> / month</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">Dedicated isolation, SLA, and custom models.</p>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <li className="flex items-center gap-2">✓ Unlimited Bots &amp; Messages</li>
                  <li className="flex items-center gap-2">✓ 50,000+ Ingested Pages</li>
                  <li className="flex items-center gap-2">✓ Bring Your Own Keys (BYOK)</li>
                  <li className="flex items-center gap-2">✓ WhatsApp &amp; Omnichannel Addons</li>
                  <li className="flex items-center gap-2">✓ Dedicated SLA &amp; Support Slack</li>
                </ul>
              </div>
              <Link
                to="/contact"
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs text-center cursor-pointer transition-colors shadow-xs"
              >
                Contact Enterprise
              </Link>
            </div>

          </div>

        </section>

        {/* ═══════════════════════ 10. COMPREHENSIVE FAQ ═══════════════════════ */}
        <section className="space-y-6 max-w-4xl mx-auto">

          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Clear, transparent explanations regarding accuracy, privacy, costs, and integration.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-outfit font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronRight
                    size={16}
                    className={`text-cyan-600 dark:text-cyan-400 shrink-0 transition-transform duration-200 ${openFaqIdx === idx ? 'rotate-90' : ''
                      }`}
                  />
                </button>
                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800/60">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </section>

        {/* ═══════════════════════ 11. FINAL LAUNCH CTA DECK ═══════════════════════ */}
        <section className="p-8 sm:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-cyan-500/40 text-center space-y-6 relative overflow-hidden shadow-lg">

          <div className="w-14 h-14 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-600 dark:text-cyan-400">
            <img src="/saathi-bot/saathi-bot-icon.svg" alt="Saathi Mascot" className="w-9 h-9" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-outfit font-black text-slate-900 dark:text-white">
              Ready to Deploy Grounded AI on Your Website?
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Set up your first autonomous assistant in under 10 minutes with zero developer overhead.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={SAATHI_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-outfit font-black text-sm uppercase tracking-wider shadow-md hover:shadow-lg cursor-pointer transition-all"
            >
              <span>Deploy on Saathi Bot Cloud</span>
              <ExternalLink size={16} />
            </a>

            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 font-bold text-sm cursor-pointer transition-all shadow-xs"
            >
              <span>Book Architecture Consultation</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="text-xs text-slate-500 pt-2 font-mono">
            Saathi Bot — Autonomous AI Chatbot &amp; Conversational Commerce Platform. Architected by Tushar Singh.
          </div>

        </section>

      </div>

    </div>
  );
};

export default SaathiBot;
