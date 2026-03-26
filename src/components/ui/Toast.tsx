'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => removeToast(id), 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4 pointer-events-none">
        {toasts.map((t) => (
          <div 
            key={t.id} 
            className={`
              pointer-events-auto flex items-center gap-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl animate-in slide-in-from-right-10 duration-300
              ${t.type === 'success' ? 'bg-green-50/90 border-green-200 text-green-900' : 
                t.type === 'error' ? 'bg-red-50/90 border-red-200 text-red-900' : 
                'bg-blue-50/90 border-blue-200 text-blue-900'}
            `}
          >
            {t.type === 'success' && <CheckCircle2 className="h-5 w-5 text-green-600" />}
            {t.type === 'error' && <AlertCircle className="h-5 w-5 text-red-600" />}
            {t.type === 'info' && <Info className="h-5 w-5 text-blue-600" />}
            
            <p className="text-sm font-bold tracking-tight">{t.message}</p>
            
            <button onClick={() => removeToast(t.id)} className="ml-2 hover:opacity-50 transition-opacity">
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a ToastProvider')
  return context
}
