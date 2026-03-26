import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { DepartmentContact } from '../types'

interface ContactCardProps {
  contact: DepartmentContact
}

export function ContactCard({ contact }: ContactCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group border border-outline-variant/10 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-start mb-8">
        <div className="p-4 bg-primary-container/10 rounded-2xl text-primary shadow-inner">
          <span className="material-symbols-outlined text-3xl">{contact.icon}</span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant opacity-40">
          {contact.category}
        </span>
      </div>
      
      <h3 className="text-2xl font-black text-primary mb-3 font-headline tracking-tighter transition-colors group-hover:text-primary-container">
        {contact.name}
      </h3>
      <p className="text-sm text-on-surface-variant leading-relaxed opacity-70 mb-8 font-medium line-clamp-2">
        {contact.description}
      </p>
      
      <div className="space-y-6 pt-6 border-t border-surface-container/50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={contact.lead.avatar} 
              alt={contact.lead.name} 
              className="w-14 h-14 rounded-full object-cover ring-4 ring-primary/5 shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
          </div>
          <div>
            <p className="text-sm font-black text-on-surface tracking-tight">{contact.lead.name}</p>
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">
              {contact.lead.role}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="flex items-center text-sm font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer group/item">
            <Mail className="h-4.5 w-4.5 mr-4 opacity-40 group-hover/item:opacity-100" />
            <span className="opacity-80">{contact.email}</span>
          </div>
          <div className="flex items-center text-sm font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer group/item">
            <Phone className="h-4.5 w-4.5 mr-4 opacity-40 group-hover/item:opacity-100" />
            <span className="opacity-80">{contact.phone}</span>
          </div>
          <div className="flex items-center text-sm font-bold text-on-surface-variant opacity-80">
            <MapPin className="h-4.5 w-4.5 mr-4 opacity-40" />
            <span>{contact.location}</span>
          </div>
          <div className="flex items-center text-sm font-black text-primary bg-primary/5 px-4 py-2 rounded-xl">
            <Clock className="h-4 w-4 mr-3 opacity-60" />
            <span className="uppercase tracking-widest text-[10px]">{contact.hours}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
