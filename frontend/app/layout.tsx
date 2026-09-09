import './globals.css'
import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { ConsentProvider } from '@/components/ConsentProvider'
import CookieConsentBanner from '@/components/CookieConsentBanner'
import AdSenseLoader from '@/components/AdSenseLoader'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', weight: ['600', '700', '800'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Convert files in seconds`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['file converter', 'pdf to word', 'word to pdf', 'image to pdf', 'pdf to image', 'csv to pdf', 'excel to pdf', 'merge pdf', 'split pdf'],
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Convert files in seconds`,
    description: siteConfig.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — Convert files in seconds`,
    description: siteConfig.description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} font-sans bg-background text-foreground min-h-screen flex flex-col antialiased`}>
        <ConsentProvider>
          <header className="sticky top-0 z-50 border-b border-border-soft bg-white/70 backdrop-blur-md">
            <nav className="max-w-6xl mx-auto py-4 px-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8L6 4M2 8L6 12M2 8H14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-display font-bold text-lg tracking-tight text-foreground">{siteConfig.name}</span>
              </Link>
              <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-foreground/60">
                <Link href="/#documents" className="hover:text-foreground transition-colors">Documents</Link>
                <Link href="/#images" className="hover:text-foreground transition-colors">Images</Link>
                <Link href="/#data" className="hover:text-foreground transition-colors">Data</Link>
                <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              </div>
            </nav>
          </header>

          <div className="flex-1">{children}</div>

          <footer className="border-t border-border-soft mt-24">
            <div className="max-w-6xl mx-auto py-10 px-6 flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-foreground/50">
                <p>© {new Date().getFullYear()} {siteConfig.name}. Files are deleted automatically after conversion.</p>
                <div className="flex items-center gap-5 font-medium">
                  <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
                  <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
                  <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
                </div>
              </div>
            </div>
          </footer>

          <CookieConsentBanner />
          <AdSenseLoader />
        </ConsentProvider>
      </body>
    </html>
  )
}
