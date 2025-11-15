import type { Metadata } from 'next'
import { Orbitron, Roboto_Mono } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: '--font-orbitron',
  weight: ['400', '500', '700', '900']
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: '--font-roboto-mono',
  weight: ['300', '400', '500', '700']
});

export const metadata: Metadata = {
  title: 'B-HUD | Bhavik Ramina - AI Engineer',
  description: 'Bhavik Holographic User Dashboard - Portfolio of Bhavik Ramina, Generative AI Engineer, ML specialist, and system architect.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${orbitron.variable} ${robotoMono.variable} font-sans antialiased bg-background`}>
        {children}
      </body>
    </html>
  )
}
