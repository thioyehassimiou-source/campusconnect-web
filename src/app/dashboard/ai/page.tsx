import { requireRole } from '@/lib/auth'
import AIClientPage from './AIClientPage'
import { getAIHistory } from '@/features/ai/services/aiService'

export default async function AIPage() {
  await requireRole(['student', 'teacher', 'admin'])
  
  const initialHistory = await getAIHistory()
  
  return <AIClientPage initialHistory={initialHistory} />
}
