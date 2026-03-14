import { CheckCircle2, Clock } from 'lucide-react'

interface ProcessingStepProps {
  title: string
  description: string
  isActive: boolean
  isCompleted: boolean
  number: number
}

export function ProcessingStep({
  title,
  description,
  isActive,
  isCompleted,
  number,
}: ProcessingStepProps) {
  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
            isCompleted
              ? 'bg-success text-success-foreground'
              : isActive
              ? 'bg-info text-info-foreground'
              : 'bg-muted text-muted-foreground'
          }`}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6" />
          ) : isActive ? (
            <Clock className="w-6 h-6 animate-spin" />
          ) : (
            <span>{number}</span>
          )}
        </div>
        {/* Connector line - only show if not last item */}
        <div className={`w-1 h-16 my-2 ${isCompleted || isActive ? 'bg-success' : 'bg-border'}`} />
      </div>

      {/* Content */}
      <div className="pb-8 flex-1 pt-1">
        <h3 className="font-display font-semibold text-lg">{title}</h3>
        <p className="text-foreground/60 mt-1">{description}</p>
      </div>
    </div>
  )
}
