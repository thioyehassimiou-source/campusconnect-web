import { Cloud, Info } from 'lucide-react'

export function StorageCard() {
  const used = 1.2
  const total = 5
  const percentage = (used / total) * 100

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="lg:col-span-2 bg-gradient-to-br from-primary to-primary-container p-10 rounded-[2.5rem] text-white relative overflow-hidden group shadow-2xl shadow-primary/20">
        <div className="relative z-10">
          <h4 className="text-2xl font-black mb-3 font-headline tracking-tighter">Espace de stockage étudiant</h4>
          <p className="text-on-primary-container/80 text-sm max-w-md font-medium leading-relaxed">
            Vous utilisez {used} Go sur vos {total} Go alloués pour ce semestre. Pensez à archiver vos anciens travaux pour libérer de l'espace.
          </p>
          
          <div className="mt-10 mb-2 flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Utilisation : {percentage.toFixed(0)}%</span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{total - used} Go restants</span>
          </div>
          <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden shadow-inner">
            <div 
              className="bg-white h-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.5)]" 
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        <Cloud className="absolute -bottom-10 -right-10 h-64 w-64 opacity-10 rotate-12 group-hover:rotate-0 transition-all duration-1000 pointer-events-none" />
      </div>

      <div className="bg-surface-container-high p-10 rounded-[2.5rem] border border-outline-variant/10 shadow-sm">
        <h4 className="text-xs font-black text-primary mb-6 flex items-center uppercase tracking-[0.2em] opacity-80">
          <Info className="mr-3 h-5 w-5" strokeWidth={3} />
          Aide & Support
        </h4>
        <ul className="space-y-5">
          {[
            'Signaler un document manquant',
            "Guide d'utilisation de l'explorateur",
            'Contacter le secrétariat académique'
          ].map((item) => (
            <li key={item}>
              <span className="text-sm font-bold text-on-surface-variant/50 cursor-not-allowed transition-all">
                {item} (Bientôt)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
