import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Lock, Star, ArrowRight, ArrowUpRight,
  Zap, Layers, CheckCircle2, ChevronRight, Copy, Check,
  Terminal, Server, ExternalLink, RefreshCw, Cpu, FileText,
  Database, Play, HelpCircle, ArrowLeft, Sliders, DollarSign,
  Globe, Shield, BarChart3, Clock, AlertTriangle, Eye, EyeOff,
  Crosshair, Activity, Key, Code2, Bot, UserCheck, Flame
} from 'lucide-react';
import {
  SHIELD_CAPTCHA_URL,
  SHIELD_CAPTCHA_DEMO_URL,
  SHIELD_CAPTCHA_SIMULATOR_URL,
  SHIELD_CAPTCHA_DOCS_URL,
  SHIELD_CAPTCHA_DOCKER_IMAGE
} from '../constants';

/* ─── Code Snippets for Developer Integration Tabs (Live ShieldCaptcha v4.2) ── */
const INTEGRATION_CODE_SNIPPETS = {
  npm: `// 1. Install official ShieldCaptcha server package:
// npm install shieldcaptcha

const express = require('express');
const { ShieldCaptcha } = require('shieldcaptcha');

const app = express();
app.use(express.json());

// Initialize with your site key and secret from the dashboard
const captcha = new ShieldCaptcha({
  siteKey: process.env.SHIELDCAPTCHA_SITE_KEY || 'pub_shield_live_production_01928374',
  secretKey: process.env.SHIELDCAPTCHA_SECRET_KEY,
  apiUrl: 'https://shieldcaptcha.vercel.app'
});

// Protect any authentication or form endpoint
app.post('/api/login', async (req, res) => {
  const { email, password, captcha_token } = req.body;
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  // Single-line server-to-server verification
  const verification = await captcha.verify({
    token: captcha_token,
    remoteIp: clientIp
  });

  if (!verification.success) {
    return res.status(403).json({
      error: 'Captcha verification failed',
      reason: verification.error
    });
  }

  // Token valid and consumed! Proceed with login
  console.log('Verified Human Trust Score:', verification.score);
  res.json({ success: true, message: 'Welcome back human!', score: verification.score });
});

// Or use the built-in Express middleware:
// app.post('/api/protected', captcha.middleware({ minScore: 50 }), handler);`,

  html: `<!-- 1. Include ShieldCaptcha Standalone SDK -->
<script src="https://shieldcaptcha.vercel.app/captcha.js"></script>

<!-- 2. Target Container in your form -->
<form id="login-form">
  <input type="email" placeholder="user@domain.com" required />
  <div id="captcha-container"></div>
  <button type="submit" id="btn-login" disabled>Sign In</button>
</form>

<script>
  let captchaToken = '';

  // Mount widget (Choose 'checkbox', 'jigsaw', or 'adaptive')
  ShieldCaptcha.mount(document.getElementById('captcha-container'), {
    mode: 'checkbox', // Checkbox 1-Click Verification
    onToken: (token, meta) => {
      captchaToken = token;
      document.getElementById('btn-login').disabled = false;
      console.log('Verified token:', token, 'score:', meta.score);
    },
    onReset: () => {
      captchaToken = '';
      document.getElementById('btn-login').disabled = true;
    }
  });

  document.getElementById('login-form').onsubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: captchaToken })
    });
    const result = await res.json();
    alert(result.success ? 'Login Success!' : 'Verification Failed');
  };
</script>`,

  react: `import { useState } from 'react';
// Or use official React client wrapper:
// npm install @shieldcaptcha/client

export default function LoginForm() {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    const data = await res.json();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />

      {/* ShieldCaptcha Widget Container */}
      <div 
        id="shield-captcha" 
        data-sitekey="pub_shield_live_production_01928374"
        data-mode="checkbox"
      />

      <button type="submit" disabled={!token || loading}>
        {loading ? 'Authenticating...' : 'Sign In'}
      </button>
    </form>
  );
}`,

  node: `const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/login', async (req, res) => {
  const { username, password, token } = req.body;

  // 1. Verify token with ShieldCaptcha Server-to-Server API
  const verifyRes = await fetch('https://shieldcaptcha.vercel.app/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Site-Secret': process.env.SHIELD_SITE_SECRET // Your private secret
    },
    body: JSON.stringify({
      token,
      ip: req.ip
    })
  });

  const verification = await verifyRes.json();

  if (!verification.success) {
    return res.status(403).json({ 
      error: 'Bot verification failed. Access denied.', 
      score: verification.score 
    });
  }

  // 2. Token verified! Proceed with authentication...
  res.json({ success: true, message: 'Welcome back human!', score: verification.score });
});

app.listen(3000, () => console.log('Server running on port 3000'));`,

  python: `import os
import httpx
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel

app = FastAPI(title="ShieldCaptcha Protected API")

class LoginRequest(BaseModel):
    username: str
    password: str
    token: str

@app.post("/api/login")
async def login(req_data: LoginRequest, request: Request):
    # Verify token with ShieldCaptcha core engine
    async with httpx.AsyncClient() as client:
        resp = await client.post(
            "https://shieldcaptcha.vercel.app/api/siteverify",
            headers={"X-Site-Secret": os.getenv("SHIELD_SITE_SECRET")},
            json={
                "token": req_data.token,
                "ip": request.client.host
            }
        )
        data = resp.json()

    if not data.get("success"):
        raise HTTPException(status_code=403, detail="Bot challenge failed")

    return {
        "status": "authorized", 
        "human_score": data.get("score"),
        "message": "Human verified successfully!"
    }`,

  docker: `version: '3.8'

services:
  shield-captcha-engine:
    image: tusharsinghoffical/shieldcaptcha:latest
    container_name: shield_defense_engine
    restart: always
    ports:
      - "8080:8080"
    environment:
      - PORT=8080
      - NODE_ENV=production
      - MASTER_HMAC_SECRET=your_32_byte_cryptographic_hex_secret
      - BASE_DIFFICULTY_BITS=16
      - MAX_DIFFICULTY_BITS=24
      - TOKEN_EXPIRY_SECONDS=300
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 10s
      timeout: 3s
      retries: 3`
};

export const ShieldCaptcha: React.FC = () => {
  /* ── 1. Interactive Checkbox & PoW Sandbox State ── */
  const [activeMode, setActiveMode] = useState<'checkbox' | 'jigsaw'>('checkbox');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [hashCount, setHashCount] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [issuedToken, setIssuedToken] = useState<string | null>(null);

  /* ── 2. Jigsaw Slider Sandbox State ── */
  const [sliderValue, setSliderValue] = useState(0);
  const [targetSlot] = useState(72); // Target is 72%
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [trajectoryCount, setTrajectoryCount] = useState(0);
  const [humanScore, setHumanScore] = useState<number | null>(null);

  /* ── 3. Threat Simulation Profile State ── */
  const [botProfile, setBotProfile] = useState<'human' | 'selenium' | 'ddos'>('human');
  const [simDifficulty, setSimDifficulty] = useState(16);

  /* ── 4. ROI Calculator State ── */
  const [monthlyRequests, setMonthlyRequests] = useState(250000);
  const [legacyCostPerThousand] = useState(1.0); // $1 per 1,000 assessments after free tier

  /* ── 5. Integration Code Tabs State ── */
  const [selectedSnippetTab, setSelectedSnippetTab] = useState<'npm' | 'html' | 'react' | 'node' | 'python' | 'docker'>('npm');
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [copiedDockerCmd, setCopiedDockerCmd] = useState(false);

  /* ── 6. FAQ Accordion State ── */
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  /* ── PoW Checkbox Simulation Logic ── */
  const handleCheckboxClick = () => {
    if (isVerifying || isVerified) return;

    setIsVerifying(true);
    setHashCount(0);
    setElapsedTime(0);
    setIssuedToken(null);

    const startTime = performance.now();
    const interval = setInterval(() => {
      const now = performance.now();
      const diff = Math.round(now - startTime);
      setElapsedTime(diff);

      const targetHashes = botProfile === 'human' ? 65536 : botProfile === 'selenium' ? 142800 : 524288;
      const progress = Math.min(diff / (botProfile === 'human' ? 180 : 450), 1);
      setHashCount(Math.floor(progress * targetHashes));

      if (diff >= (botProfile === 'human' ? 180 : botProfile === 'selenium' ? 450 : 800)) {
        clearInterval(interval);
        setIsVerifying(false);
        setIsVerified(true);
        const randomHex = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
        setIssuedToken(`sh_tok_live_hmac_${randomHex}`);
      }
    }, 16);
  };

  const handleResetChallenge = () => {
    setIsVerifying(false);
    setIsVerified(false);
    setHashCount(0);
    setElapsedTime(0);
    setIssuedToken(null);
    setSliderValue(0);
    setPuzzleSolved(false);
    setTrajectoryCount(0);
    setHumanScore(null);
  };

  /* ── Jigsaw Slider Drag Handler ── */
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setSliderValue(val);
    setTrajectoryCount(prev => prev + 1);

    // Tolerance within 3% of target slot
    if (Math.abs(val - targetSlot) <= 3) {
      setPuzzleSolved(true);
      setHumanScore(botProfile === 'human' ? 98.7 : 42.1);
      const randomHex = Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);
      setIssuedToken(`sh_tok_jigsaw_${randomHex}`);
    } else {
      setPuzzleSolved(false);
      setHumanScore(null);
    }
  };

  /* ── Copy Helper ── */
  const copyCode = (code: string, isDocker = false) => {
    navigator.clipboard.writeText(code);
    if (isDocker) {
      setCopiedDockerCmd(true);
      setTimeout(() => setCopiedDockerCmd(false), 2000);
    } else {
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    }
  };

  /* ── Calculate ROI ── */
  const roiCalculations = useMemo(() => {
    // reCAPTCHA Enterprise charges $1 per 1,000 calls after initial 10,000 free calls
    const billableRequests = Math.max(0, monthlyRequests - 10000);
    const monthlyLegacyCost = (billableRequests / 1000) * legacyCostPerThousand;
    const annualLegacyCost = monthlyLegacyCost * 12;

    // Time saved: average user takes 12s on image grids vs 0.2s on ShieldCaptcha
    const hoursSavedPerYear = Math.round((monthlyRequests * 12 * (12 - 0.2)) / 3600);

    return {
      monthlyLegacyCost: Math.round(monthlyLegacyCost),
      annualLegacyCost: Math.round(annualLegacyCost),
      hoursSavedPerYear
    };
  }, [monthlyRequests, legacyCostPerThousand]);

  /* ── Bot Profile Change ── */
  useEffect(() => {
    if (botProfile === 'human') setSimDifficulty(16);
    else if (botProfile === 'selenium') setSimDifficulty(20);
    else setSimDifficulty(24);
    handleResetChallenge();
  }, [botProfile]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden font-sans">
      
      {/* ── Background Ambient Glow & Grid ── */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1100px] h-[540px] bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-indigo-500/10 blur-[140px] rounded-full" />
        <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] bg-emerald-500/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-24 space-y-16 sm:space-y-20">

        {/* ═══════════════════════ 1. BREADCRUMB & BACK LINK ═══════════════════════ */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link
            to="/saas"
            className="inline-flex items-center gap-1.5 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to SaaS Directory</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
              Cybersecurity &amp; Bot Defense
            </span>
            <span className="hidden sm:inline text-slate-400">·</span>
            <span className="hidden sm:inline text-slate-500">v4.2 Enterprise Production Release</span>
          </div>
        </div>

        {/* ═══════════════════════ 2. HERO SECTION ═══════════════════════ */}
        <section className="space-y-6 text-center max-w-4xl mx-auto">
          
          {/* 3D Shield Logo & Status Network Pill */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-40 blur-md group-hover:opacity-75 transition duration-500" />
              <img
                src="/shield-captcha/shield-captcha-logo.png"
                alt="ShieldCaptcha Enterprise Official Shield Logo"
                className="relative w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-2xl drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xs backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-slate-200 font-outfit">
                ShieldCaptcha v4.2 Enterprise · Dual-Layer Zero-Cookie Defense
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-outfit font-black tracking-tight text-slate-950 dark:text-white leading-[1.12]">
              Fast for Real Humans. <br />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Impossible for Automated Bots.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Stop credential stuffing, AI scrapers, and headless browser bots before they touch your server. Combines multi-threaded <strong>SHA-256 Proof-of-Work</strong>, <strong>biomechanical kinematics</strong>, and cryptographic <strong>HMAC single-use tokens</strong> with zero tracking cookies.
            </p>
          </div>

          {/* Install Badges / CLI Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <div className="flex items-center gap-2 bg-slate-900 text-slate-200 px-3.5 py-2 rounded-xl border border-slate-800 font-mono text-xs shadow-xs">
              <span className="text-cyan-400 select-none">$</span>
              <span>npm i shieldcaptcha</span>
              <button
                type="button"
                onClick={() => copyCode('npm i shieldcaptcha')}
                title="Copy package command"
                className="ml-1 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Copy size={12} />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 text-slate-200 px-3.5 py-2 rounded-xl border border-slate-800 font-mono text-xs shadow-xs">
              <span className="text-cyan-400 select-none">$</span>
              <span>npm i @shieldcaptcha/client</span>
              <button
                type="button"
                onClick={() => copyCode('npm i @shieldcaptcha/client')}
                title="Copy package command"
                className="ml-1 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Copy size={12} />
              </button>
            </div>
          </div>

          {/* Quick Metrics Deck (Live Portal Stats) */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xs relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-sky-500 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Challenges</span>
              <div className="flex items-baseline gap-1.5 my-0.5">
                <span className="text-2xl font-outfit font-black text-slate-900 dark:text-white font-mono">14</span>
                <span className="text-[10px] text-sky-600 dark:text-sky-400 font-bold">issued</span>
              </div>
              <span className="text-[10px] text-slate-500 block">PoW + Jigsaw pipeline</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xs relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-500 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Verified</span>
              <div className="flex items-baseline gap-1.5 my-0.5">
                <span className="text-2xl font-outfit font-black text-emerald-600 dark:text-emerald-400 font-mono">10</span>
                <span className="text-[10px] text-emerald-600 font-bold">humans</span>
              </div>
              <span className="text-[10px] text-slate-500 block">100% genuine pass</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xs relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-rose-500 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Blocked Bots</span>
              <div className="flex items-baseline gap-1.5 my-0.5">
                <span className="text-2xl font-outfit font-black text-rose-600 dark:text-rose-400 font-mono">4</span>
                <span className="text-[10px] text-rose-600 font-bold">stopped</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Zero bot bypasses</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xs relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-purple-500 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Escalated</span>
              <div className="flex items-baseline gap-1.5 my-0.5">
                <span className="text-2xl font-outfit font-black text-purple-600 dark:text-purple-400 font-mono">1</span>
                <span className="text-[10px] text-purple-600 font-bold">puzzles</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Adaptive risk trigger</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 shadow-xs relative overflow-hidden group col-span-2 sm:col-span-1">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-500 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Avg Latency</span>
              <div className="flex items-baseline gap-1.5 my-0.5">
                <span className="text-2xl font-outfit font-black text-cyan-600 dark:text-cyan-400 font-mono">18ms</span>
                <span className="text-[10px] text-cyan-600 font-bold">fast</span>
              </div>
              <span className="text-[10px] text-slate-500 block">Web Worker threads</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={SHIELD_CAPTCHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-outfit font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-cyan-600/25 active:scale-95 group cursor-pointer"
            >
              <Zap size={16} />
              <span>Launch Live Portal</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={SHIELD_CAPTCHA_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 font-outfit font-bold text-sm uppercase tracking-wider transition-all shadow-md active:scale-95 group cursor-pointer"
            >
              <Terminal size={16} />
              <span>Interactive Demo</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href="#live-playground"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-outfit font-bold text-sm tracking-wide transition-all hover:border-cyan-500 active:scale-95 cursor-pointer"
            >
              <Play size={14} className="text-cyan-500" />
              <span>Interactive Sandbox</span>
            </a>
          </div>

        </section>

        {/* ═══════════════════════ 3. INTERACTIVE LIVE WIDGET PLAYGROUND ═══════════════════════ */}
        <section id="live-playground" className="scroll-mt-24 space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-[11px] font-bold text-cyan-700 dark:text-cyan-300">
              <Play size={12} className="fill-current" />
              <span>Interactive Verification Sandbox</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-black tracking-tight text-slate-950 dark:text-white">
              Test ShieldCaptcha in Real-Time
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Simulate human interaction vs automated bots. Watch the client Proof-of-Work engine solve hashes and view the issued cryptographic HMAC token.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Widget Simulation Container (7 cols) */}
            <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-white/10 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              
              {/* Top Mode Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => { setActiveMode('checkbox'); handleResetChallenge(); }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all ${
                      activeMode === 'checkbox'
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    1-Click PoW Checkbox
                  </button>
                  <button
                    onClick={() => { setActiveMode('jigsaw'); handleResetChallenge(); }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all ${
                      activeMode === 'jigsaw'
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Anti-Vision Jigsaw Puzzle
                  </button>
                </div>

                <button
                  onClick={handleResetChallenge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <RefreshCw size={13} />
                  <span>Reset Sandbox</span>
                </button>
              </div>

              {/* Bot Persona Selector */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Bot size={14} className="text-cyan-500" />
                    <span>Select Client Persona / Attack Vector:</span>
                  </span>
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-mono">
                    Difficulty: {simDifficulty} Bits
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setBotProfile('human')}
                    className={`p-2 rounded-xl text-left text-xs font-semibold border transition-all ${
                      botProfile === 'human'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-800 dark:text-emerald-300 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1">
                      <UserCheck size={12} className="text-emerald-500" />
                      <span>Human User</span>
                    </div>
                    <div className="text-[10px] opacity-75 font-normal">Natural tremor, 16 bits</div>
                  </button>

                  <button
                    onClick={() => setBotProfile('selenium')}
                    className={`p-2 rounded-xl text-left text-xs font-semibold border transition-all ${
                      botProfile === 'selenium'
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-800 dark:text-amber-300 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1">
                      <Terminal size={12} className="text-amber-500" />
                      <span>Selenium Bot</span>
                    </div>
                    <div className="text-[10px] opacity-75 font-normal">Linear vectors, 20 bits</div>
                  </button>

                  <button
                    onClick={() => setBotProfile('ddos')}
                    className={`p-2 rounded-xl text-left text-xs font-semibold border transition-all ${
                      botProfile === 'ddos'
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-800 dark:text-rose-300 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1">
                      <Flame size={12} className="text-rose-500" />
                      <span>DDoS Farm</span>
                    </div>
                    <div className="text-[10px] opacity-75 font-normal">High concurrency, 24 bits</div>
                  </button>
                </div>
              </div>

              {/* ── MODE 1: CHECKBOX WIDGET ── */}
              {activeMode === 'checkbox' ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center space-y-6 min-h-[220px]">
                  
                  {/* Standalone Captcha Box (reCAPTCHA style sleek container) */}
                  <div className="w-full max-w-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 shadow-md p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleCheckboxClick}
                        disabled={isVerifying || isVerified}
                        aria-label="Verify human checkbox"
                        className={`w-7 h-7 rounded-md border-2 transition-all flex items-center justify-center cursor-pointer ${
                          isVerified
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : isVerifying
                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/40'
                            : 'border-slate-400 dark:border-slate-600 hover:border-cyan-500 bg-white dark:bg-slate-800'
                        }`}
                      >
                        {isVerified ? (
                          <Check size={18} strokeWidth={3} className="animate-in zoom-in duration-200" />
                        ) : isVerifying ? (
                          <RefreshCw size={15} className="animate-spin text-cyan-600 dark:text-cyan-400" />
                        ) : null}
                      </button>
                      <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 select-none">
                        {isVerified ? 'Human Verified' : isVerifying ? 'Solving Proof-of-Work...' : 'I am human'}
                      </span>
                    </div>

                    <div className="flex flex-col items-end text-right pl-2">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck size={18} className="text-cyan-500" />
                        <span className="text-xs font-black font-outfit text-slate-900 dark:text-white">ShieldCaptcha</span>
                      </div>
                      <span className="text-[9px] text-slate-500 dark:text-slate-400">Zero Cookies · Privacy First</span>
                    </div>
                  </div>

                  {/* PoW Real-Time Telemetry Bar */}
                  <div className="w-full max-w-sm space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span>Web Worker PoW Hashes:</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{hashCount.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-150 ${
                          isVerified ? 'bg-emerald-500' : 'bg-cyan-500'
                        }`}
                        style={{
                          width: `${Math.min(100, isVerified ? 100 : (hashCount / (botProfile === 'human' ? 65536 : 142800)) * 100)}%`
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Execution Time: <strong>{elapsedTime}ms</strong></span>
                      <span>Target: <strong>0000_sha256</strong></span>
                    </div>
                  </div>

                </div>
              ) : (
                /* ── MODE 2: JIGSAW PUZZLE WIDGET ── */
                <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/80 dark:from-slate-950 dark:to-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
                  
                  {/* Visual Canvas Representation */}
                  <div className="relative w-full h-44 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden select-none">
                    
                    {/* Background Simulated Image with Noise */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 opacity-90 flex items-center justify-center">
                      <div className="text-center opacity-40">
                        <Activity size={48} className="mx-auto text-cyan-400" />
                        <span className="text-[10px] tracking-widest uppercase font-mono text-cyan-300">Canvas Noise Vector Distortion</span>
                      </div>
                    </div>

                    {/* Target Slot Outline */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-lg border-2 border-dashed border-cyan-400/80 bg-cyan-950/40 backdrop-blur-xs flex items-center justify-center"
                      style={{ left: `${targetSlot}%` }}
                    >
                      <Crosshair size={18} className="text-cyan-400/70" />
                    </div>

                    {/* Draggable Puzzle Piece */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-lg bg-cyan-500/90 border-2 border-white shadow-xl shadow-cyan-500/40 flex items-center justify-center transition-transform"
                      style={{
                        left: `${sliderValue}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      <ShieldCheck size={20} className="text-white" />
                    </div>

                    {/* Overlay Success Banner */}
                    {puzzleSolved && (
                      <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center text-center p-4 animate-in fade-in">
                        <div className="space-y-1 text-emerald-300">
                          <CheckCircle2 size={32} className="mx-auto text-emerald-400" />
                          <p className="text-sm font-bold font-outfit">Puzzle Matched Successfully!</p>
                          <p className="text-[11px] font-mono">Biomechanical Confidence: {humanScore}%</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Drag Slider Control */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <span>Drag slider to align puzzle piece:</span>
                      <span className="font-mono text-cyan-600 dark:text-cyan-400">{sliderValue}%</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={sliderValue}
                      onChange={handleSliderChange}
                      className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                    />
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Kinematics Samples: <strong>{trajectoryCount} pts</strong></span>
                      <span>Tolerance: <strong>±3% Curvature</strong></span>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Right Col: Cryptographic Token Claims Inspector (5 cols) */}
            <div className="lg:col-span-5 rounded-3xl bg-slate-900 border border-slate-800 text-white p-6 sm:p-7 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Key size={16} className="text-cyan-400" />
                  <span className="text-xs font-bold font-outfit uppercase tracking-wider text-slate-200">
                    Token Claims Inspector
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  isVerified || puzzleSolved
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isVerified || puzzleSolved ? 'TOKEN ISSUED' : 'AWAITING CHALLENGE'}
                </span>
              </div>

              {/* Claims Breakdown Table */}
              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">Algorithm:</span>
                  <span className="text-cyan-300 font-bold">HMAC-SHA256</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">Replay Protection:</span>
                  <span className="text-emerald-400 font-bold">Single-Use (Atomic)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">Token Validity TTL:</span>
                  <span className="text-slate-200">300 Seconds (5m)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">IP Bound Hash:</span>
                  <span className="text-slate-300">sha256(192.168.1.x + salt)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-slate-400">Entropy Score:</span>
                  <span className="text-emerald-400 font-bold">
                    {isVerified ? '0.985 (Human Passed)' : puzzleSolved ? '0.992 (Human Passed)' : '0.000'}
                  </span>
                </div>
              </div>

              {/* Raw Issued Token Display */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Signed Verification Token:</span>
                  {issuedToken && (
                    <button
                      onClick={() => copyCode(issuedToken)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                    >
                      <Copy size={11} />
                      <span>Copy</span>
                    </button>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all min-h-[50px] flex items-center">
                  {issuedToken ? (
                    <span className="text-cyan-300">{issuedToken}</span>
                  ) : (
                    <span className="text-slate-500 italic">Click the verification checkbox to generate a signed HMAC token.</span>
                  )}
                </div>
              </div>

              {/* Server Verification Hint */}
              <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-[11px] text-cyan-200/90 leading-relaxed">
                <strong>Server-to-Server Flow:</strong> Your backend sends this token via <code className="text-cyan-300">POST /api/siteverify</code>. The ShieldCaptcha engine validates signature and invalidates the nonce instantly.
              </div>

            </div>

          </div>

        </section>

        {/* ═══════════════════════ 4. CORE FEATURES & DEFENSE ARCHITECTURE ═══════════════════════ */}
        <section className="space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-[11px] font-bold text-cyan-700 dark:text-cyan-300">
              <ShieldCheck size={12} className="text-cyan-500" />
              <span>Security Blueprint</span>
            </div>
            <h2 className="text-3xl font-outfit font-black tracking-tight text-slate-950 dark:text-white">
              Core Defense Architecture (6 Pillars)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Multi-layered security mechanics engineered into ShieldCaptcha to protect user privacy and block automated solvers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 shadow-md transition-all space-y-3 group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                    <Cpu size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Web Worker
                  </span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-slate-950 dark:text-white">
                  Bit-Level Proof-of-Work
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                  Client executes leading-zero SHA-256 computation in a multi-threaded Web Worker. Completes in ~18ms for legitimate users, while costing scraper botnets exponential CPU compute.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 shadow-md transition-all space-y-3 group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                    <Activity size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Biomechanical
                  </span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-slate-950 dark:text-white">
                  Flash &amp; Hogan Minimum Jerk
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                  Analyzes third-order velocity derivatives (da/dt jerk) and physiological micro-tremor harmonics. Bots generating linear trajectories or polynomial splines fail the biological motion test.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 shadow-md transition-all space-y-3 group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    <EyeOff size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Anti-Computer-Vision
                  </span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-slate-950 dark:text-white">
                  Adversarial Jigsaw Cutout
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                  Procedural Perlin fractal noise canvas with multi-tab Bézier shapes and single glowing target socket with ±24px magnetic tolerance for seamless 1st-try human alignment.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 shadow-md transition-all space-y-3 group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                    <Lock size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Cryptographic
                  </span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-slate-950 dark:text-white">
                  HMAC Single-Use Authorization
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                  Each passed verification receives a cryptographically signed HMAC token containing a unique jti nonce and client IP hash. Single-use enforcement prevents replay attacks.
                </p>
              </div>
            </div>

            {/* Pillar 5 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 shadow-md transition-all space-y-3 group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 flex items-center justify-center text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                    <Layers size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Adaptive Defense
                  </span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-slate-950 dark:text-white">
                  Dual Mode &amp; Auto Step-Up
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                  Frictionless 1-Click Checkbox for 98% of clean users. Suspicious automation immediately escalates to the interlocking Jigsaw slider challenge.
                </p>
              </div>
            </div>

            {/* Pillar 6 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 shadow-md transition-all space-y-3 group relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                    <Server size={20} />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    CDP &amp; WebDriver
                  </span>
                </div>
                <h3 className="text-lg font-outfit font-bold text-slate-950 dark:text-white">
                  Hardware Integrity Audit
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                  Inspects Chrome DevTools Protocol flags, WebGL software renderers (SwiftShader, llvmpipe), and IDL property tampering to instantly flag headless environments.
                </p>
              </div>
            </div>

          </div>

        </section>

        {/* ═══════════════════════ 5. STEP-BY-STEP ARCHITECTURE PIPELINE ═══════════════════════ */}
        <section className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 text-white space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-bold text-cyan-400">
              <Zap size={12} />
              <span>Cryptographic Data Pipeline</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-black tracking-tight text-white">
              How ShieldCaptcha Works (Under The Hood)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              End-to-end client challenge execution, payload encryption, kinematic analysis, and server-to-server token authorization.
            </p>
          </div>

          {/* Pipeline Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 relative">
              <div className="text-xs font-mono font-bold text-cyan-400">01. CLIENT CHALLENGE</div>
              <h4 className="text-sm font-bold font-outfit text-white">PoW &amp; Trajectory Record</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Web Worker solves SHA-256 nonce. Pointer listener captures acceleration derivatives and screen resolution fingerprint.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 relative">
              <div className="text-xs font-mono font-bold text-cyan-400">02. AES-CBC ENCRYPTION</div>
              <h4 className="text-sm font-bold font-outfit text-white">Payload Ciphering</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Client encrypts telemetry via session PBKDF2 derived key and submits payload to <code className="text-cyan-300">/api/verify</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 relative">
              <div className="text-xs font-mono font-bold text-cyan-400">03. DEFENSE EVALUATION</div>
              <h4 className="text-sm font-bold font-outfit text-white">Kinematics &amp; PoW Check</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Core engine decrypts, checks hash difficulty, computes tremor entropy, and issues single-use HMAC-SHA256 token.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 relative">
              <div className="text-xs font-mono font-bold text-emerald-400">04. SITEVERIFY REST API</div>
              <h4 className="text-sm font-bold font-outfit text-white">Server-to-Server Auth</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your application backend sends token + secret to <code className="text-emerald-300">/api/siteverify</code> and receives <code className="text-emerald-300">success: true</code>.
              </p>
            </div>

          </div>

          {/* Quick ASCII Pipeline Diagram */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-cyan-300/80 overflow-x-auto whitespace-pre leading-relaxed">
{`[User Client Browser]  ──────►  1. Web Worker solves SHA-256 PoW (~18ms) + captures pointer kinematics
                             │
                             ▼  POST /api/verify (Encrypted client challenge)
[ShieldCaptcha Engine] ──────►  2. Evaluates tremor entropy & issues single-use HMAC-SHA256 token
                             │
                             ▼  Token attached to form submission
[Your Backend Service] ──────►  3. POST /api/siteverify (with X-Site-Secret or npm package)
                             │
[ShieldCaptcha Engine] ──────►  4. Validates token authenticity & consumes nonce ──► { success: true, score: 98 }`}
          </div>

        </section>

        {/* ═══════════════════════ 6. COMPARISON MATRIX (SHIELDCAPTCHA VS ALTERNATIVES) ═══════════════════════ */}
        <section className="space-y-6">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-3xl font-outfit font-black tracking-tight text-slate-950 dark:text-white">
              ShieldCaptcha vs Legacy Alternatives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Compare privacy compliance, latency, cost, and architecture against industry standards.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-lg">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-slate-700 dark:text-slate-300 font-outfit font-black">
                  <th className="p-4 sm:p-5">Security Feature</th>
                  <th className="p-4 sm:p-5 text-cyan-600 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-950/20">ShieldCaptcha Enterprise</th>
                  <th className="p-4 sm:p-5">Google reCAPTCHA v2/v3</th>
                  <th className="p-4 sm:p-5">Cloudflare Turnstile</th>
                  <th className="p-4 sm:p-5">hCaptcha</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Privacy &amp; Cookie Tracking</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">Zero Cookies (100% Private)</td>
                  <td className="p-4 sm:p-5 text-rose-500">Third-Party Tracking Cookies</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">Cloudflare Managed Telemetry</td>
                  <td className="p-4 sm:p-5 text-rose-500">Third-Party Cookies &amp; Ads</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Self-Hostable Deployment</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">Yes (Docker, Node, Python)</td>
                  <td className="p-4 sm:p-5 text-slate-500">No (Google Cloud only)</td>
                  <td className="p-4 sm:p-5 text-slate-500">No (Cloudflare edge only)</td>
                  <td className="p-4 sm:p-5 text-slate-500">No (Cloud vendor lock-in)</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Verification Execution Latency</td>
                  <td className="p-4 sm:p-5 font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50/30 dark:bg-cyan-950/10">150ms – 300ms</td>
                  <td className="p-4 sm:p-5 text-rose-500">2s – 15s (Image clicking)</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">300ms – 1s</td>
                  <td className="p-4 sm:p-5 text-rose-500">3s – 10s</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Open Source License</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">100% Open Source (MIT)</td>
                  <td className="p-4 sm:p-5 text-slate-500">Proprietary Closed Source</td>
                  <td className="p-4 sm:p-5 text-slate-500">Proprietary Closed Source</td>
                  <td className="p-4 sm:p-5 text-slate-500">Partially Closed</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Enterprise Cost at Scale</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">Free Forever ($0)</td>
                  <td className="p-4 sm:p-5 text-rose-500">$1 / 1,000 calls after 10k</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">Free tier / Paid enterprise</td>
                  <td className="p-4 sm:p-5 text-rose-500">Paid enterprise tier</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Proof-of-Work (PoW) Defense</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">SHA-256 Hardware Adaptive</td>
                  <td className="p-4 sm:p-5 text-slate-500">None</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">Proprietary PoW</td>
                  <td className="p-4 sm:p-5 text-slate-500">None</td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-bold text-slate-900 dark:text-white">Biomechanical Kinematics</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-600 dark:text-emerald-400 bg-cyan-50/30 dark:bg-cyan-950/10">Micro-tremor Curvature Analysis</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">Proprietary Behavioral Scoring</td>
                  <td className="p-4 sm:p-5 text-slate-600 dark:text-slate-300">Browser Environment Check</td>
                  <td className="p-4 sm:p-5 text-slate-500">Image Classification Only</td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>

        {/* ═══════════════════════ 7. DEVELOPER INTEGRATION CODE STUDIO ═══════════════════════ */}
        <section className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-[11px] font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                <Code2 size={12} />
                <span>Zero-Friction Developer SDK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-outfit font-black tracking-tight text-slate-950 dark:text-white">
                Integrate in Under 5 Minutes
              </h2>
            </div>

            {/* Language Selection Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shrink-0 overflow-x-auto">
              <button
                onClick={() => setSelectedSnippetTab('npm')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all ${
                  selectedSnippetTab === 'npm'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                NPM Package (SDK)
              </button>
              <button
                onClick={() => setSelectedSnippetTab('html')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all ${
                  selectedSnippetTab === 'html'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Vanilla HTML
              </button>
              <button
                onClick={() => setSelectedSnippetTab('react')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all ${
                  selectedSnippetTab === 'react'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                React / Next.js
              </button>
              <button
                onClick={() => setSelectedSnippetTab('node')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all ${
                  selectedSnippetTab === 'node'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Node.js REST
              </button>
              <button
                onClick={() => setSelectedSnippetTab('python')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all ${
                  selectedSnippetTab === 'python'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Python FastAPI
              </button>
              <button
                onClick={() => setSelectedSnippetTab('docker')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-outfit transition-all ${
                  selectedSnippetTab === 'docker'
                    ? 'bg-cyan-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Docker Compose
              </button>
            </div>
          </div>

          {/* Code Viewer Container */}
          <div className="rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-slate-300">
                  {selectedSnippetTab === 'npm' ? 'server.js (npm i shieldcaptcha)' :
                   selectedSnippetTab === 'html' ? 'index.html' :
                   selectedSnippetTab === 'react' ? 'LoginForm.tsx' :
                   selectedSnippetTab === 'node' ? 'server.js (/api/siteverify)' :
                   selectedSnippetTab === 'python' ? 'main.py' : 'docker-compose.yml'}
                </span>
              </div>
              <button
                onClick={() => copyCode(INTEGRATION_CODE_SNIPPETS[selectedSnippetTab])}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                {copiedSnippet ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                <span>{copiedSnippet ? 'Copied Snippet!' : 'Copy Code'}</span>
              </button>
            </div>

            <pre className="p-6 text-xs sm:text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed bg-slate-950 selection:bg-cyan-500 selection:text-black">
              <code>{INTEGRATION_CODE_SNIPPETS[selectedSnippetTab]}</code>
            </pre>
          </div>

        </section>

        {/* ═══════════════════════ 8. ENTERPRISE COST & ROI CALCULATOR ═══════════════════════ */}
        <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 p-6 sm:p-10 text-white space-y-8">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-bold text-emerald-400">
              <DollarSign size={12} />
              <span>Infrastructure ROI Calculator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-outfit font-black tracking-tight text-white">
              Calculate Your Enterprise Savings
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              See how much your organization saves by replacing paid reCAPTCHA Enterprise tiers with self-hosted ShieldCaptcha.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-slate-300">Monthly Form / API Challenge Volume:</span>
                  <span className="font-mono text-cyan-400 font-bold text-lg">
                    {monthlyRequests.toLocaleString()} Calls/mo
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="2000000"
                  step="25000"
                  value={monthlyRequests}
                  onChange={(e) => setMonthlyRequests(parseInt(e.target.value, 10))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>50k Calls</span>
                  <span>1 Million</span>
                  <span>2 Million Calls</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs text-slate-400">
                <div className="flex items-center justify-between text-slate-300">
                  <span>reCAPTCHA Enterprise Baseline:</span>
                  <span className="font-bold text-rose-400">$1.00 / 1,000 assessments</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>ShieldCaptcha Self-Hosted:</span>
                  <span className="font-bold text-emerald-400">$0.00 (Self-Hosted Docker)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>User Friction Time per Call:</span>
                  <span className="font-bold text-cyan-400">200ms vs 12s on image tiles</span>
                </div>
              </div>
            </div>

            {/* Right Output Scorecards (6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Annual Vendor Cost Saved</span>
                <span className="text-3xl font-outfit font-black text-emerald-400">
                  ${roiCalculations.annualLegacyCost.toLocaleString()}
                </span>
                <p className="text-[11px] text-slate-400">
                  Saved annually on third-party assessment billing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">User Productivity Saved</span>
                <span className="text-3xl font-outfit font-black text-cyan-400">
                  {roiCalculations.hoursSavedPerYear.toLocaleString()} hrs
                </span>
                <p className="text-[11px] text-slate-400">
                  Eliminating painful traffic light &amp; fire hydrant image grids.
                </p>
              </div>

              <div className="sm:col-span-2 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-800/60 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">Docker Self-Hosted Command</span>
                  <span className="text-[11px] font-mono text-cyan-300 break-all block">
                    docker run -d -p 8080:8080 tusharsinghoffical/shieldcaptcha:latest
                  </span>
                </div>
                <button
                  onClick={() => copyCode('docker run -d -p 8080:8080 tusharsinghoffical/shieldcaptcha:latest', true)}
                  className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  {copiedDockerCmd ? 'Copied!' : 'Copy'}
                </button>
              </div>

            </div>

          </div>

        </section>

        {/* ═══════════════════════ 9. PRODUCTION LINKS & ASSETS MATRIX ═══════════════════════ */}
        <section className="space-y-6">
          
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-outfit font-black tracking-tight text-slate-950 dark:text-white">
              Official Production Links &amp; Repositories
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Access the live hosted instances, automated API documentation, and public source code.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <a
              href={SHIELD_CAPTCHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500 shadow-sm transition-all group block space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">LIVE APP</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
              </div>
              <h3 className="text-base font-outfit font-bold text-slate-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Production Web Portal
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Official hosted developer portal and administration dashboard on Vercel Edge.
              </p>
            </a>

            <a
              href={SHIELD_CAPTCHA_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500 shadow-sm transition-all group block space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">INTERACTIVE DEMO</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
              </div>
              <h3 className="text-base font-outfit font-bold text-slate-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Live Widget Playground
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Test 1-click checkbox and jigsaw puzzle directly on live production DOM.
              </p>
            </a>

            <a
              href={SHIELD_CAPTCHA_SIMULATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500 shadow-sm transition-all group block space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">ATTACK LAB</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
              </div>
              <h3 className="text-base font-outfit font-bold text-slate-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Attack Simulator &amp; Pen-Testing
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Simulate credential stuffing, headless puppeteer bots, and automated bypass attempts.
              </p>
            </a>

            <a
              href={SHIELD_CAPTCHA_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500 shadow-sm transition-all group block space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">DOCUMENTATION</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
              </div>
              <h3 className="text-base font-outfit font-bold text-slate-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Developer Documentation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                REST API specs, client widget SDK options, error codes, and configuration flags.
              </p>
            </a>

            <a
              href="https://shieldcaptcha.vercel.app/architecture"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500 shadow-sm transition-all group block space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">ARCHITECTURE</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
              </div>
              <h3 className="text-base font-outfit font-bold text-slate-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Cryptographic Blueprint
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mathematical proof of work difficulty escalation and PBKDF2 key schedules.
              </p>
            </a>

            <a
              href={SHIELD_CAPTCHA_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500 shadow-sm transition-all group block space-y-2 cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-600 dark:text-cyan-400">SELF-HOSTABLE</span>
                <ArrowUpRight size={14} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
              </div>
              <h3 className="text-base font-outfit font-bold text-slate-950 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                Docker &amp; API Docs
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Deploy with Docker, explore REST endpoints, and integrate client Web Workers.
              </p>
            </a>

          </div>

        </section>

        {/* ═══════════════════════ 10. COMPREHENSIVE FAQ ═══════════════════════ */}
        <section className="space-y-6 max-w-4xl mx-auto">
          
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-outfit font-black tracking-tight text-slate-950 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Technical answers regarding privacy, proof-of-work mechanics, and self-hosting.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "What is ShieldCaptcha and how does it work?",
                a: "ShieldCaptcha is an open-source, zero-dependency autonomous bot defense platform and free CAPTCHA alternative. It combines client-side cryptographic Proof-of-Work (PoW), anti-computer-vision jigsaw puzzles, and biomechanical kinematics analysis to prevent automated bots, scrapers, and credential stuffing attacks without tracking private user data or requiring invasive cookies."
              },
              {
                q: "Is ShieldCaptcha free to use for websites and developers?",
                a: "Yes, ShieldCaptcha is 100% free and open-source under the MIT license. Developers can self-host the backend engine via Docker, Node.js, or Python, or use free client-side embeddable widgets with zero monthly subscription fees."
              },
              {
                q: "How does ShieldCaptcha compare to Google reCAPTCHA and Cloudflare Turnstile?",
                a: "Unlike Google reCAPTCHA, ShieldCaptcha does not require third-party cookies, tracking IDs, or vendor lock-in. Unlike Cloudflare Turnstile, ShieldCaptcha is completely self-hostable with full on-premises and private cloud control, providing transparent Proof-of-Work challenges with sub-20ms resolution."
              },
              {
                q: "How can developers integrate ShieldCaptcha API into React, Next.js, and HTML?",
                a: "ShieldCaptcha can be added with a single script tag or React component. Simply embed <div id='shield-captcha' data-sitekey='YOUR_KEY'></div> or use the npm package @shieldcaptcha/client, followed by server-side verification using HMAC-SHA256 tokens on /api/siteverify."
              },
              {
                q: "What is the difference between client-side and server-side CAPTCHA verification?",
                a: "Client-side verification solves mathematical challenges and records biomechanical kinematics in the user browser (~18ms). Server-side verification validates the cryptographically signed HMAC token and anti-replay nonce via /api/siteverify or the npm 'shieldcaptcha' SDK to ensure the request was genuine."
              },
              {
                q: "Can automated bot solvers, OCR scripts, or AI bypass ShieldCaptcha?",
                a: "No. ShieldCaptcha uses multi-layer detection: dynamic cryptographic SHA-256 Proof-of-Work difficulty scaling, canvas fingerprint validation, drag acceleration kinematics, and tamper-resistant encrypted challenge responses that block automated solvers like Selenium, Puppeteer, and Playwright."
              },
              {
                q: "Can ShieldCaptcha prevent brute force attacks, credential stuffing, and DDoS?",
                a: "Yes. By requiring client CPU computation (SHA-256 PoW) before processing form submissions, ShieldCaptcha imposes exponential compute costs on botnets, making high-velocity credential stuffing and automated brute force economically and computationally unviable."
              },
              {
                q: "How to troubleshoot 'ShieldCaptcha verification failed' or missing token errors?",
                a: "Common solutions include: 1) Verify that the site key and secret match your environment configuration; 2) Ensure your backend verifies tokens within the 5-minute expiration window; 3) Check that your server allows CORS or proxy routes to /api/siteverify."
              },
              {
                q: "What is ShieldCaptcha meaning in Hindi (Shield Captcha kya hota hai)?",
                a: "ShieldCaptcha ek modern, open-source bot defense aur human verification system hai jo bina kisi tracking cookie ke bots, web scrapers aur automated scripts ko website me ghusne se rokta hai. Yeh client-side Proof-of-Work aur mouse kinematics physics ka use karta hai taaki genuine users 18ms me verify ho sakein bina kisi tedious image puzzles ke."
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-outfit font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronRight
                    size={16}
                    className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                      openFaqIndex === idx ? 'rotate-90 text-cyan-500' : ''
                    }`}
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </section>

        {/* ═══════════════════════ 11. BOTTOM CTA BANNER ═══════════════════════ */}
        <section className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-white/15 via-transparent to-transparent pointer-events-none" />

          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <span className="px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-black uppercase tracking-wider">
              Ready to Protect Your Web Applications?
            </span>
            <h2 className="text-3xl sm:text-4xl font-outfit font-black tracking-tight text-white leading-tight">
              Eliminate Bot Attacks &amp; Respect User Privacy Today
            </h2>
            <p className="text-sm sm:text-base text-cyan-100 leading-relaxed">
              Deploy ShieldCaptcha in minutes via Docker or explore the live interactive developer sandbox.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 pt-2">
            <a
              href={SHIELD_CAPTCHA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-outfit font-bold text-sm uppercase tracking-wider transition-all shadow-lg active:scale-95 cursor-pointer"
            >
              <Zap size={16} className="text-cyan-600" />
              <span>Launch Live Portal</span>
              <ArrowUpRight size={14} />
            </a>

            <a
              href={SHIELD_CAPTCHA_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-950/60 hover:bg-slate-950 text-white font-outfit font-bold text-sm uppercase tracking-wider transition-all border border-white/20 active:scale-95 cursor-pointer"
            >
              <Terminal size={16} />
              <span>Developer Docs</span>
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-950 text-white font-outfit font-bold text-sm tracking-wider transition-all border border-white/20 active:scale-95 cursor-pointer"
            >
              <span>Consult with Tushar</span>
            </Link>
          </div>

        </section>

      </div>

    </div>
  );
};

export default ShieldCaptcha;
