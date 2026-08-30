<div align="center">

# C.MS — Code with Mr Singh

**AI Automation, Dashboard & Full-Stack Development**

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Deploy](https://img.shields.io/badge/Deployed_on-Render-4F5D95)](https://render.com/)

**Live:** [codewithmrsingh.me](https://codewithmrsingh.me)

</div>

---

## About

Personal portfolio website of **Tushar Singh** — AI Automation Expert & Full-Stack Developer from Delhi, India.

10+ successful projects — real products submitted to clients — demonstrating expertise in AI automation, web development, and intelligent systems. Serving clients across every state of India and worldwide.

| Metric | Value |
|---|---|
| Projects Completed | 10+ |
| Value Delivered | ₹2L+ |
| Client Rating | 5.0 ★ |
| Time Saved / Week | 10h+ |
| Countries Served | 8+ |

---

## Services

- **AI Automation** — Workflow optimization, AI agent integration, system connectivity
- **Lead Generation Systems** — Targeted prospecting, email automation, LinkedIn outreach
- **Chatbot Development** — Custom knowledge base, multilingual support, appointment booking
- **Website & Funnel Building** — Sales funnel design, A/B testing, speed optimization
- **Logo & Graphic Design** — Brand identity, social media graphics

---

## Tech Stack

**Languages & Frameworks**

Python · Django · React.js · TypeScript · REST APIs · Tailwind CSS

**AI & Automation**

n8n Automation · OpenAI · AI Agents · LangChain · RAG Chatbots

**Data & Analytics**

Power BI · SQL · Machine Learning · Data Engineering

**Frontend & Build System**

React 19 · Vite 6 · React Router 7 · Fuse.js · Lucide React · Custom SSG Prerender Engine

---

## Project Structure

```
/
├── App.tsx                  # Root component, routes, SEO & metadata wrappers
├── index.tsx                # React entry point
├── index.html               # Base HTML shell with meta tags & Schema.org JSON-LD
├── vite.config.ts           # Vite + Vitest config
├── render.yaml              # Render static site deployment config
├── .htaccess                # Apache SPA fallback + caching + security headers
│
├── content/
│   └── posts.json           # Single source of truth for blog posts metadata & HTML
│
├── scripts/
│   └── prerender.js         # Build-time SSG engine generating per-route static HTML
│
├── components/
│   ├── Navbar.tsx           # Fixed nav, dark mode toggle, search
│   ├── Footer.tsx           # Footer with links and contact
│   ├── AiChatAssistant.tsx  # Floating Gemini-powered chat widget
│   ├── SearchBar.tsx        # Fuzzy search with keyboard navigation
│   ├── WhatsAppButton.tsx   # Floating WhatsApp CTA
│   ├── ScrollToTop.tsx      # Scroll-to-top button
│   ├── ClockDisplay.tsx     # Live clock display
│   └── OptimizedImage.tsx   # Lazy-loading image wrapper
│
├── pages/
│   ├── Home.tsx             # Landing page
│   ├── About.tsx            # Background, skills, education
│   ├── Services.tsx         # Service offerings
│   ├── Projects.tsx         # Portfolio case studies (10+)
│   ├── Blog.tsx             # Blog listing & individual post views
│   ├── Testimonials.tsx     # Client reviews
│   └── Contact.tsx          # Contact form
│
├── lib/
│   ├── gemini.ts            # Gemini API (chat, think, image generation)
│   ├── search.ts            # Fuse.js search logic
│   ├── searchData.ts        # Search index content
│   └── seo.ts               # SEO helpers
│
├── hooks/
│   └── useSharePage.ts      # Web Share API with clipboard fallback
│
└── public/
    ├── projects/            # Project SVG thumbnails
    ├── logo/                # Brand assets
    ├── tushar-singh-optimized.jpg # Profile image (Optimized)
    ├── tushar-singh.webp    # Profile image WebP
    ├── robots.txt
    ├── sitemap.xml
    ├── llms.txt             # AI crawler instructions
    ├── _redirects           # Netlify SPA fallback
    └── 404.html             # Custom 404 page
```

---

## Social Preview & Pre-Rendering (SSG)

To ensure social crawlers (WhatsApp, Facebook, LinkedIn, Twitter/X, Telegram, Discord, Googlebot) always receive accurate Open Graph, Twitter cards, and Schema.org metadata without needing client-side JavaScript execution:

1. `npm run build` runs `vite build && node scripts/prerender.js`.
2. `scripts/prerender.js` reads the compiled `dist/index.html` template.
3. It generates static `dist/<route>/index.html` for every shareable route and blog post:
   - `/about`, `/services`, `/projects`, `/blog`, `/testimonials`, `/contact`
   - `/blog/:postId` for every post in `content/posts.json`
4. Injects exact `<title>`, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`, and JSON-LD schema into raw HTML for instant crawler preview generation.

---

## Local Setup

**Requirements:** Node.js 20+

```bash
# Install dependencies
npm install

# Start dev server — http://localhost:3000
npm run dev

# Production build + Static Pre-rendering
npm run build

# Preview production build locally
npm run preview

# Run tests
npm test
```

### Gemini API Key (optional)

The AI chat assistant needs a Gemini API key. Without it the assistant shows a fallback message — the rest of the site works normally.

```env
# .env.local
GEMINI_API_KEY=your_key_here
```

---

## Deployment

Deployed as a **static site on Render** via `render.yaml`.

All routes rewrite to `index.html` while serving static per-route files automatically. Configured for different hosting platforms:

| File | Platform |
|---|---|
| `render.yaml` | Render |
| `public/_redirects` | Netlify |
| `.htaccess` | Apache |

**Render setup:**
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Add `GEMINI_API_KEY` as a secret environment variable in the dashboard

---

## Features

- **Static Pre-Rendering (SSG)** — Full Open Graph & Twitter card previews on WhatsApp, LinkedIn, X & Facebook for all pages and blog posts
- **Shareable URLs** — Direct access to `/blog/post-id`, `/services`, `/projects`, etc.
- **Dark / light mode** — Persisted via `localStorage`
- **Fuzzy search** — Keyboard-navigable, searches projects, blog, services
- **AI chat assistant** — Gemini Pro / Flash toggle, minimizable widget
- **Rich Structured Data** — Schema.org (Person, LocalBusiness, FAQ, HowTo, Article, ProfilePage), sitemap, `llms.txt`
- **Security** — CSP, HSTS, X-Frame-Options, X-Content-Type-Options via `.htaccess`
- **Performance** — WebP images, lazy loading, SVG project thumbnails, Vite bundling

---

## Contact

**Tushar Singh**

| | |
|---|---|
| Website | [codewithmrsingh.me](https://codewithmrsingh.me) |
| Fiverr | [fiverr.com/s/zAd5R2z](https://www.fiverr.com/s/zAd5R2z) |
| LinkedIn | [linkedin.com/in/tusharsingh2011](https://linkedin.com/in/tusharsingh2011) |
| GitHub | [github.com/Tusharsinghoffical](https://github.com/Tusharsinghoffical) |
| YouTube | [youtube.com/@codewithmrsingh4u](https://www.youtube.com/@codewithmrsingh4u) |
| Instagram | [instagram.com/tushar.cms](https://www.instagram.com/tushar.cms/) |
| Email | tusharsinghoffical@gmail.com |
| WhatsApp | +91-88516 19647 |
| Location | Delhi, India — Available Worldwide |
