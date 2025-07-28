"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Database, 
  PenTool, 
  Package, 
  Settings, 
  FolderOpen,
  Menu,
  X 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  {
    title: "Data",
    href: "/data",
    icon: Database,
    description: "Manage data sources and datasets"
  },
  {
    title: "Editor",
    href: "/editor",
    icon: PenTool,
    description: "Create and edit posts"
  },
  {
    title: "Artifacts",
    href: "/artifacts",
    icon: Package,
    description: "Generated posts and exports"
  },
  {
    title: "Configs",
    href: "/configs",
    icon: Settings,
    description: "Template configurations"
  },
  {
    title: "Assets",
    href: "/assets",
    icon: FolderOpen,
    description: "Images, fonts, and resources"
  }
]

export function MainNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex h-16 border-b bg-background">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
                S
              </div>
              <span className="font-semibold text-lg">Social Post Maker</span>
            </Link>

            {/* Navigation Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname.startsWith(item.href)
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <Button variant="outline" size="sm">
              Export All
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        <div className="h-16 border-b bg-background px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">
              S
            </div>
            <span className="font-semibold">SPM</span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-16 z-50 bg-background border-t">
            <div className="container py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname.startsWith(item.href)
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-start gap-3 p-3 rounded-lg transition-colors",
                        "hover:bg-accent",
                        isActive && "bg-accent"
                      )}
                    >
                      <Icon className="h-5 w-5 mt-0.5" />
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}