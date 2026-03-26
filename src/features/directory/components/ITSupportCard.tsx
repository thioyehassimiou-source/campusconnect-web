import { Mail, Phone, MapPin, Clock, Devices, ArrowUpRight } from 'lucide-react'
import { DepartmentContact } from '../types'

interface ITSupportCardProps {
  contact: DepartmentContact
}

export function ITSupportCard({ contact }: ITSupportCardProps) {
  return (
    <div className="bg-surface-container-lowest rounded-[2.5rem] p-10 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 lg:col-span-2 flex flex-col xl:flex-row gap-10 border border-outline-variant/10 shadow-sm animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="xl:w-1/3">
        <div className="flex justify-between items-start mb-8">
          <div className="p-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20">
            <Devices className="h-8 w-8" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-primary/5 text-primary px-4 py-1.5 rounded-full border border-primary/20">
            Prioritaire
          </span>
        </div>
        <h3 className="text-3xl font-black text-primary mb-4 font-headline tracking-tighter">
          Support IT & Numérique
        </h3>
        <p className="text-base text-on-surface-variant leading-relaxed opacity-70 font-medium">
          Aide à la connexion, Wi-Fi, portail ENT, licences logicielles et assistance technique matérielle.
        </p>
      </div>

      <div className="xl:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10 xl:pl-10 border-t xl:border-t-0 xl:border-l border-outline-variant/15 pt-10 xl:pt-0">
        <div className="space-y-8">
          <div className="flex items-center space-x-5">
            <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-inner">
              IT
            </div>
            <div>
              <p className="text-base font-black text-on-surface tracking-tight tracking-tight">Équipe Support</p>
              <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest opacity-60">Helpdesk Étudiants</p>
            </div>
          </div>
          
          <div className="space-y-5">
            <div className="flex items-center text-sm font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer group">
              <Mail className="h-5 w-5 mr-4 opacity-40 group-hover:opacity-100" />
              <span>{contact.email}</span>
            </div>
            <div className="flex items-center text-sm font-bold text-on-surface-variant hover:text-primary transition-colors cursor-pointer group">
              <Phone className="h-5 w-5 mr-4 opacity-40 group-hover:opacity-100" />
              <span>{contact.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className="space-y-5">
            <div className="flex items-center text-sm font-bold text-on-surface-variant opacity-80">
              <MapPin className="h-5 w-5 mr-4 opacity-40" />
              <span>{contact.location}</span>
            </div>
            <div className="flex items-center text-sm font-black text-primary bg-primary/5 px-5 py-3 rounded-2xl border border-primary/10">
              <Clock className="h-4.5 w-4.5 mr-4 opacity-60" />
              <span className="uppercase tracking-widest text-[10px]">{contact.hours}</span>
            </div>
          </div>
          
          <button className="mt-8 w-full py-4 bg-primary text-white rounded-2x text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 active:scale-95 group">
            <span>Ouvrir un ticket</span>
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}
