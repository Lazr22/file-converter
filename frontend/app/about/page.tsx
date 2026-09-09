import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';
import { ShieldCheck, Zap, Ban } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: `What ${siteConfig.name} is, and why it's free and private by default.`,
  alternates: { canonical: '/about' },
};

const points = [
  {
    icon: Zap,
    title: 'Fast, no signup',
    description: 'Drop a file in, get the converted result back in seconds. No account, no email required.',
  },
  {
    icon: ShieldCheck,
    title: 'Private by default',
    description: 'Files are processed and then automatically deleted from our servers shortly after conversion.',
  },
  {
    icon: Ban,
    title: 'Free to use',
    description: 'ConvertHub is supported by ads, not subscriptions, so every tool stays free to use.',
  },
];

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 sm:py-20 px-6">
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-4">About {siteConfig.name}</h1>
      <p className="text-lg text-foreground/60 leading-relaxed mb-12">
        {siteConfig.name} is a small set of file-conversion tools built for one job: turning a file from one
        format into another, quickly, without friction. No accounts, no bloated feature sets — just upload,
        convert, download.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
        {points.map(({ icon: Icon, title, description }) => (
          <div key={title} className="bg-surface border border-border-soft rounded-2xl p-5">
            <Icon className="h-5 w-5 mb-3" style={{ color: '#6366F1' }} />
            <h3 className="font-display font-bold text-sm text-foreground mb-1">{title}</h3>
            <p className="text-sm text-foreground/55 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-6 text-foreground/75 leading-relaxed">
        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">What you can convert</h2>
          <p>
            Documents (PDF ↔ Word, merge and split PDFs), images (PDF ↔ image, PNG/JPG/WebP conversion), and
            data files (CSV and Excel to PDF) — with more converters added over time.
          </p>
        </section>
        <section>
          <h2 className="font-display font-bold text-xl text-foreground mb-2">Questions?</h2>
          <p>
            Reach out any time on the{' '}
            <Link href="/contact" className="underline hover:text-foreground">Contact page</Link>, or read how
            we handle your data in the{' '}
            <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
