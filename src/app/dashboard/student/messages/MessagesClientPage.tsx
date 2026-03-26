'use client'

import { useState } from 'react'
import { Search, Send, MoreVertical, Phone, Video, Image, Paperclip, Smile } from 'lucide-react'
import { mockConversations, mockMessages } from '@/features/messaging/mockData'
import { Conversation, Message } from '@/features/messaging/types'

interface MessagesClientPageProps {
  initialConversations: Conversation[]
}

export default function MessagesClientPage({ initialConversations }: MessagesClientPageProps) {
  const conversations = initialConversations.length > 0 ? initialConversations : (mockConversations as unknown as Conversation[])
  const [activeId, setActiveId] = useState(conversations[0]?.id || '')
  const [messageText, setMessageText] = useState('')

  const activeConv = conversations.find(c => c.id === activeId) || conversations[0]

  return (
    <div className="flex w-full h-[calc(100vh-140px)] bg-white rounded-[3.5rem] overflow-hidden shadow-2xl shadow-primary/5 border border-outline-variant/10 animate-in zoom-in-95 duration-700">
      {/* Sidebar: Conv List */}
      <aside className="w-[420px] border-r border-outline-variant/10 flex flex-col bg-surface-container-low/30">
        <div className="p-10 border-b border-outline-variant/10">
          <h2 className="text-3xl font-black font-headline text-primary mb-8 tracking-tighter">Messages</h2>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/40" />
            <input 
              type="text" 
              placeholder="Rechercher une conversation..." 
              className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-outline-variant/10 focus:ring-4 focus:ring-primary/5 text-sm font-medium transition-all" 
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar py-6">
          {conversations.map(conv => (
            <button 
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className={`w-full p-8 flex gap-6 transition-all relative group
                ${activeId === conv.id ? 'bg-white shadow-lg z-10' : 'hover:bg-white/50'}
              `}
            >
              {activeId === conv.id && <div className="absolute left-0 top-6 bottom-6 w-1.5 bg-primary rounded-r-full shadow-lg" />}
              <div className="relative shrink-0">
                <img src={conv.avatar} alt={conv.name} className="w-16 h-16 rounded-3xl object-cover shadow-sm group-hover:scale-105 transition-transform" />
                {conv.isOnline && <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full shadow-sm" />}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-start mb-1 gap-4">
                  <h4 className="font-black text-on-surface tracking-tight truncate group-hover:text-primary transition-colors">{conv.name}</h4>
                  <span className="text-[10px] font-black text-on-surface-variant/40 uppercase tracking-widest">{conv.lastMessageTime}</span>
                </div>
                <p className="text-sm text-on-surface-variant/60 font-medium truncate italic leading-tight">{conv.lastMessage}</p>
                {conv.unreadCount && conv.unreadCount > 0 && (
                  <span className="absolute right-10 bottom-10 w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg text-[8px] flex items-center justify-center text-white font-bold">{conv.unreadCount}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      {activeConv ? (
        <main className="flex-1 flex flex-col bg-white">
          <header className="px-10 py-8 border-b border-outline-variant/10 flex justify-between items-center shadow-sm relative z-10">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img src={activeConv.avatar} alt={activeConv.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
                {activeConv.isOnline && <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" />}
              </div>
              <div>
                <h3 className="text-xl font-black text-on-surface tracking-tight leading-none mb-1">{activeConv.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-green-500 animate-pulse">En ligne</p>
              </div>
            </div>
            {/* Headers actions */}
          </header>

          <div className="flex-1 overflow-y-auto no-scrollbar p-12 space-y-10 bg-surface-container-lowest/50">
            {(mockMessages as unknown as Message[]).map((msg, i) => (
              <div key={msg.id} className={`flex flex-col ${msg.senderId === 'me' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                <div className={`max-w-[70%] p-7 rounded-[2.5rem] shadow-sm relative group
                  ${msg.senderId === 'me' 
                    ? 'bg-primary text-white rounded-tr-lg shadow-xl shadow-primary/5' 
                    : 'bg-white text-on-surface rounded-tl-lg border border-outline-variant/5'
                  }
                `}>
                  <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                  <span className={`absolute ${msg.senderId === 'me' ? '-left-16' : '-right-16'} bottom-4 opacity-0 group-hover:opacity-40 transition-opacity text-[9px] font-black uppercase tracking-widest text-on-surface-variant`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Footer input */}
        </main>
      ) : null}
    </div>
  )
}
