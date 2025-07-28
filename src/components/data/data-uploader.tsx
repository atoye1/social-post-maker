"use client"

import { useState } from "react"
import { Upload, FileSpreadsheet, FileJson, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DataUploader() {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles(prev => [...prev, ...droppedFiles])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setFiles(prev => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="font-semibold mb-2">Drop files here or click to upload</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Support for CSV, JSON, and Excel files
        </p>
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          accept=".csv,.json,.xlsx,.xls"
          onChange={handleFileSelect}
        />
        <Button asChild>
          <label htmlFor="file-upload" className="cursor-pointer">
            Select Files
          </label>
        </Button>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Selected Files</h4>
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border bg-card"
            >
              <div className="flex items-center gap-3">
                {file.name.endsWith('.json') ? (
                  <FileJson className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <FileSpreadsheet className="h-5 w-5 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button className="w-full">Process Files</Button>
        </div>
      )}
    </div>
  )
}