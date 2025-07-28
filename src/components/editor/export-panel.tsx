"use client"

import { useState } from "react"
import { Download, Share2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useTemplateStore } from "@/stores/template-store"
import { toast } from "sonner"

export function ExportPanel() {
  const { currentTemplate, isGenerating, setGenerating, setGeneratedImageUrl } = useTemplateStore()
  const [exportFormat, setExportFormat] = useState("png")
  const [exportSize, setExportSize] = useState("1x")
  const [copied, setCopied] = useState(false)

  const handleExport = async () => {
    if (!currentTemplate || isGenerating) return

    try {
      setGenerating(true)
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
      
      // Download the image
      const a = document.createElement("a")
      a.href = url
      a.download = `${currentTemplate.name}-${Date.now()}.${exportFormat}`
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
    } finally {
      setGenerating(false)
    }
  }

  const handleCopyJSON = async () => {
    if (!currentTemplate) return

    try {
      await navigator.clipboard.writeText(JSON.stringify(currentTemplate, null, 2))
      setCopied(true)
      toast.success("Template JSON copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("Failed to copy JSON")
    }
  }

  const getShareableURL = () => {
    if (!currentTemplate) return ""
    
    const params = new URLSearchParams({
      template: JSON.stringify(currentTemplate),
    })
    
    return `${window.location.origin}/api/v1/images?${params.toString()}`
  }

  if (!currentTemplate) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Select a template to export
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Export Options</h3>
        <p className="text-sm text-muted-foreground">
          Download or share your creation
        </p>
      </div>

      {/* Export settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Export Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Format</Label>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="png" id="png" />
                <Label htmlFor="png">PNG (Recommended)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="jpg" id="jpg" />
                <Label htmlFor="jpg">JPG</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="webp" id="webp" />
                <Label htmlFor="webp">WebP</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Size</Label>
            <Select value={exportSize} onValueChange={setExportSize}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1x">1x ({currentTemplate.canvas.width} × {currentTemplate.canvas.height})</SelectItem>
                <SelectItem value="2x">2x ({currentTemplate.canvas.width * 2} × {currentTemplate.canvas.height * 2})</SelectItem>
                <SelectItem value="0.5x">0.5x ({Math.round(currentTemplate.canvas.width * 0.5)} × {Math.round(currentTemplate.canvas.height * 0.5)})</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full" onClick={handleExport} disabled={isGenerating}>
            <Download className="mr-2 h-4 w-4" />
            {isGenerating ? "Generating..." : "Download Image"}
          </Button>
        </CardContent>
      </Card>

      {/* Share options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Share</CardTitle>
          <CardDescription>Share your template with others</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Template JSON</Label>
            <Textarea
              value={JSON.stringify(currentTemplate, null, 2)}
              readOnly
              className="font-mono text-xs"
              rows={6}
            />
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleCopyJSON}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy JSON
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <Label>API Endpoint</Label>
            <code className="block rounded bg-muted p-2 text-xs">
              POST /api/v1/images
            </code>
            <p className="text-xs text-muted-foreground">
              Send the JSON above to this endpoint to generate images programmatically
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}