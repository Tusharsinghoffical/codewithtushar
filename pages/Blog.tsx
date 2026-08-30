import React, { useState, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Tag, Sparkles, Brain, Zap, Code2, BookOpen,
  ChevronRight, ArrowRight, Share2, Check, Copy, Link2,
  Clock, Search, User, Youtube, Instagram, MessageCircle,
  TrendingUp, Award, ExternalLink, Calendar, Bookmark, ShieldCheck
} from 'lucide-react';
import postsData from '../content/posts.json';
import SharePageButton from '../components/SharePageButton';
import { FiverrIcon, FiverrBadge } from '../components/FiverrBadge';
import { FIVERR_PROFILE_URL } from '../constants';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  dateDisplay?: string;
  icon: string;
  color: string;
  tags: string[];
  heroGradient: string;
  imageUrl?: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = postsData as BlogPost[];

const BADGE_COLOR: Record<string, string> = {
  indigo:  'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-500/30',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30',
  violet:  'bg-violet-50 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30',
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={15} />,
  Zap:   <Zap size={15} />,
  Brain: <Brain size={15} />,
};

/* ─── Post Card (Listing View) ───────────────────────────── */
const PostCard: React.FC<{ post: BlogPost; featured?: boolean }> = ({ post, featured = false }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/blog/${post.id}`)}
      className={`group cursor-pointer relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      <div className={`h-1.5 bg-gradient-to-r ${post.heroGradient || 'from-indigo-600 to-violet-600'}`} />

      <div className="p-7 sm:p-8 flex flex-col flex-grow justify-between space-y-5">
        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${BADGE_COLOR[post.color] || BADGE_COLOR.indigo}`}>
              {ICON_MAP[post.icon] || <BookOpen size={13} />}
              <span>{post.category}</span>
            </span>
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
              <Clock size={12} /> 5 min read
            </span>
          </div>

          <h2 className={`font-outfit font-black text-slate-950 dark:text-white mb-3 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${
            featured ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl'
          }`}>
            {post.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 font-medium">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded-lg">
                #{tag}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 text-[11px] font-black text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0">
            <span>Read Guide</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </article>
  );
};

/* ─── Detail Article View (Redesigned & Clean) ───────────── */
const PostView: React.FC<{ post: BlogPost }> = ({ post }) => {
  const navigate = useNavigate();
  const postUrl = typeof window !== 'undefined' ? window.location.href : `https://codewithmrsingh.me/blog/${post.id}`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* 1. Article Header Section */}
      <section className="pt-28 sm:pt-32 pb-12 px-5 sm:px-10 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Top Breadcrumb & Share */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-300 text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
            >
              <ArrowLeft size={14} /> Back to Guides
            </button>

            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${BADGE_COLOR[post.color] || BADGE_COLOR.indigo}`}>
              {ICON_MAP[post.icon] || <BookOpen size={13} />}
              <span>{post.category}</span>
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-outfit font-black text-slate-950 dark:text-white leading-[1.18] tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Author Card & Publication Bar */}
          <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src="/tushar-singh.webp"
                alt="Tushar Singh"
                className="w-12 h-12 rounded-2xl object-cover border border-indigo-200 dark:border-indigo-500/30 shadow-md"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-outfit font-black text-slate-950 dark:text-white">Tushar Singh</p>
                  <ShieldCheck size={14} className="text-emerald-500" />
                </div>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Founder, Code with Mr Singh • {post.dateDisplay || '2026'}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Clock size={13} /> 5 Min Read
              </span>
              <SharePageButton
                title={post.title}
                text={post.excerpt}
                url={postUrl}
                variant="outline"
              />
            </div>
          </div>

        </div>
      </section>

      {/* 2. Article Content Body */}
      <section className="py-12 sm:py-16 px-5 sm:px-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div
            className="prose dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 leading-relaxed font-medium space-y-6"
            style={{ fontSize: '1.05rem', lineHeight: 1.85 }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Tags Footer */}
          <div className="pt-8 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map(t => (
                <span key={t} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl border border-slate-200/60 dark:border-white/5">
                  #{t}
                </span>
              ))}
            </div>

            <SharePageButton
              title={`${post.title} | Code with Mr Singh`}
              text={post.excerpt}
              url={postUrl}
              buttonLabel="Share This Guide"
            />
          </div>

          {/* Author CTA Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
            <img
              src="/tushar-singh.webp"
              alt="Tushar Singh"
              className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-md shrink-0"
            />
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg font-outfit font-black text-slate-950 dark:text-white">
                  Need AI Automation or a Custom Web Platform?
                </h3>
                <FiverrBadge variant="pill" />
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Tushar Singh builds production-grade AI automations, chatbots, and web apps for businesses worldwide. Book a free 30-minute consultation or hire with Fiverr 100% buyer escrow protection.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 justify-center sm:justify-start">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer active:scale-95"
                >
                  Book Free Consultation
                </button>
                <a
                  href={FIVERR_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#1DBF73] hover:bg-[#19a463] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
                >
                  <FiverrIcon size={13} className="brightness-125" />
                  <span>Hire on Fiverr</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

/* ─── Main Blog Listing Component ────────────────────────── */
const Blog: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [activeTag, setActiveTag] = useState('All');
  const [search, setSearch]       = useState('');

  const activePost = useMemo(() => {
    if (!postId) return null;
    return BLOG_POSTS.find(p => p.id === postId) ?? null;
  }, [postId]);

  const allTags = useMemo(() => {
    const s = new Set<string>();
    s.add('All');
    BLOG_POSTS.forEach(p => p.tags.forEach(t => s.add(t)));
    return Array.from(s);
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(p => {
      const matchTag = activeTag === 'All' || p.tags.includes(activeTag);
      const matchSearch = search.trim() === '' ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      return matchTag && matchSearch;
    });
  }, [activeTag, search]);

  if (activePost) {
    return <PostView post={activePost} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">

      {/* ── 1. HERO SECTION ─────────────────────────────────── */}
      <section className="relative pt-32 pb-16 px-5 sm:px-10 overflow-hidden border-b border-slate-100 dark:border-white/5">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-teal-500/10 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <Sparkles size={12} className="text-indigo-500 animate-pulse" />
              <span>Engineering &amp; AI Guides</span>
            </div>
            <FiverrBadge variant="pill" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.12] speakable">
            Actionable Guides on AI, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">
              Automation &amp; Full-Stack Dev
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Written by Tushar Singh — free battle-tested blueprints on FAANG coding roadmaps, n8n automated workflows, and RAG chatbot architecture.
          </p>
        </div>
      </section>

      {/* ── 2. SEARCH & TAG FILTER BAR ──────────────────────── */}
      <section className="py-6 px-5 sm:px-10 sticky top-16 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            {allTags.map(tag => {
              const on = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    on
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {tag === 'All' ? '⚡ All Guides' : `#${tag}`}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search guides & topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── 3. POSTS GRID ───────────────────────────────────── */}
      <section className="py-14 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-8 space-y-3">
              <p className="text-sm font-bold text-slate-500">No articles matched your search.</p>
              <button
                onClick={() => { setActiveTag('All'); setSearch(''); }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Reset Filter
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} featured={index === 0 && activeTag === 'All' && !search} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. SOCIAL & COMMUNITY BANNER ────────────────────── */}
      <section className="py-16 px-5 sm:px-10 bg-slate-50 dark:bg-slate-900/30 border-t border-slate-100 dark:border-white/5">
        <div className="max-w-4xl mx-auto p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-center space-y-5 shadow-lg">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Join the Community</span>
          <h3 className="text-2xl sm:text-3xl font-outfit font-black text-slate-950 dark:text-white">
            Learn Coding &amp; AI with Code with Mr Singh
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed font-medium">
            Subscribe on YouTube and follow on Instagram for weekly practical tutorials on n8n workflows, Python, full-stack development, and AI agent engineering.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://youtube.com/@codewithmrsingh4u"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <Youtube size={15} />
              <span>YouTube Channel</span>
            </a>
            <a
              href="https://www.instagram.com/tushar.cms/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <Instagram size={15} />
              <span>Instagram @tushar.cms</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
