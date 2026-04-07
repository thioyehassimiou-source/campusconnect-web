'use client'

import React from 'react'
import { useToast } from '@/components/ui/Toast'

interface InteractiveElementProps {
  children: React.ReactNode
  message?: string
  className?: string
  type?: 'div' | 'button' | 'a'
  href?: string
}

export default function InteractiveElement({ 
  children, 
  message = "Cette fonctionnalité sera bientôt disponible !", 
  className = "",
  type = "div",
  href
}: InteractiveElementProps) {
  const { info } = useToast()

  const handleClick = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault()
      info(message)
    }
  }

  const Component = type as any

  return (
    <Component 
      onClick={handleClick}
      href={href}
      className={`${className} cursor-pointer active:scale-[0.98] transition-all duration-300`}
    >
      {children}
    </Component>
  )
}
