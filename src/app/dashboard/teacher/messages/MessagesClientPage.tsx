'use client'

import { useState } from 'react'
import { ConversationList } from '@/features/messaging/components/ConversationList'
import { ChatWindow } from '@/features/messaging/components/ChatWindow'
import { ChatSidebar } from '@/features/messaging/components/ChatSidebar'

interface MessagingPageProps {
  initialConversations?: any[]
  initialMessages?: any[]
}

export default function MessagingPage({ initialConversations = [], initialMessages = [] }: MessagingPageProps) {
  const [activeId, setActiveId] = useState<string | null>(initialConversations[0]?.id || null)
  
  const activeConversation = initialConversations.find(c => c.id === activeId) || null

  return (
    <div className="fixed inset-0 lg:left-64 flex overflow-hidden bg-surface animate-in fade-in duration-700">
      <div className="flex-1 flex overflow-hidden">
        {/* Panel 1: List */}
        <div className="w-80 border-r border-outline-variant/10 bg-white">
           {initialConversations.length > 0 ? (
             <ConversationList 
               conversations={initialConversations} 
               activeId={activeId || ''} 
               onSelect={setActiveId} 
             />
           ) : (
             <div className="flex flex-col items-center justify-center h-full p-8 text-center opacity-40">
                <p className="text-xs font-black uppercase tracking-widest mb-2">Aucune conversation</p>
                <p className="text-[10px] font-medium">Démarrez un chat avec un collègue ou un étudiant.</p>
             </div>
           )}
        </div>

        {/* Panel 2: Active Chat */}
        <div className="flex-1 bg-surface-container-low/30">
          {activeConversation ? (
            <ChatWindow 
              conversation={activeConversation} 
              messages={initialMessages} 
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-20">
               <h3 className="text-4xl font-black tracking-tighter uppercase">CampusConnect</h3>
               <p className="text-xs font-black uppercase tracking-[0.3em] mt-2">Sélectionnez une session</p>
            </div>
          )}
        </div>

        {/* Panel 3: Details */}
        {activeConversation && (
          <ChatSidebar 
            conversation={activeConversation} 
          />
        )}
      </div>
    </div>
  )
}
