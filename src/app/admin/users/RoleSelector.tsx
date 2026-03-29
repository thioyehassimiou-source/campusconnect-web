'use client'

import { useState } from 'react'
import { updateUserRole } from './adminActions'
import { Shield, ChevronDown, Check, Loader2 } from 'lucide-react'

interface RoleSelectorProps {
  userId: string
  currentRole: string
}

const roles = [
  { value: 'student', label: 'Étudiant', color: 'bg-primary/10 text-primary' },
  { value: 'teacher', label: 'Enseignant', color: 'bg-secondary-container/20 text-on-secondary-container' },
  { value: 'admin', label: 'Administrateur', color: 'bg-error-container/20 text-error' },
]

export default function RoleSelector({ userId, currentRole }: RoleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState(currentRole)

  const handleRoleChange = async (newRole: string) => {
    if (newRole === role) return
    
    setLoading(true)
    try {
      await updateUserRole(userId, newRole)
      setRole(newRole)
      setIsOpen(false)
    } catch (error) {
      console.warn(error)
      alert("Erreur lors de la mise à jour du rôle")
    } finally {
      setLoading(false)
    }
  }

  const activeRole = roles.find(r => r.value === role) || roles[0]

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        disabled={loading}
        className={`
          inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
          ${activeRole.color} shadow-premium-sm hover:shadow-premium interactive-element disabled:opacity-50
        `}
      >
        {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Shield className="h-3 w-3" />}
        {activeRole.label}
        <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-3 w-56 bg-white dark:bg-surface-container-highest rounded-[var(--radius-standard)] shadow-premium-lg border border-outline-variant/10 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="p-2 space-y-1">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => handleRoleChange(r.value)}
                className={`
                  w-full flex items-center justify-between px-4 py-3.5 rounded-[calc(var(--radius-standard)-4px)] text-[10px] font-black uppercase tracking-widest transition-all
                  ${role === r.value ? 'bg-primary text-white shadow-md' : 'hover:bg-primary/5 text-on-surface-variant'}
                `}
              >
                {r.label}
                {role === r.value && <Check className="h-3.5 w-3.5" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
