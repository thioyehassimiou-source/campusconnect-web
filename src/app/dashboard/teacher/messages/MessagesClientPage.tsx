'use client'

import { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import { Conversation, Message } from '@/features/messaging/types'
import { getMessages } from '@/features/messaging/services/messagingService'
import { sendMessage, markMessagesAsRead } from '@/features/messaging/actions'
import { createClient } from '@/lib/supabase/client'
import { ChatSidebar } from '@/features/messaging/components/ChatSidebar'
import { ChatWindow } from '@/features/messaging/components/ChatWindow'

interface MessagesClientPageProps {
  initialConversations: Conversation[]
}

export default function MessagesClientPage({ initialConversations }: MessagesClientPageProps) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [activeId, setActiveId] = useState<string>(conversations[0]?.id || '')
  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState('')
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUserId(user?.id || null)
    }
    getUser()
  }, [supabase])

  const activeConv = conversations.find(c => c.id === activeId) || conversations[0]

  useEffect(() => {
    if (!activeId) return
    const fetchMessages = async () => {
      const data = await getMessages(activeId)
      setMessages(data)
    }
    fetchMessages()

    const channel = supabase
      .channel('global_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          const newMessage = {
            id: payload.new.id,
            conversationId: payload.new.conversation_id,
            senderId: payload.new.sender_id,
            content: payload.new.content,
            createdAt: payload.new.created_at
          } as Message

          // 1. If it's for the active conversation, add to messages list
          // BUT only if it doesn't already exist (to avoid duplicate with optimistic UI)
          if (newMessage.conversationId === activeId) {
            setMessages(prev => {
              const exists = prev.some(m => m.id === newMessage.id || (m.content === newMessage.content && m.senderId === newMessage.senderId && Math.abs(new Date(m.createdAt).getTime() - new Date(newMessage.createdAt).getTime()) < 5000))
              if (exists) return prev
              return [...prev, newMessage]
            })
          }

          // 2. Update conversation list preview and unread count
          setConversations(prev => prev.map(conv => {
            if (conv.id === newMessage.conversationId) {
              const isMe = newMessage.senderId === currentUserId
              return {
                ...conv,
                lastMessage: newMessage.content,
                lastMessageTime: new Date(newMessage.createdAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
                unreadCount: (conv.id !== activeId && !isMe) ? (conv.unreadCount || 0) + 1 : 0
              }
            }
            return conv
          }))
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [activeId, supabase])

  useEffect(() => {
    if (activeId) {
      markMessagesAsRead(activeId)
      // Reset local unread count
      setConversations(prev => prev.map(c => 
        c.id === activeId ? { ...c, unreadCount: 0 } : c
      ))
    }
  }, [activeId, messages.length])

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!messageText.trim() || !activeId) return
    
    const text = messageText
    setMessageText('')
    
    // OPTIMISTIC UPDATE
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      conversationId: activeId,
      senderId: currentUserId || '',
      content: text,
      createdAt: new Date().toISOString()
    }
    setMessages(prev => [...prev, optimisticMessage])

    try {
      await sendMessage(activeId, text)
    } catch (error) {
      console.warn('Failed to send message:', error)
      // Rollback optimistic update
      setMessages(prev => prev.filter(m => m.id !== optimisticMessage.id))
      setMessageText(text) // Restore text
      import('@/lib/logger').then(({ logger }) => logger.trackFailure('SEND_MESSAGE_ERROR', error))
    }
  }

  return (
    <div className="flex w-full h-[calc(100vh-140px)] bg-white rounded-[3.5rem] overflow-hidden shadow-2xl shadow-primary/5 border border-outline-variant/10 animate-in zoom-in-95 duration-700">
      <ChatSidebar 
        conversations={conversations} 
        activeId={activeId} 
        onSelect={setActiveId} 
      />

      {activeConv ? (
        <ChatWindow 
          activeConv={activeConv}
          messages={messages}
          currentUserId={currentUserId}
          messageText={messageText}
          onMessageChange={setMessageText}
          onSend={handleSend}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-surface-container-low/10">
          <div className="w-24 h-24 rounded-[2rem] bg-primary/5 flex items-center justify-center mb-8">
            <Send className="h-10 w-10 text-primary opacity-20" />
          </div>
          <h3 className="text-2xl font-black text-primary tracking-tight">Sélectionnez une conversation</h3>
        </div>
      )}
    </div>
  )
}
