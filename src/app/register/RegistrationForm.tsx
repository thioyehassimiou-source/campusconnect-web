'use client'

import React, { useState, useEffect } from 'react'
import { register } from './actions'
import { Mail, Eye, EyeOff, HelpCircle, ArrowLeft, Moon, Sun, ChevronDown, User, Lock, Building, GraduationCap, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

interface RegistrationFormProps {
  faculties: any[]
  departments: any[]
  services: any[]
  error?: string
}

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <button 
      type="submit"
      disabled={pending}
      className={`
        w-full py-5 bg-primary text-white font-headline font-black uppercase tracking-[0.25em] rounded-[var(--radius-button)] shadow-premium hover:shadow-premium-lg interactive-element text-[10px] flex items-center justify-center gap-3 transition-all duration-300
        ${pending ? 'opacity-70 cursor-not-allowed scale-[0.98]' : 'hover:scale-[1.02]'}
      `}
    >
      {pending ? (
        <>
          <span className="spinner border-white/30 border-t-white" />
          <span>Création en cours...</span>
        </>
      ) : (
        'Créer mon compte'
      )}
    </button>
  )
}

export default function RegistrationForm({ faculties, departments, services, error }: RegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState<string>('')
  const [filteredDepartments, setFilteredDepartments] = useState<any[]>([])

  useEffect(() => {
    if (selectedFaculty) {
      const filtered = departments.filter(d => 
        String(d.faculty_id) === String(selectedFaculty)
      )
      setFilteredDepartments(filtered)
    } else {
      setFilteredDepartments([])
    }
  }, [selectedFaculty, departments])

  return (
    <div className="w-full max-w-md mx-auto entrance-up">
      <div className="mb-12 text-center lg:text-left">
        <h2 className="text-4xl font-black text-primary mb-3 font-headline tracking-tighter">Créer votre compte</h2>
        <p className="text-on-surface-variant/60 text-sm font-bold tracking-tight">Portail numérique officiel de l'Université de Labé.</p>
      </div>

      {error && (
        <div className="mb-8 rounded-[var(--radius-premium)] bg-error/[0.03] p-5 border border-error/10 flex items-start gap-4 animate-in fade-in slide-in-from-top-4 duration-500 shadow-sm">
          <div className="bg-error/10 p-2 rounded-full mt-0.5">
            <HelpCircle className="h-4 w-4 text-error" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-error mb-1">Erreur d'inscription</p>
            <p className="text-xs font-bold text-error/80 leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      <form action={register} className="space-y-6" autoComplete="off">
          {/* Prénom & Nom */}
          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 ml-1">Prénom</label>
              <div className="relative group">
                <input 
                  name="first-name"
                  required
                  placeholder="Jean"
                  type="text"
                  autoComplete="off"
                  className="w-full pl-12 pr-4 py-4.5 bg-surface-container-low border-none rounded-[var(--radius-standard)] focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface placeholder:text-on-surface-variant/20 focus:scale-[1.01]"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/20 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
              </div>
            </div>
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 ml-1">Nom</label>
              <div className="relative group">
                <input 
                  name="last-name"
                  required
                  placeholder="Dupont"
                  type="text"
                  autoComplete="off"
                  className="w-full pl-12 pr-4 py-4.5 bg-surface-container-low border-none rounded-[var(--radius-standard)] focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface placeholder:text-on-surface-variant/20 focus:scale-[1.01]"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/20 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
              </div>
            </div>
          </div>



          {/* Matricule */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 ml-1">Matricule (INE)</label>
            <div className="relative group">
              <input 
                name="student_id"
                required
                type="text"
                autoComplete="off"
                pattern="^[A-Z]{4}\d{10}$"
                title="Le matricule doit contenir 4 lettres majuscules suivies de 10 chiffres (ex: TTHA1585331656)"
                placeholder="Ex: TTHA1585331656"
                className="w-full pl-12 pr-4 py-4.5 bg-surface-container-low border-none rounded-[var(--radius-standard)] focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface placeholder:text-on-surface-variant/20 uppercase focus:scale-[1.01]"
              />
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/20 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 ml-1">Faculté</label>
              <div className="relative group">
                <select 
                  name="faculty"
                  required
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="w-full pl-12 pr-10 py-4.5 bg-surface-container-low border-none rounded-[var(--radius-standard)] appearance-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer focus:scale-[1.01]"
                >
                  <option value="">Sélectionner...</option>
                  {faculties.map((f) => (
                    <option key={f.id} value={f.id}>{f.name || f.nom}</option>
                  ))}
                </select>
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/20 pointer-events-none group-focus-within:text-primary transition-all group-focus-within:scale-110" />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/20 pointer-events-none group-focus-within:scale-110 transition-all" />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 ml-1">Département</label>
              <div className="relative group">
                <select 
                  name="department"
                  required
                  disabled={!selectedFaculty}
                  className="w-full pl-12 pr-10 py-4.5 bg-surface-container-low border-none rounded-[var(--radius-standard)] appearance-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer disabled:opacity-40 disabled:grayscale focus:scale-[1.01]"
                >
                  <option value="">Sélectionner département...</option>
                  {filteredDepartments.map((d) => (
                    <option key={d.id} value={d.name || d.nom}>{d.name || d.nom}</option>
                  ))}
                </select>
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/20 pointer-events-none group-focus-within:text-primary transition-all group-focus-within:scale-110" />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/20 pointer-events-none group-focus-within:scale-110 transition-all" />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 ml-1">Niveau d'étude</label>
              <div className="relative group">
                <select 
                  name="level"
                  required
                  className="w-full pl-12 pr-10 py-4.5 bg-surface-container-low border-none rounded-[var(--radius-standard)] appearance-none focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface cursor-pointer focus:scale-[1.01]"
                >
                  <option value="Licence 1">Licence 1</option>
                  <option value="Licence 2">Licence 2</option>
                  <option value="Licence 3">Licence 3</option>
                  <option value="Master 1">Master 1</option>
                  <option value="Master 2">Master 2</option>
                </select>
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/20 pointer-events-none group-focus-within:text-primary transition-all group-focus-within:scale-110" />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant/20 pointer-events-none group-focus-within:scale-110 transition-all" />
              </div>
            </div>
          </div>

          {/* Mot de passe */}
          <div className="space-y-2.5">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface-variant/30 ml-1">Mot de passe</label>
            <div className="relative group">
              <input 
                name="password"
                required
                minLength={8}
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4.5 bg-surface-container-low border-none rounded-[var(--radius-standard)] focus:ring-2 focus:ring-primary/20 transition-all font-bold text-on-surface placeholder:text-on-surface-variant/20 focus:scale-[1.01]"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-on-surface-variant/20 group-focus-within:text-primary transition-all group-focus-within:scale-110" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-on-surface-variant/30 hover:text-primary transition-all hover:scale-110"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <SubmitButton />
        </form>

      <div className="mt-10 text-center pb-8 animate-in fade-in duration-1000">
        <p className="text-on-surface-variant/40 text-xs font-black uppercase tracking-widest">
          Déjà un compte ? 
          <Link href="/login" className="text-primary font-black ml-3 hover:underline decoration-2 underline-offset-4 transition-all">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
