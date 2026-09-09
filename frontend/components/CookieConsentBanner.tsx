"use client";
import Link from 'next/link';
import { useConsent } from './ConsentProvider';

export default function CookieConsentBanner() {
  const { consent, hydrated, setConsent } = useConsent();

  if (!hydrated || consent !== null) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 sm:p-5">
      <div className="max-w-3xl mx-auto bg-white border border-border-soft rounded-2xl shadow-[0_12px_40px_-8px_rgba(15,15,40,0.25)] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-foreground/70 leading-relaxed flex-1">
          We use cookies for basic analytics and to show ads that keep ConvertHub free.
          You can accept or reject non-essential cookies. See our{' '}
          <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link> for details.
        </p>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setConsent('rejected')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold border border-border-soft text-foreground/70 hover:bg-black/[0.03] transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => setConsent('accepted')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold text-white gradient-bg transition-transform hover:-translate-y-0.5"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
