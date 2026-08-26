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
 * Returns true if and only if navigator.share is a function.
 * No side effects.
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

/**
 * Builds the ShareData object, merging page context with caller overrides.
 * Priority: callOverrides > hookOverrides > page defaults.
 *
 * - url   : override → window.location.href
 * - title : override → document.title → 'Code with Mr. Singh'
 * - text  : override → auto-generated from title (meaningful, not generic)
 */
export function buildShareData(overrides?: ShareOverrides): ShareData {
  const url = overrides?.url ?? (typeof window !== 'undefined' ? window.location.href : '');

  const rawTitle = typeof document !== 'undefined' ? document.title : '';
  const title = overrides?.title ?? (rawTitle.trim() !== '' ? rawTitle : 'Code with Mr. Singh');

  // Rich default text: uses the page title so WhatsApp/iMessage previews are meaningful
  const text = overrides?.text ?? `${title} — Check it out on Code with Mr. Singh!`;

  return { title, text, url };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useSharePage — encapsulates all share logic for the current page.
 *
 * Accepts optional hook-level overrides (applied to every call from this instance).
 * The returned sharePage() also accepts per-call overrides that win over hook-level.
 *
 * Returns:
 *   sharePage   — async function; accepts optional ShareOverrides per call
 *   status      — 'idle' | 'copied' | 'shared' | 'error'
 *   isSupported — true iff navigator.share is available
 */
export function useSharePage(hookOverrides?: ShareOverrides): UseSharePageReturn {
  const [status, setStatus] = useState<ShareStatus>('idle');
  // Ref to track the pending auto-reset timer so we can cancel it on unmount
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancel any pending timer when the component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const sharePage = useCallback(async (callOverrides?: ShareOverrides): Promise<void> => {
    // Idle-guard: prevent double-trigger while a share is already in progress
    if (status !== 'idle') return;

    // Merge: call-level overrides win over hook-level overrides
    const merged: ShareOverrides = { ...hookOverrides, ...callOverrides };
    const shareData = buildShareData(merged);

    try {
      if (isWebShareSupported()) {
        // Primary path: native OS share sheet (title + text + url)
        await navigator.share(shareData);
        setStatus('shared');
      } else {
        // Fallback path: copy URL to clipboard
        await navigator.clipboard.writeText(shareData.url);
        setStatus('copied');
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // User cancelled the native share dialog — not an error, stay idle
        return;
      }
      setStatus('error');
    }

    // Auto-reset to idle after 2 s; store the ref for cleanup
    timerRef.current = setTimeout(() => {
      setStatus('idle');
      timerRef.current = null;
    }, 2000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return {
    sharePage,
    status,
    isSupported: isWebShareSupported(),
  };
}
