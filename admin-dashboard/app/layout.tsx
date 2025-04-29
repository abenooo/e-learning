import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Advanced Technical Service Provider',
  description: 'A modern dashboard for managing technical courses, classes, and training sessions',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
