import { requireRole } from '@/lib/auth'
import { AIChat } from '@/features/ai/components/AIChat'

export default async function TeacherAIPage() {
  await requireRole(['teacher'])

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-700">
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-4xl font-black text-primary tracking-tighter mb-2">Assistant Pédagogique IA</h2>
        <p className="text-on-surface-variant font-medium max-w-lg italic opacity-80">
          Simplifiez votre quotidien d'enseignant : générez des quiz, structurez vos cours et optimisez votre pédagogie.
        </p>
      </div>

      <AIChat role="teacher" />
    </div>
  )
}
