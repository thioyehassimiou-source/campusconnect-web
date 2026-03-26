'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatHeader } from '@/features/ai/components/ChatHeader'
import { ChatSuggestions } from '@/features/ai/components/ChatSuggestions'
import { ChatMessage } from '@/features/ai/components/ChatMessage'
import { ChatInput } from '@/features/ai/components/ChatInput'
import { AIMessage, Suggestion } from '@/features/ai/types'

const initialSuggestions: Suggestion[] = [
  { id: 's1', text: 'Résumer mon cours de droit', icon: 'summarize' },
  { id: 's2', text: 'Modifier mon planning de demain', icon: 'schedule' },
  { id: 's3', text: 'Trouver des sources pour mon mémoire', icon: 'search_check' },
  { id: 's4', text: 'Rédiger un mail à l\'administration', icon: 'mail' }
]

interface AIClientPageProps {
  initialHistory: any[]
}

export default function AIPage({ initialHistory }: AIClientPageProps) {
  const [messages, setMessages] = useState<AIMessage[]>(
    initialHistory.length > 0 
      ? initialHistory.flatMap(h => [
          { id: `${h.id}-q`, role: 'user', content: h.query, timestamp: new Date(h.created_at).toLocaleTimeString() },
          { id: `${h.id}-a`, role: 'assistant', content: h.response, timestamp: new Date(h.created_at).toLocaleTimeString() }
        ])
      : []
  )
  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = (text: string) => {
    if (!text.trim()) return

    const userMsg: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])

    // Simulate Bot reply (In production, this would call an Edge Function / OpenAI)
    setTimeout(() => {
      const botMsg: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Je traite votre demande concernant \"" + text + "\". Je reviens vers vous dans un instant avec les informations précises de CampusConnect.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prev => [...prev, botMsg])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] w-full -m-10">
      {/* Top Fixed Area */}
      <div className="p-10 pb-0 shrink-0">
        <ChatHeader />
        <ChatSuggestions suggestions={initialSuggestions} onSelect={handleSend} />
      </div>

      {/* Scrolling Chat Stream */}
      <div className="flex-1 overflow-y-auto px-10 py-10 space-y-12 bg-surface-container-low/40 rounded-t-[4rem] mx-4 transition-all no-scrollbar">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Fixed Input Area */}
      <ChatInput onSend={handleSend} />
    </div>
  )
}
