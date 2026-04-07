'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggleLight } from '@/components/theme/ThemeToggle'
import { Menu, X } from 'lucide-react'

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-primary/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-primary/10">
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 md:py-4 w-full max-w-screen-xl mx-auto box-border gap-2">
        
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group transition-transform hover:scale-[1.02] flex-shrink-0 min-w-0">
          <div className="bg-white p-1.5 rounded-xl shadow-sm flex-shrink-0">
            <img src="/logo-campusconnect.png" alt="CampusConnect Logo" className="h-8 md:h-10 w-auto" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="text-lg md:text-xl font-headline font-black text-white leading-tight tracking-tighter truncate">CampusConnect</div>
            <div className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-white/60 leading-none decoration-none truncate">Université de Labé</div>
          </div>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 font-headline font-bold text-xs uppercase tracking-widest text-white/70">
          <a href="#features" className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white pb-1">Services</a>
          <a href="#faculties" className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white pb-1">Facultés</a>
          <a href="#contact" className="hover:text-white transition-all duration-300 border-b-2 border-transparent hover:border-white pb-1">Contact</a>
        </div>

        {/* Actions & Menu Toggle */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <ThemeToggleLight />
          
          <Link href="/login" className="px-3 md:px-4 py-2 text-white font-headline font-[800] text-[11px] md:text-xs uppercase tracking-widest hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 rounded-xl whitespace-nowrap">
            Connexion
          </Link>
          
          <Link href="/register" className="hidden lg:flex px-6 py-3 bg-white text-primary font-headline font-[800] text-xs uppercase tracking-widest rounded-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-black/10 hover:bg-white/95 whitespace-nowrap">
            Inscription
          </Link>

          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-white p-1.5 md:p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-primary border-b border-white/10 shadow-xl flex flex-col p-6 gap-6 animate-in slide-in-from-top-2 duration-200">
          <a onClick={() => setIsOpen(false)} href="#features" className="text-white font-headline font-bold text-sm uppercase tracking-widest text-center py-2">Services</a>
          <a onClick={() => setIsOpen(false)} href="#faculties" className="text-white font-headline font-bold text-sm uppercase tracking-widest text-center py-2">Facultés</a>
          <a onClick={() => setIsOpen(false)} href="#contact" className="text-white font-headline font-bold text-sm uppercase tracking-widest text-center py-2">Contact</a>
          <div className="flex flex-col gap-4 mt-2">
            <Link onClick={() => setIsOpen(false)} href="/register" className="w-full py-3.5 text-center bg-white text-primary font-headline font-black text-sm uppercase tracking-widest rounded-xl hover:bg-white/90 transition-all shadow-lg flex items-center justify-center">
              Inscription
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
