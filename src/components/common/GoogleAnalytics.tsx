import React, { useEffect } from 'react';

export interface GoogleAnalyticsProps {
  measurementId?: string;
}

export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const gaId = measurementId || process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    if (!gaId) return;

    // Load gtag script asynchronously
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', gaId, { page_path: window.location.pathname });

    return () => {
      // cleanup script if needed
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [gaId]);

  return null;
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
  }
}
