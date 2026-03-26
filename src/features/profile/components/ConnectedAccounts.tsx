import { Terminal, Briefcase, CheckCircle2 } from 'lucide-react'
import { ConnectedService } from '../types'

interface ConnectedAccountsProps {
  services: ConnectedService[]
}

export function ConnectedAccounts({ services }: ConnectedAccountsProps) {
  return (
    <div className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-sm border border-outline-variant/10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div>
          <h3 className="text-xl font-black text-primary font-headline tracking-tighter">Services Connectés</h3>
          <p className="text-sm text-on-surface-variant font-bold opacity-60 mt-1 uppercase tracking-widest text-[10px]">Gérez l'accès à vos outils universitaires externes</p>
        </div>
        <button className="text-primary text-[11px] font-black uppercase tracking-widest hover:underline underline-offset-8">Gérer tout</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <div 
            key={service.name} 
            className="flex items-center p-6 border border-outline-variant/10 rounded-3xl hover:bg-surface-container-low transition-all duration-300 group cursor-pointer hover:shadow-lg"
          >
            <div className={`w-14 h-14 flex items-center justify-center rounded-2xl font-black text-xl shadow-inner ${service.color}`}>
              {service.icon === 'terminal' ? <Terminal className="h-7 w-7" /> : 
               service.icon === 'work' ? <Briefcase className="h-7 w-7" /> : 
               service.icon}
            </div>
            <div className="ml-5 flex-1 min-w-0">
              <p className="text-sm font-black text-on-surface truncate tracking-tight">{service.name}</p>
              <p className="text-[10px] text-on-surface-variant/60 font-bold uppercase truncate tracking-widest">
                {service.email || service.username || 'Non connecté'}
              </p>
            </div>
            {service.status === 'CONNECTED' ? (
              <CheckCircle2 className="text-emerald-500 h-6 w-6 opacity-40 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
            ) : (
              <button className="text-[10px] font-black text-primary px-4 py-2 bg-secondary-container rounded-xl uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                Lier
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
