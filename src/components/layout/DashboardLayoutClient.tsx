'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

export function DashboardLayoutClient({
  children,
  role,
  profile
}: {
  children: React.ReactNode,
  role: string,
  profile: any
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close sidebar on navigation (handled by Sidebar's onClose, but safety first)
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary text-on-background">
      <Sidebar 
        role={role} 
        profile={profile} 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />
      
      <div 
        className="flex flex-col min-h-screen transition-all duration-500 ease-in-out"
        style={{ 
          paddingLeft: isMobileMenuOpen ? '0px' : 'var(--sidebar-width, 18rem)',
        }}
      >
        <Navbar 
          role={role} 
          profile={profile} 
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        />
        
        <main className="pt-28 pb-12 px-4 md:px-10 flex-1 w-full max-w-[1600px] mx-auto overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
