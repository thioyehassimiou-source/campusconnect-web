'use client'

import React from 'react'

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
  const handleClick = (e: React.MouseEvent) => {
    if (!href) {
      e.preventDefault()
      alert(message)
    }
  }

  const Component = type as any

  return (
    <Component 
      onClick={handleClick}
      href={href}
      className={`${className} cursor-pointer active:scale-[0.98] transition-all duration-200`}
    >
      {children}
    </Component>
  )
}
