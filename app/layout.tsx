import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import MobileNav from "@/components/mobile-nav"
import SkipToContent from "@/components/skip-to-content"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
  keywords: ["cycling", "Bristol", "bike routes", "parks", "green spaces", "cycling community"],
  authors: [{ name: "Bristol Bike Buddy Team" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff' },
    { media: '(prefers-color-scheme: dark)', color: '#000' }
  ],
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <SkipToContent />
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
          <MobileNav />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'