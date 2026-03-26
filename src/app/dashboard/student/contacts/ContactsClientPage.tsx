'use client'

import { Search, Filter, MessageCircle, Phone, Mail, MoreHorizontal } from 'lucide-react'
import { ContactFilters } from '@/features/directory/components/ContactFilters'

interface ContactsClientPageProps {
  initialProfiles: any[]
}

export default function DirectoryPage({ initialProfiles }: ContactsClientPageProps) {
  const contacts = initialProfiles.map(p => ({
        id: p.id,
        name: p.full_name,
        role: p.role === 'student' ? 'Étudiant' : p.role === 'teacher' ? 'Enseignant' : 'Admin',
        department: p.department || 'Non spécifié',
        avatar: p.avatar_url,
        status: 'online'
      }))

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-700 pb-20">
      {/* Search & Tool Bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-16">
        <div className="flex-1 max-w-2xl relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-on-surface-variant/30 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher un membre de la communauté..." 
            className="w-full bg-surface-container-low pl-16 pr-8 py-5 rounded-[2rem] border border-outline-variant/10 focus:ring-4 focus:ring-primary/5 focus:bg-white transition-all text-sm font-medium shadow-sm"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <ContactFilters />
          <button className="w-14 h-14 rounded-2xl bg-white border border-outline-variant/10 flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-all">
            <MoreHorizontal className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Modern Grid Representation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {contacts.map((contact: any) => (
          <div key={contact.id} className="group relative bg-white p-8 rounded-[3rem] border border-outline-variant/5 shadow-sm hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500 overflow-hidden">
             {/* Dynamic Status Glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

             <div className="relative flex flex-col items-center text-center">
                <div className="relative mb-6">
                   <img src={contact.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'} className="w-24 h-24 rounded-[2.5rem] object-cover shadow-xl ring-4 ring-white" alt="" />
                   <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm" />
                </div>

                <h3 className="text-xl font-black text-on-surface tracking-tighter mb-1">{contact.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-6 opacity-70">{contact.role}</p>

                <div className="flex items-center gap-4 text-on-surface-variant/40 mb-8 w-full justify-center">
                   <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest mb-1">Dépt.</span>
                      <span className="text-xs font-bold text-on-surface-variant">{contact.department}</span>
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-3 w-full">
                   <button className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all">
                      <MessageCircle className="h-5 w-5" />
                   </button>
                   <button className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all">
                      <Phone className="h-5 w-5" />
                   </button>
                   <button className="p-4 bg-surface-container-low rounded-2xl flex items-center justify-center text-on-surface hover:bg-primary hover:text-white transition-all">
                      <Mail className="h-5 w-5" />
                   </button>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  )
}
