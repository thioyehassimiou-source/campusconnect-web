'use client'

import { Construction, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function ComingSoon({ title, description, backHref = '/dashboard' }: { title: string, description: string, backHref?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 animate-in fade-in zoom-in-95 duration-700">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150 animate-pulse"></div>
        <div className="relative w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center border border-primary/10">
          <Construction className="h-10 w-10 text-primary animate-bounce" />
        </div>
      </div>
      
      <h2 className="text-4xl font-headline font-black text-primary mb-4 tracking-tighter uppercase">{title}</h2>
      <p className="text-on-surface-variant font-medium max-w-md mx-auto mb-12 leading-relaxed italic">
        {description}
      </p>

      <div className="flex flex-col items-center gap-6">
        <div className="px-6 py-2 bg-primary/5 rounded-full border border-primary/10">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Module en cours de développement</span>
        </div>
        
        <Link 
          href={backHref}
          className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Retour au Dashboard
        </Link>
      </div>
    </div>
  )
}
