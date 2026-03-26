import { CreditCard, Landmark, Contactless as ContactlessIcon } from 'lucide-react'

export function SecurityInfoCard() {
  return (
    <div className="bg-surface-container-low p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-12 border border-outline-variant/5 group animate-in slide-in-from-bottom-12 duration-1000">
      <div className="flex-shrink-0 relative">
        <div className="w-48 h-48 rounded-[3rem] overflow-hidden shadow-2xl transition-transform group-hover:scale-105 duration-700">
          <img 
            alt="Secure Payment" 
            className="w-full h-full object-cover grayscale opacity-50 contrast-125" 
            src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400" 
          />
        </div>
        <div className="absolute -bottom-4 -right-4 bg-primary p-5 rounded-3xl shadow-2xl text-white">
          <span className="material-symbols-outlined text-4xl">lock</span>
        </div>
      </div>
      
      <div className="flex-1">
        <h4 className="text-2xl font-black font-headline text-primary tracking-tight mb-4">Méthodes de paiement sécurisées</h4>
        <p className="text-sm text-on-surface-variant/70 leading-relaxed font-medium">
          Nous acceptons les règlements par VISA, Mastercard, Virement SEPA et solutions mobiles locales. 
          Toutes les transactions sont protégées par un chiffrement SSL 256 bits de niveau bancaire.
        </p>
        
        <div className="flex gap-8 mt-10 grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
          <div className="flex flex-col items-center gap-2">
            <CreditCard className="h-10 w-10 text-primary" />
            <span className="text-[8px] font-black uppercase tracking-widest text-primary">BANK CARD</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Landmark className="h-10 w-10 text-primary" />
            <span className="text-[8px] font-black uppercase tracking-widest text-primary">TRANSFER</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[2.5rem] text-primary">contactless</span>
            <span className="text-[8px] font-black uppercase tracking-widest text-primary">MOBILE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
