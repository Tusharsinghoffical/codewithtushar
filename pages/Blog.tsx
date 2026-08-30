import React, { useState, useMemo } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Tag, Sparkles, Brain, Zap, Code2, BookOpen,
  ChevronRight, ArrowRight, Share2, Check, Copy, Link2,
  Clock, Search, User, Youtube, Instagram, MessageCircle,
  TrendingUp, Award, ExternalLink
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

/* ─── Post Card Component ────────────────────────────────── */
const PostCard: React.FC<{ post: BlogPost; featured?: boolean }> = ({ post, featured = false }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/blog/${post.id}`)}
      className={`group cursor-pointer relative bg-white dark:bg-slate-900/80 border border-slate-200/80 dark:border-white/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between backdrop-blur-xl ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Top Gradient Stripe */}
      <div className={`h-1.5 bg-gradient-to-r ${post.heroGradient || 'from-indigo-600 to-violet-600'}`} />

      <div className="p-7 sm:p-8 flex flex-col flex-grow justify-between space-y-5">
        <div>
          {/* Header Row: Category Badge & Reading Time */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${BADGE_COLOR[post.color] || BADGE_COLOR.indigo}`}>
              {ICON_MAP[post.icon] || <BookOpen size={14} />}
              <span>{post.category}</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
              <Clock size={12} /> 5 min read
            </span>
          </div>

          {/* Title */}
          <h2 className={`font-outfit font-black text-slate-950 dark:text-white mb-3 leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${
            featured ? 'text-xl sm:text-2xl lg:text-3xl' : 'text-lg sm:text-xl'
          }`}>
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3 font-medium">
            {post.excerpt}
          </p>
        </div>

        {/* Footer: Tags & Read Link */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-white/5">
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[9px] font-bold rounded-md">
                #{tag}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-1 text-[11px] font-black text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-all shrink-0">
            <span>Read Article</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </div>
    </article>
  );
};

/* ─── Detail Post View ───────────────────────────────────── */
const PostView: React.FC<{ post: BlogPost }> = ({ post }) => {
  const navigate = useNavigate();
  const postUrl = `https://codewithmrsingh.me/blog/${post.id}`;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Header Banner */}
      <div className={`pt-32 pb-16 px-5 sm:px-10 bg-gradient-to-br ${post.heroGradient || 'from-slate-950 to-indigo-950'} text-white relative overflow-hidden border-b border-indigo-500/20`}>
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to All Articles
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider backdrop-blur-md border border-white/20">
              {ICON_MAP[post.icon] || <BookOpen size={13} />}
              <span>{post.category}</span>
            </span>
            <span className="text-xs text-white/80 font-bold">• 5 Min Read</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-outfit font-black text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-sm sm:text-base text-white/85 leading-relaxed max-w-2xl font-medium">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-outfit font-black text-sm shadow-md">
              TS
            </div>
            <div>
              <p className="text-xs font-black text-white">Written by Tushar Singh</p>
              <p className="text-[10px] text-white/70">AI Automation Expert &amp; Developer</p>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-5 sm:px-10 py-14">
        <div
          className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base space-y-5"
          style={{ fontSize: '1.05rem', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags and Share Row */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map(t => (
              <span key={t} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl">
                #{t}
              </span>
            ))}
          </div>

          <SharePageButton
            title={`${post.title} | Code with Mr Singh`}
            text={post.excerpt}
            url={postUrl}
            buttonLabel="Share This Article"
          />
        </div>

        {/* Author Callout Box */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-slate-900 dark:to-indigo-950/40 border border-indigo-200 dark:border-indigo-500/20 flex flex-col sm:flex-row items-center gap-6 shadow-md">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-outfit font-black text-xl shrink-0 shadow-lg">
            TS
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg font-outfit font-black text-slate-950 dark:text-white">
              Need AI Automation or a Custom Web Platform?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Tushar Singh builds production-grade AI automations, chatbots, and web apps for businesses worldwide. Book a free 30-minute consultation or hire with Fiverr buyer protection.
            </p>
            <div className="flex flex-wrap gap-3 pt-2 justify-center sm:justify-start">
              <button
                onClick={() => navigate('/contact')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer"
              >
                Book Free Consultation
              </button>
              <a
                href={FIVERR_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#1DBF73] hover:bg-[#19a463] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                Hire on Fiverr
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Main Blog Component ────────────────────────────────── */
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
              <span>Technical Guides &amp; Insights</span>
            </div>
            <FiverrBadge variant="pill" />
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.15] speakable">
            AI Engineering &amp; <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500 bg-clip-text text-transparent">
              Automation Insights
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Actionable articles on building autonomous n8n workflows, custom RAG chatbots, coding roadmaps, and full-stack web applications from real client experience.
          </p>
        </div>
      </section>

      {/* ── 2. SEARCH & TAG FILTERS ─────────────────────────── */}
      <section className="py-8 px-5 sm:px-10 sticky top-16 z-40 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-100 dark:border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  activeTag === tag
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-100'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tutorials & guides..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── 3. BLOG POSTS GRID ──────────────────────────────── */}
      <section className="py-16 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-white/10 p-8">
              <BookOpen size={28} className="text-slate-400 mx-auto mb-3" />
              <h3 className="font-outfit font-black text-lg text-slate-900 dark:text-white mb-1">No Articles Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">Try clearing the search query or select another tag.</p>
              <button
                onClick={() => { setActiveTag('All'); setSearch(''); }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, idx) => (
                <PostCard key={post.id} post={post} featured={idx === 0 && activeTag === 'All' && search === ''} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 4. COMMUNITY & SOCIAL CTA ───────────────────────── */}
      <section className="pb-20 px-5 sm:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border border-indigo-500/30 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Stay Ahead in Tech</span>
              <h3 className="text-2xl font-outfit font-black text-white">
                Learn AI, Automation &amp; Web Development
              </h3>
              <p className="text-xs text-slate-300 max-w-md">
                Follow <strong>@codewithmrsingh</strong> on YouTube and Instagram for hands-on video tutorials and workflow blueprints.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://www.youtube.com/@codewithmrsingh4u"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <Youtube size={16} />
                <span>YouTube</span>
              </a>
              <a
                href="https://www.instagram.com/tushar.cms/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
              >
                <Instagram size={16} />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Blog;
