"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Palette, Settings, FileImage } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TemplateList } from "@/components/editor/template-list"
import { TemplateSettings } from "@/components/editor/template-settings"
import { ExportPanel } from "@/components/editor/export-panel"
import { useUIStore } from "@/stores/template-store"

export function TemplateSidebar() {
  const { sidebarOpen, setSidebarOpen, selectedTab, setSelectedTab } = useUIStore()

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r bg-background transition-all duration-300",
        sidebarOpen ? "w-80" : "w-16"
      )}
    >
      {/* Collapse button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-10 h-8 w-8 rounded-full border bg-background"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>

      {sidebarOpen ? (
        <div className="flex h-full flex-col">
          {/* Logo/Title */}
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Editor</h2>
          </div>

          {/* Tabs */}
          <Tabs
            value={selectedTab}
            onValueChange={(value) => setSelectedTab(value as any)}
            className="flex-1 overflow-hidden"
          >
            <TabsList className="grid w-full grid-cols-3 p-1 mx-4 mt-4">
              <TabsTrigger value="templates" className="text-xs">
                <Palette className="h-3 w-3 mr-1" />
                Templates
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="export" className="text-xs">
                <FileImage className="h-3 w-3 mr-1" />
                Export
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="templates" className="h-full m-0 p-4">
                <TemplateList />
              </TabsContent>
              <TabsContent value="settings" className="h-full m-0 p-4">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <TemplateSettings />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="export" className="h-full m-0 p-4">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <ExportPanel />
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      ) : (
        <div className="flex h-full flex-col items-center gap-4 py-6">
          <Palette className="h-6 w-6 text-muted-foreground" />
          <Settings className="h-6 w-6 text-muted-foreground" />
          <FileImage className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
    </aside>
  )
}