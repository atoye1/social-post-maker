"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Eye, Trash2 } from "lucide-react"

const mockDatasets = [
  {
    id: "1",
    name: "Q4 2024 Brand Rankings",
    rows: 25,
    columns: 6,
    size: "12.5 KB",
    type: "CSV",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Personal Statistics 2024",
    rows: 150,
    columns: 8,
    size: "45.2 KB",
    type: "JSON",
    createdAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    name: "Social Media Metrics",
    rows: 500,
    columns: 12,
    size: "125.8 KB",
    type: "CSV",
    createdAt: new Date("2024-01-13"),
  },
]

export function DataTable() {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="p-4 text-left font-medium">Name</th>
              <th className="p-4 text-left font-medium">Type</th>
              <th className="p-4 text-left font-medium">Size</th>
              <th className="p-4 text-left font-medium">Rows</th>
              <th className="p-4 text-left font-medium">Created</th>
              <th className="p-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDatasets.map((dataset) => (
              <tr key={dataset.id} className="border-b">
                <td className="p-4">
                  <div>
                    <p className="font-medium">{dataset.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {dataset.columns} columns
                    </p>
                  </div>
                </td>
                <td className="p-4">
                  <Badge variant="secondary">{dataset.type}</Badge>
                </td>
                <td className="p-4 text-sm">{dataset.size}</td>
                <td className="p-4 text-sm">{dataset.rows.toLocaleString()}</td>
                <td className="p-4 text-sm">
                  {dataset.createdAt.toLocaleDateString()}
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}