import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Bianca Shiromoto',
  description: 'Portfolio website for Bianca Shiromoto',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
