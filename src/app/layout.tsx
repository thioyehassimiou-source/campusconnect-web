import type { Metadata } from 'next'
import { Inter, Manrope } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

import type { Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#6366f1',
}

export const metadata: Metadata = {
  title: 'Portail Numérique - Université de Labé',
  description: 'Espace numérique de travail de l Université de Labé (Guinée).',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CampusConnect',
  },
  icons: {
    apple: '/icons/icon-192x192.png',
  },
}

import { ToastProvider } from '@/components/ui/Toast'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { UserProvider } from '@/providers/UserProvider'
import { SWRProvider } from '@/providers/SWRProvider'
import { OfflineBanner } from '@/components/ui/OfflineBanner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable} h-full antialiased`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <ThemeProvider>
          <OfflineBanner />
          <SWRProvider>
            <UserProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </UserProvider>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
