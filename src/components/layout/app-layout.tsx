"use client"

import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"
import { MainNav } from "./main-nav"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        <MainNav />
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}