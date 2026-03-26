'use client'

import React, { useState, useEffect } from 'react'
import { register } from './actions'
import { Mail, Eye, EyeOff, HelpCircle, ArrowLeft, Moon, Sun, ChevronDown, User, Lock, Building, GraduationCap, Briefcase } from 'lucide-react'
import Link from 'next/link'

interface RegistrationFormProps {
  faculties: any[]
  departments: any[]
  services: any[]
  error?: string
}

export default function RegistrationForm({ faculties, departments, services, error }: RegistrationFormProps) {
  const [role, setRole] = useState('student')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedFaculty, setSelectedFaculty] = useState<string>('')
  const [filteredDepartments, setFilteredDepartments] = useState<any[]>([])

  useEffect(() => {
    if (selectedFaculty) {
      // faculty_id in remote DB is an integer, selectedFaculty is the string id from the select
      const filtered = departments.filter(d => 
        String(d.faculty_id) === String(selectedFaculty)
      )
      setFilteredDepartments(filtered)
    } else {
      setFilteredDepartments([])
    }
  }, [selectedFaculty, departments])

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-10 text-center lg:text-left">
        <h2 className="text-4xl font-black text-primary mb-3 font-headline tracking-tighter">Créer votre compte</h2>
        <p className="text-slate-500 text-sm font-medium">Portail numérique officiel de l'Université de Labé.</p>
      </div>

      {error && (
        <div className="mb-8 rounded-2xl bg-red-50 p-4 border border-red-100">
          <p className="text-xs font-bold text-red-600 font-medium">{error}</p>
        </div>
      )}

      <form action={register} className="space-y-6">
          {/* Prénom & Nom */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Prénom</label>
              <div className="relative">
                <input 
                  name="first-name"
                  required
                  placeholder="Jean"
                  type="text"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 placeholder:text-slate-300"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
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
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 placeholder:text-slate-300"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              </div>
            </div>
          </div>

          {/* Email / Matricule */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email universitaire / Matricule</label>
            <div className="relative">
              <input 
                name="email"
                required
                placeholder="nom@univ-campus.fr ou ..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 placeholder:text-slate-300"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
            </div>
          </div>

          {/* Rôle Segmented Control */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Rôle</label>
            <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
              <input type="hidden" name="role" value={role} />
              <button 
                type="button"
                onClick={() => setRole('student')}
                className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all ${role === 'student' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/50'}`}
              >
                Étudiant
              </button>
              <button 
                type="button"
                onClick={() => setRole('teacher')}
                className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all ${role === 'teacher' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/50'}`}
              >
                Enseignant
              </button>
              <button 
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-3 px-2 rounded-xl text-xs font-bold transition-all ${role === 'admin' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-400 hover:bg-white/50'}`}
              >
                Administratif
              </button>
            </div>
          </div>

          {/* Conditional Fields: Student / Teacher */}
          {(role === 'student' || role === 'teacher') && (
            <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Faculté</label>
                <div className="relative">
                  <select 
                    name="faculty"
                    required
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="w-full pl-12 pr-10 py-4 bg-slate-50 border-none rounded-2xl appearance-none focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 cursor-pointer"
                  >
                    <option value="">Sélectionner...</option>
                    {faculties.map((f) => (
                      <option key={f.id} value={f.id}>{f.nom}</option>
                    ))}
                  </select>
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 pointer-events-none" />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
                </div>
              </div>

              {role === 'student' && (
                <div className="space-y-6 animate-in slide-in-from-top-4 duration-500">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Département</label>
                    <div className="relative">
                      <select 
                        name="department"
                        required
                        disabled={!selectedFaculty}
                        className="w-full pl-12 pr-10 py-4 bg-slate-50 border-none rounded-2xl appearance-none focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <option value="">Sélectionner département...</option>
                        {filteredDepartments.map((d) => (
                          <option key={d.id} value={d.nom}>{d.nom}</option>
                        ))}
                      </select>
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 pointer-events-none" />
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Niveau (Licence)</label>
                    <div className="relative">
                      <select 
                        name="level"
                        required
                        className="w-full pl-12 pr-10 py-4 bg-slate-50 border-none rounded-2xl appearance-none focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 cursor-pointer"
                      >
                        <option value="Licence 1">Licence 1</option>
                        <option value="Licence 2">Licence 2</option>
                        <option value="Licence 3">Licence 3</option>
                        <option value="Master 1">Master 1</option>
                        <option value="Master 2">Master 2</option>
                      </select>
                      <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 pointer-events-none" />
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
                    </div>
                  </div>
                </div>
              )}

              {role === 'teacher' && selectedFaculty && (
                <div className="space-y-2 animate-in slide-in-from-top-4 duration-500">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Département</label>
                  <div className="relative">
                    <select 
                      name="department"
                      required
                      className="w-full pl-12 pr-10 py-4 bg-slate-50 border-none rounded-2xl appearance-none focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 cursor-pointer"
                    >
                      <option value="">Sélectionner département...</option>
                      {filteredDepartments.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 pointer-events-none" />
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Conditional Fields: Admin */}
          {role === 'admin' && (
            <div className="space-y-2 animate-in slide-in-from-top-4 duration-500">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Service</label>
              <div className="relative">
                <select 
                  name="service"
                  required
                  className="w-full pl-12 pr-10 py-4 bg-slate-50 border-none rounded-2xl appearance-none focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 cursor-pointer"
                >
                  <option value="">Sélectionner service...</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.nom}>{s.nom}</option>
                  ))}
                </select>
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 pointer-events-none" />
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Mot de passe */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Mot de passe</label>
            <div className="relative">
              <input 
                name="password"
                required
                minLength={8}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary/10 transition-all font-body text-slate-900 placeholder:text-slate-300"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-slate-300 hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-primary text-white font-headline font-black uppercase tracking-[0.2em] rounded-3xl shadow-xl shadow-primary/20 active:scale-[0.98] transition-all text-xs"
          >
            Créer mon compte
          </button>
        </form>

      <div className="mt-8 text-center pb-6">
        <p className="text-slate-500 text-sm font-medium">
          Déjà un compte ? 
          <Link href="/login" className="text-primary font-black ml-2 hover:underline">Se connecter</Link>
        </p>
      </div>
    </div>
  )
}
