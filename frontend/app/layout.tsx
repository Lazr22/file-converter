import './globals.css'
import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', weight: ['600', '700', '800'] })

export const metadata: Metadata = {
  title: 'ConvertHub — Convert files in seconds',
  description: 'Free, private file conversion. Documents, images and data — converted in your browser, deleted from our servers right after.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sora.variable} font-sans bg-background text-foreground min-h-screen flex flex-col antialiased`}>
        <header className="sticky top-0 z-50 border-b border-border-soft bg-white/70 backdrop-blur-md">
          <nav className="max-w-6xl mx-auto py-4 px-6 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8L6 4M2 8L6 12M2 8H14" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-display font-bold text-lg tracking-tight text-foreground">ConvertHub</span>
            </Link>
            <div className="hidden sm:flex items-center gap-6 text-sm font-medium text-foreground/60">
              <Link href="/#documents" className="hover:text-foreground transition-colors">Documents</Link>
              <Link href="/#images" className="hover:text-foreground transition-colors">Images</Link>
              <Link href="/#data" className="hover:text-foreground transition-colors">Data</Link>
            </div>
          </nav>
        </header>

        <div className="flex-1">{children}</div>

        <footer className="border-t border-border-soft mt-24">
          <div className="max-w-6xl mx-auto py-10 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-foreground/50">
            <p>© {new Date().getFullYear()} ConvertHub. Files are deleted automatically after conversion.</p>
            <p>Built with FastAPI + Next.js</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
