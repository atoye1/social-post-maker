"use client"

import { TemplatePreview } from "@/components/editor/preview"
import { TemplateSidebar } from "@/components/editor/sidebar"
import { EditorToolbar } from "@/components/editor/toolbar"

export default function EditorPage() {
  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Sidebar */}
      <TemplateSidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <EditorToolbar />

        {/* Preview area */}
        <div className="flex-1 overflow-auto bg-muted/30">
          <TemplatePreview />
        </div>
      </div>
    </div>
  )
}