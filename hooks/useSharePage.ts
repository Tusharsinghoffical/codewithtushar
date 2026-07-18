import { useState, useEffect, useRef, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export type ShareStatus = 'idle' | 'copied' | 'shared' | 'error';

export interface UseSharePageReturn {
  sharePage: () => Promise<void>;
  status: ShareStatus;
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
 * Builds the ShareData object from the current page context.
 * Reads window.location.href for the URL and document.title for the title,
 * falling back to "Code with Mr. Singh" if the title is empty.
 */
export function buildShareData(): ShareData {
  const url = window.location.href;
  const rawTitle = typeof document !== 'undefined' ? document.title : '';
  const title = rawTitle.trim() !== '' ? rawTitle : 'Code with Mr. Singh';
  const text = 'Check out this page on Code with Mr. Singh!';
  return { title, text, url };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useSharePage — encapsulates all share logic for the current page.
 *
 * Returns:
 *   sharePage  — async function that triggers the share flow
 *   status     — current ShareStatus ('idle' | 'copied' | 'shared' | 'error')
 *   isSupported — true iff navigator.share is a function
 */
export function useSharePage(): UseSharePageReturn {
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

  const sharePage = useCallback(async (): Promise<void> => {
    // Idle-guard: prevent double-trigger while a share is already in progress
    if (status !== 'idle') return;

    const shareData = buildShareData();

    try {
      if (isWebShareSupported()) {
        // Primary path: native OS share dialog
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
      // All methods failed
      setStatus('error');
    }

    // Auto-reset to idle after 2000ms; store the timer ref for cleanup
    timerRef.current = setTimeout(() => {
      setStatus('idle');
      timerRef.current = null;
    }, 2000);
  }, [status]);

  return {
    sharePage,
    status,
    isSupported: isWebShareSupported(),
  };
}
