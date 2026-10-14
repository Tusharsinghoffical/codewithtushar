import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShareStatus = 'idle' | 'copied' | 'shared' | 'error';

/** Optional overrides for title, body text, and URL sent to the share sheet. */
export interface ShareOverrides {
  /** Override the share title (defaults to document.title) */
  title?: string;
  /** Override the share body text (defaults to a page-aware tagline) */
  text?: string;
  /** Override the URL to share (defaults to window.location.href) */
  url?: string;
}

export interface UseSharePageReturn {
  /** Trigger the share flow. Accepts optional per-call overrides. */
  sharePage: (callOverrides?: ShareOverrides) => Promise<void>;
  status: ShareStatus;
  /** true when navigator.share is available (mobile / modern desktop) */
  isSupported: boolean;
}

interface ShareData {
  title: string;
  text: string;
  url: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns true if navigator.share is available and can be invoked.
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * Robust clipboard copy fallback for all browsers/devices.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined') return false;

  // 1. Try modern Async Clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      // Continue to fallback
    }
  }

  // 2. Fallback to textarea + execCommand('copy')
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}

/**
 * Builds the ShareData object, merging page context with caller overrides.
 */
export function buildShareData(overrides?: ShareOverrides): ShareData {
  const url = overrides?.url ?? (typeof window !== 'undefined' ? window.location.href : '');
  const rawTitle = typeof document !== 'undefined' ? document.title : '';
  const title = overrides?.title ?? (rawTitle.trim() !== '' ? rawTitle : 'Code with Tushar');
  const text = overrides?.text ?? `${title} — Check it out on Code with Tushar!`;

  return { title, text, url };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSharePage(hookOverrides?: ShareOverrides): UseSharePageReturn {
  const [status, setStatus] = useState<ShareStatus>('idle');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const sharePage = useCallback(async (callOverrides?: ShareOverrides): Promise<void> => {
    if (status !== 'idle') return;

    const merged: ShareOverrides = { ...hookOverrides, ...callOverrides };
    const shareData = buildShareData(merged);

    let finalStatus: ShareStatus = 'idle';

    if (isWebShareSupported()) {
      try {
        await navigator.share(shareData);
        finalStatus = 'shared';
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          // User closed the native share dialog — stay idle
          return;
        }
        // If native share failed (e.g. desktop constraint), fallback to clipboard
        const copied = await copyToClipboard(shareData.url);
        finalStatus = copied ? 'copied' : 'error';
      }
    } else {
      // Web Share not supported: direct copy to clipboard
      const copied = await copyToClipboard(shareData.url);
      finalStatus = copied ? 'copied' : 'error';
    }

    setStatus(finalStatus);

    // Auto-reset to idle after 2.5s
    timerRef.current = setTimeout(() => {
      setStatus('idle');
      timerRef.current = null;
    }, 2500);
  }, [status, hookOverrides]);

  return {
    sharePage,
    status,
    isSupported: isWebShareSupported(),
  };
}
