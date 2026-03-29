import { ComingSoon } from '@/components/ui/ComingSoon'

export default function TeacherGradesPage() {
  return (
    <ComingSoon 
      title="Saisie des Notes" 
      description="Ce module permettra aux enseignants de saisir et de valider les notes des étudiants par module et par semestre."
      backHref="/dashboard/teacher"
    />
  )
}
