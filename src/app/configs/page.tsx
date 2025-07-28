"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code, 
  Save, 
  Download, 
  Upload,
  Plus,
  Copy,
  Trash2,
  Edit,
  Check
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { templateDefaults, templateMetadata } from "@/lib/templates"

export default function ConfigsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("ranking-table")
  const [configJson, setConfigJson] = useState(
    JSON.stringify(templateDefaults[selectedTemplate as keyof typeof templateDefaults], null, 2)
  )
  const [savedConfigs, setSavedConfigs] = useState([
    { id: "1", name: "Brand Rankings Config", template: "ranking-table", createdAt: new Date() },
    { id: "2", name: "Personal Stats Config", template: "data-viz", createdAt: new Date() },
    { id: "3", name: "Viral Post Config", template: "9gag", createdAt: new Date() },
  ])

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template)
    setConfigJson(
      JSON.stringify(templateDefaults[template as keyof typeof templateDefaults], null, 2)
    )
  }

  const handleSaveConfig = () => {
    // In a real app, this would save to a database
    const newConfig = {
      id: Date.now().toString(),
      name: `${selectedTemplate} Config`,
      template: selectedTemplate,
      createdAt: new Date(),
    }
    setSavedConfigs([...savedConfigs, newConfig])
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Template Configurations</h1>
        <p className="text-muted-foreground">
          Manage and customize template configurations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Config Editor */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Editor</CardTitle>
              <CardDescription>
                Edit template configurations in JSON format
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Template Selector */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Template
                  </label>
                  <Tabs value={selectedTemplate} onValueChange={handleTemplateChange}>
                    <TabsList className="grid grid-cols-3 w-full">
                      {Object.keys(templateDefaults).slice(0, 3).map((key) => (
                        <TabsTrigger key={key} value={key} className="text-xs">
                          {templateMetadata[key as keyof typeof templateMetadata]?.name || key}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                {/* JSON Editor */}
                <div className="relative">
                  <Textarea
                    value={configJson}
                    onChange={(e) => setConfigJson(e.target.value)}
                    className="font-mono text-sm min-h-[400px] resize-none"
                    placeholder="Enter JSON configuration..."
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => {
                        navigator.clipboard.writeText(configJson)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={() => {
                        try {
                          const formatted = JSON.stringify(JSON.parse(configJson), null, 2)
                          setConfigJson(formatted)
                        } catch (e) {
                          // Invalid JSON
                        }
                      }}
                    >
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button onClick={handleSaveConfig}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation */}
          <Card>
            <CardHeader>
              <CardTitle>Validation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                {(() => {
                  try {
                    JSON.parse(configJson)
                    return (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">Valid JSON</span>
                      </>
                    )
                  } catch (e) {
                    return (
                      <>
                        <span className="text-sm text-destructive">Invalid JSON: {(e as Error).message}</span>
                      </>
                    )
                  }
                })()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Configs */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Configurations</CardTitle>
              <CardDescription>
                Your saved template configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedConfigs.map((config) => (
                  <div
                    key={config.id}
                    className="p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{config.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {config.template}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {config.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Template Info */}
          <Card>
            <CardHeader>
              <CardTitle>Template Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Template:</span>{" "}
                  {templateMetadata[selectedTemplate as keyof typeof templateMetadata]?.name}
                </div>
                <div>
                  <span className="font-medium">Category:</span>{" "}
                  {templateMetadata[selectedTemplate as keyof typeof templateMetadata]?.category}
                </div>
                <div>
                  <span className="font-medium">Description:</span>{" "}
                  {templateMetadata[selectedTemplate as keyof typeof templateMetadata]?.description}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}