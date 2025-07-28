"use client"

import { useTemplateStore } from "@/stores/template-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ColorPicker } from "@/components/ui/color-picker"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function TemplateSettings() {
  const { currentTemplate, updateTemplateParams, updateCanvas } = useTemplateStore()

  if (!currentTemplate) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Select a template to customize its settings
      </div>
    )
  }

  // Dynamic settings based on template type
  const renderTemplateSpecificSettings = () => {
    switch (currentTemplate.name) {
      case "ranking-table":
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Table Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-rank">Show Rank Numbers</Label>
                  <Switch
                    id="show-rank"
                    checked={currentTemplate.params.showRankNumbers}
                    onCheckedChange={(checked) =>
                      updateTemplateParams({ showRankNumbers: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-logos">Show Logos</Label>
                  <Switch
                    id="show-logos"
                    checked={currentTemplate.params.showLogos}
                    onCheckedChange={(checked) =>
                      updateTemplateParams({ showLogos: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="alternate-rows">Alternate Row Colors</Label>
                  <Switch
                    id="alternate-rows"
                    checked={currentTemplate.params.rowStyle.alternateRowColor}
                    onCheckedChange={(checked) =>
                      updateTemplateParams({
                        rowStyle: {
                          ...currentTemplate.params.rowStyle,
                          alternateRowColor: checked,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )

      case "9gag":
      case "pubity":
        return (
          <>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Title Position</Label>
                  <Select
                    value={currentTemplate.params.title.position}
                    onValueChange={(value) =>
                      updateTemplateParams({
                        title: {
                          ...currentTemplate.params.title,
                          position: value,
                        },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top">Top</SelectItem>
                      <SelectItem value="bottom">Bottom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-watermark">Show Watermark</Label>
                  <Switch
                    id="show-watermark"
                    checked={currentTemplate.params.watermark.show}
                    onCheckedChange={(checked) =>
                      updateTemplateParams({
                        watermark: {
                          ...currentTemplate.params.watermark,
                          show: checked,
                        },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Template Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize your template appearance
        </p>
      </div>

      {/* Canvas settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Canvas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="canvas-width">Width</Label>
              <Input
                id="canvas-width"
                type="number"
                value={currentTemplate.canvas.width}
                onChange={(e) =>
                  updateCanvas({ width: parseInt(e.target.value) || 1080 })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="canvas-height">Height</Label>
              <Input
                id="canvas-height"
                type="number"
                value={currentTemplate.canvas.height}
                onChange={(e) =>
                  updateCanvas({ height: parseInt(e.target.value) || 1080 })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Title settings */}
      {currentTemplate.params.title && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Title</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title-text">Text</Label>
              <Input
                id="title-text"
                value={currentTemplate.params.title.text}
                onChange={(e) =>
                  updateTemplateParams({
                    title: {
                      ...currentTemplate.params.title,
                      text: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title-size">Font Size</Label>
              <Slider
                id="title-size"
                min={12}
                max={72}
                step={1}
                value={[currentTemplate.params.title.fontSize]}
                onValueChange={([value]) =>
                  updateTemplateParams({
                    title: {
                      ...currentTemplate.params.title,
                      fontSize: value,
                    },
                  })
                }
              />
              <span className="text-xs text-muted-foreground">
                {currentTemplate.params.title.fontSize}px
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Template specific settings */}
      {renderTemplateSpecificSettings()}
    </div>
  )
}