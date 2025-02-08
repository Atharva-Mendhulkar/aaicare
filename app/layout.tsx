import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AashaChatbot from './components/AashaChatbot'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AaiCare - Maternal Healthcare Platform',
  description: 'Empowering maternal health with AI-driven risk analysis and comprehensive healthcare resources',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
          {children}
          <AashaChatbot />
        </main>
      </body>
    </html>
  )
}
