import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');
const postsPath = path.resolve(__dirname, '../content/posts.json');

if (!fs.existsSync(templatePath)) {
  console.error('❌ Build folder (dist/index.html) not found. Run "vite build" first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

const SITE_URL = 'https://codewithmrsingh.me';
const SITE_NAME = 'Code with Mr Singh';
const DEFAULT_IMAGE = 'https://codewithmrsingh.me/tushar-singh-optimized.jpg';
const DEFAULT_ALT = 'Tushar Singh — AI Automation Expert & Full-Stack Developer from Delhi, India';
const SITE_DATE_MODIFIED = new Date().toISOString().split('T')[0];

const INDIA_STATES_KEYWORDS = "freelance developer Delhi, AI developer Mumbai, developer Bangalore, developer Hyderabad, developer Chennai, developer Pune, developer Kolkata, developer Ahmedabad, developer Jaipur, developer Lucknow, developer Noida, developer Gurgaon, developer Chandigarh, developer Indore, developer Bhopal, developer Nagpur, developer Surat, developer Vadodara, developer Coimbatore, developer Kochi, developer Thiruvananthapuram, developer Visakhapatnam, developer Patna, developer Bhubaneswar, developer Guwahati, developer Dehradun, developer Shimla, developer Raipur, developer Ranchi, developer Jammu, developer Srinagar, developer Panaji, developer Imphal, developer Shillong, developer Aizawl, developer Kohima, developer Agartala, developer Itanagar, developer Gangtok, developer Puducherry, developer Andaman, developer Lakshadweep, AI automation Uttar Pradesh, AI automation Maharashtra, AI automation Karnataka, AI automation Tamil Nadu, AI automation Andhra Pradesh, AI automation Telangana, AI automation West Bengal, AI automation Gujarat, AI automation Rajasthan, AI automation Bihar, AI automation Madhya Pradesh, AI automation Haryana, AI automation Punjab, AI automation Kerala, AI automation Odisha, AI automation Jharkhand, AI automation Assam, AI automation Chhattisgarh, AI automation Uttarakhand, AI automation Himachal Pradesh, AI automation Tripura, AI automation Manipur, AI automation Meghalaya, AI automation Nagaland, AI automation Mizoram, AI automation Arunachal Pradesh, AI automation Sikkim, AI automation Goa, AI automation Jammu Kashmir, AI automation Ladakh, pan India developer, remote developer India, hire developer India";

const escapeAttr = (str) => {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

const pages = [
  {
    path: '/about',
    title: 'About Tushar Singh | MCA (MIT Pune), AI Automation Expert & Developer Delhi',
    description: '👨‍💻 Learn about Tushar Singh — MCA (MIT Pune), AI Automation Engineer & Full-Stack Developer with 10+ client deliverables, ₹2L+ revenue impact. Specializing in Python, React, n8n, and custom LLM systems.',
    keywords: `about Tushar Singh, AI automation expert India, full stack developer background, developer Delhi Mumbai Bangalore Hyderabad Chennai, MCA graduate developer India, pan India freelance developer, ${INDIA_STATES_KEYWORDS}`,
    type: 'website',
    image: DEFAULT_IMAGE,
    alt: 'Tushar Singh — MCA graduate, AI Automation Expert & Full-Stack Developer, Delhi India',
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/about#profilepage`,
      "url": `${SITE_URL}/about`,
      "name": "About Tushar Singh | AI Automation Expert & Full-Stack Developer Delhi",
      "description": "MCA graduate, AI Automation Expert & Full-Stack Developer from Delhi. 10+ successful projects, ₹2L+ revenue, 4.0★ rating. Building systems that scale businesses.",
      "mainEntity": {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Tushar Singh",
        "alternateName": "Code with Mr Singh",
        "jobTitle": "AI Automation Expert & Full-Stack Developer",
        "description": "Tushar Singh is a Delhi-based AI Automation Expert and Full-Stack Developer. MCA graduate from MIT Pune. Founder of Code with Mr Singh. 10+ successful projects submitted to clients. ₹2L+ revenue generated. Expert in Python, React.js, n8n, AI agents, chatbots, and Django.",
        "image": DEFAULT_IMAGE,
        "url": `${SITE_URL}/about`,
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
    }
  },
  {
    path: '/services',
    title: 'AI Automation, Chatbots & Web Development Services | Tushar Singh',
    description: '🚀 Scale workflows with autonomous AI agents, 24/7 smart RAG chatbots, n8n automations, React web platforms & brand design by Tushar Singh. 10+ client deliverables, 4.0★ rating. Book a free consultation.',
    keywords: `AI automation services India, web development services India, chatbot development India, n8n automation India, Python development India, React.js services India, freelance services all India states, business automation India, developer Delhi Mumbai Bangalore Hyderabad Chennai Pune Kolkata, ${INDIA_STATES_KEYWORDS}`,
    type: 'website',
    image: DEFAULT_IMAGE,
    alt: 'AI Automation, Chatbot, Full-Stack Web Development & Branding Services by Tushar Singh',
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${SITE_URL}/services#service`,
      "name": "AI Automation & Full-Stack Development Services",
      "description": "Tushar Singh offers expert AI automation, chatbot development, full-stack web development, lead generation, sales funnel creation, data science, and Power BI dashboard services from Delhi, India.",
      "provider": {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Tushar Singh"
      },
      "areaServed": "Worldwide",
      "url": `${SITE_URL}/services`,
      "serviceType": [
        "Custom SaaS Development", "Cloud MVP Engineering",
        "AI Automation", "Chatbot Development", "Full-Stack Web Development",
        "Lead Generation", "Sales Funnel Development", "Data Science",
        "Machine Learning", "Power BI Dashboard", "MVP Development"
      ]
    }
  },
  {
    path: '/projects',
    title: 'Portfolio — 10+ Real AI & Web Deliverables | Tushar Singh',
    description: '🏆 Explore 10+ commercial client projects delivered by Tushar Singh: AI automation workflows, smart conversational bots, SaaS dashboards, and web platforms with measurable ROI. View live deliverables.',
    keywords: `AI automation projects India, web development portfolio India, chatbot projects India, developer portfolio Delhi Mumbai Bangalore Hyderabad Chennai, pan India developer portfolio, freelance projects India, ${INDIA_STATES_KEYWORDS}`,
    type: 'website',
    image: DEFAULT_IMAGE,
    alt: '10+ AI & Web Development Projects — Portfolio by Tushar Singh',
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/projects#collectionpage`,
      "url": `${SITE_URL}/projects`,
      "name": "Project Portfolio — 10+ AI & Web Development Case Studies",
      "description": "Complete portfolio of 10+ successful projects submitted to clients by Tushar Singh: AI automation systems, chatbots, web applications, sales funnels, lead generation systems, data science dashboards, and machine learning models.",
      "author": { "@id": `${SITE_URL}/#person` },
      "about": "AI Automation, Full-Stack Web Development, Chatbot Development, Data Science"
    }
  },
  {
    path: '/saas',
    title: 'Proprietary SaaS Suites & Cloud Software | Tushar Singh Labs',
    description: '⚡ Explore proprietary cloud-native SaaS platforms by Tushar Singh Labs: TASQ-ONE (The Intelligent Task OS) and scalable multi-tenant cloud software. Test live demos and view architectures.',
    keywords: `Tushar Singh Labs SaaS, proprietary SaaS products, TASQ-ONE, cloud platforms India, autonomous AI SaaS suites, full stack SaaS developer Delhi, ${INDIA_STATES_KEYWORDS}`,
    type: 'website',
    image: `${SITE_URL}/tasq-one/tasq-one-banner.png`,
    alt: 'TASQ-ONE — The Intelligent Task Operating System (SaaS) by Tushar Singh',
    schema: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/saas#software`,
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
        "@id": `${SITE_URL}/#person`,
        "name": "Tushar Singh"
      }
    }
  },
  {
    path: '/saas/tasq-one',
    title: 'TASQ-ONE — The Intelligent Task Operating System (SaaS) | Tushar Singh',
    description: '⚡ TASQ-ONE is a cloud-native SaaS platform turning loosely defined ideas into production-ready tasks with Groq Llama 3.3 70B AI, real-time Kanban dependency DAGs, cryptographic audit trails & Indian team ROI calculator. Try public beta.',
    keywords: `TASQ-ONE, TASQ ONE, intelligent task operating system, AI task management SaaS, Groq Llama 3.3 70B, Kanban dependency DAG, cryptographic audit SaaS, Tushar Singh SaaS, software application Delhi India, ${INDIA_STATES_KEYWORDS}`,
    type: 'website',
    image: `${SITE_URL}/tasq-one/tasq-one-banner.png`,
    alt: 'TASQ-ONE — The Intelligent Task Operating System (SaaS) by Tushar Singh',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SoftwareApplication",
          "@id": `${SITE_URL}/saas/tasq-one#software`,
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
            "@id": `${SITE_URL}/#person`,
            "name": "Tushar Singh",
            "jobTitle": "AI Automation Expert & Full-Stack Developer",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "New Delhi",
              "addressRegion": "Delhi",
              "postalCode": "110044",
              "addressCountry": "IN"
            }
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/saas/tasq-one#faq`,
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is TASQ-ONE?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "TASQ-ONE is a cloud-native SaaS platform by Tushar Singh Labs that turns loosely defined ideas into production-ready developer tasks, acceptance criteria, story points, and dependency DAGs in under 400ms using Groq Llama 3.3 70B AI."
              }
            },
            {
              "@type": "Question",
              "name": "How does TASQ-ONE save engineering costs?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "By eliminating 10–15 hours weekly of chaotic standup meetings and vague Jira ticket refinement, TASQ-ONE delivers ₹48,000+/month net engineering savings for standard 10-person Indian tech squads."
              }
            },
            {
              "@type": "Question",
              "name": "Can TASQ-ONE be self-hosted with Docker?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, TASQ-ONE is containerized and published on DockerHub (tusharsinghoffical/tasq-one) for private cloud, AWS, Azure, GCP, or on-premise infrastructure."
              }
            },
            {
              "@type": "Question",
              "name": "Who developed TASQ-ONE?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "TASQ-ONE was conceptualized, architected, and built by Tushar Singh, founder of Code with Mr Singh (Delhi, India)."
              }
            }
          ]
        }
      ]
    }
  },
  {
    path: '/blog',
    title: 'AI Automation & Full-Stack Engineering Blog | Tushar Singh',
    description: '💡 Actionable guides on AI automation, n8n workflows, RAG conversational chatbots & full-stack development — written from real production experience by Tushar Singh.',
    keywords: `tech blog India, AI automation blog India, web development articles India, developer blog Delhi Mumbai Bangalore Hyderabad Chennai, data science insights India, machine learning India, ${INDIA_STATES_KEYWORDS}`,
    type: 'website',
    image: DEFAULT_IMAGE,
    alt: 'AI Automation & Web Development Blog by Tushar Singh',
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "@id": `${SITE_URL}/blog#blog`,
      "url": `${SITE_URL}/blog`,
      "name": "Technical Blog — AI Automation & Web Development Insights",
      "description": "Technical articles and tutorials on AI automation, full-stack development, data science, and machine learning by Tushar Singh.",
      "author": { "@id": `${SITE_URL}/#person` },
      "publisher": { "@id": `${SITE_URL}/#person` },
      "inLanguage": "en"
    }
  },
  {
    path: '/testimonials',
    title: 'Client Reviews & Testimonials (4.0★) | Tushar Singh',
    description: '⭐ Real client testimonials and reviews for Tushar Singh. 4.0★ rating across 10+ commercial AI automation, chatbot, and full-stack development projects in India & worldwide.',
    keywords: `client testimonials India, developer reviews India, AI automation reviews India, web development reviews India, reviews Delhi Mumbai Bangalore Hyderabad Chennai, pan India developer reviews, ${INDIA_STATES_KEYWORDS}`,
    type: 'website',
    image: DEFAULT_IMAGE,
    alt: 'Client Testimonials & Reviews — Tushar Singh Portfolio',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/testimonials#testimonials`,
      "url": `${SITE_URL}/testimonials`,
      "name": "Client Testimonials & Reviews — Tushar Singh Portfolio",
      "description": "Real client reviews from businesses across India & worldwide. 4.0★ rating, 10+ successful projects delivered. See what clients say about Tushar Singh.",
      "about": { "@id": `${SITE_URL}/#localbusiness` },
      "mainEntity": {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        "name": "Tushar Singh freelancing",
        "url": `${SITE_URL}`,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.0",
          "reviewCount": "10",
          "bestRating": "5"
        }
      }
    }
  },
  {
    path: '/contact',
    title: 'Contact Tushar Singh | Book Free 30-Min AI Strategy Audit',
    description: '📞 Hire Tushar Singh for AI automation, smart chatbots & web engineering. Guaranteed response < 1 hour. Direct WhatsApp +91 88516 19647, Calendly schedule & official Google verified owner.',
    keywords: `hire developer India, contact developer Delhi Mumbai Bangalore Hyderabad Chennai Pune Kolkata, hire AI automation expert India, hire web developer India, freelance developer contact India, book consultation India, ${INDIA_STATES_KEYWORDS}`,
    type: 'website',
    image: DEFAULT_IMAGE,
    alt: 'Contact Tushar Singh — Book a Free AI Automation Consultation',
    schema: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${SITE_URL}/contact#contactpage`,
      "url": `${SITE_URL}/contact`,
      "name": "Contact Tushar Singh — Book Free AI Automation Consultation",
      "description": "Book a free 30-minute AI automation audit or send a project brief to Tushar Singh. Available via WhatsApp, email, and Calendly.",
      "mainEntity": {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        "name": "Tushar Singh",
        "telephone": "+91-8851619647",
        "email": "tusharsinghoffical@gmail.com"
      }
    }
  },
  {
    path: '/404',
    title: '404 — Page Not Found | Code with Mr Singh',
    description: 'The page you requested does not exist or has been relocated.',
    keywords: `404, page not found, ${INDIA_STATES_KEYWORDS}`,
    type: 'website',
    image: DEFAULT_IMAGE,
    alt: '404 Page Not Found | Code with Mr Singh',
    noIndex: true
  }
];

// Add all blog posts as prerender targets
posts.forEach((post) => {
  const fullTitle = `${post.title} | ${SITE_NAME}`;
  const pageUrl = `${SITE_URL}/blog/${post.id}`;
  const image = post.imageUrl || DEFAULT_IMAGE;
  const imageAlt = `${post.title} — ${SITE_NAME}`;

  pages.push({
    path: `/blog/${post.id}`,
    title: post.title,
    description: post.excerpt,
    keywords: `${post.tags.join(', ')}, ${INDIA_STATES_KEYWORDS}`,
    type: 'article',
    image,
    alt: imageAlt,
    schema: {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${pageUrl}#article`,
      "headline": post.title,
      "description": post.excerpt,
      "image": image,
      "url": pageUrl,
      "author": { "@id": `${SITE_URL}/#person` },
      "publisher": { "@id": `${SITE_URL}/#person` },
      "keywords": post.tags.join(', '),
      "inLanguage": "en",
      "datePublished": post.date,
      "dateModified": SITE_DATE_MODIFIED
    }
  });
});

const generateHtmlForPage = (page) => {
  let html = template;
  const fullTitle = page.title.includes(SITE_NAME) ? page.title : `${page.title} | ${SITE_NAME}`;
  const pageUrl = `${SITE_URL}${page.path}`;
  const image = page.image || DEFAULT_IMAGE;
  const alt = page.alt || DEFAULT_ALT;
  const type = page.type || 'website';

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeAttr(fullTitle)}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(page.description)}">`
  );

  // Replace Meta Keywords
  html = html.replace(
    /<meta\s+name=["']keywords["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="keywords" content="${escapeAttr(page.keywords)}">`
  );

  // Replace Canonical Link
  html = html.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
    `<link rel="canonical" href="${pageUrl}">`
  );

  // Replace Open Graph Tags
  html = html.replace(
    /<meta\s+property=["']og:type["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:type" content="${type}">`
  );
  html = html.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:url" content="${pageUrl}">`
  );
  html = html.replace(
    /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttr(fullTitle)}">`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(page.description)}">`
  );
  html = html.replace(
    /<meta\s+property=["']og:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:image" content="${image}">`
  );
  html = html.replace(
    /<meta\s+property=["']og:image:secure_url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:image:secure_url" content="${image}">`
  );
  html = html.replace(
    /<meta\s+property=["']og:image:alt["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="og:image:alt" content="${escapeAttr(alt)}">`
  );

  // Replace Twitter / X Tags
  html = html.replace(
    /<meta\s+property=["']twitter:url["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="twitter:url" content="${pageUrl}">`
  );
  html = html.replace(
    /<meta\s+property=["']twitter:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="twitter:title" content="${escapeAttr(fullTitle)}">`
  );
  html = html.replace(
    /<meta\s+property=["']twitter:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="twitter:description" content="${escapeAttr(page.description)}">`
  );
  html = html.replace(
    /<meta\s+property=["']twitter:image["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta property="twitter:image" content="${image}">`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:image:alt["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
    `<meta name="twitter:image:alt" content="${escapeAttr(alt)}">`
  );

  // Inject Schema.org JSON-LD if present
  if (page.schema) {
    const schemaScript = `\n    <!-- Pre-rendered Page Schema -->\n    <script type="application/ld+json" id="schema-prerendered">\n    ${JSON.stringify(page.schema, null, 2)}\n    </script>\n</head>`;
    html = html.replace(/<\/head>/i, schemaScript);
  }

  return html;
};

console.log(`🚀 Starting static pre-rendering for ${pages.length} routes...`);

let count = 0;
pages.forEach((page) => {
  const relativePath = page.path.replace(/^\//, '');
  const outDir = path.join(distDir, relativePath);
  fs.mkdirSync(outDir, { recursive: true });

  const html = generateHtmlForPage(page);
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  if (page.path === '/404') {
    fs.writeFileSync(path.join(distDir, '404.html'), html, 'utf8');
  }
  console.log(`  ✓ Prerendered: ${page.path} -> dist/${relativePath}/index.html`);
  count++;
});

// Also ensure sitemap.xml is copied into subfolders so /services/sitemap.xml returns valid sitemap XML
const sitemapSrc = path.join(distDir, 'sitemap.xml');
if (fs.existsSync(sitemapSrc)) {
  ['services', 'projects', 'about', 'contact', 'blog'].forEach((sub) => {
    const subDir = path.join(distDir, sub);
    if (fs.existsSync(subDir)) {
      fs.copyFileSync(sitemapSrc, path.join(subDir, 'sitemap.xml'));
    }
  });
}

console.log(`✅ Successfully prerendered ${count} pages with full Open Graph & Twitter cards!`);

