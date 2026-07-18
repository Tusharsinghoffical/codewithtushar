import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICES, ICON_MAP } from '../constants';
import { ArrowRight, Sparkles, CheckCircle2, TrendingUp, AlertCircle } from 'lucide-react';

// Inject per-service rich structured data for AEO (Answer Engine Optimization)
const injectServiceSchemas = (services: typeof SERVICES) => {
  const existing = document.getElementById('services-jsonld');
  if (existing) existing.remove();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "AI Automation & Web Development Services by Tushar Singh",
    "description": "Expert AI automation, chatbot development, web development, lead generation and data science services from Delhi, India. Available worldwide.",
    "url": "https://codewithmrsingh.me/services",
    "numberOfItems": services.length,
    "itemListElement": services.map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "item": {
        "@type": "Service",
        "name": s.title,
        "description": s.description,
        "provider": {
          "@type": "Person",
          "@id": "https://codewithmrsingh.me/#person",
          "name": "Tushar Singh"
        },
        "areaServed": "Worldwide",
        "url": "https://codewithmrsingh.me/services",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "INR"
        }
      }
    }))
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'services-jsonld';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

const Services: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    injectServiceSchemas(SERVICES);
    return () => {
      const el = document.getElementById('services-jsonld');
      if (el) el.remove();
    };
  }, []);

  const handleServiceClick = (service: any) => {
    sessionStorage.setItem('selectedService', JSON.stringify({
      service: service.title,
      category: service.category,
      description: service.description
    }));
    navigate('/contact');
  };

  return (
    <div className="pt-24 pb-20 px-6 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        {/* speakable class marks this section for Google Voice & AI answer engines */}
        <header className="text-center mb-6 speakable">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-4">
            <Sparkles size={12} /> Expert Freelance Services
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            AI Automation & Web Development Services
          </h1>
          {/* AEO: Rich description paragraph — AI engines cite this as an authoritative answer */}
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Tushar Singh offers expert <strong>AI automation</strong>, <strong>chatbot development</strong>,
            <strong> full-stack web development</strong>, <strong>lead generation systems</strong>, and
            <strong> data science solutions</strong> from Delhi, India — serving clients worldwide.
          </p>
        </header>

        {/* ── AEO SUMMARY BLOCK ──────────────────────────────────── */}
        {/* This hidden-but-crawlable section gives AI engines a structured answer  */}
        {/* for "What services does Tushar Singh offer?" type queries               */}
        <section
          aria-label="Services overview for search engines"
          className="sr-only"
        >
          <p>
            Tushar Singh provides the following freelance services: AI workflow automation using
            n8n and Python, RAG chatbot and AI agent development using OpenAI and LangChain,
            full-stack web development using React.js and Django, lead generation systems using
            Apollo and Instantly, high-converting sales funnel and landing page development,
            machine learning and data science solutions, Power BI dashboard development, and
            startup MVP development and consulting. All services are available for clients in
            India, USA, UK, Australia, Canada, UAE, and worldwide. Contact via
            codewithmrsingh.me/contact or WhatsApp at +91-8851619647.
          </p>
        </section>

        {/* ── SERVICES GRID ─────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          {SERVICES.map((service, index) => (
            <article
              key={service.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer"
              onClick={() => handleServiceClick(service)}
              itemScope
              itemType="https://schema.org/Service"
              itemProp="itemListElement"
              aria-label={`Service: ${service.title}`}
            >
              <meta itemProp="position" content={String(index + 1)} />
              <meta itemProp="url" content="https://codewithmrsingh.me/services" />

              {/* Icon */}
              <div className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-700 transition-colors" aria-hidden="true">
                {React.cloneElement(ICON_MAP[service.icon as keyof typeof ICON_MAP] as React.ReactElement<any>, { className: 'w-6 h-6' })}
              </div>

              {/* Service Name — h2 for semantic hierarchy & AEO */}
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3" itemProp="name">
                {service.title}
              </h2>

              {/* Description — visible to users and AI crawlers */}
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed" itemProp="description">
                {service.description}
              </p>

              {/* Problem Statement — AEO: surfaces for "what problem does X solve?" */}
              {service.problem && (
                <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-900/30">
                  <div className="flex items-start gap-2">
                    <AlertCircle size={14} className="text-rose-500 mt-0.5 shrink-0" aria-hidden="true" />
                    <p className="text-xs text-rose-700 dark:text-rose-400 font-medium leading-relaxed">
                      <span className="font-black uppercase tracking-wide text-[10px]">Problem: </span>
                      {service.problem}
                    </p>
                  </div>
                </div>
              )}

              {/* Features */}
              <ul className="space-y-2 mb-5" aria-label="Service features">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={14} className="text-indigo-500 shrink-0" aria-hidden="true" />
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>

              {/* Expected Results — AEO: "what results does Tushar Singh deliver?" */}
              {service.expectedResults && service.expectedResults.length > 0 && (
                <div className="mb-5 p-3 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp size={12} className="text-emerald-600" aria-hidden="true" />
                    <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Expected Results</span>
                  </div>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium leading-relaxed">
                    {service.expectedResults[0]}
                  </p>
                </div>
              )}

              {/* Tech Stack — keyword signals for search engines */}
              <div className="flex flex-wrap gap-2 mb-5" aria-label="Technologies used">
                {service.techStack.slice(0, 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-medium rounded-full"
                    itemProp="termsOfService"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <button
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 group/btn"
                aria-label={`Get a quote for ${service.title}`}
              >
                Get Quote
                <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>

        {/* ── AEO FAQ SECTION ────────────────────────────────────── */}
        {/* Visible Q&A content that AI engines can cite as answers  */}
        <section className="mt-16 mb-10" aria-labelledby="services-faq-heading">
          <h2 id="services-faq-heading" className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center speakable">
            Frequently Asked Questions about Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                q: "What AI automation services does Tushar Singh offer?",
                a: "Tushar Singh builds custom n8n and Python-based workflows, AI agents, RAG chatbots using OpenAI and LangChain, WhatsApp bots, and end-to-end business process automation that saves 10+ hours per week."
              },
              {
                q: "How much does a chatbot development project cost?",
                a: "Chatbot projects range from ₹80,000 for a simple FAQ bot to ₹3,00,000+ for a full RAG-based AI agent with CRM integration. Contact via WhatsApp +91-8851619647 for a custom quote."
              },
              {
                q: "Does Tushar Singh offer full-stack web development?",
                a: "Yes. He builds modern web applications using React.js, Next.js, Django, and Python. Projects include startup MVPs, e-commerce platforms, SaaS dashboards, and agency white-label solutions."
              },
              {
                q: "What lead generation results has Tushar Singh achieved?",
                a: "Tushar Singh has delivered 250+ qualified leads in 10 days for a real estate client, automated LinkedIn and email outreach resulting in 50+ monthly sales meetings, and implemented systems with 95%+ email deliverability."
              }
            ].map(({ q, a }, i) => (
              <div
                key={i}
                className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-white/5"
                itemScope
                itemType="https://schema.org/Question"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2" itemProp="name">{q}</h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed" itemProp="text">{a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER CTA ─────────────────────────────────────────── */}
        <div className="mt-8 p-12 bg-slate-900 dark:bg-slate-800 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Need a custom solution?</h2>
          <p className="text-slate-400 mb-2">
            Book a free 30-minute AI automation audit — completely free, no obligations.
          </p>
          <p className="text-slate-500 text-sm mb-6">
            WhatsApp: <a href="https://wa.me/918851619647" className="text-emerald-400 underline">+91-8851619647</a> &nbsp;|&nbsp;
            Email: <a href="mailto:tusharsinghkumar04@gmail.com" className="text-indigo-400 underline">tusharsinghkumar04@gmail.com</a>
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Book a free consultation with Tushar Singh"
          >
            Book Free Consultation
          </button>
        </div>

      </div>
    </div>
  );
};

export default Services;
