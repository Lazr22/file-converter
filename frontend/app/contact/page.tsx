import type { Metadata } from 'next';
import { Mail } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 sm:py-20 px-6">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-4">Contact</h1>
      <p className="text-lg text-foreground/60 leading-relaxed mb-10">
        Found a bug, have a converter you&apos;d like to see, or a question about how {siteConfig.name} handles
        your files? We&apos;d like to hear from you.
      </p>

      <a
        href={`mailto:${siteConfig.contactEmail}`}
        className="inline-flex items-center gap-3 bg-surface border border-border-soft rounded-2xl px-6 py-5 hover:-translate-y-0.5 transition-transform"
      >
        <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#6366F118' }}>
          <Mail className="h-5 w-5" style={{ color: '#6366F1' }} />
        </span>
        <span>
          <span className="block text-xs text-foreground/45 mb-0.5">Email us</span>
          <span className="block font-semibold text-foreground">{siteConfig.contactEmail}</span>
        </span>
      </a>
    </main>
  );
}
