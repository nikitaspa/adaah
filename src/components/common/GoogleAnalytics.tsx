import React, { useEffect, useRef } from 'react';
import { SEO_CONFIG } from '../../config/seo';

export interface GoogleAnalyticsProps {
  measurementId?: string;
  currentPath?: string;
}

export function GoogleAnalytics({ measurementId, currentPath }: GoogleAnalyticsProps) {
  const gaId = measurementId || (typeof process !== 'undefined' && (process.env as any)?.NEXT_PUBLIC_GA_ID) || (import.meta as any).env?.VITE_GA_ID || SEO_CONFIG.googleAnalyticsId || 'G-N6HWPBLGXY';
  const isInitializedRef = useRef(false);
  const lastTrackedPathRef = useRef<string | null>(null);

  // 1. Initial script load (interaction-based or idle fallback for passive visitors)
  useEffect(() => {
    if (!gaId) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const loadAnalytics = () => {
      if (isInitializedRef.current || document.getElementById('ga-gtag-script')) return;
      isInitializedRef.current = true;

      window.dataLayer = window.dataLayer || [];
      if (!(window as any).gtag) {
        (window as any).gtag = function (...args: any[]) {
          window.dataLayer.push(args);
        };
      }
      (window as any).gtag('js', new Date());

      const initialPath = currentPath || window.location.pathname;
      lastTrackedPathRef.current = initialPath;

      (window as any).gtag('config', gaId, {
        page_path: initialPath,
        page_location: window.location.href,
        page_title: document.title,
        send_page_view: true,
      });

      const script = document.createElement('script');
      script.id = 'ga-gtag-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);
    };

    // Passive visitors who do not interact are measured via requestIdleCallback / setTimeout
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadAnalytics, { timeout: 5000 });
    } else {
      timeoutId = setTimeout(loadAnalytics, 5000);
    }

    // Active visitors who touch, scroll, or click trigger it immediately
    const handleInteraction = () => {
      loadAnalytics();
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });
    window.addEventListener('click', handleInteraction, { passive: true, once: true });
    window.addEventListener('keydown', handleInteraction, { passive: true, once: true });

    return () => {
      clearTimeout(timeoutId);
      cleanupListeners();
    };
  }, [gaId]);

  // 2. Track subsequent SPA route navigations (no duplicates on initial load)
  useEffect(() => {
    if (!currentPath || !gaId) return;

    // Skip if this is the very first path already tracked by the initial config
    if (lastTrackedPathRef.current === currentPath) return;

    // If analytics is already loaded, fire page_view event for the new route
    if (isInitializedRef.current && (window as any).gtag) {
      lastTrackedPathRef.current = currentPath;
      (window as any).gtag('event', 'page_view', {
        page_path: currentPath,
        page_location: window.location.origin + currentPath,
        page_title: document.title,
      });
    }
  }, [currentPath, gaId]);

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}
