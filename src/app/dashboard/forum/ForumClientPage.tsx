'use client'

import { MessageSquare } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'

export default function ForumClientPage() {
  return (
    <div className="flex h-[calc(100vh-140px)] w-full items-center justify-center p-10 bg-background">
      <EmptyState
        icon={MessageSquare}
        title="Forum de Discussion"
        description="Le forum communautaire est en cours de développement. Bientôt, vous pourrez échanger librement avec les autres étudiants et professeurs !"
      />
    </div>
  )
}
