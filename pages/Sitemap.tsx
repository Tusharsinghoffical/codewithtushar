import React from 'react';
import { Link } from 'react-router-dom';
import {
  Globe, Compass, Sparkles, Layers, Cpu, Code2, FolderGit2,
  UserCheck, Star, Mail, BookOpen, ShieldCheck, ArrowUpRight, CheckCircle2, FileText
} from 'lucide-react';
import { BLOG_POSTS } from './Blog';
import { SAAS_PRODUCTS, PROJECTS, SERVICES } from '../constants';

const Sitemap: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Compass size={14} className="animate-spin-slow" />
            <span>Complete Website Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit tracking-tight text-white">
            HTML Sitemap &amp; Page Index
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Direct access to all pages, proprietary SaaS platforms, engineering case studies,
            and technical blog articles published on <strong>Code with Mr Singh</strong> (Tushar Singh).
          </p>
        </div>

        {/* Section 1: Core Navigation & Applications */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Globe size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-outfit text-white">Core Pages &amp; SaaS Platforms</h2>
              <p className="text-xs text-slate-400">Main commercial endpoints, applications, and consultation booking</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Home</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Official homepage of Tushar Singh — AI automation expert &amp; full-stack engineer.</p>
            </Link>

            <Link
              to="/saas"
              className="p-4 rounded-xl bg-slate-950/60 border border-indigo-500/30 hover:border-indigo-500 hover:bg-slate-900 transition-all group block relative overflow-hidden"
            >
              <div className="absolute top-2 right-2 text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                SaaS Hub
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">SaaS Suites</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Proprietary cloud software, multi-tenant architectures, and public web apps.</p>
            </Link>

            <Link
              to="/saas/tasq-one"
              className="p-4 rounded-xl bg-slate-950/60 border border-emerald-500/30 hover:border-emerald-500 hover:bg-slate-900 transition-all group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">TASQ-ONE OS</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-emerald-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Intelligent task operating system powered by Groq Llama 3.3 70B &amp; Kanban DAGs.</p>
            </Link>

            <Link
              to="/services"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Services</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">AI automation, 24/7 smart RAG chatbots, React.js web platforms &amp; branding.</p>
            </Link>

            <Link
              to="/projects"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Client Projects</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">10+ completed commercial deliverables with verified client business results.</p>
            </Link>

            <Link
              to="/about"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">About Tushar Singh</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">MCA graduate (MIT Pune), open source package author, and tech consultant.</p>
            </Link>

            <Link
              to="/testimonials"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Client Reviews (4.0★)</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Verified reviews and Google Business Owner certificates.</p>
            </Link>

            <Link
              to="/contact"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Contact &amp; Free Audit</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Book a free 30-minute AI strategy session or reach via direct WhatsApp.</p>
            </Link>

            <Link
              to="/blog"
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group block"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors">Blog &amp; Knowledge Base</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Technical deep dives into n8n, RAG chatbots, full-stack tools, and roadmaps.</p>
            </Link>
          </div>
        </div>

        {/* Section 2: Technical Blog Articles */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <BookOpen size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-outfit text-white">Technical Articles &amp; Open Source Guides</h2>
              <p className="text-xs text-slate-400">Engineering tutorials, NPM package documentations, and software roadmaps</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group block"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-white group-hover:text-indigo-400 transition-colors text-sm line-clamp-1">
                    {post.title}
                  </span>
                  <ArrowUpRight size={14} className="text-slate-400 group-hover:text-indigo-400 shrink-0" />
                </div>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-400 font-medium">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="text-indigo-400 font-medium">{post.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 3: Machine-Readable XML Sitemaps */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <FileText size={18} />
            </div>
            <div>
              <h2 className="text-xl font-bold font-outfit text-white">Machine-Readable XML Sitemaps</h2>
              <p className="text-xs text-slate-400">Crawling endpoints for Google Search Console, Bing Webmaster, and AI Answer Engines</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 text-xs font-mono text-slate-300 hover:text-emerald-400 flex items-center justify-between"
            >
              <span>/sitemap.xml (Master)</span>
              <ArrowUpRight size={12} />
            </a>

            <a
              href="/saas/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 text-xs font-mono text-slate-300 hover:text-emerald-400 flex items-center justify-between"
            >
              <span>/saas/sitemap.xml</span>
              <ArrowUpRight size={12} />
            </a>

            <a
              href="/sitemap-index.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 text-xs font-mono text-slate-300 hover:text-emerald-400 flex items-center justify-between"
            >
              <span>/sitemap-index.xml</span>
              <ArrowUpRight size={12} />
            </a>

            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/40 text-xs font-mono text-slate-300 hover:text-emerald-400 flex items-center justify-between"
            >
              <span>/robots.txt</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Sitemap;
