
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useParams } from 'react-router-dom';
import { ShieldCheck, Activity, Terminal, Cpu } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';
import ClockDisplay from './components/ClockDisplay';
import TopPromoBar from './components/TopPromoBar';
import FiverrFloatingButton from './components/FiverrFloatingButton';
import AIChatAssistant from './components/AIChatAssistant';
import LiveVisitorCounter from './components/LiveVisitorCounter';

import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import SaaS from './pages/SaaS';
import TasqOne from './pages/TasqOne';
import Contact from './pages/Contact';
import Testimonials from './pages/Testimonials';
import Blog, { BLOG_POSTS } from './pages/Blog';
import {
  SITE_URL, SITE_NAME,
  SITE_DEFAULT_OG_IMAGE, SITE_DEFAULT_OG_ALT,
  SITE_DEFAULT_OG_WIDTH, SITE_DEFAULT_OG_HEIGHT,
  SITE_DATE_MODIFIED, PAGE_OG,
} from './constants';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusIndex, setStatusIndex] = useState(0);

  const loadingStatuses = [
    "Initializing Growth Engine...",
    "Syncing AI Marketing Nodes...",
    "Decrypting Revenue Patterns...",
    "Verifying Automation Triggers...",
    "Optimizing Conversion Funnel...",
    "System Ready to Scale."
  ];

  useEffect(() => {
    // Non-linear progress simulation for more "realistic" feel
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 1000);
          }, 600);
          return 100;
        }
        // Random "jumps" to simulate data loading chunks
        const jump = Math.random() > 0.8 ? Math.floor(Math.random() * 5) + 1 : 1;
        const next = prev + jump;

        // Update status message based on progress thresholds
        const newStatusIndex = Math.min(
          Math.floor((next / 100) * loadingStatuses.length),
          loadingStatuses.length - 1
        );
        setStatusIndex(newStatusIndex);

        return next > 100 ? 100 : next;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[300] bg-slate-950 flex flex-col items-center justify-center transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${isExiting ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100'
        }`}
    >
      {/* --- BACKGROUND ATMOSPHERE --- */}
      <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

      {/* Scanning Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent absolute animate-[scan_4s_linear_infinite]"></div>
      </div>

      {/* Dynamic Glow Orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] transition-all duration-1000 opacity-20"
        style={{
          width: `${300 + progress}px`,
          height: `${300 + progress}px`,
          backgroundColor: progress > 80 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(79, 70, 229, 0.1)'
        }}
      ></div>

      {/* Corner Brackets */}
      <div className="absolute inset-10 pointer-events-none opacity-20 border-slate-800 border-2 rounded-[2rem]">
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-indigo-500"></div>
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-indigo-500"></div>
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-indigo-500"></div>
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-indigo-500"></div>
      </div>

      <div className="relative flex flex-col items-center max-w-sm w-full px-6">

        {/* Main Branding Block */}
        <div className="text-center relative z-10 space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ShieldCheck size={14} className="text-indigo-500/50 animate-pulse" />
            <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em]">Secure Handshake</span>
          </div>

          <h2 className={`text-white font-outfit font-black text-4xl sm:text-5xl tracking-[0.3em] uppercase transition-all duration-700 ${progress > 10 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            C.MS
          </h2>

          <div className="flex flex-col items-center gap-1">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.5em] ml-1 h-4 transition-all duration-300">
              {loadingStatuses[statusIndex]}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Activity size={10} className="text-slate-700" />
              <div className="w-1 h-1 rounded-full bg-slate-800"></div>
              <Terminal size={10} className="text-slate-700" />
              <div className="w-1 h-1 rounded-full bg-slate-800"></div>
              <Cpu size={10} className="text-slate-700" />
            </div>
          </div>
        </div>

        {/* Technical Progress Container */}
        <div className="mt-20 w-full relative">
          <div className="flex justify-between items-end mb-4">
            <div className="space-y-1">
              <p className="text-[7px] font-black text-slate-600 uppercase tracking-widest">Protocol ID</p>
              <p className="text-[9px] font-bold text-slate-400 tabular-nums">NODE-02-SYNC</p>
            </div>
            <div className="text-right">
              <span className="text-xl font-outfit font-black text-white tabular-nums tracking-tight">
                {progress}<span className="text-indigo-500 text-sm ml-0.5">%</span>
              </span>
            </div>
          </div>

          <div className="h-[2px] w-full bg-slate-900 rounded-full overflow-hidden relative">
            {/* Primary Loading Bar */}
            <div
              className="h-full bg-indigo-500 transition-all duration-300 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
              style={{ width: `${progress}%` }}
            ></div>
            {/* Secondary Ghost Bar for depth */}
            <div
              className="absolute inset-0 h-full bg-indigo-400/20 transition-all duration-700 ease-out"
              style={{ width: `${Math.min(progress + 15, 100)}%` }}
            ></div>
          </div>

          <div className="mt-4 flex justify-between">
            <span className="text-[7px] font-black text-slate-700 uppercase tracking-widest">Est: 2025 Registry</span>
            <span className="text-[7px] font-black text-slate-700 uppercase tracking-widest">Artifact v2.4</span>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="absolute bottom-12 text-center space-y-2 opacity-30">
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.8em]">Technical Architect Registry</p>
      </div>

      <style>{`
        @keyframes scan {
          0% { top: -10%; }
          100% { top: 110%; }
        }
      `}</style>
    </div>
  );
};

// All Indian states + UTs — used in every page's keywords for nationwide SEO coverage
const INDIA_STATES_KEYWORDS = "freelance developer Delhi, AI developer Mumbai, developer Bangalore, developer Hyderabad, developer Chennai, developer Pune, developer Kolkata, developer Ahmedabad, developer Jaipur, developer Lucknow, developer Noida, developer Gurgaon, developer Chandigarh, developer Indore, developer Bhopal, developer Nagpur, developer Surat, developer Vadodara, developer Coimbatore, developer Kochi, developer Thiruvananthapuram, developer Visakhapatnam, developer Patna, developer Bhubaneswar, developer Guwahati, developer Dehradun, developer Shimla, developer Raipur, developer Ranchi, developer Jammu, developer Srinagar, developer Panaji, developer Imphal, developer Shillong, developer Aizawl, developer Kohima, developer Agartala, developer Itanagar, developer Gangtok, developer Puducherry, developer Andaman, developer Lakshadweep, AI automation Uttar Pradesh, AI automation Maharashtra, AI automation Karnataka, AI automation Tamil Nadu, AI automation Andhra Pradesh, AI automation Telangana, AI automation West Bengal, AI automation Gujarat, AI automation Rajasthan, AI automation Bihar, AI automation Madhya Pradesh, AI automation Haryana, AI automation Punjab, AI automation Kerala, AI automation Odisha, AI automation Jharkhand, AI automation Assam, AI automation Chhattisgarh, AI automation Uttarakhand, AI automation Himachal Pradesh, AI automation Tripura, AI automation Manipur, AI automation Meghalaya, AI automation Nagaland, AI automation Mizoram, AI automation Arunachal Pradesh, AI automation Sikkim, AI automation Goa, AI automation Jammu Kashmir, AI automation Ladakh, pan India developer, remote developer India, hire developer India";

const PageWrapper: React.FC<{ children: React.ReactNode, title: string, description: string, keywords?: string }> = ({ children, title, description, keywords }) => {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    const pageUrl = `${SITE_URL}${location.pathname}`;
    // Resolve per-page OG data; fall back to site defaults
    const ogMeta = PAGE_OG[location.pathname];
    const ogImage = ogMeta?.image ?? SITE_DEFAULT_OG_IMAGE;
    const ogAlt = ogMeta?.alt ?? SITE_DEFAULT_OG_ALT;
    const ogWidth = ogMeta?.width ?? SITE_DEFAULT_OG_WIDTH;
    const ogHeight = ogMeta?.height ?? SITE_DEFAULT_OG_HEIGHT;
    // Homepage keeps og:type="profile"; all other pages use "website"
    const ogType = location.pathname === '/' ? 'profile' : 'website';

    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        const attrMatch = selector.match(/meta\[(name|property)="([^"]+)"\]/);
        if (attrMatch) {
          const attr = attrMatch[1];
          const name = attrMatch[2];
          el = document.createElement('meta');
          el.setAttribute(attr, name);
          document.head.appendChild(el);
        } else {
          return;
        }
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', description);

    // Merge page-specific keywords WITH all Indian states — nationwide SEO on every page
    const fullKeywords = keywords
      ? `${keywords}, ${INDIA_STATES_KEYWORDS}`
      : INDIA_STATES_KEYWORDS;
    let keywordsEl = document.querySelector('meta[name="keywords"]');
    if (!keywordsEl) {
      keywordsEl = document.createElement('meta');
      keywordsEl.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsEl);
    }
    keywordsEl.setAttribute('content', fullKeywords);

    // Open Graph
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', pageUrl);
    setMeta('meta[property="og:type"]', ogType);
    setMeta('meta[property="og:image"]', ogImage);
    setMeta('meta[property="og:image:secure_url"]', ogImage);
    setMeta('meta[property="og:image:width"]', ogWidth);
    setMeta('meta[property="og:image:height"]', ogHeight);
    setMeta('meta[property="og:image:alt"]', ogAlt);

    // Twitter / X Card
    setMeta('meta[property="twitter:title"]', fullTitle);
    setMeta('meta[property="twitter:description"]', description);
    setMeta('meta[property="twitter:url"]', pageUrl);
    setMeta('meta[property="twitter:image"]', ogImage);
    setMeta('meta[name="twitter:image:alt"]', ogAlt);

    // Canonical — use 'href' (not 'content') for <link> elements
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', pageUrl);

    // Add page-specific structured data
    updateStructuredData(title, description, location.pathname);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location, title, description, keywords]);

  return <>{children}</>;
};

// Helper: inject or replace a JSON-LD script by id
const upsertSchema = (id: string, data: object) => {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
};

// Helper: remove a schema by id
const removeSchema = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.remove();
};

// Per-page rich structured data for AEO + GEO
const updateStructuredData = (title: string, description: string, path: string) => {
  const baseUrl = 'https://codewithmrsingh.me';
  const pageUrl = `${baseUrl}${path}`;

  // ── BreadcrumbList (all pages) ──────────────────────────────
  upsertSchema('schema-breadcrumb', {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${baseUrl}/` },
      ...(path !== '/' ? [{ "@type": "ListItem", "position": 2, "name": title, "item": pageUrl }] : [])
    ]
  });

  // ── WebPage (all pages) — helps AI engines understand page context ──
  upsertSchema('schema-webpage', {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    "url": pageUrl,
    "name": `${title} | Code with Mr Singh`,
    "description": description,
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "about": { "@id": `${baseUrl}/#person` },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    },
    "inLanguage": "en",
    "dateModified": SITE_DATE_MODIFIED
  });

  // ── Page-specific schemas ───────────────────────────────────
  // Clean up previous page-specific schemas on navigation
  removeSchema('schema-page-specific');
  removeSchema('schema-service-list');

  if (path === '/services') {
    // Services page: inject ItemList of all services for AEO
    upsertSchema('schema-page-specific', {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      "name": "AI Automation & Full-Stack Development Services",
      "description": "Tushar Singh offers expert AI automation, chatbot development, full-stack web development, lead generation, sales funnel creation, data science, and Power BI dashboard services from Delhi, India.",
      "provider": {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Tushar Singh"
      },
      "areaServed": "Worldwide",
      "url": pageUrl,
      "serviceType": [
        "AI Automation", "Chatbot Development", "Full-Stack Web Development",
        "Lead Generation", "Sales Funnel Development", "Data Science",
        "Machine Learning", "Power BI Dashboard", "MVP Development"
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services by Tushar Singh",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Workflow Automation with n8n and Python", "description": "Build autonomous workflows using n8n, Zapier, Make.com and Python to eliminate manual tasks and save 10+ hours per week." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "RAG Chatbot & AI Agent Development", "description": "Custom AI chatbots trained on your business data using OpenAI, LangChain, and Vector Databases. Deployed on Web, WhatsApp, Telegram." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Full-Stack Web Development (React.js + Django)", "description": "Modern, fast web applications and dashboards using React.js, Next.js, Django, Python. Specializing in startup MVPs and agency white-label projects." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Lead Generation Systems", "description": "Multi-channel automated outreach using Apollo, Instantly, Smartlead. Delivers 50+ qualified sales meetings monthly." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Sales Funnel & Landing Page Development", "description": "High-converting sales funnels and landing pages with A/B testing, speed optimization, and CRM integration." } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data Science & Machine Learning", "description": "ML models, data pipelines, Power BI dashboards, and business intelligence solutions." } }
        ]
      }
    });

    upsertSchema('schema-service-list', {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Services by Tushar Singh",
      "url": pageUrl,
      "numberOfItems": 6,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "AI Automation & Workflow Automation", "url": pageUrl },
        { "@type": "ListItem", "position": 2, "name": "AI Chatbot & Agent Development", "url": pageUrl },
        { "@type": "ListItem", "position": 3, "name": "Full-Stack Web Development", "url": pageUrl },
        { "@type": "ListItem", "position": 4, "name": "Lead Generation Systems", "url": pageUrl },
        { "@type": "ListItem", "position": 5, "name": "Sales Funnel Development", "url": pageUrl },
        { "@type": "ListItem", "position": 6, "name": "Data Science & Machine Learning", "url": pageUrl }
      ]
    });
  }

  else if (path === '/about') {
    // About page: ProfilePage + Person schema for entity knowledge graph
    upsertSchema('schema-page-specific', {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${pageUrl}#profilepage`,
      "url": pageUrl,
      "name": `About Tushar Singh | AI Automation Expert & Full-Stack Developer Delhi`,
      "description": description,
      "mainEntity": {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Tushar Singh",
        "alternateName": "Code with Mr Singh",
        "jobTitle": "AI Automation Expert & Full-Stack Developer",
        "description": "Tushar Singh is a Delhi-based AI Automation Expert and Full-Stack Developer. MCA graduate from MIT Pune. Founder of Code with Mr Singh. 10+ successful projects submitted to clients. ₹2L+ revenue generated. Expert in Python, React.js, n8n, AI agents, chatbots, and Django.",
        "image": "https://codewithmrsingh.me/tushar-singh-optimized.jpg",
        "url": `${baseUrl}/about`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Badarpur",
          "addressLocality": "New Delhi",
          "addressRegion": "Delhi",
          "addressCountry": "IN",
          "postalCode": "110044"
        },
        "sameAs": [
          "https://www.fiverr.com/s/zAd5R2z",
          "https://share.google/ZDu1p0y00ioP6PWiA",
          "https://drive.google.com/file/d/17pvGeSh_tA8-_NYFo2UOtRcYA5J2hMOh/view?usp=sharing",
          "https://github.com/Tusharsinghoffical",
          "https://linkedin.com/in/tusharsingh2011",
          "https://www.youtube.com/@codewithmrsingh4u",
          "https://www.instagram.com/tushar.cms/"
        ],
        "knowsAbout": [
          "AI Automation", "n8n Workflow Automation", "RAG Chatbots", "LLM Integration",
          "Python Development", "React.js", "Next.js", "Django", "REST APIs",
          "Machine Learning", "Data Science", "Power BI", "Lead Generation",
          "Sales Funnel Development", "Business Process Automation"
        ],
        "alumniOf": { "@type": "EducationalOrganization", "name": "MIT Pune" },
        "hasCredential": { "@type": "EducationalOccupationalCredential", "credentialCategory": "Master of Computer Applications (MCA)" }
      }
    });
  }

  else if (path === '/projects') {
    // Projects page: CollectionPage for portfolio case studies
    upsertSchema('schema-page-specific', {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#collectionpage`,
      "url": pageUrl,
      "name": "Project Portfolio — 10+ AI & Web Development Case Studies",
      "description": "Complete portfolio of 10+ successful projects submitted to clients by Tushar Singh: AI automation systems, chatbots, web applications, sales funnels, lead generation systems, data science dashboards, and machine learning models.",
      "author": { "@id": `${baseUrl}/#person` },
      "about": "AI Automation, Full-Stack Web Development, Chatbot Development, Data Science"
    });
  }

  else if (path === '/contact') {
    // Contact page: ContactPage schema
    upsertSchema('schema-page-specific', {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${pageUrl}#contactpage`,
      "url": pageUrl,
      "name": "Contact Tushar Singh — Book Free AI Automation Consultation",
      "description": "Book a free 30-minute AI automation audit or send a project brief to Tushar Singh. Available via WhatsApp, email, and Calendly.",
      "mainEntity": {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Tushar Singh",
        "telephone": "+91-8851619647",
        "email": "tusharsinghoffical@gmail.com",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+91-8851619647",
          "contactType": "customer service",
          "availableLanguage": ["English", "Hindi"],
          "contactOption": "TollFree",
          "areaServed": ["IN", "US", "GB", "AU", "CA"]
        }
      }
    });
  }

  else if (path === '/blog' || path.startsWith('/blog/')) {
    // Blog: Blog schema
    upsertSchema('schema-page-specific', {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${baseUrl}/blog#blog`,
      "url": `${baseUrl}/blog`,
      "name": "Technical Blog — AI Automation & Web Development Insights",
      "description": "Technical articles and tutorials on AI automation, full-stack development, data science, and machine learning by Tushar Singh.",
      "author": { "@id": `${baseUrl}/#person` },
      "publisher": { "@id": `${baseUrl}/#person` },
      "inLanguage": "en"
    });
  }

  else if (path === '/testimonials') {
    // Testimonials: Review aggregate on LocalBusiness
    upsertSchema('schema-page-specific', {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#testimonials`,
      "url": pageUrl,
      "name": "Client Testimonials & Reviews — Tushar Singh Portfolio",
      "description": description,
      "about": { "@id": `${baseUrl}/#localbusiness` },
      "mainEntity": {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#localbusiness`,
        "name": "Tushar Singh freelancing",
        "url": baseUrl,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.0",
          "reviewCount": "10",
          "bestRating": "5"
        }
      }
    });
  }

  else if (path === '/saas') {
    // SaaS Directory: CollectionPage / ItemList schema
    upsertSchema('schema-page-specific', {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${pageUrl}#saashub`,
      "url": pageUrl,
      "name": "Proprietary SaaS Suites & Cloud Tools | Tushar Singh Labs",
      "description": "Explore proprietary cloud-native SaaS suites and autonomous tools by Tushar Singh Labs: TASQ-ONE (Intelligent Task OS), LeadFlow AI, and DocuParse Vault.",
      "author": { "@id": `${baseUrl}/#person` },
      "mainEntity": {
        "@type": "ItemList",
        "name": "Tushar Singh Labs SaaS Products",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "TASQ-ONE", "url": `${baseUrl}/saas/tasq-one` },
          { "@type": "ListItem", "position": 2, "name": "LeadFlow AI", "url": `${baseUrl}/contact` },
          { "@type": "ListItem", "position": 3, "name": "DocuParse Vault", "url": `${baseUrl}/contact` }
        ]
      }
    });
  }

  else if (path === '/saas/tasq-one') {
    // SaaS: SoftwareApplication schema for TASQ-ONE
    upsertSchema('schema-page-specific', {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${baseUrl}/saas/tasq-one#software`,
      "name": "TASQ-ONE",
      "operatingSystem": "Cloud, Web, Docker, Linux, macOS, Windows",
      "applicationCategory": "BusinessApplication, ProjectManagementApplication",
      "description": "TASQ-ONE is an intelligent task operating system (SaaS) that turns loosely defined ideas into fully-fledged, production-ready tasks in seconds using Groq Llama 3.3 70B AI, real-time Kanban dependency DAGs, and cryptographic audit trails.",
      "url": "https://tasq-one.onrender.com",
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": "0",
        "highPrice": "19",
        "offerCount": "3"
      },
      "creator": {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        "name": "Tushar Singh"
      }
    });
  }
};

/* ─── BlogPostWrapper ────────────────────────────────────────
   Sets per-post title, description & og: tags dynamically
   so shared URLs get the correct preview metadata.
──────────────────────────────────────────────────────────── */
const BlogPostWrapperInner: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post = BLOG_POSTS.find(p => p.id === postId);

  useEffect(() => {
    if (post) {
      const title = `${post.title} | ${SITE_NAME}`;
      const desc = post.excerpt;
      const url = `${SITE_URL}/blog/${post.id}`;
      // Use a post-specific image if available, fall back to site default
      const image = (post as any).imageUrl ?? SITE_DEFAULT_OG_IMAGE;
      const imageAlt = `${post.title} — ${SITE_NAME}`;

      document.title = title;

      const setMeta = (sel: string, val: string) => {
        let el = document.querySelector(sel) as HTMLMetaElement | null;
        if (!el) {
          const attrMatch = sel.match(/meta\[(name|property)="([^"]+)"\]/);
          if (attrMatch) {
            const attr = attrMatch[1];
            const name = attrMatch[2];
            el = document.createElement('meta');
            el.setAttribute(attr, name);
            document.head.appendChild(el);
          } else {
            return;
          }
        }
        el.setAttribute('content', val);
      };

      setMeta('meta[name="description"]', desc);
      // Open Graph
      setMeta('meta[property="og:title"]', title);
      setMeta('meta[property="og:description"]', desc);
      setMeta('meta[property="og:url"]', url);
      setMeta('meta[property="og:type"]', 'article');
      setMeta('meta[property="og:image"]', image);
      setMeta('meta[property="og:image:secure_url"]', image);
      setMeta('meta[property="og:image:width"]', SITE_DEFAULT_OG_WIDTH);
      setMeta('meta[property="og:image:height"]', SITE_DEFAULT_OG_HEIGHT);
      setMeta('meta[property="og:image:alt"]', imageAlt);
      // Twitter / X Card
      setMeta('meta[property="twitter:title"]', title);
      setMeta('meta[property="twitter:description"]', desc);
      setMeta('meta[property="twitter:url"]', url);
      setMeta('meta[property="twitter:image"]', image);
      setMeta('meta[name="twitter:image:alt"]', imageAlt);

      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);

      // Inject Article schema for SEO
      let schema = document.getElementById('schema-blog-post');
      if (!schema) {
        schema = document.createElement('script');
        schema.setAttribute('type', 'application/ld+json');
        schema.id = 'schema-blog-post';
        document.head.appendChild(schema);
      }
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': post.title,
        'description': post.excerpt,
        'image': image,
        'url': url,
        'author': { '@id': `${SITE_URL}/#person` },
        'publisher': { '@id': `${SITE_URL}/#person` },
        'keywords': post.tags.join(', '),
        'inLanguage': 'en',
        'datePublished': post.date,
        'dateModified': SITE_DATE_MODIFIED,
      });
    }
    return () => {
      document.getElementById('schema-blog-post')?.remove();
    };
  }, [post]);

  return <Blog />;
};

const App: React.FC = () => {
  return (
    <Router basename={(import.meta as any).env?.BASE_URL || ''}>
      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden w-full relative">
        <TopPromoBar />
        <ClockDisplay />
        <Navbar />
        <main id="main-content" className="flex-grow w-full overflow-x-hidden pt-7 sm:pt-8">
          <Routes>
            <Route path="/" element={<PageWrapper
              title="Tushar Singh — #1 AI Automation Expert & Full-Stack Developer | Delhi, India"
              description="⚡ 10+ Real Client Deliverables | ₹2L+ Value Delivered | 4.0★ Rated | Official Google Verified Owner. Hire Tushar Singh for Autonomous AI Agents, n8n Automations, 24/7 Smart Chatbots & Web Platforms. Free 30-Min Strategy Audit < 1 Hr."
              keywords="Tushar Singh, AI automation expert India, full stack developer India, hire developer India, chatbot developer India, Python developer India, React developer India, web developer India, n8n automation India, freelance developer India, pan India developer, AI developer Delhi Mumbai Bangalore Hyderabad Chennai Pune Kolkata"
            ><Home /></PageWrapper>} />

            <Route path="/about" element={<PageWrapper
              title="About Tushar Singh | MCA (MIT Pune), AI Automation Expert & Developer Delhi"
              description="👨‍💻 Learn about Tushar Singh — MCA (MIT Pune), AI Automation Engineer & Full-Stack Developer with 10+ client deliverables, ₹2L+ revenue impact. Specializing in Python, React, n8n, and custom LLM systems."
              keywords="about Tushar Singh, AI automation expert India, full stack developer background, developer Delhi Mumbai Bangalore Hyderabad Chennai, MCA graduate developer India, pan India freelance developer"
            ><About /></PageWrapper>} />

            <Route path="/services" element={<PageWrapper
              title="AI Automation, Chatbots & Web Development Services | Tushar Singh"
              description="🚀 Scale workflows with autonomous AI agents, 24/7 smart RAG chatbots, n8n automations, React web platforms & brand design by Tushar Singh. 10+ client deliverables, 4.0★ rating. Book a free consultation."
              keywords="AI automation services India, web development services India, chatbot development India, n8n automation India, Python development India, React.js services India, freelance services all India states, business automation India, developer Delhi Mumbai Bangalore Hyderabad Chennai Pune Kolkata"
            ><Services /></PageWrapper>} />

            <Route path="/projects" element={<PageWrapper
              title="Portfolio — 10+ Real AI & Web Deliverables | Tushar Singh"
              description="🏆 Explore 10+ commercial client projects delivered by Tushar Singh: AI automation workflows, smart conversational bots, SaaS dashboards, and web platforms with measurable ROI. View live deliverables."
              keywords="AI automation projects India, web development portfolio India, chatbot projects India, developer portfolio Delhi Mumbai Bangalore Hyderabad Chennai, pan India developer portfolio, freelance projects India"
            ><Projects /></PageWrapper>} />

            <Route path="/saas" element={<PageWrapper
              title="Proprietary SaaS Suites & Cloud Tools | Tushar Singh Labs"
              description="⚡ Explore proprietary cloud-native SaaS suites and autonomous tools by Tushar Singh Labs: TASQ-ONE (Intelligent Task OS), LeadFlow AI, and DocuParse Vault. Production live & beta access."
              keywords="Tushar Singh Labs SaaS, proprietary SaaS products, TASQ-ONE, cloud platforms India, autonomous AI SaaS suites, full stack SaaS developer Delhi"
            ><SaaS /></PageWrapper>} />

            <Route path="/saas/tasq-one" element={<PageWrapper
              title="TASQ-ONE — The Intelligent Task Operating System (SaaS) | Tushar Singh"
              description="⚡ TASQ-ONE is a cloud-native SaaS platform turning loosely defined ideas into production-ready tasks with Groq Llama 3.3 70B AI, real-time Kanban dependency DAGs, cryptographic audit trails & Indian team ROI calculator. Try public beta."
              keywords="TASQ-ONE, TASQ ONE, intelligent task operating system, AI task management SaaS, Groq Llama 3.3 70B, Kanban dependency DAG, cryptographic audit SaaS, Tushar Singh SaaS, software application Delhi India"
            ><TasqOne /></PageWrapper>} />

            <Route path="/blog" element={<PageWrapper
              title="AI Automation & Full-Stack Engineering Blog | Tushar Singh"
              description="💡 Actionable guides on AI automation, n8n workflows, RAG conversational chatbots & full-stack development — written from real production experience by Tushar Singh."
              keywords="tech blog India, AI automation blog India, web development articles India, developer blog Delhi Mumbai Bangalore Hyderabad Chennai, data science insights India, machine learning India"
            ><Blog /></PageWrapper>} />

            <Route path="/blog/:postId" element={<BlogPostWrapperInner />} />

            <Route path="/testimonials" element={<PageWrapper
              title="Client Reviews & Testimonials (4.0★) | Tushar Singh"
              description="⭐ Real client testimonials and reviews for Tushar Singh. 4.0★ rating across 10+ commercial AI automation, chatbot, and full-stack development projects in India & worldwide."
              keywords="client testimonials India, developer reviews India, AI automation reviews India, web development reviews India, reviews Delhi Mumbai Bangalore Hyderabad Chennai, pan India developer reviews"
            ><Testimonials /></PageWrapper>} />

            <Route path="/contact" element={<PageWrapper
              title="Contact Tushar Singh | Book Free 30-Min AI Strategy Audit"
              description="📞 Hire Tushar Singh for AI automation, smart chatbots & web engineering. Guaranteed response < 1 hour. Direct WhatsApp +91 88516 19647, Calendly schedule & official Google verified owner."
              keywords="hire developer India, contact developer Delhi Mumbai Bangalore Hyderabad Chennai Pune Kolkata, hire AI automation expert India, hire web developer India, freelance developer contact India, book consultation India"
            ><Contact /></PageWrapper>} />
          </Routes>
        </main>
        <AIChatAssistant />
        <LiveVisitorCounter />
        <FiverrFloatingButton />
        <WhatsAppButton />
        <ScrollToTop />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
