"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, Database, FileJson, Table2, Plus } from "lucide-react"
import { DataUploader } from "@/components/data/data-uploader"
import { DataTable } from "@/components/data/data-table"
import { DataSources } from "@/components/data/data-sources"

export default function DataPage() {
  const [activeTab, setActiveTab] = useState("upload")

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Management</h1>
        <p className="text-muted-foreground">
          Import, manage, and organize data for your social media posts
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
          <TabsTrigger value="upload" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="sources" className="gap-2">
            <Database className="h-4 w-4" />
            Sources
          </TabsTrigger>
          <TabsTrigger value="datasets" className="gap-2">
            <Table2 className="h-4 w-4" />
            Datasets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Data</CardTitle>
              <CardDescription>
                Import data from CSV, JSON, or Excel files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataUploader />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Sources</CardTitle>
              <CardDescription>
                Manage your connected data sources and APIs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataSources />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Datasets</CardTitle>
              <CardDescription>
                View and manage your imported datasets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}