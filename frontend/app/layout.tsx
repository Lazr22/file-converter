import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 min-h-screen`}>
        <nav className="bg-white border-b border-gray-200 py-4 px-8 flex items-center justify-between">
          <a href="/" className="text-2xl font-black text-blue-600">ConvertHub</a>
        </nav>
        {children}
      </body>
    </html>
  )
}