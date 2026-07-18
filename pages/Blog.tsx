import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Terminal, 
  Code2, 
  Cpu, 
  Brain, 
  Clock, 
  ArrowRight,
  Sparkles,
  TrendingUp,
  Database,
  Zap,
  Globe,
  Bot
} from 'lucide-react';

export const BLOG_POSTS = [
  {
    id: 'faang-coding-roadmap-150-questions',
    title: 'From Basics to FAANG: Your Ultimate Roadmap with 150 Coding Questions',
    excerpt: 'Master problem-solving at scale with this curated set of 150 coding questions designed to take you from fundamentals to advanced system thinking.',
    category: 'Career Development',
    date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), // Real-time date
    icon: 'Code2',
    color: 'indigo',
    tags: ['Coding', 'FAANG', 'Interview Prep', 'DSA'],
    content: `
      <div class="blog-content">
        <!-- Hero Section -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3rem; border-radius: 1.5rem; margin-bottom: 3rem; text-align: center; color: white;">
          <h1 style="font-size: 2.5rem; font-weight: 800; margin-bottom: 1rem; line-height: 1.2;">🚀 From Basics to FAANG</h1>
          <p style="font-size: 1.2rem; opacity: 0.95;">Your Complete Roadmap with 150 Coding Questions</p>
        </div>

        <!-- Introduction -->
        <div style="background: #f8fafc; dark:bg-slate-800; padding: 2rem; border-radius: 1rem; border-left: 4px solid #667eea; margin-bottom: 2.5rem;">
          <h2 style="color: #667eea; dark:text-indigo-400; font-size: 1.8rem; margin-bottom: 1rem; font-weight: 700;">💡 The Challenge</h2>
          <p style="font-size: 1.1rem; line-height: 1.8; color: #475569; dark:text-slate-300;">
            In today's competitive tech landscape, cracking top-tier companies isn't just about knowing syntax—it's about 
            <strong style="color: #667eea; dark:text-indigo-400;">mastering problem-solving at scale</strong>. If you're serious about leveling up your coding skills, 
            this curated set of 150 coding questions is a high-impact asset designed to take you from fundamentals to advanced system thinking.
          </p>
        </div>

        <!-- What Makes This Resource Powerful -->
        <div style="margin-bottom: 3rem;">
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem; color: #1e293b; dark:text-white; display: flex; align-items: center; gap: 0.5rem;">
            💡 What Makes This Resource Powerful?
          </h2>
          <p style="font-size: 1.1rem; line-height: 1.8; margin-bottom: 2rem; color: #475569; dark:text-slate-300;">
            This collection is strategically divided into three progressive tiers:
          </p>

          <!-- Tier Cards -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <!-- Tier 1 -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 2rem; border-radius: 1rem; color: white; box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);">
              <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔰</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">Easy (1–50)</h3>
              <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; opacity: 0.9;">Foundation Building</h4>
              <p style="line-height: 1.7; opacity: 0.95;">Focus on number theory, arrays, strings, and real-world logic. Build core thinking patterns essential for any developer.</p>
            </div>

            <!-- Tier 2 -->
            <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 2rem; border-radius: 1rem; color: white; box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);">
              <div style="font-size: 3rem; margin-bottom: 0.5rem;">⚙️</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">Medium (51–100)</h3>
              <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; opacity: 0.9;">Interview Readiness</h4>
              <p style="line-height: 1.7; opacity: 0.95;">Covers sliding window, recursion, linked lists, and system-based coding. Transition from learner to practitioner.</p>
            </div>

            <!-- Tier 3 -->
            <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 2rem; border-radius: 1rem; color: white; box-shadow: 0 10px 30px rgba(239, 68, 68, 0.3);">
              <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔥</div>
              <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem;">Hard (101–150)</h3>
              <h4 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.5rem; opacity: 0.9;">FAANG-Level Mastery</h4>
              <p style="line-height: 1.7; opacity: 0.95;">Deep dive into DP, graphs, trees, and system design. Simulate real-world complexity and high-stakes interviews.</p>
            </div>
          </div>
        </div>

        <!-- What You'll Learn -->
        <div style="background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); dark:bg-slate-800; padding: 2.5rem; border-radius: 1.5rem; margin-bottom: 3rem; border: 2px solid #bae6fd;">
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem; color: #0369a1; dark:text-white; display: flex; align-items: center; gap: 0.5rem;">
            🧠 What You'll Actually Learn
          </h2>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: #475569; dark:text-slate-300; font-style: italic;">
            This isn't just a question bank—it's a complete thinking framework:
          </p>
          <ul style="list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
            <li style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; background: white; dark:bg-slate-900; border-radius: 0.75rem; border: 2px solid #bae6fd;">
              <span style="font-size: 1.5rem;">🎯</span>
              <div>
                <strong style="color: #0369a1; dark:text-indigo-400; display: block; margin-bottom: 0.25rem;">Pattern Recognition</strong>
                <span style="color: #64748b; dark:text-slate-400; font-size: 0.95rem;">Two pointers, DP, BFS/DFS, sliding window</span>
              </div>
            </li>
            <li style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; background: white; dark:bg-slate-900; border-radius: 0.75rem; border: 2px solid #bae6fd;">
              <span style="font-size: 1.5rem;">🏗️</span>
              <div>
                <strong style="color: #0369a1; dark:text-indigo-400; display: block; margin-bottom: 0.25rem;">System Design</strong>
                <span style="color: #64748b; dark:text-slate-400; font-size: 0.95rem;">LRU Cache, Rate Limiter, URL Shortener</span>
              </div>
            </li>
            <li style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; background: white; dark:bg-slate-900; border-radius: 0.75rem; border: 2px solid #bae6fd;">
              <span style="font-size: 1.5rem;">⚡</span>
              <div>
                <strong style="color: #0369a1; dark:text-indigo-400; display: block; margin-bottom: 0.25rem;">Optimization Mindset</strong>
                <span style="color: #64748b; dark:text-slate-400; font-size: 0.95rem;">Brute force → Optimal solutions</span>
              </div>
            </li>
            <li style="display: flex; align-items: flex-start; gap: 0.75rem; padding: 1rem; background: white; dark:bg-slate-900; border-radius: 0.75rem; border: 2px solid #bae6fd;">
              <span style="font-size: 1.5rem;">✨</span>
              <div>
                <strong style="color: #0369a1; dark:text-indigo-400; display: block; margin-bottom: 0.25rem;">Clean Code Practices</strong>
                <span style="color: #64748b; dark:text-slate-400; font-size: 0.95rem;">Edge cases & production-ready code</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Strategic Study Plan -->
        <div style="margin-bottom: 3rem;">
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem; color: #1e293b; dark:text-white; display: flex; align-items: center; gap: 0.5rem;">
            📈 How to Use This Strategically
          </h2>
          <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); dark:bg-slate-800; padding: 2rem; border-radius: 1.5rem; border: 2px solid #fbbf24;">
            <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: #92400e; dark:text-slate-300; font-weight: 600;">
              Let's be practical—execution matters more than intention:
            </p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
              <div style="background: white; dark:bg-slate-900; padding: 1.25rem; border-radius: 0.75rem; border-left: 4px solid #f59e0b;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #f59e0b; margin-bottom: 0.5rem;">⏰ Daily Commitment</div>
                <div style="color: #475569; dark:text-slate-300;">1–2 hours focused practice</div>
              </div>
              <div style="background: white; dark:bg-slate-900; padding: 1.25rem; border-radius: 0.75rem; border-left: 4px solid #f59e0b;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #f59e0b; margin-bottom: 0.5rem;">🎯 Start Simple</div>
                <div style="color: #475569; dark:text-slate-300;">2–3 Easy problems/day</div>
              </div>
              <div style="background: white; dark:bg-slate-900; padding: 1.25rem; border-radius: 0.75rem; border-left: 4px solid #f59e0b;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #f59e0b; margin-bottom: 0.5rem;">📊 Level Up</div>
                <div style="color: #475569; dark:text-slate-300;">Move to Medium when consistent</div>
              </div>
              <div style="background: white; dark:bg-slate-900; padding: 1.25rem; border-radius: 0.75rem; border-left: 4px solid #f59e0b;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #f59e0b; margin-bottom: 0.5rem;">🎪 Weekend Focus</div>
                <div style="color: #475569; dark:text-slate-300;">Tackle Hard + System Design</div>
              </div>
              <div style="background: white; dark:bg-slate-900; padding: 1.25rem; border-radius: 0.75rem; border-left: 4px solid #f59e0b;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #f59e0b; margin-bottom: 0.5rem;">📝 Track Progress</div>
                <div style="color: #475569; dark:text-slate-300;">Log time, approach, mistakes</div>
              </div>
              <div style="background: white; dark:bg-slate-900; padding: 1.25rem; border-radius: 0.75rem; border-left: 4px solid #f59e0b;">
                <div style="font-size: 1.2rem; font-weight: 700; color: #f59e0b; margin-bottom: 0.5rem;">🔄 Repeat Smartly</div>
                <div style="color: #475569; dark:text-slate-300;">Spaced repetition for tough ones</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Why This Works -->
        <div style="background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); dark:bg-slate-800; padding: 2.5rem; border-radius: 1.5rem; margin-bottom: 3rem; border: 2px solid #c4b5fd;">
          <h2 style="font-size: 2rem; font-weight: 800; margin-bottom: 1.5rem; color: #7c3aed; dark:text-white; display: flex; align-items: center; gap: 0.5rem;">
            🎯 Why This Approach Works
          </h2>
          <div style="background: white; dark:bg-slate-900; padding: 2rem; border-radius: 1rem; margin-bottom: 1.5rem;">
            <p style="font-size: 1.2rem; color: #dc2626; dark:text-red-400; font-weight: 700; margin-bottom: 1rem; font-style: italic;">
              "Most developers fail not due to lack of knowledge—but lack of structure."
            </p>
          </div>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem; color: #475569; dark:text-slate-300;">
            This roadmap eliminates randomness and gives you:
          </p>
          <ul style="list-style: none; padding: 0;">
            <li style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; margin-bottom: 0.75rem; background: white; dark:bg-slate-900; border-radius: 0.75rem;">
              <span style="font-size: 1.5rem; color: #10b981;">✓</span>
              <span style="color: #475569; dark:text-slate-300; font-weight: 600;">Clarity on what to study</span>
            </li>
            <li style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; margin-bottom: 0.75rem; background: white; dark:bg-slate-900; border-radius: 0.75rem;">
              <span style="font-size: 1.5rem; color: #10b981;">✓</span>
              <span style="color: #475569; dark:text-slate-300; font-weight: 600;">Confidence through progression</span>
            </li>
            <li style="display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: white; dark:bg-slate-900; border-radius: 0.75rem;">
              <span style="font-size: 1.5rem; color: #10b981;">✓</span>
              <span style="color: #475569; dark:text-slate-300; font-weight: 600;">Competitive edge in interviews</span>
            </li>
          </ul>
        </div>

        <!-- Resource Link -->
        <div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); padding: 2.5rem; border-radius: 1.5rem; margin-bottom: 3rem; text-align: center; box-shadow: 0 20px 50px rgba(6, 182, 212, 0.3);">
          <h3 style="font-size: 1.8rem; font-weight: 800; color: white; margin-bottom: 1rem;">📚 Access the Complete Resource</h3>
          <p style="font-size: 1.1rem; color: white; opacity: 0.95; margin-bottom: 1.5rem;">
            Get instant access to all 150 carefully curated coding questions with detailed solutions
          </p>
          <a href="https://drive.google.com/file/d/130rijB2ne3zLPRuPVJZeFc45A5gcsfss/view?usp=sharing" 
             target="_blank" 
             rel="noopener noreferrer"
             style="display: inline-flex; align-items: center; gap: 0.75rem; background: white; color: #0891b2; padding: 1rem 2.5rem; border-radius: 0.75rem; font-weight: 700; font-size: 1.1rem; text-decoration: none; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); transition: transform 0.3s ease;"
             onmouseover="this.style.transform='translateY(-3px)'" 
             onmouseout="this.style.transform='translateY(0)'">
            <span>📄</span>
            <span>Download Complete PDF Guide</span>
            <span>→</span>
          </a>
        </div>

        <!-- Final Take -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); dark:bg-slate-900; padding: 2.5rem; border-radius: 1.5rem; margin-bottom: 3rem; text-align: center; border: 2px solid #475569;">
          <h2 style="font-size: 2rem; font-weight: 800; color: white; margin-bottom: 1.5rem;">🏁 Final Take</h2>
          <p style="font-size: 1.2rem; color: #cbd5e1; dark:text-slate-300; margin-bottom: 2rem; line-height: 1.8;">
            If you're aiming for high-paying roles or simply want to become a top 1% developer, 
            this is not optional—it's <strong style="color: #fbbf24;">foundational</strong>.
          </p>
          <blockquote style="background: white; dark:bg-slate-800; padding: 2rem; border-radius: 1rem; border-left: 5px solid #fbbf24; max-width: 600px; margin: 0 auto;">
            <p style="font-size: 1.3rem; color: #475569; dark:text-slate-300; font-style: italic; margin: 0; font-weight: 600;">
              "The expert in anything was once a beginner. Keep coding, keep learning."
            </p>
          </blockquote>
        </div>
      </div>
    `
  }
];

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain size={20} />,
  Zap: <Zap size={20} />,
  Database: <Database size={20} />,
  TrendingUp: <TrendingUp size={20} />,
  Bot: <Bot size={20} />,
  Globe: <Globe size={20} />,
  Code2: <Code2 size={20} />
};

const COLOR_CLASSES: Record<string, string> = {
  emerald: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-400/20 text-emerald-600 dark:text-emerald-400',
  indigo: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-100 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400',
  violet: 'bg-violet-50 dark:bg-violet-950/20 border-violet-100 dark:border-violet-400/20 text-violet-600 dark:text-violet-400',
  amber: 'bg-amber-50 dark:bg-amber-950/20 border-amber-100 dark:border-amber-400/20 text-amber-600 dark:text-amber-400',
  blue: 'bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-400/20 text-blue-600 dark:text-blue-400',
  rose: 'bg-rose-50 dark:bg-rose-950/20 border-rose-100 dark:border-rose-400/20 text-rose-600 dark:text-rose-400'
};

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const { postId } = useParams<{ postId: string }>();
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null);
  const [readTime, setReadTime] = useState<string>('7 min read');

  // Calculate read time based on content length (average 200 words per minute)
  const calculateReadTime = (content: string): string => {
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
  };

  // Calculate read time once on mount when a post is selected
  React.useEffect(() => {
    if (selectedPost) {
      setReadTime(calculateReadTime(selectedPost.content));
    }
  }, [selectedPost]);

  // Find the selected blog post
  React.useEffect(() => {
    if (postId) {
      const post = BLOG_POSTS.find(p => p.id === postId);
      setSelectedPost(post || null);
    } else {
      setSelectedPost(null);
    }
  }, [postId]);

  // If viewing a specific blog post
  if (selectedPost) {
    const fullUrl = `https://codewithmrsingh.me/blog/${selectedPost.id}`;
    
    return (
      <>
        {/* Dynamic Meta Tags for SEO and Social Sharing */}
        <Helmet>
          <title>{selectedPost.title} | Code with Mr. Singh</title>
          <meta name="description" content={selectedPost.excerpt} />
          <meta name="keywords" content={selectedPost.tags.join(', ')} />
          
          {/* Canonical URL */}
          <link rel="canonical" href={fullUrl} />
          
          {/* Open Graph - Facebook, LinkedIn */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={fullUrl} />
          <meta property="og:title" content={selectedPost.title} />
          <meta property="og:description" content={selectedPost.excerpt} />
          <meta property="og:image" content="https://codewithmrsingh.me/og-image.jpg" />
          <meta property="og:site_name" content="Code with Mr. Singh" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:url" content={fullUrl} />
          <meta name="twitter:title" content={selectedPost.title} />
          <meta name="twitter:description" content={selectedPost.excerpt} />
          <meta name="twitter:image" content="https://codewithmrsingh.me/og-image.jpg" />
          
          {/* Additional SEO */}
          <meta name="author" content="Tushar Singh" />
          <meta name="robots" content="index, follow" />
        </Helmet>
        
        <div className="pt-32 pb-24 px-6 sm:px-10 bg-white dark:bg-slate-950 min-h-screen">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 mb-8 transition-colors"
          >
            <ArrowRight size={16} className="rotate-180" />
            Back to Blog
          </button>

          {/* Blog Header */}
          <div className="mb-12">
            <div className={`inline-block px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest mb-4 ${COLOR_CLASSES[selectedPost.color]}`}>
              {selectedPost.category}
            </div>
            <h1 className="text-3xl sm:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white mb-6 leading-tight">
              {selectedPost.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400 flex-wrap">
              <span>{selectedPost.date}</span>
              <span className="flex items-center gap-2">
                <Clock size={16} />
                {readTime}
              </span>
            </div>
          </div>

          {/* Blog Content */}
          <div 
            className="blog-content-container"
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
            }}
            dangerouslySetInnerHTML={{ __html: selectedPost.content }}
          />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              {selectedPost.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Blog list view (existing code)
  return (
    <div className="pt-32 pb-24 px-6 sm:px-10 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* --- HEADER --- */}
        <div className="text-center mb-16 max-w-3xl mx-auto animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-400/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            <Terminal size={14} /> Technical Insights
          </div>
          <h1 className="text-3xl sm:text-5xl font-outfit font-extrabold text-slate-950 dark:text-white mb-4 tracking-tight">
            Engineering Blog.
          </h1>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed px-4">
            Deep dives into AI automation, full-stack development, and data science. Practical tutorials and technical insights from real-world projects.
          </p>
        </div>

        {/* --- BLOG GRID --- */}
        {BLOG_POSTS.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {BLOG_POSTS.map((post, idx) => (
              <article
                key={post.id}
                className={`group relative bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 sm:p-8 border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col animate-fade-in-up delay-${(idx % 5 + 1) * 100}`}
              >
                {/* Icon Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${COLOR_CLASSES[post.color]} group-hover:scale-110 transition-transform duration-500`}>
                    {ICON_MAP[post.icon]}
                  </div>
                  <span className="text-[8px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest flex items-center gap-1">
                    <Clock size={10} /> {readTime}
                  </span>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-lg text-[7px] font-black uppercase tracking-widest mb-3 ${COLOR_CLASSES[post.color]}`}>
                    {post.category}
                  </span>
                </div>

                {/* Title & Excerpt */}
                <h3 className="text-xl sm:text-2xl font-outfit font-extrabold text-slate-950 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-slate-500 dark:text-slate-400 font-medium mb-6 leading-relaxed flex-grow">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-1 bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-[7px] font-bold uppercase tracking-widest rounded-md border border-slate-100 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <button
                  onClick={() => navigate(`/blog/${post.id}`)}
                  className="w-full py-4 px-6 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-100 transition-all flex items-center justify-center gap-2 group/btn shadow-lg active:scale-95 cursor-pointer mt-auto"
                >
                  Read Article
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 mb-16 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 mb-6">
              <Terminal size={40} className="text-slate-400 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-outfit font-extrabold text-slate-950 dark:text-white mb-3">
              No Blog Posts Yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md mx-auto">
              Check back soon for technical insights on AI automation, web development, and data science.
            </p>
          </div>
        )}

        {/* --- NEWSLETTER CTA --- */}
        <div className="mt-16 p-10 sm:p-16 rounded-[3rem] bg-slate-950 dark:bg-slate-900 text-center relative overflow-hidden animate-reveal-scale shadow-2xl border dark:border-white/5">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none text-white">
            <Code2 size={180} />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl font-outfit font-extrabold text-white mb-6 tracking-tight">
              Stay Updated with Technical Insights
            </h2>
            <p className="text-sm sm:text-base text-slate-400 font-medium mb-8 max-w-xl mx-auto leading-relaxed">
              Get notified when I publish new articles on AI automation, web development, and data science.
            </p>
            <div className="inline-flex items-center gap-3 px-8 py-5 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-lg font-bold text-slate-300">Coming Soon</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Blog;
