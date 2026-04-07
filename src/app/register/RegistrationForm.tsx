'use client'

import React, { useState, useEffect } from 'react'
import { register } from './actions'
import { Mail, HelpCircle, User, Lock, Building, GraduationCap, Briefcase, ChevronDown, Sparkles } from 'lucide-react'
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
        w-full py-4.5 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 
        ${pending ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700 active:scale-[0.98] transition-all'}
      `}
    >
      <span className="text-[10px]">
        {pending ? 'Initialisation...' : 'Créer mon compte'}
      </span>
    </button>
  )
}

export default function RegistrationForm({ faculties, departments, services, error }: RegistrationFormProps) {
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
    <div className="w-full">
      {error && (
        <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl animate-in shake">
          <p className="text-xs font-bold text-rose-600 flex items-center gap-3 italic">
            <HelpCircle className="h-4 w-4" />
            {error}
          </p>
        </div>
      )}

      <form action={register} className="space-y-5" autoComplete="off">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Prénom</label>
              <div className="relative">
                <input 
                  name="first-name"
                  required
                  placeholder="Jean"
                  type="text"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 text-xs placeholder:text-slate-300 focus:border-primary/20"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nom</label>
              <div className="relative">
                <input 
                  name="last-name"
                  required
                  placeholder="Dupont"
                  type="text"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 text-xs placeholder:text-slate-300 focus:border-primary/20"
                />
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Matricule (INE)</label>
            <div className="relative">
              <input 
                name="student_id"
                required
                type="text"
                pattern="^[a-zA-Z]{4}\d{10}$"
                title="Le matricule doit être composé de 4 lettres suivies de 10 chiffres (ex: ABCD1234567890)"
                placeholder="ABCD1234567890"
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 text-xs placeholder:text-slate-300 uppercase tracking-widest focus:border-primary/20"
              />
              <GraduationCap className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Faculté</label>
              <div className="relative group">
                <select 
                  name="faculty"
                  required
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 text-xs cursor-pointer focus:border-primary/20"
                >
                  <option value="">Choisir...</option>
                  {faculties.map((f) => (
                    <option key={f.id} value={f.id}>{f.name}</option>
                  ))}
                </select>
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none group-hover:text-primary transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Département</label>
              <div className="relative group">
                <select 
                  name="department"
                  required
                  disabled={!selectedFaculty}
                  className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-xl appearance-none focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 text-xs cursor-pointer disabled:opacity-30 focus:border-primary/20"
                >
                  <option value="">Sélectionner...</option>
                  {filteredDepartments.map((d) => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                </select>
                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none group-hover:text-primary transition-colors" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mot de passe</label>
            <div className="relative">
              <input 
                name="password"
                required
                minLength={8}
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-primary/5 transition-all font-bold text-slate-900 text-xs placeholder:text-slate-300 focus:border-primary/20"
              />
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
            </div>
          </div>

          <div className="pt-4">
            <SubmitButton />
          </div>
        </form>

      <div className="mt-10 text-center pb-8 border-t border-slate-50 pt-8">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">
          Vous avez déjà un compte ? 
          <Link href="/login" className="text-primary font-black ml-3 hover:underline">Connexion</Link>
        </p>
      </div>
    </div>
  )
}
