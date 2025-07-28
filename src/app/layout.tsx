import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff", 
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Social Post Maker - Data-Driven Templates",
  description: "Create stunning Instagram posts with data-driven templates inspired by famous accounts",
  keywords: "instagram, posts, generator, templates, data, visualization, ranking, infographics",
  authors: [{ name: "Social Post Maker Team" }],
  openGraph: {
    title: "Social Post Maker - Data-Driven Templates",
    description: "Create stunning Instagram posts with data-driven templates",
    type: "website",
    url: "https://social-craft.netlify.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Post Maker",
    description: "Create stunning Instagram posts with data-driven templates",
  },
}

import { AppLayout } from "@/components/layout/app-layout"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}