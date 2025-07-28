"use client"

import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"

interface EditorLayoutProps {
  children: React.ReactNode
}

export function EditorLayout({ children }: EditorLayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster position="bottom-right" />
    </ThemeProvider>
  )
}