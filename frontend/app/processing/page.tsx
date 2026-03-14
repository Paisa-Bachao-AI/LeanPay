'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProcessingStep } from '@/components/processing-step'

export default function ProcessingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  useEffect(() => {
    const steps = [
      { duration: 2000, next: 1 },
      { duration: 3000, next: 2 },
      { duration: 4000, next: 3 },
      { duration: 2000, redirect: '/results/blocked' },
    ]

    if (step < steps.length) {
      const timer = setTimeout(() => {
        if (steps[step].redirect) {
          router.push(steps[step].redirect!)
        } else {
          setStep(steps[step].next)
        }
      }, steps[step].duration)

      return () => clearTimeout(timer)
    }
  }, [step, router])

  const steps_data = [
    {
      title: 'Uploading Files',
      description: 'Securely uploading your invoice documents to our processing system',
      number: 1,
    },
    {
      title: 'Running Compliance Checks',
      description: 'Validating GSTIN, GST registration, and invoice details',
      number: 2,
    },
    {
      title: 'Analyzing Patterns',
      description: 'Checking for duplicates, fraud indicators, and vendor anomalies',
      number: 3,
    },
    {
      title: 'Generating Report',
      description: 'Compiling results and creating detailed compliance report',
      number: 4,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-display font-semibold mb-2">Processing Your Invoices</h1>
          <p className="text-foreground/60">Please wait while we analyze your documents...</p>
        </div>

        <div>
          {steps_data.map((s, idx) => (
            <ProcessingStep
              key={idx}
              title={s.title}
              description={s.description}
              number={s.number}
              isActive={step === idx}
              isCompleted={step > idx}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 text-sm text-foreground/60">
            <div className="w-2 h-2 rounded-full bg-info animate-pulse" />
            Processing... approximately 1 minute remaining
          </div>
        </div>
      </div>
    </div>
  )
}
