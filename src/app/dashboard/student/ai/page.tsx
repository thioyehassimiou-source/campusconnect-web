import { requireRole } from '@/lib/auth'
import { AIChat } from '@/features/ai/components/AIChat'

export default async function StudentAIPage() {
  await requireRole(['student'])

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in duration-700">
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="text-4xl font-black text-primary tracking-tighter mb-2">Centre de Réussite IA</h2>
        <p className="text-on-surface-variant font-medium max-w-lg italic opacity-80">
          Votre tuteur personnel disponible 24/7 pour vous aider à maîtriser vos matières et à préparer vos examens.
        </p>
      </div>

      <AIChat role="student" />
    </div>
  )
}
