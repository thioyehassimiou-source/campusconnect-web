'use client'

import { useState } from 'react'
import { ForumCategoryList } from '@/features/forum/components/ForumCategoryList'
import { ThreadCard } from '@/features/forum/components/ThreadCard'
import { ForumSidebarWidgets } from '@/features/forum/components/ForumSidebarWidgets'
import { mockForumThreads, mockForumCategories, mockForumMembers } from '@/features/forum/mockData'
import { ForumThread } from '@/features/forum/types'

interface ForumClientPageProps {
  initialThreads: ForumThread[]
}

export default function ForumClientPage({ initialThreads }: ForumClientPageProps) {
  const [activeCategory, setActiveCategory] = useState('All')
  
  // Ensure we have threads with the 'category' property for filtering
  const processedThreads = (initialThreads.length > 0 ? initialThreads : mockForumThreads).map((t: any) => ({
    ...t,
    category: t.category || t.categoryName // Fallback for filtering
  }))

  const filteredThreads = processedThreads.filter((t: any) => 
    activeCategory === 'All' || t.category === activeCategory || t.categoryName === activeCategory
  )

  const trending = [
    { category: 'ACADÉMIQUE', title: 'Dates des partiels S2', views: '2.4k vues', color: 'text-primary' },
    { category: 'ÉVÉNEMENT', title: 'Gala de fin d\'année', views: '1.8k vues', color: 'text-secondary' },
    { category: 'LOGEMENT', title: 'Résidence B : Maintenance', views: '950 vues', color: 'text-tertiary-container' }
  ]

  return (
    <div className="flex gap-10 h-[calc(100vh-140px)] w-full -m-10 p-10 overflow-hidden bg-background">
      {/* Internal Navigation: Categories */}
      <ForumCategoryList 
        categories={mockForumCategories.map((c: any) => ({ ...c, isActive: activeCategory === c.name }))} 
      />

      {/* Main Feed: Discussions */}
      <section className="flex-1 overflow-y-auto no-scrollbar space-y-10 pr-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-black font-headline text-primary tracking-tighter">Discussions {activeCategory !== 'All' ? `(${activeCategory})` : ''}</h2>
          <button className="px-8 py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            Nouvelle Discussion
          </button>
        </div>

        <div className="space-y-8">
          {filteredThreads.map((thread: any) => (
            <ThreadCard key={thread.id} thread={thread} />
          ))}
          {filteredThreads.length === 0 && (
            <div className="text-center py-24 bg-surface-container-low rounded-[3rem] border-2 border-dashed border-outline-variant/10">
              <p className="text-on-surface-variant font-black text-lg opacity-40">Aucune discussion trouvée dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Community Sidebar: Widgets & Info */}
      <ForumSidebarWidgets 
        trending={trending}
        members={mockForumMembers}
      />
    </div>
  )
}
