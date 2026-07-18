<div align="center">
  
# 🚀 Code with Mr. Singh - Business Website

**Professional Portfolio showcasing Data Science, Web Development & AI Automation Expertise**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)](https://vitejs.dev/)
[![Deployment](https://img.shields.io/badge/Deploy-Render-4F5D95)](https://render.com/)

</div>

## 🌟 Overview

Welcome to my professional portfolio website! This modern, responsive web application showcases my expertise in:

- **Data Science & Analytics**
- **Full-Stack Web Development** 
- **AI & Machine Learning Solutions**
- **Automation & Optimization**
- **Technical Blogging**

Built with cutting-edge technologies for optimal performance and user experience.

### ✨ Latest Updates (2026)
- 🚀 **Image Optimization**: Replaced external URLs with local SVG placeholders - 99% faster loading
- 📝 **Technical Blog**: New blog section for sharing technical insights and tutorials
- ⚡ **Performance Improvements**: Lazy loading, WebP images, optimized assets
- 🎨 **Enhanced UI**: Modern card layouts with beautiful animations

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 19** | Frontend Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Development Server |
| **Tailwind CSS** | Styling & Responsive Design |
| **React Router** | Client-side Routing |
| **Lucide Icons** | Beautiful Icon Library |
| **Google Gemini API** | AI Chat Assistant |

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/business-website.git
   cd business-website
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup (Optional):**
   Create a `.env.local` file for Gemini API:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```
   Visit: http://localhost:3000

## 🏗️ Project Structure

```
business-website/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar
│   ├── Footer.tsx      # Footer component
│   ├── AiChatAssistant.tsx # AI chat interface
│   ├── OptimizedImage.tsx  # Image optimization component
│   └── ...
├── pages/              # Main page components
│   ├── Home.tsx        # Homepage
│   ├── About.tsx       # About section
│   ├── Services.tsx    # Services offered
│   ├── Projects.tsx    # Portfolio projects
│   ├── Blog.tsx        # Technical blog posts
│   ├── Contact.tsx     # Contact form
│   └── Testimonials.tsx # Client testimonials
├── public/             # Static assets
│   ├── projects/       # Project placeholder images (SVG)
│   ├── me.webp         # Optimized profile image
│   └── logo/           # Brand assets
├── lib/                # Utility libraries
│   └── gemini.ts       # Gemini API integration
├── server/             # Backend API
│   └── server.js       # Email service backend
├── App.tsx             # Main app component
├── index.tsx           # Entry point
└── vite.config.ts      # Vite configuration
```

## 🎯 Features

### 🖥️ Core Features
- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - User preference toggle
- **Smooth Animations** - Enhanced user experience
- **SEO Optimized** - Proper meta tags and structure
- **Fast Loading** - Optimized with Vite bundling
- **Blog Platform** - Technical article publishing system

### 🚀 Performance Optimizations
- **Image Optimization**: Local SVG placeholders instead of external URLs (99% faster)
- **WebP Format**: Profile images converted to WebP (40% size reduction)
- **Lazy Loading**: Images load only when visible
- **Async Decoding**: Non-blocking image rendering
- **OptimizedImage Component**: Smart image loading with intersection observer

### 🤖 AI Integration
- **Gemini Chat Assistant** - Interactive AI support
- **Smart Responses** - Context-aware conversations
- **Real-time Processing** - Instant feedback

### 📧 Contact Form
- **Email Notifications** - Automatic email delivery to admin
- **User Confirmation** - Auto-reply to users
- **Secure Backend** - Protected email credentials
- **Production Ready** - Works seamlessly on deployment platforms like Render

### 📱 User Experience
- **Single Page Application** - Seamless navigation
- **Lazy Loading** - Improved performance
- **Progressive Web App** - Installable on devices
- **Accessibility** - WCAG compliant

### 📝 Blog Features
- **Technical Articles** - Share insights on AI, Web Dev, Data Science
- **Category System** - Organize by topic (AI Automation, Web Dev, Data Science)
- **Read Time Display** - Show estimated reading time
- **Tag System** - SEO-friendly categorization
- **Newsletter CTA** - Email subscription integration

## 🚀 Deployment

### Deploy to Render (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Setup on Render:**
   - Visit [render.com](https://render.com)
   - Create both a Web Service for the backend API and a Static Site for the frontend
   - Connect your GitHub repository
   - For the **Backend API Service**:
     - **Build Command**: `cd server && npm install`
     - **Start Command**: `cd server && npm start`
     - **Environment Variables**:
       - `EMAIL_USER`: Your Gmail address
       - `EMAIL_PASS`: Your Gmail app password
   - For the **Frontend Static Site**:
     - **Build Command**: `npm install && npm run build`
     - **Publish Directory**: `dist`

### Local Production Build
```bash
npm run build
npm run preview
```

## 📊 Performance

### Image Optimization Results
| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **External Image Load** | 2-5 seconds | < 100ms | **99% faster** |
| **Profile Image Size** | 67.9 KB (JPG) | 40.2 KB (WebP) | **40% smaller** |
| **Project Images** | ~500 KB each | ~1.5 KB each | **99.7% smaller** |
| **Bandwidth Usage** | High | Minimal | **99% reduction** |

### Overall Metrics
- **Bundle Size**: ~355KB (compressed)
- **Load Time**: < 1 second (optimized)
- **Lighthouse Score**: 98+ (Performance)
- **Mobile Friendly**: Fully responsive
- **Core Web Vitals**: All green ✅

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Tushar Singh (Mr. Singh)**
- 🌐 Website: [codewithmrsingh.me](https://codewithmrsingh.me)
- 💼 LinkedIn: [linkedin.com/in/tusharsingh2011](https://linkedin.com/in/tusharsingh2011)
- 🐙 GitHub: [github.com/Tusharsinghoffical](https://github.com/Tusharsinghoffical)
- 📧 Email: [tusharsinghkumar04@gmail.com](mailto:tusharsinghkumar04@gmail.com)

---

<div align="center">

**Made with ❤️ using React, TypeScript & Vite**

[![Star](https://img.shields.io/github/stars/Tusharsinghoffical/Bussiness-website?style=social)](https://github.com/Tusharsinghoffical/Bussiness-website)

</div>
