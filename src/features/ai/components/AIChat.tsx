'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Loader2, Trash2, Sparkles } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
  actions?: string[]
  steps?: string[]
  agent?: string
}

export function AIChat({ role }: { role: 'student' | 'teacher' }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [pendingActions, setPendingActions] = useState<any[] | null>(null)
  const [pendingMessages, setPendingMessages] = useState<any[]>([])
  const [rateLimited, setRateLimited] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isLoading, pendingActions])

  const sendToAPI = async (msgs: any[], confirmedFlag = false) => {
    const response = await fetch('/api/ai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: msgs, role, confirmed: confirmedFlag })
    })
    return response.json()
  }

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    const msgHistory = [...messages.map(m => ({ role: m.role, content: m.content })), userMessage]
    setInput('')
    setIsLoading(true)
    setRateLimited(false)

    try {
      const data = await sendToAPI(msgHistory)

      if (data.rate_limited) {
        setRateLimited(true)
      } else if (data.requires_confirmation) {
        setPendingActions(data.pending_actions)
        setPendingMessages(msgHistory)
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      } else if (data.content !== undefined) {
        setMessages(prev => [...prev, { 
          role: 'assistant', content: data.content,
          actions: data.actions, steps: data.steps, agent: data.agent
        }])
      } else if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `[Erreur Système] L'Intelligence Artificielle n'est pas disponible pour le moment. Détail: ${data.error}` }])
      }
    } catch (error) {
      console.warn('AI Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: `[Erreur Réseau] Impossible de contacter le serveur d'IA.` }])
    } finally {
      setIsLoading(false)
    }
  }

  const confirmAction = async (confirmed: boolean) => {
    if (!pendingActions) return
    setPendingActions(null)
    if (!confirmed) return

    setIsLoading(true)
    try {
      const data = await sendToAPI(pendingMessages, true)
      if (data.content !== undefined) {
        setMessages(prev => [...prev, {
          role: 'assistant', content: data.content,
          actions: data.actions, steps: data.steps, agent: data.agent
        }])
      } else if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `[Erreur Système] Action annulée. Détail: ${data.error}` }])
      }
    } catch (e) {
      console.warn(e)
      setMessages(prev => [...prev, { role: 'assistant', content: `[Erreur Réseau] Impossible d'exécuter l'action.` }])
    } finally {
      setIsLoading(false)
    }
  }

  const quickActions = role === 'student' ? [
    { label: '📊 Bilan académique', prompt: 'Analyse mon statut pédagogique complet et programme un plan de révision si nécessaire.' },
    { label: '📅 Prochain cours', prompt: 'Dis-moi mon prochain cours et programme un rappel.' },
    { label: '📝 Mes devoirs', prompt: 'Quels sont mes devoirs à rendre ?' },
    { label: '🎓 Aide LMD', prompt: 'Explique-moi le système LMD sur CampusConnect.' },
  ] : [
    { label: '🔔 Alerter classe', prompt: 'Envoie une notification à ma classe pour le report du cours.' },
    { label: '📝 Générer Quiz', prompt: 'Génère un quiz sur mon module actuel.' },
    { label: '📚 Plan LMD', prompt: 'Aide-moi à structurer mon cours selon les normes LMD.' },
  ]

  return (
    <div className="flex flex-col h-[750px] bg-white/40 backdrop-blur-xl rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden relative">
      {/* AI Header */}
      <div className="p-8 border-b border-outline-variant/5 flex items-center justify-between bg-white/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-primary tracking-tight">Agent Actif CampusConnect</h3>
            <div className="flex items-center gap-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/40 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Mode Autonome
              </p>
              <div className="h-3 w-px bg-outline-variant/20" />
              <span className="bg-primary/5 text-primary text-[8px] font-black px-2 py-0.5 rounded-full border border-primary/10">
                CAPACITÉ D'ACTION ACTIVÉE
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => setMessages([])}
          className="p-3 hover:bg-red-50 text-on-surface-variant/30 hover:text-red-500 rounded-2xl transition-all"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar scroll-smooth"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-40">
            <div className="w-20 h-20 bg-surface-container-high rounded-[2rem] flex items-center justify-center mb-6">
               <Bot className="h-10 w-10 text-on-surface-variant" />
            </div>
            <h4 className="text-lg font-black tracking-tight mb-2 italic">Je suis votre Agent Actif.</h4>
            <p className="text-sm font-medium max-w-xs mx-auto italic border-l-2 border-primary/20 pl-4 py-1">
              "Je peux programmer des rappels, envoyer des notifications et vous conseiller sur le système LMD."
            </p>
          </div>
        )}

        {messages.map((m, i) => (
          <div 
            key={i} 
            className={`flex items-start gap-4 animate-in slide-in-from-bottom-2 duration-300 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-outline-variant/10 text-primary'}`}>
              {m.role === 'user' ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </div>
            <div className="flex flex-col gap-2 max-w-[85%]">
              {m.agent && m.role === 'assistant' && (
                <span className="text-[8px] font-black uppercase tracking-widest text-primary/40 pl-1">{m.agent}</span>
              )}

              {/* Workflow Stepper */}
              {m.steps && m.steps.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-1">
                  {m.steps.map((step, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-3 py-1 bg-primary/5 border border-primary/10 rounded-full text-[8px] font-black tracking-widest text-primary/60 animate-in slide-in-from-left-2 duration-500" style={{ animationDelay: `${idx * 100}ms` }}>
                      <span className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center text-[8px] font-black">{idx + 1}</span>
                      {step.replace('Action : ', '')}
                    </div>
                  ))}
                </div>
              )}

              <div className={`p-5 rounded-3xl text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${m.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-white border border-outline-variant/10 text-on-surface rounded-tl-none font-medium'}`}>
                {m.content}
              </div>
              
              {m.actions && m.actions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {m.actions.map((action, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-100 rounded-full text-[9px] font-black uppercase tracking-widest text-green-700 animate-in zoom-in duration-500">
                      <Sparkles className="h-3 w-3" />
                      {action} effectuée
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-xl bg-white border border-outline-variant/10 flex items-center justify-center shrink-0">
               <Loader2 className="h-5 w-5 text-primary animate-spin" />
            </div>
            <div className="bg-white/50 border border-outline-variant/10 p-5 rounded-3xl rounded-tl-none italic text-[10px] font-black tracking-[0.2em] text-primary/50">
              RÉFLEXION EN COURS...
            </div>
          </div>
        )}
      </div>

      {/* Rate Limit Warning */}
      {rateLimited && (
        <div className="mx-6 mb-4 p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-3 animate-in slide-in-from-bottom-2 duration-300">
          <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">⚡</div>
          <div>
            <p className="text-xs font-black text-orange-700">Limite d'utilisation atteinte</p>
            <p className="text-[10px] text-orange-600/70">20 requêtes par heure maximum. Réessayez dans quelques minutes.</p>
          </div>
        </div>
      )}

      {/* Confirmation Banner */}
      {pendingActions && (
        <div className="mx-6 mb-4 p-5 bg-amber-50 border border-amber-100 rounded-2xl animate-in slide-in-from-bottom-2 duration-300">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 mb-2">⚡ Action requiert votre confirmation</p>
          {pendingActions.map((a, idx) => {
            let desc = "Action système en attente"
            if (a.tool === 'send_notification') {
              desc = `Envoi d'une notification : "${a.args.title || 'Information'}"`
            } else if (a.tool === 'create_study_reminder') {
              desc = `Programmation d'un rappel : "${a.args.course_title || 'Révision'}"`
            } else if (a.tool === 'analyze_pedagogical_status') {
              desc = `Analyse du bilan académique`
            }
            return (
              <p key={idx} className="text-sm font-bold text-amber-800 mb-2 flex items-start gap-2">
                <span className="mt-0.5 opacity-50">•</span>
                <span>{desc}</span>
              </p>
            )
          })}
          <div className="flex gap-2 mt-4">
            <button onClick={() => confirmAction(true)} className="flex-1 py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all">
              ✓ Confirmer l'action
            </button>
            <button onClick={() => confirmAction(false)} className="flex-1 py-2.5 bg-white border border-outline-variant/10 text-on-surface text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-100 active:scale-95 transition-all">
              ✕ Annuler
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions & Input Area */}
      <div className="p-8 bg-white/20 border-t border-outline-variant/5">
        <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
          {quickActions.map((action, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(action.prompt)
                // Trigger handleSend in next tick to allow state update
                setTimeout(handleSend, 0)
              }}
              className="whitespace-nowrap px-4 py-2 bg-white border border-outline-variant/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary hover:text-white transition-all shadow-sm active:scale-95"
            >
              {action.label}
            </button>
          ))}
        </div>

        <div className="relative group">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Interrogez votre assistant personnel..."
            className="w-full bg-white border border-outline-variant/10 rounded-[1.5rem] py-5 px-8 pr-16 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner placeholder:italic placeholder:opacity-50"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 top-3 w-12 h-12 bg-primary text-white rounded-[1.1rem] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:scale-100"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-4 text-center text-[10px] font-black uppercase tracking-widest text-on-surface-variant/30 italic">
          L'IA peut faire des erreurs. Vérifiez les informations importantes.
        </p>
      </div>
    </div>
  )
}
