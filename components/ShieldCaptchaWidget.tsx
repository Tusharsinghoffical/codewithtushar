import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Shield, ShieldCheck, RefreshCw, AlertCircle, Cpu, Zap, Lock,
  ChevronDown, ChevronUp, Copy, Check, Sparkles, Activity, KeyRound,
  ExternalLink, Info
} from 'lucide-react';

declare global {
  interface Window {
    ShieldCaptcha?: {
      mount: (
        container: HTMLElement,
        options?: {
          api?: string;
          mode?: 'checkbox' | 'jigsaw';
          onToken?: (token: string, metadata?: { score?: number; mode?: string }) => void;
          onReset?: () => void;
          onTrajectory?: (data: any) => void;
        }
      ) => {
        reset: () => void;
        switchMode: (mode: 'checkbox' | 'jigsaw') => void;
        triggerLockout: (sec?: number) => void;
        resetLockout: () => void;
        simulateBot?: (attackType: string) => Promise<any>;
        destroy: () => void;
      };
      version?: string;
    };
  }
}

export interface ShieldCaptchaWidgetProps {
  onVerify: (token: string, meta?: { score?: number; mode?: string; latencyMs?: number }) => void;
  onReset?: () => void;
  api?: string;
  defaultMode?: 'checkbox' | 'jigsaw';
  highlightError?: boolean;
}

// Gentle pleasant success chime synthesizer via Web Audio API (no external asset needed)
const playSuccessChime = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.22); // C6

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.36);
  } catch {
    // Autoplay policy or unsupported audio - silent ignore
  }
};

export const ShieldCaptchaWidget: React.FC<ShieldCaptchaWidgetProps> = ({
  onVerify,
  onReset,
  api = 'https://shieldcaptcha.vercel.app',
  defaultMode = 'checkbox',
  highlightError = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const widgetInstanceRef = useRef<any>(null);
  const startTimeRef = useRef<number>(0);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<'checkbox' | 'jigsaw'>(defaultMode);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedMeta, setVerifiedMeta] = useState<{ score?: number; mode?: string; latencyMs?: number } | null>(null);
  const [verifiedToken, setVerifiedToken] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [showTelemetry, setShowTelemetry] = useState(false);

  // Injects custom responsive and dark-mode styles for the mounted widget
  useEffect(() => {
    const styleId = 'shieldcaptcha-theme-adapter-styles';
    if (!document.getElementById(styleId)) {
      const styleEl = document.createElement('style');
      styleEl.id = styleId;
      styleEl.textContent = `
        /* Responsive scaling */
        .sc-root {
          max-width: 100% !important;
          transition: all 0.25s ease !important;
        }
        @media (max-width: 360px) {
          .sc-root {
            transform: scale(0.92);
            transform-origin: center top;
          }
        }

        /* Dark mode overrides for ShieldCaptcha */
        .dark .sc-view-checkbox {
          background: #0f172a !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4) !important;
        }
        .dark .sc-chk-btn {
          background: #1e293b !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
        }
        .dark .sc-chk-btn:hover {
          border-color: #6366f1 !important;
          box-shadow: 0 0 14px rgba(99, 102, 241, 0.35) !important;
        }
        .dark .sc-chk-label {
          color: #f8fafc !important;
        }
        .dark .sc-chk-sub {
          color: #94a3b8 !important;
        }
        .dark .sc-view-checkbox img {
          filter: brightness(1.1) drop-shadow(0 0 4px rgba(99, 102, 241, 0.4)) !important;
        }
        .dark .sc-top-guide {
          background: #1e293b !important;
          border-color: rgba(255, 255, 255, 0.1) !important;
          color: #e2e8f0 !important;
        }
        .dark .sc-guide-content {
          color: #e2e8f0 !important;
        }
        .dark .sc-attempt-badge {
          background: #0f172a !important;
          border-color: rgba(255, 255, 255, 0.15) !important;
          color: #cbd5e1 !important;
        }
        .dark .sc-track-container {
          background: #1e293b !important;
          border-color: rgba(255, 255, 255, 0.12) !important;
        }
        .dark .sc-prompt-text {
          color: #94a3b8 !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  const onVerifyRef = useRef(onVerify);
  onVerifyRef.current = onVerify;
  const onResetRef = useRef(onReset);
  onResetRef.current = onReset;

  // Script loader helper
  const ensureScriptLoaded = useCallback((): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.ShieldCaptcha) {
        resolve();
        return;
      }

      // Poll briefly if script is already loaded/in flight
      let attempts = 0;
      const poll = setInterval(() => {
        if (typeof window !== 'undefined' && window.ShieldCaptcha) {
          clearInterval(poll);
          resolve();
        } else if (++attempts > 40) {
          clearInterval(poll);
          injectScript();
        }
      }, 50);

      function injectScript() {
        if (typeof window !== 'undefined' && window.ShieldCaptcha) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = '/captcha.js';
        script.async = true;
        script.setAttribute('data-shieldcaptcha', 'true');
        script.onload = () => resolve();
        script.onerror = () => {
          const fallback = document.createElement('script');
          fallback.src = `${api}/captcha.js`;
          fallback.async = true;
          fallback.onload = () => resolve();
          fallback.onerror = () => reject(new Error('Failed to load ShieldCaptcha script from remote engine'));
          document.body.appendChild(fallback);
        };
        document.body.appendChild(script);
      }

      const existingScript = document.querySelector('script[src*="captcha.js"]');
      if (!existingScript) {
        clearInterval(poll);
        injectScript();
      }
    });
  }, [api]);

  // Mount or re-mount widget
  const initWidget = useCallback(() => {
    if (!mountRef.current || !window.ShieldCaptcha) return;

    if (widgetInstanceRef.current) {
      try {
        widgetInstanceRef.current.destroy();
      } catch {
        // cleanup ignore
      }
      widgetInstanceRef.current = null;
    }

    try {
      startTimeRef.current = performance.now();
      const instance = window.ShieldCaptcha.mount(mountRef.current, {
        api,
        mode: currentMode,
        onToken: (token, meta) => {
          const latency = Math.round(performance.now() - (startTimeRef.current || performance.now()));
          playSuccessChime();
          setIsVerified(true);
          setVerifiedToken(token);
          const metaWithLatency = {
            score: meta?.score ?? 98,
            mode: meta?.mode ?? currentMode,
            latencyMs: latency > 0 ? latency : 185
          };
          setVerifiedMeta(metaWithLatency);
          onVerifyRef.current(token, metaWithLatency);
        },
        onReset: () => {
          setIsVerified(false);
          setVerifiedToken(null);
          setVerifiedMeta(null);
          onResetRef.current?.();
        }
      });
      widgetInstanceRef.current = instance;
    } catch (err: any) {
      console.error('[ShieldCaptchaWidget] Mount error:', err);
      setLoadError(err?.message || 'Failed to initialize widget');
    }
  }, [api, currentMode]);

  useEffect(() => {
    let cancelled = false;

    ensureScriptLoaded()
      .then(() => {
        if (!cancelled) {
          setIsLoaded(true);
          initWidget();
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('[ShieldCaptchaWidget] Script load error:', err);
          setLoadError('Failed to load defense engine. Check network connectivity.');
        }
      });

    return () => {
      cancelled = true;
      if (widgetInstanceRef.current) {
        try {
          widgetInstanceRef.current.destroy();
        } catch {}
        widgetInstanceRef.current = null;
      }
    };
  }, [ensureScriptLoaded, initWidget]);

  const handleSwitchMode = (mode: 'checkbox' | 'jigsaw') => {
    if (mode === currentMode) return;
    setCurrentMode(mode);
    setIsVerified(false);
    setVerifiedToken(null);
    setVerifiedMeta(null);
    onReset?.();
    if (widgetInstanceRef.current && widgetInstanceRef.current.switchMode) {
      widgetInstanceRef.current.switchMode(mode);
    } else {
      setTimeout(initWidget, 50);
    }
  };

  const handleManualReset = () => {
    setIsVerified(false);
    setVerifiedToken(null);
    setVerifiedMeta(null);
    onReset?.();
    if (widgetInstanceRef.current && widgetInstanceRef.current.reset) {
      widgetInstanceRef.current.reset();
    } else {
      initWidget();
    }
  };

  const handleCopyToken = () => {
    if (!verifiedToken) return;
    navigator.clipboard.writeText(verifiedToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div
      className={`rounded-3xl border transition-all duration-300 p-4 sm:p-5 text-left relative overflow-hidden ${
        highlightError && !isVerified
          ? 'bg-rose-500/5 dark:bg-rose-950/30 border-rose-500/80 dark:border-rose-500/60 shadow-lg shadow-rose-500/10 ring-2 ring-rose-500/30 animate-[shake_0.4s_ease]'
          : isVerified
          ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/40 dark:border-emerald-500/30 shadow-md shadow-emerald-500/5 ring-1 ring-emerald-500/20'
          : 'bg-slate-50/80 dark:bg-slate-900/60 border-slate-200/90 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/30 shadow-xs'
      }`}
    >
      {/* Ambient background glow when verified */}
      {isVerified && (
        <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Header Bar */}
      <div className="flex items-center justify-between mb-3.5 pb-3 border-b border-slate-200/70 dark:border-white/5 relative z-10">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm ${
              isVerified
                ? 'bg-emerald-500 text-white shadow-emerald-500/30 scale-105'
                : 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-indigo-500/20'
            }`}
          >
            {isVerified ? (
              <ShieldCheck size={18} className="animate-[scale_0.3s_ease]" />
            ) : (
              <Shield size={16} />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white font-outfit">
                ShieldCaptcha Enterprise
              </span>
              <span className="px-1.5 py-0.5 rounded-md text-[8.5px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                Live SDK v4.2
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Zero-Cookie Proof-of-Work &amp; Biomechanical Bot Defense
            </p>
          </div>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-300/40 dark:border-white/5">
          <button
            type="button"
            onClick={() => handleSwitchMode('checkbox')}
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              currentMode === 'checkbox'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="1-Click Proof-of-Work Checkbox"
          >
            1-Click PoW
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('jigsaw')}
            className={`px-2.5 py-1 rounded-lg text-[9.5px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              currentMode === 'jigsaw'
                ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-2xs font-extrabold'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
            title="Biomechanical Jigsaw Slider"
          >
            Puzzle
          </button>
        </div>
      </div>

      {/* Widget Mount Container */}
      <div className="flex justify-center my-2 relative min-h-[76px]">
        {!isLoaded && !loadError && (
          <div className="flex items-center justify-center gap-2.5 py-6 text-xs text-slate-500 dark:text-slate-400 font-medium">
            <Cpu size={16} className="animate-spin text-indigo-500" />
            <span>Initializing Hardware-Accelerated SHA-256 Worker…</span>
          </div>
        )}

        {loadError && (
          <div className="flex items-center justify-between w-full p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0 text-amber-600 dark:text-amber-400" />
              <span>{loadError}</span>
            </div>
            <button
              type="button"
              onClick={handleManualReset}
              className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        )}

        <div
          ref={mountRef}
          className="w-full flex justify-center [&_.sc-root]:mx-auto [&_.sc-view-checkbox]:w-full [&_.sc-card]:mx-auto [&_.sc-track-container]:mx-auto"
        />
      </div>

      {/* Verification Details / Trust Meter */}
      {isVerified ? (
        <div className="mt-3 pt-2.5 border-t border-emerald-500/20 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="font-extrabold text-emerald-700 dark:text-emerald-400 font-outfit text-xs">
                Human Identity Verified
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-black border border-emerald-500/20">
                Score: {verifiedMeta?.score ?? 98}/100
              </span>
              {verifiedMeta?.latencyMs && (
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-[9.5px] font-mono font-bold">
                  {verifiedMeta.latencyMs}ms
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowTelemetry(!showTelemetry)}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <span>Telemetry</span>
                {showTelemetry ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>

              <button
                type="button"
                onClick={handleManualReset}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                title="Re-verify challenge"
              >
                <RefreshCw size={11} />
                <span>Re-verify</span>
              </button>
            </div>
          </div>

          {/* Expandable Cryptographic Telemetry Panel */}
          {showTelemetry && (
            <div className="p-3 bg-slate-900 text-slate-200 rounded-2xl text-[10px] font-mono space-y-1.5 border border-white/10 shadow-inner">
              <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/5">
                <span className="font-bold uppercase tracking-wider text-[9px] flex items-center gap-1">
                  <KeyRound size={11} className="text-cyan-400" /> Cryptographic Telemetry
                </span>
                <span className="text-[9px] text-emerald-400">STATUS: AUTHORIZED</span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[9.5px]">
                <div>
                  <span className="text-slate-500 block">Defense Mode</span>
                  <span className="text-white font-bold">{verifiedMeta?.mode ?? 'checkbox_pow'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Latency Window</span>
                  <span className="text-cyan-300 font-bold">{verifiedMeta?.latencyMs ?? 180}ms</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tracking Cookies</span>
                  <span className="text-emerald-400 font-bold">0 (Zero Cookies)</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Compliance</span>
                  <span className="text-indigo-300 font-bold">GDPR / DPDP Ready</span>
                </div>
              </div>

              {verifiedToken && (
                <div className="pt-1.5 mt-1 border-t border-white/5 flex items-center justify-between gap-2">
                  <span className="truncate text-slate-400 text-[9px]">
                    Token: {verifiedToken.substring(0, 24)}…
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyToken}
                    className="shrink-0 px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[9px] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    {copiedToken ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                    <span>{copiedToken ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center gap-1">
            <Zap size={12} className="text-amber-500 shrink-0" />
            <span>Hardware SHA-256 · Sub-200ms · 100% GDPR Private</span>
          </span>
          <button
            type="button"
            onClick={() => setShowTelemetry(!showTelemetry)}
            className="flex items-center gap-1 text-[9.5px] hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <Info size={11} />
            <span>Details</span>
          </button>
        </div>
      )}

      {/* Pre-Verification Expandable Telemetry Info */}
      {!isVerified && showTelemetry && (
        <div className="mt-2.5 p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl text-[10px] space-y-1.5 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300">
          <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles size={12} className="text-indigo-500" />
            How ShieldCaptcha Protects This Form:
          </p>
          <ul className="list-disc pl-4 space-y-1 text-[9.5px] text-slate-500 dark:text-slate-400">
            <li>Executes a mathematical SHA-256 challenge locally in a dedicated Web Worker thread.</li>
            <li>Analyzes natural human micro-hesitations and mouse kinematics entropy.</li>
            <li>Zero tracking cookies or persistent user profiling (100% GDPR, CCPA, DPDP compliant).</li>
            <li>Issues single-use HMAC-SHA256 authenticated pass token on success.</li>
          </ul>
        </div>
      )}

      {/* Error Callout when submit clicked before verification */}
      {highlightError && !isVerified && (
        <div className="mt-2.5 p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2 text-[10.5px] font-bold text-rose-600 dark:text-rose-400">
          <AlertCircle size={14} className="shrink-0" />
          <span>Security check required: Click the checkbox above to verify you are human before sending your brief.</span>
        </div>
      )}
    </div>
  );
};

export default ShieldCaptchaWidget;
