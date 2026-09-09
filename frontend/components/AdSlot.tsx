"use client";
import { useEffect, useRef } from 'react';
import { useConsent } from './ConsentProvider';
import { siteConfig } from '@/lib/site-config';

type Props = {
  /** The AdSense ad unit slot ID, e.g. "1234567890". Get this from your AdSense dashboard. */
  slot: string;
  className?: string;
  format?: string;
};

export default function AdSlot({ slot, className = '', format = 'auto' }: Props) {
  const { consent, hydrated } = useConsent();
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  const canRenderAd = hydrated && consent !== null && !!siteConfig.adsensePublisherId && !!slot;

  useEffect(() => {
    if (!canRenderAd || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // adsbygoogle script not ready yet — safe to ignore, it'll pick up on next mount.
    }
  }, [canRenderAd]);

  if (!canRenderAd) {
    // In development, show a labeled placeholder so you can see ad placement.
    if (process.env.NODE_ENV === 'development') {
      return (
        <div className={`flex items-center justify-center text-xs text-foreground/30 border border-dashed border-border-soft rounded-lg py-6 ${className}`}>
          Ad slot ({slot || 'not configured'})
        </div>
      );
    }
    return null;
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle block ${className}`}
      style={{ display: 'block' }}
      data-ad-client={siteConfig.adsensePublisherId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
