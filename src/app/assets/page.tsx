"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Upload, 
  Image, 
  FileText, 
  Palette,
  Search,
  Download,
  Trash2,
  Eye,
  Grid,
  List,
  FolderOpen
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for assets
const mockAssets = {
  images: [
    { id: "1", name: "brand-logo-1.png", size: "245 KB", type: "image/png", uploadedAt: new Date() },
    { id: "2", name: "background-pattern.jpg", size: "1.2 MB", type: "image/jpeg", uploadedAt: new Date() },
    { id: "3", name: "product-photo.png", size: "890 KB", type: "image/png", uploadedAt: new Date() },
  ],
  fonts: [
    { id: "1", name: "Inter", type: "Variable", formats: ["woff2", "woff"], status: "active" },
    { id: "2", name: "Roboto", type: "Static", formats: ["ttf", "woff2"], status: "installed" },
    { id: "3", name: "Noto Sans KR", type: "Static", formats: ["woff2"], status: "installed" },
  ],
  logos: [
    { id: "1", name: "company-logo.svg", size: "12 KB", type: "image/svg+xml", uploadedAt: new Date() },
    { id: "2", name: "partner-logo.png", size: "45 KB", type: "image/png", uploadedAt: new Date() },
  ],
}

export default function AssetsPage() {
  const [activeTab, setActiveTab] = useState("images")
  const [view, setView] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Assets Management</h1>
        <p className="text-muted-foreground">
          Manage images, fonts, logos, and other resources
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="images" className="gap-2">
              <Image className="h-4 w-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="fonts" className="gap-2">
              <FileText className="h-4 w-4" />
              Fonts
            </TabsTrigger>
            <TabsTrigger value="logos" className="gap-2">
              <Palette className="h-4 w-4" />
              Logos
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-[300px]"
              />
            </div>
            <Button variant="outline" size="icon" onClick={() => setView(view === "grid" ? "list" : "grid")}>
              {view === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Image Library</CardTitle>
              <CardDescription>
                Upload and manage images for your posts
              </CardDescription>
            </CardHeader>
            <CardContent>
              {view === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {mockAssets.images.map((image) => (
                    <div key={image.id} className="group cursor-pointer">
                      <div className="aspect-square rounded-lg bg-muted relative overflow-hidden">
                        <img
                          src="/api/placeholder/logo"
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button size="icon" variant="secondary" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="secondary" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm font-medium truncate">{image.name}</p>
                        <p className="text-xs text-muted-foreground">{image.size}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {mockAssets.images.map((image) => (
                    <div key={image.id} className="flex items-center gap-4 p-3 rounded-lg border hover:bg-accent/50">
                      <div className="w-12 h-12 rounded bg-muted overflow-hidden">
                        <img
                          src="/api/placeholder/logo"
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{image.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {image.type} • {image.size} • {image.uploadedAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fonts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Font Management</CardTitle>
              <CardDescription>
                Manage fonts for your templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssets.fonts.map((font) => (
                  <div key={font.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex-1">
                      <h4 className="font-medium text-lg" style={{ fontFamily: font.name }}>
                        {font.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">{font.type}</Badge>
                        {font.formats.map((format) => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                        <Badge variant={font.status === "active" ? "default" : "secondary"}>
                          {font.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Logo Collection</CardTitle>
              <CardDescription>
                Brand logos and watermarks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockAssets.logos.map((logo) => (
                  <Card key={logo.id} className="p-4">
                    <div className="aspect-square rounded bg-muted mb-3 flex items-center justify-center">
                      <img
                        src="/api/placeholder/logo"
                        alt={logo.name}
                        className="max-w-full max-h-full"
                      />
                    </div>
                    <p className="font-medium text-sm truncate">{logo.name}</p>
                    <p className="text-xs text-muted-foreground">{logo.size}</p>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}