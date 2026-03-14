'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void
  isLoading?: boolean
}

export function UploadZone({ onFilesSelected, isLoading }: UploadZoneProps) {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true)
    } else if (e.type === "dragleave") {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type === 'application/pdf' || file.type === 'image/jpeg' || file.type === 'image/png'
    )
    
    if (files.length > 0) {
      onFilesSelected(files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFilesSelected(Array.from(e.target.files))
    }
  }

  return (
    <Card
      className={`p-12 text-center border-2 border-dashed transition-all cursor-pointer ${
        isDragActive
          ? 'border-primary bg-primary/5'
          : 'border-border hover:border-primary/50'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={handleChange}
        className="hidden"
        id="file-input"
        disabled={isLoading}
      />
      
      <label htmlFor="file-input" className="cursor-pointer block">
        <Upload className="h-12 w-12 mx-auto mb-4 text-foreground/40" />
        
        <h3 className="text-xl font-display font-semibold mb-2">Upload Invoices</h3>
        <p className="text-foreground/60 mb-6">
          Drag and drop your PDF or image files here, or click to browse
        </p>
        
        <Button disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Select Files'}
        </Button>
        
        <p className="text-xs text-foreground/40 mt-4">
          Supported formats: PDF, JPG, PNG (Max 10MB per file)
        </p>
      </label>
    </Card>
  )
}
