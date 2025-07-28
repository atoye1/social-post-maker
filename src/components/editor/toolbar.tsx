"use client"

import { 
  Smartphone, 
  Monitor, 
  Maximize, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Grid,
  Download,
  Share2 
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"
import { useUIStore, useTemplateStore } from "@/stores/template-store"
import { toast } from "sonner"

export function EditorToolbar() {
  const { previewMode, setPreviewMode, zoom, setZoom, showGrid, setShowGrid } = useUIStore()
  const { currentTemplate, resetTemplate, isGenerating } = useTemplateStore()

  const handleZoomIn = () => setZoom(zoom + 0.1)
  const handleZoomOut = () => setZoom(zoom - 0.1)
  const handleZoomReset = () => setZoom(1)

  const handleExport = async () => {
    if (!currentTemplate) {
      toast.error("No template selected")
      return
    }
    
    try {
      // Show loading state
      toast.loading("Generating image...")
      
      const response = await fetch("/api/v1/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentTemplate),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("Export error:", errorText)
        throw new Error(errorText || "Failed to generate image")
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${currentTemplate.name}-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.dismiss()
      toast.success("Image exported successfully!")
    } catch (error) {
      console.error("Export error:", error)
      toast.dismiss()
      toast.error(error instanceof Error ? error.message : "Failed to export image")
    }
  }

  return (
    <div className="flex items-center justify-between border-b bg-background px-4 py-2">
      {/* Left side - Preview modes */}
      <div className="flex items-center gap-2">
        <ToggleGroup type="single" value={previewMode} onValueChange={(value) => value && setPreviewMode(value as any)}>
          <ToggleGroupItem value="mobile" size="sm">
            <Smartphone className="h-4 w-4 mr-1" />
            Mobile
          </ToggleGroupItem>
          <ToggleGroupItem value="desktop" size="sm">
            <Monitor className="h-4 w-4 mr-1" />
            Desktop
          </ToggleGroupItem>
          <ToggleGroupItem value="fullscreen" size="sm">
            <Maximize className="h-4 w-4 mr-1" />
            Actual Size
          </ToggleGroupItem>
        </ToggleGroup>

        <Separator orientation="vertical" className="h-8" />

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={handleZoomOut} disabled={zoom <= 0.1}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="min-w-[60px] text-center text-sm text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <Button variant="ghost" size="icon" onClick={handleZoomIn} disabled={zoom >= 3}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleZoomReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8" />

        {/* Grid toggle */}
        <Button
          variant={showGrid ? "default" : "ghost"}
          size="icon"
          onClick={() => setShowGrid(!showGrid)}
        >
          <Grid className="h-4 w-4" />
        </Button>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={() => resetTemplate()}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
        <Button size="sm" onClick={handleExport} disabled={isGenerating}>
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      </div>
    </div>
  )
}