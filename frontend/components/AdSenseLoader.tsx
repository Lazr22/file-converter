"use client";
import Script from 'next/script';
import { useConsent } from './ConsentProvider';
import { siteConfig } from '@/lib/site-config';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSenseLoader() {
  const { consent, hydrated } = useConsent();

  // Don't load anything until: (1) we know the consent choice, and
  // (2) a real AdSense publisher ID has been configured.
  if (!hydrated || consent === null || !siteConfig.adsensePublisherId) return null;

  return (
    <Script
      id="adsbygoogle-loader"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsensePublisherId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
      onLoad={() => {
        window.adsbygoogle = window.adsbygoogle || [];
        if (consent === 'rejected') {
          // Ask Google to serve non-personalized ads only.
          // https://support.google.com/adsense/answer/9007336
          (window.adsbygoogle as unknown as { requestNonPersonalizedAds?: number }).requestNonPersonalizedAds = 1;
        }
      }}
    />
  );
}
