"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Globe, FileSpreadsheet, Settings, Plus } from "lucide-react"

const mockSources = [
  {
    id: "1",
    name: "Google Sheets",
    type: "spreadsheet",
    status: "connected",
    lastSync: new Date("2024-01-15T10:30:00"),
    icon: FileSpreadsheet,
  },
  {
    id: "2",
    name: "REST API",
    type: "api",
    status: "disconnected",
    endpoint: "https://api.example.com/data",
    icon: Globe,
  },
  {
    id: "3",
    name: "PostgreSQL",
    type: "database",
    status: "connected",
    lastSync: new Date("2024-01-15T09:00:00"),
    icon: Database,
  },
]

export function DataSources() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Source
        </Button>
      </div>

      <div className="grid gap-4">
        {mockSources.map((source) => {
          const Icon = source.icon
          return (
            <Card key={source.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{source.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Type: {source.type}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={source.status === "connected" ? "default" : "secondary"}
                        >
                          {source.status}
                        </Badge>
                        {source.lastSync && (
                          <span className="text-xs text-muted-foreground">
                            Last sync: {source.lastSync.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}