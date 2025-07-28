"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useTemplateStore, useUIStore } from "@/stores/template-store"
import { TemplateRenderer } from "@/components/templates"

export function TemplatePreview() {
  const { currentTemplate } = useTemplateStore()
  const { previewMode, zoom, showGrid } = useUIStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  // Update container size on resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        })
      }
    }

    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  // Calculate scale to fit container
  const getScale = () => {
    if (!currentTemplate || !containerSize.width || !containerSize.height) return 1

    const { width: canvasWidth, height: canvasHeight } = currentTemplate.canvas
    const padding = 80 // Padding around the preview

    // Calculate scale based on preview mode
    let targetWidth: number
    let targetHeight: number

    switch (previewMode) {
      case "mobile":
        targetWidth = 375
        targetHeight = (375 / canvasWidth) * canvasHeight
        break
      case "desktop":
        targetWidth = 600
        targetHeight = (600 / canvasWidth) * canvasHeight
        break
      case "fullscreen":
        targetWidth = canvasWidth
        targetHeight = canvasHeight
        break
      default:
        targetWidth = canvasWidth
        targetHeight = canvasHeight
    }

    // Calculate scale to fit within container
    const scaleX = (containerSize.width - padding) / targetWidth
    const scaleY = (containerSize.height - padding) / targetHeight
    const scale = Math.min(scaleX, scaleY, 1) // Don't scale up beyond 100%

    return scale
  }

  const scale = getScale()

  if (!currentTemplate) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold">No template selected</h3>
          <p className="text-sm text-muted-foreground">
            Select a template from the sidebar to get started
          </p>
        </div>
      </div>
    )
  }

  // Calculate display dimensions
  const displayScale = scale * zoom
  const displayWidth = currentTemplate.canvas.width * displayScale
  const displayHeight = currentTemplate.canvas.height * displayScale

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-auto bg-muted/30"
      style={{
        backgroundImage: showGrid
          ? "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)"
          : undefined,
        backgroundSize: showGrid ? "20px 20px" : undefined,
      }}
    >
      <div className="flex min-h-full items-center justify-center p-10">
        <div
          className={cn(
            "relative bg-white transition-all duration-300",
            previewMode === "mobile" && "shadow-2xl rounded-[2rem] ring-8 ring-gray-900"
          )}
          style={{
            width: displayWidth,
            height: displayHeight,
          }}
        >
          {/* Container for proper scaling */}
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${displayScale})`,
              transformOrigin: "top left",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          >
            {/* Original size template render */}
            <div
              style={{
                width: currentTemplate.canvas.width,
                height: currentTemplate.canvas.height,
                transform: `scale(${1 / displayScale})`,
                transformOrigin: "top left",
              }}
            >
              <TemplateRenderer template={currentTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}