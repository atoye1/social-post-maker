"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { templateCategories, templateMetadata } from "@/lib/templates"
import { useTemplateStore } from "@/stores/template-store"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TemplateList() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["tables"])
  const { selectedTemplateId, setTemplate } = useTemplateStore()

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-semibold">Templates</h3>
        <p className="text-xs text-muted-foreground">
          Choose a template
        </p>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="space-y-2 pr-3">
          {templateCategories.map((category) => (
            <div key={category.id} className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start p-2 h-auto font-medium"
                onClick={() => toggleCategory(category.id)}
              >
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="h-4 w-4 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-2" />
                )}
                <span className="text-sm">{category.name}</span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {category.templates.length}
                </Badge>
              </Button>

              {expandedCategories.includes(category.id) && (
                <div className="ml-6 space-y-1">
                  {category.templates.map((templateId) => {
                    const metadata = templateMetadata[templateId as keyof typeof templateMetadata]
                    if (!metadata) return null

                    const isSelected = selectedTemplateId === templateId

                    return (
                      <Button
                        key={templateId}
                        variant={isSelected ? "secondary" : "ghost"}
                        className="w-full justify-start p-2 h-auto text-left"
                        onClick={() => setTemplate(templateId)}
                      >
                        <div className="flex items-center w-full">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium truncate">
                                {metadata.name}
                              </span>
                              {isSelected && (
                                <Check className="h-3 w-3 text-primary flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {metadata.description}
                            </p>
                          </div>
                        </div>
                      </Button>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}