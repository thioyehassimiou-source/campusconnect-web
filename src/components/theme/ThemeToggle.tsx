'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'

// Variant for dark backgrounds (landing page navbar, footer)
export function ThemeToggleLight() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Basculer le thème"
      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 border border-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-all active:scale-95"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

// Variant for light backgrounds (dashboard navbar)
export function ThemeToggleDark() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Basculer le thème"
      className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container-low border border-outline-variant/10 text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all active:scale-95"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
