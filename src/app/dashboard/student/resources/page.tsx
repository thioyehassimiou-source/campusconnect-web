import { requireRole } from '@/lib/auth'
import ResourcesClientPage from './ResourcesClientPage'
import { getResources } from '@/features/resources/services/resourceService'

export default async function StudentResourcesPage() {
  await requireRole(['student', 'teacher', 'admin'])
  
  const initialResources = await getResources()
  
  return <ResourcesClientPage initialResources={initialResources} />
}
