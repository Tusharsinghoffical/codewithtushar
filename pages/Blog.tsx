import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Tag, Sparkles,
  Brain, Zap, Code2, BookOpen, ChevronRight,
  ArrowRight, Share2, Check, Copy, Link2
} from 'lucide-react';

/* ─── Blog post data ─────────────────────────────────────── */
export const BLOG_POSTS = [
  {
    id: 'faang-coding-roadmap-150-questions',
    title: 'From Basics to FAANG: Your Ultimate Roadmap with 150 Coding Questions',
    excerpt: 'A curated set of 150 coding questions designed to take you from fundamentals to FAANG-level problem solving — structured, progressive, and battle-tested.',
    category: 'Career Development',
    date: 'Jun 2026',
    icon: 'Code2',
    color: 'indigo',
    tags: ['Coding', 'FAANG', 'Interview Prep', 'DSA'],
    heroGradient: 'from-indigo-600 to-violet-600',
    content: `<div class="blog-content space-y-10">
      <div style="background:linear-gradient(135deg,#6366f1,#7c3aed);padding:3rem;border-radius:1.5rem;color:white;text-align:center;">
        <h2 style="font-size:2rem;font-weight:800;margin-bottom:0.75rem;">🚀 From Basics to FAANG</h2>
        <p style="opacity:0.9;font-size:1.1rem;">Your Complete Roadmap with 150 Coding Questions</p>
      </div>
      <div style="background:#f8fafc;padding:2rem;border-radius:1rem;border-left:4px solid #6366f1;">
        <h3 style="color:#6366f1;font-size:1.4rem;font-weight:700;margin-bottom:0.75rem;">💡 The Challenge</h3>
        <p style="line-height:1.8;color:#475569;">Cracking top-tier companies requires more than knowing syntax — it demands mastering problem-solving at scale. This curated set of 150 questions is designed to take you from fundamentals to advanced system thinking.</p>
      </div>
      <div>
        <h3 style="font-size:1.5rem;font-weight:800;margin-bottom:1.25rem;color:#1e293b;">Three Progressive Tiers</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;">
          <div style="background:linear-gradient(135deg,#10b981,#059669);padding:1.75rem;border-radius:1rem;color:white;">
            <div style="font-size:2rem;margin-bottom:0.5rem;">🔰</div>
            <h4 style="font-size:1.2rem;font-weight:700;margin-bottom:0.5rem;">Easy (1–50)</h4>
            <p style="font-size:0.9rem;opacity:0.95;line-height:1.6;">Arrays, strings, number theory — build core thinking patterns every developer needs.</p>
          </div>
          <div style="background:linear-gradient(135deg,#3b82f6,#2563eb);padding:1.75rem;border-radius:1rem;color:white;">
            <div style="font-size:2rem;margin-bottom:0.5rem;">⚙️</div>
            <h4 style="font-size:1.2rem;font-weight:700;margin-bottom:0.5rem;">Medium (51–100)</h4>
            <p style="font-size:0.9rem;opacity:0.95;line-height:1.6;">Sliding window, recursion, linked lists — transition from learner to practitioner.</p>
          </div>
          <div style="background:linear-gradient(135deg,#ef4444,#dc2626);padding:1.75rem;border-radius:1rem;color:white;">
            <div style="font-size:2rem;margin-bottom:0.5rem;">🔥</div>
            <h4 style="font-size:1.2rem;font-weight:700;margin-bottom:0.5rem;">Hard (101–150)</h4>
            <p style="font-size:0.9rem;opacity:0.95;line-height:1.6;">DP, graphs, trees, system design — simulate FAANG-level interview complexity.</p>
          </div>
        </div>
      </div>
      <div style="background:linear-gradient(135deg,#fef3c7,#fde68a);padding:2rem;border-radius:1.25rem;border:2px solid #fbbf24;">
        <h3 style="font-size:1.3rem;font-weight:800;color:#92400e;margin-bottom:1rem;">📈 How to Use This Strategically</h3>
        <ul style="list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0.75rem;">
          <li style="background:white;padding:1rem;border-radius:0.75rem;border-left:4px solid #f59e0b;"><b style="color:#f59e0b;">⏰ Daily</b><br/><span style="color:#475569;font-size:0.9rem;">1–2 hours focused practice</span></li>
          <li style="background:white;padding:1rem;border-radius:0.75rem;border-left:4px solid #f59e0b;"><b style="color:#f59e0b;">🎯 Start</b><br/><span style="color:#475569;font-size:0.9rem;">2–3 Easy problems/day</span></li>
          <li style="background:white;padding:1rem;border-radius:0.75rem;border-left:4px solid #f59e0b;"><b style="color:#f59e0b;">📊 Level Up</b><br/><span style="color:#475569;font-size:0.9rem;">Move to Medium when consistent</span></li>
          <li style="background:white;padding:1rem;border-radius:0.75rem;border-left:4px solid #f59e0b;"><b style="color:#f59e0b;">🎪 Weekend</b><br/><span style="color:#475569;font-size:0.9rem;">Hard + System Design focus</span></li>
        </ul>
      </div>
      <div style="background:linear-gradient(135deg,#06b6d4,#0891b2);padding:2.5rem;border-radius:1.25rem;text-align:center;">
        <h3 style="font-size:1.5rem;font-weight:800;color:white;margin-bottom:1rem;">📚 Access the Complete Resource</h3>
        <p style="color:rgba(255,255,255,0.9);margin-bottom:1.5rem;">All 150 questions with detailed solutions — free PDF download.</p>
        <a href="https://drive.google.com/file/d/130rijB2ne3zLPRuPVJZeFc45A5gcsfss/view?usp=sharing" target="_blank" rel="noopener noreferrer"
          style="display:inline-flex;align-items:center;gap:0.75rem;background:white;color:#0891b2;padding:0.875rem 2rem;border-radius:0.75rem;font-weight:700;text-decoration:none;">
          📄 Download Complete PDF Guide →
        </a>
      </div>
    </div>`
  },
  {
    id: 'n8n-automation-guide-beginners-2026',
    title: 'n8n Automation for Beginners: Build Your First AI Workflow in 2026',
    excerpt: 'A practical guide to building production-ready automation workflows with n8n — from connecting your first tools to deploying an AI-powered business system.',
    category: 'AI Automation',
    date: 'Jul 2026',
    icon: 'Zap',
    color: 'emerald',
    tags: ['n8n', 'Automation', 'AI Workflows', 'No-Code'],
    heroGradient: 'from-emerald-600 to-teal-600',
    content: `<div class="blog-content space-y-10">
      <div style="background:linear-gradient(135deg,#059669,#0d9488);padding:3rem;border-radius:1.5rem;color:white;text-align:center;">
        <h2 style="font-size:2rem;font-weight:800;margin-bottom:0.75rem;">⚡ n8n Automation for Beginners</h2>
        <p style="opacity:0.9;font-size:1.1rem;">Build Your First AI Workflow in 2026</p>
      </div>
      <div style="background:#f0fdf4;padding:2rem;border-radius:1rem;border-left:4px solid #10b981;">
        <h3 style="color:#059669;font-size:1.4rem;font-weight:700;margin-bottom:0.75rem;">🤔 Why n8n?</h3>
        <p style="line-height:1.8;color:#475569;">n8n is the open-source automation platform that lets you connect 400+ apps, build AI agents, and automate complex business workflows — without writing code.</p>
      </div>
      <div>
        <h3 style="font-size:1.5rem;font-weight:800;margin-bottom:1.25rem;color:#1e293b;">🔧 Core Concepts</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1rem;">
          <div style="padding:1.5rem;background:#f8fafc;border-radius:1rem;border:2px solid #e2e8f0;"><b style="color:#1e293b;display:block;margin-bottom:0.5rem;">📌 Nodes</b><p style="font-size:0.9rem;color:#64748b;">Each app or action is a node. Connect them to build a workflow.</p></div>
          <div style="padding:1.5rem;background:#f8fafc;border-radius:1rem;border:2px solid #e2e8f0;"><b style="color:#1e293b;display:block;margin-bottom:0.5rem;">🔗 Triggers</b><p style="font-size:0.9rem;color:#64748b;">Webhooks, schedules, or app events that start your workflow.</p></div>
          <div style="padding:1.5rem;background:#f8fafc;border-radius:1rem;border:2px solid #e2e8f0;"><b style="color:#1e293b;display:block;margin-bottom:0.5rem;">🧠 AI Nodes</b><p style="font-size:0.9rem;color:#64748b;">Connect OpenAI, Claude, or Gemini to add intelligence.</p></div>
          <div style="padding:1.5rem;background:#f8fafc;border-radius:1rem;border:2px solid #e2e8f0;"><b style="color:#1e293b;display:block;margin-bottom:0.5rem;">📊 Data Mapping</b><p style="font-size:0.9rem;color:#64748b;">Pass data between nodes using expressions.</p></div>
        </div>
      </div>
      <div style="background:#1e293b;padding:2rem;border-radius:1.25rem;color:white;">
        <h3 style="font-size:1.3rem;font-weight:800;margin-bottom:1rem;color:#a5b4fc;">🚀 Your First Workflow: Lead Capture → Slack Notification</h3>
        <ol style="padding-left:1.5rem;">
          <li style="margin-bottom:0.75rem;color:#cbd5e1;line-height:1.6;"><b style="color:white;">Step 1:</b> Add a Webhook trigger — receives form submissions.</li>
          <li style="margin-bottom:0.75rem;color:#cbd5e1;line-height:1.6;"><b style="color:white;">Step 2:</b> Add a Google Sheets node — log each lead automatically.</li>
          <li style="margin-bottom:0.75rem;color:#cbd5e1;line-height:1.6;"><b style="color:white;">Step 3:</b> Add an OpenAI node — generate a personalised email.</li>
          <li style="margin-bottom:0.75rem;color:#cbd5e1;line-height:1.6;"><b style="color:white;">Step 4:</b> Add a Gmail node — send the email automatically.</li>
          <li style="color:#cbd5e1;line-height:1.6;"><b style="color:white;">Step 5:</b> Add a Slack node — notify your team in real time.</li>
        </ol>
      </div>
      <div style="background:#f8fafc;padding:2rem;border-radius:1.25rem;border:2px solid #e2e8f0;text-align:center;">
        <p style="font-size:1.1rem;font-weight:600;color:#1e293b;margin-bottom:1rem;">Ready to automate with n8n?</p>
        <a href="/contact" style="display:inline-flex;align-items:center;gap:0.5rem;background:#059669;color:white;padding:0.875rem 2rem;border-radius:0.75rem;font-weight:700;text-decoration:none;">Book Free Audit →</a>
      </div>
    </div>`
  },
  {
    id: 'ai-chatbot-for-business-complete-guide-2026',
    title: 'How to Build an AI Chatbot for Your Business in 2026 — Complete Guide',
    excerpt: 'Everything you need to know about building a production-ready AI chatbot using RAG, OpenAI, and LangChain — from architecture to deployment on your website or WhatsApp.',
    category: 'AI & Chatbots',
    date: 'Jul 2026',
    icon: 'Brain',
    color: 'violet',
    tags: ['Chatbot', 'RAG', 'OpenAI', 'LangChain', 'WhatsApp AI'],
    heroGradient: 'from-violet-600 to-purple-700',
    content: `<div class="blog-content space-y-10">
      <div style="background:linear-gradient(135deg,#7c3aed,#6d28d9);padding:3rem;border-radius:1.5rem;color:white;text-align:center;">
        <h2 style="font-size:2rem;font-weight:800;margin-bottom:0.75rem;">🤖 AI Chatbot for Business in 2026</h2>
        <p style="opacity:0.9;font-size:1.1rem;">Complete RAG Architecture Guide — From Idea to Deployment</p>
      </div>
      <div style="background:#faf5ff;padding:2rem;border-radius:1rem;border-left:4px solid #7c3aed;">
        <h3 style="color:#7c3aed;font-size:1.4rem;font-weight:700;margin-bottom:0.75rem;">🎯 What is RAG?</h3>
        <p style="line-height:1.8;color:#475569;">RAG (Retrieval-Augmented Generation) lets you build AI chatbots that answer questions using YOUR specific business data — not just generic internet knowledge.</p>
      </div>
      <div>
        <h3 style="font-size:1.5rem;font-weight:800;margin-bottom:1.25rem;color:#1e293b;">🏗️ RAG Architecture — How it Works</h3>
        <div style="background:#1e293b;padding:2rem;border-radius:1.25rem;color:white;">
          <div style="display:flex;flex-direction:column;gap:1rem;">
            <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:rgba(255,255,255,0.05);border-radius:0.75rem;"><span style="background:#7c3aed;color:white;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.9rem;flex-shrink:0;">1</span><div><b style="color:white;">Document Ingestion</b><br/><span style="color:#94a3b8;font-size:0.9rem;">PDFs, docs, FAQs processed and split into chunks.</span></div></div>
            <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:rgba(255,255,255,0.05);border-radius:0.75rem;"><span style="background:#7c3aed;color:white;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.9rem;flex-shrink:0;">2</span><div><b style="color:white;">Embeddings + Vector Store</b><br/><span style="color:#94a3b8;font-size:0.9rem;">Each chunk converted to vector embedding, stored in Pinecone.</span></div></div>
            <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:rgba(255,255,255,0.05);border-radius:0.75rem;"><span style="background:#7c3aed;color:white;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.9rem;flex-shrink:0;">3</span><div><b style="color:white;">Query + Retrieval</b><br/><span style="color:#94a3b8;font-size:0.9rem;">User question → semantic search → top relevant chunks retrieved.</span></div></div>
            <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:rgba(255,255,255,0.05);border-radius:0.75rem;"><span style="background:#7c3aed;color:white;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.9rem;flex-shrink:0;">4</span><div><b style="color:white;">LLM Response Generation</b><br/><span style="color:#94a3b8;font-size:0.9rem;">OpenAI GPT-4 generates an accurate answer using only your context.</span></div></div>
          </div>
        </div>
      </div>
      <div>
        <h3 style="font-size:1.5rem;font-weight:800;margin-bottom:1.25rem;color:#1e293b;">🌐 Deployment Options</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem;">
          <div style="padding:1.5rem;background:#f8fafc;border-radius:1rem;border:2px solid #e2e8f0;text-align:center;"><div style="font-size:2rem;margin-bottom:0.5rem;">🌐</div><b>Website Widget</b></div>
          <div style="padding:1.5rem;background:#f8fafc;border-radius:1rem;border:2px solid #e2e8f0;text-align:center;"><div style="font-size:2rem;margin-bottom:0.5rem;">💬</div><b>WhatsApp</b></div>
          <div style="padding:1.5rem;background:#f8fafc;border-radius:1rem;border:2px solid #e2e8f0;text-align:center;"><div style="font-size:2rem;margin-bottom:0.5rem;">✈️</div><b>Telegram</b></div>
          <div style="padding:1.5rem;background:#f8fafc;border-radius:1rem;border:2px solid #e2e8f0;text-align:center;"><div style="font-size:2rem;margin-bottom:0.5rem;">📧</div><b>Email</b></div>
        </div>
      </div>
      <div style="background:#faf5ff;padding:2rem;border-radius:1.25rem;border:2px solid #c4b5fd;text-align:center;">
        <p style="font-size:1.1rem;font-weight:600;color:#6d28d9;margin-bottom:0.75rem;">Want a custom RAG chatbot for your business?</p>
        <a href="/contact" style="display:inline-flex;align-items:center;gap:0.5rem;background:#7c3aed;color:white;padding:0.875rem 2rem;border-radius:0.75rem;font-weight:700;text-decoration:none;">Book Free Consultation →</a>
      </div>
    </div>`
  }
];
/* ─── Color maps ─────────────────────────────────────────── */
const BADGE: Record<string, string> = {
  indigo: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-400/20',
  emerald:'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-400/20',
  violet: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-400/20',
};
const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={14} />,
  Zap:   <Zap size={14} />,
  Brain: <Brain size={14} />,
};

/* ─── Share Button ───────────────────────────────────────── */
const ShareButton: React.FC<{ title: string; url: string; text: string }> = ({ title, url, text }) => {
  const [copied, setCopied] = React.useState(false);

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title, text, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      // User cancelled or clipboard failed — fallback to copy
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (_) {}
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95"
      aria-label="Share this article"
    >
      {copied
        ? <><Check size={13} className="text-emerald-500" /> Link Copied!</>
        : <><Share2 size={13} /> Share Post</>
      }
    </button>
  );
};

/* ─── Post card (list view) ──────────────────────────────── */
const PostCard = ({ post, featured = false }: { post: typeof BLOG_POSTS[0]; featured?: boolean }) => {
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/blog/${post.id}`)}
      className={`group cursor-pointer bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-white/5 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-400 ${featured ? 'sm:col-span-2' : ''}`}
    >
      <div className={`h-2 bg-gradient-to-r ${post.heroGradient}`} />
      <div className="p-7">
        <div className="flex items-start gap-3 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${BADGE[post.color]}`}>
            {ICON_MAP[post.icon]} {post.category}
          </span>
        </div>
        <h2 className={`font-outfit font-extrabold text-slate-950 dark:text-white mb-3 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>
          {post.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-5 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(t => (
              <span key={t} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-[8px] font-bold rounded-md">#{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-[10px] font-black text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
            Read <ArrowRight size={12} />
          </div>
        </div>
      </div>
    </article>
  );
};

/* ─── Post detail view ───────────────────────────────────── */
const PostView = ({ post }: { post: typeof BLOG_POSTS[0] }) => {
  const navigate = useNavigate();
  const postUrl = `https://codewithmrsingh.me/blog/${post.id}`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero gradient */}
      <div className={`pt-28 pb-14 px-5 sm:px-10 bg-gradient-to-br ${post.heroGradient}`}>
        <div className="max-w-3xl mx-auto">
          <button onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-white/70 hover:text-white text-[10px] font-black uppercase tracking-widest mb-8 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </button>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[9px] font-black uppercase tracking-widest mb-4`}>
            {ICON_MAP[post.icon]} {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-outfit font-extrabold text-white leading-tight mb-2">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-5 sm:px-10 py-12">
        <div
          className="text-slate-700 dark:text-slate-300 leading-relaxed mb-10"
          style={{ fontSize: '1.05rem', lineHeight: 1.75 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags + Share row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(t => (
              <span key={t} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-full">
                #{t}
              </span>
            ))}
          </div>
          {/* Share button */}
          <ShareButton
            title={post.title}
            url={postUrl}
            text={`${post.excerpt} — Read on Code with Mr. Singh`}
          />
        </div>

        {/* Copy URL row */}
        <div className="mt-4 flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-white/5 rounded-xl">
          <Link2 size={12} className="text-slate-400 shrink-0" />
          <span className="text-xs text-slate-500 dark:text-slate-400 flex-1 truncate font-mono">{postUrl}</span>
          <button
            onClick={() => { navigator.clipboard.writeText(postUrl); }}
            className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Copy size={10} /> Copy
          </button>
        </div>

        {/* CTA */}
        <div className="mt-10 p-7 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-400/20 rounded-3xl text-center">
          <p className="text-base font-extrabold text-slate-900 dark:text-white mb-2">Need help implementing this?</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Book a free consultation — I'll show you exactly how to apply this to your business.</p>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-indigo-600 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all">
            Book Free Consultation <ChevronRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Blog page ─────────────────────────────────────── */
const Blog: React.FC = () => {
  const { postId } = useParams<{ postId?: string }>();
  const [activeTag, setActiveTag] = useState('All');

  if (postId) {
    const post = BLOG_POSTS.find(p => p.id === postId);
    if (post) return <PostView post={post} />;
  }

  const allTags = ['All', ...Array.from(new Set(BLOG_POSTS.flatMap(p => p.tags)))];
  const filtered = activeTag === 'All' ? BLOG_POSTS : BLOG_POSTS.filter(p => p.tags.includes(activeTag));

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* Header */}
      <section className="pt-28 pb-14 px-5 sm:px-10 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest mb-5">
            <BookOpen size={11} /> Technical Insights &amp; Guides
          </div>
          <h1 className="text-3xl sm:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white tracking-tight mb-4 speakable">
            Engineering <span className="text-indigo-600 dark:text-indigo-400">Blog.</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Practical guides on AI automation, chatbot development, and full-stack web development — written from real project experience.
          </p>
        </div>
      </section>

      {/* Tag filter */}
      <div className="px-5 sm:px-10 py-6 border-b border-slate-100 dark:border-white/5 overflow-x-auto">
        <div className="max-w-5xl mx-auto flex items-center gap-2 flex-nowrap">
          <Tag size={12} className="text-slate-400 shrink-0" />
          {allTags.slice(0, 9).map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              className={`shrink-0 px-3.5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                activeTag === tag
                  ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 border-slate-950 dark:border-white'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-300'
              }`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Post grid */}
      <section className="py-14 sm:py-20 px-5 sm:px-10">
        <div className="max-w-5xl mx-auto">
          {activeTag === 'All' && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-5">
                <Sparkles size={12} className="text-indigo-500" />
                <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Featured Post</span>
              </div>
              <PostCard post={BLOG_POSTS[0]} featured={true} />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {(activeTag === 'All' ? filtered.slice(1) : filtered).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">📭</p>
              <p className="text-slate-500 font-medium">No posts match this tag.</p>
              <button onClick={() => setActiveTag('All')} className="mt-4 text-indigo-600 dark:text-indigo-400 text-sm font-bold hover:underline">
                View all posts
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 px-5 sm:px-10 bg-slate-950 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-3">Stay Updated</p>
          <h2 className="text-2xl font-outfit font-extrabold text-white mb-4">
            Want more AI &amp; automation insights?
          </h2>
          <p className="text-slate-400 text-sm mb-7 leading-relaxed">
            Follow on YouTube &amp; Instagram for tutorials, project breakdowns, and automation tips.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="https://www.youtube.com/@codewithmrsingh4u" target="_blank" rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 bg-white text-slate-950 rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-indigo-50 transition-all">
              YouTube Channel
            </a>
            <Link to="/contact"
              className="w-full sm:w-auto px-7 py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
              Work With Me
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
