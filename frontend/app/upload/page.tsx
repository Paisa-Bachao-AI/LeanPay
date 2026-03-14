'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { UploadZone } from '@/components/upload-zone'

export default function UploadPage() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleFilesSelected = async (files: File[]) => {
    setIsProcessing(true)
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000))
    router.push('/processing')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display font-semibold mb-4">Invoice Processing</h1>
          <p className="text-lg text-foreground/60">
            Upload your invoices to get started with automated compliance checking
          </p>
        </div>

        <UploadZone onFilesSelected={handleFilesSelected} isLoading={isProcessing} />

        <div className="mt-12 grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl font-mono-data font-semibold text-primary mb-2">94.4%</div>
            <p className="text-sm text-foreground/60">Approval Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono-data font-semibold text-primary mb-2">2.3h</div>
            <p className="text-sm text-foreground/60">Avg Processing</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-mono-data font-semibold text-primary mb-2">412</div>
            <p className="text-sm text-foreground/60">Processed</p>
          </div>
        </div>
      </div>
    </div>
  )
}
