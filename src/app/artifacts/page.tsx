"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Grid, 
  List, 
  Download, 
  Share2, 
  Trash2, 
  Eye,
  Calendar,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for generated posts
const mockArtifacts = [
  {
    id: "1",
    name: "Korean Brand Rankings Q4 2024",
    template: "ranking-table",
    createdAt: new Date("2024-01-15"),
    size: "2.4 MB",
    dimensions: "1080x1080",
    thumbnail: "/api/placeholder/logo",
    tags: ["ranking", "brands", "korean"],
  },
  {
    id: "2",
    name: "Personal Stats 2024",
    template: "data-viz",
    createdAt: new Date("2024-01-14"),
    size: "1.8 MB",
    dimensions: "1080x1080",
    thumbnail: "/api/placeholder/viral",
    tags: ["personal", "statistics", "charts"],
  },
  {
    id: "3",
    name: "Inspirational Quote #42",
    template: "quote-card",
    createdAt: new Date("2024-01-13"),
    size: "0.8 MB",
    dimensions: "1080x1080",
    thumbnail: "/api/placeholder/meme",
    tags: ["quote", "inspiration", "minimal"],
  },
]

export default function ArtifactsPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [selectedArtifacts, setSelectedArtifacts] = useState<string[]>([])

  const toggleSelect = (id: string) => {
    setSelectedArtifacts(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Artifacts</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share Selected
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Your generated posts and exports
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {mockArtifacts.length} items
          </Badge>
          {selectedArtifacts.length > 0 && (
            <Badge variant="default">
              {selectedArtifacts.length} selected
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => setView("grid")}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {mockArtifacts.map((artifact) => (
            <Card
              key={artifact.id}
              className={cn(
                "group cursor-pointer transition-all hover:shadow-lg",
                selectedArtifacts.includes(artifact.id) && "ring-2 ring-primary"
              )}
              onClick={() => toggleSelect(artifact.id)}
            >
              <div className="aspect-square relative overflow-hidden rounded-t-lg bg-muted">
                <img
                  src={artifact.thumbnail}
                  alt={artifact.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button size="sm" variant="secondary">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold truncate mb-2">{artifact.name}</h3>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span>{artifact.dimensions}</span>
                  <span>{artifact.size}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {artifact.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {artifact.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{artifact.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockArtifacts.map((artifact) => (
                <div
                  key={artifact.id}
                  className={cn(
                    "flex items-center gap-4 p-4 hover:bg-accent/50 transition-colors cursor-pointer",
                    selectedArtifacts.includes(artifact.id) && "bg-accent"
                  )}
                  onClick={() => toggleSelect(artifact.id)}
                >
                  <div className="w-16 h-16 rounded bg-muted overflow-hidden flex-shrink-0">
                    <img
                      src={artifact.thumbnail}
                      alt={artifact.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{artifact.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {artifact.createdAt.toLocaleDateString()}
                      </span>
                      <span>{artifact.dimensions}</span>
                      <span>{artifact.size}</span>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {artifact.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}