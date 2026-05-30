import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'the_arijit_187 | Frontend Developer & UI/UX Designer',
  description: 'Premium portfolio of the_arijit_187 - Crafting exceptional digital experiences through innovative frontend development and stunning UI/UX design.',
  keywords: ['frontend developer', 'UI/UX designer', 'React', 'Next.js', 'portfolio', 'web developer'],
  authors: [{ name: 'the_arijit_187' }],
  creator: 'the_arijit_187',
  openGraph: {
    title: 'the_arijit_187 | Frontend Developer & UI/UX Designer',
    description: 'Crafting exceptional digital experiences through innovative frontend development and stunning UI/UX design.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'the_arijit_187 | Frontend Developer & UI/UX Designer',
    description: 'Crafting exceptional digital experiences through innovative frontend development and stunning UI/UX design.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a12',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
