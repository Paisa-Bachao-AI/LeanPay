import type { Metadata } from 'next'
import { Geist, Geist_Mono, EB_Garamond, DM_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
const ebGaramond = EB_Garamond({ subsets: ["latin"], variable: "--font-display" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono-data" });

export const metadata: Metadata = {
  title: 'CleanPayout',
  description: 'Invoice processing and payment management',
  generator: 'v0.app',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ "--font-display": ebGaramond.style.fontFamily, "--font-mono-data": dmMono.style.fontFamily } as React.CSSProperties}>
      <body className={`${geist.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
