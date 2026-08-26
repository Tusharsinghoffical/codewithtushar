import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Tag, Sparkles,
  Brain, Zap, Code2, BookOpen, ChevronRight,
  ArrowRight, Share2, Check, Copy, Link2
} from 'lucide-react';

import postsData from '../content/posts.json';

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

/* ─── Blog post data ─────────────────────────────────────── */
export const BLOG_POSTS: BlogPost[] = postsData as BlogPost[];
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
