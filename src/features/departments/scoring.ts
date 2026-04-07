import { Profile } from '@/features/profile/types'
import { Department } from './data'

export interface ScoringResult {
  score: number // Percentage 0-100
  matchLevel: 'Élevé' | 'Moyen' | 'Faible' | 'Incompatible'
  factors: {
    label: string
    achieved: boolean
    impact: string
  }[]
  advice: string
}

export function calculateDepartmentMatch(profile: Profile, department: Department): ScoringResult {
  let score = 0
  const factors: ScoringResult['factors'] = []

  // 1. Bac Series Match (30%)
  const seriesMatch = profile.bac_series && department.admissionCriteria.bacSeries.includes(profile.bac_series)
  if (seriesMatch) {
    score += 30
    factors.push({ label: `Série du Bac (${profile.bac_series})`, achieved: true, impact: '+30%' })
  } else if (profile.bac_series) {
    factors.push({ label: `Série du Bac (${profile.bac_series})`, achieved: false, impact: 'Non prioritaire' })
  }

  // 2. Academic Average Match (30%)
  if (profile.bac_average) {
    if (profile.bac_average >= department.admissionCriteria.minAverage) {
      score += 30
      factors.push({ label: "Moyenne Académique", achieved: true, impact: '+30%' })
    } else if (profile.bac_average >= department.admissionCriteria.minAverage - 1) {
      score += 15
      factors.push({ label: "Moyenne Académique (Limite)", achieved: true, impact: '+15%' })
    } else {
      factors.push({ label: "Moyenne Académique", achieved: false, impact: 'Insuffisante' })
    }
  }

  // 3. Subject-Specific Weightage (40%)
  // For this simulation, we'll assume a "High Coefficient Match" if interests align with core subjects
  const coreSubjects = department.subjectWeights.filter(sw => sw.coefficient >= 4).map(sw => sw.name)
  const matchedCore = profile.interests ? profile.interests.filter(interest => 
    coreSubjects.some(cs => cs.toLowerCase().includes(interest.toLowerCase()))
  ) : []

  const weightScore = Math.min(matchedCore.length * 20 + 20, 40) // Base 20% + 20% per matched core
  score += weightScore
  factors.push({ 
    label: "Affinité Matières (Coefficients)", 
    achieved: weightScore > 20, 
    impact: `+${weightScore}%` 
  })

  let matchLevel: ScoringResult['matchLevel'] = 'Faible'
  if (score >= 75) matchLevel = 'Élevé'
  else if (score >= 45) matchLevel = 'Moyen'
  else if (!seriesMatch && profile.bac_series) matchLevel = 'Incompatible'

  let advice = ""
  if (matchLevel === 'Élevé') {
    advice = "Votre profil correspond parfaitement aux exigences de cette filière. Vous avez toutes les chances de réussir."
  } else if (matchLevel === 'Moyen') {
    advice = "Vous avez un bon profil, mais redoublez d'efforts dans les matières principales pour sécuriser votre admission."
  } else if (matchLevel === 'Incompatible') {
    advice = "Attention : Votre série de Bac n'est généralement pas acceptée pour cette filière."
  } else {
    advice = "Cette filière semble éloignée de votre profil actuel. Explorez d'autres options plus adaptées."
  }

  return { score, matchLevel, factors, advice }
}
