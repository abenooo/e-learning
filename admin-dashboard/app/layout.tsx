import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider } from "@/components/ui/toast" // ✅ import ToastProvider

export const metadata: Metadata = {
  title: "Advanced Technical Service Provider",
  description: "A modern dashboard for managing technical courses, classes, and training sessions",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <ToastProvider> {/* ✅ Wrap app inside ToastProvider */}
          {children}
          <Toaster /> {/* this renders individual toasts */}
        </ToastProvider>
      </body>
    </html>
  )
}
